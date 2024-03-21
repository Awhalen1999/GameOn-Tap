import KingsCupRules from '../Pages/Games/KingsCup/KingsCupRules.js';
import RideTheBusRules from '../Pages/Games/RideTheBus/RideTheBusRules.js';
import SnapRules from '../Pages/Games/Snap/SnapRules.js';
import TriviaRules from '../Pages/Games/Trivia/TriviaRules.js';
import PromptDashRules from '../Pages/Games/PromptDash/PromptDashRules.js';
import DiceRollRules from '../Pages/Games/DiceRoll/DiceRollRules.js';
import DrinkRouletteRules from '../Pages/Games/DrinkRoulette/DrinkRouletteRules.js';
import BountyBlastRules from '../Pages/Games/BountyBlast/BountyBlastRules.js';

const gameRules = {
  KingsCup: KingsCupRules,
  RideTheBus: RideTheBusRules,
  Snap: SnapRules,
  Trivia: TriviaRules,
  PromptDash: PromptDashRules,
  DiceRoll: DiceRollRules,
  DrinkRoulette: DrinkRouletteRules,
  BountyBlast: BountyBlastRules,
};

saveDefaultRulesets(gameRules);

// Save a ruleset for a game
async function saveRuleset(gameName, rulesetTitle, rules) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  rulesets[gameName] = rulesets[gameName] || {};
  rulesets[gameName][rulesetTitle] = { title: rulesetTitle, rules: rules };
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// Delete a ruleset for a game
async function deleteRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  if (rulesets[gameName]) {
    delete rulesets[gameName][rulesetTitle];
    localStorage.setItem('rulesets', JSON.stringify(rulesets));
  }
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

// this sets the active ruleset for a game
async function setActiveRuleset(gameName, rulesetTitle) {
  let rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  let selectedRuleset = rulesets[gameName] && rulesets[gameName][rulesetTitle];
  if (selectedRuleset) {
    localStorage.setItem(
      `activeRuleset-${gameName}`,
      JSON.stringify(selectedRuleset)
    );
  }
}

// Save all default rulesets to local storage
async function saveDefaultRulesets(gameRules) {
  localStorage.setItem('rulesets-default', JSON.stringify(gameRules));
}

// this sets the active ruleset to null for a game
async function setDefaultRuleset(gameName) {
  const defaultRulesets =
    JSON.parse(localStorage.getItem('rulesets-default')) || {};
  const defaultRuleset = defaultRulesets[gameName];
  if (defaultRuleset) {
    localStorage.setItem(
      `activeRuleset-${gameName}`,
      JSON.stringify({ title: 'Default', rules: defaultRuleset })
    );
  }
}

// this gets the active ruleset title for a game
async function getActiveRulesetTitle(gameName) {
  let activeRuleset = JSON.parse(
    localStorage.getItem(`activeRuleset-${gameName}`)
  );
  return activeRuleset ? activeRuleset.title : null;
}

export {
  saveRuleset,
  getActiveRuleset,
  setActiveRuleset,
  getActiveRulesetTitle,
  deleteRuleset,
  getRulesets,
  setDefaultRuleset, // export the new function
  saveDefaultRulesets, // export the new function
};
