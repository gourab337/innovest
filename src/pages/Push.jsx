import { useState, useContext } from 'react';

import { ethers } from 'ethers';

import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

import { authContext } from '../store/Auth';

function Push() {
  const { safeAuthPack, token } = useContext(authContext);

  const provider = new ethers.providers.JsonRpcProvider(
    import.meta.env.VITE_APP_RPC
  );

  let signer = new ethers.Wallet(import.meta.env.VITE_APP_PVTKEY, provider);
  console.log(signer);

  const [user, setUser] = useState(null);
  const [channelAddress, setChannel] = useState(
    '0x14ABd4A9B37a5e5d015f273c18d7CCA2E3f1f5c2'
  );

  const [customUserAddress, setCustomUserAddress] = useState(null);

  const init = async () => {
    const userAlice = await PushAPI.initialize(signer, {
      env: CONSTANTS.ENV.STAGING,
    });
    setUser(userAlice);
  };

  const create = async () => {
    const response = await user.channel.create({
      name: 'Test Channel',
      description: 'Test Description',
      icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAz0lEQVR4AcXBsU0EQQyG0e+saWJ7oACiKYDMEZVs6GgSpC2BIhzRwAS0sgk9HKn3gpFOAv3v3V4/3+4U4Z1q5KTy42Ql940qvFONnFSGmCFmiN2+fj7uCBlihpgh1ngwcvKfwjuVIWaIGWKNB+GdauSk8uNkJfeNKryzYogZYoZY40m5b/wlQ8wQM8TayMlKeKcaOVkJ71QjJyuGmCFmiDUe+HFy4VyEd57hx0mV+0ZliBlihlgL71w4FyMnVXhnZeSkiu93qheuDDFDzBD7BcCyMAOfy204AAAAAElFTkSuQmCC',
      url: 'https://push.org',
    });

    console.log(response);

    setChannel(response.transactionHash);
  };

  const joinSelf = async () => {
    const response = await user.notification.subscribe(
      `eip155:11155111:${channelAddress}`
    );
    console.log(response);
  };

  const join = async () => {
    const userAlice = await PushAPI.initialize(
      new ethers.Wallet(customUserAddress, provider),
      {
        env: CONSTANTS.ENV.STAGING,
      }
    );

    const response = await userAlice.notification.subscribe(
      `eip155:11155111:${channelAddress}`
    );

    console.log(response);
  };

  const send = async () => {
    const sendNotifRes = await user.channel.send(['*'], {
      notification: { title: 'test', body: 'test' },
    });
    console.log(sendNotifRes);
  };

  const fetch = async () => {
    const userAlice = await PushAPI.initialize(
      new ethers.Wallet(customUserAddress, provider),
      {
        env: CONSTANTS.ENV.STAGING,
      }
    );
    const inboxNotifications = await userAlice.notification.list('INBOX');
    console.log(inboxNotifications);
  };

  return (
    <div>
      <button
        className='font-text border-1 border-gray-400 px-2 py-1 block mb-4'
        onClick={init}
      >
        init
      </button>
      <button
        className='font-text border-1 border-gray-400 px-2 py-1 block mb-4'
        onClick={create}
      >
        create
      </button>

      <button
        className='font-text border-1 border-gray-400 px-2 py-1 block mb-4'
        onClick={joinSelf}
      >
        join self
      </button>

      <input
        type='text'
        name=''
        id=''
        placeholder='custom signer to subscribe'
        onChange={e => {
          setCustomUserAddress(e.target.value);
        }}
      />

      <button
        className='font-text border-1 border-gray-400 px-2 py-1 block mb-4'
        onClick={join}
      >
        join custom
      </button>

      <button
        className='font-text border-1 border-gray-400 px-2 py-1 block mb-4'
        onClick={send}
      >
        send notif
      </button>
      <button
        className='font-text border-1 border-gray-400 px-2 py-1 block mb-4'
        onClick={fetch}
      >
        fetch
      </button>
    </div>
  );
}

export default Push;
