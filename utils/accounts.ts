// Saddle's Multisig address that owns various contracts
// List of signers can be found here: https://docs.saddle.finance/faq#who-controls-saddles-admin-keys

import { CHAIN_ID } from "./network"

export const MULTISIG_ADDRESSES = {
  // Hardhat's default account
  [CHAIN_ID.HARDHAT]: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  // Ropsten test account
  [CHAIN_ID.ROPSTEN]: "0xc4b5B4a43f39cD6e99cc85Fa0672dFa3c1c721AD",
  // https://app.safe.global/eth:0x3F8E527aF4e0c6e763e8f368AC679c44C45626aE/home
  [CHAIN_ID.MAINNET]: "0x3F8E527aF4e0c6e763e8f368AC679c44C45626aE",
  // https://app.safe.global/arb1:0x8e6e84DDab9d13A17806d34B097102605454D147/home
  [CHAIN_ID.ARBITRUM_MAINNET]: "0x8e6e84DDab9d13A17806d34B097102605454D147",
  // https://app.safe.global/oeth:0x91804c72076aDd9fAB49b2c1e1A61A7503199599/home
  [CHAIN_ID.OPTIMISM_MAINNET]: "0x91804c72076aDd9fAB49b2c1e1A61A7503199599",
  // https://safe.fantom.network/#/safes/0xa70b1d5956DAb595E47a1Be7dE8FaA504851D3c5
  [CHAIN_ID.FANTOM_MAINNET]: "0xa70b1d5956DAb595E47a1Be7dE8FaA504851D3c5",
  // test EOA
  [CHAIN_ID.EVMOS_TESTNET]: "0xc4b5B4a43f39cD6e99cc85Fa0672dFa3c1c721AD",
  // https://safe.evmos.org/evmos:0x25e73a609751E3289EAE21A6Dae431ff1E6fE261/home
  [CHAIN_ID.EVMOS_MAINNET]: "0x25e73a609751E3289EAE21A6Dae431ff1E6fE261",
  // https://app.safe.global/aurora:0x4e76a78Fd1Fb0811a0A9092275A32c04e346d000/home
  [CHAIN_ID.AURORA_MAINNET]: "0x4e76a78Fd1Fb0811a0A9092275A32c04e346d000",
}

// 2/3 multisig for operational ownerships
export const OPS_MULTISIG_ADDRESSES = {
  // Hardhat's default account
  [CHAIN_ID.HARDHAT]: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  [CHAIN_ID.MAINNET]: "0x4802CedbDF865382dbaED8D5e41a65C8AB840676",
  [CHAIN_ID.ARBITRUM_MAINNET]: "0x6d9b26C25993358dCa0ABE9BF6A26Ddb18583200",
  [CHAIN_ID.OPTIMISM_MAINNET]: "0x55F51A0DF2714F3CcA7acBcd9d3552A66FF5953B",
  [CHAIN_ID.FANTOM_MAINNET]: "0x4802CedbDF865382dbaED8D5e41a65C8AB840676",
  [CHAIN_ID.EVMOS_MAINNET]: "0x8A0BB6E3456008195219Bf71E1Bb6E37b909c153",
  [CHAIN_ID.AURORA_MAINNET]: "0xeae45E6958C2808a4C8b8bC2f3E8E99d2c65b734",
}

export const FRAX_MULTISIG_ADDRESSES = {
  [CHAIN_ID.MAINNET]: "0xB1748C79709f4Ba2Dd82834B8c82D4a505003f27",
}

export const PROD_DEPLOYER_ADDRESS =
  "0x79374b795259CEa3Df5E5D10b9F7e0d85cf7B9e2"

export const PROD_CROSS_CHAIN_DEPLOYER_ADDRESS =
  "0x979B44CFc7a9B54BED8a3C4FD674B09c194219fD"

// https://docs.multichain.org/developer-guide/anycall/anycall-v6/how-to-integrate-anycall-v6
export const ANYCALL_ADDRESS = "0xC10Ef9F491C9B59f936957026020C321651ac078"

export const fUSDC_Reward_Manager_Address =
  "0x64285A547a12c462aaAE2faCB1198B03FF1107d3"
