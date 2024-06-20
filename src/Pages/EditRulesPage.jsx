//todo: fix alert

import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
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

const EditRulesPage = () => {
  const { user } = useContext(UserContext);
  const { game } = useParams();
  const navigate = useNavigate();
  const [rulesets, setRulesets] = useState([]);
  const [activeRuleset, setActiveRulesetState] = useState(null);
  const [selectedRuleset, setSelectedRuleset] = useState('');
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [rulesetName, setRulesetName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  // Fetch rulesets all rulesets for game id and user id
  useEffect(() => {
    getRulesets(user.user_id, game).then(setRulesets).catch(console.error);
  }, [user.user_id, game]);

  // Fetch active ruleset for game id and user id
  useEffect(() => {
    const fetchActiveRuleset = async () => {
      if (game) {
        const activeRulesetResponse = await getActiveRuleset(
          user.user_id,
          game
        );

        if (activeRulesetResponse.ruleset_id) {
          const activeRuleset = await getRuleset(
            user.user_id,
            game,
            activeRulesetResponse.ruleset_id
          );

          setActiveRulesetState(activeRuleset);
          setSelectedRuleset(activeRuleset.ruleset_id);
        }
      }
    };

    fetchActiveRuleset().catch(console.error);
  }, [user.user_id, game]);

  // Change active ruleset
  const handleSelectChange = async (event) => {
    const rulesetId = event.target.value;
    setSelectedRuleset(rulesetId);

    console.log('Setting active ruleset...'); // Debugging line
    setActiveRuleset(user.user_id, game, rulesetId)
      .then(() => {
        console.log('Getting active ruleset...'); // Debugging line
        return getActiveRuleset(user.user_id, game);
      })
      .then((activeRuleset) => {
        console.log('Setting active ruleset state:', activeRuleset); // Debugging line
        setActiveRulesetState(activeRuleset);
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

  // Save ruleset
  const handleSave = async () => {
    try {
      const newRuleset = await saveRuleset(
        user.user_id,
        game,
        rulesetName,
        activeRuleset.rules
      );
      getRulesets(user.user_id, game).then(setRulesets).catch(console.error);
      setRulesetName('');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2750);

      // Set the newly saved ruleset as the active one
      handleSelectChange({ target: { value: newRuleset.ruleset_id } });
    } catch (error) {
      console.error(error);
    }
  };

  // Delete ruleset
  const handleDelete = async (rulesetId) => {
    if (rulesetId === 0) {
      alert('Cannot delete default ruleset');
      return;
    }

    try {
      await deleteRuleset(user.id, game, rulesetId);
      getRulesets(user.id, game).then(setRulesets).catch(console.error);

      // If the ruleset being deleted is the active one, set the active ruleset to 0
      if (rulesetId === selectedRuleset) {
        handleSelectChange({ target: { value: '0' } });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='h-full bg-base-100 p-8'>
      {/* Alert Section */}
      {alertVisible && (
        <div className='flex items-center h-16 border border-primary pr-4 w-full max-w-md  rounded-lg mx-auto'>
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
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-base-content'>
          Edit Rules for {game}
        </h1>
        <button
          className='btn btn-error'
          onClick={() => navigate(`/games/${game}`)}
        >
          Return to {game}
        </button>
      </div>

      {/* Input, Select and Button Section */}
      <div className='flex justify-between items-center mb-4'>
        <div className='flex items-center w-full mr-4'>
          <input
            type='text'
            placeholder='Enter Custom Ruleset Name'
            className='input input-bordered w-1/3'
            value={rulesetName}
            onChange={(e) => setRulesetName(e.target.value)}
            required
          />
          <button
            className='btn btn-primary ml-4'
            onClick={handleSave}
            disabled={!rulesetName.trim()}
          >
            Save Ruleset
          </button>
          <div className='w-1/4 ml-4'>
            <select
              className='select select-bordered w-full'
              value={selectedRuleset}
              onChange={handleSelectChange}
            >
              {rulesets.map((ruleset) => (
                <option key={ruleset.ruleset_id} value={ruleset.ruleset_id}>
                  {ruleset.name}
                </option>
              ))}
            </select>
          </div>
          <button
            className='btn btn-primary ml-4'
            onClick={() => document.getElementById('my_modal_1').showModal()}
          >
            View All Rulesets
          </button>
        </div>
      </div>

      {/* Modal to show rulesets */}
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <div className='flex justify-between items-center '>
            <h3 className='font-bold text-lg items-center'>
              Saved rules for {game}
            </h3>
            <form method='dialog' className='flex items-center'>
              <button className='btn btn-ghost '>
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
                <span>{ruleset.ruleset_id}</span>
                <span>{ruleset.name}</span>
                {Number(ruleset.id) !== 0 && (
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
      {activeRuleset && (
        <div className='mt-10'>
          <h2 className='text-xl font-bold text-accent'>
            {activeRuleset.name}
          </h2>

          {/* Rules Section */}
          {Object.entries(activeRuleset.rules).map(([ruleKey, rule]) => (
            <div key={ruleKey} className='mb-4'>
              {/* Result Section */}
              <h3 className='text-xl font-semibold mb-2 mt-6'>{rule.result}</h3>

              {/* Title Section */}
              <div className='flex justify-between items-center bg-neutral py-2 px-4 rounded-lg'>
                {editing?.key === ruleKey && editing?.type === 'title' ? (
                  <>
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      autoFocus
                      className='w-full h-10 rounded-lg p-2 bg-secondary'
                    />
                    <div className='flex space-x-4 ml-4'>
                      <button
                        className='btn btn-primary'
                        onClick={handleSubmit}
                      >
                        <FaCheck size={22} />
                      </button>
                      <button className='btn btn-error' onClick={handleCancel}>
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
                      className='btn btn-primary ml-4'
                      onClick={() => handleEdit(ruleKey, 'title', rule.title)}
                    >
                      <MdEdit size={22} />
                    </button>
                  </>
                )}
              </div>

              {/* Description Section */}
              <div className='flex justify-between items-center bg-neutral py-2 px-4 rounded-lg mt-4'>
                {editing?.key === ruleKey && editing?.type === 'description' ? (
                  <>
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      autoFocus
                      className='w-full h-10 rounded-lg p-2 bg-secondary '
                    />
                    <div className='flex space-x-4 ml-4'>
                      <button
                        className='btn btn-primary'
                        onClick={handleSubmit}
                      >
                        <FaCheck size={22} />
                      </button>
                      <button className='btn btn-error' onClick={handleCancel}>
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
                      className='btn btn-primary ml-4'
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
