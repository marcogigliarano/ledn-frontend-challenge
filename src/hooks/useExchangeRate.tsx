import { useQuery } from "react-query";
import { ExchangeRate } from "../types";

const fetchExchangeRate = async () => {
    const response = await fetch("/api/exchange-rate");
    const data = await response.json();
    return data as ExchangeRate;
}

function useExchangeRate() {
    return useQuery<ExchangeRate, Error>("exchangeRate", fetchExchangeRate, { refetchInterval: 5000 });
}

export {
    fetchExchangeRate,
    useExchangeRate
}