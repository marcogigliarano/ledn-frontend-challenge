import { useQuery } from 'react-query';
import { Planet } from '../types';

const fetchPlanets = async () => {
    const response = await fetch('/api/planets');
    const data = await response.json();
    return data.planets as Planet[];
}

function usePlanets() {
    return useQuery<Planet[], Error>('planets', fetchPlanets);
}

export {
    fetchPlanets,
    usePlanets
}