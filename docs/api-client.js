// === BACKEND API CLIENT ===
const API_BASE = 'http://localhost:3001/api';
let authToken = localStorage.getItem('rakshak_token') || null;

async function apiCall(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (authToken) headers['Authorization'] = 'Bearer ' + authToken;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(API_BASE + endpoint, opts);
    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(err.error || 'Request failed');
    }
    return await res.json();
  } catch (e) {
    console.warn('API call failed:', e.message);
    return null;
  }
}

async function apiLogin(email, password) {
  const result = await apiCall('/auth/login', 'POST', { email, password });
  if (result && result.token) {
    authToken = result.token;
    localStorage.setItem('rakshak_token', authToken);
    localStorage.setItem('rakshak_user', JSON.stringify(result.user));
  }
  return result;
}

async function apiRegister(email, password, companyName, industry) {
  const result = await apiCall('/auth/register', 'POST', { email, password, companyName, industry });
  if (result && result.token) {
    authToken = result.token;
    localStorage.setItem('rakshak_token', authToken);
    localStorage.setItem('rakshak_user', JSON.stringify(result.user));
  }
  return result;
}

async function apiSaveReview(draft, findings, revisedDraft, channel) {
  return await apiCall('/reviews', 'POST', { draft, findings, revisedDraft, channel });
}

async function apiGetReviews() {
  return await apiCall('/reviews', 'GET');
}

async function apiApproveReview(id) {
  return await apiCall('/reviews/' + id + '/approve', 'PATCH');
}

async function apiGetAudit() {
  return await apiCall('/audit', 'GET');
}
