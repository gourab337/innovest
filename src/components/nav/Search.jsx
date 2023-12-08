function Search() {
  return (
    <div className='relative bg-black border-2 py-3 w-1/4 border-gray-600 rounded-full'>
      <div className='absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none bg-transparent '>
        <svg
          className='w-4 h-4 text-white font-bold'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 20 20'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={3}
            d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
          />
        </svg>
      </div>
      <input
        type='search'
        id='default-search'
        className='block w-full px-8 ps-12 text-base text-gray-400 font-bold focus:outline-none bg-transparent '
        placeholder='Search...'
        autoComplete='off'
        required
      />
    </div>
  );
}

export default Search;
