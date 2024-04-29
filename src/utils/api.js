// Signup
export async function signupUser(username, email, password) {
  const response = await fetch('http://localhost:3000/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message);
  }

  return response.json();
}

//login
export async function loginUser(email, password) {
  const response = await fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const message = await response.json();
    throw new Error(message);
  }

  return response.json();
}

// this gets all rulesets for a game (works), setup fetch for .get rulesets for user and game
export async function getRulesets(gameName) {
  const storedRulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  const gameRulesets = storedRulesets[gameName] || {};
  const defaultGameRuleset = defaultRulesets[gameName];

  return {
    ...defaultGameRuleset,
    ...gameRulesets,
  };
}

// this gets the active ruleset for a game (works), setup fetch for .get active ruleset route
export async function getActiveRuleset(gameName) {
  const activeRulesets =
    JSON.parse(localStorage.getItem('activeRulesets')) || defaultActiveRulesets;
  return activeRulesets[gameName] || defaultActiveRulesets[gameName];
}

// this sets the active ruleset for a game (works), setup fetch for .put active ruleset route
export async function setActiveRuleset(gameName, rulesetTitle) {
  const activeRulesets =
    JSON.parse(localStorage.getItem('activeRulesets')) || {};
  activeRulesets[gameName] = rulesetTitle;
  localStorage.setItem('activeRulesets', JSON.stringify(activeRulesets));

  // Dispatch a custom event after setting the active ruleset
  window.dispatchEvent(new CustomEvent('activeRulesetChanged'));
}

// Save a ruleset for a game (works), setup fetch for .post ruleset route
export async function saveRuleset(gameName, rulesetTitle, rules) {
  const rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  rulesets[gameName] = rulesets[gameName] || {};
  rulesets[gameName][rulesetTitle] = { ...rules };
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// Delete a ruleset for a game, setup fetch for .delete ruleset route
export async function deleteRuleset(gameName, rulesetTitle) {
  const rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  const activeRulesets =
    JSON.parse(localStorage.getItem('activeRulesets')) || defaultActiveRulesets;

  if (rulesets[gameName]) {
    // Prevent deleting 'default' ruleset
    if (rulesetTitle === 'default') {
      console.error("Cannot delete 'default' ruleset");
      return;
    }

    delete rulesets[gameName][rulesetTitle];
    localStorage.setItem('rulesets', JSON.stringify(rulesets));

    // If the deleted ruleset was the active one, set the active ruleset to 'default'
    if (activeRulesets[gameName] === rulesetTitle) {
      activeRulesets[gameName] = 'default';
      localStorage.setItem('activeRulesets', JSON.stringify(activeRulesets));
    }
  }
}
