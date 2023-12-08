import TilteInfo from '../utils/TilteInfo';
import { FaArrowCircleDown, FaStarHalfAlt } from 'react-icons/fa';

const CardGrid = ({ data }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className='grid grid-cols-3 gap-2'>
      {data?.map((item, index) => (
        <div key={index} className=' p-4 rounded-md'>
          <img
            src={item.image}
            alt='nft'
            className='h-36 w-36 rounded-md mb-2 hover:shadow-md cursor-pointer'
          />
          <p className='text-white font-bold font-lato'>
            {truncateText(item.description || item.ens || 'dummy.eth', 16)}
          </p>
        </div>
      ))}
    </div>
  );
};

const RecentActivity = ({ data }) => {
  return data.map((item, index) => {
    if (item?.action === 'subscribe')
      return (
        <div
          key={item?.id}
          className='py-4 px-4 mx-2 flex  items-center font-lato font-bold mb-2 hover:bg-slate-950 rounded-lg cursor-pointer '
        >
          <FaStarHalfAlt />
          <div className='flex flex-col ml-4 '>
            <div>Subscribed to {item?.name}</div>
            <div className='text-gray-500'>{item?.id}</div>
          </div>
        </div>
      );
    else if (item?.action === 'receive')
      return (
        <div
          key={item?.id}
          className='py-4 px-4 mx-2 flex justify-between items-center font-lato font-bold mb-2 hover:bg-slate-950 rounded-lg cursor-pointer '
        >
          <div className='flex items-center justify-center'>
            <FaArrowCircleDown />
            <div className='ml-3 '>
              <div className='text-lg text-white'>
                Received an NFT from {item?.name}
              </div>
              <div className='text-md text-gray-400'>
                from <span className='text-blue-700'>{item?.id}</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col text-right'>
            <div>+$1.37</div>
            <div className='text-gray-500'>0.000706 ETH</div>
          </div>
        </div>
      );
    else return <div></div>;
  });
};

function Profile() {
  const holdings = [
    {
      image:
        'https://static.debank.com/image/coin/logo_url/usdc/e87790bfe0b3f2ea855dc29069b38818.png',
      name: 'USD Coin',
      primaryAmount: '725.00',
      secondaryAmount: '725 USDC',
    },
    {
      image:
        'https://static.debank.com/image/eth_token/logo_url/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2/61844453e63cf81301f845d7864236f6.png',
      name: 'Wrapped Ether',
      primaryAmount: '149.32',
      secondaryAmount: '0.05 WETH',
    },
    {
      image:
        'https://static.debank.com/image/token/logo_url/eth/935ae4e4d1d12d59a99717a24f2540b5.png',
      name: 'ETH',
      primaryAmount: '98.16',
      secondaryAmount: '0.03 ETH',
    },
  ];

  const NFTs = [
    {
      image:
        'https://res.cloudinary.com/coin-nft/image/upload/c_limit,q_auto,w_569/f_auto/v1/cache/1/d6/df/d6df1e0fef7f68d2eaf4754f4e773bb33a050ce8878d518b8d3806b6d5df436e-NjZiNjBiZmQtOTNhMC00NTcwLWIwZWItNDk5ZWY0MGMwM2Fm',
      description: 'Superlative Famous Society',
    },
    {
      image:
        'https://res.cloudinary.com/coin-nft/image/upload/c_limit,q_auto,w_569/f_auto/v1/cache/1/d6/df/d6df1e0fef7f68d2eaf4754f4e773bb33a050ce8878d518b8d3806b6d5df436e-NjZiNjBiZmQtOTNhMC00NTcwLWIwZWItNDk5ZWY0MGMwM2Fm',
      description: 'Superlative Famous Society',
    },
    {
      image:
        'https://res.cloudinary.com/coin-nft/image/upload/c_limit,q_auto,w_569/f_auto/v1/cache/1/d6/df/d6df1e0fef7f68d2eaf4754f4e773bb33a050ce8878d518b8d3806b6d5df436e-NjZiNjBiZmQtOTNhMC00NTcwLWIwZWItNDk5ZWY0MGMwM2Fm',
      description: 'Superlative Famous Society',
    },
    {
      image:
        'https://res.cloudinary.com/coin-nft/image/upload/c_limit,q_auto,w_569/f_auto/v1/cache/1/d6/df/d6df1e0fef7f68d2eaf4754f4e773bb33a050ce8878d518b8d3806b6d5df436e-NjZiNjBiZmQtOTNhMC00NTcwLWIwZWItNDk5ZWY0MGMwM2Fm',
      description: 'Superlative Famous Society',
    },
    {
      image:
        'https://res.cloudinary.com/coin-nft/image/upload/c_limit,q_auto,w_569/f_auto/v1/cache/1/d6/df/d6df1e0fef7f68d2eaf4754f4e773bb33a050ce8878d518b8d3806b6d5df436e-NjZiNjBiZmQtOTNhMC00NTcwLWIwZWItNDk5ZWY0MGMwM2Fm',
      description: 'Superlative Famous Society',
    },
  ];

  const recentActivity = [
    {
      action: 'subscribe',
      name: 'Gnome Research',
      id: '0x1234...5678',
    },
    {
      action: 'receive',
      name: 'Old MOnkey',
      id: '0x1234...5678',
    },
  ];

  return (
    <div className='text-white font-roboto '>
      <div className='flex flex-col px-5 mt-4'>
        <TilteInfo title='Total balance on Ethereum' />
        <div className='text-2xl font-bold'>$972.69</div>
      </div>
      <div className='mt-6'>
        <TilteInfo className='px-5' title='Top holdings' />
        {holdings.map(holding => {
          return (
            <div
              key={holding?.name}
              className='py-4 px-4 mx-2 flex justify-between items-center font-bold mb-2 hover:bg-slate-950 rounded-lg cursor-pointer '
            >
              <div className='flex items-center justify-center'>
                <img
                  className='w-9 h-9 rounded-full block'
                  src={holding?.image}
                  alt='Rounded avatar'
                />
                <div className='ml-3 text-lg'>{holding?.name}</div>
              </div>
              <div className='flex flex-col text-right'>
                <div>${holding?.primaryAmount}</div>
                <div className='text-gray-500'>{holding?.secondaryAmount}</div>
              </div>
            </div>
          );
        })}
        <div className=' text-blue-700 px-5 mb-6 font-semibold mt-4 cursor-pointer'>
          See more
        </div>
      </div>
      <div className='mt-8'>
        <TilteInfo title='NFTs' className='px-5' />
        <CardGrid data={NFTs} />
        <div className=' text-blue-700 px-5 mb-6 font-semibold mt-4 cursor-pointer'>
          See more
        </div>
      </div>
      <div className='mt-8'>
        <TilteInfo title='Recent Activity' className='px-5 mb-2' />

        <RecentActivity data={recentActivity} />

        <div className=' text-blue-700 px-5 mb-6 font-semibold mt-4 cursor-pointer'>
          See more
        </div>
      </div>
    </div>
  );
}

export default Profile;
