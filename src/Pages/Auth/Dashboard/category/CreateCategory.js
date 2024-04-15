import { useState } from "react";
import { baseUrl, createCategory } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function Addcategory() {
  const [title, setTitle] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("name", title);
    try {
      await axios.post(`http://127.0.0.1:8000/api/category/create-category`, form);
      alert("New category Added");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add New category</h1>
      <Form.Group controlId="formTitle">
        <Form.Label>category Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category Name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={title.length < 1}>
        Add category
      </Button>
    </Form>
  );
}
export default Addcategory;
