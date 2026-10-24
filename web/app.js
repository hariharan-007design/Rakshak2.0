const DEMO_COMPANIES = {
  mozilla: { name: 'Mozilla', code: 'MOZ-2026', mark: 'M', description: 'Trademark and voice checks based on the supplied Mozilla Trademark Guidelines.', rules: [
    { id: 'MOZ-01', title: 'Avoid implied endorsement', pattern: /\b(officially endorsed by|approved by|partnered with Mozilla)\b/ig, severity: 'high', detail: 'This wording can imply Mozilla approved or endorses the product. The supplied guidelines reserve control over how Mozilla marks are presented.', fix: 'Remove the endorsement claim unless you have explicit written permission.', source: 'Mozilla Trademark Guidelines, Use of Mozilla marks', url: 'https://www.mozilla.org/foundation/trademarks/policy/' },
    { id: 'MOZ-02', title: 'Do not turn the mark into a product name', pattern: /\bMozilla\s+(browser|app|tool|platform|project|service)\b/ig, severity: 'high', detail: 'Using Mozilla as part of a product or project name can make the mark appear to identify your own offering.', fix: 'Name your product independently and describe compatibility in plain language.', source: 'Mozilla Trademark Guidelines, Proper use of Mozilla marks', url: 'https://www.mozilla.org/foundation/trademarks/policy/' },
    { id: 'MOZ-03', title: 'Review possessive or plural use', pattern: /\bMozilla(?:’s|’|s’|'s)\b/ig, severity: 'medium', detail: 'The draft uses Mozilla as a possessive or plural noun. Brand marks should identify the organization or its products, not become generic wording.', fix: 'Rewrite the phrase to use Mozilla as an adjective followed by a generic noun.', source: 'Mozilla Trademark Guidelines, Proper use of Mozilla marks', url: 'https://www.mozilla.org/foundation/trademarks/policy/' },
    { id: 'MOZ-04', title: 'Add a clear trademark attribution', pattern: /\bMozilla\b/i, severity: 'review', detail: 'A Mozilla mark appears. Check that the page includes the required trademark attribution and does not suggest an affiliation that does not exist.', fix: 'Add an accurate attribution in the legal or footer area and state your relationship clearly.', source: 'Mozilla Trademark Guidelines, Attribution', url: 'https://www.mozilla.org/foundation/trademarks/policy/' }
  ] },
  mailchimp: { name: 'Mailchimp', code: 'MAIL-2026', mark: 'M', description: 'Demo voice checks inspired by the public Mailchimp Style Guide.', rules: [
    { id: 'MC-01', title: 'Prefer plain language', pattern: /\b(utilize|synergy|leverage|facilitate)\b/ig, severity: 'medium', detail: 'This phrase is formal or abstract. The Mailchimp style guide favors direct, conversational language.', fix: 'Use a shorter, familiar word that says what happens.', source: 'Mailchimp Style Guide, Voice and tone', url: 'https://styleguide.mailchimp.com/voice-and-tone/' },
    { id: 'MC-02', title: 'Avoid unsupported superlatives', pattern: /\b(revolutionary|world[- ]class|best[- ]in[- ]class|guaranteed)\b/ig, severity: 'high', detail: 'This is a broad promotional claim that may be hard to substantiate and does not fit a helpful, grounded voice.', fix: 'Replace it with a specific, verifiable benefit.', source: 'Mailchimp Style Guide, Writing for Mailchimp', url: 'https://styleguide.mailchimp.com/' },
    { id: 'MC-03', title: 'Check inclusive wording', pattern: /\b(guys|mankind|manpower)\b/ig, severity: 'medium', detail: 'This wording can exclude some readers. Choose a neutral term that includes everyone in the audience.', fix: 'Try “everyone”, “people”, or the role name that fits the sentence.', source: 'Mailchimp Style Guide, Writing for Mailchimp', url: 'https://styleguide.mailchimp.com/' }
  ] },
  acme: { name: 'Acme SaaS', code: 'ACME-2026', mark: 'A', description: 'Synthetic demo rules for product claims and security language.', rules: [
    { id: 'AC-01', title: 'Qualify guaranteed outcomes', pattern: /\b(guaranteed|100% secure|zero risk|never fails)\b/ig, severity: 'high', detail: 'Absolute performance or security claims require evidence and legal review.', fix: 'Describe the measurable result and its conditions, or route the claim to review.', source: 'Acme demo policy — claims review', url: '#' },
    { id: 'AC-02', title: 'Replace vague superlatives', pattern: /\b(the best|number one|unmatched|world[- ]class)\b/ig, severity: 'medium', detail: 'A comparative claim should be specific and supported by current evidence.', fix: 'Use a verifiable product fact instead of a ranking.', source: 'Acme demo policy — substantiation', url: '#' },
    { id: 'AC-03', title: 'Add a source for statistics', pattern: /\b\d{1,3}%\b/g, severity: 'review', detail: 'A percentage appears without an obvious source in this draft. Confirm its evidence and date.', fix: 'Add the source and measurement period near the statistic.', source: 'Acme demo policy — evidence', url: '#' }
  ] }
};

const SAMPLE = `Introducing Mozilla's new collaboration workspace. It is officially endorsed by Mozilla, guarantees a 50% increase in team productivity, and is 100% secure.\n\nTry it today to see why it's the best-in-class choice for everyone.`;
const $ = (id) => document.getElementById(id);
const state = { company: null, findings: [], draft: '', revised: '', logo: null, history: [], activeFinding: null, currentView: 'review', previousView: null };
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reveal = (id, visible) => { const el=$(id); if(el){el.hidden=!visible;el.classList.toggle('hidden',!visible);} };
function replacementFor(ruleId, quote) {
  const q=quote.toLowerCase();
  const replacements={
    'MOZ-01':'not approved or endorsed by Mozilla', 'MOZ-02':'a browser compatible with Mozilla products', 'MOZ-03':'Mozilla',
    'MC-01':{utilize:'use',synergy:'working together',leverage:'use',facilitate:'help'},
    'MC-02':{revolutionary:'new',worldclass:'capable', 'world-class':'capable','best-in-class':'useful',guaranteed:'can help'},
    'MC-03':{guys:'everyone',mankind:'people',manpower:'staff'},
    'AC-01':{guaranteed:'may', '100% secure':'designed with security in mind','zero risk':'lower risk','never fails':'is designed for reliability'},
    'AC-02':{'the best':'a strong fit','number one':'a strong fit',unmatched:'distinctive','world-class':'capable','world class':'capable'}
  };
  const entry=replacements[ruleId];
  if(typeof entry==='string')return entry;
  return entry?.[q] || '';
}

function toast(message) { const el = $('toast'); if (!el) return; el.textContent = message; el.classList.remove('hidden'); el.classList.add('show'); clearTimeout(toast.timer); toast.timer = setTimeout(() => {el.classList.remove('show');el.classList.add('hidden');}, 2600); }
function companyKey() { return $('companySelect')?.value || 'mozilla'; }
function setCompany(key) {
  state.company = DEMO_COMPANIES[key] || DEMO_COMPANIES.mozilla;
  for (const id of ['profileCompany','headingCompany','railCompany','guidelinesCompany','settingsCompany','orgName']) if ($(id)) $(id).textContent = id==='headingCompany' ? state.company.name : `${state.company.name} Demo`;
  for (const id of ['railDescription','guidelinesDescription']) if ($(id)) $(id).textContent = state.company.description;
  if ($('orgMark')) $('orgMark').textContent = state.company.mark;
  if ($('profileInitial')) $('profileInitial').textContent = state.company.name[0];
  if ($('guidelinesMark')) $('guidelinesMark').textContent = state.company.mark;
  if ($('railRuleList')) $('railRuleList').innerHTML = state.company.rules.map(r => `<div class="rail-rule"><span>${esc(r.id)} · ${esc(r.severity)}</span><strong>${esc(r.title)}</strong></div>`).join('');
  if ($('guidelinesRules')) $('guidelinesRules').innerHTML = state.company.rules.map(r => `<article class="guideline-rule"><span>${esc(r.id)}</span><div><h3>${esc(r.title)}</h3><p>${esc(r.detail)}</p><small>${esc(r.source)}</small></div></article>`).join('');
  const source=state.company.name==='Mozilla'?'https://www.mozilla.org/foundation/trademarks/policy/':state.company.name==='Mailchimp'?'https://styleguide.mailchimp.com/':'#';
  for(const id of ['railSourceLink','guidelinesSource'])if($(id))$(id).href=source;
  reveal('guidelineDocument',state.company.name==='Mozilla'); reveal('railPdf',state.company.name==='Mozilla');
  if($('userChip'))$('userChip').textContent=state.company.mark;
}

function showView(view) {
  if (state.currentView && state.currentView !== view) state.previousView = state.currentView;
  state.currentView = view;
  document.querySelectorAll('[data-view]').forEach(tab => tab.classList.toggle('active', tab.dataset.view === view));
  document.querySelectorAll('.view').forEach(panel => { const active = panel.id === `${view}View`; panel.hidden = !active; panel.classList.toggle('hidden',!active); panel.classList.toggle('active-view', active); });
  if ($('breadcrumbCurrent')) $('breadcrumbCurrent').textContent = ({review:'New review',guidelines:'Guidelines',history:'Review history',settings:'Workspace settings',polish:'AI polish',logo:'Logo'})[view] || 'New review';
  if($('profileMenu')){$('profileMenu').classList.remove('open');$('profileMenu').classList.add('hidden');}$('profileTrigger')?.setAttribute('aria-expanded','false');
}

function login(key) {
  const company = DEMO_COMPANIES[key];
  if (!company || $('passwordInput').value.trim().toUpperCase() !== company.code) { $('passwordInput').setAttribute('aria-invalid','true'); toast('Access code does not match this demo workspace'); return; }
  $('passwordInput').removeAttribute('aria-invalid'); setCompany(key);
  reveal('loginScreen',false); reveal('workspace',true);
  if ($('demoHint')) $('demoHint').textContent = `Demo access code: ${company.code} · Prototype only`;
  $('draftInput') && ($('draftInput').value = ''); showView('review');
}

function findMatches(text) {
  const findings = [];
  for (const rule of state.company.rules) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`);
    for (const match of text.matchAll(regex)) {
      if (!match[0]) continue;
      findings.push({ id: `${rule.id}-${match.index}`, ruleId: rule.id, start: match.index, end: match.index + match[0].length, quote: match[0], title: rule.title, severity: rule.severity, detail: rule.detail, fix: replacementFor(rule.id,match[0]), source: rule.source, url: rule.url, status: 'open' });
    }
  }
  return findings.sort((a,b) => a.start - b.start);
}

function drawHighlight() {
  if (!$('highlightedCopy')) return;
  let out = '', cursor = 0;
  for (const f of state.findings) {
    if (f.start < cursor || f.status === 'ignored') continue;
    out += esc(state.draft.slice(cursor, f.start));
    out += `<mark tabindex="0" role="button" data-finding-id="${esc(f.id)}" class="${f.severity}">${esc(state.draft.slice(f.start,f.end))}</mark>`;
    cursor = f.end;
  }
  out += esc(state.draft.slice(cursor));
  $('highlightedCopy').innerHTML = out || '<span class="muted">Your annotated draft will appear here.</span>';
  reveal('highlightPanel',!!state.draft);
  $('highlightedCopy').querySelectorAll('mark').forEach(mark => { mark.addEventListener('click', () => focusFinding(mark.dataset.findingId)); mark.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') focusFinding(mark.dataset.findingId); }); });
}

function drawFindings() {
  const list = $('findingList'); if (!list) return;
  const open = state.findings.filter(f => f.status === 'open');
  if ($('findingCount')) $('findingCount').textContent = String(open.length);
  if ($('findingsSummary')) $('findingsSummary').textContent = open.length ? `${open.length} item${open.length === 1 ? '' : 's'} need your review` : 'No matching rule issues were found';
  $('noFindings') && ($('noFindings').hidden = open.length > 0);
  reveal('findingsSection',true); reveal('noFindings',open.length===0);
  list.innerHTML = open.map((f,i) => `<article class="finding-item" id="card-${esc(f.id)}"><button class="finding-trigger" aria-expanded="false"><span class="finding-index">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(f.title)}</strong><small>${esc(f.ruleId)} · “${esc(f.quote)}”</small></span><span class="finding-severity ${f.severity==='review'?'advisory':''}">${esc(f.severity)}</span><svg class="icon"><use href="#i-chevron" /></svg></button><div class="finding-detail"><p>${esc(f.detail)}</p><div class="finding-ruleline">Guideline: ${esc(f.source)}${f.url !== '#' ? ` · <a href="${esc(f.url)}" target="_blank" rel="noreferrer">Open source ↗</a>` : ''}</div>${f.fix ? `<label class="suggestion-label" for="fix-${esc(f.id)}">EDITABLE REPLACEMENT</label><textarea class="suggestion-input" id="fix-${esc(f.id)}" rows="2">${esc(f.fix)}</textarea>` : '<p class="finding-ruleline">This needs human verification; the prototype has no safe automatic replacement.</p>'}<div class="finding-buttons">${f.fix ? `<button class="button button-outline apply-fix" data-id="${esc(f.id)}">Apply suggestion</button>` : ''}<button class="button button-text dismiss-finding" data-id="${esc(f.id)}">Dismiss</button></div></div></article>`).join('');
  list.querySelectorAll('.finding-trigger').forEach(btn => btn.addEventListener('click', () => { const item=btn.parentElement; item.classList.toggle('open'); btn.setAttribute('aria-expanded',String(item.classList.contains('open'))); }));
  list.querySelectorAll('.apply-fix').forEach(btn => btn.addEventListener('click', () => applyFix(btn.dataset.id)));
  list.querySelectorAll('.dismiss-finding').forEach(btn => btn.addEventListener('click', () => { const f=state.findings.find(x=>x.id===btn.dataset.id); if(f)f.status='ignored'; drawFindings(); drawHighlight(); }));
}

function focusFinding(id) {
  const card = $(`card-${CSS.escape(id)}`); if (card) { card.classList.add('open'); card.querySelector('.finding-trigger').setAttribute('aria-expanded','true'); card.scrollIntoView({behavior:'smooth',block:'center'}); card.classList.add('focused'); setTimeout(()=>card.classList.remove('focused'),1400); }
}

function applyFix(id) {
  const f = state.findings.find(x=>x.id===id); const input=$(`fix-${CSS.escape(id)}`); if(!f||!input)return;
  const replacement=input.value.trim();
  if (!replacement) { toast('Enter a correction first'); return; }
  const marks = state.findings.filter(x=>x.status==='open'&&x.start>=f.start).sort((a,b)=>a.start-b.start);
  state.draft = state.draft.slice(0,f.start)+replacement+state.draft.slice(f.end);
  const delta = replacement.length-(f.end-f.start); f.status='accepted';
  for(const item of marks){ if(item===f)continue; if(item.start>=f.end){item.start+=delta;item.end+=delta;} else if(item.start>=f.start){item.status='ignored';} }
  if($('draftInput'))$('draftInput').value=state.draft;
  state.findings = findMatches(state.draft).map(n => { const prior=state.findings.find(old=>old.ruleId===n.ruleId&&old.start===n.start&&old.quote===n.quote); return prior ? {...n,status:prior.status} : n; });
  drawHighlight(); drawFindings(); updateRevised(); toast('Suggestion applied to the working draft');
}

function channelFormat(text) {
  const channel=$('channelSelect')?.value || 'Website';
  if(channel==='LinkedIn') return text.split(/\n\s*\n/).flatMap(p=>p.match(/[^.!?]+[.!?]+|[^.!?]+$/g)||[p]).map(s=>s.trim()).filter(Boolean).join('\n\n');
  if(channel==='Instagram') return text.split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean).join('\n\n');
  return text;
}

function updateRevised() {
  state.revised=channelFormat(state.draft);
  if($('revisedCopy'))$('revisedCopy').textContent=state.revised;
  if($('channelTag'))$('channelTag').textContent=$('channelSelect')?.value || 'Website';
  if($('charWarning')) { const limit=($('channelSelect')?.value==='X')?280:null; $('charWarning').textContent=limit&&state.revised.length>limit?`${state.revised.length-limit} characters over X's 280 character limit`:`${state.revised.length} characters`; $('charWarning').classList.toggle('warning',!!limit&&state.revised.length>limit); }
}

function analyze() {
  const text=$('draftInput')?.value.trim() || '';
  if(!text){ toast('Add or upload draft text first'); $('draftInput')?.focus(); return; }
  state.draft=text; state.findings=findMatches(text); drawHighlight(); drawFindings(); updateRevised();
  if($('analysisMessage'))$('analysisMessage').textContent=`Checked against ${state.company.rules.length} demo rules · processed in this browser`;
  reveal('analysisMessage',true); reveal('revisedSection',true);
  const record={company:state.company.name,channel:$('channelSelect')?.value||'Website',date:new Date().toLocaleString(),count:state.findings.length,source:$('sourceFileName')?.textContent||'Pasted copy'}; state.history.unshift(record); drawHistory(); toast(`Review complete · ${state.findings.length} match${state.findings.length===1?'':'es'} to review`);
  $('findingsSection')?.scrollIntoView({behavior:'smooth',block:'start'});
}

function drawHistory() {
  const list=$('historyList'); if(!list)return;
  reveal('historyEmpty',state.history.length===0);
  $('historyBadge') && ($('historyBadge').textContent=String(state.history.length));
  list.innerHTML=state.history.map(r=>`<article class="history-row"><span class="history-mark">${esc(r.company[0])}</span><div><b>${esc(r.company)} · ${esc(r.channel)}</b><small>${esc(r.date)} · ${esc(r.source)}</small></div><span class="history-count">${r.count} flags</span></article>`).join('');
}

async function readPdf(file) {
  if (!window.pdfjsLib) throw new Error('PDF reader has not loaded. Refresh and try again.');
  const pdf=await window.pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise;
  if(pdf.numPages>40) throw new Error('This prototype supports PDFs up to 40 pages.');
  const pages=[];
  for(let n=1;n<=pdf.numPages;n++){const page=await pdf.getPage(n);const content=await page.getTextContent();pages.push(content.items.map(x=>x.str).join(' '));}
  const text=pages.join('\n\n'); if(!text.trim())throw new Error('No selectable text was found. This version cannot read scanned PDFs.');
  return text.slice(0,50000);
}

async function handleDraft(file) {
  if(!file)return;
  if(file.size>10*1024*1024){toast('Keep files under 10 MB');return;}
  $('sourceFileName') && ($('sourceFileName').textContent=file.name); reveal('sourceFileName',true);
  try {
    let text='';
    if(file.type==='application/pdf'||file.name.toLowerCase().endsWith('.pdf')) text=await readPdf(file);
    else if(file.type.startsWith('text/')||/\.(txt|md)$/i.test(file.name)) text=await file.text();
    else {toast('Use a text file or PDF');return;}
    $('draftInput').value=text; $('draftMeta') && ($('draftMeta').textContent=`${text.trim().split(/\s+/).filter(Boolean).length} words · ${text.length.toLocaleString()} characters`); $('pdfMeta') && ($('pdfMeta').textContent=file.name.toLowerCase().endsWith('.pdf')?'Text extracted from PDF · page references are not included in this prototype':'Text file loaded'); toast('Draft loaded in browser');
  } catch(error) { toast(error.message || 'Could not read that file'); }
}

async function inspectLogo(file) {
  if(!file)return;
  if(file.size>5*1024*1024){toast('Logo must be under 5 MB');return;}
  const url=URL.createObjectURL(file); const img=new Image();
  img.onload=()=>{
    const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const ctx=canvas.getContext('2d',{willReadFrequently:true});ctx.drawImage(img,0,0);
    let alpha=false, transparent=0, sampled=0;
    try {const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;const stride=Math.max(1,Math.floor(Math.sqrt(canvas.width*canvas.height/250000)));for(let y=0;y<canvas.height;y+=stride)for(let x=0;x<canvas.width;x+=stride){const a=data[(y*canvas.width+x)*4+3];sampled++;if(a<250){transparent++;if(a<10)alpha=true;}}}catch{}
    const ratio=sampled?transparent/sampled:0; const concerns=[];if(Math.min(img.naturalWidth,img.naturalHeight)<300)concerns.push('Small for high-resolution placement');if(ratio<0.015)concerns.push('Little transparent/clear space around the artwork');if(file.size>2*1024*1024)concerns.push('Large file — consider optimizing before upload');
    state.logo={file:file.name,width:img.naturalWidth,height:img.naturalHeight,alpha,concerns};
    if($('logoResult')){$('logoResult').innerHTML=`<div class="logo-check"><img src="${url}" alt="Uploaded logo preview"><div><b>${esc(file.name)}</b><small>${img.naturalWidth} × ${img.naturalHeight}px · ${Math.round(file.size/1024)} KB</small><p>${concerns.length?concerns.map(esc).join(' · '):'No basic file-quality issues detected.'}</p><small>File checks only · not a brand approval</small></div></div>`;reveal('logoResult',true);}
  };
  img.onerror=()=>toast('Could not preview this logo file');img.src=url;
}

function downloadReport() {
  const findings=state.findings.map(f=>`${f.ruleId} | ${f.severity} | ${f.status} | ${f.title}\nMatched: ${f.quote}\nGuidance: ${f.detail}\nSource: ${f.source} ${f.url}\n`).join('\n');
  const report=`RAKSHAK 2.0 · REVIEW REPORT\nCompany: ${state.company.name}\nChannel: ${$('channelSelect')?.value||'Website'}\nGenerated: ${new Date().toISOString()}\n\nFINDINGS\n${findings||'No findings.'}\nREVISED DRAFT\n${state.revised}`;
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([report],{type:'text/plain'}));a.download=`rakshak-review-${state.company.name.toLowerCase().replace(/\W+/g,'-')}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

function aiKey() { return localStorage.getItem('rakshak_ai_key') || ''; }
function aiModel() { return localStorage.getItem('rakshak_ai_model') || 'gpt-4o-mini'; }
function refreshAiStatus() { const k=aiKey(); if($('aiKeyStatus')) $('aiKeyStatus').textContent = k ? 'SET' : 'NOT SET'; if($('aiKeyInput')) $('aiKeyInput').value = k; if($('aiModelSelect')) $('aiModelSelect').value = aiModel(); }
async function polishWithAi() {
  if (!state.revised) { toast('Run a review first'); return; }
  const result = $('aiPolishResult'); if (result) { result.classList.remove('hidden'); result.innerHTML = '<span class="ai-label">AI POLISH · LOADING MODEL…</span>Loading in-browser model (first run downloads ~0.5 GB).'; }
  try {
    if (!window.__rakshakGenerator) {
      const { pipeline } = await import('https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2');
      window.__rakshakGenerator = await pipeline('text-generation', 'Xenova/Qwen2.5-0.5B-Instruct', { progress_callback: (p) => {
        if (result && p?.status === 'progress') result.innerHTML = `<span class="ai-label">AI POLISH · LOADING MODEL…</span>${Math.round((p.progress||0))}%`;
      }});
    }
    const findings = state.findings.map(f => `${f.ruleId}: ${f.title} — ${f.detail} (source: ${f.source})`).join('\n');
    const prompt = `You rewrite marketing copy to comply with the given brand rules. Keep meaning, tone, and facts. Return only the rewritten copy.\n\nRules applied:\n${findings || 'none'}\n\nDraft to polish:\n${state.revised}\n\nRewritten copy:`;
    const out = await window.__rakshakGenerator(prompt, { max_new_tokens: 256, temperature: 0.3, do_sample: true });
    const text = (Array.isArray(out) ? out[0]?.generated_text : out?.generated_text) || '';
    const cleaned = text.replace(prompt, '').trim();
    if (result) result.innerHTML = `<span class="ai-label">AI POLISH · AI-GENERATED · REVIEW BEFORE USE</span>${esc(cleaned || text)}`;
  } catch (e) { if (result) result.innerHTML = `<span class="ai-label">AI POLISH · FAILED</span>${esc(e.message || 'Request failed')}`; toast('AI polish failed'); }
}

function bind() {
  if($('companySelect')){ $('companySelect').innerHTML=Object.entries(DEMO_COMPANIES).map(([key,co])=>`<option value="${key}">${esc(co.name)} · Demo workspace</option>`).join(''); $('companySelect').value='mozilla'; }
  if($('demoHint'))$('demoHint').textContent=`Demo access code: ${DEMO_COMPANIES.mozilla.code} · Prototype only`;
  $('loginForm')?.addEventListener('submit',e=>{e.preventDefault();login(companyKey());});
  $('companySelect')?.addEventListener('change',e=>{const co=DEMO_COMPANIES[e.target.value];if($('demoHint'))$('demoHint').textContent=`Demo access code: ${co.code} · Prototype only`;});
  $('togglePassword')?.addEventListener('click',()=>{const p=$('passwordInput');p.type=p.type==='password'?'text':'password';$('togglePassword').textContent=p.type==='password'?'Show':'Hide';$('togglePassword').setAttribute('aria-label',p.type==='password'?'Show access code':'Hide access code');});
  $('profileTrigger')?.addEventListener('click',()=>{const menu=$('profileMenu');if(!menu)return;const opening=menu.classList.contains('hidden');menu.classList.toggle('hidden',!opening);menu.classList.toggle('open',opening);$('profileTrigger').setAttribute('aria-expanded',String(opening));});
  $('settingsButton')?.addEventListener('click',()=>showView('settings')); $('signOutButton')?.addEventListener('click',signOut);
  $('changeCompany')?.addEventListener('click',signOut); $('settingsChangeCompany')?.addEventListener('click',signOut);
  document.querySelectorAll('[data-view]').forEach(tab=>tab.addEventListener('click',()=>showView(tab.dataset.view)));
  $('analyzeButton')?.addEventListener('click',analyze); $('loadSample')?.addEventListener('click',()=>{$('draftInput').value=SAMPLE;$('sourceFileName').textContent='sample-launch-copy.txt';reveal('sourceFileName',true);updateWordCount();toast('Sample draft loaded');});
  $('draftInput')?.addEventListener('input',updateWordCount);
  $('draftFile')?.addEventListener('change',e=>handleDraft(e.target.files[0])); $('logoFile')?.addEventListener('change',e=>inspectLogo(e.target.files[0]));
  $('channelSelect')?.addEventListener('change',updateRevised); $('copyRevised')?.addEventListener('click',async()=>{if(!state.revised){toast('Run a review first');return;}await navigator.clipboard.writeText(state.revised);toast('Revised draft copied');});
  $('downloadReport')?.addEventListener('click',downloadReport); $('clearSession')?.addEventListener('click',()=>{state.history=[];drawHistory();toast('Session history cleared');});
  $('expandGuidelines')?.addEventListener('click',()=>showView('guidelines')); $('openGuidelines')?.addEventListener('click',()=>showView('guidelines'));
  $('guidelineDocument')?.addEventListener('load',()=>{});
  $('highlightedCopy')?.addEventListener('click',e=>{const mark=e.target.closest('mark');if(mark)focusFinding(mark.dataset.findingId);});
  $('backButton')?.addEventListener('click',()=>{ if(state.previousView) showView(state.previousView); });
  $('polishAi')?.addEventListener('click',polishWithAi);
  $('saveAiKey')?.addEventListener('click',()=>{const k=$('aiKeyInput')?.value.trim()||''; if(k) localStorage.setItem('rakshak_ai_key',k); else localStorage.removeItem('rakshak_ai_key'); if($('aiModelSelect')) localStorage.setItem('rakshak_ai_model',$('aiModelSelect').value); refreshAiStatus(); toast(k?'AI key saved in this browser':'AI key cleared');});
  $('clearAiKey')?.addEventListener('click',()=>{localStorage.removeItem('rakshak_ai_key'); if($('aiKeyInput'))$('aiKeyInput').value=''; refreshAiStatus(); toast('AI key cleared');});
  refreshAiStatus();

}

function signOut() {
  state.findings=[];state.history=[];state.draft='';state.revised='';state.logo=null;
  if($('draftInput'))$('draftInput').value='';if($('passwordInput'))$('passwordInput').value='';
  reveal('workspace',false); reveal('loginScreen',true);if($('profileMenu')){$('profileMenu').classList.add('hidden');$('profileMenu').classList.remove('open');}$('profileTrigger')?.setAttribute('aria-expanded','false');drawHistory();
}

function updateWordCount() { const value=$('draftInput')?.value||''; if($('draftMeta'))$('draftMeta').textContent=`${value.trim().split(/\s+/).filter(Boolean).length} words · ${value.length.toLocaleString()} characters`; }

async function loadPdfJs() {
  try { const module=await import('./vendor/pdf.min.mjs'); window.pdfjsLib=module; module.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdf.worker.min.mjs',import.meta.url).href; }
  catch(error){ console.warn('PDF.js unavailable; text files still work.',error); }
}
bind(); loadPdfJs();
