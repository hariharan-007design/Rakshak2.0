import sys

with open('D:/rakshak-2.0/web/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the start and end of polishWithAi function
start = None
end = None
for i, line in enumerate(lines):
    if 'async function polishWithAi()' in line:
        start = i
    if start is not None and end is None and i > start + 20:
        if line.strip() == '}':
            end = i
            break

print(f"Function spans lines {start+1} to {end+1}")

new_func = """async function polishWithAi() {
  if (!state.revised) { toast('Run a review first'); return; }
  const result = $('aiPolishResult'); if (result) { result.classList.remove('hidden'); result.innerHTML = '<span class="ai-label">AI POLISH · WORKING…</span>Polishing…'; }
  const findings = state.findings.map(f => `${f.ruleId}: ${f.title} — ${f.detail}`).join('\\n');
  const key = aiKey();
  if (!key) {
    if (result) result.innerHTML = '<span class="ai-label">AI POLISH · NO API KEY</span>Set your Groq/OpenAI API key in Settings to use AI polish.';
    toast('Set API key in Settings first');
    return;
  }
  try {
    const res = await fetch(`${aiBase().replace(/\\/+$/,'')}/chat/completions`, {
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
      body: JSON.stringify({ model: aiModel(), messages:[
        {role:'system', content:'You rewrite marketing copy to comply with brand rules. Keep meaning, tone, facts. Return only rewritten copy.'},
        {role:'user', content:`Rules:\\n${findings || 'none'}\\n\\nDraft:\\n${state.revised}\\n\\nRewrite:`}
      ], temperature:0.3 })
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content?.trim() || '';
    if (result) result.innerHTML = `<span class="ai-label">AI POLISH · ONLINE · AI-GENERATED · REVIEW BEFORE USE</span>${esc(text)}<p class="section-note">Proposed rewrite only. Re-run Analyze to verify.</p>`;
    const polishedFindings = findMatches(text, $('channelSelect')?.value);
    const newCount = polishedFindings.length;
    toast(`AI polish complete (ONLINE) · ${newCount} finding${newCount===1?'':'s'} in polished version`);
  } catch (e) {
    if (result) result.innerHTML = `<span class="ai-label">AI POLISH · ERROR</span>${esc(e.message)}<p class="section-note">Check your API key and network connection.</p>`;
    toast('AI polish failed: ' + e.message);
  }
}
"""

new_lines = lines[:start] + [new_func + '\n'] + lines[end+1:]
with open('D:/rakshak-2.0/web/app.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
print("Done")

# Verify
with open('D:/rakshak-2.0/web/app.js', 'r', encoding='utf-8') as f:
    content = f.read()
print("transformers references:", content.count('transformers'))
print("Xenova references:", content.count('Xenova'))
print("polishOffline references:", content.count('polishOffline'))
print("Lines:", content.count(chr(10)))
"""

with open('D:/rakshak-2.0/scratchpad/fix_ai.py', 'w', encoding='utf-8') as f:
    f.write(script)

import subprocess
result = subprocess.run(['python', 'D:/rakshak-2.0/scratchpad/fix_ai.py'], capture_output=True, text=True)
print(result.stdout)
print(result.stderr)
