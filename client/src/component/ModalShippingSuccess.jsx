import { Modal, Alert } from "react-bootstrap";
import { useState } from "react";

export default function ModalSuccessAddProduct(props) {
  const [setShow] = useState(false);
  const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={props.show} onHide={props.onHide} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
            <Modal.Title className="fw-bold text-success">Payment Success!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Thank you for ordering in us, please wait 1 x 24 hours to verify you order</Modal.Body>
            </Modal>
        </>
    )
}

