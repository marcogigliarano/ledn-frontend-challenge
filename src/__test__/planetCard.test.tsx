import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import PlanetCard from "../components/planetCard";
import { Currency, PlanetWithTransations, TransactionStatus } from '../types';
import { default as PlanetMockData } from "../mockData/planets";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
test("renders PlanetCard information", async () => {

    const planet1: PlanetWithTransations = {
        ...PlanetMockData[0],
        id: '1',
        name: 'Earth',
        transactions: [
            {
                id: '1',
                amount: 100,
                currency: Currency.ICS,
                date: '2024-03-27T19:30:41Z',
                status: TransactionStatus.inProgress,
                user: 1
            },
        ],
    }

    render(
        <QueryClientProvider client={queryClient}>
            <PlanetCard
                index={0}
                planet={planet1}
                filterByCurrency={Currency.ICS}
                onBlockAllTransactions={() => { }}
            />
        </QueryClientProvider>
    );

    const planetCardTitle = screen.getByTestId('planet-card-name-0');
    expect(planetCardTitle).toHaveTextContent('Earth');

    const planetCardTransactionCount = screen.getByTestId('planet-card-transaction-count-0');
    expect(planetCardTransactionCount).toHaveTextContent('1');

    const planetCardUserId = screen.getByTestId('planet-card-userid-0');
    expect(planetCardUserId).toHaveTextContent('1');

    const planetCardAmount = screen.getByTestId('planet-card-amount-0');
    expect(planetCardAmount).toHaveTextContent('100 ICS');

    const planetCardDate = screen.getByTestId('planet-card-date-0');
    expect(planetCardDate).toHaveTextContent('3/27/2024');

    const planetCardStatus = screen.getByTestId('planet-card-status-0');
    expect(planetCardStatus).toHaveTextContent(TransactionStatus.inProgress);


});


