// Save a ruleset for a game
async function saveRuleset(gameName, rulesetTitle, rules) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  rulesets[gameName] = rulesets[gameName] || {};
  rulesets[gameName][rulesetTitle] = { title: rulesetTitle, rules };
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// Get all rulesets for a game
async function getRulesets(gameName) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  return rulesets[gameName] || {};
}

// Get the active ruleset for a game
async function getActiveRuleset(gameName) {
  let activeRulesetTitle = localStorage.getItem(`activeRuleset-${gameName}`);
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  let activeRuleset =
    rulesets[gameName] && rulesets[gameName][activeRulesetTitle];
  return activeRuleset ? activeRuleset.rules : null;
}

// Set the active ruleset for a game
async function setActiveRuleset(gameName, rulesetTitle) {
  localStorage.setItem(`activeRuleset-${gameName}`, rulesetTitle);
}

// Get the active ruleset title for a game
async function getActiveRulesetTitle(gameName) {
  return localStorage.getItem(`activeRuleset-${gameName}`);
}

// Delete a ruleset for a game
async function deleteRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  if (rulesets[gameName]) {
    delete rulesets[gameName][rulesetTitle];
  }
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

export {
  saveRuleset,
  getActiveRuleset,
  setActiveRuleset,
  getActiveRulesetTitle,
  deleteRuleset,
  getRulesets,
};
