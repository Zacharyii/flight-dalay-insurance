import './App.css';
import './index.css';
import AdminPage from './pages/AdminPage';
import WalletConnectButton from './components/WalletConnectButton';
import { useEthers } from '@usedapp/core';
import FlightCompanyPage from './pages/FlightCompanyPage';
import UserPage from './pages/UserPage';

const App = () => {

  const { account } = useEthers();

  const ownerAddress = '0x0dae840A4bf822897957f9BcDf767c96164BEf84';
  const garudaIndonesiaAddress = '0x0dae840A4bf822897957f9BcDf767c96164BEf84';

  return (
    <div className="text-white">
      <div className="flex justify-end mt-5 mx-10">
        <WalletConnectButton/>
      </div>
      {account === ownerAddress && <AdminPage/>}
      {account === garudaIndonesiaAddress && <FlightCompanyPage/>}
      {account !== ownerAddress && account !==garudaIndonesiaAddress && account && <UserPage/>}
      {!account && (
        <div className="flex justify-center">
          <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl text-center m-20 w-max">
            <h1 className="text-center font-bold text-xl">连接你的钱包来使用软件!</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
