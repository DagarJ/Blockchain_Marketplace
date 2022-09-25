import { useEffect, useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import PropTypes from "prop-types";
import Items from "../../Images/items.png";
import Buy from "../../Images/Buy.png";
import Swal from "sweetalert2";
import Modal from "react-modal";
import { Button } from "reactstrap";

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

const GetItems = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    state: { contract, accounts },
  } = useEth();
  const [items, setItems] = useState([]);

  const getAll = async () => {
    const value = await contract.methods
      .getAllProducts()
      .call({ from: accounts[0] });
    if (value.length < 1) {
      Swal.fire({
        html: "Oops! Store seems to be empty now.Please refresh in sometime.",
      });
    }
    setItems(value);
  };

  const buyProduct = async (name) => {
    const value = await contract.methods
      .buyProduct(name)
      .send({ from: accounts[0] });
    Swal.fire({
      html: "Item bought successfully",
    });
  };

  return (
    <div className="subsection">
      <img
        src={Items}
        style={{ height: "50px", width: "65px", marginBottom: "-10px" }}
      />
      <span>
        <a
          href=""
          className="activeLink"
          onClick={(e) => {
            e.preventDefault();
            getAll();
            setOpenModal(true);
          }}
        >
          Explore the Store Items
        </a>
      </span>
      {openModal && items.length>0 ? (
        <Modal style={customStyles} contentLabel="Example Modal" isOpen={true}>
          <div className={"itemsDisplay"}>
            <ul className="items">
              {items.length > 0 ? (
                items.map(function (item, i) {
                  return (
                    <>
                      <li key={i}>
                        {item["productName"]} {item["price"]}$
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <img
                          src={Buy}
                          style={{
                            height: "20px",
                            width: "20px",
                            marginBottom: "-2px",
                          }}
                        />
                        <span>
                          <a
                            href=""
                            className="activeBuyLink"
                            onClick={(e) => {
                              e.preventDefault();
                              buyProduct(item["productName"]);
                            }}
                          >
                            Buy now
                          </a>
                        </span>
                      </li>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </ul>
          </div>
          <div className="modalDiv">
            <Button
              className="modalButton"
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={(e) => {
                e.preventDefault();
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
    </div>
  );
};

GetItems.propTypes = {
  setValue: PropTypes.any,
};
export default GetItems;
