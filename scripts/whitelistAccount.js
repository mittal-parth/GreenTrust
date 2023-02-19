const { ethers } = require("ethers");

const contract = require("../artifacts/contracts/GreenPipeline.sol/GreenPipeline.json");

const provider = new ethers.providers.JsonRpcProvider(process.env.POLYGON_URL);
const signer = new ethers.Wallet(process.env.GOERLI_PRIVATE_KEY, provider);

async function whitelistAccounts(address, abi) {
  const accounts = ["0x58698E9cA974d2EE09d2BB9449381bE9372B3A82"];
  console.log("Whitelisting accounts...");
  const greenPipelineContract = new ethers.Contract(
    address ?? process.env.PIPELINE_ADDRESS,
    abi ?? contract.abi,
    signer
  );

  accounts.forEach(async (account) => {
    console.log("Whitelisting: " + account);
    const tx = await greenPipelineContract.whitelistAccount(account);
    await tx.wait();
  });

  console.log("Done!");
}

whitelistAccounts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
