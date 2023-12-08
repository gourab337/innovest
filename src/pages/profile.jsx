import TilteInfo from '../utils/TilteInfo';

function NFT({ image, description, ens }) {
  return (
    <div>
      <img src={image} alt='nft' className='h-24 w-24 rounded-md mb-2' />
      <p className='text-xl'>{description || ens || 'dummy.eth'}</p>
    </div>
  );
}

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
      <div>
        <TilteInfo title='NFTs' className='px-5' />
      </div>
    </div>
  );
}

export default Profile;
