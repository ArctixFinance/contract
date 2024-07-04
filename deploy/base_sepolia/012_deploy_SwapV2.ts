import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { ZERO_ADDRESS } from "../../test/testUtils"

// Deployment Names

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre
  const { deploy, get, getOrNull, log, read, save } = deployments
  const { deployer } = await getNamedAccounts()

  // Manually check if the pool is already deployed
  const poolContract = await getOrNull("SwapV2")

  // Check if has been initialized
  const isInitialized: boolean = poolContract
    ? (await read("SwapV2", "swapStorage")).lpToken !== ZERO_ADDRESS
    : false

  if (poolContract && isInitialized) {
    log(`reusing ${"SwapV2"} at ${poolContract.address}`)
  } else {
    await deploy("SwapV2", {
      from: deployer,
      log: true,
      contract: "SwapV2",
      skipIfAlreadyDeployed: true,
      libraries: {
        SwapUtilsV2: (await get("SwapUtilsV2")).address,
        AmplificationUtilsV2: (await get("AmplificationUtilsV2")).address,
      },
    })
  }
}
export default func
func.tags = ["SwapV2"]
func.dependencies = ["SwapUtilsV2"]
