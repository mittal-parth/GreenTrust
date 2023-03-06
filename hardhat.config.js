require("@nomicfoundation/hardhat-toolbox");
require('hardhat-contract-sizer');
// The next line is part of the sample project, you don't need it in your
// project. It imports a Hardhat task definition, that can be used for
// testing the frontend.
require("./tasks/printAccounts");
require('dotenv').config({ path: './.env' })

const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY;
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200
          }
        }
      },
    ]
  },
  defaultNetwork: "goerli",
  networks: {
    hardhat: {
      chainId: 1337 // We set 1337 to make interacting with MetaMask simpler
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${GOERLI_PRIVATE_KEY}`]
    },
    mantle: {
        url: "https://rpc.testnet.mantle.xyz/",
        accounts: [`0x${GOERLI_PRIVATE_KEY}`],
        chainId: 5001
    },
    polygon: {
        url: "https://rpc-mumbai.maticvigil.com/",
        accounts: [`0x${GOERLI_PRIVATE_KEY}`],
        chainId: 80001
    },
    fantom: {
      url: "https://rpc.ankr.com/fantom_testnet/",
      accounts: [`0x${GOERLI_PRIVATE_KEY}`],
      chainId: 4002
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
    only: [],
  }
};
