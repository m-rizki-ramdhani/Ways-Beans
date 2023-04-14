import { Button, Container, Row, Col, Alert } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { API } from "../config/api";
import { useQuery, useMutation } from "react-query";
import { useNavigate } from "react-router";
import { ConvertFormatRupiah } from "../utils";
import { UserContext } from "../context/userContext";
import Swal from "sweetalert2";
import ModalShipping from '../component/ModalShipping';
import ModalSuccessShipping from "../component/ModalShippingSuccess";

export default function Cart() {
  let navigate = useNavigate();
  const [showShipping, setShowShipping] = useState(null);
  const [showSuccess, setShowsuccess] = useState(null);
  
  const handleShowShipping = () => setShowShipping(true);
  const handleCloseShipping = () => setShowShipping(false);

  const handleCloseSuccess = () => {
    setShowsuccess(false);
    navigate("/profile");
  };

  const popSuccess = () => {
    setShowsuccess(true);
    setShowShipping(false);
  };

  const [message, setMessage] = useState(null);
  const [cart, setCart] = useState(false);
  const [state] = useContext(UserContext);

  // untuk mendeklarasikan menjanjikan suatu kode
  let { data: carts, refetch: refetchCarts } = useQuery("cartsListCache", async () => {
    const response = await API.get("/carts");
    console.log(response.data.data);
    return response.data.data;
  });

  let { data: transaction, refetch: refetchTransaction } = useQuery("transactionsListCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.data.data);
    return response.data.data;
  });

  const incrementCart = (id, orderQuantity, product_id) => {
    setCart({ 
      id: id,
      product_id: product_id,
      order_quantity: orderQuantity + 1,
    });
  };

  const decrementCart = (id, orderQuantity, product_id) => {
    setCart({
      id: id,
      product_id: product_id,
      order_quantity: orderQuantity - 1,
    });
  };

  const updateCart = useMutation(async (id) => {
    try {
      //Configuration API
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const response = await API.patch(
        "/cart/" + id,
        {
          product_id: cart.product_id,
          order_quantity: cart.order_quantity,
        },
        config
      );

      setMessage(null);
      refetchCarts();
      setMessageCarts();
      refetchTransaction();
    } catch (error) {
      console.log(error.response.data.message);
      const newAlert = (
        <Alert variant="danger" className="py-1">
          {error.response.data.message}
        </Alert>
      );
      setMessage(newAlert);
      setMessageCarts();
    }
  });

  const deleteCart = useMutation(async (id) => {
    try {
      const response = await API.delete(`/cart/${id}`);
      refetchCarts();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Success",
        showConfirmButton: false,
        timer: 1000,
      });
      window.location.href = "/cart";
      window.dispatchEvent(new Event("badge"));
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (cart) {
      updateCart.mutate(cart.id);
    }
  }, [cart]);

  function setMessageCarts() {
    var index = carts.findIndex((x) => x.id === cart.id);
    carts[index].message = message;
    console.log("error:", message);
  }

  return (
    <>
      <Container>
        <Row className="custom-margin-top mx-5 responsive-margin-x">
          <h3 className="fw-bold mt-5" style={{ color: "#613D2B" }}>
            My Cart
          </h3>
          <p className="fs-5 mt-3" style={{ color: "#613D2B" }}>
            Review Your Order
          </p>
          <Row className="justify-content-between align-items-start">
            <Col>
              {carts
                ?.filter((cart) => cart.user_id === state.user.id)
                ?.map((item, index) => {
                  return (
                    <Col
                      key={index}
                      xs={12}
                      className="py-4 mb-4"
                      style={{
                        borderTop: "2px solid #613D2B",
                        borderBottom: "2px solid #613D2B",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-wrap align-items-center">
                          <img
                            src={item.product.photo}
                            alt={item.name}
                            className="me-3"
                            style={{ width: "6rem" }}
                          />
                          <div>
                            <h2
                              className="mb-4 fw-bold"
                              style={{ fontSize: "18px", color: "#613D2B" }}
                            >
                              {item.product.name}
                            </h2>
                            <div className="d-flex align-items-center">
                              <img
                                src="./image/-.png"
                                width="15px"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  decrementCart(
                                    item.id,
                                    item.order_quantity,
                                    item.product_id
                                  )
                                }
                                alt=""
                              ></img>
                              <span
                                className="fw-bold ps-3 pe-3 me-2 ms-2 rounded"
                                style={{
                                  backgroundColor: "#F6E6DA",
                                  color: "#613D2B",
                                }}
                              >
                                {item.order_quantity}
                              </span>
                              <img
                                src="./image/+.png"
                                width="15px"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  incrementCart(
                                    item.id,
                                    item.order_quantity,
                                    item.product_id
                                  )
                                }
                                alt=""
                              ></img>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="mb-4" style={{ color: "#974A4A" }}>
                            {ConvertFormatRupiah(item.product.price)}{" "}
                          </div>
                          <div className="text-end">
                            <img
                              src="./image/Delete.png"
                              width="20px"
                              alt="Delete Order"
                              onClick={() => deleteCart.mutate(item.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Col>
            <Col
              xs={12}
              lg={4}
              className="py-4 px-0 ms-2"
              style={{ borderTop: "2px solid #613D2B" }}
            >
              <div className="d-flex justify-content-between mb-4 font-size-18px">
                <div style={{color:"#974A4A"}}> Subtotal </div>
                <div style={{color:"#974A4A"}}>
                  
                  {ConvertFormatRupiah(
                    carts
                      ?.filter((cart) => cart.user_id === state.user.id)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator +
                          currentValue.order_quantity *
                            currentValue.product.price,
                        0
                      )
                  )}
                </div>
              </div>
              <div
                className="d-flex justify-content-between pb-4 font-size-18px"
                style={{ borderBottom: "2px solid #613D2B" }}
              >
                <div style={{color:"#974A4A"}}>Qty</div>
                <div style={{color:"#974A4A"}}>
                  {carts
                    ?.filter((cart) => cart.user_id === state.user.id)
                    .reduce(
                      (accumulator, currentValue) =>
                        accumulator + currentValue.order_quantity,
                      0
                    )}
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4 font-size-18px">
                <div className="fw-bold" style={{color:"#974A4A"}}>Total</div>
                <div className="fw-bold" style={{color:"#974A4A"}}>
                  {ConvertFormatRupiah(
                    carts
                      ?.filter((cart) => cart.user_id === state.user.id)
                      .reduce(
                        (accumulator, currentValue) =>
                          accumulator +
                          currentValue.order_quantity *
                            currentValue.product.price,
                        0
                      )
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-end mt-5">
                <Button
                  onClick={handleShowShipping}
                  size="lg"
                  className="fw-bold w-75"
                  style={{ backgroundColor:"#613D2B", borderColor:"#613D2B"}}
                >
                  Pay
                </Button>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
      <ModalShipping show={showShipping} onHide={handleCloseShipping} handleSuccess={popSuccess} />
      <ModalSuccessShipping show={showSuccess} onHide={handleCloseSuccess} />
    </>
  );
}

