const hre = require("hardhat");

async function main() {
  console.log("� AINEON PRODUCTION DEPLOYMENT INITIATED...");
  
  // Get deployer
  const [deployer] = await hre.ethers.getSigners();
  console.log("� DEPLOYING WITH:", deployer.address);
  
  // Deploy MultiSig Wallet
  console.log("� DEPLOYING MULTI-SIG WALLET...");
  const owners = [
    process.env.BOSS_WALLET || deployer.address,
    process.env.ARCHITECT_WALLET || deployer.address,
    process.env.SAFE_1 || deployer.address
  ];
  const required = 2;
  
  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
  const multiSig = await MultiSigWallet.deploy(owners, required);
  await multiSig.deployed();
  console.log("✅ MULTI-SIG DEPLOYED:", multiSig.address);
  
  console.log("� AINEON PRODUCTION INFRASTRUCTURE READY!");
  console.log("�� NEXT: Fund MultiSig and activate trading");
  console.log("� Monitor: https://ai-neon-live-flash-loan.onrender.com");
}

main().catch((error) => {
  console.error("DEPLOYMENT ERROR:", error);
  process.exitCode = 1;
});
