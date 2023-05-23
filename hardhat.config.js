require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  paths: {
    artifacts: './src/artifacts'
  },
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: 'https://eth-goerli.g.alchemy.com/v2/h0Ygh2mmy8uycUWJQh2U5H43UQSrnnIC',
      accounts: ['321a6b61452d4d2a6fe2696d744458c75c26296a157213a4b7afc2007e1c1a0a']
    }
  }
};


//部署地址：0xd02d12b55a6cde5d259facabd8a842129269b30f