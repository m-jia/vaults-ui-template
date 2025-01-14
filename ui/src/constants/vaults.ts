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
  name: "test-vault-1",
  vaultPubkeyString: "8v831M6mXQjyAVXEqcAdXYhp5Z3sYoz7pw9EBU2oEUZL",
  managerPubkeyString: "9qJW4iQ425Bz9DRHTRBtXUs4cd68XTJoFYN9xmF9my7n",
  userPubKeyString: "FooNUVA6cw3itPX6AsNeqcect1koowEjMipKq6tgYmcX",
  description:
    "Multiply your yields with delta-neutral market making strategies focused on SOL",
  market: SPOT_MARKETS_LOOKUP[0],
  isNotionalGrowthStrategy: false,
};

const TEST_VAULT_2: UiVaultConfig = {
  name: "my new vault 2",
  vaultPubkeyString: "CB4u8FfQEY6jjs8sMGkqLCYXtAFQvf1n81cRqxJJ9pL3",
  managerPubkeyString: "9qJW4iQ425Bz9DRHTRBtXUs4cd68XTJoFYN9xmF9my7n",
  userPubKeyString: "6jLu4FyCQnp13nAAKdubnmbdnj4qLJb8fKgEwKrB4mPU",
  description:
    "Multiply your yields with delta-neutral market making & innovative strategies on SOL/BTC/ETH/JUP",
  market: SPOT_MARKETS_LOOKUP[0],
  isNotionalGrowthStrategy: true,
};

export const VAULTS = [TEST_VAULT_1, TEST_VAULT_2];
