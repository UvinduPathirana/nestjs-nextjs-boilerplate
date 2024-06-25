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
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-7 w-[100px]" />
          </CardTitle>
          <Skeleton className="h-4 w-[230px]" />
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} className="flex flex-col items-start gap-4 p-4">
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="w-10 h-10 rounded" />
                    <Skeleton className="h-10 w-20 rounded" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Skeleton className="h-6 w-[100px]" />
                    <Skeleton className="pt-2 h-5 w-[150px]" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
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
