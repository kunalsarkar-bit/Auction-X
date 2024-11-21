import { useEffect, useState } from "react";
import { Table, Button, Popconfirm, message } from "antd";
import axios from "axios";
import "./InventoryTable.css";

export const InventoryTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/products/");

      // Directly setting the fetched data if it's an array
      if (Array.isArray(response.data)) {
        setDataSource(response.data);
      } else {
        message.error("No products found.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      message.error(
        "Failed to fetch products: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setDataSource((prevDataSource) =>
        prevDataSource.filter((item) => item._id !== id)
      );
      message.success("Item deleted successfully.");
    } catch (error) {
      message.error(
        "Failed to delete the item: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <Table
      columns={[
        {
          title: "Thumbnail",
          dataIndex: "images",
          render: (images) => (
            <img
              src={images[0]?.secure_url}
              alt="Thumbnail"
              style={{ width: 60, height: 60, borderRadius: "14px" }}
            />
          ),
          align: "center",
        },
        {
          title: "Title",
          dataIndex: "name",
        },
        {
          title: "Price",
          dataIndex: "biddingStartPrice",
          render: (value) => `₹${value}`,
        },
        {
          title: "Category",
          dataIndex: "category",
        },
        {
          title: "Mobile Number",
          dataIndex: "mobileNumber",
        },
        {
          title: "Action",
          dataIndex: "_id",
          render: (id) => (
            <Popconfirm
              title="Are you sure to delete this item?"
              onConfirm={() => handleDelete(id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          ),
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
  );
};
