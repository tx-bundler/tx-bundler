require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config()

module.exports = {
	solidity: "0.8.9",
	networks: {
		hardhat: {},
		OPT_GOERLI: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://opt-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		OPT_MAINNET: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://opt-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	}
}