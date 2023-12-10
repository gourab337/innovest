import { useState } from 'react';
import {useContext} from 'react'
import Nav from '../components/nav/Nav';
import Drops from '../components/details/Drops';
import SuggestedProfiles from '../components/details/SuggestedProfiles';
import { authContext } from '../store/Auth';
import { useParams } from 'react-router-dom';

const Details = () => {
  const { data } = useContext(authContext);
  const [invest, setinvest] = useState(false)
  const callChange = ()=>{
    setinvest(true);
  }
  const { id } = useParams();
  const projectInfo = data?.projects[id]
  const [activeTab, setActiveTab] = useState('nft');
  return (
    <>
      <Nav />
      <div className='h-screen bg-black w-full flex justify-center gap-4 mt-24'>
        <div className='w-1/3 mt-4 h-auto bg-gray-800 rounded-lg shadow p-4 flex flex-col text-white relative gap-36 bg-opacity-0'>
          <div className='h-24'>
            <div className='hidden md:block w-full h-24 filter blur-lg'>
              <img
                className='object-cover w-full h-36'
                src={projectInfo?.imgUrl}
                alt=''
              />
            </div>
            <img
              className='object-cover w-32 h-32 border-2 border-black-700 absolute '
              src={projectInfo?.imgUrl}
              alt=''
            />
          </div>

          <div>
            <h5 className='text-3xl font-bold mb-2'>
            {projectInfo?.name}
            </h5>
           { !invest ?
           ( <button className=' border border-gray-200 w-full py-2 px-4 rounded-md mb-4 bg-white text-gray-700' onClick={callChange}>
              Invest Now
            </button>):(
              <div className='flex flex-row gap-4'>
              <button className='bg-grey-500 bg-gray-800 border border-gray-200 w-full text-white py-2 px-4 rounded-md mb-4 bg-opacity-0'>
              Invested
            </button>
            <button className='border border-gray-200 w-full py-2 px-4 rounded-md mb-4 bg-white text-gray-700'>
              Sponsor
            </button>
              </div>
              )
            
            }
            <div className='bg-gray-700 border border-gray-600 rounded-lg shadow p-4 mb-4'>
            <h3 className='text-bold'>Perks</h3>
              <p className='text-gray-300'>
                {projectInfo?.perks}
              </p>
            </div>
            <div className='bg-gray-700 border border-gray-600 rounded-lg shadow p-4'>
              <p className='text-gray-300'>
               {projectInfo?.description}
              </p>
            </div>
          </div>
        </div>
        <div className=' h-auto mt-4 bg-gray-800 rounded-lg shadow p-4 flex flex-col text-white relative gap-4 bg-opacity-0'>
          <div className='flex'>
            <button
              onClick={() => setActiveTab('nft')}
              className={`text-white py-2 px-4 border-b-2 border-transparent focus:outline-none hover:border-blue-500 ${activeTab === 'nft' ? 'border-blue-500' : ''
                }`}
            >
              Drops
            </button>
            <button
              onClick={() => setActiveTab('investor')}
              className={`text-white py-2 px-4 border-b-2 border-transparent focus:outline-none hover:border-blue-500 ${activeTab === 'investor' ? 'border-blue-500' : ''
                }`}
            >
              Leaderboard
            </button>
          </div>
          <div className='mt-4'>
            {activeTab === 'nft' ? <Drops /> : <SuggestedProfiles data={data}/>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
