const { ethers } = require("ethers");

const contract = require("../artifacts/contracts/GreenPipeline.sol/GreenPipeline.json");
const ida = require("./data/ida.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);
const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

async function testIDA(address, abi) {
  console.log("Testing IDA...");
  const greenPipelineContract = new ethers.Contract(
    address ?? process.env.PIPELINE_ADDRESS,
    abi ?? contract.abi,
    signer
  );

  console.log("Getting balance...");
  let balance = await greenPipelineContract.getBalance();
  console.log("Balance: " + balance);

    // Call addStakeholder
    console.log("Adding stakeholders...");

      for (let i = 0; i < ida["addresses"].length; i++) {
          const tx = await greenPipelineContract.addStakeholder(
              ida["cropId"],
              ida["addresses"][i],
              Math.floor(Date.now() / 1000)
          );
          await tx.wait();
      }

  // Call checNumStakeholderss
  console.log("Checking number of crop rewards...");
  const numStakeholders = await greenPipelineContract.numCropRewards();
  console.log("Number of crop rewards: " + numStakeholders);

//   // Distribute rewards
//   console.log("Distributing rewards...");
//   const tx2 = await greenPipelineContract.distributeRewards();
//   await tx2.wait();

  //   Fetch crop reward
  console.log("Fetching crop reward...");
  const cropReward = await greenPipelineContract.cropRewards(numStakeholders);
  console.log("Crop reward: " + cropReward);

  console.log("Getting balance...");
  balance = await greenPipelineContract.getBalance();
  console.log("Balance: " + balance);

  console.log("Done!");
}

testIDA().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
