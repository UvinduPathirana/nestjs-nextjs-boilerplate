import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface ForecastDayCardProps {
  day: any;
}

export default function ForecastDayCard({ day }: ForecastDayCardProps) {
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

  return (
    <Card className="flex flex-col items-start gap-4 p-4">
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
          <div className="text-muted-foreground">{formatDate(day.date)}</div>
        </div>
      </div>
    </Card>
  );
}
