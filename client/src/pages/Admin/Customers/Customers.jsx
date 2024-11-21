import { Space, Typography } from "antd";
import { CustomerTable } from "../../../components/AdminDashboard/CustomerTable/CustomerTable";

const Customers = () => {
  return (
    <div className="customers">
      <Space direction="vertical" wrap={true}>
        <Typography.Title level={3} style={{ color: "white" ,textAlign: "center", textDecoration :"underline"}}>Customers</Typography.Title>
        <CustomerTable />
      </Space>
    </div>
  );
};

export default Customers; // Ensure this is a default export
