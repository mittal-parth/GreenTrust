const { ethers } = require('ethers');

const contract = require("../artifacts/contracts/GreenTrust.sol/GreenTrust.json");
const farmer = require("./data/farmer.json");
const crops = require("./data/crops.json");
const farms = require("./data/farms.json");
const sensors = require("./data/sensors.json");
const sensorData = require("./data/sensorData.json");

const API_KEY = process.env.ALCHEMY_API_KEY;
const PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.AlchemyProvider(network = "goerli", API_KEY);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

async function mockData(address, abi) {
    console.log("Adding mock data...");
    const greenTrustContract = new ethers.Contract(address  ?? CONTRACT_ADDRESS, abi ?? contract.abi, signer);

    // Register farmer
    console.log("Registering farmer...")
    try {
        const tx = await greenTrustContract.registerFarmer(JSON.stringify(farmer["profile"]), farmer["idCards"]);
        await tx.wait();
    } catch (error) {
        console.log(error);
        const tx = await greenTrustContract.updateFarmerProfile(JSON.stringify(farmer["profile"]), farmer["idCards"]);
        await tx.wait();
    }

    // Add all farms
    console.log("Adding farms...")
    for (let i = 0; i < farms.length; i++) {
        const farm = farms[i];
        // add name
        const tx = await greenTrustContract.addFarm(farm["size"], farm["name"], farm["latitude"], farm["longitude"], farm["location"], farm["documents"]);
        await tx.wait();
    }

    // Add all crops
    console.log("Adding crops...")
    for (let i = 0; i < crops.length; i++) {
        const crop = crops[i];
        const tx = await greenTrustContract.addCrop(JSON.stringify(crop["details"]), crop["farmId"], crop["stakeAmount"]);
        await tx.wait();
    }

    // Add sensor
    console.log("Adding sensors...")
    for (let i = 0; i < sensors.length; i++) {
        const sensor = sensors[i];
        const tx = await greenTrustContract.addSensor(sensor["cropId"], sensor["name"]);
        await tx.wait();
    }

    // Add sensor data
    console.log("Adding sensor data...")
    for (let i = 0; i < sensorData.length; i++) {
        const data = sensorData[i];
        const tx = await greenTrustContract.addSensorData(data["sensorId"], JSON.stringify(data["data"]));
        await tx.wait();
    }

    console.log("Done!");

    // Call fetchFarmerProfile
    const message = await greenTrustContract.fetchFarmerProfile();
    console.log(message);
}

// mockData()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });

module.exports = {
    mockData
}