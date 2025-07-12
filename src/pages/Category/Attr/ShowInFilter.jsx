import React from 'react'

export default function ShowInFilter({rowData}) {
  return (
    <>
    <span className={rowData.in_filter?"text-success":"text-danger"}>
        {rowData.in_filter?"هست":"نیست"}
    </span>
    </>
    )
}
