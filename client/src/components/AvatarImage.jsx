import Avatar from "boring-avatars";

const AvatarImage = ({ name, ...rest }) => {
  return (
    <div {...rest}>
      <Avatar
        size={35}
        name={name}
        colors={["#5E412F", "#FCEBB6", "#78C0A8", "#F07818", "#F0A830"]}
        square
      />
    </div>
  );
};

export default AvatarImage;
