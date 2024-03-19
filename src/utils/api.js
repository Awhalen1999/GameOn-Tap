// Save a ruleset for a game
async function saveRuleset(gameName, rulesetTitle, rules) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  rulesets[gameName] = rulesets[gameName] || {};
  rulesets[gameName][rulesetTitle] = { title: rulesetTitle, rules };
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// Delete a ruleset for a game
async function deleteRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  if (rulesets[gameName]) {
    delete rulesets[gameName][rulesetTitle];
  }
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// Get all rulesets for a game
async function getRulesets(gameName) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  return rulesets[gameName] || {};
}

// Get the active ruleset for a game
async function getActiveRuleset(gameName) {
  let activeRuleset = JSON.parse(
    localStorage.getItem(`activeRulesetObject-${gameName}`)
  );
  return activeRuleset ? activeRuleset.rules : null;
}

// Set the active ruleset for a game
async function setActiveRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  let selectedRuleset = rulesets[gameName] && rulesets[gameName][rulesetTitle];
  localStorage.setItem(`activeRuleset-${gameName}`, rulesetTitle);
  if (selectedRuleset) {
    localStorage.setItem(
      `activeRulesetObject-${gameName}`,
      JSON.stringify(selectedRuleset)
    );
  }
}

// Get the active ruleset title for a game
async function getActiveRulesetTitle(gameName) {
  return localStorage.getItem(`activeRuleset-${gameName}`);
}

export {
  saveRuleset,
  getActiveRuleset,
  setActiveRuleset,
  getActiveRulesetTitle,
  deleteRuleset,
  getRulesets,
};
