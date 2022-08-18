import { useState, useEffect } from "react";
import api from "../../api/api";
import Order from "./Order";

function Orders() {
  const [orders, setOreders] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api("/orders", {
          method: "GET",
        });
        setOreders(res.data);
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  if (!orders) return <>Loading</>;

  return (
    <>
      {orders.reverse().map((order) => {
        return <Order key={order.id} order={order} />;
      })}
    </>
  );
}
export default Orders;
