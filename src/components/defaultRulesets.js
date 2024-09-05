const defaultRulesets = {
  DrinkRoulette: {
    ruleset_id: 3,
    name: 'Default Drink Roulette Ruleset',
    rules: {
      1: {
        result: 'One',
        title: 'Straight Shot',
        description:
          'The Spinner takes a straight shot of liquor or 3 sips of another drink.',
      },
      2: {
        result: 'Two',
        title: 'Choice',
        description: 'The spinner chooses another player to take a drink.',
      },
      3: {
        result: 'Three',
        title: 'Water Break',
        description: "You're safe from drinking this round.",
      },
      4: {
        result: 'Four',
        title: 'Mystery',
        description: 'Take a drink of a mystery concoction made by the group.',
      },
      5: {
        result: 'Five',
        title: 'Mix It Up',
        description: 'Swap drinks with another player for a round.',
      },
      6: {
        result: 'Six',
        title: 'Target',
        description:
          "Any Spinner's Choice spins automatically are given to you until your next turn.",
      },
      7: {
        result: 'Seven',
        title: 'Middle',
        description: "Players on spinner's right and left drink.",
      },
      8: {
        result: 'Eight',
        title: 'Bartender',
        description:
          'The spinner creates a unique drink and chooses a player to enjoy it.',
      },
      9: {
        result: 'Nine',
        title: 'Add or Take',
        description:
          'The spinner may choose to take 1 drink or add 1 drink and pass it on to the next player. This continues until the total reaches 4 drinks.',
      },
      10: {
        result: 'Ten',
        title: 'Generosity',
        description: 'The spinner generously makes all other players drink.',
      },
      11: {
        result: 'Eleven',
        title: 'Right Hand',
        description: "Player on spinner's right drinks.",
      },
      12: {
        result: 'Twelve',
        title: 'Spinner Drinks',
        description: 'The spinner takes a drink.',
      },
    },
  },
  KingsCup: {
    ruleset_id: 1,
    name: 'Default Kings Cup Ruleset',
    rules: {
      2: {
        result: 'Two',
        title: 'You',
        description: 'Whoever draws this can choose anyone to take a drink.',
      },
      3: {
        result: 'Three',
        title: 'Me',
        description: 'The person who draws this takes a drink.',
      },
      4: {
        result: 'Four',
        title: 'Floor',
        description: 'The last person to touch the floor takes a drink.',
      },
      5: {
        result: 'Five',
        title: 'Guys',
        description: 'All the guys at the table drink.',
      },
      6: {
        result: 'Six',
        title: 'Chicks',
        description: 'All the girls at the table drink.',
      },
      7: {
        result: 'Seven',
        title: 'Heaven',
        description: 'Raise your hand. The last person to do so drinks.',
      },
      8: {
        result: 'Eight',
        title: 'Mate',
        description:
          'Choose someone to be your mate. They drink when you drink.',
      },
      9: {
        result: 'Nine',
        title: 'Rhyme',
        description:
          'Say a word. Players must say a rhyming word. The one who fails drinks.',
      },
      10: {
        result: 'Ten',
        title: 'Categories',
        description:
          'Pick a category. Each player names something from that category until someone fails.',
      },
      J: {
        result: 'Jack',
        title: 'Thumb Master',
        description:
          'Place your thumb on the table at any time. The last person to do so drinks.',
      },
      Q: {
        result: 'Queen',
        title: 'Question Master',
        description: 'Ask a question. The first person to answer drinks.',
      },
      K: {
        result: 'King',
        title: "King's Cup",
        description:
          "Add some of your drink to the King's Cup. The person who draws the last King drinks the King's Cup.",
      },
      A: {
        result: 'Ace',
        title: 'Waterfall',
        description:
          'Everyone drinks in a waterfall. You cannot stop until the person before you does.',
      },
    },
  },
  DiceRoll: {
    ruleset_id: 2,
    name: 'Default Dice Roll Ruleset',
    rules: {
      2: {
        result: 'Two',
        title: 'Two for You',
        description: 'Give out 2 sips to another player.',
      },
      3: {
        result: 'Three',
        title: 'Me',
        description: 'The roller takes 1 drink.',
      },
      4: {
        result: 'Four',
        title: 'Pass It On',
        description:
          'The roller is protected from their next drink, passing it to the player to their left.',
      },
      5: {
        result: 'Five',
        title: 'Give and Take',
        description: 'Give out 3 drinks, take 2 drinks yourself.',
      },
      6: {
        result: 'Six',
        title: 'Double Whammy',
        description: "The players on the roller's left and right drink.",
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
          "Predict the next roll's parity (odd/even). If wrong, drink. If right, assign a drink.",
      },
      9: {
        result: 'Nine',
        title: 'Social',
        description: 'Everyone drinks.',
      },
      10: {
        result: 'Ten',
        title: 'Perfect Ten',
        description:
          'If both dice show 5, all other players drink. Otherwise, the roller drinks.',
      },
      11: {
        result: 'Eleven',
        title: 'Rule Master',
        description:
          'Make a rule everyone must follow until the next Eleven is rolled. Rule breakers drink.',
      },
      12: {
        result: 'Twelve',
        title: 'Midnight',
        description: 'Everyone takes 3 sips.',
      },
    },
  },
  BountyBlast: {
    ruleset_id: 4,
    name: 'Default Bounty Blast Ruleset',
    rules: {
      1: {
        result: 'Empty Chest',
        title: 'Empty Chest',
        description: 'Safe! This chest is empty.',
      },
      2: {
        result: 'Treasure',
        title: 'Treasure',
        description:
          'You found treasure! Assign a drink or be safe from the next bomb.',
      },
      3: {
        result: 'Bomb',
        title: 'Bomb',
        description: 'Oh no! You found a bomb! Drink up!',
      },
    },
  },
  RideTheBus: {
    ruleset_id: 5,
    name: 'Default Ride The Bus Ruleset',
    rules: {
      1: {
        result: 'Ride The Bus',
        title: 'Objective',
        description:
          'Guess the next card’s value correctly to move to the next seat. If wrong, drink and start over.',
      },
    },
  },
  Snap: {
    ruleset_id: 6,
    name: 'Default Snap Ruleset',
    rules: {
      1: {
        result: 'Value',
        title: 'Value',
        description:
          'Snap when the card values are the same (e.g., 2 of hearts and 2 of spades).',
      },
      2: {
        result: 'Suit',
        title: 'Suit',
        description:
          'Snap when the card suits are the same (e.g., 2 of hearts and 3 of hearts).',
      },
    },
  },
  Trivia: {
    ruleset_id: 7,
    name: 'Default Trivia Ruleset',
    rules: {
      1: {
        result: 'Trivia',
        title: 'Objective',
        description: 'Answer trivia questions correctly to win.',
      },
    },
  },
  PromptDash: {
    ruleset_id: 8,
    name: 'Default Prompt Dash Ruleset',
    rules: {
      1: {
        result: 'Prompt Dash',
        title: 'Objective',
        description:
          'Draw a random prompt card and race against others to complete the challenge. The slowest player faces a punishment.',
      },
    },
  },
};

export default defaultRulesets;
