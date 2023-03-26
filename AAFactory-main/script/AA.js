const { ethers } = require("ethers");
const { Provider, zksync, Wallet } = require("zksync-web3");
const { Deployer } = require("@matterlabs/hardhat-zksync-deploy");

const ercAbi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  // Authenticated Functions
  "function transfer(address to, uint amount) returns (bool)",
  "function deposit() public payable",
  "function approve(address spender, uint256 amount) returns (bool)",
];

const WETH_ADDRESS = "0x20b28B1e4665FFf290650586ad76E977EAb90c5D";
const DAI_ADDRESS = "0x3e7676937A7E96CFB7616f255b9AD9FF47363D4b";
const DAI_DECIMALS = 18;
const POOL_ADDRESS = "0xe52940eDDa6ec5FDabef7C33B9C1E1d613BbA144"; // ETH/DAI
const VAULT_CONTRACT_ADDRESS = "0x4Ff94F499E1E69D687f3C3cE2CE93E717a0769F8";
const ROUTER_ADDRESS = "0xB3b7fCbb8Db37bC6f572634299A58f51622A847e";
const POOLFACTORY_ADDRESS = "0xf2FD2bc2fBC12842aAb6FbB8b1159a6a83E72006"; // Classic
const ADDRESS_ZERO = ethers.constants.AddressZero;

async function main() {
  const PRIVATE_KEY = process.env.PRIVATE_KEY;
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  const wallet = new Wallet(PRIVATE_KEY, provider);
  const deployer = new Deployer(hre, wallet);

  // Initialise contract instance

  const factoryArtifact = await deployer.loadArtifact("AAFactory");
  const aaArtifact = await deployer.loadArtifact("Account");
  const AAFactoryAddress = "0x8cf5e1FC6A4BC4DFB920CF9b6E77Af910614A290";

  const aaFactory = new ethers.Contract(
    AAFactoryAddress,
    factoryArtifact.abi,
    wallet
  );
  const salt = ethers.constants.HashZero;
  /*   const owner = new Wallet(
    "0xe90da2c062d82c3702173457e77e37bfda31c4a7f9a6df3cbd9b096b3aa4a566",
    provider
  ); */

  const tx = await aaFactory.deployAccount(salt, wallet.address, {
    gasLimit: 1000000,
  });

  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
