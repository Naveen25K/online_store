import {
  Avatar,
  Button,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Input,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = (props) => {
  // all product fetched in this state

  const [product, setProduct] = useState([]);

  // store the target item which is comes from view and update buttons click

  const [targetItem, setTargetItem] = useState([]);

  // show product state

  const [open, setOpen] = useState(false);

  // show update product state

  const [openUpdate, setOpenUpdate] = useState(false);

  // new state for update item

  const [editedProduct, setEditedProduct] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    image: "",
  });

  // set data in editedproduct state when targetItem state get change

  // destruturing targetitem state to use in useEffect seteditproduct state

  const { id, title, description, price, image } = targetItem;

  useEffect(() => {
    setEditedProduct({
      id: id,
      title: title,
      description: description,
      price: price,
      image: image,
    });
  }, [targetItem]);

  // destructring props

  // fetch product from api
  const fetchProduct = () => {
    const { newAddedProduct } = props;
    setProduct(newAddedProduct);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  // delete product
  const deleteProduct = (id) => {
    const result = confirm("Are you sure you want to delete this product");
    if (result == true) {
      const restProduct = product.filter((item) => item.id !== id);
      setProduct(restProduct);
    }
  };

  // handle click open

  const handleClickOpen = (item) => {
    setTargetItem(item);
    setOpen(true);
  };

  // hand click close

  const handleClose = () => {
    setOpen(false);
  };

  // handle update close and finally update the products

  const handleUpdateClose = (data) => {
    const newProductList = product.map((product) =>
      product.id === data.id ? data : product
    );
    setProduct(newProductList);
    setOpenUpdate(false);
  };

  // handle update Open

  const handleUpdateOpen = (item) => {
    setTargetItem(item);
    setOpenUpdate(true);
  };

  // onchagne update button

  const updateChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };
  console.log(product);

  // category filter
  const categoryFilter = () => {
    let { newAddedProduct, category } = props;
    console.log(newAddedProduct);

    if (category !== "") {
      if (category === "all") {
        setProduct(newAddedProduct);
      } else {
        const categoryProduct = newAddedProduct.filter(
          (val) => val.category === category
        );
        setProduct(categoryProduct);
      }
    }
  };
  useEffect(() => {
    categoryFilter();
  }, [props.category]);

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "80px" }}>Products</h1>
      <div className="products">
        {product.map((item) => {
          return (
            <CardContent className="product_content">
              <div>
                <Avatar
                  sx={{ width: "180px", height: "180px", objectFit: "contain" }}
                  src={item.image}
                ></Avatar>

                <Typography mt={5} variant="h5">
                  ${item.price}
                </Typography>
              </div>
              <div className="crud_btn">
                {/* view product  */}
                <Button
                  variant="outlined"
                  onClick={() => handleClickOpen(item)}
                >
                  View
                </Button>

                {/* view dialong box open to show the details of the products  */}

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle variant="h5" id="alert-dialog-title">
                    {"Product Details"}
                  </DialogTitle>
                  <DialogContent>
                    <Avatar
                      sx={{
                        width: "180px",
                        height: "180px",
                        objectFit: "contain",
                      }}
                      src={targetItem.image}
                    ></Avatar>

                    <Typography mt={5} variant="h5">
                      {targetItem.title}
                    </Typography>

                    <Typography mt={5} variant="p">
                      {targetItem.description}
                    </Typography>

                    <Typography mt={5} variant="h5">
                      {targetItem.price}
                    </Typography>
                  </DialogContent>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={handleClose}
                    autoFocus
                  >
                    Return To Store
                  </Button>
                </Dialog>

                {/* upate product button  */}
                <Button
                  variant="outlined"
                  onClick={() => handleUpdateOpen(item)}
                >
                  Update
                </Button>

                {/* show dialog box to update the product  */}

                <Dialog
                  open={openUpdate}
                  onClose={handleUpdateClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle variant="h5" id="alert-dialog-title">
                    {"Update Product Details"}
                  </DialogTitle>
                  <DialogContent>
                    <h4>Title</h4>
                    <Input
                      type="text"
                      mt={5}
                      variant="h5"
                      value={editedProduct.title}
                      name="title"
                      onChange={updateChange}
                    />
                    <h4>Discription</h4>
                    <Input
                      type="text"
                      mt={5}
                      variant="p"
                      value={editedProduct.description}
                      name="description"
                      onChange={updateChange}
                    />
                    <h4>Price</h4>
                    <Input
                      type="number"
                      mt={5}
                      variant="h5"
                      value={editedProduct.price}
                      name="price"
                      onChange={updateChange}
                    />
                    <h4>Image URL</h4>
                    <Input
                      type="text"
                      mt={5}
                      variant="h5"
                      value={editedProduct.image}
                      name="image"
                      onChange={updateChange}
                    />
                  </DialogContent>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleUpdateClose(editedProduct)}
                    autoFocus
                  >
                    Update Product
                  </Button>
                </Dialog>

                {/* delete product button  */}
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteProduct(item.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          );
        })}
      </div>
    </>
  );
};

export default Product;
