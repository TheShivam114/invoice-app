import React, { useEffect, useState } from "react";
// import { useActionData } from "react-router-dom";
import { db } from "../../firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const NewInvoice = () => {
  const [to, setTo] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("1");
  const [total, setTotal] = useState(0);
  const [uid, setUid] = useState("");
  const [isLoading,setLoading]=useState(false)

  // const [product, setProduct] = useState([
  //   { id: 0, name: "laptop", price: 7200, qty: 2 },
  //   { id: 1, name: "remote", price: 8200, qty: 4 },
  //   { id: 2, name: "tv", price: 5520, qty: 3 },
  // ]);
  useEffect(() => {
    const uid = localStorage.getItem("uid");
    setUid(uid);
    console.log(uid);
  }, []);
  const [product, setProduct] = useState([]);

  const navigation = useNavigate();

  const addProduct = () => {
    setProduct([
      ...product,
      { id: product.length, name: name, price: price, qty: qty },
    ]);
    const t = qty * price;
    setTotal(total + t);
    setName("");
    setPrice("");
    setQty(1);
  };

  const saveData = async () => {
    setLoading(true)
    console.log(to, phone, address);
    console.log(product);
    console.log(total);
    const data = await addDoc(collection(db, "invoices"), {
      to: to,
      phone: phone,
      address: address,
      product: product,
      total: total,
      uid: uid,
      date: Timestamp.fromDate(new Date()),
    });
    console.log(data);
    navigation("/dashbord/invoices");
    setLoading(false)
  };

  return (
    <div>
      <div className="header-row">
        <p className="new-invoice-heading">New Invoice</p>
        <button onClick={saveData} className="add-btn" type="button">
          {" "}
           <i
            
            class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"
          ></i>{" "}
          Save Data{" "}
        </button>
      </div>

      <form className="new-invoice-form">
        <div className="first-row">
          <input
            onChange={(e) => {
              setTo(e.target.value);
            }}
            placeholder="TO"
            value={to}
          />
          <input
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            placeholder="Phone"
            value={phone}
          />
          <input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            placeholder="Address"
            value={address}
          />
        </div>

        <div className="first-row">
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Product name"
            value={name}
          />
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            placeholder="Price"
            value={price}
          />
          <input
            onChange={(e) => {
              setQty(e.target.value);
            }}
            type="number"
            placeholder="Quantity"
            value={qty}
          />
        </div>
        <button onClick={addProduct} className="add-btn" type="button">
          {" "}
          ADD Product{" "}
        </button>
      </form>
      {product.length > 0 && (
        <div className="product-wrapper">
          <div className="product-list ">
            <p>S.NO</p>
            <p>Product name </p>
            <p>Price </p>
            <p>Quantity</p>
            <p>Total price </p>
          </div>

          {product.map((data, index) => (
            <div className="product-list " key={index}>
              <p>{index + 1}</p>
              <p>{data.name} </p>
              <p>{data.price} </p>
              <p>{data.qty}</p>
              <p>{data.qty * data.price}</p>
            </div>
          ))}
          <div className="total-wrapper mt-20 flex justify-end  ">
            <p className=" w-[20%] ">Total:{total}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewInvoice;
