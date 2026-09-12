import Link from 'next/link';
import { MdHome } from 'react-icons/md'

interface IPlayerHeaderProps {
    title: string;
    subtitle: string;
}

export const PlayerHeader = ({ subtitle, title }: IPlayerHeaderProps) => {
    return (
        <header className='flex h-18 shrink-0 items-center gap-4 border-b border-border bg-paper/90 px-4 backdrop-blur-xl sm:px-6'>
            <Link href='/' aria-label='Voltar para a página inicial' className='grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border text-text-muted transition hover:border-primary/50 hover:bg-paper-elevated hover:text-primary'>
                <MdHome size={28} />
            </Link>

            <div className='flex min-w-0 flex-col'>
                <h1 className='line-clamp-1 font-black sm:text-lg'>
                    {title}
                </h1>
                <h2 className='line-clamp-1 text-sm text-text-muted'>
                    {subtitle}
                </h2>
            </div>
        </header>
    )
}
