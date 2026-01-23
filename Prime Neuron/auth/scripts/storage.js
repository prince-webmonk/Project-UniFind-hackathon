// PrimeNeuron/scripts/storage.js
// LocalStorage helpers and pseudo-database schema

const STORAGE_KEYS = {
  USERS: "unifind_users",
  SESSION: "unifind_session",
  ITEMS_LOST: "unifind_items_lost",
  ITEMS_FOUND: "unifind_items_found",
  CLAIMS: "unifind_claims",
  LEADERBOARD: "unifind_leaderboard",
  REWARDS: "unifind_rewards",
  NOTIFS: "unifind_notifications",
  SETTINGS: "unifind_settings"
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/** Users */
function getUsers() {
  return readJson(STORAGE_KEYS.USERS, []);
}

function saveUsers(users) {
  writeJson(STORAGE_KEYS.USERS, users);
}

function getUserByEmail(email) {
  return getUsers().find((u) => u.email === email) || null;
}

function upsertUser(user) {
  const users = getUsers();
  const idx = users.findIndex((u) => u.id === user.id);
  if (idx >= 0) users[idx] = user;
  else users.push(user);
  saveUsers(users);
}

/** Session */
function setSession(userId) {
  writeJson(STORAGE_KEYS.SESSION, { userId, ts: Date.now() });
}

function getSession() {
  return readJson(STORAGE_KEYS.SESSION, null);
}

function clearSession() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

/** Items */
function getLostItems() {
  return readJson(STORAGE_KEYS.ITEMS_LOST, []);
}
function saveLostItems(items) {
  writeJson(STORAGE_KEYS.ITEMS_LOST, items);
}
function getFoundItems() {
  return readJson(STORAGE_KEYS.ITEMS_FOUND, []);
}
function saveFoundItems(items) {
  writeJson(STORAGE_KEYS.ITEMS_FOUND, items);
}

/** Claims */
function getClaims() {
  return readJson(STORAGE_KEYS.CLAIMS, []);
}
function saveClaims(claims) {
  writeJson(STORAGE_KEYS.CLAIMS, claims);
}

/** Leaderboard */
function getLeaderboard() {
  return readJson(STORAGE_KEYS.LEADERBOARD, []);
}
function saveLeaderboard(lb) {
  writeJson(STORAGE_KEYS.LEADERBOARD, lb);
}

/** Rewards */
function getRewards() {
  return readJson(STORAGE_KEYS.REWARDS, []);
}
function saveRewards(r) {
  writeJson(STORAGE_KEYS.REWARDS, r);
}

/** Notifications */
function getNotifications() {
  return readJson(STORAGE_KEYS.NOTIFS, []);
}
function saveNotifications(list) {
  writeJson(STORAGE_KEYS.NOTIFS, list);
}

/** Settings (theme etc.) */
function getSettings() {
  return readJson(STORAGE_KEYS.SETTINGS, {});
}
function saveSettings(s) {
  writeJson(STORAGE_KEYS.SETTINGS, s);
}
