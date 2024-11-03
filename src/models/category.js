import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
        bannerImages:[{
                type:String,
        }
        ],
        image:{
                type:String,
        },
        name:{
                type:String,
                required:true,
                maxlength:50
        },
        parentCategory:{
                type:String,
                required:true,
                enum: ['rings', 'necklaces', 'earrings', 'bracelets', 'anklets', 'watches', 'other'],
        },
    
})

const Category = mongoose.models.Category||mongoose.model("Category",categorySchema);
export default Category;