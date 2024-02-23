import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import Dashboard from "../containers/dashboard";
import { QueryClient, QueryClientProvider } from "react-query";
import { makeServer } from "../server";
import { Server } from "miragejs";
import { default as PlanetMockData } from "../mockData/planets";
import { default as TransactionsMockData } from '../mockData/transactions';


let server: Server;

beforeEach(() => {
  server = makeServer()
})

afterEach(() => {
  server.shutdown()
})

const queryClient = new QueryClient();
test("renders Dashboard component and Planet List in the sorted order", async () => {

  const numberOfPlanets = PlanetMockData.length;

  server.get('/api/planets', () => {
    return {
      planets: PlanetMockData
    };
  });

  server.get('/api/transactions/users/:ids', (schema, request) => {
    // Mock response for fetching transactions for a user
    const users = request.params.ids;
    const transactionsFilterdByUser = TransactionsMockData.filter(transaction => users.includes(transaction.user));
    return {
      transactions: transactionsFilterdByUser
    };
  });

  render(
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
  // Verify that loading indicator is displayed
  const loadingText = screen.getByTestId('loading');
  expect(loadingText).toBeInTheDocument();

  await waitFor(() => expect(loadingText).not.toBeInTheDocument());

  const dashboardTitle = screen.getByTestId('dashboard-heading');

  await waitFor(() => expect(dashboardTitle).toBeInTheDocument());

  // Wait for the planet cards to be rendered
  const planetCards = await screen.findAllByTestId(/planet-card-name/);
  expect(planetCards).toHaveLength(numberOfPlanets);

  const planetCardTransactionCountFirst = screen.getByTestId('planet-card-transaction-count-0');
  const planetCardTransactionCountMiddle = screen.getByTestId(`planet-card-transaction-count-${Math.floor(numberOfPlanets / 2)}`);
  const planetCardTransactionCountLast = screen.getByTestId(`planet-card-transaction-count-${numberOfPlanets - 1}`);


  expect(parseInt(planetCardTransactionCountFirst?.textContent as string)).toBeGreaterThanOrEqual(parseInt(planetCardTransactionCountMiddle?.textContent as string));
  expect(parseInt(planetCardTransactionCountMiddle?.textContent as string)).toBeGreaterThanOrEqual(parseInt(planetCardTransactionCountLast?.textContent as string));

});


