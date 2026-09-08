import { Comment, ICommentProps } from "./Comment";

interface ICommentsProps {
    comments: ICommentProps[];
}

export const Comments = ({ comments }: ICommentsProps) => {

    return (
        <div className="flex gap-2 flex-col">
            {comments.map(comment => (
                <Comment key={comment.publishDate} {...comment} />
            ))}
        </div>
    )
}