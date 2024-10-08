import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getRulesets,
  getActiveRuleset,
  setActiveRuleset,
  saveRuleset,
  deleteRuleset,
  getRuleset,
} from '../utils/api';
import { MdEdit, MdDelete, MdOutlineInfo } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { IoCloseSharp } from 'react-icons/io5';
import { useAuth } from '../hooks/useAuth';
import { IoCaretBackOutline } from 'react-icons/io5';

const EditRulesPage = () => {
  const { game } = useParams();
  const [rulesets, setRulesets] = useState([]);
  const [activeRuleset, setActiveRulesetState] = useState(null);
  const [selectedRuleset, setSelectedRuleset] = useState('');
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [rulesetName, setRulesetName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const defaultRulesetIds = {
    KingsCup: 1,
    DiceRoll: 2,
    DrinkRoulette: 3,
    BountyBlast: 4,
    RideTheBus: 5,
    Snap: 6,
    Trivia: 7,
    PromptDash: 8,
  };
  const { user } = useAuth();

  // Fetch all rulesets for game id and user id
  useEffect(() => {
    if (user) {
      getRulesets(user.user_id, game).then(setRulesets).catch(console.error);
    }
  }, [user, game]);

  // Fetch active ruleset for game id and user id
  useEffect(() => {
    if (user) {
      getActiveRuleset(user.user_id, game)
        .then((activeRulesetResponse) => {
          return getRuleset(
            user.user_id,
            game,
            activeRulesetResponse.ruleset_id
          );
        })
        .then((activeRuleset) => {
          setActiveRulesetState(activeRuleset);
          setSelectedRuleset(activeRuleset.ruleset_id);
        })
        .catch(console.error);
    }
  }, [user, game]);

  // Change active ruleset
  const handleSelectChange = (event) => {
    const rulesetId = event.target.value;
    setSelectedRuleset(rulesetId);

    setActiveRuleset(user.user_id, game, rulesetId)
      .then(() => {
        return getActiveRuleset(user.user_id, game);
      })
      .then((activeRulesetResponse) => {
        return getRuleset(user.user_id, game, activeRulesetResponse.ruleset_id);
      })
      .then((activeRuleset) => {
        setActiveRulesetState(activeRuleset);
        setSelectedRuleset(activeRuleset.ruleset_id);
      })
      .catch(console.error);
  };

  // Save ruleset
  const handleSave = () => {
    saveRuleset(user.user_id, game, rulesetName, activeRuleset.rules)
      .then((newRuleset) => {
        getRulesets(user.user_id, game).then(setRulesets).catch(console.error);

        setRulesetName('');
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 2750);

        // Set the newly saved ruleset as the active one
        handleSelectChange({ target: { value: newRuleset.ruleset_id } });
      })
      .catch(console.error);
  };

  // Delete ruleset
  const handleDelete = async (rulesetId) => {
    if ((rulesetId >= 1 && rulesetId <= 8) || user.user_id === 1) {
      alert('Cannot delete default ruleset');
      return;
    }

    // If the ruleset being deleted is the active one, set the active ruleset to the default for the current game
    if (rulesetId === selectedRuleset) {
      const defaultRulesetId = defaultRulesetIds[game];
      handleSelectChange({ target: { value: defaultRulesetId } });
    }

    deleteRuleset(user.user_id, game, rulesetId)
      .then(() => {
        getRulesets(user.user_id, game).then(setRulesets).catch(console.error);
      })
      .catch(console.error);
  };

  // Handle edit button click
  const handleEdit = (ruleKey, type, text) => {
    setEditing({ key: ruleKey, type: type });
    setEditedText(text);
  };

  // Handle submit button click
  const handleSubmit = () => {
    if (editing) {
      setActiveRulesetState((prevRuleset) => {
        const newRules = { ...prevRuleset.rules };
        if (!newRules[editing.key]) {
          newRules[editing.key] = {};
        }
        newRules[editing.key][editing.type] = editedText;
        return { ...prevRuleset, rules: newRules };
      });

      // Reset editing and editedText
      setEditing(null);
      setEditedText('');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setEditing(null);
    setEditedText('');
  };

  return (
    <div className='h-full bg-base-100 p-8'>
      {/* Alert Section */}
      {alertVisible && (
        <div className='flex items-center h-16 border border-primary pr-4 w-full max-w-md rounded-lg mx-auto mb-4'>
          <div className='flex items-center justify-center bg-primary w-12 h-full rounded-l text-primary-content'>
            <MdOutlineInfo size={24} />
          </div>
          <div className='px-6'>
            <h5 className='font-semibold'>Saved</h5>
            <p className='text-sm'>Custom Ruleset Saved!</p>
          </div>
          <button className='ml-auto' onClick={() => setAlertVisible(false)}>
            <IoCloseSharp size={24} />
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className='relative flex flex-col items-center mb-6'>
        {/* Return Button at the top left */}
        <Link
          to={`/games/${game}`}
          className='absolute top-0 left-0 btn btn-error'
        >
          <IoCaretBackOutline size={24} /> Return to {game}
        </Link>

        {/* Centered Title */}
        <h1 className='mt-16 text-2xl font-bold text-base-content text-center sm:mt-0'>
          Edit Rules for {game}
        </h1>
      </div>

      {/* Input, Select and Button Section */}
      <div className='flex flex-col lg:flex-row justify-between items-center mb-4'>
        <div className='flex flex-col lg:flex-row items-center w-full mb-4 lg:mb-0 lg:w-2/3'>
          <input
            type='text'
            placeholder='Enter Custom Ruleset Name'
            className='input input-bordered w-full lg:w-1/2 mb-4 lg:mb-0'
            value={rulesetName}
            onChange={(e) => setRulesetName(e.target.value)}
            required
          />
          <button
            className='btn btn-primary lg:ml-4 w-full lg:w-auto'
            onClick={handleSave}
            disabled={!rulesetName.trim()}
          >
            Save Ruleset
          </button>
        </div>
        <div className='w-full lg:w-1/3 flex flex-col lg:flex-row items-center'>
          <select
            className='select select-bordered w-full lg:w-2/3 mb-4 lg:mb-0'
            value={selectedRuleset}
            onChange={handleSelectChange}
          >
            {rulesets.map((ruleset) => (
              <option key={ruleset.ruleset_id} value={ruleset.ruleset_id}>
                {ruleset.name}
              </option>
            ))}
          </select>
          <button
            className='btn btn-primary lg:ml-4 w-full lg:w-auto'
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            View All Rulesets
          </button>
        </div>
      </div>

      {/* Modal to show rulesets */}
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg'>Saved rules for {game}</h3>
            <form method='dialog'>
              <button className='btn btn-ghost'>
                <IoCloseSharp size={22} />
              </button>
            </form>
          </div>
          <ul className='py-4'>
            {rulesets.map((ruleset) => (
              <li
                key={ruleset.ruleset_id}
                className='bg-neutral py-2 px-4 mb-2 rounded-lg text-lg flex justify-between items-center'
              >
                <span>{ruleset.name}</span>
                {Number(ruleset.ruleset_id) > 8 && (
                  <button
                    className='btn btn-error'
                    onClick={() => handleDelete(ruleset.ruleset_id)}
                  >
                    <MdDelete size={22} />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </dialog>

      {/* Active Ruleset Section */}
      {activeRuleset && activeRuleset.rules && (
        <div className='mt-10'>
          <h2 className='text-xl font-bold text-base-content'>
            Active Ruleset:{' '}
            <span className='text-primary'>{activeRuleset.name}</span>
          </h2>

          {/* Rules Section */}
          {activeRuleset.rules &&
            Object.entries(activeRuleset.rules).map(([ruleKey, rule]) => (
              <div key={ruleKey} className='mb-4'>
                <h3 className='text-lg font-semibold mb-2 mt-6'>
                  {rule.result}
                </h3>

                {/* Title Section */}
                <div className='flex flex-col sm:flex-row justify-between items-center bg-neutral py-2 px-4 rounded-lg'>
                  {editing?.key === ruleKey && editing?.type === 'title' ? (
                    <>
                      <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        autoFocus
                        className='w-full h-10 rounded-lg p-2 bg-secondary'
                      />
                      <div className='flex space-x-4 mt-4 sm:mt-0 sm:ml-4'>
                        <button
                          className='btn btn-primary'
                          onClick={handleSubmit}
                        >
                          <FaCheck size={22} />
                        </button>
                        <button
                          className='btn btn-error'
                          onClick={handleCancel}
                        >
                          <IoCloseSharp size={22} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='font-semibold text-neutral-content'>
                        {rule.title}
                      </div>
                      <button
                        className='btn btn-primary mt-4 sm:mt-0 sm:ml-4'
                        onClick={() => handleEdit(ruleKey, 'title', rule.title)}
                      >
                        <MdEdit size={22} />
                      </button>
                    </>
                  )}
                </div>

                {/* Description Section */}
                <div className='flex flex-col sm:flex-row justify-between items-center bg-neutral py-2 px-4 rounded-lg mt-4'>
                  {editing?.key === ruleKey &&
                  editing?.type === 'description' ? (
                    <>
                      <input
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        autoFocus
                        className='w-full h-10 rounded-lg p-2 bg-secondary'
                      />
                      <div className='flex space-x-4 mt-4 sm:mt-0 sm:ml-4'>
                        <button
                          className='btn btn-primary'
                          onClick={handleSubmit}
                        >
                          <FaCheck size={22} />
                        </button>
                        <button
                          className='btn btn-error'
                          onClick={handleCancel}
                        >
                          <IoCloseSharp size={22} />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='font-semibold text-neutral-content'>
                        {rule.description}
                      </div>
                      <button
                        className='btn btn-primary mt-4 sm:mt-0 sm:ml-4'
                        onClick={() =>
                          handleEdit(ruleKey, 'description', rule.description)
                        }
                      >
                        <MdEdit size={22} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default EditRulesPage;
