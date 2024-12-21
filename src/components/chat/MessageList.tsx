import { ConversationRes } from "@/models/chat/chat";
import ConversationService from "@/services/ConversationService";
import UserService from "@/services/UserService"; // Assuming you have a service to get user details
import { useAppStore, useConversationStore } from "@/store";
import { UserInfo } from "@/store/slice/authSlice";
import { timeAgo } from "@/utils/converter";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface UserMap {
  [key: number]: UserInfo;
}

const MessageList = () => {
  const { setSelectedConversationId, setSelectedUserId } =
    useConversationStore();
  const { userInfo } = useAppStore();
  const [conversations, setConversations] = useState<ConversationRes[]>([]);
  const [users, setUsers] = useState<UserMap>({});
  const conversationService = new ConversationService();
  const userService = new UserService();
  const [cookies] = useCookies(["token"]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const token = cookies.token;
        if (token && userInfo?.id) {
          const conversationRes =
            await conversationService.getConversationByCurrentUser(token);
          // Ensure that the response data is an array, handle cases where it's not
          const fetchedConversations = Array.isArray(conversationRes.data.data)
            ? conversationRes.data.data
            : [];
          setConversations(fetchedConversations);

          // Fetch user details for each conversation
          fetchedConversations.forEach(
            async (conversation: ConversationRes) => {
              const otherUserId =
                conversation.user_a === userInfo.id
                  ? conversation.user_b
                  : conversation.user_a;
              if (otherUserId && !users[otherUserId]) {
                try {
                  const userRes = await userService.getUserByID(
                    otherUserId,
                    token
                  );
                  if (userRes.status === 200) {
                    const fetchedUser = userRes.data.data;
                    setUsers((prevUsers) => ({
                      ...prevUsers,
                      [otherUserId]: fetchedUser,
                    }));
                  }
                } catch (error) {
                  console.error(
                    `Error fetching user with ID ${otherUserId}:`,
                    error
                  );
                }
              }
            }
          );
        } else {
          console.log("No token or user info available");
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [cookies.token, userInfo?.id, users]);

  return (
    <div className="flex flex-col bg-white w-1/4 h-full overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Tìm kiếm tin nhắn"
          className="bg-gray-90 text-gray-20 w-full h-12 px-4 py-2 rounded-lg focus:outline-none"
        />
      </div>
      {conversations.map((conversation) => {
        const otherUserId =
          conversation.user_a === userInfo?.id
            ? conversation.user_b
            : conversation.user_a;
        const user = users[otherUserId]; // Get user details from fetched users
        return (
          <div
            key={conversation.id}
            className="flex items-center px-4 py-4 rounded-xl hover:bg-blue-98 cursor-pointer"
            onClick={() => {
              setSelectedConversationId(conversation.id);
              // setSelectedUserId(user.id);
            }}
          >
            <img
              src="../../asset"
              alt={user ? user.full_name : "Unknown User"}
              className="rounded-full w-10 h-10 mr-4"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-20">
                {user ? user.full_name : "Unknown User"}
              </span>
              <span className="text-sm text-gray-60">
                {conversation.last_message.type === 2
                  ? "Yêu cầu được chấp nhận"
                  : conversation.last_message.content}
              </span>
            </div>
            <span className="ml-auto text-xs text-gray-80">
              {timeAgo(conversation.last_message.created_at.toString())}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
