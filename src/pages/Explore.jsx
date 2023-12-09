import {useContext} from 'react'
import Nav from '../components/nav/Nav';
import { authContext } from '../store/Auth';


function Explore() {
  const { data } = useContext(authContext);
  const projectList=data?.projects
  const cardsPerRow = 4;
  const renderCards = () => {
    const rows = [];
    for (let i = 0; i < projectList?.length; i += cardsPerRow) {
      const rowCards = projectList?.slice(i, i + cardsPerRow).map((ele, index) => (
        <div
          key={i + index}
          className='flex-1 max-w-xs  border border-gray-200 rounded-lg shadow  dark:border-gray-700 m-2  bg-opacity-0'
        >
          <div className='max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-700  bg-opacity-0 '>
            <a href='/explore/details'>
              <img
                className='rounded-t-lg w-full'
                src={ele?.imgUrl}
                alt=''
              />
            </a>
            <div className='p-5'>
              <a href='#'>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  bg-opacity-0'>
                 {ele.name}
                </h5>
              </a>
              <div className='mb-24'>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400  bg-opacity-0'>
                 {ele?.description}
                </p>
              </div>
              <a href='#' className='text-blue-700'>
                Read more
                <svg
                  className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ));

      rows.push(
        <div key={i} className='flex mb-2'>
          {rowCards}
        </div>
      );
    }

    return rows;
  };

  return (
    <>
      <Nav />
      <div className='h-full bg-black w-full mt-24'>
        <div className='px-4 py-5'>
          <span className='text-white'>Projects</span>
          <div className='flex flex-col ml-32 mr-24'>{renderCards()}</div>
        </div>
      </div>
    </>
  );
}

export default Explore;
