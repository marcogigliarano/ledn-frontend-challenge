import { FC } from "react";
import { useExchangeRate } from "../hooks/useExchangeRate";
import { Cumulative } from "../types";


interface Props {
    values: Cumulative;
}

const RealTimeCumulativeValue: FC<Props> = ({ values }) => {
    const { data } = useExchangeRate();

    const exchangeRate = Number(data?.rate) ?? 1;
    const valueInICS = values.GCS * exchangeRate;
    const valueInGCS = values.ICS / exchangeRate;


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
        }}>
            <label>Cumulative values at rate {exchangeRate}</label>
            <p style={{ margin: 0 }}>{valueInICS} ICS  - {valueInGCS} GCS </p>
        </div>
    );
}

export default RealTimeCumulativeValue;