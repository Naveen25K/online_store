import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import Product from "./Product";

const Cards = ({ userData }) => {
  console.log("cards componet called");
  console.log(userData);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState([]);
  const [category, setCateogry] = useState("");

  // fetch product from api
  const fetchProduct = async () => {
    const data = await axios.get("https://fakestoreapi.com/products?limit=50");
    setNewProduct(data.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  // add data in this state from input field

  const [addProduct, setAddProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // open the pop up or dialog box

  const handleClickOpen = () => {
    setOpen(true);
  };

  // close the pop up or dialog box

  const handleClose = () => {
    addProduct.id !== ""
      ? newProduct.push(addProduct)
      : setNewProduct(newProduct);
    setOpen(false);
  };

  // setting all image title and price value in the input usestate

  const addChange = (e) => {
    const { name, value } = e.target;
    setAddProduct({
      ...addProduct,
      [name]: value,
    });
  };

  return (
    <>
      <div className="cards">
        <h2>Dashboard</h2>
        <div className="card_data">
          <CardContent>
            <Avatar
              sx={{ width: "100px", height: "100px" }}
              src={userData.photoURL}
            ></Avatar>
          </CardContent>
        </div>

        <div className="card_data">
          <h4>User Name</h4>
          <Typography variant="h6">{userData.displayName}</Typography>
        </div>

        <div className="card_data">
          <h4>User Email</h4>
          <Typography variant="h6">{userData.email}</Typography>
        </div>

        <div className="card_data">
          <h4>Total Product</h4>
          <Typography variant="h6">{newProduct.length}</Typography>
        </div>

        <div className="card_data">
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCateogry(e.target.value)}
          >
            <option value="all">All</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">jewelery</option>
            <option value="electronics">electronics</option>
            <option value="women's clothing">women's clothing</option>
          </select>
        </div>

        <div className="card_data">
          <Button variant="contained" color="success" onClick={handleClickOpen}>
            Add Product
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle variant="h5" id="alert-dialog-title">
              {"Add Product"}
            </DialogTitle>
            <DialogContent>
              <h4>ID</h4>
              <Input
                type="text"
                mt={5}
                variant="h5"
                value={addProduct.id}
                name="id"
                onChange={addChange}
              />
              <h4>Title</h4>
              <Input
                type="text"
                mt={5}
                variant="h5"
                value={addProduct.title}
                name="title"
                onChange={addChange}
              />
              <h4>Discription</h4>
              <Input
                type="text"
                mt={5}
                variant="p"
                value={addProduct.description}
                name="description"
                onChange={addChange}
              />
              <h4>Price</h4>
              <Input
                type="number"
                mt={5}
                variant="h5"
                value={addProduct.price}
                name="price"
                onChange={addChange}
              />
              <h4>Image URL</h4>
              <Input
                type="text"
                mt={5}
                variant="h5"
                value={addProduct.image}
                name="image"
                onChange={addChange}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="success"
                onClick={handleClose}
                autoFocus
              >
                Add
              </Button>
              {userData && (
                <Button variant="contained" color="error" autoFocus>
                  Logout
                </Button>
              )}
            </DialogActions>
          </Dialog>
        </div>
      </div>
      {newProduct.length !== 0 && (
        <Product newAddedProduct={newProduct} category={category} />
      )}
    </>
  );
};

export default Cards;
