

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GreenTrust = await ethers.getContractFactory("GreenTrust");
  const greenTrust = await GreenTrust.deploy();
   
  console.log("GreenTrust address:", greenTrust.address);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })