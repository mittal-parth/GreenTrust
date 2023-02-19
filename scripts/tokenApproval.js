const hre = require("hardhat")
const { Framework } = require("@superfluid-finance/sdk-core")
const { ethers } = require("hardhat")
require("dotenv").config()
const GreenPipelineABI =
    require("../artifacts/contracts/GreenPipeline.sol/GreenPipeline.json").abi

//to run this script:
//1) Make sure you've created your own .env file
//2) Make sure that you have your network and accounts specified in hardhat.config.js
//3) Make sure that you add the address of your own money router contract
//4) Make sure that you change the 'amount' field in the moneyRouterApproval operation to reflect the proper amount
//3) run: npx hardhat run scripts/tokenApproval.js --network goerli
async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    //NOTE - make sure you add the address of the previously deployed money router contract on your network
    const greenPipelineAddress = process.env.PIPELINE_ADDRESS

    const provider = new hre.ethers.providers.JsonRpcProvider(
        process.env.POLYGON_URL
    )

    const sf = await Framework.create({
        chainId: (await provider.getNetwork()).chainId,
        provider
    })

    const signers = await hre.ethers.getSigners()

    const greenPipeline = new ethers.Contract(
        greenPipelineAddress,
        GreenPipelineABI,
        provider
    )

    const maticx = await sf.loadSuperToken("MATICx")

    //approve contract to spend 1000 daix
    const moneyRouterApproval = maticx.approve({
        receiver: greenPipeline.address,
        amount: ethers.utils.parseEther("1000")
    })

    await moneyRouterApproval.exec(signers[0]).then(function (tx) {
        console.log(`
        Congrats! You've just successfully approved the money router contract. 
        Tx Hash: ${tx.hash}
    `)
    })
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
    console.error(error)
    process.exitCode = 1
})