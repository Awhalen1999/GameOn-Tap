import React from 'react';
import { FaCheck } from 'react-icons/fa6';
import { MdEdit } from 'react-icons/md';

const RuleEdit = ({
  editing,
  editedText,
  setEditedText,
  handleSubmit,
  handleEdit,
  rule,
  ruleKey,
  type,
}) => (
  <div className='flex justify-between items-center bg-neutral p-4 rounded-lg'>
    {editing?.key === ruleKey && editing?.type === type ? (
      <input
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        autoFocus
        className='w-full h-10 rounded-lg p-2 bg-secondary text-text'
      />
    ) : (
      <div className='font-semibold text-accent'>{rule[type]}</div>
    )}
    {editing?.key === ruleKey && editing?.type === type ? (
      <button className='btn btn-primary ml-4' onClick={handleSubmit}>
        <FaCheck size={22} />
      </button>
    ) : (
      <button
        className='btn btn-primary ml-4'
        onClick={() => handleEdit(ruleKey, type, rule[type])}
      >
        <MdEdit size={22} />
      </button>
    )}
  </div>
);

export default RuleEdit;
