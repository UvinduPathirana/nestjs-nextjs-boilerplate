import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { ModeToggle } from "@/components/theme-toggle"
import SelectCity from "@/components/dashboard/select-city"
import SearchCity from "@/components/dashboard/add-city-search"
import Profile from "@/components/dashboard/profile"
import GeneralWhetherData from "@/components/dashboard/general-whether-data"


export default function DashboardPage() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/55 pb-5">

        <header className="sticky p-5 top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Card className="p-2 hidden md:block">
                <h1 className="text-md">2024-06-14 12:24PM</h1>
            </Card>
            <SearchCity  />
            <SelectCity />
            <ModeToggle />
            <Profile />

        </header>

        <main className="sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto  flex-1 auto-rows-max gap-4">
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                    <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                        <GeneralWhetherData />

                        {/* chart */}
                        <Card x-chunk="dashboard-07-chunk-1">
                            <CardHeader>
                                <CardTitle>Overview</CardTitle>
                                <div style={{ padding: '200px' }}> </div>
                            </CardHeader>
                        </Card>

                    </div>


                    <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

                        <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                            <CardHeader>
                                <CardTitle>Forecast</CardTitle>
                                <CardDescription>
                                    whether forecast for the next 7 days
                                </CardDescription>
                            </CardHeader>
                            <CardContent>

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    </div>
    );
}



