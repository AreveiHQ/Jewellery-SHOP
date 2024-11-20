import Product from "@/components/ProductPage/Product";

export  default async function Page({params}){
    const {id} = await params;
    return( <>

        <div className="p-0 md:p-2">
        <Product id={id}/>
        </div>

    </>
    )
}