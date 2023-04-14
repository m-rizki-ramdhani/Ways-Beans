import Navbar from "../component/Navbar";
import Jumbotron from "../component/Jumbotron";
import FooterCard from "../component/Card";

export default function Home() {
  return (
    <div className="Home">
      <Navbar />
      <Jumbotron />
      <FooterCard />
    </div>
  );
}
