import React, { useEffect, useState } from "react";
import DashboardCard from "./DashboardCard";
import axios from "axios";
import Loading from "../../components/Loading";

export default function Cards() {
  const [successOrdersAmount, setSuccessOrdersAmount] = useState({});
  const [carts, setCarts] = useState({});
  const [loading,setLoading]=useState(false)
  const [pendingOrders, setPendingOrders] = useState({});
  const [successOrders, setSuccessOrders] = useState({});
useEffect(() => {
  const userToken = JSON.parse(localStorage.getItem("loginToken"));
  setLoading(true);

  axios
    .get(
      "https://ecomadminapi.azhadev.ir/api/admin/orders/orders_statistics",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    )
    .then((res) => {
      if (res.status === 200) {
        setSuccessOrdersAmount(res.data.data.successOrdersAmount);
        setCarts(res.data.data.carts);
        setPendingOrders(res.data.data.pendingOrders);
        setSuccessOrders(res.data.data.successOrders);
      }
    })
    .catch((err) => {
      console.error("خطا در دریافت اطلاعات سفارش‌ها:", err);

      Swal.fire({
        icon: 'error',
        title: 'خطا',
        text:err.message|| 'مشکلی در دریافت اطلاعات سفارش‌ها پیش آمد. لطفاً دوباره تلاش کنید.',
        confirmButtonText: 'باشه',
      });
    })
    .finally(() => {
      setLoading(false);
    });
}, []);
  return (
    <>
        {loading?(<><Loading/></>):(<>
          <DashboardCard
        title="سبد خرید امروز"
        desc="سبد های خرید مانده امروز"
        icon="fas fa-shopping-basket"
        today={carts.today}
        lastWeek={carts.thisWeek}
        lastMonth={carts.thisMonth}
      />
      <DashboardCard
        title="سفارشات مانده امروز"
        desc="سفارشات معلق و فاقد پرداختی"
        icon="fas fa-dolly"
        today={pendingOrders.today}
        lastWeek={pendingOrders.thisWeek}
        lastMonth={pendingOrders.thisMonth}
      />
      <DashboardCard
        title="سفارشات امروز"
        desc="سفارشات کامل و دارای پرداختی"
        icon="as fa-luggage-cart"
        today={successOrders.today}
        lastWeek={successOrders.thisWeek}
        lastMonth={successOrders.thisMonth}
      />
      <DashboardCard
        title="درآمد امروز"
        desc="جمع مبالغ پرداختی (تومان)"
        icon="fas fa-money-check-alt"
        today={successOrdersAmount.today}
        lastWeek={successOrdersAmount.thisWeek}
        lastMonth={successOrdersAmount.thisMonth}
      />
        </>)}
    </>
  );
}
