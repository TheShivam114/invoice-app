import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./component/Login/Login";
import Register from "./component/Register/Register";
import dashbord from "./component/dashbord/dashbord";
import Home from "./component/dashbord/Home";
import Invoices from "./component/dashbord/Invoices";
import NewInvoice from "./component/dashbord/NewInvoice";
import Setting from "./component/dashbord/Setting";
import InvoiceDetail from "./component/dashbord/InvoiceDetail";

function App() {
  const myrouter = createBrowserRouter([
    { path: "/dashbord", Component: dashbord },
    { path: "/Login", Component: Login },
    { path: "/Register", Component: Register },
    {
      path: "/dashbord",
      Component: dashbord,
      children: [
        { path: "", Component: Home },
        { path: "home", Component: Home },
        { path: "invoices", Component: Invoices },
        { path: "new-invoice", Component: NewInvoice },
        { path: "setting", Component: Setting },
        { path: "invoice-detail", Component: InvoiceDetail },
        {},
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={myrouter}></RouterProvider>
    </div>
  );
}

export default App;
