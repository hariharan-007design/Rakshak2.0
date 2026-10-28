// Figma Plugin: Rakshak Brand Review
figma.showUI(__html__, { width: 320, height: 480 });

const RULES = [
  { id: 'MOZ-01', title: 'Avoid implied endorsement', pattern: /\\b(officially endorsed by|approved by)\\b/ig, severity: 'high' },
  { id: 'PH-01', title: 'No unsubstantiated efficacy claims', pattern: /\\b(cures?|miracle drug)\\b/ig, severity: 'high' },
  { id: 'FN-01', title: 'No guaranteed returns', pattern: /\\b(guaranteed (return|profit)|risk[- ]free)\\b/ig, severity: 'high' },
];

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'scan') {
    const textNodes = figma.currentPage.findAll(n => n.type === 'TEXT');
    const findings = [];
    for (const node of textNodes) {
      const text = node.characters;
      for (const rule of RULES) {
        const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
        let match;
        while ((match = regex.exec(text)) !== null) {
          findings.push({ rule: rule.id, title: rule.title, severity: rule.severity, text: match[0], nodeId: node.id, nodeName: node.name });
        }
      }
    }
    figma.ui.postMessage({ type: 'results', findings });
  }
  if (msg.type === 'close') { figma.closePlugin(); }
};
