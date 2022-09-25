import React,{ useState }  from 'react';
import Modal from 'react-modal';
import {Button,Input} from 'reactstrap';
import useEth from "../../contexts/EthContext/useEth";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

const SellModal=(setOpenModal)=>
{
  const { state: { contract, accounts } } = useEth();
  const [itemName,setItemName] = useState('');
  const [itemPrice,setItemPrice] = useState('');
  const addProduct = async () => {
  const value = await contract.methods.addProduct(itemName,itemPrice).send({ from: accounts[0] });        
  };

  return(<Modal
         style={customStyles}
         contentLabel="Example Modal"
        isOpen={true}
        //toggle={() => toggleModal("notificationModal")}
    >
       {/*  <div className="modal-content">
             <div>
            <div> className="modal-header"> */} 
            <h5  className='modalHeading'
            >
             Add Item Details
            </h5>
          {/* </div>
          <div> */}
          {/* <div className="modal-body"> */}
            {/* <div className="text-left">
            <FormGroup> */}
                    <label className="modalLabel">Name </label>
                    <Input
                      className="modalInput"
                    //   placeholder="Item name"
                      type="text"
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <br/>
                    <br/>
                  {/* </FormGroup>
                  <FormGroup> */}
                    <label className="modalLabel">Price </label>
                    <Input
                      className="modalInput"
                    //   placeholder="Item Price"
                      type="text"
                      onChange={(e) => setItemPrice(e.target.value)}
                    />
                    <br/>
                  {/* </FormGroup> */}

            {/* </div>
           </div>
           <div> */}
          {/* <div className="modal-footer py-3"> */}
          <div className='modalDiv'>
            <Button
              className='modalButton'
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={addProduct}
            >
              Add
            </Button>
            <Button
              className='modalButton'
              color="secondary"
              data-dismiss="modal"
              type="button"
              onClick={() => {debugger;
                setOpenModal(false)}}
            >
              Close
            </Button>
            </div>
         {/* </div>
         </div> */}
      </Modal>)
}

export default SellModal;