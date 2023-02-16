const os = require("os");
const fs = require('fs');

const hre = require('hardhat');

const { mockData } = require('./mockData');

function setEnvValue(key, value) {
  const ENV_FILE = '.env'

  // read file from hdd & split if from a linebreak to a array
  const ENV_VARS = fs.readFileSync(ENV_FILE, "utf8").split(os.EOL);

  // find the env we want based on the key
  const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
    return line.match(new RegExp(key));
  }));

  // replace the key/value with the new value
  ENV_VARS.splice(target, 1, `${key}=${value}`);

  // write everything back to the file system
  fs.writeFileSync(ENV_FILE, ENV_VARS.join(os.EOL));

}

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GreenTrust = await hre.ethers.getContractFactory("GreenTrust");
  const greenTrust = await GreenTrust.deploy();

  console.log(`GreenTrust deployed at ${greenTrust.address}`);
  try {
    await mockData();
  } catch (err) {
    console.log(err);
  }

  setEnvValue('CONTRACT_ADDRESS', greenTrust.address);

  const abi = require('../artifacts/contracts/GreenTrust.sol/GreenTrust.json').abi;

  fs.writeFileSync("greentrust/src/abi/GreenTrust.json", JSON.stringify(abi), 'utf8', (err) => {
    console.log(err);
  });

  const config = fs.readFileSync('greentrust/src/config.js', 'utf-8');
  const updatedConfig = `${config.split('\n')[0]}\nexport const CONTRACT_ADDRESS = "${greentrust.address}";\n`

  fs.writeFileSync("greentrust/src/config.js", updatedConfig, 'utf8', (err) => {
    console.log(err);
  });
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })