import { Prisma } from "@prisma/client";
import ProductItem from "./product-item";
import { Key } from "react";

interface ProductListProps {
    products:  Prisma.ProductGetPayLoad<{
        include:{
            restaurant:{
                select:{
                    name: true,
                };
            };
        };
    }>;
}

const  ProductList= async ({products}: ProductListProps) => {
    

    return ( 
      <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
        {products.map((product: { id: Key | null | undefined; }) => (
            <ProductItem key={product.id} product={product}/>
        ))}

      </div>
    );
}
 
export default ProductList ;