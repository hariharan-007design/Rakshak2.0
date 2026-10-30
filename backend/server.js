const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const initSqlJs = require('sql.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'rakshak.db');

app.use(cors({ origin: ['http://localhost:8000', 'http://localhost:3000', 'https://hariharan-007design.github.io'] }));
app.use(express.json({ limit: '10mb' }));

let db = null;

async function initDB() {
  const SQL = await initSqlJs();
  if (fs.existsSync(DB_PATH)) {
    const buffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, company_name TEXT NOT NULL, industry TEXT NOT NULL, role TEXT DEFAULT 'reviewer', created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS reviews (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, draft TEXT NOT NULL, findings TEXT NOT NULL, revised_draft TEXT, channel TEXT DEFAULT 'Website', status TEXT DEFAULT 'pending', approved_at TEXT, approved_by INTEGER, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER NOT NULL, action TEXT NOT NULL, details TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  db.run(`CREATE TABLE IF NOT EXISTS rule_packs (id INTEGER PRIMARY KEY AUTOINCREMENT, company_id INTEGER NOT NULL, name TEXT NOT NULL, version TEXT DEFAULT '1.0', rules TEXT NOT NULL, created_at TEXT DEFAULT CURRENT_TIMESTAMP)`);
  saveDB();
}

function saveDB() {
  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);
}

function runQuery(sql, params) {
  const stmt = db.prepare(sql);
  stmt.bind(params || []);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

function runExec(sql, params) {
  db.run(sql, params || []);
  saveDB();
  return { changes: db.getRowsModified() };
}

function getLastId() {
  const r = runQuery('SELECT last_insert_rowid() as id');
  return r[0] ? r[0].id : 0;
}

const JWT_SECRET = process.env.JWT_SECRET || 'rakshak-dev-secret-change-in-prod';

app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.post('/api/auth/register', (req, res) => {
  const { email, password, companyName, industry } = req.body;
  if (!email || !password || !companyName || !industry) return res.status(400).json({ error: 'Missing required fields' });
  const hash = bcrypt.hashSync(password, 10);
  try {
    runExec('INSERT INTO users (email, password_hash, company_name, industry) VALUES (?,?,?,?)', [email, hash, companyName, industry]);
    const id = getLastId();
    const token = jwt.sign({ id, email, companyName, industry }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id, email, companyName, industry } });
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ error: 'Email already registered' });
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });
  const users = runQuery('SELECT * FROM users WHERE email = ?', [email]);
  const user = users[0];
  if (!user || !bcrypt.compareSync(password, user.password_hash)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, companyName: user.company_name, industry: user.industry }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, companyName: user.company_name, industry: user.industry } });
});

function authMiddleware(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ error: 'No token provided' });
  try { req.user = jwt.verify(header.split(' ')[1], JWT_SECRET); next(); }
  catch (e) { res.status(401).json({ error: 'Invalid token' }); }
}

app.post('/api/reviews', authMiddleware, (req, res) => {
  const { draft, findings, revisedDraft, channel } = req.body;
  if (!draft) return res.status(400).json({ error: 'Draft required' });
  runExec('INSERT INTO reviews (user_id, draft, findings, revised_draft, channel) VALUES (?,?,?,?,?)', [req.user.id, draft, JSON.stringify(findings || []), revisedDraft || null, channel || 'Website']);
  const id = getLastId();
  runExec('INSERT INTO audit_log (user_id, action, details) VALUES (?,?,?)', [req.user.id, 'review_created', 'Channel: ' + (channel || 'Website')]);
  res.json({ id, message: 'Review saved' });
});

app.get('/api/reviews', authMiddleware, (req, res) => {
  const reviews = runQuery('SELECT * FROM reviews WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json(reviews.map(r => ({ ...r, findings: JSON.parse(r.findings) })));
});

app.patch('/api/reviews/:id/approve', authMiddleware, (req, res) => {
  const reviews = runQuery('SELECT * FROM reviews WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
  if (!reviews.length) return res.status(404).json({ error: 'Review not found' });
  const findings = JSON.parse(reviews[0].findings);
  const open = findings.filter(f => f.status === 'open').length;
  if (open > 0) return res.status(400).json({ error: open + ' finding(s) still open' });
  runExec('UPDATE reviews SET status = ?, approved_at = CURRENT_TIMESTAMP, approved_by = ? WHERE id = ?', ['approved', req.user.id, req.params.id]);
  runExec('INSERT INTO audit_log (user_id, action, details) VALUES (?,?,?)', [req.user.id, 'review_approved', 'Review #' + req.params.id]);
  res.json({ message: 'Review approved' });
});

app.get('/api/audit', authMiddleware, (req, res) => {
  const logs = runQuery('SELECT * FROM audit_log WHERE user_id = ? ORDER BY created_at DESC LIMIT 100', [req.user.id]);
  res.json(logs);
});

app.get('/api/rule-packs', authMiddleware, (req, res) => {
  const packs = runQuery('SELECT * FROM rule_packs WHERE company_id = ?', [req.user.id]);
  res.json(packs.map(p => ({ ...p, rules: JSON.parse(p.rules) })));
});

app.post('/api/rule-packs', authMiddleware, (req, res) => {
  const { name, version, rules } = req.body;
  if (!name || !rules) return res.status(400).json({ error: 'Name and rules required' });
  runExec('INSERT INTO rule_packs (company_id, name, version, rules) VALUES (?,?,?,?)', [req.user.id, name, version || '1.0', JSON.stringify(rules)]);
  res.json({ id: getLastId(), message: 'Rule pack created' });
});

initDB().then(() => {
  app.listen(PORT, () => {
    console.log('Rakshak backend running on http://localhost:' + PORT);
  });
});
