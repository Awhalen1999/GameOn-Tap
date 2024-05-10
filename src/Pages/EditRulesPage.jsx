//todo:
// delete rulesets modal
// change react icon for cancel button
// reload get rulesets after save
// on save set that ruleset to active (maybe?)

import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import {
  getRulesets,
  getActiveRuleset,
  setActiveRuleset,
  saveRuleset,
  deleteRuleset,
} from '../utils/api';
import { MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { LuPartyPopper } from 'react-icons/lu';

const EditRulesPage = () => {
  const { user } = useContext(UserContext);
  const { game } = useParams();
  const [rulesets, setRulesets] = useState([]);
  const [activeRuleset, setActiveRulesetState] = useState(null);
  const [selectedRuleset, setSelectedRuleset] = useState('');
  const [editing, setEditing] = useState(null);
  const [editedText, setEditedText] = useState('');
  const [rulesetName, setRulesetName] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  // Fetch rulesets all rulesets for game id and user id
  useEffect(() => {
    getRulesets(user.id, game).then(setRulesets).catch(console.error);
  }, [user.id, game]);

  // Fetch active ruleset for game id and user id
  useEffect(() => {
    getActiveRuleset(user.id, game)
      .then((activeRuleset) => {
        setActiveRulesetState(activeRuleset);
        setSelectedRuleset(activeRuleset.id);
      })
      .catch(console.error);
  }, [user.id, game]);

  // Change active ruleset
  const handleSelectChange = async (event) => {
    const rulesetId = event.target.value;
    setSelectedRuleset(rulesetId);
    await setActiveRuleset(user.id, game, rulesetId);
    getActiveRuleset(user.id, game)
      .then(setActiveRulesetState)
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
      await saveRuleset(user.id, game, rulesetName, activeRuleset.rules);
      // Refresh rulesets
      getRulesets(user.id, game).then(setRulesets).catch(console.error);
      setRulesetName('');
      setAlertVisible(true);
      setTimeout(() => {
        setAlertVisible(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      //  handle errors: same name.
    }
  };

  // Delete ruleset
  const handleDelete = async (rulesetId) => {
    try {
      await deleteRuleset(user.id, game, rulesetId);
      // Refresh rulesets
      getRulesets(user.id, game).then(setRulesets).catch(console.error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='h-full bg-base-100 p-8'>
      {/* Alert Section */}
      {alertVisible && (
        <div className='alert alert-success my-2 '>
          Ruleset successfully saved! <LuPartyPopper />
        </div>
      )}
      {/* Header Section */}
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold text-primary'>
          Edit Rules for {game}
        </h1>
        <Link to={`/games/${game}`} className='btn btn-error'>
          Return to {game}
        </Link>
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
                <option key={ruleset.id} value={ruleset.id}>
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

      {/* Modal */}
      <dialog id='my_modal_1' className='modal'>
        <div className='modal-box'>
          <div className='flex justify-between items-center '>
            <h3 className='font-bold text-lg items-center'>
              Saved rules for {game}
            </h3>
            <form method='dialog' className='flex items-center'>
              <button className='btn btn-ghost '>
                <MdClose size={22} />
              </button>
            </form>
          </div>
          <ul className='py-4'>
            {rulesets.map((ruleset) => (
              <li
                key={ruleset.id}
                className='bg-neutral p-2 mb-2 rounded text-lg flex justify-between items-center'
              >
                <span>{ruleset.name}</span>
                <button
                  className='btn btn-error'
                  onClick={() => handleDelete(ruleset.id)}
                >
                  <MdDelete size={22} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>

      {/* Active Ruleset Section */}
      {activeRuleset && (
        <div className='mt-10'>
          <h2 className='text-xl font-bold text-primary'>
            {activeRuleset.name}
          </h2>

          {/* Rules Section */}
          {Object.entries(activeRuleset.rules).map(([ruleKey, rule], index) => (
            <div key={index} className='mb-4'>
              <h3 className='text-xl font-semibold mb-2 mt-6'>{rule.result}</h3>

              {/* Title Section */}
              <div className='flex justify-between items-center bg-neutral py-2 px-4 rounded-lg'>
                {editing?.key === ruleKey && editing?.type === 'title' ? (
                  <>
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      autoFocus
                      className='w-full h-10 rounded-lg p-2 bg-secondary text-text'
                    />
                    <div className='flex space-x-4 ml-4'>
                      <button
                        className='btn btn-primary'
                        onClick={handleSubmit}
                      >
                        <FaCheck size={22} />
                      </button>
                      <button className='btn btn-error' onClick={handleCancel}>
                        <MdClose size={22} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='font-semibold text-accent'>
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
                      className='w-full h-10 rounded-lg p-2 bg-secondary text-text'
                    />
                    <div className='flex space-x-4 ml-4'>
                      <button
                        className='btn btn-primary'
                        onClick={handleSubmit}
                      >
                        <FaCheck size={22} />
                      </button>
                      <button className='btn btn-error' onClick={handleCancel}>
                        <MdClose size={22} />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='font-semibold text-accent'>
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
