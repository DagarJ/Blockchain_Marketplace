import React, { useState } from "react";

import Sell from "../../Images/Sell.jpg";
import Modal from "react-modal";
import { Button, Input } from "reactstrap";
import useEth from "../../contexts/EthContext/useEth";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const SellItem = () => {
  const {
    state: { contract, accounts },
  } = useEth();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const addProduct = async () => {
    const value = await contract.methods
      .addProduct(itemName, itemPrice)
      .send({ from: accounts[0] });
    Swal.fire({
      html: "Item selled successfully",
    });
  };
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <div className="subsection">
        <span>
          <a
            href=""
            className="activeLink"
            onClick={(e) => {
              e.preventDefault();
              setOpenModal(true);
            }}
          >
            {" "}
            <img
              src={Sell}
              style={{ height: "50px", width: "65px", marginBottom: "-10px" }}
            />
            Have items to sell?
          </a>
        </span>
      </div>
      {openModal ? (
        <Modal style={customStyles} contentLabel="Example Modal" isOpen={true}>
          <h5 className="modalHeading">Add Item Details</h5>
          <label className="modalLabel">Name </label>
          <Input
            className="modalInput"
            //   placeholder="Item name"
            type="text"
            onChange={(e) => setItemName(e.target.value)}
          />
          <br />
          <br />
          <label className="modalLabel">Price </label>
          <Input
            className="modalInput"
            //   placeholder="Item Price"
            type="text"
            onChange={(e) => setItemPrice(e.target.value)}
          />
          <br />
          <div className="modalDiv">
            <Button
              className="modalButton"
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={addProduct}
            >
              Add
            </Button>
            <Button
              className="modalButton"
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => {
                setOpenModal(false);
              }}
            >
              Close
            </Button>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default SellItem;
