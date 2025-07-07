import { createPortal } from "react-dom"

const ModalPortal=({children})=>{
    return createPortal(
        children,document.getElementById('modals-root')
    )
}
export default ModalPortal