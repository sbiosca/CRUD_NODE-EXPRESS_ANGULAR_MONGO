let mongoose = require('mongoose');
let slug = require('slug');


module.exports = mongoose => {
  var schema = new mongoose.Schema(
    {
      slug: {type: String, lowercase: true, unique: true},
      title: String,
      description: String,
      published: Boolean,
      category: String,
      author: String
    },
    { timestamps: true }
  );

  schema.pre('validate', (next) =>{
    next();
  });

  schema.methods.slugify = () => {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  };


  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Product = mongoose.model("product", schema);
  return Product;
};
