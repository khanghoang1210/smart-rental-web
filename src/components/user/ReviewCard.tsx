import { StarFilled } from "@ant-design/icons";
import React from "react";
import happy from "../../assets/happy.png";
import unhappy from "../../assets/unhappy.png";
import { USER_DEFAULT_AVATAR } from "@/utils/constants";

interface ReviewCardProps {
    reviewerName: string;
    reviewTime: string;
    rating: number;
    reviewText: string;
    pros: string;
    cons: string;
    reviewerAvatar?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
    reviewerName,
    reviewTime,
    rating,
    reviewText,
    pros,
    cons,
    reviewerAvatar = USER_DEFAULT_AVATAR,
}) => {
    return (
        <div className="bg-white p-4 w-1/4 border rounded-[20px]">
            <div className="flex items-center mb-2">
                <img
                    src={reviewerAvatar}
                    alt="Reviewer Avatar"
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                    <h4 className="font-bold text-sm text-gray-20">{reviewerName}</h4>
                    <p className="text-xs text-gray-40">{reviewTime}</p>
                </div>
            </div>
            <div className="flex space-x-1 mb-3">
                {[...Array(5)].map((_, index) => (
                    <StarFilled
                        key={index}
                        className={`text-md ${index < rating ? "text-[#FFCC47]" : "text-gray-80"}`}
                    />
                ))}
            </div>
            <p className="text-sm text-gray-40 mb-2">{reviewText}</p>
            <div className="text-sm text-gray-20">
                <p className="flex mb-3">
                    <img src={happy} alt="" className="w-5 h-5 mr-4" /> {pros}
                </p>
                <p className="flex ">
                    <img src={unhappy} alt="" className="w-5 h-5 mr-4" /> {cons}
                </p>
            </div>
        </div>
    );
};

export default ReviewCard;
