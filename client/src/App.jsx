import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    };
    getProducts();
  }, [products]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProduct = {
        name: name,
        quantity: quantity,
        price: price,
      };
      const response = await axios.post(
        "http://localhost:5000/api/products",
        newProduct
      );
      if (response.data) {
        alert("product added successfully");
      } else {
        alert("product not added");
      }
    } catch (error) {
      console.log(error);
    }
    setName("");
    setQuantity("");
    setPrice("");
  };

  const handleDelete = async (id) =>{
    try{
      const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
      if(response.status === 200){
        alert('product deleted successfully')
      }
      const newProducts = products.filter(product => product._id !== id);
      setProducts(newProducts);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="quantity">quantity</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label htmlFor="price">price</label>
        <input
          type="text"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
      <div>
        {products.map((product, _id) => {
          return (
            <>
              <div key={_id}>
                <h1>{product.name}</h1>
                <h2>{product.quantity}</h2>
                <h2>{product.price}</h2>
                <button onClick={() =>{
                  handleDelete(product._id)
                }}>delete</button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default App;
