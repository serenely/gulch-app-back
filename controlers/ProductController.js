import ProductModel from "../models/Product.js"

export const create = async(req, res)=>{
  try {
    const doc = new ProductModel({
      title: req.body.title,
      text: req.body.text,
      price: req.body.price,
      currency: req.body.currency,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
    })
    
    const product = await doc.save();

    res.json(product)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:'failed to create product'
    })
  }
}
export const getAll = async (req, res ) => {
  try {
    const products = await ProductModel.find().exec()

    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:'failed to get products'
    })
  }
}
export const getOne = async (req, res) => {
  try {
    const productsId = req.params.id;

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { _id: productsId },
      { $inc: { viewsCount: 1 } },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Do not get a products',
    });
  }
};
export const remove = async (req, res) => {
  try {
    const productId = req.params.id;

    const removeProduct = await ProductModel.findOneAndDelete(
      { _id: productId },
    );

    if (!removeProduct) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json({
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Do not get a product',
    });
  }
};
export const update = async (req, res) => {
  try {
    const productId = req.params.id;

    await ProductModel.updateOne(
      {
        _id: productId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        price: req.body.price,
        currency: req.body.currency,
        imageUrl: req.body.imageUrl,
        tags: req.body.tags,
      },
    );

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Do not update a product',
    });
  }
}
