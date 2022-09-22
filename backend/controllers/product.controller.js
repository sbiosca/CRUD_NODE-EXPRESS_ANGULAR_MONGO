const db = require("../models");
const Product = db.prueba;



//Creamos el producto y lo guardamos en la db

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a product
  const product = new Product({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
    category: req.body.category,
    author: "sergi biosca beneyto"

  });


  // Save product in the database
  await product
    .save(product)
    .then(data => {
      res.send(data);
      //console.log(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the product."
      });
    });

};

// Buscar / encontrar todos los posibles productos de la base de datos
exports.findAll = async (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  await Product.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};

// Buscar el producto con su correspondiente id
exports.findOne = async (req, res, slug) => {
  const id = req.params.id;

  await Product.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found product with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving product with id=" + id });
    });

    
};

// Actualizar el producto correspondiente con su id
exports.update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  await Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update product with id=${id}. Maybe product was not found!`
        });
      } else res.send({ message: "product was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating product with id=" + id
      });
    });
};

// Borrar el producto correspondiente con su id
exports.delete = async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete product with id=${id}. Maybe product was not found!`
        });
      } else {
        res.send({
          message: "product was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete product with id=" + id
      });
    });
};

// Borrar todos los productos de la base de datos. REMOVEALL
exports.deleteAll = async (req, res) => {
  await Product.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} products were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products."
      });
    });
};

// Buscar todos los productos disponibles de la base de datos
exports.findAllPublished = async (req, res) => {
  await Product.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products."
      });
    });
};
