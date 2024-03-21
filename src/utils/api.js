// Save a ruleset for a game
async function saveRuleset(gameName, rulesetTitle, rules) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  rulesets[gameName] = rulesets[gameName] || {};
  rulesets[gameName][rulesetTitle] = { title: rulesetTitle, rules };
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// this delete a ruleset for a game
async function deleteRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  if (rulesets[gameName]) {
    delete rulesets[gameName][rulesetTitle];
  }
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// this gets all rulesets for a game
async function getRulesets(gameName) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  return rulesets[gameName] || {};
}

// this gets the active ruleset for a game
async function getActiveRuleset(gameName) {
  let activeRuleset = JSON.parse(
    localStorage.getItem(`activeRuleset-${gameName}`)
  );
  return activeRuleset ? activeRuleset.rules : null;
}

// this gets the active ruleset title for a game
async function getActiveRulesetTitle(gameName) {
  return localStorage.getItem(`activeRuleset-${gameName}`);
}

// this sets the active ruleset for a game
async function setActiveRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  let selectedRuleset = rulesets[gameName] && rulesets[gameName][rulesetTitle];
  if (selectedRuleset) {
    localStorage.setItem(
      `activeRuleset-${gameName}`,
      JSON.stringify({ title: rulesetTitle, rules: selectedRuleset })
    );
  }
}

// this sets the active ruleset to null for a game
async function setDefaultRuleset(gameName) {
  localStorage.setItem(`activeRuleset-${gameName}`, null);
}

export {
  saveRuleset,
  getActiveRuleset,
  setActiveRuleset,
  getActiveRulesetTitle,
  deleteRuleset,
  getRulesets,
  setDefaultRuleset,
};
