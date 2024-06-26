import "@nomicfoundation/hardhat-toolbox"
// import "@nomiclabs/hardhat-vyper"
import "hardhat-deploy"
import "hardhat-spdx-license-identifier"
import "hardhat-tracer"

import dotenv from "dotenv"
import { HardhatUserConfig } from "hardhat/config"
import "./tasks"
import {
  MULTISIG_ADDRESSES,
  PROD_CROSS_CHAIN_DEPLOYER_ADDRESS,
  PROD_DEPLOYER_ADDRESS,
} from "./utils/accounts"
import { ALCHEMY_BASE_URL, CHAIN_ID } from "./utils/network"

dotenv.config()

// Array of private keys to be used as signers
// When running with mainnet networks, the first account will be used as the deployer by default
const accountsToUse = []

// Use the private key from the .env file if available
let deployerAccount = PROD_DEPLOYER_ADDRESS
if (process.env.DEPLOYER_PRIVATE_KEY) {
  accountsToUse.push(process.env.DEPLOYER_PRIVATE_KEY)
  deployerAccount = `privatekey://${process.env.DEPLOYER_PRIVATE_KEY}`
}

let crossChainDeployerAccount = PROD_CROSS_CHAIN_DEPLOYER_ADDRESS
if (process.env.CROSS_CHAIN_DEPLOYER_PRIVATE_KEY) {
  accountsToUse.push(process.env.CROSS_CHAIN_DEPLOYER_PRIVATE_KEY)
  crossChainDeployerAccount = `privatekey://${process.env.CROSS_CHAIN_DEPLOYER_PRIVATE_KEY}`
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      deploy: ["./deploy/hardhat/"],
      autoImpersonate: true,
    },
    base_sepolia: {
      url: ALCHEMY_BASE_URL[CHAIN_ID.BASE_SEPOLIA] + process.env.ALCHEMY_API_KEY,
      chainId: parseInt(CHAIN_ID.BASE_SEPOLIA),
      deploy: ["./deploy/base_sepolia/"],
      verify: {
        etherscan: {
          apiUrl: "https://api.etherscan.io",
          apiKey: process.env.ETHERSCAN_API ?? "NO_KEY",
        },
      },
    },    
  },
  paths: {
    sources: "./contracts",
    artifacts: "./build/artifacts",
    cache: "./build/cache",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
      {
        version: "0.8.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
      {
        version: "0.6.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
      {
        version: "0.5.16",
      },
    ],
    overrides: {
      "contracts/helper/Multicall3.sol": {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000000,
          },
        },
      },
    },
  },
  vyper: {
    compilers: [
      { version: "0.2.12" },
      { version: "0.2.16" },
      { version: "0.2.15" },
      { version: "0.2.7" },
      { version: "0.3.1" },
      { version: "0.3.2" },
    ],
  },
  typechain: {
    outDir: "./build/typechain/",
    target: "ethers-v5",
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 21,
    enabled: process.env.REPORT_GAS ? true : false,
  },
  mocha: {
    timeout: 200000,
  },
  namedAccounts: {
    deployer: {
      default: deployerAccount,
    },
    crossChainDeployer: {
      default: crossChainDeployerAccount,
    },
    libraryDeployer: {
      default: 1, // use a different account for deploying libraries on the hardhat network
      1: 0, // use the same address as the main deployer on mainnet
      42161: 0, // use the same address on arbitrum mainnet
      10: 0, // use the same address on optimism mainnet
      250: 0, // use the same address on fantom mainnet
      9000: 0, // use the same address on evmos testnet
      9001: 0, // use the same address on evmos mainnnet
      2221: 0, // use the same address on kava testnet
      2222: 0, // use the same address on kava testnet
      3: 0, // use the same address on ropsten
      1313161554: 0, // use the same address on aurora mainnet
      84531: 0, // use the same address on base testnet
    },
    multisig: {
      default: 0,
      1: MULTISIG_ADDRESSES[1],
      42161: MULTISIG_ADDRESSES[42161],
      10: MULTISIG_ADDRESSES[10],
      250: MULTISIG_ADDRESSES[250],
      1313161554: MULTISIG_ADDRESSES[1313161554],
      9001: MULTISIG_ADDRESSES[9001],
    },
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },

  etherscan: {
    apiKey: {
      base_testnet: process.env.ETHERSCAN_API ?? "NO_KEY",
    },
    customChains: [
      {
        network: "base_testnet",
        chainId: 84531,
        urls: {
          apiURL: "https://api-goerli.basescan.org/api",
          browserURL: "https://goerli.basescan.org/",
        },
      },
    ],
  },
}

// If we have any private keys, use them for mainnet networks as default signers
if (accountsToUse.length > 0 && config.networks) {
  for (const network of Object.keys(config.networks)) {
    // if network name includes "mainnet", change the accounts
    if (network.includes("mainnet")) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      config.networks[network]!.accounts = accountsToUse
    }
  }
}

export default config
