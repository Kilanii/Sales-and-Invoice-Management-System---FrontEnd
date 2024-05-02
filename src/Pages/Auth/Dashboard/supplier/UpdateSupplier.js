import {useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Axios } from "../../../../Api/axios";
import {updatSupplier} from "../../../../Api/Api";
import { useParams } from "react-router-dom";

function UpdateSupplier() {
    const [form, setForm] = useState({
        name: "",
        contact: "",
        address: "",
        details: "",
        p_credit: "",
      });
      const { id } = useParams();
    
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
           await Axios.put(`/supplier/${updatSupplier}/${id}`, form );
          alert("Succeful");
          window.location.pathname = "dashboard/suppliers";
          console.log('Suppliers mise à jour avec succès:');
          // Optionally, you could add code here to handle successful updates (e.g., redirecting the user to a different page).
        } catch (error) {
          console.log(error)
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


      <Button disabled={form.length < 5} type="submit" className="btn btn-primary">
          Add Supplier
      </Button>
    </Form>
  );
}
export default UpdateSupplier;
