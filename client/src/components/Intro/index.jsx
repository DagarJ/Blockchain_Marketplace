import Welcome from "./Welcome";
import Background from "../../Images/marketplace.jpg"
import GetItems from "./GetItems";
import SellItem from "./SellItem";

var bgStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: "url(" +  Background  + ")",
  backgroundRepeat:"no-repeat",
  backgroundSize: "1000px 650px",
};

function Intro() {
  return (
    <>
    <div style={bgStyle}>
      <Welcome />
      <GetItems />
      <SellItem />
      </div>
    </>
  );
}

export default Intro;
