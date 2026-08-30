import Image from 'next/image';
import Link from 'next/link';

export interface ICardProps {
    href: string;
    image: string;
    title: string;
    description: string;
}

export const Card = ({ title, description, image, href }: ICardProps) => {
    return (
        <Link href={href} className='hover:no-underline'>
            <article className='flex gap-2 flex-col p-2 rounded sm:hover:big-primary'>
                <Image
                    height={0}
                    src={image}
                    alt={title}
                    width={1000}
                    draggable={false}
                    className='aspect-video object-cover rounded-2xl'
                />

                <h4 className='font-extrabold text-lg'>
                    {title}
                </h4>

                <p className='line-clamp-3 sm:line-clamp-4 md:line-clamp-5'>
                    {description}
                </p>
            </article>
        </Link>
    )
}