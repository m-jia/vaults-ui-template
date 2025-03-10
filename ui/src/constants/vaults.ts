import { SpotMarketConfig } from "@drift-labs/sdk";
import { SPOT_MARKETS_LOOKUP } from "./environment";

// these configs are hardcoded instead of fetching from the VaultAccount to save on RPC calls, since they are fixed on vault inception
export type UiVaultConfig = {
  name: string;
  vaultPubkeyString: string;
  managerPubkeyString: string;
  userPubKeyString: string;
  description: string;
  market: SpotMarketConfig;
  /**
   * If the main spot market of the vault is not USDC, but the vault's strategy is to focus on the notional growth,
   * then set this flag to true to ensure the relevant UI calculations are calculated accordingly.
   */
  isNotionalGrowthStrategy: boolean;
};

const TEST_VAULT_1: UiVaultConfig = {
  name: "YouZongTestVault1",
  vaultPubkeyString: "DK1t6NqwF5XvD33ZENpAUTVwdVwFvduJuaCfLEfkBnou",
  managerPubkeyString: "82EKgy8xkdf4PYxUaamzxtkKiocf6BrCv5qFWrHjErRs",
  userPubKeyString: "9AhG9szMSespM1du9PvEm9gA9ND6uytaU8kAHbaCiym5",
  description:
    "YouZong Test Vault 1",
  market: SPOT_MARKETS_LOOKUP[0],
  isNotionalGrowthStrategy: false,
};

// const TEST_VAULT_2: UiVaultConfig = {
//   name: "JLPTradersRekt",
//   vaultPubkeyString: "2r81MPMDjGSrbmGRwzDg6aqhe3t3vbKcrYfpes5bXckS",
//   managerPubkeyString: "C77bxLHWjnAVeG9HdMxu1gunFnjRCcWUDZYfa7xbacHr",
//   userPubKeyString: "2dBBq7SADmVMJTcZeSN4hQM4NbyVRAwfcJqMiv3Kx5wf",
//   description: "JLP Traders Rekt",
//   market: SPOT_MARKETS_LOOKUP[0],
//   isNotionalGrowthStrategy: false,
// };

export const VAULTS = [TEST_VAULT_1];//, TEST_VAULT_2
