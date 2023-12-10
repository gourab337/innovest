import { useContext } from 'react';

import { authContext } from '../store/Auth';

import Highlight from './profile/Highlight';

function Stats() {
  const { data } = useContext(authContext);

  const profiles = data?.popularProfiles.slice(-5) || [];
  return (
    <div className='w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
          Latest Investors
        </h5>
      </div>
      <div className='flow-root'>
        <ul
          role='list'
          className='divide-y divide-gray-200 dark:divide-gray-700'
        >
          {profiles.map(profile => {
            return <Highlight profile={profile} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Stats;
