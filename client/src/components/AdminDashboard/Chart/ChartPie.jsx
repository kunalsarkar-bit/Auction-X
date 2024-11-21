import { useEffect, useState } from "react";
import { fetchInventory } from "../../../pages/Admin/Data/Data";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

// Register the ArcElement for pie charts
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchInventory().then((res) => {
      const labels = [];
      const dataValues = [];

      // Assuming 'res' directly returns products array
      res.forEach((product) => {
        labels.push(product.name);
        dataValues.push(product.biddingStartPrice); // Assuming biddingStartPrice as the revenue for now
      });

      const data = {
        labels,
        datasets: [
          {
            label: "Revenue per Product",
            data: dataValues,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
            borderWidth: 1,
          },
        ],
      };

      setPieData(data);
    });
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows control over height and width
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="piechart-container">
      <h3 className="piechart-title">Revenue Distribution by Product</h3>
      <div style={{ height: "400px", width: "400px" }}>
        {" "}
        {/* Set the height of the chart */}
        <Pie options={options} data={pieData} />
      </div>
    </div>
  );
};

export default PieChart;
