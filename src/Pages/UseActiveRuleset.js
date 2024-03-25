import { useState, useEffect } from 'react';
import { getActiveRuleset, getRulesets } from '../utils/api';

const useActiveRuleset = (game) => {
  const [activeRuleset, setActiveRuleset] = useState(null);

  useEffect(() => {
    const fetchActiveRuleset = async () => {
      console.log('Fetching active ruleset...');
      const activeRulesetName = await getActiveRuleset(game);
      const allRulesets = await getRulesets(game);
      const activeRuleset = allRulesets[activeRulesetName];
      console.log('Active ruleset fetched:', activeRuleset);

      setActiveRuleset(activeRuleset);
    };

    const handleActiveRulesetChange = () => {
      console.log('Active ruleset changed, fetching active ruleset...');
      fetchActiveRuleset();
    };

    window.addEventListener('activeRulesetChanged', handleActiveRulesetChange);

    fetchActiveRuleset();

    return () => {
      window.removeEventListener(
        'activeRulesetChanged',
        handleActiveRulesetChange
      );
    };
  }, [game]);

  return activeRuleset;
};

export default useActiveRuleset;
