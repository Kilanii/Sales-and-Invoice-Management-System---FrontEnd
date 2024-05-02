import { useState } from "react";
import { createSupplier } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Button, Form, Alert } from "react-bootstrap";

function CreateSupplier() {
  const [formData, setForm] = useState({
    supplier_name: "",
    contact:"",
    address: "",
    description: "",
  });
  
  const [disable, setDisable] = useState(true);
  const [errors, setErrors] = useState({});

  const validateName = (supplier_name) => {
    // Validation: Le nom doit comporter jusqu'à 10 caractères, pas seulement des chiffres.
    const regex = /^[a-zA-Z0-9\s]{1,10}$/;
    return regex.test(supplier_name);
  };

  const validateContact = (contact) => {
    // Validation: Contact must contain exactly 8 digits.
    const regex = /^\d{8}$/;
    return regex.test(contact);
};

  const validateAddress = (address) => {
    // Validation: L'adresse peut comporter jusqu'à 12 caractères.
    const regex = /^[a-zA-Z0-9\s,.-]{1,12}$/;
    return regex.test(address);
  };

 // Add the handleFormChange function
const handleFormChange = (e) => {
  const { name, value } = e.target;
  setForm((prevForm) => ({ ...prevForm, [name]: value }));

  // Validate the changed field
  let valid = true;
  const newErrors = {};

  // Perform validation for each field and update errors
  if (name === "supplier_name" && !validateName(value)) {
      newErrors.supplier_name = "Le nom doit comporter jusqu'à 10 caractères et peut contenir des lettres, chiffres et espaces.";
      valid = false;
  } else {
      delete newErrors.supplier_name;
  }

  if (name === "contact" && !validateContact(value)) {
    newErrors.contact = "Le contact doit comporter exactement 8 chiffres.";
    valid = false;

} else {
  delete newErrors.contact;
}


  if (name === "address" && !validateAddress(value)) {
      newErrors.address = "L'adresse doit comporter jusqu'à 12 caractères.";
      valid = false;
  } else {
      delete newErrors.address;
  }

  // Update errors state and disable state based on validation
  setErrors(newErrors);

  // Disable the form submit button if there are any errors or any required fields are missing
  const formValid = Object.keys(newErrors).length === 0 &&
  formData.supplier_name &&
  formData.contact &&
  formData.address &&
  formData.description;
  setDisable(!formValid);
};

// Modify handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
      const response = await Axios.post(`/supplier/${createSupplier}`, formData);
        
      // Check response for status code or data indicating success
      if (response.status === 201) {
          alert("Nouveau fournisseur ajouté avec succès.");
          window.location.pathname = "/dashboard/supplier";
      } else {
          console.log("Unexpected response status:", response.status);
          // Log the server response data for further investigation
          console.log("Server response data:", response.data);
      }
  } catch (error) {
      if (error.response) {
          console.log("Server responded with an error:", error.response.data);
      } else {
          console.log("Error occurred during the request:", error);
      }
  }
};

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Ajouter un nouveau fournisseur</h1>

      <Form.Group controlId="supplier_name">
        <Form.Label>Nom du fournisseur</Form.Label>
        <Form.Control
          name="supplier_name"
          type="text"
          placeholder="Entrez le nom du fournisseur..."
          value={formData.supplier_name}
          onChange={handleFormChange}
          required
        />
        {errors.supplier_name && <Alert variant="danger">{errors.supplier_name}</Alert>}
      </Form.Group>

      <Form.Group controlId="contact">
        <Form.Label>Contact</Form.Label>
        <Form.Control
          name="contact"
          type="number"
          placeholder="Entrez le numéro de contact du fournisseur..."
          value={formData.contact}
          onChange={handleFormChange}
          required
        />
        {errors.contact && <Alert variant="danger">{errors.contact}</Alert>}
      </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Adresse</Form.Label>
        <Form.Control
          name="address"
          type="text"
          placeholder="Entrez l'adresse..."
          value={formData.address}
          onChange={handleFormChange}
          required
        />
        {errors.address && <Alert variant="danger">{errors.address}</Alert>}
      </Form.Group>

      <Form.Group controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          placeholder="Entrez la description..."
          value={formData.description}
          onChange={handleFormChange}
        />
      </Form.Group>

      <Button disabled={disable} type="submit" className="btn btn-primary">
          Ajouter le fournisseur
      </Button>
    </Form>
  );
}

export default CreateSupplier;