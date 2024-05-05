"use client";

import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { calculateProductTotalPrice, formatCurrency } from "@/app/_helpers/price"
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: true,
        };
    }>;
    complementaryProdructs: Prisma.ProductGetPayload<{
        include:{
            restaurant:true
        }
    }>[];
}


const ProductDetails = ({ product, complementaryProdructs }: ProductDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick = () => setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick = () => setQuantity((currentState) => {
        if (currentState === 1) return 1;
        return currentState - 1;
    });

    return (
        <div className="py-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl  rounded-tr-3xl bg-white">
            {/* {Restaurante} */}
            <div className="flex items-center gap-[0.375rem] px-5">
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
            <h1 className="font-semibold text-xl mb-3 mt-1 px-5"> {product.name}</h1>

            {/* {preco produto e quantidade} */}
            <div className="flex justify-between px-5">
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
                        <ChevronLeftIcon />
                    </Button>
                    <span className="w-4">{quantity}</span>
                    <Button size="icon" onClick={handleIncreaseQuantityClick}>
                        <ChevronRightIcon />

                    </Button>
                </div>
            </div>

            {/* {dados entrega} */}
            <div className="px-5">
            <Card className="flex justify-around py-3 mt-6 ">
                {/* {custo} */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs">Entrega</span>
                        <BikeIcon size={14} />
                    </div>

                    {Number(product.restaurant.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">{formatCurrency(Number(product.restaurant.deliveryFee))}
                        </p>
                    ) : (
                        <p className="text-xs font-semibold">Grátis</p>
                    )}
                </div>


                {/* { tempo de entrega} */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <span className="text-xs">Entrega</span>
                        <TimerIcon size={14} />
                    </div>
                    <p className="text-xs font-semibold">{product.restaurant.deliveryTimeMinutes} min
                    </p>
                </div>
            </Card>
            </div>

            <div className="mt-6 space-y-3 px-5">
                 <h3 className="font-semibold">Sobre</h3>
                 <p className="text-muted-foreground text-sm">{product.description}</p>
            </div>

            <div className="mt-6 space-y-3 px-5">
                 <h3 className="font-semibold">Sucos</h3>
                 <ProductList products={complementaryProdructs}/>

                 
            </div>
        </div>
    );
};

export default ProductDetails;