import { useContractFunction, useContractCall } from "@usedapp/core";
import ContractABI from '../artifacts/contracts/FlightDelayInsurance.sol/FlightDelayInsurance.json';
import { utils } from 'ethers';
import { Contract } from '@ethersproject/contracts';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {

    const depositAmount = useRef();
    const withdrawAmount = useRef();
    const airlineAddress = useRef();
    const airlineName = useRef();

    const [functionName, setFunctionName] = useState('');

    const contractInterface = new utils.Interface(ContractABI.abi);
    const contractAddress = '0xd02d12b55a6cde5d259facabd8a842129269b30f';   //合约地址
    const contract = new Contract(contractAddress, contractInterface);

    const {state, send} = useContractFunction(contract, functionName);

    const depositLiquidity = () => {
        depositAmount.current.value ? setFunctionName('depositEther') : toast.error("请填入正确的ether数量!");
    }

    const withdrawLiquidity = () => {
        withdrawAmount.current.value ? setFunctionName('withdrawEther') : toast.error("请填入正确的ether数量!")
    }

    const registerAirline = () =>{
        if(!utils.isAddress(airlineAddress.current.value)){
            toast.error("地址无效!");
        } else if(!airlineName.current.value) {
            toast.error("地址无效!")
        }else{
            setFunctionName('registerAirline');
        }
    }

    useEffect(() => {
        if(functionName === 'depositEther'){
            send({value: utils.parseEther(depositAmount.current.value)});
            setFunctionName('');
        } else if(functionName === 'withdrawEther'){
            send(utils.parseEther(withdrawAmount.current.value));
            setFunctionName('');
        } else if(functionName === 'registerAirline'){
            send(airlineAddress.current.value, airlineName.current.value);
            setFunctionName('');
        }
    }, [functionName, send])

    useEffect(() => {
        if(state.errorMessage){
            toast.error(state.errorMessage);
        }
    }, [state])

    const contractBalance = useContractCall({
        abi: contractInterface,
        address: contractAddress,
        method: 'getContractBalance'
    })

    const lockedContractBalance = useContractCall({
        abi: contractInterface,
        address: contractAddress,
        method: 'lockedBalance'
    })
    
    return (
        <div className="grid grid-cols-3 gap-4 mt-5 mx-10">
            {/* 添加流动性 */}
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl text-center">
                <h1 className="text-center font-bold text-xl">添加流动性</h1>
                <input placeholder="ETH" ref={depositAmount} type="number" min="0" step="0.01" className="text-black border w-4/5 rounded-xl focus:outline-none focus:border-indigo-500 mt-8 text-center py-1 px-3" />
                <div className="text-center mt-8">
                    <button onClick={depositLiquidity} className="py-2 px-3 bg-indigo-800 rounded-md text-white text-md hover:bg-indigo-900">添加</button>
                </div>
            </div>

            {/* 移除流动性 */}
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl text-center">
                <h1 className="text-center font-bold text-xl">移除流动性</h1>
                <input ref={withdrawAmount} placeholder="ETH" type="number" min="0" step="0.01" className="text-black border w-4/5 rounded-xl focus:outline-none focus:border-indigo-500 mt-8 text-center py-1 px-3" />
                <div className="text-center mt-8">
                    <button onClick={withdrawLiquidity} className="py-2 px-3 bg-indigo-800 rounded-md text-white text-md hover:bg-indigo-900">移除</button>
                </div>
            </div>

            {/* contract status */}
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl text-center">
                <h1 className="text-center font-bold text-xl mb-5">合约余额状态</h1>
                <div className="bg-gray-700 rounded-lg w-max p-3 mt-5 m-auto">
                    <h1 className="text-md">剩余合约余额 : {parseFloat(contractBalance / Math.pow(10, 18))} ETH</h1>
                </div>
                <div className="bg-gray-700 rounded-lg w-max p-3 mt-5 m-auto">
                    <h1 className="text-md">锁定合约余额 : {parseFloat(lockedContractBalance / Math.pow(10, 18))} ETH</h1>
                </div>
            </div>

            {/* Register Airline */}
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-3">
                <h1 className="text-center font-bold text-3xl">注册航空公司</h1>
                {/* input airline name */}
                <div className="mt-5">
                    <label htmlFor="name" className="text-xl mr-5 inline-block text-right w-1/5">航空公司名称</label>
                    <input ref={airlineName} name="name" type="text" className="text-black border w-3/5 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                {/* input airline address */}
                <div className="mt-5">
                    <label htmlFor="address" className="text-xl mr-5 inline-block text-right w-1/5">航空公司地址（钱包地址）</label>
                    <input ref={airlineAddress} name="address" type="text" className="text-black border w-3/5 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>  
                {/* submit button */}
                <div className="mt-10 text-center">
                    <button onClick={registerAirline} className="py-2 px-3 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900">提交</button>
                </div>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    );
}

export default AdminPage;