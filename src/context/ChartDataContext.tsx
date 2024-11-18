import { createContext } from "react";
import { ChartDataItem } from "../App";

export const ChartDataContext = createContext<ChartDataItem[]>([]);
