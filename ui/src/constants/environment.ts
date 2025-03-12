import { AppSetupProps } from "@drift-labs/react";
import { DriftEnv, Wallet, initialize, SpotMarkets, PerpMarkets, } from "@drift-labs/sdk";
import {
  Config as CommonConfig,
  EnvironmentConstants,
  Initialize as InitializeCommon,
} from "@drift/common";
import { Keypair } from "@solana/web3.js";

export const ARBITRARY_WALLET = new Wallet(new Keypair());

const driftEnv =
  process.env.NEXT_PUBLIC_DRIFT_ENV === "mainnet-beta"
    ? "mainnet-beta"
    : ("devnet" as DriftEnv);

initialize({ env: driftEnv });
InitializeCommon(driftEnv);

interface EnvironmentVariables extends AppSetupProps {
  driftEnv: DriftEnv;
  isDev: boolean | undefined;
  basePollingRateMs: number;
  rpcOverride: string | undefined;
}

const Env: EnvironmentVariables = {
  driftEnv,
  isDev:
    !process.env.NEXT_PUBLIC_DRIFT_ENV ||
    ["local", "master", "devnet"].includes(process.env.NEXT_PUBLIC_DRIFT_ENV),
  basePollingRateMs: process.env.NEXT_PUBLIC_BASE_POLLING_RATE_MS
    ? Number(process.env.NEXT_PUBLIC_BASE_POLLING_RATE_MS)
    : 1000,
  rpcOverride: process.env.NEXT_PUBLIC_RPC_OVERRIDE,
  priorityFeePollingMultiplier: 5,
  txSenderRetryInterval: 5000,
};

// VX modified at March 2025
const vxVaultSpotMarketConfigs = SpotMarkets[driftEnv].filter((market) => [0, 1, 3, 4, 19].includes(market.marketIndex));
const vxVaultPerpMarketConfigs = PerpMarkets[driftEnv].filter((market) => [0, 1, 2].includes(market.marketIndex));

// Spot markets
export const SPOT_MARKETS_LOOKUP = vxVaultSpotMarketConfigs; // CommonConfig.spotMarketsLookup;

// Perp markets
export const PERP_MARKETS_LOOKUP = vxVaultPerpMarketConfigs; //CommonConfig.perpMarketsLookup;

export default Env;
