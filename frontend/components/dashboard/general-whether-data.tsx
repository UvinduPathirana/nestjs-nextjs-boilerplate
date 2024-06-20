import { Card, CardContent } from "@/components/ui/card";
import { ThermometerSun } from "lucide-react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

interface GeneralWhetherDataProps {
    weather: any;
    loading: boolean;
}

export default function GeneralWhetherData({ weather, loading }: GeneralWhetherDataProps) {
    if (loading || !weather) {
        return (
            <Card className="flex flex-col items-center md:flex-row">
                <div className="flex-1 p-7">
                    <div className="pt-5 flex flex-col items-center gap-12 md:flex-row">
                        <Skeleton className="w-[120px] h-[120px] rounded" />
                        <div className="grid gap-2">
                            <Skeleton className="h-14 w-[180px]" />
                            <Skeleton className="h-6 w-[130px]" />
                        </div>
                        <div className="flex flex-col items-baseline gap-2">
                            <Skeleton className="h-[80px] w-[100px]" />
                            <Skeleton className="h-4 w-[60px]" />
                        </div>
                        <div className="flex flex-col items-baseline gap-2">
                            <Skeleton className="h-[80px] w-[100px]" />
                            <Skeleton className="h-4 w-[60px]" />
                        </div>
                        <div className="flex flex-col items-baseline gap-2">
                            <Skeleton className="h-[80px] w-[100px]" />
                            <Skeleton className="h-4 w-[60px]" />
                        </div>
                    </div>
                    <div className="pt-5">
                        <Skeleton className="h-8 w-[200px] pb-5" />
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="pt-5 w-full max-w-5xl"
                        >
                            <CarouselContent className="flex flex-nowrap">
                                {Array.from({ length: 12 }).map((_, index) => (
                                    <CarouselItem key={index} style={{ flexBasis: "16.5%" }}>
                                        <div className="p-1">
                                            <Card className="flex flex-col items-center gap-4 p-4 rounded-lg bg-muted">
                                                <CardContent className="flex flex-col items-center justify-center gap-2">
                                                    <Skeleton className="h-4 w-[50px]" />
                                                    <Skeleton className="h-[40px] w-[40px] rounded-full" />
                                                    <Skeleton className="h-4 w-[40px]" />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </Card>
        );
    }

    const { location, current, forecast } = weather;

    // Extract hourly data for today
    const today = forecast.forecastday[0];
    const hourlyData = today.hour;

    // Helper function to ensure absolute URLs
    const makeAbsoluteUrl = (url: string) =>
        url.startsWith("//") ? `https:${url}` : url;

    return (
        <Card className="flex flex-col items-center md:flex-row">
            <div className="flex-1 p-6">
                <div className="flex flex-col items-center gap-12 md:flex-row">
                    <ThermometerSun size={90} />
                    <div className="grid gap-2">
                        <div className="flex flex-col">
                            <div className="text-4xl font-bold">{location.name}</div>
                            <div className="pt-2 text-lg">{location.region}</div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-6xl font-bold">{current.temp_c}°</div>
                        <div className="pt-2 text-sm">Temperature</div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-baseline">
                            <span className="text-6xl font-bold">{current.humidity}</span>
                            <span className="text-3xl font-bold">%</span>
                        </div>
                        <div className="pt-2 text-sm">Humidity</div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-baseline">
                            <span className="text-6xl font-bold">{current.wind_kph}</span>
                            <span className="text-xl font-bold">km/h</span>
                        </div>
                        <div className="pt-2 text-sm">Wind Speed</div>
                    </div>
                </div>

                {/* Hourly forecast for today */}
                <div className="pt-5">
                    <h2 className="text-2xl font-bold mb-4">Today&apos;s Forecast</h2>
                    <Carousel
                        opts={{
                            align: "start",
                        }}
                        className="w-full max-w-5xl"
                    >
                        <CarouselContent className="flex flex-nowrap">
                            {hourlyData.map((hour: any, index: number) => (
                                <CarouselItem key={index} style={{ flexBasis: "16.5%" }}>
                                    <div className="p-1">
                                        <Card className="flex flex-col items-center gap-4 p-4 rounded-lg bg-muted">
                                            <CardContent className="flex flex-col items-center justify-center gap-2">
                                                <span className="text-3xl font-bold">
                                                    {hour.temp_c}°
                                                </span>
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
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </Card>
    );
}
