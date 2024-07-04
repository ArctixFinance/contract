import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { CHAIN_ID } from "../../utils/network"

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getChainId, network } = hre
  const { get, log } = deployments
  const network_deployments = await deployments.all()

  // for (const deployment in network_deployments) {
  if (
    (await getChainId()) === CHAIN_ID.BASE_SEPOLIA &&
    network.name !== "hardhat"
  ) {
    try {
      await hre.run("etherscan-verify", {
        network: "base_sepolia",
        apiKey: process.env.ETHERSCAN_API,
        // libraries: {
        //   SwapUtilsV2: (await get("SwapUtilsV2")).address,
        //   AmplificationUtilsV2: (await get("AmplificationUtilsV2")).address,
        // },
      })
    } catch (e) {
      log(e)
    }
  } else {
    log(
      `Skipping verification since this is not running on ${CHAIN_ID.BASE_SEPOLIA}`,
    )
  }
}
// }
export default func
func.tags = ["VerfiyContracts"]

// func.skip = async (env) => true
