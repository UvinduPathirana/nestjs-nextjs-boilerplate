import { Card } from "@/components/ui/card"
import { ThermometerSun } from "lucide-react";

export default function GeneralWhetherData() {
    return (
        <Card className="flex items-center">
            <div className="flex-1 p-6">
                <div className="flex items-center gap-12">
                    <ThermometerSun size={90} />
                    <div className="grid gap-2">
                        <div className="flex flex-col">
                            <div className="text-4xl font-bold">Colombo</div>
                            <div className="pt-2 text-lg">Sri Lanka</div>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="text-7xl font-bold">32°</div>
                        <div className="pt-2 text-sm">Temperature</div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-baseline">
                            <span className="text-7xl font-bold">20</span>
                            <span className="text-3xl font-bold">%</span>
                        </div>
                        <div className="pt-2 text-sm">Humidity</div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-baseline">
                            <span className="text-7xl font-bold">10</span>
                            <span className="text-xl font-bold">km/h</span>
                        </div>
                        <div className="pt-2 text-sm">Wind Speed</div>
                    </div>

                </div>


                {/* hourly forecast */}
                <div className="pt-5 flex items-center gap-4">

                    {Array.from({ length: 8 }).map((_, index) => (
                        <Card key={index} className="flex flex-col items-center gap-4 p-4 rounded-lg bg-muted">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <span className="text-3xl font-bold">72°</span>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <ThermometerSun size={40} />
                            </div>
                            <div className="flex flex-col items-center justify-center gap-2">
                                <span className="text-gray-500 dark:text-gray-400">4:00 PM</span>
                            </div>
                        </Card>
                    ))}

                </div>

            </div>
        </Card>
    );
}