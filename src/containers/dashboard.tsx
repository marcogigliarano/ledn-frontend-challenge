import { FC, useMemo, useState } from 'react';
import { useQuery, useQueries } from 'react-query';
import Filters from '../components/filters';
import { fetchPlanets } from '../hooks/usePlanets';
import { fetchTransactionsForMultipleUsers } from '../hooks/useTransactions';
import { Transaction, PlanetWithTransations, Currency } from '../types';
import { isFirstDateBiggerThanSecond } from '../utils/compareDates';
import PlanetList from './planetList';


const Dashboard: FC = () => {
    const [inputDate, setInputDate] = useState<Date>(new Date());
    const [currencyVisible, setCurrencyVisible] = useState<Currency | ''>(Currency.ICS || '');

    // Get the planets
    const { data: planets, isLoading } = useQuery({
        queryKey: ['allPlanets'],
        queryFn: fetchPlanets,
    })

    // Then get the transactions from planet residents
    const transactionsByResidentes = useQueries(
        planets !== undefined
            ? planets.map((planet, index) => {
                return {
                    queryKey: ['transactions', planet.residents],
                    queryFn: () => fetchTransactionsForMultipleUsers(planet.residents),
                    select: (transaction: Transaction[]) => {
                        return transaction.filter((t: Transaction) => (
                            t.status === 'inProgress' &&
                            isFirstDateBiggerThanSecond(new Date(t.date), inputDate)
                        ));
                    },
                };
            })
            : [] // if planets is undefined, an empty array will be returned
    )


    const sortPlanetsByTransactionsValue: PlanetWithTransations[] = useMemo(() => {
        // Merge planets with transactionsByResidentes and sort by number of transactions.data
        const planetList = planets?.map((planet, index) => {
            return {
                ...planet,
                transactions: [...transactionsByResidentes[index].data ?? []],
            };
        }).sort((a, b) => {
            //sort considering the currency
            if (currencyVisible === '') {
                return b.transactions.length - a.transactions.length;
            }
            const aTransactions = a.transactions.filter((transaction) => transaction.currency === currencyVisible);
            const bTransactions = b.transactions.filter((transaction) => transaction.currency === currencyVisible);
            return bTransactions.length - aTransactions.length;
        });
        return planetList || [];
    }, [planets, transactionsByResidentes])




    if (isLoading) {
        return <p data-testid="loading" > Loading...</p >;
    }

    return (
        <div>
            <h1 data-testid="dashboard-heading">Dashboard</h1>
            <Filters
                inputDate={inputDate}
                setDate={setInputDate}
                currency={currencyVisible}
                setCurrency={setCurrencyVisible}
            />
            <PlanetList planets={sortPlanetsByTransactionsValue} currencyVisible={currencyVisible} />
        </div>
    );
};

export default Dashboard;