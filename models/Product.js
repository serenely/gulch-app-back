import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required:true
  },
  currency: {
    type: String,
    default: '$'
  },
  imageUrl:{
    type: String,
    required:true
  }, 
  tags: {
    type: Array,
    default: [],
  }, 
},{
  timestamps: true
});

export default mongoose.model('Product', ProductSchema)