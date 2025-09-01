import ImageUploader from "@/components/ui/image-upload";

export default function CommunityNewPostThumbnailSelector({
  onUpload,
}: {
  onUpload: (e: { imageURL: string; id: string }) => void;
}) {
  return (
    <div className="my-5 ">
      <ImageUploader
        onUpload={onUpload}
        label="이미지를 여기에 드래그하거나 여기를 클릭해 썸네일을 선택해 주세요.<br/>필수 항목이 아니며, 한 글 당 하나만 등록 가능합니다."
      />
    </div>
  );
}
