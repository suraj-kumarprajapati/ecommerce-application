import catchAsyncErrors from "../middlewares/catchAsyncError.js";
import productModel from "../models/productModel.js";
import ErrorHandler from "../utils/errorHandler.js";



// create or update review -> api/v1/reviews
export const createProductReview = catchAsyncErrors(
    async (req, res, next) => {

        // extract the rating, comment and productId from the request body
        const { rating, comment, productId } = req.body;

        // prepare review object
        const review = {
            user : req?.user._id,
            rating : Number(rating),
            comment : comment,
        }


        // find the product based on the product id
        const product = await productModel.findById( productId );

        // if product is not found in the database
        if(!product) {
            return next(new ErrorHandler(`product with the id : ${productId} not found`, 404));
        }


        // check whether the user has already reviewd this product
        const hasReviewed = product?.reviews.find( (r) => {
            return r?.user.toString() === req?.user?._id.toString();
        });

        
        // if the user has reviewd before, update the review
        if(hasReviewed) {
            
            product.reviews.forEach( (r) => {
                if(r?.user.toString() === req?.user?._id.toString()) {
                    r.comment = comment;
                    r.rating = rating;
                }
            });

        }
        else {
            // if user has not reviewed before
            product.reviews.push(review);
            product.numOfReviews = product.reviews.length;
        }

        // update the overall rating of this product
        if( product.reviews.length == 0 ) {
            product.ratings =  0;
        }
        else {
            // calculate the average rating
            product.ratings = product.reviews.reduce( (acc, r) => acc + r.rating, 0) / product.reviews.length;
        }

        // update the product with the updated reviews
        await product.save({ validateBeforeSave : false });
        
        // send the response to the user
        res.status(200).json({
            success : true,
        });                
    }
);



// get all the reviews of this product -> api/v1/reviews/:id
export const getAllReviews = catchAsyncErrors( 
    async (req, res, next) => {
        
        // find the product based on the id
        const product = await productModel.findById( req.params.id );

        // if product is not found
        if( !product ) {
            return next(new ErrorHandler("product not found", 404));
        }

        const reviews = product.reviews;

        res.status(200).json({
            reviews,
        });
    }
)