import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Details(props) {
  const navigate = useNavigate();
  const { IsLogin, user } = props;
  const [showLogin, setModalLogin] = useState(false);

  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  const params = useParams();
  let Product = products.filter(
    (Product) => Product.id === parseInt(params.id)
  );
  Product = Product[0];

  const addCart = useMutation(async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = {
        order_quantity: +1,
      };

      const body = JSON.stringify(data);

      console.log(body);
      const response = await API.post(`/cart/${Product.id}`, body, config);
      console.log("transaction success :", response);

      navigate("/cart");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add Success",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      Swal.fire({
        position: "center",
        icon: "failed",
        title: "Failed Existing Product In Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  });

  return (
    <>
      <div>
        <Container className="d-flex justify-content-center mt-5">
          <div className="d-flex gap-5 mb-5 justify-content-center">
            <img
              src={Product.photo}
              width="400px"
              height="523px"
              alt={Product.name}
            />
            <div className="flex-column pt-5 pb-5">
              <h1 className="fw-bold" style={{ color: "#613D2B" }}>
                {Product.name}
              </h1>
              <p className="card-text" style={{ color: "#974A4A" }}>
                Stock : {Product.stock}
              </p>
              <p style={{ textAlign: "justify" }}>{Product.description}</p>
              <h2
                className="d-flex fw-bold justify-content-end mt-5"
                style={{ color: "#974A4A" }}
              >
                Rp {Product.price}
              </h2>
              <div className="d-grid">
                <Button
                  type="submit"
                  onClick={() => addCart.mutate()}
                  className="mt-4"
                  style={{ backgroundColor: "#613D2B", border: "none" }}
                >
                  Add Card
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
