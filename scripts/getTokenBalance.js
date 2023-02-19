const { ethers } = require("ethers");

const contract = require("../artifacts/contracts/GreenPipeline.sol/GreenPipeline.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);
const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

async function getTokenBalance(address, abi) {
    console.log("Getting token balance...");
    const greenPipelineContract = new ethers.Contract(
        address ?? process.env.PIPELINE_ADDRESS,
        abi ?? contract.abi,
        signer
    );
    
    const balance = await greenPipelineContract.getBalance();
    console.log("Balance: " + balance);
    
    console.log("Done!");
}

getTokenBalance().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
