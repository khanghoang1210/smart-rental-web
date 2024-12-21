type PersonalButtonProps = {
  name?: string;
  avatarUrl?: string;
  role?: string;
};

const PersonalButton = (props: PersonalButtonProps) => {
  return (
    <div className="flex items-center space-x-4 px-4 py-1 rounded-lg border border-gray-80 shadow-sm">
      <img
        src={props.avatarUrl}
        alt=""
        className="w-10 h-10 rounded-full object-cover "
      />
      <div>
        <p className="text-gray-20 font-semibold text-sm">{props.name}</p>
        <p className="text-blue-60 text-xs">{props.role}</p>
      </div>
    </div>
  );
};
export default PersonalButton;
