import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useEffect, useState } from "react";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useDebounce } from "@uidotdev/usehooks";
import axios from "axios";

export default function Dashboard() {
  const [tempLimit, setTempLimit] = useState([0, 100]);
  const debouncedTempLimit = useDebounce(tempLimit, 500);

  const [humidityLimit, setHumidityLimit] = useState([0, 100]);
  const debouncedHumidityLimit = useDebounce(humidityLimit, 500);

  const [isAuto, setIsAuto] = useState(true);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isFogOn, setIsFogOn] = useState(false);
  const [isFanOn, setIsFanOn] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const [minTemp, maxTemp] = debouncedTempLimit;

    try {
      axios
        .post(
          `${apiUrl}/send-mqtt`,
          { minTemp, maxTemp },
          { withCredentials: true }
        )
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, debouncedTempLimit]);

  useEffect(() => {
    const [minHumidity, maxHumidity] = debouncedHumidityLimit;

    try {
      axios
        .post(
          `${apiUrl}/send-mqtt`,
          { minHumidity, maxHumidity },
          { withCredentials: true }
        )
        .then((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  }, [apiUrl, debouncedHumidityLimit]);

  function handleAutoSwitchChange(checked: boolean) {
    try {
      axios
        .post(
          `${apiUrl}/send-mqtt`,
          { type: checked ? "auto" : "manual" },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setIsAuto(checked);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function handleLightSwitchChange(checked: boolean) {
    try {
      if (!isAuto)
        axios
          .post(
            `${apiUrl}/send-mqtt`,
            { light: isLightOn ? "on" : "off" },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            setIsLightOn(checked);
          });
    } catch (error) {
      console.log(error);
    }
  }

  function handleFogSwitchChange(checked: boolean) {
    try {
      if (!isAuto)
        axios
          .post(
            `${apiUrl}/send-mqtt`,
            { fog: isFogOn ? "on" : "off" },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            setIsFogOn(checked);
          });
    } catch (error) {
      console.log(error);
    }
  }

  function handleFanSwitchChange(checked: boolean) {
    try {
      if (!isAuto)
        axios
          .post(
            `${apiUrl}/send-mqtt`,
            { fan: isFanOn ? "on" : "off" },
            { withCredentials: true }
          )
          .then((res) => {
            console.log(res);
            setIsFanOn(checked);
          });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-1 gap-4">
        {/* Temperature control */}
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="flex items-center justify-center flex-auto border-4 rounded-full border-primary aspect-square">
            <span className="p-4 text-5xl font-semibold select-none">30°C</span>
          </div>

          <div className="w-full p-4 space-y-5 border rounded-md bg-gray-50 border-border">
            <DualRangeSlider
              value={tempLimit}
              onValueChange={setTempLimit}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex justify-between w-full gap-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="minTemp">Min temperature (°C)</Label>
                <Input
                  id="minTemp"
                  type="number"
                  value={tempLimit[0]}
                  onChange={(e) =>
                    setTempLimit([parseInt(e.target.value), tempLimit[1]])
                  }
                ></Input>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="maxTemp">Max temperature (°C)</Label>
                <Input
                  id="maxTemp"
                  type="number"
                  value={tempLimit[1]}
                  onChange={(e) =>
                    setTempLimit([tempLimit[0], parseInt(e.target.value)])
                  }
                ></Input>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity control */}
        <div className="flex flex-col items-center justify-between gap-4">
          <div className="flex items-center justify-center flex-auto border-4 rounded-full border-primary aspect-square">
            <span className="text-5xl font-semibold select-none">30</span>
          </div>

          <div className="w-full p-4 space-y-5 border rounded-md bg-gray-50 border-border">
            <DualRangeSlider
              value={humidityLimit}
              onValueChange={setHumidityLimit}
              min={0}
              max={100}
              step={1}
            />
            <div className="flex justify-between w-full gap-6">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="minHumidity">Min humidity ()</Label>
                <Input
                  id="minHumidity"
                  type="number"
                  value={humidityLimit[0]}
                  onChange={(e) =>
                    setHumidityLimit([
                      parseInt(e.target.value),
                      humidityLimit[1],
                    ])
                  }
                ></Input>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="maxHumidity">Max humidity ()</Label>
                <Input
                  id="maxHumidity"
                  type="number"
                  value={humidityLimit[1]}
                  onChange={(e) =>
                    setHumidityLimit([
                      humidityLimit[0],
                      parseInt(e.target.value),
                    ])
                  }
                ></Input>
              </div>
            </div>
          </div>
        </div>

        {/* Devices control */}
        <div className="flex flex-col space-y-4 w-60">
          <div className="flex items-center space-x-4">
            <Switch
              id="auto"
              checked={isAuto}
              onCheckedChange={handleAutoSwitchChange}
            />
            <Label className="text-xl" htmlFor="auto">
              Auto mode
            </Label>
          </div>

          <div className="flex flex-col justify-around flex-auto p-4 border rounded-md border-border bg-gray-50">
            <div className="flex items-center space-x-2">
              <Switch
                id="light"
                disabled={isAuto}
                checked={isLightOn}
                onCheckedChange={handleLightSwitchChange}
              />
              <Label className="text-lg" htmlFor="light">
                Light
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="fog"
                disabled={isAuto}
                checked={isFogOn}
                onCheckedChange={handleFogSwitchChange}
              />
              <Label className="text-lg" htmlFor="fog">
                Fog
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="fan"
                disabled={isAuto}
                checked={isFanOn}
                onCheckedChange={handleFanSwitchChange}
              />
              <Label className="text-lg" htmlFor="fan">
                Fan
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <Chart />
      </div>
    </div>
  );
}

function Chart() {
  // const [chartData, setChartData] = useState([]);

  const chartData = [
    { time: "10:00:00", temperature: 186, humidity: 10 },
    { time: "10:00:05", temperature: 305, humidity: 200 },
    { time: "10:00:10", temperature: 237, humidity: 120 },
    { time: "10:00:15", temperature: 73, humidity: 190 },
    { time: "10:00:20", temperature: 209, humidity: 130 },
    { time: "10:00:25", temperature: 214, humidity: 140 },
  ];

  const chartConfig = {
    temperature: {
      label: "Temperature (°C)",
      color: "hsl(var(--chart-1))",
    },
    humidity: {
      label: "Humidity ()",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer className="w-full h-60" config={chartConfig}>
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickMargin={8}
          interval={0}
          padding={{
            left: 10,
            right: 10,
          }}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line
          dataKey="temperature"
          type="monotone"
          stroke="var(--color-temperature)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="humidity"
          type="monotone"
          stroke="var(--color-humidity)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}