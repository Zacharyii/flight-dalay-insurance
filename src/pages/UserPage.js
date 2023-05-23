import { useContractFunction } from "@usedapp/core";
import { utils } from 'ethers';
import { useEffect, useRef } from 'react';
import { Contract } from "@ethersproject/contracts";
import ContractABI from '../artifacts/contracts/FlightDelayInsurance.sol/FlightDelayInsurance.json';
import { Interface } from "@ethersproject/abi";
import { toast, ToastContainer } from "react-toastify";

const UserPage = () => {

    const flightID = useRef();
    const premiumPaid = useRef();

    const contractInterface = new Interface(ContractABI.abi);
    const contractAddress = '0x4ec57258BDCE96f3C4e5fe1b3f6f45e359be34f5';
    const contract = new Contract(contractAddress, contractInterface);

    const { state, send } = useContractFunction(contract, 'orderInsurance');

    const orderInsurance = () => {
        if(!flightID.current.value || !premiumPaid.current.value){
            toast.error("Please input the empty field!");
        } else {
            send(flightID.current.value, {value: utils.parseEther(premiumPaid.current.value)})
        }
    }

    useEffect(() => {
        if(state.errorMessage){
            toast.error(state.errorMessage);
        }
    }, [state])

    return (
        <div className="grid grid-cols-7 gap-4 mt-5 mx-10">
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-3">
                <h1 className="text-center font-bold text-xl">购买航班延误保险</h1>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/5">航班编号</label>
                    <input ref={flightID} name="flight_id" type="text" className="text-black border w-3/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="mt-5">
                    <label htmlFor="flight_id" className="text-xl mr-5 inline-block text-right w-1/5">保险费</label>
                    <input ref={premiumPaid} name="flight_id" placeholder="填写 0.01 - 0.06 ETH" type="number" min="0.01" max="0.06" step="0.01" className="text-black border w-3/4 rounded-xl focus:outline-none focus:border-indigo-500 mt-5 py-1 px-3"/>
                </div>
                <div className="text-center mt-10">
                    <button onClick={orderInsurance} className="py-2 px-8 bg-indigo-800 rounded-md text-white text-lg hover:bg-indigo-900">购买</button>
                </div>
            </div>
            <div className="bg-gray-800 p-8 rounded-3xl filter drop-shadow-xl col-span-4">
                <h1 className="text-center font-bold text-xl">保险详情和规则</h1>
                <ul className="list-inside list-decimal mt-5 p-5 bg-gray-900 rounded-xl">
                    <li>客户只能在智能合约中为注册航班购买保险</li>
                    <li>客户只能在延误至少45分钟或以上的情况下索赔保险</li>
                    <li>可接受的延误索赔原因：机械问题、恶劣天气状况和航班取消</li>
                    <li>客户只能支付 0.01 - 0.06 ETH 的保费</li>
                    <li>客户只能在航班起飞前12小时购买保险，以防止智能合约被利用</li>
                    <li>如果合约没有足够的流动性来支付客户，客户订单将恢复</li>
                    <li>索赔过程将是自动的，一旦满足保险条件，ETH将被发送到客户的钱包</li>
                    <li>索偿金额为客户已缴保费的3倍</li>
                </ul>
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
    )
}

export default UserPage;