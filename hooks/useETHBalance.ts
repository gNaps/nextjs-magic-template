import { useEffect, useState } from "react";
import { BigNumber } from "ethers";
import { useProvider } from "../context/AuthContext";
import { getETHBalance } from "../utils/balances";

const useETHBalance = (): [BigNumber, () => Promise<void>] => {
    const provider = useProvider();
    const [balance, setBalance] = useState<BigNumber>(BigNumber.from("0"));

    const fetchUserETH = async () => {
        if (!provider) {
            setBalance(BigNumber.from("0"));

            return;
        }
        try {
            const ethBalance = await getETHBalance(provider);
            setBalance(ethBalance);
        } catch (err) {
            setBalance(BigNumber.from("0"));
        }
    };

    useEffect(() => {
        fetchUserETH();
    }, [provider]);

    return [balance, fetchUserETH];
};

export default useETHBalance;