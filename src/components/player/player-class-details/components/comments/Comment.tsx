import { useMemo, useState } from 'react';
import { MdArrowDropDown, MdArrowDropUp, MdThumbUp } from 'react-icons/md';
import Image from 'next/image';
import { format, isValid, parseISO } from 'date-fns';

export interface ICommentProps {
    content: string;
    likesCount: number;
    publishDate: string;
    author: {
        image: string;
        userName: string;
    };
    replies?: ICommentProps[];
}

export const Comment = ({ author, content, likesCount, publishDate, replies }: ICommentProps) => {
    const [showReplies, setShowReplies] = useState(false);

    const date = useMemo(() => {
        const dateAsDate = parseISO(publishDate);
        if (!isValid(dateAsDate)) return null;

        return format(dateAsDate, "dd/MM/yyyy 'às' HH:mm");
    }, [publishDate]);

    return (
        <article className='flex flex-col gap-2'>
            <div className='flex items-start gap-3'>
                {author.image ? (
                    <Image
                        width={40}
                        height={40}
                        draggable={false}
                        className='rounded-xl'
                        src={author.image}
                        alt={`Imagem de perfil de ${author.userName}`}
                    />
                ) : (
                    <div aria-hidden className='h-10 w-10 shrink-0 rounded-xl bg-paper' />
                )}

                <div className='flex min-w-0 flex-1 flex-col gap-4 rounded-2xl border border-border bg-paper p-4'>
                    <div className='flex flex-wrap items-center gap-x-3 gap-y-1'>
                        <span className='font-bold'>
                            {author.userName}
                        </span>

                        {date && (
                            <span className='text-xs font-bold text-text-muted'>
                                {date}
                            </span>
                        )}
                    </div>

                    <p className='whitespace-pre-line leading-7 text-text-muted'>{content}</p>

                    <div className='flex gap-4 text-sm text-text-muted'>
                        <div className='flex items-center gap-1.5'>
                            <MdThumbUp />

                            <span>{likesCount}</span>
                        </div>

                        {(replies && replies.length > 0) && (
                            <button type='button' className='flex items-center gap-1 font-extrabold text-primary' onClick={() => setShowReplies(!showReplies)}>
                                {showReplies ? <MdArrowDropUp size={24} /> : <MdArrowDropDown size={24} />}

                                <span>{showReplies ? 'Ocultar' : 'Ver'} respostas ({replies.length})</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className='pl-12'>
                {showReplies && replies?.map((reply, index) => (
                    <Comment key={`${reply.author.userName}-${reply.publishDate}-${index}`} {...reply} />
                ))}
            </div>
        </article>
    )
}
