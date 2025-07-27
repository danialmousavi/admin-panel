import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {setDashboardChart} from "./DashboardChart"
import Loading from '../../components/Loading';
import moment from 'jalali-moment';
const labels = [
  "فروردین", "اردیبهشت", "خرداد", "تیر",
  "مرداد", "شهریور", "مهر", "آبان",
  "آذر", "دی", "بهمن", "اسفند",
];

const SaleChart = () => {
  const [loading, setLoading] = useState(false);

  const handleGetChartInfo = async () => {
    setLoading(true);
    const res = await axios.get("https://ecomadminapi.azhadev.ir/api/admin/orders/this_year_orders",{
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("loginToken"))}`
      }
    });
    console.log(res);
    
    setLoading(false);

    if (res.status === 200) {
      const monthsOrdersArr = [];
      const now = moment().locale('fa');
      let thisMonth = now.jMonth();

      for (let i = 0; i < 12; i++) {
        if (thisMonth === -1) thisMonth = 11;
        monthsOrdersArr.push({ month: thisMonth, amount: 0 });
        thisMonth--;
      }

      const orders = res.data.data;
      for (const order of orders) {
        const m = moment(order.pay_at, 'YYYY-MM-DD').locale('fa');
        const monthIndex = m.jMonth();
        const index = monthsOrdersArr.findIndex(o => o.month === monthIndex);
        if (index !== -1) {
          monthsOrdersArr[index].amount += parseInt(order.pay_amount);
        }
      }

      monthsOrdersArr.reverse();

      setDashboardChart(
        monthsOrdersArr.map(o => labels[o.month]),
        monthsOrdersArr.map(o => o.amount / 1000000)
      );
    }
  };

  useEffect(() => {
    handleGetChartInfo();
  }, []);

  return (
    <>
      {loading && <Loading/>}
      <div className={`col-12 col-lg-6`}>
        <canvas id="myChart" style={{ height: "400px", width: "100%" }}></canvas>
      </div>
    </>
  );
};

export default SaleChart;