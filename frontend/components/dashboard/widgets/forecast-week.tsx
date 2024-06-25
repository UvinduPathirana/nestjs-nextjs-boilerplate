import ForecastWeekSkeleton from "@/components/skeletons/forecast-week-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

interface GeneralWhetherDataProps {
  weather: any;
  loading: boolean;
}

export default function ForecastWeek({
  weather,
  loading,
}: GeneralWhetherDataProps) {
  const makeAbsoluteUrl = (url: string) =>
    url.startsWith("//") ? `https:${url}` : url;

  // Helper function to format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading || !weather) {
    return <ForecastWeekSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
        <CardDescription>Weather forecast for the next 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {weather.forecast.forecastday.map((day: any, index: number) => (
            <Card key={index} className="flex flex-col items-start gap-4 p-4">
              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <Image
                    src={makeAbsoluteUrl(day.day.condition.icon)}
                    alt={day.day.condition.text}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <div className="text-4xl font-bold">{day.day.avgtemp_c}°</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-medium">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </div>
                  <div className="text-muted-foreground">
                    {formatDate(day.date)}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
