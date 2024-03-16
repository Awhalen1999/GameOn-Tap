// user.rules['GAMEID'].['RULEID']

// localstorage key = Users
// [user, user]

async function createUser(user) {
  // validate that user is good (password meets requirements, unique id, extra data like name)

  // save it
  const users = localStorage.getItem('users');

  const usersArr = users ? JSON.parse(users) : [];

  localStorage.setItem('users', JSON.stringify([...usersArr, user]));
}

// TODO take a password, id is probably login credentials
async function login(id) {
  const users = localStorage.getItem('users');

  const usersArr = users ? JSON.parse(users) : [];

  return usersArr.find((user) => user.id === id);
}

// async function getActiveRulesetTitle(gameName) {
//   const activeRulesetTitle = localStorage.getItem(`activeRuleset-${gameName}`);

//   if (!activeRulesetTitle) {
//     return defaultRuleset[gameName];
//   }

//   const savedRulesets =
//     JSON.parse(localStorage.getItem(`rulesets-${gameName}`)) || [];
//   const activeRuleset = savedRulesets.find(
//     (ruleset) => ruleset.title === activeRulesetTitle
//   );

//   return activeRuleset ? activeRuleset.rules : KingsCupRules;
// }

// async function saveRuleset(game, ruleset) {
//   const rulesets = JSON.parse(localStorage.get('rulesets'));

//   rulesets[game].rules[ruleset.title][ruleset];

//   localStorage.setItem('rulesets', JSON.stringify(rulesets));
// }

// async function getActiveRuleset() {
//   return rulesets[gameName].rules[activeRuleset]
// }

// const rulesets = {
//   kingsCup: {
//     rules: {
//       default: { },
//       myRules: { },
//     }
//   },
//   rideTheBus: {
//     rules: {
//       default: { },
//       myAwesomeRTBRules: { }
//     }
//   }
// }

// const activeRulesets = {
//   kingsCup: 'myRules',
//   rideTheBus: 'default'
// }

// const activeRuleset = JSON.parse(localStorage.get('activeRulesets'))[gameName] ?? 'default'

// const rtbRules = rulesets[gameName].rules[activeRuleset]
