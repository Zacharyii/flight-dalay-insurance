import { useEthers } from "@usedapp/core";

const WalletConnectButton = () => {
    const { activateBrowserWallet, account, deactivate } = useEthers();

    return account ? (
        <div className="flex bg-gray-800 p-3 rounded-xl">
            <button onClick={deactivate} className="bg-indigo-800 hover:bg-indigo-900 p-3 rounded-xl mr-3">断开钱包</button>
            <h1 className="text-white bg-indigo-800 p-3 rounded-xl">欢迎你, {account}</h1>
        </div>
    ) : (
        <button className="p-3 bg-indigo-800 text-white text-sm rounded-xl hover:bg-indigo-900" onClick={() => {activateBrowserWallet()}}>连接钱包</button>
    )
}

export default WalletConnectButton;