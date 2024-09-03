const apiUrl =
  import.meta.env.MODE === 'production'
    ? 'https://gameon-tap-backend-production.up.railway.app'
    : 'http://localhost:8080';

// Signup user
export async function signupUser(username, email, password) {
  const theme = 'myDark'; // Manually set the theme
  console.log('API: signupUser called');

  const response = await fetch(`${apiUrl}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password, theme }),
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await response.json();
    console.error('API: signupUser error', message);
    throw new Error(message.message);
  }

  console.log('API: signupUser response', await response.clone().json());
  return response.json();
}

// Login user
export async function loginUser(email, password) {
  console.log('API: loginUser called');

  console.log(apiUrl);

  const response = await fetch(`${apiUrl}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: '*/*',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  }).catch((error) => {
    console.error('API: loginUser error', error);
    throw new Error('API: loginUser error');
  });

  if (!response.ok) {
    const message = await response.json();
    console.error('API: loginUser error', message);
    throw new Error(message.message);
  }

  console.log('API: loginUser response', await response.clone().json());
  return response.json();
}

// Logout user
export async function logoutUser() {
  console.log('API: logoutUser called');

  const response = await fetch(`${apiUrl}/users/logout`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await response.json();
    console.error('API: logoutUser error', message);
    throw new Error(message.message);
  }

  console.log('API: logoutUser response', await response.clone().json());
  return response.json();
}

// Authenticate user
export async function authUser() {
  console.log('API: authUser called');

  try {
    const response = await fetch(`${apiUrl}/users/auth`, {
      method: 'GET',
      credentials: 'include', // Include credentials for session-based authentication
    });

    // Handle response status
    if (!response.ok) {
      const message = await response.json();
      console.error('API: authUser error', message);
      throw new Error(message.message);
    }

    // If response is OK, parse and return user data
    const userData = await response.json();
    console.log('API: authUser response', userData);
    return userData;
  } catch (error) {
    console.error('API: authUser failed', error);
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
