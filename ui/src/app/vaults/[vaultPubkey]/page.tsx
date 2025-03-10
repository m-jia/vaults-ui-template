"use client";

import { useVault } from "@/hooks/useVault";
import { getUiVaultConfig } from "@/lib/utils";
import { use, useState } from "react";
import { VaultPerformance } from "../(components)/VaultPerformance";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { UserPerformance } from "../(components)/UserPerformance";
import { VaultDepositWithdrawForm } from "../(components)/VaultDepositWithdrawForm";
import { PerformanceBreakdownStat } from "../(components)/PerformanceBreakdownStat";

type ContentTab = "VaultPerformance" | "UserPerformance" | "Overview";

const CONTENT_TAB_OPTIONS: { value: ContentTab; label: string }[] = [
  {
    value: "VaultPerformance",
    label: "Vault Performance",
  },
  {
    value: "UserPerformance",
    label: "Your Performance",
  },
];

export default function VaultPage(props: {
  params: Promise<{
    vaultPubkey: string;
  }>;
}) {
  const params = use(props.params);
  const vaultPubkey = params.vaultPubkey;
  const uiVaultConfig = getUiVaultConfig(vaultPubkey);

  const [activeTab, setActiveTab] = useState<ContentTab>(
    CONTENT_TAB_OPTIONS[0].value,
  );

  const {
    vaultAccountData,
    vaultAccount,
    vaultDepositorAccountData,
    isVaultDepositorLoaded,
    syncVaultStats,
  } = useVault(vaultPubkey);
  console.log('vxx_page_load:', [vaultAccountData, vaultAccount, vaultDepositorAccountData]);

  if (!uiVaultConfig || !vaultAccountData) {
    return <div>Vault not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{uiVaultConfig?.name}</h1>
      <p>Vault Pubkey: {vaultPubkey}</p>
      <p>Description: {uiVaultConfig?.description}</p>

      <div className="flex mt-4">
        <ToggleGroup
          type="single"
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as ContentTab)}
        >
          {CONTENT_TAB_OPTIONS.map((option) => (
            <ToggleGroupItem key={option.value} value={option.value}>
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex w-full gap-6 mt-4">
        {activeTab === "VaultPerformance" && (
          <VaultPerformance uiVaultConfig={uiVaultConfig} />
        )}
        {activeTab === "UserPerformance" && vaultDepositorAccountData && (
          <UserPerformance
            depositAssetConfig={uiVaultConfig.market}
            vaultPubkey={vaultPubkey}
            vaultAccountData={vaultAccountData}
            vaultDepositorAccountData={vaultDepositorAccountData}
            isVaultDepositorLoaded={isVaultDepositorLoaded}
          />
        )}
        <VaultDepositWithdrawForm
          uiVaultConfig={uiVaultConfig}
          vaultDepositorAccountData={vaultDepositorAccountData}
          isVaultDepositorLoaded={isVaultDepositorLoaded}
          vaultAccountData={vaultAccountData}
          syncVaultStats={syncVaultStats}
        />
      </div>
      <h1 className="text-2xl font-bold">Vault Account Data</h1>
      <div className="flex w-full gap-6 mt-4">
        <div className="flex flex-col flex-1 gap-2 sm:pr-4">
          <PerformanceBreakdownStat label="Manager Pubkey" value={`${vaultAccountData?.manager.toBase58()}`} />
          <PerformanceBreakdownStat label="Delegate Pubkey" value={`${vaultAccountData?.delegate.toBase58()}`} />
          <PerformanceBreakdownStat label="Liquidation Delegate Pubkey" value={`${vaultAccountData?.liquidationDelegate.toBase58()}`} />
          <PerformanceBreakdownStat label="User Pubkey" value={`${vaultAccountData?.user.toBase58()}`} />
          <PerformanceBreakdownStat label="User Stats Pubkey" value={`${vaultAccountData?.userStats.toBase58()}`} />
          <PerformanceBreakdownStat label="Token Account Pubkey" value={`${vaultAccountData?.tokenAccount.toBase58()}`} />
          <PerformanceBreakdownStat label="Init Timestamp" value={`${(new Date(vaultAccountData?.initTs.toNumber() * 1000)).toString()}`} />
          <PerformanceBreakdownStat label="Last Fee Update Timestamp" value={`${(new Date(vaultAccountData?.lastFeeUpdateTs.toNumber() * 1000)).toString()}`} />
          <PerformanceBreakdownStat label="Liquidation Start Timestamp" value={`${(new Date(vaultAccountData?.liquidationStartTs.toNumber() * 1000)).toString()}`} />
          <PerformanceBreakdownStat label="Spot Market Index" value={`${vaultAccountData?.spotMarketIndex.toString()} ${uiVaultConfig.market.symbol}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Max Tokens" value={`${(vaultAccountData?.maxTokens.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Min Deposit Amount" value={`${(vaultAccountData?.minDepositAmount.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Redeem Period" value={`${vaultAccountData?.redeemPeriod.toString()}`} />
          <PerformanceBreakdownStat label="Management Fee" value={`${(vaultAccountData?.managementFee.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} />
          <PerformanceBreakdownStat label="Profit Share" value={`${(vaultAccountData?.profitShare / uiVaultConfig.market.precision.toNumber()).toString()}`} />
          <PerformanceBreakdownStat label="Permissioned?" value={`${vaultAccountData?.permissioned.toString()}`} />
          <PerformanceBreakdownStat label="Vault Protocol?" value={`${vaultAccountData?.vaultProtocol.toString()}`} />

          <PerformanceBreakdownStat label="Bump" value={`${vaultAccountData?.bump.toString()}`} />
          <PerformanceBreakdownStat label="Hurdle Rate" value={`${vaultAccountData?.hurdleRate.toString()}`} />

          <PerformanceBreakdownStat label="Total Shares" value={`${(vaultAccountData?.totalShares.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="User Shares" value={`${(vaultAccountData?.userShares.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />

          <PerformanceBreakdownStat label="Net Deposits" value={`${(vaultAccountData?.netDeposits.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Share Base" value={`${vaultAccountData?.sharesBase.toString()}`} />
          <PerformanceBreakdownStat label="Total Deposits" value={`${(vaultAccountData?.totalDeposits.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Total Withdraws" value={`${(vaultAccountData?.totalWithdraws.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Total Withdraw Requested" value={`${(vaultAccountData?.totalWithdrawRequested.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Manager Net Deposits" value={`${(vaultAccountData?.managerNetDeposits.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Manager Total Deposits" value={`${(vaultAccountData?.managerTotalDeposits.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Manager Total Withdraws" value={`${(vaultAccountData?.managerTotalWithdraws.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Manager Total Fee" value={`${(vaultAccountData?.managerTotalFee.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} marketSymbol={uiVaultConfig.market.symbol} />
          <PerformanceBreakdownStat label="Manager Total Profit Share" value={`${(vaultAccountData?.managerTotalProfitShare.toNumber() / uiVaultConfig.market.precision.toNumber()).toString()}`} />
          <p>Last Manager Withdraw Request:</p>
          <PerformanceBreakdownStat label="" value={`${vaultAccountData?.lastManagerWithdrawRequest.shares.toString()}`} />
          <PerformanceBreakdownStat label="" value={`${vaultAccountData?.lastManagerWithdrawRequest.ts.toString()}`} />
          <PerformanceBreakdownStat label="" value={`${vaultAccountData?.lastManagerWithdrawRequest.value.toString()}`} />
        </div>
      </div>
    </div>
  );
}
