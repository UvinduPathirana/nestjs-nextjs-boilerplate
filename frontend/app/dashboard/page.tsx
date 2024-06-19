"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/theme-toggle";
import SelectCity from "@/components/dashboard/select-city";
import SearchCity from "@/components/dashboard/add-city-search";
import Profile from "@/components/dashboard/profile";
import GeneralWhetherData from "@/components/dashboard/general-whether-data";
import io from "socket.io-client";
import { useCookies } from "next-client-cookies";
import Image from "next/image";
import ForecastWeek from "@/components/dashboard/forecast-week";
import TempChart from "@/components/dashboard/temp-chart";

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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (!accessToken) {
          console.error("Access token not found");
          return;
        }

        if (selectedCity) {
          setLoading(true);
          console.log("Loading weather data...");

          const socket = io("http://localhost:3000", {
            query: { token: accessToken },
          });

          socket.emit("city", selectedCity.city);

          socket.on("weather", (weatherData) => {
            console.log(weatherData);
            setWeather(weatherData);
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
        {weather && weather.location && (
          <Card className="p-2 hidden md:block">
            <h1 className="text-md">
              {formatDateTime(weather.location.localtime)}
            </h1>
          </Card>
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

      <main className="sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto flex-1 auto-rows-max gap-4">
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <GeneralWhetherData weather={weather} />
              {/* chart */}
              <Card x-chunk="dashboard-07-chunk-1">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <div style={{ padding: "0px" }}>
                    <TempChart />
                  </div>
                </CardHeader>
              </Card>
            </div>

            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ForecastWeek weather={weather} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
