import { useQuery } from "react-query";
import { User } from "../types";

const fetchUsers = async () => {
    const response = await fetch("/api/users");
    const data = await response.json();
    return data.users as User[];
};

function useUsers() {
    return useQuery<User[], Error>("users", fetchUsers);
}

const fetchUserByPlanet = async (planetId: string) => {
    const response = await fetch(`/api/users/planet/${planetId}`);
    const data = await response.json();
    return data.users as User[];
}

function useUsersByPlanet(planetId: string) {
    return useQuery<User[], Error>(["users", planetId], () => fetchUserByPlanet(planetId));
}

export {
    useUsers,
    useUsersByPlanet
}
