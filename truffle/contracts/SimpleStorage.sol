// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
//import "@nomiclabs/builder/console.sol";

contract SimpleStorage {
  uint256 value=5;
  uint public productCount=0;
  address  public owner;
   
   constructor() public {
    //productCount = 0;
     owner=payable(msg.sender);
          }
     uint id;
     uint purchaseId;
   struct seller {
     string name;
     address addr;
     uint bankGuaraantee;
     bool bgPaid;
     }
     struct product{
        //string productId;
        string productName;
        //string Category;
        uint price;
        //string description;
        address payable seller;
        bool isActive;        
           }
    struct ordersPlaced {
        string productId;
        uint purchaseId;
        address orderedBy;
           }
    struct sellerShipment {
        string productId;
        uint purchaseId;
        string shipmentStatus;
        string deliveryAddress;
        address  payable orderedBy;
        bool isActive;
        bool isCanceled;
            }
    struct user{
        string name;
        string email;
        string deliveryAddress;
        bool isCreated;
           }
    struct orders{
        string productId;
        string orderStatus;
        uint purchaseId;
        string shipmentStatus;
            }
  mapping(address=> seller) public sellers;
  mapping (uint => product) products;
  product[] public allProducts;
  mapping (address=> ordersPlaced[]) sellerOrders;
  mapping (address=> mapping(uint=>sellerShipment))sellerShipments;
  mapping (address=> user) users;
  mapping (address=>orders[]) userOrders;
/*function sellerSignUp(string memory _name) public payable{
        require(!sellers[msg.sender].bgPaid, "You are Already Registered");
        require(msg.value==5 ether, "Bank Guarantee of 5ETH Required");
        owner.transfer(msg.value);
        sellers[msg.sender].name= _name;
        sellers[msg.sender].addr= payable(msg.sender);
        sellers[msg.sender].bankGuaraantee = msg.value;
        sellers[msg.sender].bgPaid=true;
             }*/
/*function createAccount(string memory _name, string memory _email, string memory _deliveryAddress) public {
        
       users[msg.sender].name= _name;
       users[msg.sender].email= _email;
       users[msg.sender].deliveryAddress= _deliveryAddress;
       users[msg.sender].isCreated= true;
             }*/
function buyProduct(string memory _productName)  public payable {
        
        
     //  require(msg.value == products[_productName].price, "Value Must be Equal to Price of Product");
       //require( users[msg.sender].isCreated, "You Must Be Registered to Buy");
        
      
        
       purchaseId = id++;
       for (uint i = 0; i < allProducts.length; i++) {
        if (keccak256(abi.encodePacked(allProducts[i].productName)) == keccak256(abi.encodePacked(_productName))) { 
          //require(msg.value == products[i].price, "Value Must be Equal to Price of Product");
           products[i].seller.transfer(msg.value);         
          delete allProducts[i];
          productCount--;
        }
      }
       /*orders memory order = orders(_productName,  "Order Placed With Seller",purchaseId, sellerShipments[products[_productId].seller][purchaseId].shipmentStatus);
       userOrders[msg.sender].push(order);
       ordersPlaced memory ord = ordersPlaced(_productId, purchaseId,payable(msg.sender));
       sellerOrders[products[_productId].seller].push(ord);
        
       sellerShipments[products[_productId].seller][purchaseId].productId=_productId;
       sellerShipments[products[_productId].seller][purchaseId].orderedBy=   payable(msg.sender);
       sellerShipments[products[_productId].seller][purchaseId].purchaseId= purchaseId;
       sellerShipments[products[_productId].seller][purchaseId].deliveryAddress = users[msg.sender].deliveryAddress;
       sellerShipments[products[_productId].seller][purchaseId].isActive= true;*/
       
              }
function addProduct( string memory _productName,  uint _price) public {
  //productCount=5;
      // require(sellers[msg.sender].bgPaid,"You are not Registered as Seller");      
       //require(!products[_productName].isActive, "Product With this name is already Active. Use other name");
       for (uint i = 0; i < allProducts.length; i++) {
        if (keccak256(abi.encodePacked(allProducts[i].productName)) == keccak256(abi.encodePacked(_productName))) { 
          require(!products[i].isActive, "Product With this name is already Active. Use other name");
        }
      }
       
       product memory product = product( _productName,  _price,  payable(msg.sender), true);      
      // products[_productId].productId= _productId;
       products[allProducts.length].productName= _productName;   
      // products[_productId].Category= _category;   
      // products[_productId].description= _description;   
       products[allProducts.length].price= _price; 
       products[allProducts.length].seller= payable(msg.sender); 
       products[allProducts.length].isActive = true;
       allProducts.push(product);
       productCount++; 
       //console.log("productCount is:",productCount);
       //console.log("allProducts length:",allProducts.length);
          
                     }
/*function cancelOrder(string memory _productId, uint _purchaseId)  public payable {
      require(sellerShipments[products[_productId].seller][_purchaseId].orderedBy==msg.sender, "Aww Crap.. You are not Authorized to This Product PurchaseId");
      require (sellerShipments[products[_productId].seller][purchaseId].isActive, "Aww crap..You Already Canceled This order"); 
    
    
      sellerShipments[products[_productId].seller][_purchaseId].shipmentStatus= "Order Canceled By Buyer, Payment will Be  Refunded";
      sellerShipments[products[_productId].seller][_purchaseId].isCanceled= true; 
      sellerShipments[products[_productId].seller][_purchaseId].isActive= false;
             }
function updateShipment(uint _purchaseId, string memory _shipmentDetails) public {
      require(sellerShipments[msg.sender][_purchaseId].isActive, "Order is either inActive or cancelled");
        
      sellerShipments[msg.sender][_purchaseId].shipmentStatus= _shipmentDetails;
        
                    }
function refund(string memory _productId, uint _purchaseId)public payable {
      require (sellerShipments[msg.sender][_purchaseId].isCanceled, "Order is not Yet Cancelled"); 
      require (!sellerShipments[products[_productId].seller][purchaseId].isActive,"Order is Active and not yet Cancelled");        
      require(msg.value==products[_productId].price,"Value Must be Equal to Product Price");
      sellerShipments[msg.sender][_purchaseId].orderedBy.transfer(msg.value);
      sellerShipments[products[_productId].seller][_purchaseId].shipmentStatus= "Order Canceled By Buyer, Payment Refunded";
                    
             }
function myOrders (uint _index) public view returns(string memory, string memory, uint, string memory) {                
      return(userOrders[msg.sender][_index].productId, userOrders[msg.sender][_index].orderStatus, userOrders[msg.sender][_index].purchaseId, sellerShipments[products[userOrders[msg.sender][_index].productId].seller][userOrders[msg.sender][_index].purchaseId].shipmentStatus);                 
              }
function getOrdersPlaced(uint _index) public view returns(string memory, uint, address, string memory) {
      return(sellerOrders[msg.sender][_index].productId, sellerOrders[msg.sender][_index].purchaseId, sellerOrders[msg.sender][_index].orderedBy, sellerShipments[msg.sender][sellerOrders[msg.sender][_index].purchaseId].shipmentStatus);
              } 
function getShipmentDetails(uint _purchaseId) public view returns(string memory,string memory,address,string memory) {
        
      return(sellerShipments[msg.sender][_purchaseId].productId, sellerShipments[msg.sender][_purchaseId].shipmentStatus, sellerShipments[msg.sender][_purchaseId].orderedBy,sellerShipments[msg.sender][_purchaseId].deliveryAddress);
             } */

  function read() public view returns (uint256) 
  {
    return value;
   }

  function write(uint256 newValue) public 
  {
    value = newValue;
   }

    function getAllProducts() public view returns (product[] memory) 
  {
   
    product[] memory id = new product[](productCount);
      for (uint i = 0; i < productCount; i++) {
          product storage pro = allProducts[i];
          id[i] = pro;
      }
      //console.log("all items are:",id.length);
      return id;
   }
   
}
