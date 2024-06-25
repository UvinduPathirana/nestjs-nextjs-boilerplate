import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function GeneralWeatherSkeleton() {
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
