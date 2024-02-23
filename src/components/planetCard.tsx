import { FC, useMemo } from 'react';
import { styled } from 'styled-components';
import { Cumulative, Currency, PlanetWithTransations, TransactionStatus } from '../types';
import RealTimeCumulativeValue from './realTimeCumulativeValue';
import getCumulativeValue from '../utils/getCumulative';


interface Props {
    index: number,
    planet: PlanetWithTransations,
    filterByCurrency: Currency | '',
    onBlockAllTransactions: () => void,
}

const Card = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 16px 0;
    && h1 {
        margin: 0;
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const CardContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
`;

const CardContent = styled.div`
    display: flex;
    width: 350px;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 8px 0;
`;

const CardField = styled.div`
    display: flex;
    flex-direction: column;
    & p {
        margin: 0;
    }
`;

const StatusLight = styled.div<{ status: TransactionStatus }>`
    position: relative;
    width: 8px;
    height: 8px;
    padding: 4px;
    border-radius: 50px;
    background-color: ${({ status }) => getTransactionStatusLight(status)};
    & span {
        display: none;
    }
    &:hover span {
        display: block;
        position: absolute;
        top: -40px;
        background-color: #333;
        color: #fff;
        padding: 8px;
        border-radius: 4px;
        z-index: 1;
        cursor: pointer;
    }
`;

const getTransactionStatusLight = (status: TransactionStatus) => {
    switch (status) {
        case 'inProgress':
            return 'yellow';
        case 'completed':
            return 'green';
        case 'blocked':
            return 'red';
        default:
            return 'grey';
    }
}


const PlanetCard: FC<Props> = ({ index, planet, filterByCurrency, onBlockAllTransactions }) => {

    const filteredTransactions = useMemo(() => {
        return planet.transactions.filter((transaction) => {
            return filterByCurrency === '' || transaction.currency === filterByCurrency;
        });
    }, [planet.transactions, filterByCurrency]);

    const cumulativeTransactionsValues: Cumulative = useMemo(() => {
        const result = planet.transactions.map((transaction) => {
            return {
                value: transaction.amount,
                currency: transaction.currency,
            };
        });
        return getCumulativeValue(result);
    }, [planet.transactions]);


    return (
        <Card>
            <CardHeader>
                <div>
                    <h1 data-testid={`planet-card-name-${index}`}>{planet.name}</h1>
                    <small><span data-testid={`planet-card-transaction-count-${index}`}>{filteredTransactions.length}</span> transactions</small>
                    <button onClick={() => onBlockAllTransactions()}>Block all transactions</button>
                </div>
                <RealTimeCumulativeValue values={cumulativeTransactionsValues} />
            </CardHeader>
            <CardContainer>
                {filteredTransactions.map((transaction, index) => (
                    <CardContent key={index}>
                        <CardField>
                            <small>User ID</small>
                            <p data-testid={`planet-card-userid-${index}`}>{transaction.user}</p>
                        </CardField>

                        <CardField>
                            <small>Value</small>
                            <p data-testid={`planet-card-amount-${index}`}>{transaction.amount} {transaction.currency}</p>
                        </CardField>

                        <CardField>
                            <small>Date</small>
                            <p data-testid={`planet-card-date-${index}`}>{new Date(transaction.date).toLocaleDateString()}</p>
                        </CardField>

                        <StatusLight status={transaction.status}>
                            <span data-testid={`planet-card-status-${index}`}>{transaction.status}</span>
                        </StatusLight>

                    </CardContent>
                ))}
            </CardContainer>
        </Card>
    );
};

export default PlanetCard;