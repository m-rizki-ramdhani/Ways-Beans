import { Container } from "react-bootstrap";

export default function Jumbotron() {
  return (
    <>
      <Container
        style={{
          backgroundColor: "#DBB699",
          width: "1000px",
          height: "400px",
          marginRight: "270px",
        }}
        className="mt-5"
      >
        <div>
          <img
            className="d-block"
            style={{
              width: "352px",
              height: "159px",
              left: "800px",
              top: "300px",
              position: "absolute",
            }}
            src="./image/Waves.png"
            alt=""
          />

          <img
            className="d-block"
            style={{
              width: "402px",
              height: "242px",
              left: "900px",
              top: "148px",
              position: "absolute",
            }}
            src="./image/Carousel.png"
            alt=""
          />

          <img
            className="d-block"
            style={{
              width: "460px",
              height: "145px",
              left: "320px",
              top: "170px",
              position: "absolute",
            }}
            src="./image/WaysBean.png"
            alt=""
          />

          <p
            style={{
              fontFamily: "Avenir!important",
              fontStyle: "normal!important",
              fontSize: "25px",
              left: "330px",
              top: "340px",
              position: "absolute",
            }}
          >
            BEST QUALITY COFFEE BEANS
          </p>

          <p
            style={{
              fontFamily: "Avenir!important",
              fontStyle: "normal!important",
              fontSize: "18px",
              left: "330px",
              top: "390px",
              position: "absolute",
            }}
          >
            Quality freshly roasted coffee made just for you.<br></br>Pour, brew
            and enjoy
          </p>
        </div>
      </Container>
    </>
  );
}
