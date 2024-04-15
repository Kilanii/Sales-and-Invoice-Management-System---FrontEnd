import { useState } from "react";
import { ADDC, createCategory } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function CreateSupplier() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    address: "",
    details: "",
    p_credit: "",
  });

  const handleContactChange = (e) => {
    const value = e.target.value;
    const contactPattern = /^\d{0,8}$/;
    if (contactPattern.test(value)) {
      setForm((prevForm) => ({ ...prevForm, contact: value }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://127.0.0.1:8000/api/supplier/create-supplier`, form);
      alert("New product added.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add New Supplier</h1>

      <Form.Group controlId="name" className="mb-6">
        <Form.Label>Supplier Name</Form.Label>
        <Form.Control
          name="name"
          type="text"
          placeholder="Enter Supplier Name..."
          value={form.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="contact" className="mb-6">
        <Form.Label>Contact</Form.Label>
        <Form.Control
          name="contact"
          type="text"
          placeholder="Enter Contact Number of Supplier..."
          value={form.contact}
          onChange={handleContactChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="address" className="mb-6">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="address"
          placeholder="Enter Address..."
          value={form.address}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="details" className="mb-6">
        <Form.Label>Details</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="details"
          placeholder="Enter Details..."
          value={form.details}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="p_credit" className="mb-6">
        <Form.Label>Previous Credit Balance</Form.Label>
        <Form.Control
          type="text"
          name="p_credit"
          placeholder="Enter Previous Credit Balance..."
          value={form.p_credit}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button disabled={disable} type="submit" className="btn btn-primary">
          Add Supplier
      </Button>
    </Form>
  );
}

export default CreateSupplier;