import React from 'react';

const SuggestedProfiles = ({ data }) => {
  const LeaderboardData= data?.leaderboard
  const sortedLeaderboardData = LeaderboardData?.sort((a, b) => b.sponsorAmount - a.sponsorAmount);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-opacity-0">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-opacity-0">
        <tbody className='bg-opacaity-0'>
          {sortedLeaderboardData?.map((ele, index) => (
            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600 bg-opacity-0" key={index}>
              <td className="w-4 p-4 bg-opacity-0">
              </td>
              <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <img className="w-10 h-10 rounded-full" src={ele?.profilePicURL} alt="Jese image" />
                <div className="ps-3">
                <div>
                <div className="text-base font-semibold">{ele?.name}</div>
                <div className='font-normal text-gray-500'>
                {ele?.date}
                </div>
                </div>
                  <div className="font-normal text-gray-500">{ele?.email}</div>
                </div>
              </th>
              <td className="px-6 py-4">
                {ele?.role}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                   {ele?.sponsorAmount}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuggestedProfiles;
