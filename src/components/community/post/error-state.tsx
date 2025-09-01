interface PostErrorStateProps {
  error: string;
}

export default function PostErrorState({ error }: PostErrorStateProps) {
  return (
    <main className="p-5 border rounded-md bg-background shadow-2xl dark:shadow-white/2 h-fit">
      <div className="flex flex-col justify-center items-center py-20">
        <div className="text-red-500 mb-4">⚠️ 오류 발생</div>
        <div className="text-center text-gray-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
        >
          다시 시도
        </button>
      </div>
    </main>
  );
}
