// ProfilePage.tsx
import Navbar from "@/components/home/Navbar";
import HostCard from "@/components/user/HostCard";
import PostedRoom from "@/components/user/PostedRoom";
import ReviewCard from "@/components/user/ReviewCard";
import { UserDetailRes } from "@/models/user";
import UserService from "@/services/UserService";
import { useAppStore } from "@/store";
import { timeAgo } from "@/utils/converter";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const { userInfo } = useAppStore();
  const [user, setUser] = useState<UserDetailRes>();
  const location = useLocation();
  const { userID } = location.state || {};

  useEffect(() => {
    const userService = new UserService();
    const fetchUser = async () => {
      try {
        const response = await userService.getUserByID(userID, token);
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    if (token) {
      fetchUser();
    }
  }, [token]);

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className=" p-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col max-w-5xl mx-auto">
          <h1 className="text-xl font-semibold mb-6 text-gray-20">
            Trang cá nhân
          </h1>
          <div className="mb-6">
            <HostCard
            avatar_url={user?.avatar_url}
              full_name={user?.full_name}
              role={user.role === 1 ? "Chủ nhà" : "Khách thuê"}
              total_rating={user.total_rating}
              avg_rating={user.avg_rating}
              total_room={user.total_room}
            />
          </div>
          <section className="">
            <h2 className="text-xl font-semibold mb-4 text-gray-20">
              Bài đánh giá
            </h2>
            <div className="flex space-x-4">
              {user.rating_info.map((rating, index) => (
                <ReviewCard
                  key={index}
                  reviewerName={rating.rater_name}
                  reviewerAvatar={rating.rater_avatar}
                  reviewText={rating.comment}
                  rating={rating.rate}
                  pros={rating.happy}
                  cons={rating.unhappy}
                  reviewTime={timeAgo(rating.created_at)}
                />
              ))}
            </div>
          </section>
          {userInfo?.role === 1 &&(<section>
            <PostedRoom title={" Danh sách phòng trọ"} />
          </section>)}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
