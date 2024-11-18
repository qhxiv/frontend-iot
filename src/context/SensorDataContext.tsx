import { createContext } from "react";
import { SensorData } from "./App";

export const SensorDataContext = createContext<SensorData>({
  temperature: 0,
  humidity: 0,
});
