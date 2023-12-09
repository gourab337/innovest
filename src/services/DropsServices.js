import axios from 'axios'

const pinataApiKey = '47edf02e32c2175ba30e';
const pinataSecretApiKey = 'f885b7a0ea4caa6b15520d7d6166cad23356246c3744afced6327baf5ebb8919';
const imageCid = 'QmX5kj64LR3KSrQXYbwvhr4Mw9ZMrRzGMNkpetvW9tiZ96';

const url = `https://gateway.pinata.cloud/ipfs/${imageCid}`;
export const getImages=(()=>{
    axios.get(url, {
        headers: {
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey,
        }
      })
      .then(response => {
        const imageUrl = response.data;
        return imageUrl
       
      })
      .catch(error => {
        console.error(error);
      });
})
