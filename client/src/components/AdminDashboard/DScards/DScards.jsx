import { DSCard } from "../DSCard/DSCard";
import {
  DollarCircleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { useEffect, useState } from "react";
import {
  fetchOrders,
  fetchInventory,
  fetchCustomers,
} from "../../../pages/Admin/Data/Data";
import "./DScards.css";

export const DSCards = () => {
  const [orderData, setOrderData] = useState(0);
  const [inventoryData, setInventoryData] = useState(0);
  const [customerData, setCustomerData] = useState(0);
  const [revenueData, setRevenueData] = useState(0);

  useEffect(() => {
    // Fetch Orders and calculate totals
    fetchOrders().then((orders) => {
      setOrderData(orders.length); // Count total orders
      const totalRevenue = orders.reduce(
        (acc, order) =>
          acc +
          (order.highestBid
            ? order.highestBid * 0.3
            : order.biddingStartPrice * 0.3),
        0
      );
      setRevenueData(totalRevenue); // Calculate 30% of highest bid revenue
    });

    // Fetch Inventory and calculate totals
    fetchInventory().then((inventory) => {
      setInventoryData(inventory.length); // Count total inventory items
    });

    // Fetch Customers and calculate totals
    fetchCustomers().then((data) => {
      console.log("Customer Data:", data); // Log the data for debugging
      if (data && data.users) {
        setCustomerData(data.users.length); // Use the length of the users array
      } else {
        console.error("Invalid response format from fetchCustomers:", data);
      }
    });
  }, []);

  const style = {
    fontSize: 22,
    backgroundColor: "#2c2c2c",
    borderRadius: 20,
    padding: 8,
  };

  return (
    <div className="dscards">
      <Space direction="horizontal" wrap={true}>
        <DSCard
          icon={<ShoppingCartOutlined style={{ ...style, color: "green" }} />}
          title={"Orders"}
          number={orderData}
        />
        <DSCard
          icon={<ShoppingOutlined style={{ ...style, color: "red" }} />}
          title={"Inventory"}
          number={inventoryData}
        />
        <DSCard
          icon={<UserOutlined style={{ ...style, color: "blue" }} />}
          title={"Customers"}
          number={customerData}
        />
        <DSCard
          icon={<DollarCircleOutlined style={{ ...style, color: "purple" }} />}
          title={"Revenue"}
          number={revenueData.toFixed(2)} // Display revenue with two decimal places
        />
      </Space>
    </div>
  );
};
