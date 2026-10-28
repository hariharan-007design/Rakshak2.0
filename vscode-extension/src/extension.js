const vscode = require('vscode');
const fs = require('fs');

const RULES = {
  mozilla: [
    { id: 'MOZ-01', title: 'Avoid implied endorsement', pattern: /\\b(officially endorsed by|approved by|partnered with Mozilla)\\b/ig, severity: 'high' },
    { id: 'MOZ-02', title: 'Do not turn the mark into a product name', pattern: /\\bMozilla\\s+(browser|app|tool|platform|project|service)\\b/ig, severity: 'high' },
  ],
  pharma: [
    { id: 'PH-01', title: 'No unsubstantiated efficacy claims', pattern: /\\b(cures?|miracle drug|100% effective)\\b/ig, severity: 'high' },
    { id: 'PH-02', title: 'Include required safety information', pattern: /\\b(no side effects|completely safe)\\b/ig, severity: 'high' },
  ],
  finra: [
    { id: 'FN-01', title: 'No guaranteed returns', pattern: /\\b(guaranteed (return|profit)|risk[- ]free)\\b/ig, severity: 'high' },
  ],
};

function scanText(text, pack) {
  const rules = RULES[pack] || RULES.mozilla;
  const findings = [];
  for (const rule of rules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      findings.push({ rule: rule.id, title: rule.title, severity: rule.severity, match: match[0], index: match.index });
    }
  }
  return findings;
}

function activate(context) {
  const scanFile = vscode.commands.registerCommand('rakshak.scanFile', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) { vscode.window.showWarningMessage('No active file'); return; }
    const text = editor.document.getText();
    const pack = vscode.workspace.getConfiguration('rakshak').get('rulePack') || 'mozilla';
    const findings = scanText(text, pack);
    const diag = vscode.languages.createDiagnosticCollection('rakshak');
    const diagnostics = findings.map(f => {
      const pos = editor.document.positionAt(f.index);
      const range = new vscode.Range(pos, editor.document.positionAt(f.index + f.match.length));
      return new vscode.Diagnostic(range, `${f.rule}: ${f.title}`, f.severity === 'high' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning);
    });
    diag.set(editor.document.uri, diagnostics);
    vscode.window.showInformationMessage(`Rakshak: ${findings.length} findings in ${editor.document.fileName}`);
  });

  const scanWorkspace = vscode.commands.registerCommand('rakshak.scanWorkspace', async () => {
    const files = await vscode.workspace.findFiles('**/*.{md,txt,html,js,ts}');
    let total = 0;
    for (const file of files) {
      const doc = await vscode.workspace.openTextDocument(file);
      const pack = vscode.workspace.getConfiguration('rakshak').get('rulePack') || 'mozilla';
      total += scanText(doc.getText(), pack).length;
    }
    vscode.window.showInformationMessage(`Rakshak: ${total} findings across ${files.length} files`);
  });

  context.subscriptions.push(scanFile, scanWorkspace);
}

function deactivate() {}
module.exports = { activate, deactivate };
