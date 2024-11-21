import { Card, Space, Statistic } from "antd";
import PropTypes from "prop-types";
import './DSCard.css'; // Import the CSS file for the card styles

export const DSCard = ({ title, number, icon }) => {
  return (
    <Card className="ds-card"> {/* Optional: add a class for specific styling */}
      <Space direction="horizontal" size={8}>
        {icon}
        <Statistic value={number} title={title} />
      </Space>
    </Card>
  );
};

DSCard.propTypes = {
  title: PropTypes.string,
  number: PropTypes.number,
  icon: PropTypes.node,
};
