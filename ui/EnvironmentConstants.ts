export interface RpcEndpoint {
	label: string;
	value: string;
	wsValue?: string;
	allowAdditionalConnection: boolean;
}

export const EnvironmentConstants = {
	rpcs: {
		dev: [
			{
				label: 'Helius',
				value: 'https://devnet.helius-rpc.com/?api-key=8daaf374-65e3-4771-b408-e8c01fbb6f5b',
				wsValue: 'wss://devnet.helius-rpc.com/?api-key=8daaf374-65e3-4771-b408-e8c01fbb6f5b',
				allowAdditionalConnection: true,
			},
			{
				label: 'RPC Pool',
				value:
					'https://drift-drift-a827.devnet.rpcpool.com/3639271b-6f0e-47c6-a643-1aaa0e498f58',
				wsValue:
					'wss://drift-drift-a827.devnet.rpcpool.com/3639271b-6f0e-47c6-a643-1aaa0e498f58/whirligig',
				allowAdditionalConnection: false,
			},
		] as RpcEndpoint[],
		mainnet: [
			{
				label: 'Helius ViXii',
				value: 'https://mainnet.helius-rpc.com/?api-key=3a5c8675-72bf-4096-a7d9-9ad25698bfa4',
				wsValue: 'wss://mainnet.helius-rpc.com/?api-key=8daaf374-65e3-4771-b408-e8c01fbb6f5b',
				allowAdditionalConnection: true,
			},
			{
				label: 'Helius 1',
				value: 'https://morna-skm1k6-fast-mainnet.helius-rpc.com/',
				wsValue: 'wss://morna-skm1k6-fast-mainnet.helius-rpc.com/',
				allowAdditionalConnection: true,
			},
		] as RpcEndpoint[],
	},
	historyServerUrl: {
		dev: 'https://master.api.drift.trade',
		mainnet: 'https://mainnet-beta.api.drift.trade',
		staging: 'https://staging.api.drift.trade',
	},
	dlobServerHttpUrl: {
		dev: 'https://master.dlob.drift.trade',
		mainnet: 'https://dlob.drift.trade',
		staging: 'https://staging.dlob.drift.trade',
	},
	dlobServerWsUrl: {
		dev: 'wss://master.dlob.drift.trade/ws',
		mainnet: 'wss://dlob.drift.trade/ws',
		staging: 'wss://staging.dlob.drift.trade/ws',
	},
	eventsServerUrl: {
		mainnet: 'wss://events.drift.trade/ws',
		staging: 'wss://events.drift.trade/ws',
	},
	swiftServerUrl: {
		mainnet: 'https://swift.drift.trade',
		staging: 'https://master.swift.drift.trade',
	},
};
