import { Card, Space, Typography } from "antd";
import { DSCards } from "../../../components/AdminDashboard/DScards/DScards";
import Chart from "../../../components/AdminDashboard/Chart/Chart";
import PieChart from "../../../components/AdminDashboard/Chart/ChartPie";
import './Dashboard.css';

const DashBoard = () => {
  return (
    <div >
      <Space direction="vertical" size={"small"} wrap={true}>
        <Typography.Title level={3} style={{ color: "white" ,textAlign: "center", textDecoration :"underline"}}>Dashboard</Typography.Title>
        <DSCards />
        <Space 
          direction="horizontal" 
          wrap={true} 
          style={{ gap: '16px', justifyContent: 'space-between', width: '100%' }}
        >
          <Card 
            style={{ 
              flex: 1, 
              minWidth: '450px', 
            
              overflow: 'hidden', // Ensure content does not overflow
              marginBottom: '16px', // Spacing between cards
              marginLeft:"15px",
              minHeight:'360px'
            }} 
            title=" Chart " // Add title for better context
          >
            <Chart />
          </Card>
          <Card 
            style={{ 
              flex: 1, 
              minWidth: '300px', 
              height: '550px', 
              overflow: 'hidden', 
               marginLeft:"9px"
              
            }} 
            title=" Pie Chart " // Add title for better context
          >
            <PieChart />
          </Card>
        </Space>
      </Space>
    </div>
  );
};

export default DashBoard;
