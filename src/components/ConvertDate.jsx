import moment from 'jalali-moment'
import React from 'react'

export default function ConvertDateToJalali({date}) {
  return moment(date).locale("fa").format("YYYY/MM/DD")
}
