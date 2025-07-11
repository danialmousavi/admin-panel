import React, { use, useEffect, useState } from "react";
import PaginatedTable from "../../components/PaginatedTable";
import axios from "axios";
import ShowInMenu from "./ShowInMenu";
import Actions from "./Actions";
import { useParams } from "react-router-dom";

export default function CategoryTable() {
  const [datas, setDatas] = useState([]);
  const params=useParams();
  console.log(params);
  
const id = params.categoryId || null;
  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem("loginToken"));
    axios
      .get(
        `https://ecomadminapi.azhadev.ir/api/admin/categories${
          id ? `?parent=${id}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        setDatas(res.data.data);
      });
  }, [id]);

  const dataInfo = [
    { feild: "id", title: "#" },
    { feild: "title", title: "عنوان محصول" },
    { feild: "parent_id", title: "دسته والد" },
    { feild: "created_at", title: "تاریخ ایجاد" },
  ];


  const additionalFeild = [
    {
      title: "نمایش در منو",
      elements: (rowData) => <ShowInMenu rowData={rowData}/>,
    },
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData}/>,
    },
  ];

  //اطلاعات مربوط به صفحه بندی و سرچ
  const searchparams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchFeild: "title",
    itemsPerPage: 2,
    id: "add_product_category_modal",
  };
  return (
    <>
      {params.categoryId ? (
        <h5 className="text-center my-3">زیرمجموعه دسته بندی </h5>
      ) : (
        <></>
      )}
      {datas ? (
        <>
          <PaginatedTable
            datas={datas}
            dataInfo={dataInfo}
            additionalFeild={additionalFeild}
            searchparams={searchparams}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
