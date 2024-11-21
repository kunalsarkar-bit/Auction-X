import { Space, Typography } from "antd";
import { InventoryTable } from "../../../components/AdminDashboard/InventoryTable/InventoryTable";

const Inventory = () => {
  return (
    <div className="Inventory">
      <Space direction="vertical" wrap={true}>
        <Typography.Title level={3} style={{ color: "white" ,textAlign: "center", textDecoration :"underline"}}>Inventory</Typography.Title>
       
        <InventoryTable />
      </Space>
    </div>
  );
};

export default Inventory; // Ensure this is a default export
