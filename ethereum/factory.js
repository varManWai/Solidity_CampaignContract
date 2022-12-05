import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x79F5298D53Bd9cEF8A3E2E89A443D16abe5e4037"
);

export default instance;