const hre = require("hardhat");

async function main() {
  const FlightDelayInsurance = await hre.ethers.getContractFactory("FlightDelayInsurance");
  const flightDelayInsurance = await FlightDelayInsurance.deploy();

  await flightDelayInsurance.deployed();

  console.log("航班延误险 is deployed to :", flightDelayInsurance.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
