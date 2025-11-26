const CLERK_SECRET = process.env.CLERK_SECRET_KEY;

const createTestUser = async () => {
  const res = await fetch("https://api.clerk.com/v1/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLERK_SECRET}`,
    },
    body: JSON.stringify({
      email_address: ["test@example.com"],
      password: "12345678",
      skip_password_checks: true,
      first_name: "Test",
    }),
  });

  const data = await res.json();
  return data;
};

const createUserSession = async (userId) => {
  const res = await fetch("https://api.clerk.com/v1/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CLERK_SECRET}`,
    },
    body: JSON.stringify({
      user_id: userId,
    }),
  });

  return res.json();
};

const createSessionToken = async (sessionId) => {
  const res = await fetch(
    `https://api.clerk.com/v1/sessions/${sessionId}/tokens`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CLERK_SECRET}`,
      },
      body: JSON.stringify({
        expires_in_seconds: 120,
      }),
    }
  );
  return res.json();
};

const deleteUser = async (userId) => {
  const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${CLERK_SECRET}`,
    },
  });

  return res.json();
};

module.exports = {
  createTestUser,
  createUserSession,
  createSessionToken,
  deleteUser,
};
