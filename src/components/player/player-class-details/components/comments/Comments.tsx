import { Comment, ICommentProps } from "./Comment";

interface ICommentsProps {
    comments: ICommentProps[];
}

export const Comments = ({ comments }: ICommentsProps) => {

    return (
        <div className="flex max-w-4xl flex-col gap-4">
            {comments.length === 0 && (
                <div className='rounded-2xl border border-border bg-paper p-8 text-center text-text-muted'>
                    Os comentários não estão disponíveis para esta aula.
                </div>
            )}
            {comments.map((comment, index) => (
                <Comment key={`${comment.author.userName}-${comment.publishDate}-${index}`} {...comment} />
            ))}
        </div>
    )
}
