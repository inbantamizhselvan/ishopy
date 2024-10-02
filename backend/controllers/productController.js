import {v2 as cloudinary} from "cloudinary";
import productModel from "../models/productModel.js";


//function for ADD product
const addProduct = async (req, res) => {
    try {
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item)=>item !== undefined);

        const imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url
            })
        )
        console.log("Fields", name, description, category, subCategory, sizes, bestseller)
        console.log(imagesURL);
        const productData ={
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesURL,
            date: Date.now()
        }
        const product = new productModel(productData);
        console.log(productData);
        await product.save();
        res.json({success:true, message: "Product Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});
    }

}

//function for List product
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({success:true, products});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//function for Remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message: "Product has been deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message});   
    }
}

//function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} = req.body;
        const product = await productModel.findById(productId);
        res.json({success:true, product});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});   
    }
}
const editProduct = async (req, res) => {
    try {
        const { productId, name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload new images if provided
        const imagesURL = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        // Find the product by ID and update fields
        const updatedData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            ...(imagesURL.length && { image: imagesURL }), // Only update images if new ones are provided
            date: Date.now()
        };

        const product = await productModel.findByIdAndUpdate(productId, updatedData, { new: true });

        res.json({ success: true, message: "Product Updated Successfully", product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { editProduct, listProduct, addProduct, removeProduct, singleProduct};