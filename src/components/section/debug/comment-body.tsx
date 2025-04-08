import DebugCommentItem from "./comment-item";

export default function DebugCommentBody() {
  return (
    <div className="max-w-[800px] mx-auto my-10 flex flex-col gap-4">
      <h5>댓글 2개</h5>
      <div className="flex flex-col gap-6">
        <DebugCommentItem
          avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWYIJzyH5XYkX1bil-e1aIAvP_4XdCMaXbA&s"
          createdAt="2025-04-02"
          content="인정합니다"
          username="202513158 이규연"
        />
        <DebugCommentItem
          avatar="https://scontent-hkg4-1.cdninstagram.com/v/t51.2885-19/473668738_1784396792380130_4622307441393584052_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=104&ccb=1-7&_nc_sid=f7ccc5&_nc_ohc=fS6FEgVqw_8Q7kNvgFKii0b&_nc_oc=AdkiW1zAnDTBRykfrOg9CNNqCPrV8EbW8C6koqgPDOR4eRA7VthE3FuqVLI5rfB0N_0&_nc_ad=z-m&_nc_cid=0&_nc_zt=24&_nc_ht=scontent-hkg4-1.cdninstagram.com&oh=00_AYFsXX5G4VQJAN8lxWB8xZnvqFUJO9FRZIb_7FTb2kDsGA&oe=67F1D920"
          createdAt="2025-04-02"
          content="ㅠㅠ정"
          username="202513124 유유정"
        />
      </div>
    </div>
  );
}
