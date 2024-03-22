import KingsCupRules from '../Pages/Games/KingsCup/KingsCupRules.js';
import RideTheBusRules from '../Pages/Games/RideTheBus/RideTheBusRules.js';
import SnapRules from '../Pages/Games/Snap/SnapRules.js';
import TriviaRules from '../Pages/Games/Trivia/TriviaRules.js';
import PromptDashRules from '../Pages/Games/PromptDash/PromptDashRules.js';
import DiceRollRules from '../Pages/Games/DiceRoll/DiceRollRules.js';
import DrinkRouletteRules from '../Pages/Games/DrinkRoulette/DrinkRouletteRules.js';
import BountyBlastRules from '../Pages/Games/BountyBlast/BountyBlastRules.js';

const defaultRulesets = {
  KingsCup: {
    default: KingsCupRules,
  },
  RideTheBus: {
    default: RideTheBusRules,
  },
  Snap: {
    default: SnapRules,
  },
  Trivia: {
    default: TriviaRules,
  },
  PromptDash: {
    default: PromptDashRules,
  },
  DiceRoll: {
    default: DiceRollRules,
  },
  DrinkRoulette: {
    default: DrinkRouletteRules,
  },
  BountyBlast: {
    default: BountyBlastRules,
  },
};

const defaultActiveRulesets = {
  KingsCup: 'default',
  RideTheBus: 'default',
  Snap: 'default',
  Trivia: 'default',
  PromptDash: 'default',
  DiceRoll: 'default',
  DrinkRoulette: 'default',
  BountyBlast: 'default',
};

// this gets all rulesets for a game (works)
export async function getRulesets(gameName) {
  const rulesets =
    JSON.parse(localStorage.getItem('rulesets')) || defaultRulesets;
  return rulesets[gameName] || defaultRulesets[gameName];
}

// this gets the active ruleset for a game (works)
export async function getActiveRuleset(gameName) {
  const activeRulesets =
    JSON.parse(localStorage.getItem('activeRulesets')) || defaultActiveRulesets;
  return activeRulesets[gameName] || defaultActiveRulesets[gameName];
}

// this sets the active ruleset for a game (works)
export async function setActiveRuleset(gameName, rulesetTitle) {
  const activeRulesets =
    JSON.parse(localStorage.getItem('activeRulesets')) || {};
  activeRulesets[gameName] = rulesetTitle;
  localStorage.setItem('activeRulesets', JSON.stringify(activeRulesets));
}

// Save a ruleset for a game (works)
export async function saveRuleset(gameName, rulesetTitle, rules) {
  const rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};
  rulesets[gameName] = rulesets[gameName] || {};
  rulesets[gameName][rulesetTitle] = { ...rules };
  localStorage.setItem('rulesets', JSON.stringify(rulesets));
}

// Delete a ruleset for a game
export async function deleteRuleset(gameName, rulesetTitle) {
  const rulesets = JSON.parse(localStorage.getItem('rulesets')) || {};

  if (rulesets[gameName]) {
    // Prevent deleting 'default' ruleset
    if (rulesetTitle === 'default') {
      console.error("Cannot delete 'default' ruleset");
      return;
    }

    delete rulesets[gameName][rulesetTitle];
    localStorage.setItem('rulesets', JSON.stringify(rulesets));
  }
}

/**
 *
 * rulesets[game][rulesetName]
 *
 * 'rulesets'
 * rulesets: {
 *   KingsCup: {
 *     default: {
 *
 *     },
 *     myCustomRules: { 'custom rule1', 'custom rule2' }
 *
 *     }
 *   }
 * }
 *
 * activeRulesets[game]
 *
 * 'activeRulesets'
 * activeRulesets: {
 *   KingsCup: 'custom rule1',
 *   RideTheBus: 'custom rule2',
 * }
 */
