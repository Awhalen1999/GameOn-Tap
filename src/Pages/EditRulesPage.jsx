import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';

const EditRulesPage = () => {
  const { user } = useContext(UserContext);
  const { game } = useParams();

  return (
    <div className='h-full bg-base-100 p-8'>
      <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-bold text-primary'>
          Edit Rules for {game}
        </h1>
        <Link to={`/games/${game}`} className='btn btn-outline btn-accent'>
          Return to {game}
        </Link>
      </div>
      <div className='flex justify-between items-center mb-4'>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered w-full max-w-xs mr-4'
        />
        <button className='btn btn-primary mr-4'>Submit</button>
        <div className='w-full max-w-xs'>
          <select className='select select-bordered w-full'>
            <option disabled selected>
              Pick your favorite Simpson
            </option>
            <option>Homer</option>
            <option>Marge</option>
            <option>Bart</option>
            <option>Lisa</option>
            <option>Maggie</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EditRulesPage;
