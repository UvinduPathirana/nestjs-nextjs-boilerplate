import { ModeToggle } from "@/components/theme-toggle"


export default function DashboardPage() {


    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">

                <h1>Dashboard</h1>
                <p>Welcome to the dashboard!</p>

                <ModeToggle />

            </div>
        </div>
    );
}



