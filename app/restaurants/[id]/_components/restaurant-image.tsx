"use client";

import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Restaurant} from "@prisma/client";

interface RestaurantImageProps{
    restaurant: Pick<Restaurant, 'name' |'imageUrl'>
}

const RestaurantImage = ({restaurant}: RestaurantImageProps) => {

    const router = useRouter();
    const handleBackClick =() =>  router.back();

    return (
        <div className="relative w-full h-[215px]">
        <Image src={restaurant.imageUrl
        }
        alt={restaurant.name} 
        fill 
        className="object-cover"
        />

        <Button className="absolute top-4 left-4 rounded-full bg-white text-foreground hover:text-white" size="icon"
        onClick={handleBackClick}>
            <ChevronLeftIcon/>
        </Button>

        <Button
                        size="icon"
                        className="absolute top-4 right-4 bg-gray-700 rounded-full ">
                        <HeartIcon size={18} className="fill-white" />

                    </Button>
    </div>
      );
}
 
export default RestaurantImage;