import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import RestaurantImage from "./_components/restaurant-image";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import DeliveryInfo from "@/app/_components/delivry-info";
import ProductList from "@/app/_components/product-list";

interface RestaurantPageProps {
    params: {
        id: string
    }
}
const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {
    const restaurant = await db.restaurant.findUnique({
        where:{
            id,
        },
        include:{
            categories: true,
            Product: {
                take:10,
                include:{
                    restaurant:{
                        select:{
                            name: true,
                        }
                    }
                }
            }
        }
    });

if (!restaurant) {
    return notFound();
}

return (
    <div>
        <RestaurantImage restaurant={restaurant} />

        <div className="flex justify-between items-center px-5 pt-5">
            {/* {Titulo} */}
            <div className="flex items-center gap-[1px]">
                <div className="relative h-8 w-8">
                    <Image
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <h1 className="font-semibold text-xl">{restaurant.name}</h1>
            </div>
            <div className=" bg-gray-700 py-[2px] px-2 rounded-full flex items-center left-2 top-2 gap-[2px]">
                <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
                <span className="font-semibold text-xs text-white">5.0</span>
            </div>
        </div>
        <div className="px-5">
            <DeliveryInfo restaurant={restaurant} />
        </div>

        <div className="flex overflow x-scroll gap-4 [&:: webkit-scrollbar]:hidden px-5 mt-3">
            {restaurant.categories.map((category) => (
            <div 
            key={category.id} 
            className="bg-[#f4f4f4] min-w-[167px] rounded-lg text-center"
            >
                <span className="text-muted-foreground text-xs">{category.name}
                </span>
            </div>
            ))}
            </div>

            <div className=" mt-6 space-y-4">
                {/* {TODO: Mostrar mais pedidos} */}
                <h2 className="font-semibold px-5">Mais Pedidos</h2>
                <ProductList products={restaurant.Product} />

            </div>

        </div>
   
);
}

export default RestaurantPage;