import productModel from "../models/productModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import APIFilters from "../utils/apiFilters.js";
import ErrorHandler from "../utils/errorHandler.js"


// get all products :   GET   /api/v1/products
export const getProducts = catchAsyncErrors(
    async (req, res, next) => { 

        // apply searching, filtering and pagination on products based on the query before sending the results
        const apiFilters = new APIFilters(productModel, req.query);

        // do the searching, filtering and pagination 
        apiFilters.search().filters();

        // result before applying pagination
        let products = await apiFilters.queryRes;
        let filteredProductsCount = products.length;

        // for pagination purpose
        const resultsPerPage = 5;

        // after applying pagination
        apiFilters.pagination(resultsPerPage);
        products = await apiFilters.queryRes.clone();
        const currPageFilteredProductsCount = products.length;

        // const products = await productModel.find();
    
        res.status(200).json({
            currPageFilteredProductsCount,
            resultsPerPage,
            filteredProductsCount,
            products,
        });
    }
);


// create a new product : POST   /api/v1/admin/products
export const newProduct = catchAsyncErrors(

    async (req, res, next) => {

        // add user in the product
        req.body.user = req.user._id;

        // create a new product
        const product = await productModel.create({...req.body});
    
        res.status(200).json({
            product,
        });
    }

);


// get a single product detail :   GET    /api/v1/products/:id
export const getProductDetails = catchAsyncErrors(

    async (req, res, next) => {

        // log the current user
        console.log(req.user)

        // if user is found, do something



        const product = await productModel.findById(req?.params?.id);

        if(!product) {
            return next(new ErrorHandler("Product not found with given id", 404));
        };
        
        res.status(200).json({
            product,
        });
    } 
);

// update a single product detail :   PUT    /api/v1/admin/products/:id
export const updateProduct = catchAsyncErrors(

    async (req, res, next) => {
        let product = await productModel.findById(req?.params?.id);
    
        if(!product) {
            return next(new ErrorHandler("Product not found with given id", 404));
        };
    
        product = await productModel.findByIdAndUpdate(req.params?.id, req.body, {new : true});
        
        res.status(200).json({
            product,
        });
    }
);



// Get products - ADMIN : GET  /api/v1/admin/products
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).json({
    products,
  });
});



// delete a single product detail : DELETE    /api/v1/admin/products/:id
export const deleteProduct = catchAsyncErrors(

    async (req, res, next) => {
        // find the product based on the id
        let product = await productModel.findById(req?.params?.id);
        
        // if product is not found, send a error message to the user
        if(!product) {
            return next(new ErrorHandler("Product not found with given id", 404));
        };
        
        // if product is found, then delete it
        product = await productModel.findByIdAndDelete(req.params.id);
        
        // after successfull deletion, send the successa
        res.status(200).json({
            success : true,
            message : "product deleted successfully",
        }); 
    }
    
);

