"use client";

import { useEffect, useRef } from "react";
import "c3/c3.css";
import "@/styles/custom-c3.css";

interface TempChartProps {
  data: number[];
  categories: string[];
}

export default function Chart({ data, categories }: TempChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const c3ChartRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && data.length) {
      // Dynamically import c3 only on client side
      import("c3").then((c3) => {
        if (!c3ChartRef.current) {
          c3ChartRef.current = c3.generate({
            bindto: chartRef.current,
            data: {
              columns: [["Temperature", ...data]],
              type: "spline",
            },
            axis: {
              x: {
                type: "category",
                categories: categories,
                tick: {
                  outer: false,
                },
              },
              y: {
                tick: {
                  outer: false,
                },
              },
            },
            point: {
              r: 3,
            },
            resize: {
              auto: true,
            },
          });
        } else {
          c3ChartRef.current.load({
            columns: [["Temperature", ...data]],
            categories: categories,
          });
        }
      });
    }
  }, [data, categories]);

  useEffect(() => {
    return () => {
      if (c3ChartRef.current) {
        c3ChartRef.current.destroy();
        c3ChartRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={chartRef}
      id="chart"
      className="w-full h-64 bg-white shadow-lg rounded-lg dark:bg-muted/30"
    ></div>
  );
}
