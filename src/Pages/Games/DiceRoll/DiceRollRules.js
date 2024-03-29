const DiceRollRules = {
  2: {
    result: 'Two',
    title: 'Two for You',
    description:
      'Whoever rolls this can choose anyone to take 2 sips from their drink.',
  },
  3: {
    result: 'Three',
    title: 'Me',
    description: 'The roller takes 1 drink.',
  },
  4: {
    result: 'Four',
    title: 'Pass it on',
    description:
      'The roller is protected from their next drink, the player to their left must take it instead.',
  },
  5: {
    result: 'Five',
    title: 'Give and Take',
    description: 'Give out 3 drinks, and take 2 yourself.',
  },
  6: {
    result: 'Six',
    title: 'Double Whammy',
    description:
      'Players on the rollers left and right must both take a drink. The roller is safe.',
  },
  7: {
    result: 'Seven',
    title: 'Lucky Seven',
    description: 'The roller is safe from drinking until their next turn.',
  },
  8: {
    result: 'Eight',
    title: 'Odd or Even',
    description:
      'The roller predicts whether the next roll will be odd or even. If correct, they choose someone to drink. If incorrect, they drink.',
  },
  9: {
    result: 'Nine',
    title: 'Social',
    description: 'Everyone Drinks.',
  },
  10: {
    result: 'Ten',
    title: 'Perfect Ten',
    description:
      'If both dice show the number 5, everyone else drinks. Otherwise the roller drinks.',
  },
  11: {
    result: 'Eleven',
    title: 'Rule Master',
    description:
      'Make a rule that everyone must follow until the next "Eleven" is rolled. Anyone who breaks the rule drinks.',
  },
  12: {
    result: 'Twelve',
    title: 'Midnight',
    description: 'Everyone finishes or takes 3 sips from their drink.',
  },
};

export default DiceRollRules;
