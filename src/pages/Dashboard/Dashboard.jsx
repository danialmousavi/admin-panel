import React, { useEffect, useRef } from "react";
import DashboardTable from "./DashboardTable";
import DashboardCard from "./DashboardCard";
import Chart from "chart.js/auto";
import DashboardChart from "./DashboardChart";

export default function Dashboard() {
const labels = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];
const datapoints = [0, 20, 20, 60, 60, 120, 180, 120, 125, 105, 110, 170];


  return (
    <div className="row">
      <DashboardCard
        title="سبد خرید امروز"
        desc="سبد های خرید مانده امروز"
        icon="fas fa-shopping-basket"
        lastWeek={13}
        lastMonth={18}
      />
      <DashboardCard
        title="سفارشات مانده امروز"
        desc="سفارشات معلق و فاقد پرداختی"
        icon="fas fa-dolly"
        lastWeek={9}
        lastMonth={16}
      />
      <DashboardCard
        title="سفارشات امروز"
        desc="سفارشات کامل و دارای پرداختی"
        icon="as fa-luggage-cart"
        lastWeek={263}
        lastMonth={1038}
      />
      <DashboardCard
        title="درآمد امروز"
        desc="جمع مبالغ پرداختی (تومان)"
        icon="fas fa-money-check-alt"
        lastWeek={6380000}
        lastMonth={22480000}
      />

      <div className="row">
        <DashboardTable />

        <div className="col-12 col-lg-6">
            <DashboardChart labels={labels} datapoints={datapoints}/>
        </div>
      </div>
    </div>
  );
}