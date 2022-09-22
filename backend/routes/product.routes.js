module.exports = app => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Create a new Product
  router.post("/", products.create);

  // Retrieve all products
  router.get("/", products.findAll);

  // Retrieve all published products
  router.get("/published", products.findAllPublished);

  // Retrieve a single Product with id
  router.get("/:id", products.findOne);

  // Update a Product with id
  router.put("/:id", products.update);

  // Delete a Product with id
  router.delete("/:id", products.delete);

  // Delete all products
  router.delete("/", products.deleteAll);

  app.use("/products", router);
};
