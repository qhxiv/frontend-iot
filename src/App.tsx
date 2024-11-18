import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Home from "./pages/Home/Home.tsx";
import { useEffect } from "react";
import { useState } from "react";
import { socket } from "./socket.ts";
import { AuthContext } from "./context/AuthContext.tsx";
import { ChartDataContext } from "./context/ChartDataContext.tsx";
import { SensorDataContext } from "./context/SensorDataContext.tsx";
import { DevicesStatusContext } from "./context/DevicesStatusContext.tsx";

const router = createBrowserRouter([
  {
    path: "/frontend-iot",
    element: <Home />,
  },
  {
    path: "/frontend-iot/login",
    element: <Login />,
  },
  {
    path: "/frontend-iot/signup",
    element: <SignUp />,
  },
]);

export interface ChartDataItem {
  time: string;
  temperature: number;
  humidity: number;
}

export interface SensorData {
  temperature: number;
  humidity: number;
}

export interface DevicesStatus {
  light: "on" | "off";
  fog: "on" | "off";
  fan: "on" | "off";
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chartData, setChartData] = useState<ChartDataItem[]>([
    { time: "", temperature: NaN, humidity: NaN },
    { time: "", temperature: NaN, humidity: NaN },
    { time: "", temperature: NaN, humidity: NaN },
    { time: "", temperature: NaN, humidity: NaN },
    { time: "", temperature: NaN, humidity: NaN },
    { time: "", temperature: NaN, humidity: NaN },
  ]);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 0,
    humidity: 0,
  });
  const [devicesStatus, setDevicesStatus] = useState<DevicesStatus>({
    light: "off",
    fog: "off",
    fan: "off",
  });

  useEffect(() => {
    function onClientEvent(data: SensorData) {
      const newChartData = {
        time: new Date().toLocaleTimeString(),
        temperature: data.temperature,
        humidity: data.humidity,
      };

      if (chartData.length < 6) {
        setChartData([...chartData, newChartData]);
      } else {
        setChartData([...chartData.slice(1), newChartData]);
      }
      setSensorData(data);
    }

    function onStatusEvent(data: DevicesStatus) {
      setDevicesStatus(data);
    }

    socket.on("client", onClientEvent);
    socket.on("status", onStatusEvent);

    return () => {
      socket.off("client", onClientEvent);
      socket.off("status", onStatusEvent);
    };
  }, [chartData]);

  return (
    <DevicesStatusContext.Provider value={{ devicesStatus, setDevicesStatus }}>
      <SensorDataContext.Provider value={sensorData}>
        <ChartDataContext.Provider value={chartData}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <RouterProvider router={router} />
          </AuthContext.Provider>
        </ChartDataContext.Provider>
      </SensorDataContext.Provider>
    </DevicesStatusContext.Provider>
  );
}
