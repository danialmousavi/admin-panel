import { createPortal } from "react-dom";

const ModalsConatainer = ({ children ,id,fullScreen,title,className,closeFunction}) => {
  return createPortal(
    <div
      className={`modal fade ${className||""}`}
      id={id}
      tabIndex="-1"

    >
      <div className={`modal-dialog ${fullScreen ? "modal-fullscreen" : ""}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title flex-fill" id="exampleModalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeFunction}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeFunction}
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>,

    document.getElementById("modals-root")
  );
};
export default ModalsConatainer;
