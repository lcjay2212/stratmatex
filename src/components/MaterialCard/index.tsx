import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import BlackCheck from "../../assets/icons/black-check.png";

interface MaterialCardProps {
  image: string;
  title: string;
  subtitle?: string;
  onShowClick: () => void;
  className?: string;
}

export const MaterialCard: React.FC<MaterialCardProps> = ({
  image,
  title,
  onShowClick,
  className = "",
}) => {
  return (
    <Card
      className={`bg-black border-orange-500 border-4 overflow-hidden  rounded-none py-0 ${className}`}
    >
      <CardContent className="p-0">
        {/* Image Container */}
        <div className="aspect-square bg-black p-4">
          <div className="w-full h-full bg-gray-900 overflow-hidden flex items-center justify-center">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 text-center">
          <h3 className="text-white text-xl font-semibold mb-1">{title}</h3>
          {/* Show Button */}
          <Button
            type="submit"
            className="rounded-full my-4 bg-white text-black visible-focus:bg-primary hover:text-white cursor-pointer h-auto text-xl p-1"
            onClick={onShowClick}
          >
            <span className="ml-6 mb-1">Show</span>
            <span>
              <img src={BlackCheck} className="h-[40px]" />
            </span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
