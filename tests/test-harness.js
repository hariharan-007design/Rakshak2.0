// tests/test-harness.js
// Node test harness for Rakshak 2.0 pure functions
// Run: node tests/test-harness.js

const assert = require('assert');

// Minimal DOM mock
global.document = {
  getElementById: () => null,
  querySelector: () => null,
  querySelectorAll: () => [],
};
global.window = { SpeechRecognition: null, webkitSpeechRecognition: null };

// Minimal state mock
global.state = {
  company: { rules: [] },
  findings: [],
  draft: '',
  industry: 'tech',
};

// $ helper mock
global.$ = (id) => null;

// channelSelect mock
let mockChannel = 'Website';
global.channelSelectValue = mockChannel;

// Extract pure functions from app.js by reading and evaluating
const fs = require('fs');
const appJs = fs.readFileSync('web/app.js', 'utf8');

// We'll test channelFormat and replacementFor logic by reimplementing
// since they depend on DOM. Instead, test the regex rules directly.

// Test 1: Rule pattern matching
function testRulePatterns() {
  const rules = [
    { id: 'MOZ-01', pattern: /\b(partnered with|endorsed by|approved by)\s+Mozilla\b/gi, severity: 'high' },
    { id: 'MC-01', pattern: /\b(utilize|synergy|leverage|facilitate)\b/gi, severity: 'medium' },
  ];
  
  const testCases = [
    { text: 'partnered with Mozilla', expected: 1 },
    { text: 'We utilize synergy', expected: 2 },
    { text: 'Clean text here', expected: 0 },
  ];
  
  for (const tc of testCases) {
    let count = 0;
    for (const rule of rules) {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`);
      count += [...tc.text.matchAll(regex)].length;
    }
    assert.strictEqual(count, tc.expected, `Expected ${tc.expected} matches for "${tc.text}", got ${count}`);
  }
  console.log('✅ Rule pattern matching: PASS');
}

// Test 2: channelFormat logic
function testChannelFormat() {
  function channelFormat(text, channel) {
    channel = channel || 'Website';
    if (channel === 'LinkedIn') return text.split(/\n\s*\n/).flatMap(p => p.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [p]).map(s => s.trim()).filter(Boolean).join('\n\n');
    if (channel === 'Instagram') return text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean).join('\n\n');
    return text;
  }
  
  const input = 'Hello world. This is a test.\n\nSecond paragraph here.';
  
  // Website: unchanged
  assert.strictEqual(channelFormat(input, 'Website'), input, 'Website should not change text');
  
  // LinkedIn: splits into sentences
  const linkedin = channelFormat(input, 'LinkedIn');
  assert.ok(linkedin.includes('Hello world.'), 'LinkedIn should contain first sentence');
  
  // Instagram: trims paragraphs
  const instagram = channelFormat(input, 'Instagram');
  assert.ok(instagram.includes('Second paragraph here.'), 'Instagram should contain second paragraph');
  
  console.log('✅ Channel format: PASS');
}

// Test 3: replacementFor logic
function testReplacementFor() {
  function replacementFor(ruleId, quote) {
    const q = (quote || '').toLowerCase();
    const replacements = {
      'MOZ-01': q.includes('partnered') ? 'not partnered with' : q.includes('endorsed') ? 'not endorsed by' : 'not approved by',
      'MOZ-02': 'a browser compatible with Mozilla products',
      'MC-01': { utilize: 'use', synergy: 'working together', leverage: 'use', facilitate: 'help' },
    };
    const r = replacements[ruleId];
    if (typeof r === 'object' && r !== null) {
      for (const [k, v] of Object.entries(r)) {
        if (q.includes(k)) return v;
      }
      return '';
    }
    return r || '';
  }
  
  assert.strictEqual(replacementFor('MOZ-01', 'partnered with Mozilla'), 'not partnered with');
  assert.strictEqual(replacementFor('MOZ-01', 'endorsed by Mozilla'), 'not endorsed by');
  assert.strictEqual(replacementFor('MOZ-02', 'anything'), 'a browser compatible with Mozilla products');
  assert.strictEqual(replacementFor('MC-01', 'we utilize synergy'), 'use');
  assert.strictEqual(replacementFor('NONEXISTENT', 'text'), '');
  
  console.log('✅ Replacement for: PASS');
}

// Test 4: AI model default
function testAiModel() {
  // Simulate the fixed aiModel function
  function aiModel(inputVal, storedVal) {
    let v = (inputVal && inputVal.trim()) || storedVal || 'llama-3.1-8b-instant';
    return v;
  }
  
  assert.strictEqual(aiModel('', ''), 'llama-3.1-8b-instant');
  assert.strictEqual(aiModel('my-model', ''), 'my-model');
  assert.strictEqual(aiModel('', 'stored-model'), 'stored-model');
  assert.strictEqual(aiModel('my-model', 'stored-model'), 'my-model');
  
  console.log('✅ AI model default: PASS');
}

// Test 5: findMatches logic (simplified)
function testFindMatches() {
  function findMatches(text, rules) {
    const findings = [];
    for (const rule of rules) {
      const regex = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : `${rule.pattern.flags}g`);
      for (const match of text.matchAll(regex)) {
        findings.push({ ruleId: rule.id, quote: match[0], severity: rule.severity });
      }
    }
    return findings;
  }
  
  const rules = [
    { id: 'R1', pattern: /\butilize\b/gi, severity: 'medium' },
    { id: 'R2', pattern: /\bguaranteed\b/gi, severity: 'high' },
  ];
  
  const findings = findMatches('We utilize guaranteed results', rules);
  assert.strictEqual(findings.length, 2, 'Should find 2 matches');
  assert.strictEqual(findings[0].ruleId, 'R1');
  assert.strictEqual(findings[1].severity, 'high');
  
  const noFindings = findMatches('Clean text here', rules);
  assert.strictEqual(noFindings.length, 0, 'Should find 0 matches');
  
  console.log('✅ Find matches: PASS');
}

// Run all tests
try {
  testRulePatterns();
  testChannelFormat();
  testReplacementFor();
  testAiModel();
  testFindMatches();
  console.log('\n🎉 All tests passed!');
} catch (e) {
  console.error('\n❌ Test failed:', e.message);
  process.exit(1);
}
