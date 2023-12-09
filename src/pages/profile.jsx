import TilteInfo from '../utils/TilteInfo';
import { FaArrowCircleDown, FaChessKing, FaStarHalfAlt } from 'react-icons/fa';
import { useCallback, useContext, useState, useEffect } from 'react';

import { useGetTokenBalances } from '@airstack/airstack-react';

import { authContext } from '../store/Auth';

const CardGrid = ({ data }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  return (
    <div className='grid grid-cols-3 gap-2'>
      {data?.map((item, index) => (
        <div key={index} className=' p-4 rounded-md'>
          <img
            src={item?.image_original_url}
            alt='nft'
            className='h-36 w-36 rounded-md mb-2 hover:shadow-md cursor-pointer'
          />
          <p className='text-white font-bold font-lato'>
            {truncateText(item.description || item.name || 'dummy.eth', 16)}
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
  // const { token } = useContext(authContext);
  let token = '0x0d3204BEf84C6A65D2A88A274Dd787D3faD2cdF1';

  const [fetchBalances, { data: balances, loading, pagination }] =
    useGetTokenBalances({
      identitity: token,
      tokenType: ['ERC20', 'ERC721', 'ERC1155'],
      blockchain: 'ethereum',
      limit: 200,
    });

  const [holdings, setHoldings] = useState([]);
  const [NFTs, setNFTs] = useState([]);
  const [total, setTotal] = useState(0);

  const dividers = {
    ETH: 18,
    USDC: 6,
    USDT: 6,
    DAI: 18,
    WBTC: 8,
    WETH: 18,
    UNI: 18,
    AAVE: 18,
  };

  const loadNFTs = useCallback(async () => {
    const res = await fetch(
      `http://localhost:3000/?url=https://api.1inch.dev/nft/v1/byaddress?chainIds=${
        import.meta.env.VITE_APP_CHAINID
      }&address=${token}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const data = await res.json();

    console.log(data);
    console.log(authContext.data);

    if (data.assets) {
      setNFTs(data.assets);
    }
  }, []);

  const loadHoldings = useCallback(async () => {
    const res = await fetch(
      'http://localhost:3000/?url=https://api.1inch.dev/balance/v1.2/1/balances/' +
        token,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    const data = await res.json();
    console.log(data);
    const valuedData = {};
    for (const addr in data) {
      if (data[addr] > 0) {
        valuedData[addr] = data[addr];
      }
    }

    console.log(valuedData);
    const topHolds = [];

    for (const addr in valuedData) {
      await new Promise(r => setTimeout(r, 2000));
      const res = await fetch(
        `http://localhost:3000/?url=https://api.1inch.dev/token/v1.2/1/custom/${addr}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      const data = await res.json();
      topHolds.push({
        ...data,
        rate: valuedData[addr],
      });
    }

    topHolds.forEach(hold => {
      if (dividers[hold.symbol]) {
        hold.rate = hold.rate / 10 ** dividers[hold.symbol];
      }
    });
    console.log(topHolds);

    setHoldings(topHolds);
    return topHolds;
  }, []);

  const loadTotal = useCallback(async holdings => {
    console.log(holdings);
    holdings.forEach(async hold => {
      await new Promise(r => setTimeout(r, 5000));
      const res = await fetch(
        `http://localhost:3000/?url=https://api.1inch.dev/price/v1.1/1/${hold.address}?currency=USD`
      );

      const data = await res.json();
      const value = data[hold.address] * hold.rate;
      console.log(value, data, Date.now());
      if (isNaN(value)) return;
      setTotal(total + value);
    });
  }, []);

  const loadData = useCallback(async () => {
    const holds = await loadHoldings();
    await new Promise(r => setTimeout(r, 2000));

    await loadNFTs();
    await new Promise(r => setTimeout(r, 2000));

    await loadTotal(holds);

    const { data, error } = await fetchBalances(balances, loading, pagination);
    console.log(data, error);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const recentActivity = [
    {
      action: 'subscribe',
      name: 'Gnome Research',
      id: '0x1234.asdasnd678',
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
        <div className='text-2xl font-bold'>${total}</div>
      </div>
      <div className='mt-6'>
        <TilteInfo className='px-5' title='Top holdings' />
        {holdings.map(holding => {
          return (
            <div
              key={holding?.symbol}
              className='py-4 px-4 mx-2 flex justify-between items-center font-bold mb-2 hover:bg-slate-950 rounded-lg cursor-pointer '
            >
              <div className='flex items-center justify-center'>
                <img
                  className='w-9 h-9 rounded-full block'
                  src={holding?.logoURI}
                  alt='Rounded avatar'
                />
                <div className='ml-3 text-lg'>{holding?.name}</div>
              </div>
              <div className='flex flex-col text-right'>
                <div>${holding?.rate}</div>
                <div className='text-gray-500'>Rating {holding?.rating}</div>
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
