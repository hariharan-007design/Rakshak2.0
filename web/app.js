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
  ] },
  pharma: { name: 'Pharma MLR', code: 'PHARMA-2026', mark: 'P', description: 'Medical, legal, and regulatory pre-screening for pharmaceutical content.', rules: [
    { id: 'PH-01', title: 'No unsubstantiated efficacy claims', pattern: /\b(cures?|cure-all|miracle drug|100% effective|guaranteed to (cure|heal|treat))\b/ig, severity: 'high', detail: 'Efficacy claims must be supported by clinical trial data.', fix: 'Replace with approved indication language.', source: 'FDA Guidance', url: 'https://www.fda.gov/drugs' },
    { id: 'PH-02', title: 'Include required safety information', pattern: /\b(no side effects|zero side effects|completely safe|no (risk|danger))\b/ig, severity: 'high', detail: 'All promotional content must include balanced safety information.', fix: 'Add approved safety profile and contraindications.', source: 'FDA Fair Balance', url: 'https://www.fda.gov/drugs' },
    { id: 'PH-03', title: 'Avoid off-label promotion', pattern: /\b(use for|treats?|indicated for)\s+(?!the approved)\w+/ig, severity: 'medium', detail: 'Promoting uses beyond approved indications violates regulatory guidelines.', fix: 'Restrict claims to approved indications only.', source: 'FDA Off-Label', url: 'https://www.fda.gov/drugs' },
    { id: 'PH-04', title: 'Check for missing disclaimer', pattern: /\b(prescription|required)\b/i, severity: 'review', detail: 'Content mentioning prescriptions should include regulatory disclaimers.', fix: 'Add "Consult your healthcare provider" disclaimer.', source: 'Pharma MLR Guidelines', url: '#' }
  ] },
  ghs: { name: 'Chemical GHS', code: 'GHS-2026', mark: 'G', description: 'GHS pre-screening for chemical safety data sheets and labels.', rules: [
    { id: 'GHS-01', title: 'Signal word required', pattern: /\b(danger|warning)\b/i, severity: 'review', detail: 'Hazardous chemicals require appropriate signal words per GHS.', fix: 'Verify correct signal word matches hazard classification.', source: 'GHS Rev. 9', url: 'https://unece.org/ghs-rev9-2021' },
    { id: 'GHS-02', title: 'Missing hazard statements', pattern: /\b(toxic|harmful|corrosive|flammable|explosive)\b/ig, severity: 'high', detail: 'Hazard statements (H-codes) must accompany all hazard classifications.', fix: 'Add appropriate H-statements and P-statements.', source: 'GHS Hazard Communication', url: 'https://unece.org/ghs-rev9-2021' },
    { id: 'GHS-03', title: 'Unsupported safety claims', pattern: /\b(non-toxic|safe to handle|no hazard|environmentally friendly)\b/ig, severity: 'medium', detail: 'Safety and environmental claims require substantiation.', fix: 'Replace with specific verified safety data.', source: 'GHS Environmental', url: 'https://unece.org/ghs-rev9-2021' },
    { id: 'GHS-04', title: 'PPE requirement missing', pattern: /\b(chemical|solvent|acid|base)\b/i, severity: 'review', detail: 'Content referencing chemicals should specify PPE.', fix: 'Add PPE recommendations per SDS.', source: 'OSHA HCS 2012', url: 'https://www.osha.gov/hazcom' }
  ] },
  finra: { name: 'FINRA', code: 'FINRA-2026', mark: 'F', description: 'Financial industry regulatory pre-screening for marketing communications.', rules: [
    { id: 'FN-01', title: 'No guaranteed returns', pattern: /\b(guaranteed (return|profit|income)|risk[- ]free|no (risk|loss))\b/ig, severity: 'high', detail: 'Financial communications cannot promise guaranteed returns.', fix: 'Replace with historical performance data and risk disclosures.', source: 'FINRA Rule 2210', url: 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2210' },
    { id: 'FN-02', title: 'Past performance disclaimer', pattern: /\b(past performance|historical returns?|annualized return)\b/ig, severity: 'medium', detail: 'Past performance claims require standard disclaimer.', fix: 'Add "Past performance is not indicative of future results."', source: 'FINRA Rule 2210(d)(1)', url: 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2210' },
    { id: 'FN-03', title: 'Misleading comparisons', pattern: /\b(outperform(s|ed)?|beat(s|en)? the market|superior returns?)\b/ig, severity: 'high', detail: 'Comparative performance claims require fair presentation.', fix: 'Add comparative context and risk factors.', source: 'FINRA Rule 2210', url: 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2210' },
    { id: 'FN-04', title: 'Missing risk disclosure', pattern: /\b(invest(ment|ing)?|portfolio|fund|stock|bond)\b/i, severity: 'review', detail: 'Investment content should include risk disclosures.', fix: 'Add "Investments involve risk, including possible loss of principal."', source: 'FINRA Rule 2210', url: 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2210' }
  ] }, healthcare: { name: 'Healthcare', code: 'HC-2026', mark: 'H', description: 'Healthcare content compliance — HIPAA, medical claims, patient privacy.', rules: [
    { id: 'HC-01', title: 'No unsubstantiated medical claims', pattern: /\b(cures?|miracle|100% effective|guaranteed (cure|heal|treat))\b/ig, severity: 'high', detail: 'Medical claims must be supported by clinical evidence.', fix: 'Replace with approved indication language and add disclaimer.', source: 'FDA Guidance', url: 'https://www.fda.gov/drugs' },
    { id: 'HC-02', title: 'Patient privacy language', pattern: /\b(patient (name|data|record|info)|personal health|PHI)\b/ig, severity: 'high', detail: 'Content referencing patient data must comply with HIPAA privacy rules.', fix: 'Remove identifiable patient information. Use anonymized examples.', source: 'HIPAA Privacy Rule', url: 'https://www.hhs.gov/hipaa' },
    { id: 'HC-03', title: 'Missing medical disclaimer', pattern: /\b(treatment|diagnosis|symptom|medication|prescription)\b/i, severity: 'review', detail: 'Health-related content should include a medical disclaimer.', fix: 'Add "Consult your healthcare provider" disclaimer.', source: 'Medical Content Guidelines', url: '#' },
    { id: 'HC-04', title: 'Unverified wellness claims', pattern: /\b(detox|cleanse|boosts? immunity|natural cure|holistic healing)\b/ig, severity: 'medium', detail: 'Wellness claims require substantiation and may mislead patients.', fix: 'Replace with evidence-based statements or remove.', source: 'FTC Health Claims', url: 'https://www.ftc.gov' }
  ] },
  realestate: { name: 'Real Estate', code: 'RE-2026', mark: 'R', description: 'Real estate listing and marketing compliance — fair housing, claims.', rules: [
    { id: 'RE-01', title: 'Fair housing language', pattern: /\b(family[- ]friendly|perfect for (families|couples|singles)|no (children|pets|smokers))\b/ig, severity: 'high', detail: 'Listing language must comply with Fair Housing Act.', fix: 'Use neutral, inclusive descriptions of the property.', source: 'Fair Housing Act', url: 'https://www.hud.gov/fairhousing' },
    { id: 'RE-02', title: 'Unsubstantiated property claims', pattern: /\b(best (neighborhood|location|investment)|guaranteed (appreciation|return|profit))\b/ig, severity: 'high', detail: 'Property claims must be verifiable and not misleading.', fix: 'Replace with specific, verifiable property features.', source: 'NAR Code of Ethics', url: 'https://www.nar.realtor' },
    { id: 'RE-03', title: 'Missing disclosure', pattern: /\b(investment (opportunity|property)|rental income|cash flow)\b/ig, severity: 'review', detail: 'Investment-related listings require proper disclosures.', fix: 'Add investment risk disclaimer.', source: 'SEC Real Estate', url: '#' },
    { id: 'RE-04', title: 'Accessibility claim check', pattern: /\b(wheelchair accessible|ADA compliant|accessible)\b/ig, severity: 'medium', detail: 'Accessibility claims must be accurate and verifiable.', fix: 'Verify accessibility features match ADA standards.', source: 'ADA Guidelines', url: 'https://www.ada.gov' }
  ] },
  insurance: { name: 'Insurance', code: 'INS-2026', mark: 'I', description: 'Insurance marketing compliance — disclaimers, claims, regulations.', rules: [
    { id: 'INS-01', title: 'No guaranteed payouts', pattern: /\b(guaranteed (payout|benefit|coverage)|100% covered|no (deductible|exclusions))\b/ig, severity: 'high', detail: 'Insurance communications cannot guarantee specific payouts.', fix: 'Replace with conditional language and add disclaimers.', source: 'NAIC Model Law', url: 'https://www.naic.org' },
    { id: 'INS-02', title: 'Missing risk disclosure', pattern: /\b(policy|coverage|premium|claim)\b/i, severity: 'review', detail: 'Insurance content should include standard risk disclosures.', fix: 'Add "Terms and conditions apply" disclaimer.', source: 'State Insurance Regs', url: '#' },
    { id: 'INS-03', title: 'Misleading comparison', pattern: /\b(cheaper than|better than|save \d+% (vs|versus|compared))\b/ig, severity: 'medium', detail: 'Comparative claims require fair and accurate presentation.', fix: 'Add comparison context and qualifying conditions.', source: 'FTC Advertising', url: 'https://www.ftc.gov' },
    { id: 'INS-04', title: 'Unsubstantiated savings claim', pattern: /\b(save (up to )?\$?\d+|\d+% (savings|discount|off))\b/ig, severity: 'medium', detail: 'Savings claims must be substantiated with data.', fix: 'Add source and conditions for the savings claim.', source: 'FTC Substantiation', url: 'https://www.ftc.gov' }
  ] },
  education: { name: 'Education', code: 'EDU-2026', mark: 'E', description: 'Education content compliance — FERPA, accessibility, claims.', rules: [
    { id: 'EDU-01', title: 'Student data privacy', pattern: /\b(student (name|record|grade|score)|FERPA|student data)\b/ig, severity: 'high', detail: 'Student data references must comply with FERPA.', fix: 'Remove identifiable student information.', source: 'FERPA', url: 'https://www.ed.gov/ferpa' },
    { id: 'EDU-02', title: 'Unverified outcome claims', pattern: /\b(100% (pass|graduate|job placement)|guaranteed (admission|scholarship|job))\b/ig, severity: 'high', detail: 'Educational outcome claims must be verifiable.', fix: 'Replace with verified statistics and methodology.', source: 'FTC Education', url: 'https://www.ftc.gov' },
    { id: 'EDU-03', title: 'Accessibility compliance', pattern: /\b(course|program|curriculum|syllabus)\b/i, severity: 'review', detail: 'Educational content should meet accessibility standards.', fix: 'Verify WCAG 2.1 AA compliance for all materials.', source: 'Section 508', url: 'https://www.section508.gov' },
    { id: 'EDU-04', title: 'Missing disclaimer', pattern: /\b(degree|certification|accreditation|accredited)\b/ig, severity: 'medium', detail: 'Accreditation claims require proper verification.', fix: 'Add accreditation details and verification link.', source: 'CHEA', url: 'https://www.chea.org' }
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
    'MOZ-01': q.includes('partnered') ? 'not partnered with' : q.includes('endorsed') ? 'not endorsed by' : 'not approved by', 'MOZ-02':'a browser compatible with Mozilla products', 'MOZ-03':'',
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
  window.scrollTo(0, 0);
  if (state.currentView && state.currentView !== view) state.previousView = state.currentView;
  state.currentView = view;
  document.querySelectorAll('[data-view]').forEach(tab => tab.classList.toggle('active', tab.dataset.view === view));
  document.querySelectorAll('.view').forEach(panel => { const active = panel.id === `${view}View`; panel.hidden = !active; panel.classList.toggle('hidden',!active); panel.classList.toggle('active-view', active); });
  if ($('breadcrumbCurrent')) $('breadcrumbCurrent').textContent = ({review:'New review',guidelines:'Guidelines',history:'Review history',settings:'Workspace settings',polish:'AI polish',logo:'Logo',savedFiles:'Saved files'})[view] || 'New review';
  if (view === 'savedFiles') renderSavedFiles();
  if($('profileMenu')){$('profileMenu').classList.remove('open');$('profileMenu').classList.add('hidden');}$('profileTrigger')?.setAttribute('aria-expanded','false');
}

function getCompanies() {
  const stored = localStorage.getItem('rakshak_companies');
  return stored ? JSON.parse(stored) : [];
}
function saveCompanies(companies) {
  localStorage.setItem('rakshak_companies', JSON.stringify(companies));
}
function updateDemoHint() {
  const hint = $('demoHint');
  if (!hint) return;
  const select = $('companySelect');
  if (!select || select.options.length === 0) { hint.textContent = 'Select a company or create a new one'; return; }
  const name = select.value || select.options[0]?.value || '';
  const companies = getCompanies();
  const company = companies.find(c => c.name === name);
  if (company) {
    hint.textContent = `Demo access code: ${company.code} · Prototype only`;
  } else {
    hint.textContent = 'Select a company or create a new one';
  }
}

function populateCompanySelect() {
  const select = $('companySelect');
  if (!select) return;
  const industry = $('industrySelect')?.value || 'tech';
  const companies = getCompanies().filter(c => c.industry === industry);
  if (companies.length === 0) {
    select.innerHTML = '<option value="">No companies yet — create one</option>';
    return;
  }
  select.innerHTML = companies.map(c => `<option value="${esc(c.name)}">${esc(c.name)}</option>`).join('');
  if (companies.length > 0) {
    select.selectedIndex = 0;
    select.value = companies[0].name;
  }
  // Update hint immediately with first company's code
  const hint = $('demoHint');
  if (hint && companies.length > 0) {
    hint.textContent = `Demo access code: ${companies[0].code} · Prototype only`;
  } else if (hint) {
    hint.textContent = 'Select a company or create a new one';
  }
}

function login() {
  const industry = $('industrySelect')?.value || 'tech';
  const companyName = ($('companySelect')?.value || '').trim();
  const code = ($('passwordInput')?.value || '').trim();
  if (!companyName) { toast('Select or create a company'); return; }
  if (!code) { toast('Enter an access code'); return; }
  const companies = getCompanies();
  const company = companies.find(c => c.name === companyName && c.industry === industry);
  if (!company) { toast('Company not found. Create one first.'); return; }
  if (company.code.toUpperCase() !== code.toUpperCase()) { $('passwordInput').setAttribute('aria-invalid','true'); toast('Access code does not match'); return; }
  $('passwordInput').removeAttribute('aria-invalid');
  const industryMap = { tech:'acme', healthcare:'pharma', finance:'finra', realestate:'acme', education:'acme', chemical:'ghs', media:'mozilla', ecommerce:'mailchimp', other:'acme' };
  const key = industryMap[industry] || 'acme';
  const demoCompany = DEMO_COMPANIES[key];
  if (!demoCompany) { toast('Industry pack not found'); return; }
  const profile = { industry, name: companyName, code, key, mark: companyName[0].toUpperCase() };
  localStorage.setItem('rakshak_profile', JSON.stringify(profile));
  const originalName = demoCompany.name;
  const originalMark = demoCompany.mark;
  demoCompany.name = companyName;
  demoCompany.mark = companyName[0].toUpperCase();
  setCompany(key);
  demoCompany.name = originalName;
  demoCompany.mark = originalMark;
  state.company.name = companyName;
  state.company.mark = companyName[0].toUpperCase();
  if ($('profileCompany')) $('profileCompany').textContent = companyName;
  if ($('orgName')) $('orgName').textContent = companyName;
  if ($('orgMark')) $('orgMark').textContent = companyName[0].toUpperCase();
  if ($('profileInitial')) $('profileInitial').textContent = companyName[0].toUpperCase();
  if ($('userChip')) $('userChip').textContent = companyName[0].toUpperCase();
  if ($('headingCompany')) $('headingCompany').textContent = companyName;
  if ($('railCompany')) $('railCompany').textContent = companyName;
  if ($('guidelinesCompany')) $('guidelinesCompany').textContent = companyName;
  if ($('settingsCompany')) $('settingsCompany').textContent = companyName;
  if ($('draftInput')) $('draftInput').value = '';
  const ws = $('workspace');
  const ls = $('loginScreen');
  if (ws) { ws.classList.remove('hidden'); ws.hidden = false; }
  if (ls) { ls.classList.add('hidden'); ls.hidden = true; }
  showView('review');
  const savedHistory = localStorage.getItem('rakshak_history_' + companyName);
  state.history = savedHistory ? JSON.parse(savedHistory) : [];
  drawHistory();
  toast('Welcome to ' + companyName + ' workspace!');
}

function findMatches(text, destination) {
  const findings = [];
  const dest = destination || ($('channelSelect')?.value || 'Website');
  // Destination-specific checks
  const destRules = getDestinationRules(dest, text);
  for (const rule of [...state.company.rules, ...destRules]) {
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`);
    let count=0;
    for (const match of text.matchAll(regex)) {
      if (!match[0]) continue;
      if (rule.id === 'MOZ-04' && count > 0) break;
      count++;
      findings.push({ id: `${rule.id}-${match.index}`, ruleId: rule.id, start: match.index, end: match.index + match[0].length, quote: match[0], title: rule.title, severity: rule.severity, detail: rule.detail, fix: replacementFor(rule.id,match[0]) || rule.fix || '', source: rule.source, url: rule.url, status: 'open' });
    }
  }
  // Character limit check for X
  if (dest === 'X' && text.length > 280) {
    findings.push({ id: 'DEST-X-CHAR', ruleId: 'DEST-X', start: 280, end: text.length, quote: text.slice(280, 300) + '...', title: 'Exceeds X character limit', severity: 'high', detail: `X posts are limited to 280 characters. Your draft is ${text.length} characters (${text.length - 280} over).`, fix: 'Shorten to 280 characters or less.', source: 'X Platform Guidelines', url: 'https://help.twitter.com/en/using-twitter/x-premium', status: 'open' });
  }
  // LinkedIn length check
  if (dest === 'LinkedIn' && text.length > 1300) {
    findings.push({ id: 'DEST-LI-LEN', ruleId: 'DEST-LI', start: 1300, end: text.length, quote: text.slice(1300, 1320) + '...', title: 'Exceeds LinkedIn recommended length', severity: 'medium', detail: `LinkedIn posts perform best under 1,300 characters. Your draft is ${text.length} characters.`, fix: 'Consider shortening for better engagement.', source: 'LinkedIn Best Practices', url: 'https://www.linkedin.com/help', status: 'open' });
  }
  // Instagram caption check
  if (dest === 'Instagram' && text.length > 2200) {
    findings.push({ id: 'DEST-IG-CAP', ruleId: 'DEST-IG', start: 2200, end: text.length, quote: text.slice(2200, 2220) + '...', title: 'Exceeds Instagram caption limit', severity: 'high', detail: `Instagram captions are limited to 2,200 characters. Your draft is ${text.length} characters.`, fix: 'Shorten to 2,200 characters or less.', source: 'Instagram Help Center', url: 'https://help.instagram.com', status: 'open' });
  }
  // Email subject line check
  if (dest === 'Email') {
    const lines = text.split('\n');
    if (lines[0] && lines[0].length > 60) {
      findings.push({ id: 'DEST-EMAIL-SUBJ', ruleId: 'DEST-EMAIL', start: 0, end: lines[0].length, quote: lines[0].slice(0, 40) + '...', title: 'Email subject line too long', severity: 'medium', detail: `Email subject lines perform best under 60 characters. First line is ${lines[0].length} characters.`, fix: 'Shorten the subject line to under 60 characters.', source: 'Email Marketing Best Practices', url: '#', status: 'open' });
    }
  }
  return findings.sort((a,b) => a.start - b.start);
}

function getDestinationRules(dest, text) {
  const rules = [];
  if (dest === 'Print') {
    const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 300) {
      rules.push({ id: 'DEST-PRINT-LEN', title: 'Print copy may be too long', pattern: /.*/, severity: 'review', detail: `Print materials work best under 300 words. Your draft has ${wordCount} words.`, fix: 'Consider condensing for print format.', source: 'Print Design Guidelines', url: '#', flags: 'g' });
    }
  }
  if (dest === 'Internal') {
    // No specific limits for internal comms
  }
  return rules;
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
  if (!state.findings.length) {
    list.innerHTML = `<div class="empty-state"><div class="empty-icon">✅</div><h3>No issues found</h3><p>Your draft passes all ${state.company.rules.length} rules for ${$('channelSelect')?.value || 'Website'}.</p><div class="empty-actions"><button class="button button-outline" onclick="document.getElementById('loadSample')?.click()">Load sample draft</button><button class="button button-outline" onclick="showView('guidelines')">View rules</button></div></div>`;
    if ($('findingCount')) $('findingCount').textContent = '0 findings';
    return;
  }
  const open = state.findings.filter(f => f.status === 'open');
  if ($('findingCount')) $('findingCount').textContent = String(open.length);
  const totalRules = state.company.rules.length + (state.findings.filter(f=>f.ruleId&&f.ruleId.startsWith('DEST')).length > 0 ? 1 : 0);
  const blockers = open.filter(f=>f.severity==='high').length;
  const warnings = open.filter(f=>f.severity==='medium').length;
  const reviews = open.filter(f=>f.severity==='review').length;
  const passed = Math.max(0, (state.company.rules.length) - open.length);
  if ($('findingsSummary')) $('findingsSummary').textContent = open.length ? `${passed} checks passed · ${warnings} warning${warnings===1?'':'s'} · ${blockers} blocker${blockers===1?'':'s'} · ${reviews} advisory` : 'No matching rule issues were found — but a clean scan is not approval.';
  $('noFindings') && ($('noFindings').hidden = open.length > 0);
  reveal('findingsSection',true); reveal('noFindings',open.length===0);
  list.innerHTML = open.map((f,i) => `<article class="finding-item" id="card-${esc(f.id)}"><button class="finding-trigger" aria-expanded="false"><span class="finding-index">${String(i+1).padStart(2,'0')}</span><span><strong>${esc(f.title)}</strong><small>${esc(f.ruleId)} · “${esc(f.quote)}”</small></span><span class="finding-severity ${f.severity==='review'?'advisory':''}">${esc(f.severity)}</span><svg class="icon"><use href="#i-chevron" /></svg></button><div class="finding-detail"><p>${esc(f.detail)}</p><div class="finding-ruleline">Guideline: ${esc(f.source)}${f.url !== '#' ? ` · <a href="${esc(f.url)}" target="_blank" rel="noreferrer">Open source ↗</a>` : ''}</div>${f.fix ? `<label class="suggestion-label" for="fix-${esc(f.id)}">EDITABLE REPLACEMENT</label><textarea class="suggestion-input" id="fix-${esc(f.id)}" rows="2">${esc(f.fix)}</textarea><div class="finding-diff"><span class="diff-label">ORIGINAL:</span> <span class="diff-original">"${esc(f.quote)}"</span> → <span class="diff-revised">${esc(f.fix)}</span></div>` : '<p class="finding-ruleline">This needs human verification; the prototype has no safe automatic replacement.</p>'}<div class="finding-buttons">${f.fix ? `<button class="button button-outline apply-fix" data-id="${esc(f.id)}">✓ Accept</button><button class="button button-outline reject-fix" data-id="${esc(f.id)}">✗ Reject</button>` : ''}<button class="button button-text dismiss-finding" data-id="${esc(f.id)}">Dismiss</button><button class="button button-text override-fix" data-id="${esc(f.id)}">Override…</button></div></div></article>`).join('');
  list.querySelectorAll('.finding-trigger').forEach(btn => {
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('role', 'button');
    const toggle = () => { const item=btn.parentElement; item.classList.toggle('open'); btn.setAttribute('aria-expanded',String(item.classList.contains('open'))); const mark=document.querySelector(`mark[data-finding-id="${btn.dataset.id||item.id.replace('card-','')}"]`); if(mark){mark.scrollIntoView({behavior:'smooth',block:'center'});mark.classList.add('focused');setTimeout(()=>mark.classList.remove('focused'),1400);} };
    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
  list.querySelectorAll('.apply-fix').forEach(btn => btn.addEventListener('click', () => applyFix(btn.dataset.id)));
  list.querySelectorAll('.reject-fix').forEach(btn => btn.addEventListener('click', () => { const f=state.findings.find(x=>x.id===btn.dataset.id); if(f){f.status='rejected'; drawFindings(); drawHighlight(); toast('Fix rejected — original kept');} }));
  list.querySelectorAll('.dismiss-finding').forEach(btn => btn.addEventListener('click', () => { const f=state.findings.find(x=>x.id===btn.dataset.id); if(f)f.status='ignored'; drawFindings(); drawHighlight(); }));
  list.querySelectorAll('.override-fix').forEach(btn => btn.addEventListener('click', () => { const f=state.findings.find(x=>x.id===btn.dataset.id); if(f){const reason=prompt('Why are you overriding this finding?'); if(reason){f.status='overridden'; f.overrideReason=reason; drawFindings(); drawHighlight(); toast('Override recorded');}} }));
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

function renderChannelPreview() {
  const section = $('channelPreviewSection');
  const container = $('channelPreviewContent');
  const tag = $('channelPreviewTag');
  if (!section || !container) return;
  const dest = $('channelSelect')?.value || 'Website';
  const text = ($('revisedCopy')?.textContent || $('draftInput')?.value || '').trim();
  if (tag) tag.textContent = dest;
  section.classList.remove('hidden');
  const len = text.length;

  if (dest === 'X') {
    const pct = Math.min(100, (len / 280) * 100);
    const color = len > 280 ? '#dc2626' : len > 250 ? '#d97706' : '#16a34a';
    container.innerHTML = `<div class="cp-x"><div class="cp-x-header"><div class="cp-x-avatar">🐦</div><div class="cp-x-meta"><strong>@yourbrand</strong> · now</div></div><div class="cp-x-body">${esc(text)}</div><div class="cp-x-bar"><div class="cp-x-fill" style="width:${pct}%;background:${color}"></div></div><div class="cp-x-count" style="color:${color}">${len} / 280 characters ${len > 280 ? '⚠️ OVER LIMIT' : ''}</div></div>`;
  } else if (dest === 'LinkedIn') {
    const pct = Math.min(100, (len / 1300) * 100);
    container.innerHTML = `<div class="cp-li"><div class="cp-li-header"><div class="cp-li-avatar">💼</div><div><strong>Your Brand</strong><br><small>Company · 1,234 followers</small></div></div><div class="cp-li-body">${esc(text)}</div><div class="cp-li-bar"><div class="cp-li-fill" style="width:${pct}%"></div></div><div class="cp-li-count">${len} / 1,300 recommended · ${len > 1300 ? '⚠️ Too long' : '✓ Good length'}</div></div>`;
  } else if (dest === 'Instagram') {
    container.innerHTML = `<div class="cp-ig"><div class="cp-ig-header"><div class="cp-ig-avatar">📸</div><strong>yourbrand</strong></div><div class="cp-ig-body">${esc(text)}</div><div class="cp-ig-count">${len} / 2,200 characters · ${len > 2200 ? '⚠️ OVER LIMIT' : '✓ OK'}</div><div class="cp-ig-tip">💡 Tip: Add 5-10 relevant hashtags for better reach</div></div>`;
  } else if (dest === 'Email') {
    const lines = text.split('\n');
    const subject = lines[0] || '';
    const body = lines.slice(1).join('\n') || text;
    container.innerHTML = `<div class="cp-email"><div class="cp-email-header"><div><strong>From:</strong> yourbrand@company.com</div><div><strong>Subject:</strong> ${esc(subject)} ${subject.length > 60 ? '⚠️ (' + subject.length + ' chars, aim for <60)' : '✓'}</div></div><div class="cp-email-body">${esc(body)}</div></div>`;
  } else {
    container.innerHTML = `<div class="cp-web"><div class="cp-web-badge">${dest}</div><div class="cp-web-body">${esc(text)}</div><div class="cp-web-count">${len} characters</div></div>`;
  }
}

function updateRevised() {
  state.revised=channelFormat(state.draft);
  if($('revisedCopy'))$('revisedCopy').textContent=state.revised; renderChannelPreview();
  if($('channelTag'))$('channelTag').textContent=$('channelSelect')?.value || 'Website';
  if($('charWarning')) { const limit=($('channelSelect')?.value==='X')?280:null; $('charWarning').textContent=limit&&state.revised.length>limit?`${state.revised.length-limit} characters over X's 280 character limit`:`${state.revised.length} characters`; $('charWarning').classList.toggle('warning',!!limit&&state.revised.length>limit); }
}


// ─── Voice Recognition ─────────────────────────────────────
let recognition = null;
let originalDraftText = '';
function initVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { toast('Voice recognition not supported in this browser. Use Chrome or Edge.'); return; }
  if (recognition) { recognition.stop(); recognition = null; return; }
  recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = true;
  const btn = $('voiceBtn');
  const input = $('draftInput');
  originalDraftText = (input?.value || '').trim();
  recognition.onstart = () => { if (btn) { btn.classList.add('recording'); btn.textContent = '⏹ Stop'; } toast('Listening... speak now'); };
  let finalTranscript = '';
  recognition.onresult = (e) => {
    let interim = '';
    for (let i = e.resultIndex; i < e.results.length; i++) {
      if (e.results[i].isFinal) {
        finalTranscript += e.results[i][0].transcript + ' ';
      } else {
        interim += e.results[i][0].transcript;
      }
    }
    if (input) {
      const separator = originalDraftText && finalTranscript ? '\n\n' : '';
      input.value = originalDraftText + separator + finalTranscript + interim;
      input.dispatchEvent(new Event('input'));
    }
  };
  recognition.onerror = (e) => {
    if (e.error === 'no-speech') { toast('No speech detected. Try again.'); }
    else if (e.error === 'not-allowed') { toast('Microphone access denied. Allow mic in browser settings.'); }
    else { toast('Voice error: ' + e.error); }
    stopVoice();
  };
  recognition.onend = () => { stopVoice(); };
  try { recognition.start(); } catch (e) { toast('Could not start voice recognition: ' + e.message); stopVoice(); }
}
function stopVoice() {
  if (recognition) { try { recognition.stop(); } catch(e){} recognition = null; }
  const btn = $('voiceBtn');
  if (btn) { btn.classList.remove('recording'); btn.textContent = '🎤 Voice'; }
}


// ─── Share Draft Functions ──────────────────────────────────
function getDraftText() { return ($('draftInput')?.value || '').trim(); }

function shareEmail() {
  const text = getDraftText();
  if (!text) { toast('Write a draft first'); return; }
  const subject = encodeURIComponent('Brand-compliant draft for review');
  const body = encodeURIComponent(text);
  window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  toast('Opening email client...');
}

function shareCopy() {
  const text = getDraftText();
  if (!text) { toast('Write a draft first'); return; }
  navigator.clipboard.writeText(text).then(() => toast('Copied to clipboard!')).catch(() => toast('Copy failed'));
}

function shareDownload() {
  const text = getDraftText();
  if (!text) { toast('Write a draft first'); return; }
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'draft.txt';
  a.click();
  URL.revokeObjectURL(url);
  toast('Downloaded draft.txt');
}


function rescan() {
  const revised = ($('revisedCopy')?.textContent || '').trim();
  if (!revised) { toast('No revised draft to re-scan'); return; }
  const prevFindings = [...state.findings];
  $('draftInput').value = revised;
  updateWordCount();
  const prevCount = prevFindings.length;
  analyze();
  const newCount = state.findings.length;
  const resolved = prevFindings.filter(pf => !state.findings.some(nf => nf.ruleId === pf.ruleId && nf.quote === pf.quote)).length;
  const remaining = newCount - (prevCount - resolved);
  const msg = `${resolved} resolved · ${Math.max(0, newCount - (prevCount - resolved))} remaining · ${Math.max(0, newCount - prevCount + resolved)} new`;
  toast(`Re-scan: ${msg}`);
  if ($('analysisMessage')) $('analysisMessage').textContent = `Re-scan complete · ${msg} · ${state.company.rules.length} rules checked`;
}

function analyze() {
  const text=$('draftInput')?.value.trim() || '';
  if(!text){ toast('Add or upload draft text first'); $('draftInput')?.focus(); return; }
  try {
    state.draft=text; state.findings=findMatches(text, $('channelSelect')?.value); drawHighlight(); drawFindings(); updateRevised(); renderChannelPreview();
    const profile = localStorage.getItem('rakshak_profile');
    if (profile) { const p = JSON.parse(profile); localStorage.setItem('rakshak_history_' + p.name, JSON.stringify(state.history)); }
  } catch (e) {
    toast('Analysis failed: ' + (e.message || 'Unknown error'));
    console.error('Analyze error:', e);
    return;
  }
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
  let text=pages.join('\n\n');
  // OCR fallback for scanned PDFs
  if(!text.trim() && window.Tesseract){
    toast('No text found — running OCR on scanned pages...');
    const ocrPages=[];
    for(let n=1;n<=pdf.numPages;n++){
      const page=await pdf.getPage(n);
      const vp=page.getViewport({scale:2});
      const canvas=document.createElement('canvas');canvas.width=vp.width;canvas.height=vp.height;
      const ctx=canvas.getContext('2d');await page.render({canvasContext:ctx,viewport:vp}).promise;
      const {data:{text:t}}=await window.Tesseract.recognize(canvas,'eng',{logger:m=>{}});
      ocrPages.push(t);
    }
    text=ocrPages.join('\n\n');
    if(!text.trim()) throw new Error('OCR could not extract text from this PDF.');
  } else if(!text.trim()) throw new Error('No selectable text was found. This version cannot read scanned PDFs.');
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
    else if(file.type.startsWith('image/') && window.Tesseract){ toast('Running OCR on image...'); const {data:{text:t}}=await window.Tesseract.recognize(file,'eng',{logger:m=>{}}); text=t; }
    else {toast('Use a text file, PDF, or image');return;}
    if (!text.trim()) { toast('No text could be extracted from this file. Try a different format.'); return; }
    $('draftInput').value=text; $('draftMeta') && ($('draftMeta').textContent=`${text.trim().split(/\s+/).filter(Boolean).length} words · ${text.length.toLocaleString()} characters`); $('pdfMeta') && ($('pdfMeta').textContent=file.name.toLowerCase().endsWith('.pdf')?'Text extracted from PDF · page references are not included in this prototype':'Text file loaded'); toast('Draft loaded in browser');
  } catch(error) { toast(error.message || 'Could not read that file'); }
}

async function inspectLogo(file) {
  if(!file)return;
  if(file.size>10*1024*1024){toast('File must be under 10 MB');return;}
  // Handle PDF: render first page to image
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    if (!window.pdfjsLib) { toast('PDF engine not loaded'); return; }
    toast('Extracting logo from PDF...');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const scale = 2;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d');
      await page.render({ canvasContext: ctx, viewport }).promise;
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
      file = new File([blob], file.name.replace('.pdf', '.png'), { type: 'image/png' });
    } catch (e) {
      toast('Could not extract from PDF: ' + e.message);
      return;
    }
  }
  const url=URL.createObjectURL(file);
  const img=new Image();
  img.onload=async()=>{
    const refImg = $('logoRefImg');
    if (!refImg || !refImg.complete) { toast('Reference logo not loaded'); return; }
    const uploadedImg = $('logoUploadedImg');
    if (uploadedImg) { uploadedImg.src = url; uploadedImg.classList.remove('hidden'); }
    const uploadedMeta = $('logoUploadedMeta');
    if (uploadedMeta) { uploadedMeta.textContent = `${img.naturalWidth} × ${img.naturalHeight}px · ${Math.round(file.size/1024)} KB · ${file.type}`; uploadedMeta.classList.remove('hidden'); }
    const findings = compareLogos(refImg, img, file);
    if ($('logoResult')) {
      const html = findings.map(f => `<div class="logo-finding ${f.severity}"><span class="logo-finding-icon">${f.icon}</span><div><strong>${esc(f.title)}</strong><small>${esc(f.detail)}</small></div></div>`).join('');
      $('logoResult').innerHTML = `<div class="logo-findings">${html}</div>`;
      $('logoResult').classList.remove('hidden');
    }
    drawLogoDiff(refImg, img);
    const issues = findings.filter(f=>f.severity==='high').length;
    toast(`Logo review complete · ${issues} issue${issues===1?'':'s'} found`);
  };
  img.onerror=()=>toast('Could not preview this logo file');img.src=url;
}

function checkTransparency(img) {
  const c = document.createElement('canvas');
  c.width = Math.min(img.naturalWidth, 100);
  c.height = Math.min(img.naturalHeight, 100);
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, c.width, c.height);
  const data = ctx.getImageData(0, 0, c.width, c.height).data;
  for (let i = 3; i < data.length; i += 4) { if (data[i] < 255) return true; }
  return false;
}

function getDominantColors(img) {
  const c = document.createElement('canvas');
  c.width = 50; c.height = 50;
  const ctx = c.getContext('2d');
  ctx.drawImage(img, 0, 0, 50, 50);
  const data = ctx.getImageData(0, 0, 50, 50).data;
  const colors = {};
  for (let i = 0; i < data.length; i += 4) {
    const r = Math.round(data[i]/32)*32;
    const g = Math.round(data[i+1]/32)*32;
    const b = Math.round(data[i+2]/32)*32;
    const key = `${r},${g},${b}`;
    colors[key] = (colors[key]||0) + 1;
  }
  return Object.entries(colors).sort((a,b)=>b[1]-a[1]).slice(0,5).map(e=>e[0]);
}

function compareColors(ref, up) {
  if (!ref.length || !up.length) return 0;
  let matches = 0;
  for (const rc of ref) { if (up.includes(rc)) matches++; }
  return matches / Math.max(ref.length, up.length);
}

function getPixelDiff(refImg, upImg) {
  const w = Math.min(refImg.naturalWidth, upImg.naturalWidth, 200);
  const h = Math.min(refImg.naturalHeight, upImg.naturalHeight, 200);
  const c1 = document.createElement('canvas'); c1.width = w; c1.height = h;
  const c2 = document.createElement('canvas'); c2.width = w; c2.height = h;
  c1.getContext('2d').drawImage(refImg, 0, 0, w, h);
  c2.getContext('2d').drawImage(upImg, 0, 0, w, h);
  const d1 = c1.getContext('2d').getImageData(0, 0, w, h).data;
  const d2 = c2.getContext('2d').getImageData(0, 0, w, h).data;
  let diff = 0; const total = w * h;
  for (let i = 0; i < d1.length; i += 4) {
    const dr = Math.abs(d1[i]-d2[i]);
    const dg = Math.abs(d1[i+1]-d2[i+1]);
    const db = Math.abs(d1[i+2]-d2[i+2]);
    if (dr + dg + db > 30) diff++;
  }
  return diff / total;
}

function compareLogos(refImg, uploadedImg, file) {
  const findings = [];
  const refW = refImg.naturalWidth, refH = refImg.naturalHeight;
  const upW = uploadedImg.naturalWidth, upH = uploadedImg.naturalHeight;
  if (upW < 120 || upH < 120) findings.push({ severity:'high', icon:'⚠️', title:'Too small', detail:`Uploaded is ${upW}×${upH}px. Minimum recommended: 120×120px.` });
  const refRatio = refW / refH;
  const upRatio = upW / upH;
  if (Math.abs(refRatio - upRatio) > 0.1) findings.push({ severity:'high', icon:'📐', title:'Aspect ratio mismatch', detail:`Reference: ${refRatio.toFixed(2)}:1. Uploaded: ${upRatio.toFixed(2)}:1. Logo may be distorted.` });
  if (file.size > 1024*1024) findings.push({ severity:'medium', icon:'📦', title:'Large file size', detail:`${Math.round(file.size/1024)} KB. Optimize to under 1 MB for web use.` });
  if (!file.type.includes('png') && !file.type.includes('svg')) findings.push({ severity:'medium', icon:'🎨', title:'Format not recommended', detail:`${file.type} may not support transparency. Use PNG or SVG.` });
  const hasAlpha = checkTransparency(uploadedImg);
  if (!hasAlpha) findings.push({ severity:'medium', icon:'🔲', title:'No transparency detected', detail:'Logo should have transparent background for versatile use.' });
  const refColors = getDominantColors(refImg);
  const upColors = getDominantColors(uploadedImg);
  const colorMatch = compareColors(refColors, upColors);
  if (colorMatch < 0.7) findings.push({ severity:'high', icon:'🎨', title:'Color palette mismatch', detail:`Only ${Math.round(colorMatch*100)}% color similarity. Colors may have been altered.` });
  const diffPercent = getPixelDiff(refImg, uploadedImg);
  if (diffPercent > 0.15) findings.push({ severity:'high', icon:'🔍', title:'Significant pixel differences', detail:`${Math.round(diffPercent*100)}% of pixels differ from reference. Logo may be modified.` });
  else if (diffPercent > 0.05) findings.push({ severity:'review', icon:'🔍', title:'Minor pixel differences', detail:`${Math.round(diffPercent*100)}% of pixels differ. Could be compression or resizing.` });
  if (findings.length === 0) findings.push({ severity:'low', icon:'✅', title:'No issues detected', detail:'Logo matches reference in dimensions, colors, and pixels.' });
  return findings;
}

function drawLogoDiff(refImg, upImg) {
  const canvas = $('diffCanvas');
  if (!canvas) return;
  const w = Math.min(refImg.naturalWidth, upImg.naturalWidth, 300);
  const h = Math.min(refImg.naturalHeight, upImg.naturalHeight, 300);
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const c1 = document.createElement('canvas'); c1.width = w; c1.height = h;
  const c2 = document.createElement('canvas'); c2.width = w; c2.height = h;
  c1.getContext('2d').drawImage(refImg, 0, 0, w, h);
  c2.getContext('2d').drawImage(upImg, 0, 0, w, h);
  const d1 = c1.getContext('2d').getImageData(0, 0, w, h).data;
  const d2 = c2.getContext('2d').getImageData(0, 0, w, h).data;
  const out = ctx.createImageData(w, h);
  for (let i = 0; i < d1.length; i += 4) {
    const dr = Math.abs(d1[i]-d2[i]);
    const dg = Math.abs(d1[i+1]-d2[i+1]);
    const db = Math.abs(d1[i+2]-d2[i+2]);
    if (dr + dg + db > 30) {
      out.data[i] = 255; out.data[i+1] = 60; out.data[i+2] = 60; out.data[i+3] = 200;
    } else {
      out.data[i] = d1[i]; out.data[i+1] = d1[i+1]; out.data[i+2] = d1[i+2]; out.data[i+3] = 80;
    }
  }
  ctx.putImageData(out, 0, 0);
  $('logoDiffCanvas').classList.remove('hidden');
}


function downloadReport() {
  const channel = $('channelSelect')?.value || 'Website';
  const blockers = state.findings.filter(f=>f.severity==='high').length;
  const warnings = state.findings.filter(f=>f.severity==='medium').length;
  const reviews = state.findings.filter(f=>f.severity==='review').length;
  const findings = state.findings.map(f=>`${f.ruleId} | ${f.severity.toUpperCase()} | ${f.status.toUpperCase()} | ${f.title}\nMatched text: "${f.quote}"\nGuidance: ${f.detail}\nSuggested fix: ${f.fix||'n/a'}\nSource: ${f.source}\nURL: ${f.url}\n`).join('\n---\n');
  const report = `RAKSHAK 2.0 · REVIEW REPORT
Company: ${state.company.name}
Industry: ${localStorage.getItem('rakshak_profile') ? JSON.parse(localStorage.getItem('rakshak_profile')).industry : 'n/a'}
Channel: ${channel}
Rules checked: ${state.company.rules.length}
Generated: ${new Date().toISOString()}

COMPLIANCE SUMMARY
Passed: ${Math.max(0, state.company.rules.length - state.findings.length)}
Warnings: ${warnings}
Blockers: ${blockers}
Advisory: ${reviews}
Total findings: ${state.findings.length}

FINDINGS
${findings || 'No findings.'}

REVISED DRAFT
${state.revised || '(none)'}

ORIGINAL DRAFT
${state.draft || '(none)'}

---
This report is a pre-screening aid, not a compliance guarantee.
Rules are deterministic (regex). AI polish is advisory only.
`;
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([report],{type:'text/plain'}));a.download=`rakshak-review-${state.company.name.toLowerCase().replace(/\W+/g,'-')}-${new Date().toISOString().slice(0,10)}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  toast('Report downloaded');
}

function aiKey() { return localStorage.getItem('rakshak_ai_key') || ''; }
function aiBase() { return (localStorage.getItem('rakshak_ai_base') || 'https://api.groq.com/openai/v1').trim(); }
function aiModel() { let v = ($('aiModelInput') && $('aiModelInput').value.trim()) || localStorage.getItem('rakshak_ai_model') || ''; v = v.replace(/verseatile/gi,'versatile'); if (!v || v==='llama-3.1-8b-instant') v='openai/gpt-oss-20b'; return v; }
function refreshAiStatus() { const k=aiKey(); if($('aiKeyStatus')) $('aiKeyStatus').textContent = k ? 'SET' : 'NOT SET'; if($('aiKeyInput')) $('aiKeyInput').value = k; if($('aiBaseInput')) $('aiBaseInput').value = aiBase(); if($('aiModelInput')) $('aiModelInput').value = aiModel(); }
let _offlinePipe = null;
async function loadOfflineModel() {
  if (_offlinePipe) return _offlinePipe;
  if (!window.transformers) throw new Error('Offline AI library not loaded');
  const { pipeline } = window.transformers;
  toast('Loading offline AI model (first time, ~500MB)...');
  _offlinePipe = await pipeline('text-generation', 'Xenova/Qwen2.5-0.5B-Instruct', { dtype: 'q4' });
  return _offlinePipe;
}

async function polishOffline(text, findings) {
  const pipe = await loadOfflineModel();
  const prompt = `Rewrite this marketing copy to comply with brand rules. Keep meaning and tone. Return only rewritten copy.\nRules:\n${findings || 'none'}\n\nDraft:\n${text}\n\nRewritten:`;
  const out = await pipe(prompt, { max_new_tokens: 256, temperature: 0.3, do_sample: false });
  return (out?.[0]?.generated_text || '').replace(prompt, '').trim();
}

async function polishWithAi() {
  if (!state.revised) { toast('Run a review first'); return; }
  const result = $('aiPolishResult'); if (result) { result.classList.remove('hidden'); result.innerHTML = '<span class="ai-label">AI POLISH · WORKING…</span>Polishing…'; }
  const findings = state.findings.map(f => `${f.ruleId}: ${f.title} — ${f.detail}`).join('\n');
  const online = navigator.onLine && aiKey();
  try {
    let text = '', mode = '';
    if (online) {
      mode = 'ONLINE';
      const res = await fetch(`${aiBase().replace(/\/+$/,'')}/chat/completions`, {
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${aiKey()}`},
        body: JSON.stringify({ model: aiModel(), messages:[
          {role:'system', content:'You rewrite marketing copy to comply with brand rules. Keep meaning, tone, facts. Return only rewritten copy.'},
          {role:'user', content:`Rules:\n${findings || 'none'}\n\nDraft:\n${state.revised}\n\nRewrite:`}
        ], temperature:0.3 })
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      text = data?.choices?.[0]?.message?.content?.trim() || '';
    } else {
      mode = 'OFFLINE';
      text = await polishOffline(state.revised, findings);
    }
    if (result) result.innerHTML = `<span class="ai-label">AI POLISH · ${mode} · AI-GENERATED · REVIEW BEFORE USE</span>${esc(text)}<p class="section-note">Proposed rewrite only. Re-run Analyze to verify.</p>`;
    const polishedFindings = findMatches(text, $('channelSelect')?.value);
    const newCount = polishedFindings.length;
    toast(`AI polish complete (${mode}) · ${newCount} finding${newCount===1?'':'s'} in polished version`);
  } catch (e) {
    // If online fails, try offline
    if (online) {
      try {
        const text = await polishOffline(state.revised, findings);
        if (result) result.innerHTML = `<span class="ai-label">AI POLISH · OFFLINE FALLBACK · REVIEW BEFORE USE</span>${esc(text)}<p class="section-note">Proposed rewrite only.</p>`;
        toast('Online failed — used offline AI');
        return;
      } catch (e2) {}
    }
    if (result) result.innerHTML = `<span class="ai-label">AI POLISH · FAILED</span>${esc(e.message || 'Request failed')}`;
    toast('AI polish failed');
  }
}


// ─── AI Chatbot (Pet Assistant) ─────────────────────────────
function initChatbot() {
  const toggle = $('chatbotToggle');
  const panel = $('chatbotPanel');
  const close = $('chatbotClose');
  const input = $('chatbotInput');
  const send = $('chatbotSend');
  const messages = $('chatbotMessages');
  if (!toggle || !panel) return;

  // Restore avatar from localStorage
  const savedAvatar = localStorage.getItem('rakshak_chatbot_avatar') || '🤖';
  const avatars = document.querySelectorAll('.chatbot-avatar');
  avatars.forEach(a => a.textContent = savedAvatar);

  toggle.addEventListener('click', () => panel.classList.toggle('hidden'));
  close?.addEventListener('click', () => panel.classList.add('hidden'));

  document.querySelectorAll('.avatar-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const av = btn.dataset.avatar;
      localStorage.setItem('rakshak_chatbot_avatar', av);
      document.querySelectorAll('.chatbot-avatar').forEach(a => a.textContent = av);
      toast('Pet changed to ' + av);
    });
  });

  const chatHistory = [];
  async function sendMessage() {
    const text = (input?.value || '').trim();
    if (!text) return;
    if (input) input.value = '';
    // Add user message
    const userMsg = document.createElement('div');
    userMsg.className = 'chatbot-msg user';
    userMsg.textContent = text;
    messages?.appendChild(userMsg);
    messages?.scrollTo(0, messages.scrollHeight);
    chatHistory.push({ role: 'user', content: text });

    // Get AI response
    const botMsg = document.createElement('div');
    botMsg.className = 'chatbot-msg bot';
    botMsg.textContent = 'Thinking...';
    messages?.appendChild(botMsg);
    messages?.scrollTo(0, messages.scrollHeight);

    const draft = ($('draftInput')?.value || '').trim();
    const findings = state.findings.map(f => `${f.ruleId}: ${f.title} (${f.severity})`).join(', ') || 'none';
    const dest = $('channelSelect')?.value || 'Website';
    const systemPrompt = `You are Rakshak, a helpful brand compliance assistant pet. You help users review content for brand compliance. Current context: destination=${dest}, findings=${findings}, draft length=${draft.length} chars. Answer helpfully, concisely, and with personality. If the user asks about their draft, reference the findings.`;

    try {
      let reply = '';
      if (navigator.onLine && aiKey()) {
        // Build messages with conversation history
        const msgs = [{ role: 'system', content: systemPrompt }, ...chatHistory.slice(-6)];
        const res = await fetch(`${aiBase().replace(/\/+$/,'')}/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${aiKey()}` },
          body: JSON.stringify({ model: aiModel(), messages: msgs, temperature: 0.7, max_tokens: 300, stream: true })
        });
        if (res.ok) {
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          botMsg.textContent = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter(l => l.trim().startsWith('data:'));
            for (const line of lines) {
              const data = line.replace(/^data:\s*/, '').trim();
              if (data === '[DONE]') continue;
              try {
                const json = JSON.parse(data);
                const token = json?.choices?.[0]?.delta?.content || '';
                if (token) { reply += token; botMsg.textContent = reply; messages?.scrollTo(0, messages.scrollHeight); }
              } catch {}
            }
          }
          if (!reply) reply = 'No response';
        } else {
          throw new Error('API error ' + res.status);
        }
      } else if (window.transformers) {
        const pipe = await loadOfflineModel();
        const prompt = `${systemPrompt}\n${chatHistory.map(m => m.role + ': ' + m.content).join('\n')}\nassistant:`;
        const out = await pipe(prompt, { max_new_tokens: 128, temperature: 0.7, do_sample: true });
        reply = (out?.[0]?.generated_text || '').replace(prompt, '').trim() || 'No response';
        botMsg.textContent = reply;
      } else {
        reply = 'AI is not available. Set an API key in Settings or wait for offline model to load.';
        botMsg.textContent = reply;
      }
      chatHistory.push({ role: 'assistant', content: reply });
    } catch (e) {
      botMsg.textContent = 'Sorry, I encountered an error. Try again or check your API key in Settings.';
    }
    messages?.scrollTo(0, messages.scrollHeight);
  }

  send?.addEventListener('click', sendMessage);
  input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
}


function bind() {
  // Seed demo companies if none exist
  if (getCompanies().length === 0) {
    const demoSeeds = [
      { name: 'Mozilla', code: 'MOZ-2026', industry: 'media' },
      { name: 'Mailchimp', code: 'MAIL-2026', industry: 'ecommerce' },
      { name: 'Acme SaaS', code: 'ACME-2026', industry: 'tech' },
      { name: 'Pharma Corp', code: 'PHARMA-2026', industry: 'healthcare' },
      { name: 'ChemSafe Ltd', code: 'GHS-2026', industry: 'chemical' },
      { name: 'FinServe Inc', code: 'FINRA-2026', industry: 'finance' },
    ];
    saveCompanies(demoSeeds);
  }
  if($('demoHint'))$('demoHint').textContent=`Demo access code: ${DEMO_COMPANIES.mozilla.code} · Prototype only`;
  $('loginForm')?.addEventListener('submit',e=>{e.preventDefault();login();});
  $('logoRefFile')?.addEventListener('change', e => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = $('logoRefImg');
    if (img) { img.src = url; img.onload = () => { if ($('logoRefMeta')) $('logoRefMeta').textContent = `${img.naturalWidth} × ${img.naturalHeight}px`; }; }
    toast('Reference logo updated');
  });
  $('logoDatasetSelect')?.addEventListener('change', e => {
    const val = e.target.value;
    if (!val) return;
    const img = $('logoRefImg');
    if (img) {
      img.src = `./logos/${val}.png`;
      img.onload = () => { if ($('logoRefMeta')) $('logoRefMeta').textContent = `${img.naturalWidth} × ${img.naturalHeight}px · ${val}`; toast('Reference: ' + val); };
    }
  });
  $('industrySelect')?.addEventListener('change', () => { populateCompanySelect(); setTimeout(updateDemoHint, 50); });
  $('companySelect')?.addEventListener('change', updateDemoHint);
  function showModal() {
    const m = $('newCompanyModal');
    if (!m) return;
    m.style.display = 'flex';
    requestAnimationFrame(() => {
      m.style.opacity = '1';
      const modal = m.querySelector('.modal');
      if (modal) { modal.style.transform = 'scale(1)'; modal.style.opacity = '1'; }
    });
  }
  function hideModal() {
    const m = $('newCompanyModal');
    if (!m) return;
    m.style.opacity = '0';
    const modal = m.querySelector('.modal');
    if (modal) { modal.style.transform = 'scale(0.95)'; modal.style.opacity = '0'; }
    setTimeout(() => { m.style.display = 'none'; }, 200);
  }
  const newBtn = $('newCompanyBtn');
  if (newBtn) newBtn.addEventListener('click', showModal);
  const closeBtn = $('closeNewCompany');
  if (closeBtn) closeBtn.addEventListener('click', hideModal);
  // Close on overlay click
  const overlay = $('newCompanyModal');
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) hideModal(); });
  // Close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay?.style.display === 'flex') hideModal(); });
  const createBtn = $('createCompanyBtn');
  if (createBtn) createBtn.addEventListener('click', () => {
    const name = ($('newCompanyName')?.value || '').trim();
    const code = ($('newCompanyCode')?.value || '').trim();
    const industry = $('industrySelect')?.value || 'tech';
    if (!name || !code) { toast('Enter company name and access code'); return; }
    const companies = getCompanies();
    if (companies.find(c => c.name === name && c.industry === industry)) { toast('Company already exists'); return; }
    companies.push({ name, code, industry });
    saveCompanies(companies);
    populateCompanySelect();
  setTimeout(updateDemoHint, 100);
    const select = $('companySelect');
    if (select) select.value = name;
    hideModal();
    toast('Company created: ' + name);
  });
  
  $('togglePassword')?.addEventListener('click',()=>{const p=$('passwordInput');p.type=p.type==='password'?'text':'password';$('togglePassword').textContent=p.type==='password'?'Show':'Hide';$('togglePassword').setAttribute('aria-label',p.type==='password'?'Show access code':'Hide access code');});
  $('profileTrigger')?.addEventListener('click',()=>{const menu=$('profileMenu');if(!menu)return;const opening=menu.classList.contains('hidden');menu.classList.toggle('hidden',!opening);menu.classList.toggle('open',opening);$('profileTrigger').setAttribute('aria-expanded',String(opening));});
  $('settingsButton')?.addEventListener('click',()=>showView('settings')); $('signOutButton')?.addEventListener('click',signOut);
  $('changeCompany')?.addEventListener('click',signOut); $('settingsChangeCompany')?.addEventListener('click',signOut);
  document.querySelectorAll('[data-view]').forEach(tab=>tab.addEventListener('click',()=>showView(tab.dataset.view)));
  $('analyzeButton')?.addEventListener('click',analyze);
$('saveToDbBtn')?.addEventListener('click',async()=>{const draft=$('draftInput')?.value||'';if(!draft.trim()){toast('Nothing to save');return;}try{const profile=localStorage.getItem('rakshak_profile');const p=profile?JSON.parse(profile):{};await saveFileToDB(draft,state.findings,p.industry||state.industry,p.company||state.company);toast('Saved to database');renderSavedFiles();}catch(e){toast('Save failed');console.error(e);}});
  $('voiceBtn')?.addEventListener('click',initVoice);
  $('shareEmail')?.addEventListener('click',shareEmail);
  $('shareCopy')?.addEventListener('click',shareCopy);
  $('shareDownload')?.addEventListener('click',shareDownload); $('loadSample')?.addEventListener('click',()=>{$('draftInput').value=SAMPLE;$('sourceFileName').textContent='sample-launch-copy.txt';reveal('sourceFileName',true);updateWordCount();toast('Sample draft loaded');});
  $('draftInput')?.addEventListener('input',updateWordCount);
  $('draftFile')?.addEventListener('change',e=>handleDraft(e.target.files[0])); $('logoFile')?.addEventListener('change',e=>inspectLogo(e.target.files[0]));
  $('channelSelect')?.addEventListener('change',()=>{if(state.findings.length){analyze();}else{updateRevised();} renderChannelPreview();}); $('copyRevised')?.addEventListener('click',async()=>{if(!state.revised){toast('Run a review first');return;}await navigator.clipboard.writeText(state.revised);toast('Revised draft copied');});
  $('downloadReport')?.addEventListener('click',downloadReport); $('rescanButton')?.addEventListener('click',rescan); $('clearSession')?.addEventListener('click',()=>{state.history=[];drawHistory();toast('Session history cleared');});
  $('expandGuidelines')?.addEventListener('click',()=>showView('guidelines')); $('openGuidelines')?.addEventListener('click',()=>showView('guidelines'));
  $('guidelineDocument')?.addEventListener('load',()=>{});
  $('highlightedCopy')?.addEventListener('click',e=>{const mark=e.target.closest('mark');if(mark)focusFinding(mark.dataset.findingId);});
  $('backButton')?.addEventListener('click',()=>{ if(state.previousView) showView(state.previousView); });
  $('polishAi')?.addEventListener('click',polishWithAi);
  $('saveAiKey')?.addEventListener('click',()=>{const k=$('aiKeyInput')?.value.trim()||''; if(k) localStorage.setItem('rakshak_ai_key',k); else localStorage.removeItem('rakshak_ai_key'); const b=$('aiBaseInput')?.value.trim(); if(b) localStorage.setItem('rakshak_ai_base',b); const m=$('aiModelInput')?.value.trim(); if(m) localStorage.setItem('rakshak_ai_model',m); refreshAiStatus(); toast(k?'AI key saved in this browser':'AI key cleared');});
  $('clearAiKey')?.addEventListener('click',()=>{localStorage.removeItem('rakshak_ai_key'); if($('aiKeyInput'))$('aiKeyInput').value=''; refreshAiStatus(); toast('AI key cleared');});
  refreshAiStatus();
  initChatbot();
  populateCompanySelect();

}

function signOut() {
  const profile = localStorage.getItem('rakshak_profile');
  if (profile && state.history.length) {
    const p = JSON.parse(profile);
    localStorage.setItem('rakshak_history_' + p.name, JSON.stringify(state.history));
  }
  state.findings=[];state.history=[];state.draft='';state.revised='';state.logo=null;
  if($('draftInput'))$('draftInput').value='';if($('passwordInput'))$('passwordInput').value='';
  localStorage.removeItem('rakshak_profile');
  const ws = $('workspace');
  const ls = $('loginScreen');
  if (ws) { ws.classList.add('hidden'); ws.hidden = true; }
  if (ls) { ls.classList.remove('hidden'); ls.hidden = false; }if($('profileMenu')){$('profileMenu').classList.add('hidden');$('profileMenu').classList.remove('open');}$('profileTrigger')?.setAttribute('aria-expanded','false');drawHistory();
}

function updateWordCount() { const value=$('draftInput')?.value||''; if($('draftMeta'))$('draftMeta').textContent=`${value.trim().split(/\s+/).filter(Boolean).length} words · ${value.length.toLocaleString()} characters`; }

async function loadPdfJs() {
  try { const module=await import('./vendor/pdf.min.mjs'); window.pdfjsLib=module; module.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdf.worker.min.mjs',import.meta.url).href; }
  catch(error){ console.warn('PDF.js unavailable; text files still work.',error); }
}

/* ═══ INDUSTRY DATABASE (IndexedDB) ═══ */
const DB_NAME = 'rakshak_db';
const DB_VERSION = 1;
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    if (db) { resolve(db); return; }
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('files')) {
        const store = d.createObjectStore('files', { keyPath: 'id', autoIncrement: true });
        store.createIndex('industry', 'industry', { unique: false });
        store.createIndex('company', 'company', { unique: false });
      }
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = (e) => reject(e.target.error);
  });
}

async function saveFileToDB(draft, findings, industry, company) {
  const d = await openDB();
  return new Promise((resolve, reject) => {
    const tx = d.transaction('files', 'readwrite');
    const store = tx.objectStore('files');
    const record = {
      industry: industry || 'general',
      company: company || 'unknown',
      draft: draft || '',
      findings: findings || [],
      savedAt: new Date().toISOString(),
      wordCount: (draft || '').trim().split(/\s+/).filter(Boolean).length
    };
    const req = store.add(record);
    req.onsuccess = () => resolve(req.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function getFilesByIndustry(industry) {
  const d = await openDB();
  return new Promise((resolve, reject) => {
    const tx = d.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    const idx = store.index('industry');
    const req = idx.getAll(industry);
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function getAllFiles() {
  const d = await openDB();
  return new Promise((resolve, reject) => {
    const tx = d.transaction('files', 'readonly');
    const store = tx.objectStore('files');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = (e) => reject(e.target.error);
  });
}

async function deleteFileFromDB(id) {
  const d = await openDB();
  return new Promise((resolve, reject) => {
    const tx = d.transaction('files', 'readwrite');
    const store = tx.objectStore('files');
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = (e) => reject(e.target.error);
  });
}

// Render saved files list for current industry
async function renderSavedFiles() {
  const container = $('savedFilesList');
  if (!container) return;
  const industry = state.industry || 'tech';
  try {
    const files = await getFilesByIndustry(industry);
    if (files.length === 0) {
      container.innerHTML = '<p style="color:var(--tan);font-size:12px;">No saved files for this industry yet.</p>';
      return;
    }
    container.innerHTML = files.map(f => `
      <div class="saved-file-item" style="padding:8px 12px;border:1px solid var(--line);border-radius:8px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:12px;">${f.wordCount} words</strong>
          <span style="font-size:10px;color:var(--tan);margin-left:8px;">${new Date(f.savedAt).toLocaleDateString()}</span>
        </div>
        <div style="display:flex;gap:6px;">
          <button class="button button-outline" style="font-size:9px;padding:4px 8px;" onclick="loadSavedFile(${f.id})">Load</button>
          <button class="button button-outline" style="font-size:9px;padding:4px 8px;" onclick="deleteSavedFile(${f.id})">Delete</button>
        </div>
      </div>
    `).join('');
  } catch (e) {
    console.error('Failed to load saved files:', e);
  }
}

async function loadSavedFile(id) {
  const d = await openDB();
  const tx = d.transaction('files', 'readonly');
  const store = tx.objectStore('files');
  const req = store.get(id);
  req.onsuccess = () => {
    const file = req.result;
    if (file && $('draftInput')) {
      $('draftInput').value = file.draft || '';
      state.draft = file.draft || '';
      state.findings = file.findings || [];
      updateWordCount();
      if (state.findings.length > 0) renderFindings();
      toast('File loaded from database');
    }
  };
}

async function deleteSavedFile(id) {
  try {
    await deleteFileFromDB(id);
    toast('File deleted');
    renderSavedFiles();
  } catch (e) {
    toast('Delete failed');
  }
}


bind(); loadPdfJs();
// Init DB
openDB().then(() => console.log("DB ready")).catch(e => console.warn("DB init failed", e));
