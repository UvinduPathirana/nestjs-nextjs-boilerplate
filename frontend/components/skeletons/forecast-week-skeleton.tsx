import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ForecastWeekSkeleton() {
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
          {Array.from({ length: 3 }).map((_, index) => (
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
