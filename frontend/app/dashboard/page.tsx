"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/ui/theme-toggle";
import SelectCity from "@/components/dashboard/select-city";
import SearchCity from "@/components/dashboard/forms/add-city-search";
import Profile from "@/components/dashboard/profile";
import GeneralWhetherData from "@/components/dashboard/widgets/general-whether-data";
import io from "socket.io-client";
import { useCookies } from "next-client-cookies";
import ForecastWeek from "@/components/dashboard/widgets/forecast-week";
import Chart from "@/components/dashboard/widgets/chart";
import ChartSkeleton from "@/components/skeletons/chart-skeleton";

type City = {
  id: string;
  city: string;
};

export default function DashboardPage() {
  const cookies = useCookies();
  const accessToken = cookies.get("token");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        if (selectedCity) {
          setLoading(true);

          const socket = io("http://localhost:3000", {
            query: { token: accessToken },
          });

          socket.emit("city", selectedCity.city);

          socket.on("weather", (weatherData) => {
            setWeather(weatherData);

            // Update chart data
            const temperatureData =
              weatherData.forecast.forecastday[0].hour.map(
                (hour: any) => hour.temp_c
              );
            const categories = weatherData.forecast.forecastday[0].hour.map(
              (hour: any) => hour.time.split(" ")[1]
            );
            setTemperatureData(temperatureData);
            setCategories(categories);

            setLoading(false);
          });

          return () => {
            socket.disconnect();
          };
        }
      } catch (error) {
        console.error("Error connecting to WebSocket:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [selectedCity, accessToken]);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/55 pb-5">
      <header className="sticky p-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        {weather && weather.location ? (
          <Card className="p-2 hidden md:block">
            <h1 className="text-md">
              {formatDateTime(weather.location.localtime)}
            </h1>
          </Card>
        ) : (
          <Skeleton className="w-[150px] h-[20px]" />
        )}
        <SearchCity />
        <SelectCity
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          setLoading={setLoading}
        />
        <ModeToggle />
        <Profile />
      </header>

      <main className="sm:px-6 sm:py-0 md:gap-8 flex-1">
        <div className="mx-auto flex-1 gap-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <div className="col-span-2 grid gap-4 lg:gap-8">
              <GeneralWhetherData weather={weather} loading={loading} />

              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>
                    Overview of the weather using charts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div style={{ padding: "0px" }}>
                    {loading ? (
                      <ChartSkeleton />
                    ) : (
                      <Chart data={temperatureData} categories={categories} />
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 lg:gap-8">
              <ForecastWeek weather={weather} loading={loading} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
