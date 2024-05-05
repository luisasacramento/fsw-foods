"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductItemProps {
    product: Prisma.ProductGetPayLoad<{
        include: {
            restaurant: {
                select: {
                    name: true,
                };
            };
        };
    }>;
}

const ProductItem = ({ product }: ProductItemProps) => {


    return (
        <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
            <div className="space-y-2 w-full">

                <div className="h-[150px] w-full relative">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover rounded-lg shadow-md" />

                    {product.discountPercentage && (
                        <div className="absolute   bg-primary py-[2px] px-2 text-white rounded-full flex items-center left-2 top-2 gap-[2px]">
                            <ArrowDownIcon size={12} />
                            <span className="font-semibold text-xs">{product.discountPercentage}%</span>
                        </div>
                    )}
                </div>

                <div className="">
                    <h2 className="text-sm truncate">{product.name}</h2>
                    <div className="flex gap-1 items-center">
                        <h3 className="font-semibold">
                            {formatCurrency(calculateProductTotalPrice(product))}
                        </h3>

                        {product.discountPercentage > 0 && (
                            <span className="line-through text-muted-foreground text-xs">{formatCurrency(Number(product.price))}</span>
                        )}
                    </div>
                    <span className="block text-muted-foreground text-xs">{product.restaurant.name}</span>
                </div>






            </div>


        </Link>

    );
}

export default ProductItem;