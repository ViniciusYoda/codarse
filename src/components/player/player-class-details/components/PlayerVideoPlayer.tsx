'use client';

import dynamic from 'next/dynamic';
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { MdPlayCircle } from 'react-icons/md';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

interface IPlayerVideoPlayerProps {
  videoId: string;
  onPlayNext: () => void;
}

export interface IPlayerVideoPlayerRef {
  setProgress: (seconds: number) => void;
}

export const PlayerVideoPlayer = forwardRef<IPlayerVideoPlayerRef, IPlayerVideoPlayerProps>(
  ({ videoId, onPlayNext }, playerRefToForward) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLVideoElement>(null);

    const [totalDuration, setTotalDuration] = useState<number>();
    const [progress, setProgress] = useState<number>();

    const secondsUntilEnd = useMemo(() => {
      if (totalDuration === undefined || progress === undefined) return undefined;

      return Math.max(0, Math.round(totalDuration - progress));
    }, [progress, totalDuration]);

    const showNextButton =
      secondsUntilEnd !== undefined && secondsUntilEnd > 0 && secondsUntilEnd <= 30;

    useImperativeHandle(playerRefToForward, () => ({
      setProgress(seconds) {
        if (playerRef.current) {
          playerRef.current.currentTime = seconds;
        }

        wrapperRef.current?.scrollIntoView({ behavior: 'smooth' });
      },
    }), []);

    return (
      <div ref={wrapperRef} className='relative h-full overflow-hidden bg-black shadow-[0_20px_80px_rgba(0,0,0,0.42)] lg:rounded-2xl'>
        {showNextButton && (
          <button
            type='button'
            onClick={onPlayNext}
            className='absolute right-4 top-4 z-10 flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 font-black text-primary-contrast shadow-xl transition hover:bg-primary-hover'
          >
            Próxima aula em {secondsUntilEnd}
            <MdPlayCircle size={24} />
          </button>
        )}

        <ReactPlayer
          ref={playerRef}
          height='100%'
          width='100%'
          playing
          controls
          onEnded={onPlayNext}
          onDurationChange={(event) => setTotalDuration(event.currentTarget.duration)}
          onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime)}
          src={`https://www.youtube.com/watch?v=${videoId}`}
        />
      </div>
    );
  },
);

PlayerVideoPlayer.displayName = 'PlayerVideoPlayer';
