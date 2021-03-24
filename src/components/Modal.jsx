import './component-styles/Modal.css';
import { Button } from '@material-ui/core';

const Modal = ({ handleClose, showModal, children }) => {
    const showHideClassName = showModal ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
        <section className="modal-main">
            {children}
            <Button type="button" onClick={handleClose} style={{padding: '5px', margin: '5px'}}>
            Close
            </Button>
        </section>
        </div>
    );
};

export default Modal;