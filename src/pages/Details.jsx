import React,{useState} from 'react';
import Nav from '../components/nav/Nav';
import NFTList from '../components/details/NFTList';
import Investors from '../components/details/Investors';

const Details = () => {
    const [activeTab, setActiveTab] = useState('nft');
    return (
        <>
            <Nav />
            <div className="h-screen bg-black w-full flex justify-center gap-4 mt-24">
                <div className="w-1/3 mt-4 h-auto bg-gray-800 rounded-lg shadow p-4 flex flex-col text-white relative gap-36 bg-opacity-0">
                    <div className='h-24'>
                        <div className="hidden md:block w-full h-24 filter blur-lg">
                            <img className="object-cover w-full h-36" src="https://profile.coinbase.com/images/default_avatars/Frame-12.svg" alt="" />
                        </div>
                        <img className="object-cover w-32 h-32 border-2 border-black-700 absolute " src="https://profile.coinbase.com/images/default_avatars/Frame-12.svg" alt="" />
                    </div>

                    <div>
                        <h5 className="text-3xl font-bold mb-2">Noteworthy technology acquisitio</h5>
                        <button className="bg-grey-500 bg-gray-800 border border-gray-200 w-full text-white py-2 px-4 rounded-md mb-4 bg-opacity-0">Invest Now</button>
                        <div className="bg-gray-700 border border-gray-600 rounded-lg shadow p-4">
                            <p className="text-gray-300">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </div>

                </div>
                <div className="w-1/3 h-auto mt-4 bg-gray-800 rounded-lg shadow p-4 flex flex-col text-white relative gap-4 bg-opacity-0">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('nft')}
                            className={`text-white py-2 px-4 border-b-2 border-transparent focus:outline-none hover:border-blue-500 ${activeTab === 'nft' ? 'border-blue-500' : ''}`}
                        >
                            NFT List
                        </button>
                        <button
                            onClick={() => setActiveTab('investor')}
                            className={`text-white py-2 px-4 border-b-2 border-transparent focus:outline-none hover:border-blue-500 ${activeTab === 'investor' ? 'border-blue-500' : ''}`}
                        >
                            Investors
                        </button>
                    </div>
                    <div className="mt-4">
                        {activeTab === 'nft' ? <NFTList /> : <Investors />}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;
