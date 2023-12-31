import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Search from './Search';

import { authContext } from '../../store/Auth';

function Nav() {
  const { isAuthenticated, login } = useContext(authContext);

  const navigate = useNavigate();

  return (
    <nav className='bg-black border-b fixed border-gray-800 px-16 py-4  left-0 right-0 top-0 z-50 font-lato'>
      <div className='flex flex-wrap justify-between items-center'>
        <div className='flex items-center justify-between mr-4'>
          <Link to={'/'}>
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer hover:font-bold hover:text-innovest transition-colors'>
              innovest.fi
            </span>
          </Link>
        </div>
        <Search />
        <div className='flex items-center justify-between'>
          {isAuthenticated && (
            <Link to={'/explore'}>
              <button
                type='button'
                className='py-2.5 px-5  text-sm  font-roboto tracking-wider  bg-innovest text-white focus:outline-none  rounded-full  font-bold  hover:shadow-md transition-shadow            '
              >
                Explore
              </button>
            </Link>
          )}
          {!isAuthenticated && (
            <button
              type='button'
              className='py-2.5 px-5  text-sm  font-roboto tracking-wider  bg-innovest text-black focus:outline-none  rounded-full  font-bold  hover:shadow-md transition-shadow            '
              onClick={async () => {
                await login();
                navigate('/push');
              }}
            >
              Connect
            </button>
          )}
          <Link to={'/dashboard'}>
            <button
              type='button'
              className='py-2.5 px-5  text-sm  font-roboto tracking-wider  bg-innovest text-white focus:outline-none  rounded-full  font-bold  hover:shadow-md transition-shadow ml-2           '
            >
              Dashboard
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
