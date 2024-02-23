export interface ExchangeRate {
  rate: string;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  id: string;
}

export interface User {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  id: string;
}

export enum TransactionStatus {
  inProgress = "inProgress",
  completed = "completed",
  blocked = "blocked",
}

export enum Currency {
  ICS = "ICS",
  GCS = "GCS",
}

export interface Transaction {
  id: string;
  user: number; // Assuming user reference by id
  amount: number;
  currency: Currency;
  date: string;
  status: TransactionStatus;
}

export interface PlanetWithTransations extends Planet {
  transactions: Transaction[];
}

export interface Cumulative {
  ICS: number;
  GCS: number;
}
