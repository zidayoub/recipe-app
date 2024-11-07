import { Recipe } from "@/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface RecipeCardProps {
    recipe: Recipe;
    onViewRecipe: (id: string) => void;
}

export function RecipeCard({ recipe, onViewRecipe }: RecipeCardProps) {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div
            className="group relative cursor-pointer"
            onClick={() => onViewRecipe(recipe.id)}
        >
            <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
            </div>
            <div className="mt-2">
                <div className="flex items-center">
                    <span className="text-sm text-gray-500">{recipe.category}</span>
                    <button
                        className="ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-lg transition-all hover:scale-105 active:scale-95"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsLiked(!isLiked);
                        }}
                        aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
                    >
                        <Heart
                            className={`w-5 h-5 transition-colors ${isLiked
                                    ? "fill-red-500 stroke-red-500"
                                    : "stroke-gray-600"
                                }`}
                        />
                        <span className="sr-only">Add to favorites</span>
                    </button>
                </div>
                <h3 className="font-medium">{recipe.title}</h3>
            </div>
        </div>
    );
} 