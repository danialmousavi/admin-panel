import React, { useEffect, useState } from 'react'

export default function PaginatedTable({datas, dataInfo,additionalFeild}) {
    const itemsPerPage = 2; // تعداد آیتم‌ها در هر صفحه
    const [currentPage, setCurrentPage] = useState(1);
    const [tableData, setTableData] = useState([]);
    const [pages,setPages]=useState([]);
    const [pageCount,setPageCount]=useState(1); 

    useEffect(()=>{
        let pCount= Math.ceil(datas.length / itemsPerPage);
        setPageCount(pCount);
        let pArr=[];
        for(let i=1;i<=pCount;i++){
            pArr.push(i);
        }
        setPages(pArr);
    },[])

    useEffect(()=>{
        const startIndex= (currentPage * itemsPerPage) -itemsPerPage;
        const endIndex = currentPage * itemsPerPage;
        setTableData(datas.slice(startIndex,endIndex));
    },[currentPage])
  return (
    <>
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
            <nav aria-label="Page navigation example" class="d-flex justify-content-center">
                <ul class="pagination dir_ltr">
                  <li class={`page-item ${currentPage==1?"disable":""}`} onClick={(prev)=>setCurrentPage(prev=>prev-1)} >
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                  {pages.map((page,index)=>(
                    <li className={`page-item ${currentPage===page ? "active" : ""}`} key={index}>
                      <span className="page-link" onClick={()=>setCurrentPage(page)}>{page}</span>
                    </li>
                  ))}
                  <li class={`page-item ${currentPage==pageCount?"disable":""}`} onClick={(next)=>setCurrentPage(next=>next+1)} >
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
    </>
  )
}
