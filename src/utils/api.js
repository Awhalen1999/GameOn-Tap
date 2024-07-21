// remove user id from functions once context is implemented

const baseURL = 'http://localhost:3000';

// Signup user
export async function signupUser(username, email, password) {
  const theme = 'myDark'; // Manually set the theme
  console.log('API: signupUser called');

  const response = await fetch(`${baseURL}/users/signup`, {
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

  const response = await fetch(`${baseURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
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

  const response = await fetch(`${baseURL}/users/logout`, {
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

  const response = await fetch(`${baseURL}/users/auth`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    const message = await response.json();
    console.error('API: authUser error', message);
    throw new Error(message.message);
  }

  console.log('API: authUser response', await response.clone().json());
  return response.json();
}

// Get all rulesets for a specific user and game
export async function getRulesets(userId, gameId) {
  const response = await fetch(`${baseURL}/users/${userId}/${gameId}/rulesets`);

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message.message);
  }

  return response.json();
}

// Get a specific ruleset for a specific user and game
export async function getRuleset(userId, gameId, rulesetId) {
  const response = await fetch(
    `${baseURL}/users/${userId}/${gameId}/rulesets/${rulesetId}`
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
    `${baseURL}/users/${userId}/${gameId}/active_ruleset`
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
    `${baseURL}/users/${userId}/${gameId}/active_ruleset`,
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
  const response = await fetch(
    `${baseURL}/users/${userId}/${gameId}/rulesets`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: rulesetName, rules }),
    }
  );

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message);
  }

  return response.json();
}

// Delete a ruleset for a specific user and game
export async function deleteRuleset(userId, gameId, rulesetId) {
  const response = await fetch(
    `${baseURL}/users/${userId}/${gameId}/rulesets/${rulesetId}`,
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
