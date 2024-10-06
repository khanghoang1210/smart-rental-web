
const messages = [
  { id: 1, name: 'Elmer Laverty', lastMessage: 'Haha oh man 🔥', time: '12m', status: 'Yêu cầu thuê' },
  { id: 2, name: 'Florencio Dorrance', lastMessage: 'wooohooo', time: '24m', status: 'Lịch hẹn mới' },
];

const MessageList = () => {
  return (
    <div className="flex flex-col bg-white  w-1/4 h-full overflow-y-auto">
      <div className="p-4">
        <input
          type="text"
          placeholder="Tìm kiếm tin nhắn"
          className="bg-gray-90 text-gray-20 w-full h-12 px-4 py-2  rounded-lg focus:outline-none"
        />
      </div>
      {messages.map((msg) => (
        <div key={msg.id} className="flex items-center px-4 py-4 rounded-xl hover:bg-blue-98 cursor-pointer">
          <img
            src={`https://via.placeholder.com/40?text=${msg.name[0]}`}
            alt={msg.name}
            className="rounded-full w-10 h-10 mr-4"
          />
          <div className="flex flex-col ">
            <span className="font-semibold text-gray-20">{msg.name}</span>
            <span className="text-sm text-gray-60">{msg.lastMessage}</span>
          </div>
          <span className="ml-auto text-xs text-gray-80">{msg.time}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
