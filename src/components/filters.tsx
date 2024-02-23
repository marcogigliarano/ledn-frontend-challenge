import { FC } from "react";
import styled from "styled-components";
import { Currency } from "../types";


const FilterContainer = styled.div`
    display: flex;
    align-items: end;
    gap: 16px;
    & label {
        font-weight: 600;
        margin-right: 8px;
    }
`;

const FilterField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    & label {
        font-weight: 600;
    }
`;

const Filters: FC<{
    inputDate: Date,
    setDate: (value: Date) => void,
    currency: Currency | '',
    setCurrency: (value: Currency) => void,
}> = ({
    inputDate,
    setDate,
    currency,
    setCurrency
}) => {
        return (
            <FilterContainer>
                <label>Filter by:</label>
                <FilterField>
                    <label>Date</label>
                    <input
                        type="date"
                        value={inputDate.toISOString().split('T')[0]}
                        onChange={(e) => setDate(new Date(e.target.value))}
                    />
                </FilterField>
                <FilterField>
                    <label>Currency</label>
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                    >
                        <option value="">All</option>
                        <option value={Currency.ICS}>ICS</option>
                        <option value={Currency.GCS}>GCS</option>
                    </select>
                </FilterField>

            </FilterContainer >
        );
    }

export default Filters;