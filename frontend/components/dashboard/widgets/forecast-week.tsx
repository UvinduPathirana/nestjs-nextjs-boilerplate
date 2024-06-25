import ForecastWeekSkeleton from "@/components/skeletons/forecast-week-skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForecastDayCard from "../../forecast-components/forecast-day-card";

interface GeneralWhetherDataProps {
  weather: any;
  loading: boolean;
}

export default function ForecastWeek({
  weather,
  loading,
}: GeneralWhetherDataProps) {
  if (loading || !weather) {
    return <ForecastWeekSkeleton />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast</CardTitle>
        <CardDescription>Weather forecast for the next 3 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {weather.forecast.forecastday.map((day: any, index: number) => (
            <ForecastDayCard key={index} day={day} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
