

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GreenTrustFarmer = await ethers.getContractFactory("GreenTrustFarmer");
  const greenTrustFarmer = await GreenTrustFarmer.deploy();
  const GreenTrustConsumer = await ethers.getContractFactory("GreenTrustConsumer");
  const greenTrustConsumer = await GreenTrustConsumer.deploy();
  const GreenTrustVerifier = await ethers.getContractFactory("GreenTrustVerifier");
  const greenTrustVerifier = await GreenTrustVerifier.deploy();
  const GreenTrust = await ethers.getContractFactory("GreenTrust");
  const greenTrust = await GreenTrust.deploy();
   
  console.log("GreenTrustFarmer address:", greenTrustFarmer.address);
  console.log("GreenTrustConsumer address:", greenTrustConsumer.address);
  console.log("GreenTrustVerifier address:", greenTrustVerifier.address);
  console.log("GreenTrust address:", greenTrust);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })