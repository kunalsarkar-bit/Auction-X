import axios from "axios";


export const getComment = () => {
  return axios.get("https://dummyjson.com/comments").then((res) => res.data);
};

// Fetch Orders
export const fetchOrders = async () => {
  const response = await axios.get('http://localhost:5000/api/orders/');
  return response.data; // Returns all orders
};

// Fetch Inventory
export const fetchInventory = async () => {
  const response = await axios.get('http://localhost:5000/api/products/');
  return response.data; // Returns all inventory items
};

// Fetch Customers
export const fetchCustomers = async () => {
  const response = await axios.get('http://localhost:5000/api/admin/getuser');
  return response.data; // Returns all customers
};
