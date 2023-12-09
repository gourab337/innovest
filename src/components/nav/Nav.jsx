import { Link } from 'react-router-dom';
import Search from './Search';

function Nav() {
  return (
    <nav className='bg-black border-b fixed border-gray-800 px-16 py-4  left-0 right-0 top-0 z-50 font-lato'>
      <div className='flex flex-wrap justify-between items-center'>
        <div className='flex items-center justify-between mr-4'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer hover:font-bold hover:text-blue-700 transition-colors'>
            innovest.fi
          </span>
        </div>
        <Search />
        <div className='flex items-center justify-between'>
          <Link to={'/explore'}>
            <button
              type='button'
              className='py-2.5 px-5  text-sm  font-roboto tracking-wider  bg-blue-700 text-white focus:outline-none  rounded-full  font-bold hover:bg-blue-800 hover:shadow-md transition-shadow            '
            >
              Explore
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
