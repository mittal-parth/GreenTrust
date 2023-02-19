const hre = require("hardhat");
const { Framework } = require("@superfluid-finance/sdk-core");
const { ethers } = require("hardhat");
require("dotenv").config();
const GreenPipelineABI = require("../artifacts/contracts/GreenPipeline.sol/GreenPipeline.json").abi;


//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network and accounts specified in hardhat.config.js
//3) Make sure that you add the address of your own money router contract
//4) Make sure that you change the params in the createFlowIntoContract function to reflect the proper values
//3) run: npx hardhat run scripts/createFlowIntoContract.js --network goerli
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  //NOTE - make sure you add the address of the previously deployed money router contract on your network
  const greenPipelineAddress = process.env.PIPELINE_ADDRESS;
  const provider = new hre.ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);
  const signers = await hre.ethers.getSigners();

  const greenPipeline = new ethers.Contract(greenPipelineAddress, GreenPipelineABI, provider);

  
  //call money router create flow into contract method from signers[0] 
  //this flow rate is ~1000 tokens/month
  await greenPipeline.connect(signers[0]).createFlowIntoContract("10").then(function (tx) {
    console.log(`
        Congrats! You just successfully created a flow into the green trust pipeline contract. 
        Tx Hash: ${tx.hash}
    `)
  })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});