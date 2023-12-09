import Nav from '../components/nav/Nav';


function Explore() {
  const data = [1, 2, 3, 4, 5, 6];
  const cardsPerRow = 4;
  const renderCards = () => {
    const rows = [];
    for (let i = 0; i < data.length; i += cardsPerRow) {
      const rowCards = data.slice(i, i + cardsPerRow).map((ele, index) => (
        <div
          key={i + index}
          className="flex-1 max-w-xs  border border-gray-200 rounded-lg shadow  dark:border-gray-700 m-2  bg-opacity-0"
        >
          <div className="max-w-sm  border border-gray-200 rounded-lg shadow  dark:border-gray-700  bg-opacity-0 ">
            <a href="#">
              <img className="rounded-t-lg w-full" src='https://profile.coinbase.com/images/default_avatars/Frame-12.svg' alt="" />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white  bg-opacity-0">Noteworthy technology acquisitions 2021</h5>
              </a>
              <div className='mb-24'>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400  bg-opacity-0">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
              </div>
              <a href="#" className='text-blue-700' >
                Read more
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ));

      rows.push(
        <div key={i} className="flex mb-2">
          {rowCards}
        </div>
      );
    }

    return rows;
  };

  return (
    <>
      <Nav />
      <div className="h-full bg-black w-full">
        <div className="px-4 py-5">
          <span className="text-white">Projects</span>
          <div className="flex flex-col ml-32 mr-24">{renderCards()}</div>
        </div>
      </div>
    </>
  );
}

export default Explore;
