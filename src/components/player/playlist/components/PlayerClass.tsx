'use client';
import { MdCheckCircle, MdCircle, MdPlayCircleOutline } from "react-icons/md";

export interface IPlayerClassProps {
    done: boolean;
    title: string;
    playing: boolean;

    onPlay: () => void;
    onCheck: () => void;
}

export const PlayerClass = ({ title, playing, done, onCheck, onPlay }: IPlayerClassProps) => {

    return (
        <button type="button" data-playing={playing} className="group/item flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-text-muted transition hover:bg-paper-elevated hover:text-text data-[playing=true]:bg-primary/10 data-[playing=true]:text-text" onClick={onPlay}>
            <div className="group shrink-0 text-primary" onClick={e => { e.stopPropagation(); onCheck(); }}>
                {!done
                    ? (
                        <>
                            <MdPlayCircleOutline
                                size={24}
                                className="min-w-6 group-hover:hidden"
                            />
                            <MdCircle
                                size={24}
                                className="min-w-6 hidden group-hover:block"
                            />
                        </>
                    )
                    : (
                        <MdCheckCircle
                            size={24}
                            className="min-w-6 text-green-400"
                        />
                    )
                }
            </div>

            <div className="flex min-w-0 flex-col items-start gap-1">
                <p
                    data-done={done}
                    className="line-clamp-2 text-start text-sm font-bold data-[done=true]:text-green-400"
                >
                    {title}
                </p>

                {playing && (
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-extrabold leading-4 text-primary">
                        Reproduzindo
                    </span>
                )}
            </div>
        </button>
    )
}
