import { Space, Table, Typography } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

// Function to fetch orders from the API
const getOrder = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/orders/"); // Replace with your API endpoint
    return response.data; // Assuming the response data contains the orders array
  } catch (error) {
    console.error("Error fetching orders", error);
    return [];
  }
};

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getOrder().then((res) => {
      setDataSource(res); // Assuming the response is an array of orders
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="orders">
      <Space direction="vertical" wrap={true}>
        <Typography.Title
          level={3}
          style={{
            color: "white",
            textAlign: "center",
            textDecoration: "underline",
          }}
        >
          Orders
        </Typography.Title>
        <Table
          columns={[
            {
              title: "Images",
              dataIndex: "images",
              key: "images",
              render: (images) => (
                <img
                  key={images[0]?.public_id} // Using public_id as a unique key for the first image
                  src={images[0]?.secure_url} // Displaying the first image
                  alt="Order Image"
                  style={{ width: "50px", marginRight: "5px" }}
                />
              ),
            },
            { title: "Title", dataIndex: "title", key: "title" },
            {
              title: "Highest Bid",
              dataIndex: "highestBid",
              key: "highestBid",
              align: "center",
              render: (value) => "₹" + value,
            },
            { title: "Category", dataIndex: "category", key: "category" },
            {
              title: "Seller Email",
              dataIndex: "sellerEmail",
              key: "sellerEmail",
            },
            { title: "User Email", dataIndex: "userEmail", key: "userEmail" },
            {
              title: "Phone No",
              dataIndex: "phoneNo",
              key: "phoneNo",
              align: "center",
            },
            {
              title: "Address",
              dataIndex: "address",
              key: "address",
              align: "center",
            },
          ]}
          loading={isLoading}
          dataSource={dataSource}
          pagination={{
            position: ["bottomLeft"],
            pageSize: 6,
            showTotal: (value) => <span>Total {value} Items</span>,
          }}
          bordered
          rowKey="_id" // This is the key prop for each row
        />
      </Space>
    </div>
  );
};

export default Orders;
