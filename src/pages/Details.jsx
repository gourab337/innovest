import { useState } from 'react';
import { useContext } from 'react';
import Nav from '../components/nav/Nav';
import Drops from '../components/details/Drops';
import SuggestedProfiles from '../components/details/SuggestedProfiles';
import { authContext } from '../store/Auth';
import { useParams } from 'react-router-dom';

import { ethers } from 'ethers';

import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

import { toast } from 'react-toastify';

const Details = () => {
  const { data } = useContext(authContext);
  const [invest, setinvest] = useState(false);
  const callChange = () => {
    setinvest(true);
  };
  const { id } = useParams();
  const projectInfo = data?.projects[id];
  const [activeTab, setActiveTab] = useState('nft');

  const handleSubscribe = async () => {
    const channelHash = '0x14ABd4A9B37a5e5d015f273c18d7CCA2E3f1f5c2';
    const addr = '0x38b6f0C3D3d964dDB7eA6E4B31621F954271d49E';

    const provider = new ethers.providers.JsonRpcProvider(
      import.meta.env.VITE_APP_RPC
    );

    let signer = new ethers.Wallet(
      import.meta.env.VITE_APP_SAFE_PROVIDER,
      provider
    );

    const user = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });

    const response = await user.notification.subscribe(
      `eip155:11155111:${channelHash}`
    );

    console.log(response);

    const notify = () =>
      toast.success('Subscribed Successfully', {
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
  };

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
            <h5 className='text-3xl font-bold mb-2'>{projectInfo?.name}</h5>
            {!invest ? (
              <button
                className=' border border-gray-200 w-full py-2 px-4 rounded-md mb-4 bg-white text-gray-700'
                onClick={callChange}
              >
                Invest Now
              </button>
            ) : (
              <div className='flex flex-row gap-4'>
                <button className='bg-grey-500 bg-gray-800 border border-gray-200 w-full text-white py-2 px-4 rounded-md mb-4 bg-opacity-0'>
                  Invested
                </button>
                <button
                  className='border border-gray-200 w-full py-2 px-4 rounded-md mb-4 bg-white text-gray-700'
                  onClick={handleSubscribe}
                >
                  Subscribe
                </button>
              </div>
            )}
            <div className='bg-gray-700 border border-gray-600 rounded-lg shadow p-4 mb-4'>
              <h3 className='text-bold'>Perks</h3>
              <p className='text-gray-300'>{projectInfo?.perks}</p>
            </div>
            <div className='bg-gray-700 border border-gray-600 rounded-lg shadow p-4'>
              <p className='text-gray-300'>{projectInfo?.description}</p>
            </div>
          </div>
        </div>
        <div className=' h-auto mt-4 bg-gray-800 rounded-lg shadow p-4 flex flex-col text-white relative gap-4 bg-opacity-0'>
          <div className='flex'>
            <button
              onClick={() => setActiveTab('nft')}
              className={`text-white py-2 px-4 border-b-2 border-transparent focus:border-innovest hover:border-innovest ${
                activeTab === 'nft' ? 'border-innovest' : ''
              }`}
            >
              Drops
            </button>
            <button
              onClick={() => setActiveTab('investor')}
              className={`text-white py-2 px-4 border-b-2 border-transparent focus:border-innovest hover:border-innovest ${
                activeTab === 'investor' ? 'border-innovest' : ''
              }`}
            >
              Leaderboard
            </button>
          </div>
          <div className='mt-4'>
            {activeTab === 'nft' ? (
              <Drops />
            ) : (
              <SuggestedProfiles data={data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
