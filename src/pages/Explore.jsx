import { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import Nav from '../components/nav/Nav';
import { authContext } from '../store/Auth';

function Explore() {
  const { data } = useContext(authContext);
  const projectList = data?.projects;
  const truncateDescription = (description, maxLength) => {
    return description.length > maxLength
      ? description.slice(0, maxLength) + '...'
      : description;
  };
  const navigate = useNavigate();
const openDetail =(index)=>{
  navigate(`/explore/${index}`)
}
  return (
    <>
      <Nav />
      <div className='mt-24'>
        <div className=' bg-black w-full '>
          <div className='px-4 py-5'>
            <span className='text-white'>Projects</span>
            <div className='flex flex-wrap gap-2 justify-center '>
              {projectList?.map((ele, index) => (
                <div
                  key={index}
                  className='w-full sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 h-3/4'
                >
                  <div className='border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-opacity-0 h-96' onClick={() => openDetail(index)}
>
                      <img
                        className='rounded-t-lg w-full h-44 object-cover'
                        src={ele?.imgUrl}
                        alt=''
                      />
                    <div className='p-5'>
                        <h5 className='text-2xl font-bold tracking-tight text-gray-900 dark:text-white bg-opacity-0'>
                          {ele.name}
                        </h5>
                      <p className='text-sm text-gray-700 dark:text-gray-400 bg-opacity-0'>
                        {truncateDescription(ele?.description, 150)}
                      </p>
                      <a  className='text-blue-700'>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
