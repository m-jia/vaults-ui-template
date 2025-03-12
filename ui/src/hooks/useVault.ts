import { PublicKey } from "@solana/web3.js";
import { useSubscribedVault } from "./useSubscribedVault";
import { useSubscribedVaultDepositor } from "./useSubscribedVaultDepositor";
import {
  getSingleVaultStats,
  useVaultsApyReturnsLookup,
} from "./useSyncVaultsStats";
import { useCallback, useEffect } from "react";
import {
  useCommonDriftStore,
  useDriftClientIsReady,
  useOraclePriceStore,
} from "@drift-labs/react";
import useAppStore from "@/stores/app/useAppStore";
import { MarketId } from "@drift/common";
import { MarketType } from "@drift-labs/sdk";
import { getUiVaultConfig } from "@/lib/utils";

export const useVault = (vaultPubkey: string) => {
  const uiVaultConfig = getUiVaultConfig(vaultPubkey);

  const driftClient = useCommonDriftStore((s) => s.driftClient.client);
  const driftClientIsReady = useDriftClientIsReady();
  const vaultClient = useAppStore((s) => s.vaultClient);
  const setAppStore = useAppStore((s) => s.set);
  const getOraclePriceForMarket = useOraclePriceStore(
    (s) => s.getMarketPriceData,
  );

  const oraclePriceData = getOraclePriceForMarket(
    new MarketId(uiVaultConfig?.market.marketIndex ?? 0, MarketType.SPOT),
  );
  const memoizedOraclePriceGetter = useCallback(
    (_marketId: MarketId) => oraclePriceData,
    [oraclePriceData?.priceData.price],
  );

  const apyReturnsLookup = useVaultsApyReturnsLookup();
  const { vaultAccountData, vaultAccount } = useSubscribedVault(vaultPubkey);
  const { vaultDepositorAccountData, isLoaded: isVaultDepositorLoaded } =
    useSubscribedVaultDepositor(vaultPubkey);

  const syncVaultStats = useCallback(async () => {
    if (
      vaultPubkey &&
      driftClientIsReady &&
      driftClient &&
      vaultClient // && apyReturnsLookup[vaultPubkey]
    ) {
      const vaultStats = await getSingleVaultStats(
        driftClient,
        vaultClient,
        new PublicKey(vaultPubkey),
        apyReturnsLookup[vaultPubkey],
        memoizedOraclePriceGetter,
      );
      setAppStore((s) => {
        s.vaultsStats[vaultPubkey] = vaultStats;
      });
    } else {
      console.log('vx_syncVaultStats not ready', [vaultPubkey, driftClientIsReady, driftClient, vaultClient, apyReturnsLookup]);
    }
  }, [
    vaultPubkey,
    vaultClient,
    apyReturnsLookup[vaultPubkey],
    memoizedOraclePriceGetter,
    driftClientIsReady,
    driftClient,
  ]);

  useEffect(() => {
    syncVaultStats();
  }, [syncVaultStats]);

  return {
    vaultAccountData,
    vaultAccount,
    vaultDepositorAccountData,
    isVaultDepositorLoaded,
    syncVaultStats,
  };
};
