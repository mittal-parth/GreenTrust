const API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/GreenTrust.sol/GreenTrust.json");
const farmer = require("./data/farmer.json");
const crops = require("./data/crops.json");
const farms = require("./data/farms.json");

const provider = new ethers.providers.AlchemyProvider(network = "goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const greenTrustContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {

    console.log("Adding dummy data...");

    // Register farmer
    try {
        const tx = await greenTrustContract.registerFarmer(farmer["profile"], farmer["idCards"]);
        await tx.wait();
    } catch (error) {
        console.log(error);
    }

    // Add all farms
    for (let i = 0; i < farms.length; i++) {
        const farm = farms[i];
        const tx = await greenTrustContract.addFarm(farm["size"], farm["latitude"], farm["longitude"], farm["location"], farm["documents"]);
        await tx.wait();
    }

    // Add all crops
    for (let i = 0; i < crops.length; i++) {
        const crop = crops[i];
        const tx = await greenTrustContract.addCrop(crop["details"], crop["farmId"]);
        await tx.wait();
    }

    console.log("Done!");

    // call fetchFarmerProfile
    const message = await greenTrustContract.fetchFarmerProfile();
    console.log(message);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
