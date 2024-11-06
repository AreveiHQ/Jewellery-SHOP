import Product from '@/models/productModel';
import mongoose from 'mongoose'
let isConnected = false;
export async function connect() {
        try{
        if (isConnected) {
                        console.log('Using existing database connection');
                        Product.createIndexes({ name: "text", description: "text", category:"text",subCategory:"text",collection:"text"})
                        return;
        }
        mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;
        connection.on('connected',()=>{
                isConnected = true;
                console.log("Mongodb connected successfully");
        })
        connection.on('disconnected',()=>{
                isConnected = false;
                console.log("Mongodb disconnected ");
        })
        connection.on('error',(err)=>{
                console.log("Mongodb connected error, Please make sure mongodb is running"+err);
                process.exit();
        })
        }catch(error){
                console.error('Something goes wrong!'); 
        }
}