import Image from "next/image";
import { CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function HourlyWeatherCarousel({ index, hour }: any) {
  // Helper function to ensure absolute URLs
  const makeAbsoluteUrl = (url: string) =>
    url.startsWith("//") ? `https:${url}` : url;

  return (
    <CarouselItem key={index} style={{ flexBasis: "16.5%" }}>
      <div className="p-1">
        <Card className="flex flex-col items-center gap-4 p-4 rounded-lg bg-muted">
          <CardContent className="flex flex-col items-center justify-center gap-2">
            <span className="text-3xl font-bold">{hour.temp_c}°</span>
            <Image
              src={makeAbsoluteUrl(hour.condition.icon)}
              alt={hour.condition.text}
              width={40}
              height={40}
            />
            <span className="text-gray-500 dark:text-gray-400">
              {hour.time.split(" ")[1]}
            </span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
}
