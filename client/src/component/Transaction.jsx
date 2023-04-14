import { React, useContext } from "react";
import { Container } from "react-bootstrap";
import { API } from "../config/api";
import { useQuery } from "react-query";
import { UserContext } from "../context/userContext";
import { ConvertFormatRupiah, ConvertFormatDate } from "../utils";

export default function Transaction() {
  const [state, _] = useContext(UserContext);
  let { data: transaction } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions");
    console.log(response.data.data);
    return response.data.data;
  });
  return (
    <Container>
    <div className="card-wrapper mx-5">
      <h5 className="fw-bold mb-4" style={{ color: "#613D2B" }}>My Transaction</h5>
      {transaction
        ?.filter((transaction) => transaction.user.id === state.user.id)
        ?.map((item, index) => {
          return (
            <div key={index} className="d-flex align-items-center justify-content-between mb-2 p-4" style={{ backgroundColor: "#F6E6DA", width: 524, height: 145 }}>
              <div className="d-flex align-items-center ">
                <div className="img-wrapper" style={{ width: 80, weight: 120 }}>
                  {
                    item.products?.map((product, index) => (
                      index % 2 === 0 ? (
                      <img src={product.product_photo} style={{ width: "100%" }} alt="logo" />
                      ) : null
                    )) 
                  }
                </div>
                <div className="ms-4">
                  <p className="m-0" style={{ color: "#613D2B", fontWeight: 900 }}>
                    {item.products.product_name}
                  </p>
                  <p className="m-0 mt-1" style={{ color: "#974A4A", fontSize: 14 }}>
                    {ConvertFormatDate(item.date)}
                  </p>
                  <p className="m-0 mt-3" style={{ color: "#974A4A", fontSize: 14 }}>
                    {ConvertFormatRupiah(item.total_price)}
                  </p>
                  <p className="m-0" style={{ color: "#974A4A", fontSize: 14 }}>
                    Qty: {item.total_quantity}
                  </p>
                  <p className="m-0 fw-bold" style={{ color: "#974A4A" }}>
                    {ConvertFormatRupiah(item.total_price)}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <img src="./image/Icon.png" alt="logo-brand" style={{ width: 73, height: 22, margin: "10px 0" }} />
                <img src="./image/Barcode1.png" className="mb-2" alt="qr" style={{ width: 50, height: 50 }} />
                {item.status === "pending" ? (
                  <div className="font-size-14px text-center text-capitalize rounded py-1" style={{ width: "100%", color: "#FF9900", backgroundColor: "rgba(255,153,0,0.125)" }}>
                    {item.status}
                  </div>
                ) : null}
                {item.status === "success" ? (
                  <div className="font-size-14px text-center text-capitalize rounded py-1" style={{ width: "100%", color: "#78A85A", backgroundColor: "rgba(120,168,90,0.125)" }}>
                    {item.status}
                  </div>
                ) : null}
                {item.status === "failed" ? (
                  <div className="font-size-14px text-center text-capitalize rounded py-1" style={{ width: "100%", color: "#E83939", backgroundColor: "#F5AFAF" }}>
                    {item.status}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
    </div>
    </Container>
  );
}


