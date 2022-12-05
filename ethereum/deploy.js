const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const provider = new HDWalletProvider(process.env.NME, process.env.INFURA);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[2]);

  // console.log(accounts);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[2] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
