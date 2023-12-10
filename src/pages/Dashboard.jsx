import React from 'react';
import Nav from '../components/nav/Nav';

import { useContext, useState } from 'react';
import { authContext } from '../store/Auth';

import { ethers } from 'ethers';

import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

import { toast } from 'react-toastify';
import Stats from '../components/Stats';

function Dashboard() {
  const { data } = useContext(authContext);

  const project = data?.projects[0];

  const channelHash = '0x14ABd4A9B37a5e5d015f273c18d7CCA2E3f1f5c2';

  const [roomID, setRoomID] = useState(null);
  const [meetingLink, setMeetingLink] = useState(null);

  const handleSendMeetingLink = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Accept', '*/*');
    myHeaders.append('x-api-key', '6nuwaMLgpfcFJIr0329CxNvabDA_N5Bo');
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      title: 'Huddle01-Test',
      roomLocked: true,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    const res = await fetch(
      'https://api.huddle01.com/api/v1/create-iframe-room',
      requestOptions
    );
    const data = await res.json();

    setRoomID(data?.data?.roomId);
    setMeetingLink(data?.data?.meetingLink);

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

    const sendNotifRes = await user.channel.send(['*'], {
      notification: {
        title: project?.name,
        body: `Meeting link to talk with the stakeholders and project owner`,
      },
      payload: {
        cta: meetingLink,
      },
    });
    console.log(sendNotifRes);

    const notify = () =>
      toast.success('Meeting link sent to subscribers', {
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
        <div className='w-1/3 mt-4 h-auto bg-gray-800 rounded-lg shadow flex flex-col text-white relative gap-36 bg-opacity-0'>
          <div className='h-24 p-4 '>
            <div className='hidden md:block w-full h-24 filter blur-lg'>
              <img
                className='object-cover w-full h-36'
                src={project?.imgUrl}
                alt=''
              />
            </div>
            <img
              className='object-cover w-32 h-32 border-2 border-black-700 absolute '
              src={project?.imgUrl}
              alt=''
            />
          </div>

          <div className='p-4 '>
            <h5 className='text-3xl font-bold mb-2'>{project?.name}</h5>

            <div className='bg-gray-700 border border-gray-600 rounded-lg shadow p-4 mb-4'>
              <p className='text-gray-300'>{project?.description}</p>
            </div>
            <div className='bg-gray-700 border border-gray-600 rounded-lg shadow p-4'>
              <p className='text-gray-300'>{project?.perks}</p>
            </div>
          </div>
        </div>
        <div className='w-1/2 h-auto mt-4 bg-gray-800 rounded-lg shadow p-4 flex flex-col text-white relative gap-4 bg-opacity-0'>
          <div>
            <input
              type='text'
              id='disabled-input-2'
              aria-label='disabled input 2'
              className=' border text-sm rounded-lg border-border-pink-500 block w-full p-2.5 cursor-not-allowed bg-gray-700  border-pink-300 mb-4'
              defaultValue={`Channel Hash - ${channelHash}`}
              disabled
              readOnly
            />
            <button
              type='button'
              className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
              onClick={handleSendMeetingLink}
            >
              Send Meeting Link to Stakeholders
            </button>
            <input
              type='text'
              id='disabled-input-2'
              aria-label='disabled input 2'
              className=' border text-sm rounded-lg border-border-pink-500  w-auto p-2.5 cursor-not-allowed bg-gray-700  border-pink-300 mb-4 inline'
              placeholder='Meeting Link'
              value={roomID}
              disabled
              readOnly
            />
          </div>
          <Stats />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
