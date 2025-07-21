import React, { useEffect, useState } from "react";
import Actions from "./TableAdditional/Actions";
import Loading from "../../components/Loading";
import PaginatedTable from "../../components/PaginatedTable";
import Swal from "sweetalert2";
import axios from "axios";

export default function RolesTable() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataInfo = [
    { feild: "id", title: "#" },
    { feild: "title", title: "عنوان محصول" },
    { feild: "description", title: "توضیحات" },
  ];

  const additionalFeild = [
    {
      title: "عملیات",
      elements: (rowData) => <Actions rowData={rowData} />,
    },
  ];
  const searchparams = {
    title: "جستجو",
    placeholder: "قسمتی از عنوان را وارد کنید",
    searchFeild: "title",
    itemsPerPage: 10,
  };
  //get roles
  const fetchData = async () => {
    setLoading(true); // شروع لودینگ

    try {
      const userToken = JSON.parse(localStorage.getItem("loginToken"));

      const response = await axios.get(
        `https://ecomadminapi.azhadev.ir/api/admin/roles`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        setDatas(response.data.data);
        
      } else {
        Swal.fire({
          title: "خطا",
          text: response.data?.message || "مشکلی پیش آمده است",
          icon: "error",
          confirmButtonText: "باشه",
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "مشکلی در ارتباط با سرور رخ داده است.";

      Swal.fire({
        title: "خطا",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "باشه",
      });
    } finally {
      setLoading(false); // پایان لودینگ
    }
  };
  useEffect(()=>{
    fetchData()
  },[])

  
  return (
    <>
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            {datas.length ? (
              <>
                <PaginatedTable
                  datas={datas}
                  dataInfo={dataInfo}
                  additionalFeild={additionalFeild}
                  searchparams={searchparams}
                >
                  <button className="btn btn-success d-flex justify-content-center align-items-center">
                    <i className="fas fa-plus text-light"></i>
                  </button>
                </PaginatedTable>
              </>
            ) : (
              <>
                <h1 className="text-center text-danger">
                  اطلاعاتی در دسترس نیست!
                </h1>
              </>
            )}
          </>
        )}
      </>
    </>
  );
}
