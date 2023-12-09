import React, { useState, useEffect } from 'react'
import { getImages } from '../../services/DropsServices';

const Drops = () => {
  const [imagedATA, setimagedATA] = useState()
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const cardsPerRow = 3;
  const renderCards = () => {
    const rows = [];
    const totalCards = data.length;
    const emptyCards = (cardsPerRow - (totalCards % cardsPerRow)) % cardsPerRow;

    for (let i = 0; i < totalCards + emptyCards; i += cardsPerRow) {
      const rowCards = Array.from({ length: cardsPerRow }, (_, index) => {
        const dataIndex = i + index;
        const isCardExist = dataIndex < totalCards;

        return (
          <div
            key={dataIndex}
            className={`flex-1 w-60 border border-gray-200 rounded-lg shadow dark:border-gray-700 m-2 bg-opacity-0 ${isCardExist ? '' : 'invisible'
              }`}
          >
            {isCardExist && (
              <>
                <div className="w-60 border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-opacity-0">
                  <a href="/explore/details">
                    <img
                      className="rounded-t-lg w-full"
                      src="https://ipfs.io/ipfs/Qma76p9sd2SkmKYVKYfDVvGrM6agwLot1hgeeEUpzi9ksP"
                      alt=""
                    />
                  </a>
                  <div className="p-3 flex flex-col gap-0">
                    <h5 className="text-md  tracking-tight text-gray-900 dark:text-white bg-opacity-0">
                      ON FIRE
                    </h5>
                    <p className=' text-blue-400 text-sm '>0XbhGrimme</p>
                  </div>
                </div>
              </>


            )}
          </div>
        );
      });

      rows.push(
        <div key={i} className="flex mb-2">
          {rowCards}
        </div>
      );
    }

    return rows;
  };
  const fetchData = () => {
    const imgdata = getImages();
    setimagedATA(imgdata)
  }
  useEffect(() => {
    fetchData()
  }, [])

  console.log("image data is", imagedATA)
  return (
    <div className='h-full bg-black w-full '>
      <p className='mb-2'>Latest Drops</p>
      <div className='flex flex-col'>{renderCards()}</div>
    </div>
  )
}

export default Drops
