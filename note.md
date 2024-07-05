


npx hardhat --network base_sepolia etherscan-verify --contract-name ArctixDummyPool --solc-input --write-post-data 


--libraries contracts/SwapUtilsV2.sol:SwapUtilsV2:0xE591BC24f8e3ae4d8E9cd90B3C4fd3B54A65d1B4 --libraries contracts/AmplificationUtilsV2.sol:AmplificationUtilsV2:0x7A77EfF99c33d18794dD06C3EF31C1919955Daa2 


#

hh deploy --tags BTCPoolTokens --network base_sepolia
hh deploy --tags BTCPool --network base_sepolia
hh deploy --tags BTCPool --network base_sepolia


# Chain Sepolia

84532



# BTC

BTC_SWAP_TOKEN_CONTRACT_ADDRESSES
0xC28DF698475dEC994BE00C9C9D8658A548e6304F

BTC_SWAP_ADDRESSES
0x4f6A43Ad7cba042606dECaCA730d4CE0A57ac62e


  "Saddle TBTC/WBTC/RENBTC/SBTC",

const TBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x8daebade922df735c38c80c7ebd708af50815faa",
  [ChainId.HARDHAT]: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
  [ChainId.BASE_SEPOLIA]: "",
}
export const TBTC = new Token(
  TBTC_CONTRACT_ADDRESSES,
  18,
  "TBTC",
  "tbtc",
  "tBTC",
  tbtcLogo,
)

const WBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
  [ChainId.HARDHAT]: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
  [ChainId.BASE_SEPOLIA]: "",
}
export const WBTC = new Token(
  WBTC_CONTRACT_ADDRESSES,
  8,
  "WBTC",
  "wrapped-bitcoin",
  "WBTC",
  wbtcLogo,
)

const RENBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xeb4c2781e4eba804ce9a9803c67d0893436bb27d",
  [ChainId.HARDHAT]: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
  [ChainId.BASE_SEPOLIA]: "",
}
export const RENBTC = new Token(
  RENBTC_CONTRACT_ADDRESSES,
  8,
  "RENBTC",
  "renbtc",
  "renBTC",
  renbtcLogo,
)

const SBTC_CONTRACT_ADDRESSES: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: "0xfe18be6b3bd88a2d2a7f928d00292e7a9963cfc6",
  [ChainId.HARDHAT]: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
  [ChainId.BASE_SEPOLIA]: "",
}
export const SBTC = new Token(
  SBTC_CONTRACT_ADDRESSES,
  18,
  "SBTC",
  "sbtc",
  "sBTC",
  sbtcLogo,
)
