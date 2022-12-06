import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x918b8Dd41AAE4e5bB441dfE18cd6d9c3A639c2Ab'
);

export default instance;