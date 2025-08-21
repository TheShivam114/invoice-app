import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const q = query(
      collection(db, "invoices"),
      where("uid", "==", localStorage.getItem("uid"))
    );
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setInvoices(data);
    setLoading(false);
  };

  const deleteInvoice = async (id) => {
    const isSure = window.confirm("Are you sure you want to delete?");
    if (isSure) {
      try {
        await deleteDoc(doc(db, "invoices", id));
        getData(); // refresh data after deletion
      } catch {
        window.alert("Something went wrong");
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        <div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:"center"}}>
          {" "}
          <i style={{fontSize:30}} class="fa-solid fa-spinner fa-spin-pulse fa-spin-reverse"></i>
        </div>
      ) : (
        invoices.map((data) => (
          <div className="box" key={data.id}>
            <p>{data.to}</p>
            <p>{new Date(data.date.seconds * 1000).toLocaleDateString()}</p>
            <p>Rs.{data.total}</p>
            <button
              onClick={() => deleteInvoice(data.id)}
              className="delete-btn"
            >
              <i className="fa-solid fa-trash"></i> Delete
            </button>
            <button
              onClick={() =>
                navigate("/dashbord/invoice-detail", { state: data })
              }
              className="delete-btn view-btn"
            >
              <i className="fa-solid fa-eye"></i> View
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Invoices;
