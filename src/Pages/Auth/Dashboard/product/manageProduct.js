import { useEffect, useState } from "react";
import {GetCategories, GetSupplier, Products,updateproduct } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { id } = useParams();
  const [form, setForm] = useState({
    
    name:"",
    category:"Select Category",
    model:"",
    sales_price:"",
    serial_number:"",
    unit:"",
    tax:"",
    supplier:"",
    purchase_price:"",
  })

  const [categories, setcategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const categoriesShow = categories.map((category, index) => (
    <option key={index} value={category}>{category}</option>
  ))
  const supplierShow = suppliers.map((supplier, index) => (
    <option key={index} value={supplier}>{supplier}</option>
  ))

console.log(supplierShow);
console.log(categoriesShow);
  useEffect(() => {
    Axios.get(`/category/${GetCategories}`)
    .then((response) => {
      const categoryName = response.data.data.map(category => category.name);
      console.log(categoryName);
      setcategory(categoryName);
    }) .catch((err) => console.log(err));
  }, []);
  console.log(categories)


  useEffect(() => {
    Axios.get(`/supplier/${GetSupplier}`)
    .then((response) => {
      const supplierNames = response.data.data.suppliers.map(supplier => supplier.suplier_name);
      console.log(supplierNames);
      setSupplier(supplierNames);
    }) .catch((err) => console.log(err));
  }, []);
  console.log(suppliers)

  useEffect(() => {
    const fetchProductData = async () => {
        try {
            const response = await axios.get(`/product/${Products}/${id}`);
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
            })
        } catch (error) {
            console.error(error);
        }
    };
  fetchProductData();
}, [{id}]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
  })
    try {
      await Axios.post(`/product/${updateproduct}/${id}`, form);
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
        name="name"
        type="text"
        placeholder="Enter product Name..."
        value={form.name}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Form.Group controlId="serial_number" className="col-md-6">
      <Form.Label>Serial Number</Form.Label>
      <Form.Control
        name="serial_number"
        type="text"
        placeholder="Enter Serial Number..."
        value={form.serial_number}
        onChange={handleChange}
        required
      />
    </Form.Group>
    </div>
    
    <Form.Group controlId="model" className="mb-6">
      <Form.Label>model</Form.Label>
      <Form.Control
        name="model"
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
          <option value="">Select Category</option>
          {categoriesShow}

      </Form.Select>
    </Form.Group>
    <Form.Group controlId="sales_price">
      <Form.Label>Selling Price</Form.Label>
      <Form.Control
        type="number"
        value={form.sales_price}
        onChange={handleChange}
        name="sales_price"
        required
      />
    </Form.Group>
    <Form.Group controlId="unit">
      <Form.Label>Unit</Form.Label>
      <Form.Control
        type="text"
        value={form.unit}
        onChange={handleChange}
        name="Unit"
        required
      />
    </Form.Group>
    
    <Form.Group controlId="tax">
      <Form.Label>Tax</Form.Label>
      <Form.Control
        type="number"
        value={form.tax}
        onChange={handleChange}
        name="tax"
        required
      />
    </Form.Group>
    <Form.Group controlId="supplier">
    <Form.Label>Supplier</Form.Label>
      <Form.Select
        name="supplier"
        value={form.supplier}
        onChange={handleChange}
      >
          <option value="">Select Supplier</option>
          {supplierShow}
      </Form.Select>
    </Form.Group>
    <Form.Group controlId="p_price">
    <Form.Label>Price</Form.Label>
      <Form.Control
      type="number"
        name="purchase_price"
        value={form.p_price}
        onChange={handleChange}
        required
      />
    </Form.Group>
    <Button variant="primary" type="submit" disabled={form.length < 1}>
      Add Product
    </Button>
  </Form>
  );
}
export default UpdateProduct;
