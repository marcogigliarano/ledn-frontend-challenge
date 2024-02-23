To accopplish the first point of the challenge:

1. **Transaction filtering:**
   - For each planet, using all users' homeworld as a reference for transaction sources, filter transactions:
     - After a specified date.
     - With a status marked as `inProgress`.
     - Executed in the ICS ("Imperial Crown Standard") currency.

I realized I needed to show a list of planets sorted by the number of transictions,
but because the REST API is not returning this information in one call I had to think about a
solution to accomplish what I was looking for: a list of Planets with Transitions.

So I looked at the REST API avaliable and I decide to:

- first get the list of Planets and from '/planets'
- each planet returns a list of user ids inside that planet
- so I leveraged the useQueries hook to loop around each planet and get all the transitions related to its users, the endpoint to accomplish that is '/transactions/users/:ids'

This way I had what I needed for deliver 1:

- filter by transaction status inProgress
- after a specific date
- currency ICS

Note: I implemented a Filters component to allow the user to pick a date and a currency

2. **Planetary ranking:**
   - From the transactions filtered previously, order the planets based on the total number of transactions, from the highest to the lowest.

To accomplish this deliver I wrote a function (sortPlanetsByTransactionsValue) wrapped in a useMemo component to sort the array by number of transactions

3. **Cumulative transaction values:**
   - From the ordered list of planets, provide real-time cumulative values for all transactions in both ICS ("Imperial Crown Standard") and GCS ("Galactic Credit Standard") for each planet individually.

For a real-time functionalities I wrote a custom hooks useExchangeRate with a refetchInterval of 5 seconds.
I wrote a component RealTimeCumulativeValue that it's responsible to show the values in both currencies consuming and getting exchangeRate for the customHook. The decision to make this call in this component it was to avoid re-rendering of the whole PlanetCard.

4. **Security measures:**
   - Implement a solution capable of turning all transactions with a status of `inProgress` for a given planet to `blocked` using a planet ID. This security measure is essential to prevent potential bad actors from exploiting the financial system and transferring funds to the Empire.

For the last deliver I had to add a mutation to that wrapped a PUT request to '/transactions/update-batch' endpoint.
The decision I took here was to create a container PlanetList child of Dashboard. The main reason was becuase I needed to store the transaciton in a state and update the list after the mutation success.
