const hre = require("hardhat");

async function main() {
  console.log("íº€ AINEON PRODUCTION DEPLOYMENT INITIATED...");
  
  // Get deployer
  const [deployer] = await hre.ethers.getSigners();
  console.log("í±¤ DEPLOYING WITH:", deployer.address);
  
  // Deploy MultiSig Wallet
  console.log("í´ DEPLOYING MULTI-SIG WALLET...");
  const owners = [
    process.env.BOSS_WALLET || deployer.address,
    process.env.ARCHITECT_WALLET || deployer.address,
    process.env.SAFE_1 || deployer.address
  ];
  const required = 2;
  
  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
  const multiSig = await MultiSigWallet.deploy(owners, required);
  await multiSig.deployed();
  console.log("âœ… MULTI-SIG DEPLOYED:", multiSig.address);
  
  console.log("í¾¯ AINEON PRODUCTION INFRASTRUCTURE READY!");
  console.log("ï¿½ï¿½ NEXT: Fund MultiSig and activate trading");
  console.log("í³Š Monitor: https://ai-neon-live-flash-loan.onrender.com");
}

main().catch((error) => {
  console.error("DEPLOYMENT ERROR:", error);
  process.exitCode = 1;
});
