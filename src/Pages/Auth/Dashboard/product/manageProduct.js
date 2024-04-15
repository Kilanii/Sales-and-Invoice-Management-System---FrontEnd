import { useEffect, useState } from "react";
import {createCategory } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

function ManageProduct() {
  const [form, setForm] = useState({
    title:"Select Category",
    model:"",
    s_price:"",
    serialNumber:"",
    category:"",
    unit:"",
    tax:"",
    supplier:"",
    p_price:"",
  });
  const [image, setImage] = useState([]);
  const [categories, setcategoies] = useState([]);
  const [suppliers, setSupplier] = useState([]);

  const categoriesShow = categories.map((item)=> <option key={key} value={item.id}>{item.title}</option>)
  const supplierShow = suppliers.map((item)=> <option key={key} value={item.id}>{item.title}</option>)

  useEffect(() => {
    Axios.get(`${category}`)
      .then((data) => setcategory(data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`${suppliers}`)
      .then((data) => setcategory(data.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const fetchProductData = async () => {
        try {
            const response = await axios.get(`/api/products/${productId}`);
            const product = response.data;
            setForm({
                title: product.title,
                model: product.model,
                s_price: product.s_price,
                serialNumber: product.serialNumber,
                category: product.category,
                unit: product.unit,
                tax: product.tax,
                supplier: product.supplier,
                p_price: product.p_price,
            });
            setImage(product.image); // Assuming product image URL is stored in the form state
        } catch (error) {
            console.error(error);
        }
    };
  fetchProductData();
}, [productId]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
  });
    formData.append("image", image);
    try {
      await Axios.post(`${createCategory}`, form);
      alert("New product Added");
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e){
  e.preventDefault();
    setForm({...form, [e.target.name]: e.target.value })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Add New category</h1>
      <div className="row">
        <Form.Group controlId="title" className="col-md-6">
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          name="supplier"
          type="text"
          placeholder="Enter product Name..."
          value={form.title}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="serialNumber" className="col-md-6">
        <Form.Label>Serial Number</Form.Label>
        <Form.Control
          name="supplier"
          type="text"
          placeholder="Enter Serial Number..."
          value={form.serialNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>
      </div>
      
      <Form.Group controlId="model" className="mb-6">
        <Form.Label>model</Form.Label>
        <Form.Control
          name="supplier"
          type="text"
          placeholder="Enter model..."
          value={form.model}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="category">
        <Form.Label>category Name</Form.Label>
        <Form.Select
          type="text"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
            <option disabled>Select Category</option>
            {categoriesShow}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="s_price">
        <Form.Label>Selling Price</Form.Label>
        <Form.Control
          type="file"
          value={form.s_price}
          onChange={handleChange}
          name="s_price"
          required
        />
      </Form.Group>
      <Form.Group controlId="unit">
        <Form.Label>Unit</Form.Label>
        <Form.Control
          name="unit"
          value={form.unit}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="image">
        <Form.Label>Image</Form.Label>
        <Form.Control
          name="image"
          value={image}
          //"multiple" ki tabda chtab3eth akther men img 
          onChange={(e) => setImage(e.target.files)}
          required
        />
      </Form.Group>
      <Form.Group controlId="tax">
        <Form.Label>Tax</Form.Label>
        <Form.Control
        name="tax"
          value={form.tax}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="supplier">
        <Form.Select
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
        >
            {supplierShow}
        </Form.Select>
      </Form.Group>
      <Form.Group controlId="p_price">
        <Form.Control
          name="p_price"
          value={form.p_price}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={title.length < 1}>
        Add Product
      </Button>
    </Form>
  );
}
export default ManageProduct;
