const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'https://gameon-tap-backend-production.up.railway.app' // Production backend URL
    : 'http://localhost:8080'; // Development backend URL

// Signup user
export async function signupUser(username, email, password) {
  const response = await fetch(`${apiUrl}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await response.json();

    throw new Error(message.message);
  }

  return response.json();
}

// Login user
export async function loginUser(email, password) {
  const response = await fetch(`${apiUrl}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).catch((error) => {
    throw new Error('API: loginUser error');
  });

  if (!response.ok) {
    const message = await response.json();

    throw new Error(message.message);
  }

  return response.json();
}

// Logout user
export async function logoutUser() {
  const response = await fetch(`${apiUrl}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await response.json();

    throw new Error(message.message);
  }

  return response.json();
}

// Authenticate user
export async function authUser() {
  try {
    const response = await fetch(`${apiUrl}/users/auth`, {
      method: 'GET',
      credentials: 'include',
    });

    // Handle response status
    if (!response.ok) {
      const message = await response.json();

      throw new Error(message.message);
    }

    // If response is OK, parse and return user data
    const userData = await response.json();

    return userData;
  } catch (error) {
    return null; // Return null if authentication fails
  }
}

// Get all rulesets for a specific user and game
export async function getRulesets(userId, gameId) {
  const response = await fetch(`${apiUrl}/users/${userId}/${gameId}/rulesets`);

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.message);
  }

  return response.json();
}

// Get a specific ruleset for a specific user and game
export async function getRuleset(userId, gameId, rulesetId) {
  const response = await fetch(
    `${apiUrl}/users/${userId}/${gameId}/rulesets/${rulesetId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

// Get the active ruleset for a specific user and game
export async function getActiveRuleset(userId, gameId) {
  const response = await fetch(
    `${apiUrl}/users/${userId}/${gameId}/active_ruleset`
  );

  if (!response.ok) {
    const message = await response.json();
    throw new Error(JSON.stringify(message));
  }

  return response.json();
}

// Update the active ruleset for a specific user and game
export async function setActiveRuleset(userId, gameId, rulesetId) {
  const response = await fetch(
    `${apiUrl}/users/${userId}/${gameId}/active_ruleset`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ruleset_id: rulesetId }),
    }
  );

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message);
  }

  return response.json();
}

// Save a ruleset for a specific user and game
export async function saveRuleset(userId, gameId, rulesetName, rules) {
  const response = await fetch(`${apiUrl}/users/${userId}/${gameId}/rulesets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: rulesetName, rules }),
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.message);
  }

  return response.json();
}

// Delete a ruleset for a specific user and game
export async function deleteRuleset(userId, gameId, rulesetId) {
  const response = await fetch(
    `${apiUrl}/users/${userId}/${gameId}/rulesets/${rulesetId}`,
    {
      method: 'DELETE',
    }
  );

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message);
  }

  return response.json();
}
