"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import { Button } from "@/app/_components/ui/button";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price"
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps{
    product: Prisma.ProductGetPayload<{
        include:{
            restaurant:true,
        }
    }>
}


const ProductDetails = ({product}: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick = () => setQuantity((currentState) => {
        if(currentState === 1) return 1;
        return currentState -1;
    });

    return ( 
        <div className="p-5">
                {/* {Restaurante} */}
                <div className="flex items-center gap-[0.375rem]">
                    <div className="relative h-6 w-6">
                        <Image
                            src={product.restaurant.imageUrl}
                            alt={product.restaurant.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <span className="text-xs text-muted-foreground">{product.restaurant.name}</span>



                </div>


                {/* {Nome do produto} */}
                <h1 className="font-semibold text-xl mb-3 mt-1"> {product.name}</h1>

                {/* {preco produto e quantidade} */}
                <div className="flex justify-between">
                    {/* {preco com desconto} */}
                    <div >
                        <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-xl">{formatCurrency(calculateProductTotalPrice(product))}</h2>
                        {product.discountPercentage > 0 && (
                            <DiscountBadge product={product} />
                        )}
                        </div>
                        {/* {Preco ORIginal} */}
                        {product.discountPercentage > 0 && (
                            <p className="text-sm text-muted-foreground">De:   {formatCurrency(Number(product.price))}</p>
                        )}


                    </div>
                    {/* Quantidade} */}
                    <div className="flex gap-3 items-center text-center">
                        <Button 
                        size="icon" variant="ghost" className="border border-solid border-muted-foreground"
                        onClick={handleDecreaseQuantityClick}>
                            <ChevronLeftIcon/>
                        </Button>
                       <span className="w-4">{quantity}</span>
                        <Button size="icon" onClick={handleIncreaseQuantityClick}>
                        <ChevronRightIcon/>

                        </Button>
                    </div>
                </div>
            </div>
    )
}
 
export default ProductDetails;