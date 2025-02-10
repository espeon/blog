import Comments from "@/components/comments/Comments";
import Card from "@/components/ui/card";

export default function CommentsTest() {
  return (
    <div className="h-full mt-4 w-screen max-w-full">
      <Card className="text-4xl mt-4 pl-4 max-w-full">
        <h1 className="text-4xl mt-4 pl-4">Guestbook</h1>
        <div className="text-xl mt-2 pl-4">
          Join in{" "}
          <a
            href="https://bsky.app/profile/natalie.sh/post/3lcyqskf5rk2j"
            className="text-purple-700 dark:text-purple-400"
          >
            on Bluesky
          </a>
          .
        </div>
        <div className="text-base">
          <Comments
            did="natalie.sh"
            postCid="3lcyqskf5rk2j"
            skipFirst={false}
          />
        </div>
      </Card>
    </div>
  );
}
