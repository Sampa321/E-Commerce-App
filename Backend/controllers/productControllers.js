import { toFile } from "@imagekit/nodejs"
import getImageKit from "../config/imagekit.js"
import productModel from "../models/productModel.js"

// function for add products
export async function addProduct(req, res) {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item != undefined)


        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                console.log("Uploading image:", item.originalname);
                try {
                    const result = await getImageKit().files.upload({
                        file: await toFile(item.buffer, item.originalname),
                        fileName: item.originalname,
                    });

                    if (!result.url) {
                        throw new Error("ImageKit upload did not return an image URL");
                    }

                    console.log("Upload successful:", result.fileId);
                    return result.url;
                } catch (error) {
                    console.error("ImageKit upload failed:");
                    console.error("Message:", error.message);
                    console.error("Status:", error.status);

                    throw error;
                }
            })
        );


        const productData = {
            name, description, category, price: Number(price), subCategory, bestseller: bestseller === "true" ? true : false, sizes: JSON.parse(sizes),  // convert string to array
            image: imagesUrl,
            date: Date.now()
        }


        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: "Product added!!" })

    } catch (error) {
        console.error("Add Product Error:", error.message);
        console.error("ImageKit details:", error);
        const statusCode = Number.isInteger(error.status) && error.status >= 400 && error.status < 600
            ? error.status
            : 500
        res.status(statusCode).json({ success: false, message: error.message })
    }
}



// Function for listing all products
export async function listProducts(req, res) {
    try {
        const products = await productModel.find({});

        console.log("Total products in database:", products.length);
        console.log("Product names:", products.map(p => p.name));

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// function for removing product
export async function removeProduct(req, res) {
    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: 'Product Removed' })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// function for single product info
export async function singleProduct(req, res) {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId);
        res.json({ success: true, product })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
