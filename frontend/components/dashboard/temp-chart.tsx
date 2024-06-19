"use client";

import { useEffect } from "react";
import c3 from "c3";
import "c3/c3.css";

export default function TempChart() {
  useEffect(() => {
    const chart = c3.generate({
      bindto: "#chart",
      data: {
        columns: [
          [
            "data1",
            16,
            16,
            16,
            16,
            16,
            17,
            18,
            19,
            20,
            20,
            21,
            24,
            25,
            28,
            29,
            30,
            29,
            21,
            23,
            21,
            20,
            21,
            22,
            22,
          ],
          [
            "data2",
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
          ],
        ],
      },
    });
  }, []);

  return <div id="chart"></div>;
}
