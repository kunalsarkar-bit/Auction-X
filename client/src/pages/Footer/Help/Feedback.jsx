import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { InputGroup, Row, Col, Button, Alert } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-hot-toast";
import './Feedback.css';

function FeedbackForm() {
  const [displayForm, setDisplayForm] = useState(true);
  const [emValue, setEmValue] = useState("");
  const [nmValue, setNmValue] = useState("");
  const [phValue, setPhValue] = useState();
  const [checkedVal, setCheckedVal] = useState([]);
  const [errorMsg, setErrorMsg] = useState(
    "Please enter the value for the above field"
  );
  const [showErrors, setShowErrors] = useState(false);

  // Fetch values from localStorage once
  useEffect(() => {
    setEmValue(localStorage.getItem("email") || "");
    setNmValue(localStorage.getItem("name") || "");
  }, []);

  const handleOnChange = (isChecked, value) => {
    let temp = [...checkedVal];
    const pre = value.split("_")[0];
    if (isChecked) {
      temp = temp.filter((item) => item.split("_")[0] !== pre);
      temp.push(value);
      setCheckedVal(temp);
    } else {
      setCheckedVal(temp.filter((item) => item !== value));
    }
  };

  const validateForm = () => {
    setErrorMsg("Please enter the value for the above field");
    setShowErrors(true);

    if (!nmValue) return false;
    if (!emValue || !emValue.includes("@") || !emValue.endsWith(".com")) {
      setErrorMsg("Invalid Email");
      return false;
    }
    if (!phValue || phValue.length < 10) {
      setErrorMsg("Invalid Phone number");
      return false;
    }
    if (checkedVal.length < Object.keys(feedbackType).length) return false;

    return true;
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const entry = {
          email: emValue,
          name: nmValue,
          phone: phValue,
          checkbox_values: checkedVal,
        };

        const response = await axios.post(
          "http://localhost:5000/api/products/submit",
          entry
        );
        toast.success("Feedback sent successfully");
        setDisplayForm(false);
      } catch (error) {
        console.error("Error submitting feedback:", error);
        setErrorMsg(
          "There was an error submitting your feedback. Please try again later."
        );
      }
    }
  };

  const feedbackType = {
    qos: "How easy was it to place a bid on items?",
    qob: " How would you rate the support you received from our team?",
    roc: "Was it easy to find the items you were looking for?",
    exp: "Please rate your overall experience.",
  };

  const feedbackOpts = ["Excellent", "Good", "Bad"];

  return (
    <div style={{ marginTop: "170px", marginBottom: "100px" }} className="Feedback-Page">
      <Container>
        {displayForm ? (
          <Card>
            <Card.Header>
              <cite title="Source Title">
                We are committed to providing you with the best Auction
                experience possible, so we welcome your comments.
              </cite>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                Please fill out this questionnaire.
              </blockquote>
            </Card.Body>
            <Container className="padding30px">
              <Form onSubmit={formSubmit}>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Label className="required-field">
                        Customer Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        readOnly
                        value={nmValue}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="required-field">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        required
                        readOnly
                        value={emValue}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                      <Form.Label className="required-field">Phone</Form.Label>
                      <InputGroup>
                        <PhoneInput
                          placeholder="Enter phone number"
                          value={phValue}
                          onChange={setPhValue}
                        />
                      </InputGroup>
                      {showErrors && (!phValue || phValue.length < 10) && (
                        <Alert variant="danger" id="phone_er">
                          &#9432; {errorMsg}
                        </Alert>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  {Object.keys(feedbackType).map((ty) => (
                    <Col key={ty}>
                      <Form.Group className="mb-3" controlId={ty}>
                        <Form.Label className="required-field">
                          {feedbackType[ty]}
                        </Form.Label>
                        <InputGroup>
                          <div className="mb-3">
                            {feedbackOpts.map((opt, key) => (
                              <Form.Check
                                inline
                                key={`${ty}_${key}`}
                                label={opt}
                                name={`${ty}_feedback_opts`}
                                id={`${ty}_${key}`}
                                checked={checkedVal.includes(`${ty}_${opt}`)}
                                onChange={(e) =>
                                  handleOnChange(
                                    e.target.checked,
                                    `${ty}_${opt}`
                                  )
                                }
                                type="checkbox"
                                value={opt}
                              />
                            ))}
                          </div>
                        </InputGroup>
                      </Form.Group>
                      {showErrors &&
                        !checkedVal.some((val) => val.startsWith(ty)) && (
                          <Alert variant="danger" id={`er_${ty}`}>
                            &#9432; {errorMsg}
                          </Alert>
                        )}
                    </Col>
                  ))}
                </Row>
                <Button type="submit" className="btn_purp">
                  Submit Review
                </Button>
              </Form>
            </Container>
          </Card>
        ) : (
          <Card bg="light" text="dark">
            <Card.Body>
              <div className="padding30px">
                <div className="circle">
                  <div className="checkmark"></div>
                </div>
              </div>
              <Card.Text>Thank you for providing the feedback.</Card.Text>
              <Form.Text muted>
                We will work towards improving your experience.
              </Form.Text>
              <div className="padding30px">
                <Button
                  className="btn_purp"
                  onClick={() => (window.location.href = "/")}
                >
                  Close
                </Button>
              </div>
            </Card.Body>
          </Card>
        )}
      </Container>
    </div>
  );
}

export default FeedbackForm;
