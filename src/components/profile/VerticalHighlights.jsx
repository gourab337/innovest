const VerticalCard = ({ profile }) => {
  return (
    <div className='flex items-center p-4 bg-gray-800 rounded-md transition duration-300 hover:bg-gray-700'>
      <img
        className='w-16 h-16 rounded-full block'
        src={profile?.image}
        alt='Rounded avatar'
      />
      <div className='ml-4 flex flex-col'>
        <div className='font-lato text-gray-200 font-bold text-lg'>
          {profile?.name}
        </div>
        <div className='font-lato text-gray-300 font-semibold text-sm'>
          {profile?.ens}
        </div>
      </div>
    </div>
  );
};

const VerticalCardList = () => {
  const profiles = [
    {
      image: 'https://profile.coinbase.com/images/default_avatars/Frame-12.svg',
      name: 'pratik pakhale',
      ens: 'pratz.eth',
    },
    {
      image: 'https://profile.coinbase.com/images/default_avatars/Frame-13.svg',
      name: 'gourab chakraborty',
      ens: 'wealthybrains.eth',
    },
    {
      image: 'https://profile.coinbase.com/images/default_avatars/Frame-12.svg',
      name: 'pratik pakhale',
      ens: 'pratz.eth',
    },
    {
      image: 'https://profile.coinbase.com/images/default_avatars/Frame-13.svg',
      name: 'gourab chakraborty',
      ens: 'wealthybrains.eth',
    },
    {
      image: 'https://profile.coinbase.com/images/default_avatars/Frame-12.svg',
      name: 'pratik pakhale',
      ens: 'pratz.eth',
    },
    {
      image: 'https://profile.coinbase.com/images/default_avatars/Frame-13.svg',
      name: 'gourab chakraborty',
      ens: 'wealthybrains.eth',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {profiles.map((profile, index) => (
        <VerticalCard key={index} profile={profile} />
      ))}
    </div>
  );
};

export default VerticalCardList;
