import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useState } from "react";

function Order({ order }) {
  const [dishes, setDishes] = useState(false);

    const result = {}
    const res = []

    order.dishes.map(el => {
        res.push(el.name)
    })

    res.forEach(function(a){
        result[a] = result[a] + 1 || 1;
    })

    const res2 = []
    for (let key in result) {
        res2.push({
            name: key,
            count: result[key]
        })
    }

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Box onClick={() => setDishes(!dishes)}>
        <Box>
          {order.customer.first_name} {order.customer.last_name}
        </Box>
        <Box>{order.customer.email}</Box>
        <Box>{order.customer.phone}</Box>
        <Box>{order.createdAt}</Box>
      </Box>
      <Divider />
      {dishes ? (
        <Box>
          Заказы:
          {res2.map((dish, i) => {
            return <div key={i} style={{ margin: '0 0 0 15px' }} >{dish.name}: &nbsp; x &nbsp;{dish.count}  </div>;
          })}
        </Box>
      ) : (
        false
      )}
    </Box>
  );
}
export default Order;
