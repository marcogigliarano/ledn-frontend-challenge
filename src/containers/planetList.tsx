import { FC, useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { updateBatchTransactions } from '../hooks/useTransactions';
import { Transaction, PlanetWithTransations, Currency, TransactionStatus } from '../types';
import PlanetCard from '../components/planetCard';

interface Props {
    planets: PlanetWithTransations[]
    currencyVisible: Currency | ''
}

const PlanetList: FC<Props> = ({
    planets, currencyVisible
}) => {
    const [listOfPlanets, setListOfPlanets] = useState<PlanetWithTransations[]>([]);

    useEffect(() => {
        setListOfPlanets(planets);
    }, [planets]);

    const update = useMutation(updateBatchTransactions, {
        mutationKey: 'updateBatchTransactions',
        onSuccess: (response) => {
            setListOfPlanets((prev) => {
                const newPlanets = [...prev];
                // update the transactions status inProgress to blocked (this should be done in the backend)
                const newTransactions = response.data.transactions.map((transaction: Transaction) => {
                    return {
                        ...transaction,
                        status: TransactionStatus.blocked,
                    }
                })

                newPlanets[response.index].transactions = newTransactions;
                return newPlanets;
            });
        },
        onError: (error) => {
            console.error('Error blocking all transactions', error);
        }

    });

    return (
        <div>
            {listOfPlanets?.map((planet: PlanetWithTransations, index: number) => (
                <PlanetCard
                    index={index}
                    key={planet.id}
                    planet={planet}
                    filterByCurrency={currencyVisible}
                    onBlockAllTransactions={() => update.mutate({ transactions: planet.transactions.filter((transaction: Transaction) => transaction.status === TransactionStatus.inProgress) ?? [], index })}
                />
            ))}
        </div>
    )
}

export default PlanetList;