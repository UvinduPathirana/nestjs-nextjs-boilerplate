import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface GeneralWhetherDataProps {
    weather: any; // You can define a more specific type if needed
}

export default function ForecastWeek({ weather }: GeneralWhetherDataProps) {
    if (!weather || !weather.forecast || !weather.forecast.forecastday) {
        return <div>Loading...</div>;
    }

    const makeAbsoluteUrl = (url: string) => (url.startsWith("//") ? `https:${url}` : url);

    return (
        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
                <CardTitle>Forecast</CardTitle>
                <CardDescription>
                    Weather forecast for the next 7 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="pt-5">
                    <div className="grid items-center gap-4">
                        {weather.forecast.forecastday.map((day: any, index: number) => (
                            <Card key={index} className=" items-center gap-4 p-4 rounded-lg bg-muted">
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <span className="text-3xl font-bold">{day.day.avgtemp_c}°</span>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <Image src={makeAbsoluteUrl(day.day.condition.icon)} alt={day.day.condition.text} width={40} height={40} />
                                </div>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <span className="text-gray-500 dark:text-gray-400">{day.date.replace(/-/g, '/')}</span>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
