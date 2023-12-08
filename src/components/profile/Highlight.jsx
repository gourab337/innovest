function Highlight({ profile }) {
  return (
    <div className='flex items-center '>
      <img
        className='w-9 h-9 rounded-full block'
        src={profile?.image}
        alt='Rounded avatar'
      />
      <div className='ml-3 flex flex-col'>
        <div className='font-lato text-gray-200 font-bold text-lg'>
          {profile?.name}
        </div>
        <div className='font-lato text-gray-300 font-semibold text-sm'>
          {profile?.ens}
        </div>
      </div>
    </div>
  );
}

export default Highlight;
