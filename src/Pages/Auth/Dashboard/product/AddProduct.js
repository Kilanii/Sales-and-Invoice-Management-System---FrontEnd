import { useEffect, useState } from "react";
import {GetCategories, GetSupplier, createCategory, createproduct } from "../../../../Api/Api";
import { Axios } from "../../../../Api/axios";
import { Button, Form } from "react-bootstrap";

function AddProduct() {
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
  });
  const [categories, setcategory] = useState([]);
  const [suppliers, setSupplier] = useState([]);
  const [categorydata, setcategorydata] = useState([]);
  const [suppliersdata, setSuppliersData] = useState([])


  const categoriesShow = categories.map((category, index) => (
    <option key={index} value={category.id}>{category}</option>
  ))

  const supplierShow = suppliers.map((supplier, index) => (
    <option key={index} value={supplier.id}>{supplier}</option>
  ))

  useEffect(() => {
    Axios.get(`/category/${GetCategories}`)
    .then((response) => {
      const categoryName = response.data.data.map(category => category.name);

      setcategory(categoryName);
    }) .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Axios.get(`/supplier/${GetSupplier}`)
    .then((response) => {
      const supplierNames = response.data.data.suppliers.map(supplier => supplier.suplier_name);
      const suppliersdata = response.data.data.suppliers
      setSuppliersData(suppliersdata)
      setSupplier(supplierNames);
    }) .catch((err) => console.log(err));
  }, []);


  async function handleSubmit(e) {
    e.preventDefault();
  

    try {
      const selectedCategory = categorydata.find(category => category.name === form.category);
    if (!selectedCategory) {
      console.log("Catégorie non trouvée");
      return;
    }
    const categoryId = selectedCategory.id;

    const selectedSupplier = suppliersdata.find(supplier => supplier.suplier_name === form.supplier);
    if (!selectedSupplier) {
      console.log("Fournisseur non trouvé");
      return;
    }
    const supplierId = selectedSupplier.id;
      await Axios.post(`/product/${createproduct}/${categoryId}/${supplierId}`, form);
      alert("Nouveau produit ajouté");
      window.location.pathname = "dashboard/products";
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({...form, [name]: value });
  }
  console.log(form);

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
          name="unit"
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
export default AddProduct;
