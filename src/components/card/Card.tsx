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
        <Link href={href} className='group block h-full hover:no-underline'>
            <article className='flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-paper transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:bg-paper-elevated hover:shadow-[0_20px_55px_rgba(0,0,0,0.34)]'>
                <div className='overflow-hidden'>
                {image ? (
                    <Image
                        height={360}
                        src={image}
                        alt={title}
                        width={640}
                        sizes='(min-width: 640px) 18rem, 100vw'
                        draggable={false}
                        className='aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.035]'
                    />
                ) : (
                    <div aria-hidden className='aspect-video w-full bg-paper-elevated' />
                )}
                </div>

                <div className='flex flex-1 flex-col gap-3 p-5'>
                    <h3 className='text-lg font-black leading-snug transition-colors group-hover:text-primary'>
                        {title}
                    </h3>

                    <p className='line-clamp-3 text-sm leading-6 text-text-muted'>
                        {description}
                    </p>
                </div>
            </article>
        </Link>
    )
}
