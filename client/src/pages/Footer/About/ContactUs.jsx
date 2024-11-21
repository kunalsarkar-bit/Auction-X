import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUs.css";
import { toast } from "react-hot-toast";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ submitted: false, error: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch name and email from local storage
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    const storedEmail = localStorage.getItem("email") || "";
    setFormData((prevData) => ({
      ...prevData,
      name: storedName,
      email: storedEmail,
    }));
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitted: false, error: false });
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/products/contact-us",
        formData
      ); // Replace with your actual API endpoint
      setStatus({ submitted: true, error: false });
      toast.success("Message sent successfully!");
      window.location.href = "/";
      setFormData({ name: "", email: "", subject: "", message: "" }); // Clear the form
    } catch (error) {
      setStatus({ submitted: true, error: true });
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <h2 className="mb-4 head1 text-white mt-3">CONTACT US</h2>

      <Row>
        {/* Contact Form */}
        <Col md={5} sm={5} className="contact-form">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly // Make the name field read-only
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Control
                type="email"
                placeholder="Your Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                readOnly // Make the email field read-only
              />
            </Form.Group>
            <Form.Group controlId="formSubject" className="mt-3">
              <Form.Control
                type="text"
                placeholder="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mt-3">
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              className="mt-3"
              variant="warning"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send Message"}
            </Button>
          </Form>
        </Col>

        {/* Google Map and Contact Info */}
        <Col md={6} sm={12} className="mt-4 mt-md-0">
          <div className="contact-map-container">
            {/* Embed the updated iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3687.915358412205!2d88.29752217419212!3d22.432211379591955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPailan%20College%20of%20Technology%20and%20Management!5e0!3m2!1sen!2sin!4v1731865790151!5m2!1sen!2sin"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="contact-info mt-3">
            <p>
              <i className="fas fa-map-marker-alt"></i> Pailan College of
              Technology and Management, West Bengal, India
            </p>
            <p>
              <i className="fas fa-envelope"></i> info@example.com
            </p>
            <p>
              <i className="fas fa-phone"></i> +012 345 67890
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
