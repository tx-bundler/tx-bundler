import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import React, { FC, useState } from "react";
import { ethers } from "ethers";
import { IEthereumProvider } from "@argent/login-react";
import { ChakraProvider } from '@chakra-ui/react'

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
	mainnet,
	zkSync,
	zkSyncTestnet,
	goerli,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import MainLayout from "../layout/mainLayout";
import dynamic from "next/dynamic";


const ArgentLoginButton = dynamic(
	() => import('@argent/login-react').then((mod) => mod.ArgentLoginButton),
	{ ssr: false }
);

const { chains, provider } = configureChains(
	[
		mainnet,
		zkSync,
		zkSyncTestnet,
		goerli,
	],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: "zkSync TX Bundler",
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
});

export { WagmiConfig, RainbowKitProvider };
function MyApp({ Component, pageProps }: any) {
	const [provider, setProvider] = useState<ethers.providers.Web3Provider>();

	const handleConnect = async (ethereumProvider: IEthereumProvider) => {
		const provider = new ethers.providers.Web3Provider(ethereumProvider);
		setProvider(provider);
	};

	const handleDisconnect = async () => {
		localStorage.removeItem("walletconnect"); // to make sure WC is disconnected
		setProvider(undefined);
	};
	return (
		<ChakraProvider>
			{/* <ArgentLoginButton
				options={{
					chainId: 280,
					rpcUrl: "https://zksync2-testnet.zksync.dev",
				}}
				onConnect={handleConnect}
				onError={console.error}
			/> */}
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider
					modalSize="compact"
					initialChain={process.env.NEXT_PUBLIC_DEFAULT_CHAIN}
					chains={chains}
				>
					
					<MainLayout>
						<Component {...pageProps} />
					</MainLayout>
				</RainbowKitProvider>
			</WagmiConfig>
		</ChakraProvider>
	);
}

export default MyApp;
