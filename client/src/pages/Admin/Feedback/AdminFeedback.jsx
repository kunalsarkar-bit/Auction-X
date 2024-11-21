import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminFeedback.css";

function AdminFeedback() {
  const navigate = useNavigate();
  const { id } = useParams(); // Capture `id` from the URL
  const [entries, setEntries] = useState([]);
  const [displayDetail, setDisplay] = useState(false);
  const [singleEntry, setSingleEntry] = useState({
    name: "",
    email: "",
    phone: "",
    checkbox_values: [],
  });

  useEffect(() => {
    // Fetch entries from the backend
    const fetchEntries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admins/feedback"
        ); // Adjust the URL as needed
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchEntries();
  }, []);

  useEffect(() => {
    // Check if we need to display a single entry based on the URL `id`
    if (entries.length && id) {
      const entry = entries.find((item) => item._id === id);
      if (entry) {
        setSingleEntry(entry);
        setDisplay(true);
      }
    } else {
      // If there is no `id` in the URL, reset to list view
      setDisplay(false);
    }
  }, [entries, id]);

  const handleCheckVal = (ty, entry) => {
    let val = "";
    if (entry.checkbox_values.length > 0) {
      val = entry.checkbox_values.find((item) => item.split("_")[0] === ty);
      val = val ? val.split("_")[1] : "";
    }
    return val;
  };

  const singleEntryForm = () => {
    return (
      <Container>
        <Card>
          <Card.Header>
            <cite title="Source Title">Feedback Details</cite>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>Customer Name</Col>
              <Col>{singleEntry.name}</Col>
            </Row>
            <Row>
              <Col>Email</Col>
              <Col>{singleEntry.email}</Col>
            </Row>
            <Row>
              <Col>Phone</Col>
              <Col>{singleEntry.phone}</Col>
            </Row>
            {Object.keys(feedback_type).map((ty) => (
              <Row key={ty}>
                <Col>{feedback_type[ty]}</Col>
                <Col>{handleCheckVal(ty, singleEntry)}</Col>
              </Row>
            ))}
          </Card.Body>
        </Card>
        <button
          className="btn btn-primary mt-3 AdminFeedback-button"
          onClick={() => navigate("/admin/feedback")}
        >
          Back to All Entries
        </button>
      </Container>
    );
  };

  const feedback_type = {
    qos: "Service",
    qob: "Quality",
    roc: "Delivery",
    exp: "Satisfaction",
  };

  return (
    <>
      {displayDetail ? (
        singleEntryForm()
      ) : (
        <div className="padding30px">
          {entries.length === 0 ? (
            <p>No feedbacks yet</p>
          ) : (
            <Table striped hover responsive>
              <thead>
                <tr>
                  <th>Form Details</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {Object.keys(feedback_type).map((ty) => (
                    <th key={ty}>{feedback_type[ty]}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id}>
                    <td>
                      <button
                        className="AdminFeedback-button"
                        onClick={() => navigate(`/admin/feedback/${entry._id}`)}
                      >
                        View Details
                      </button>
                    </td>
                    <td>{entry.name}</td>
                    <td>{entry.email}</td>
                    <td>{entry.phone}</td>
                    {Object.keys(feedback_type).map((ty) => (
                      <td key={ty}>{handleCheckVal(ty, entry)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}
    </>
  );
}

export default AdminFeedback;
