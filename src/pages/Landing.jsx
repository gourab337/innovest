import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { authContext } from '../store/Auth';

import { toast } from 'react-toastify';

import ETHLogo from '../assets/eth.svg';

const Gallery = ({ imageSrcs }) => {
  return (
    <div className='flex justify-center items-center'>
      <div className='grid grid-cols-2 gap-4 transition-transform duration-300  hover:-translate-y-10'>
        <div class='grid gap-4 transform -translate-y-8'>
          <div className=''>
            <img
              src={imageSrcs[0]}
              alt={`something`}
              className='object-cover w-52  h-auto rounded-lg'
            />
          </div>
          <div className=''>
            <img
              src={imageSrcs[1]}
              alt={`something`}
              className='object-cover w-52  h-auto rounded-lg'
            />
          </div>
          <div className=''>
            <img
              src={imageSrcs[2]}
              alt={`something`}
              className='object-cover w-52  h-auto rounded-lg'
            />
          </div>
        </div>
        <div class='grid gap-4'>
          <div className=''>
            <img
              src={imageSrcs[2]}
              alt={`something`}
              className='object-cover w-52  h-auto rounded-lg'
            />
          </div>
          <div className=''>
            <img
              src={imageSrcs[3]}
              alt={`something`}
              className='object-cover w-52  h-auto rounded-lg'
            />
          </div>
          <div className=''>
            <img
              src={imageSrcs[4]}
              alt={`something`}
              className='object-cover w-52  h-auto rounded-lg'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

function Landing() {
  const images1 = [
    'https://plus.unsplash.com/premium_photo-1680902988871-70d583ca1e95?q=80&w=1979&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1701986789771-4ad3b2e0c82d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1701200952191-d4f6d93be9d9?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1701893850250-13d3ee3709e1?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1701528426370-f8f60489761e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1701921188889-06d89afcbb5b?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const images2 = [...images1];
  images2.reverse();

  const { isAuthenticated, login } = useContext(authContext);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate('/profile');
  }

  const notify = () =>
    toast.success('🦄 Welcome to Innovest!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'dark',
      type: 'default',
    });

  notify();

  return (
    <>
      {/* <Nav /> */}
      <div className='w-screen h-screen flex items-start justify-center'>
        <div className='w-1/3 h-3/5 overflow-hidden'>
          <Gallery imageSrcs={images1} />
        </div>
        <div className='w-1/3 h-full flex flex-col  justify-center pl-14'>
          <div className=' text-6xl text-lato font-semibold whitespace-nowrap  cursor-pointer text-innovest transition-colors flex items-center  mb-6'>
            <img src={ETHLogo} alt='' className='h-20 mr-4' />
            <div>innovest.fi</div>
          </div>
          <div className='text-4xl text-lato font-normal dark:text-white leading-snug  w-4/5  text-left '>
            Free{' '}
            <div className='px-4 pb-1.5 bg-opacity-40 inline text-white bg-slate-300 bg-blur-md w-fit text-3xl rounded-md'>
              loyalites
            </div>{' '}
            every week from your favorite research labs.
          </div>
          <div className='mt-10 pl-10'>
            <button
              className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800'
              onClick={async () => {
                await login();
                navigate('/profile');
              }}
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-2xl font-mono'>
                START INVESTING
              </span>
            </button>
          </div>
        </div>
        <div className='w-1/3 h-3/5 overflow-hidden'>
          <Gallery imageSrcs={images2} />
        </div>
      </div>
    </>
  );
}

export default Landing;
