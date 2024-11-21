import { useEffect, useState } from "react";
import { fetchOrders } from "../../../pages/Admin/Data/Data"; // Assuming this function fetches orders
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchOrders() // Fetch orders from the backend
      .then((res) => {
        // Assuming res is an array of order objects
        if (Array.isArray(res)) {
          let labels = res.map((order) => order.name); // Use `name` for labels
          let datas = res.map((order) => {
            // Calculate revenue (30% of highest bid or bidding start price)
            const highestBid =
              order.highestBid > 0 ? order.highestBid : order.biddingStartPrice;
            return highestBid * 0.3; // Use 30% of highest bid as revenue
          });

          const data = {
            labels,
            datasets: [
              {
                label: "Revenue",
                data: datas,
                backgroundColor: "red", // Customize the color
              },
            ],
          };
          setRevenueData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching orders: ", error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Order Revenue",
      },
    },
  };

  return (
    <div className="chartshow">
      <Bar options={options} data={revenueData} style={{ width: 310 }} />
    </div>
  );
};

export default Chart;
