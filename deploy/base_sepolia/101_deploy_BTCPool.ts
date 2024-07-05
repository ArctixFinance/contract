import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre
  const { deploy, execute, get, log, read, save, getOrNull } = deployments
  const { deployer } = await getNamedAccounts()

  // Constructor arguments
  const TOKEN_ADDRESSES = [
    (await get("TBTC")).address,
    (await get("WBTC")).address,
    (await get("RENBTC")).address,
    (await get("SBTC")).address,
  ]
  const TOKEN_DECIMALS = [18, 8, 8, 18]
  const LP_TOKEN_NAME = "Saddle tBTC/WBTC/renBTC/sBTC"
  const LP_TOKEN_SYMBOL = "saddleTWRenSBTC"
  const INITIAL_A = 200
  const SWAP_FEE = 4e6 // 4bps
  const ADMIN_FEE = 0

  const poolDeployment = await getOrNull("SaddleBTCPool")
  if (poolDeployment) {
    log(`reusing SaddleBTCPool at ${poolDeployment.address}`)
  } else {
    await execute(
      "SwapFlashLoan",
      { from: deployer, log: true, waitConfirmations: 3 },
      "initialize",
      TOKEN_ADDRESSES,
      TOKEN_DECIMALS,
      LP_TOKEN_NAME,
      LP_TOKEN_SYMBOL,
      INITIAL_A,
      SWAP_FEE,
      ADMIN_FEE,
      (
        await get("LPToken")
      ).address,
    )

    await save("SaddleBTCPool", {
      abi: (await get("SwapFlashLoan")).abi,
      address: (await get("SwapFlashLoan")).address,
    })

    const lpTokenAddress = (await read("SaddleBTCPool", "swapStorage")).lpToken
    log(`BTC pool LP Token at ${lpTokenAddress}`)

    await save("SaddleBTCPoolLPToken", {
      abi: (await get("TBTC")).abi, // Generic ERC20 ABI
      address: lpTokenAddress,
    })
  }
}
export default func
func.tags = ["BTCPool"]
func.dependencies = ["SwapUtils", "SwapFlashLoan", "BTCPoolTokens"]
