import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

export default function DashboardChart({ labels, datapoints }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: labels,
      datasets: [
        {
          label: "فروش ماه",
          data: datapoints,
          borderColor: "#0062ff",
          fill: true,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
      ],
    };

    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "نمودار فروش یک سال گذشته",
          },
        },
        interaction: {
          intersect: false,
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: " میلیون تومان",
            },
          },
        },
      },
    };

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      chartInstanceRef.current = new Chart(chartRef.current, config);
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [labels, datapoints]);

  return <canvas ref={chartRef} height="195"></canvas>;
}