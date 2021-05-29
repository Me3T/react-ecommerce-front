import React, { useEffect, useState } from "react";
import AdminNav from "../components/routes/Nav/AdminNav";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { changeStauts, getOrders } from "../functions/admin";
import Orders from "../components/order/Orders";
const Admindashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStauts(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4>Admin Dashboard</h4>
          {/* {JSON.stringify(orders)} */}

          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default Admindashboard;
