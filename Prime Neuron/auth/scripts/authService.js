// PrimeNeuron/scripts/authService.js
// Auth-related operations with localStorage "backend"

function hashPassword(password) {
  // Simple hash simulation (NOT secure, just for demo)
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    hash = (hash << 5) - hash + password.charCodeAt(i);
    hash |= 0;
  }
  return "h" + Math.abs(hash);
}

function registerUser(payload) {
  const existing = getUserByEmail(payload.email);
  if (existing) {
    return { ok: false, message: "Account already exists for this university email." };
  }
  if (!payload.email.endsWith("@paruluniversity.ac.in")) {
    return { ok: false, message: "Use official Parul University email only." };
  }

  const users = getUsers();
  const user = {
    id: "U" + Date.now(),
    name: payload.name,
    phone: payload.phone,
    university: payload.university,
    enrollment: payload.enrollment,
    age: payload.age,
    username: payload.username,
    email: payload.email,
    passwordHash: hashPassword(payload.password),
    profilePhoto: payload.profilePhoto || "",
    aadhaar: "",
    points: 0,
    status: "Active",
    totalReported: 0,
    totalClaimed: 0,
    rewardsEarned: 0,
    createdAt: Date.now()
  };
  users.push(user);
  saveUsers(users);

  // Initialize leaderboard & rewards
  const lb = getLeaderboard();
  lb.push({
    userId: user.id,
    name: user.name,
    points: 0,
    weeklyPoints: 0,
    monthlyPoints: 0,
    seasonalPoints: 0
  });
  saveLeaderboard(lb);

  saveRewards([...getRewards(), { userId: user.id, balance: 0, history: [] }]);

  return { ok: true, user };
}

function loginUser(email, password) {
  const user = getUserByEmail(email);
  if (!user) {
    return { ok: false, message: "Account not found. Register with your university email." };
  }
  if (user.passwordHash !== hashPassword(password)) {
    return { ok: false, message: "Invalid password." };
  }
  setSession(user.id);
  return { ok: true, user };
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  const users = getUsers();
  return users.find((u) => u.id === session.userId) || null;
}

function logoutUser() {
  clearSession();
}
