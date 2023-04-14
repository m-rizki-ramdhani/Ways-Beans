import { useContext} from "react";
import { Container } from "react-bootstrap";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";

export default function Profile() {
  const [state] = useContext(UserContext);

  let { data: profile } = useQuery("profileCache", async () => {
    const response = await API.get("/profile");
    return response.data.data;
  });
  return (
    <>
      <Container className="mt-1 mx-5">
        <div className="d-flex">
          <div className="me-5">
            <div>
              <h5 className="fw-bold" style={{ color: "#613D2B" }}>
                My Profile
              </h5>
            </div>
            <div className="d-flex gap-4">
              <img
                src="./image/Profile.png"
                width="180px"
                className="mt-3"
                style={{ borderRadius: "8px" }}
                alt=""
              ></img>
              <div>
                <p className="fw-bold mt-4" style={{ color: "#613D2B" }}>
                  Full Name<br></br>
                  <p className="fw-normal">{state.user.name}</p>
                </p>
                <p className="fw-bold" style={{ color: "#613D2B" }}>
                  Email<br></br>
                  <p className="fw-normal">{state.user.email}</p>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
