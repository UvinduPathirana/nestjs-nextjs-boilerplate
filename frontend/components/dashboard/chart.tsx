"use client";

import { useEffect, useRef } from "react";
import c3 from "c3";
import "c3/c3.css";
import "@/styles/custom-c3.css";

interface TempChartProps {
  data: number[];
  categories: string[];
}

export default function Chart({ data, categories }: TempChartProps) {
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!data.length) return;

    if (!chartRef.current) {
      chartRef.current = c3.generate({
        bindto: "#chart",
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
      chartRef.current.load({
        columns: [["Temperature", ...data]],
        categories: categories,
      });
    }
  }, [data, categories]);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (chartRef.current) {
        chartRef.current.flush(); // Redraw the chart
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return <div id="chart" className="w-full h-64 bg-white shadow-lg rounded-lg dark:bg-muted/30"></div>;
}
