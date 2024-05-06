import { Restaurant } from "@prisma/client";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
    restaurant: Restaurant
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
    return (
        <Link className="min-w-[266px] max-w-[266px]" href={`/restaurants/${restaurant.id}`}>
            <div className="w-full space-y-3">

                {/* {imagem} */}
                <div className="w-full h-[133px] relative">
                    <Image
                        src={restaurant.imageUrl}
                        alt="nome restaurante"
                        fill
                        className="object-cover rounded-lg"
                    />
                    <div className="absolute bg-white py-[2px] px-2 rounded-full flex items-center left-2 top-2 gap-[2px]">
                        <StarIcon size={12} className="fill-yellow-500 text-yellow-500" />
                        <span className="font-semibold text-xs">5.0</span>
                    </div>
                    <Button
                        size="icon"
                        className="absolute top-2 right-2 bg-gray-700 rounded-full h-7 w-7">
                        <HeartIcon size={16} className="fill-white" />

                    </Button>




                </div>
                {/* {texto} */}
                <div>
                    <h3 className="text-sm font-semibold">{restaurant.name}</h3>
                    {/* {Informações entrega} */}
                    <div className="flex gap-3">
                        {/* {Custo de entrega} */}
                        <div className="flex gap-1 items-center">
                            <BikeIcon className="text-primary" size={14} />
                            <span className="text-xs text-muted-foreground">
                                {Number(restaurant.deliveryFee) === 0
                                    ? "Entrega grátis"
                                    : formatCurrency(Number(restaurant.deliveryFee))}
                            </span>
                        </div>
                        {/* {tempo de entrega} */}
                        <div className="flex gap-1 items-center">
                            <TimerIcon className="text-primary" size={14} />
                            <span className="text-xs text-muted-foreground">
                                {restaurant.deliveryTimeMinutes}min

                            </span>
                        </div>

                    </div>
                </div>

            </div>
        </Link>


    )
}

export default RestaurantItem;