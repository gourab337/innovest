import HighlightProfile from '../profile/Highlight';

import TitleInfo from '../../utils/TitleInfo';

function SidebarRight() {
  const popularProfiles = [
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
    <aside className='z-40 w-1/5 h-screen  bg-black  border-l border-gray-800 '>
      <div className='pl-6 pt-5 flex flex-col text-gray-300'>
        <TitleInfo title='Popular profiles' />
        <span className='mb-4'></span>
        {popularProfiles.map(profile => {
          return <HighlightProfile key={profile?.ens} profile={profile} />;
        })}
        <div className='flex items-center justify-start text-blue-700 font-roboto font-semibold mt-4 cursor-pointer'>
          Explore more
        </div>
      </div>
    </aside>
  );
}

export default SidebarRight;
