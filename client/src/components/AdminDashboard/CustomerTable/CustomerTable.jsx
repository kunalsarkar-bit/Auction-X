import { Avatar, Table, Button, Popconfirm, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import "./CustomerTable.css";

export const CustomerTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  // Function to fetch customers from the backend
  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/admins/customers"
      ); // Adjust the endpoint as necessary
      setDataSource(response.data.users); // Adjust according to your API response
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to delete a customer
  const deleteCustomer = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admins/customers/${id}`); // Adjust the endpoint as necessary
      setDataSource(dataSource.filter((user) => user._id !== id)); // Update the local state
      toast.success("User deleted successfully.");
    } catch (error) {
      console.error("Failed to delete customer:", error);
    }
  };

  useEffect(() => {
    fetchCustomers(); // Fetch customers when the component mounts
  }, []);

  return (
    <Table
      columns={[
        {
          title: "Image",
          dataIndex: "profilePic",
          render: (value) => <Avatar src={value[0]?.secure_url} />,
          align: "center",
        },
        {
          title: "Name",
          render: (text, record) => `${record.name}`,
          defaultSortOrder: "ascend",
        },
        {
          title: "Gender",
          dataIndex: "gender",
          render: (gender) => gender.charAt(0).toUpperCase() + gender.slice(1),
          align: "center",
        },
        {
          title: "Email",
          dataIndex: "email",
        },
        {
          title: "Phone No.",
          dataIndex: "phoneNo",
        },
        {
          title: "Address",
          dataIndex: "address",
          render: (value) => value,
        },
        {
          title: "Delete",
          dataIndex: "delete",
          align: "center",
          render: (_, record) =>
            record.role === "admin" ? (
              <Tooltip title="Admins cannot be deleted">
                <Button type="primary" danger disabled>
                  Delete
                </Button>
              </Tooltip>
            ) : (
              <Popconfirm
                title="Are you sure to delete this customer?"
                onConfirm={() => deleteCustomer(record._id)}
              >
                <Button type="primary" danger>
                  Delete
                </Button>
              </Popconfirm>
            ),
        },
      ]}
      loading={isLoading}
      dataSource={dataSource.map((item) => ({ ...item, key: item._id }))}
      pagination={{
        defaultPageSize: 6,
        position: ["bottomLeft"],
        showTotal: (total) => <b>Total {total} Customers</b>,
      }}
      bordered={true}
    />
  );
};
