import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Card() {
  // Fetching product data from database
  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");
    return response.data.data;
  });

  let asceding = [];
  if (products !== undefined) {
    //operator spread
    asceding = [...products];
    //sort use methods descending for value id
    asceding.sort((a, b) => b.id - a.id);
  }
  return (
    <>
      <Container className="d-flex justify-content-start mt-5 gap-4 mb-5 w-75" style={{ marginLeft:"240px" }}>
        {asceding?.map((item) => {
          return (
            <>
              <div
                key={item.id}
                className="card rounded-0 border-white"
                style={{ backgroundColor: "#F6E6DA", width: "20%" }}
              >
                <NavLink
                  to={`/detailproduct/${item.id}`}
                  className="text-decoration-none"
                >
                  <div>
                    <img
                      src={item.photo}
                      width={"100%"}
                      alt=""
                    />
                  </div>
                  <div className="card-body">
                    <h5
                      className="card-title fw-bold"
                      style={{ color: "#613D2B", fontSize: "18px" }}
                    >
                      {item.name}
                    </h5>
                    <p
                      className="card-text"
                      style={{ color: "#974A4A", fontSize: "14px" }}
                    >
                      Price : Rp. {item.price} <br></br> Stock : {item.stock}
                    </p>
                  </div>
                </NavLink>
              </div>
            </>
          );
        })}
      </Container>
    </>
  );
}
