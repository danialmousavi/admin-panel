import React, { useEffect, useState } from 'react'

export default function PaginatedTable({datas, dataInfo,additionalFeild,searchparams}) {
    const itemsPerPage = searchparams.itemsPerPage; // تعداد آیتم‌ها در هر صفحه
    const [initialData,setInitialData]=useState(datas);
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [pages,setPages]=useState([]);
    const [pageCount,setPageCount]=useState(1); 
    const [searchInput, setSearchInput] = useState("");

    useEffect(()=>{
        let pCount= Math.ceil(initialData.length / itemsPerPage);
        setPageCount(pCount);
        let pArr=[];
        for(let i=1;i<=pCount;i++){
            pArr.push(i);
        }
        setPages(pArr);
    },[initialData])
    
    useEffect(()=>{
        const startIndex= (currentPage * itemsPerPage) -itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        setTableData(initialData.slice(startIndex,endIndex));
    },[currentPage,initialData])

    // فیلتر کردن داده‌ها بر اساس ورودی جستجو
    useEffect(()=>{
        if(searchInput.trim()==""){
            setInitialData(datas);
        }else{
            const filterdData=datas.filter(item=>item.title.includes(searchInput));
            
            setInitialData(filterdData)
            setCurrentPage(1); // بازنشانی صفحه به 1
        }
    },[searchInput])
  return (
    <>
            <div className="row justify-content-between">
                <div className="col-10 col-md-6 col-lg-4">
                    <div className="input-group mb-3 ltr-direction" >
                        <input type="text" className="form-control" placeholder="قسمتی از عنوان را وارد کنید" onChange={(e)=>setSearchInput(e.target.value)}/>
                        <span className="input-group-text" >جستجو</span>
                    </div>
                </div>
                <div className="col-2 col-md-6 col-lg-4 d-flex flex-column align-items-end">
                    <button className="btn btn-success d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#add_product_modal">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                </div>
            </div>    
        <table className="table table-responsive text-center table-hover table-bordered">
            <thead className="table-secondary">
                <tr>
                    {dataInfo.map((item,index)=>(
                        <th key={item.feild}>{item.title}</th>
                    ))}
                    {additionalFeild && (
                        <th>{additionalFeild.title}</th>
                    )}
                </tr>
            </thead>
                <tbody>
                    {tableData.map(data=>(
                        <tr>
                            {/* ستون‌های جدول به‌صورت داینامیک بر اساس dataInfo ساخته می‌شوند
                           این روش باعث می‌شود جدول قابل تنظیم و قابل استفاده مجدد باشد */}
                            {dataInfo.map((item,index)=>(
                                <td key={item.feild}>{data[item.feild]}</td>
                            ))}
                            {additionalFeild && (
                                <td>
                                    {additionalFeild.elements()}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            {pages.length > 1 && (
                            <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                <ul className="pagination dir_ltr">
                  <li className={`page-item ${currentPage==1?"disable":""}`} onClick={(prev)=>setCurrentPage(prev=>prev-1)} >
                    <a className="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                  {pages.map((page,index)=>(
                    <li  className={`page-item ${currentPage===page ? "active" : ""}`} key={index}>
                      <span className="page-link" onClick={()=>setCurrentPage(page)}>{page}</span>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage==pageCount?"disable":""}`} onClick={(next)=>setCurrentPage(next=>next+1)} >
                    <a className="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
            )}
    </>
  )
}
