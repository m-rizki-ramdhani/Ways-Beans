import React, { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import Swal from "sweetalert2";

//store
const ModalRegister = (props) => {
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const { name, email, password } = formRegister;

  const ChangeRegister = (e) => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value,
    });
  };
  // Mengubah data pada server
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", formRegister);

      console.log("register success : ", response);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormRegister({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    props.onHide();
  });

  return (
    <>
      <Modal show={props.show} onHide={props.onHide} centered>
        <Form
          className="pt-4 pb-4 ps-5 pe-5 bg-body rounded"
          onSubmit={(e) => handleSubmit.mutate(e)}
        >
          <h2
            style={{ color: "#613D2B" }}
            className="d-flex fw-bold mb-4 justify-content-center"
          >
            Register
          </h2>
          <div className="d-grid gap-2">
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid #613D2B",
                  backgroundColor: "#F6E6DA",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                name="password"
                className="form-check-label"
                placeholder="Password"
                required
                value={password}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid #613D2B",
                  backgroundColor: "#F6E6DA",
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="name"
                placeholder="Full name"
                required
                value={name}
                onChange={ChangeRegister}
                style={{
                  border: "1px solid #613D2B",
                  backgroundColor: "#F6E6DA",
                }}
              />
            </Form.Group>
            <div className="d-grid">
              <Button
                style={{ backgroundColor: "#613D2B", border: "none" }}
                type="submit"
              >
                Register
              </Button>
            </div>
          </div>
          <div className="d-flex justify-content-center mt-3">
            <p>Already have an account? Klik </p>
            <Link
              to="/"
              onClick={props.onClick}
              className=" ms-1 text-decoration-none text-black fw-bold"
            >
              Here
            </Link>
          </div>
        </Form>
      </Modal>
    </>
  );
};
export default ModalRegister;
