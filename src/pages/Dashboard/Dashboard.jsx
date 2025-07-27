import DashboardCard from "./DashboardCard";
import ProductTable from "./ProductTable";
import SaleChart from "./SaleChart";

export default function Dashboard() {

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
        <ProductTable/>

        <SaleChart/>
      </div>
    </div>
  );
}