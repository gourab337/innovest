import { useContext } from 'react';
import React from 'react';
import { authContext } from '../../store/Auth';

const Drops = () => {
  const { data } = useContext(authContext);
  const dropsData = data?.drops;
  const cardsPerRow = 3;

  const renderCards = () => {
    const rows = [];
    const totalCards = dropsData?.length;
    const emptyCards = (cardsPerRow - (totalCards % cardsPerRow)) % cardsPerRow;

    for (let i = 0; i < totalCards + emptyCards; i += cardsPerRow) {
      const rowCards = Array.from({ length: cardsPerRow }, (_, index) => {
        const dataIndex = i + index;
        const isCardExist = dataIndex < totalCards;
        const cardData = isCardExist ? dropsData[dataIndex] : null;

        return (
          <div
            key={dataIndex}
            className={`flex-1 w-60 border border-gray-200 rounded-lg shadow dark:border-gray-700 m-2 bg-opacity-0 ${
              isCardExist ? '' : 'invisible'
            }`}
          >
            {isCardExist && (
              <>
                <div className="w-60 border border-gray-200 rounded-lg shadow dark:border-gray-700 bg-opacity-0">
                    <img
                      className="rounded-t-lg w-60 h-40"
                      src={cardData.imgUrl}  
                      alt=""
                    />
                  <div className="p-3 flex flex-col gap-0">
                    <h5 className="text-md  tracking-tight text-gray-900 dark:text-white bg-opacity-0">
                      {cardData.name}
                    </h5>
                    <p className="text-green-400 text-sm ">{cardData.projectOwner}</p>
                    <div className='flex flex-row justify-between text-gray-600'>
                    <p className=" text-sm ">{cardData.date}</p>
                    <p className=" text-sm ">{cardData.noOfOwner}</p>
                    </div>
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

  return (
    <div className="h-full bg-black w-full ">
      <div className="flex flex-col">{renderCards()}</div>
    </div>
  );
};

export default Drops;
