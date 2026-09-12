import { PlayerClassDetails, PlayerHeader, PlayerPlaylist } from '@/components/player';
import { APIYouTube } from '@/shared/services/api-youtube';
import { Metadata } from 'next';


type RouteParams = {
    classId: string;
    courseId: string;
};

interface Props {
    params: Promise<RouteParams>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { classId } = await params;
    const classDetails = await APIYouTube.class.getById(classId);

    return {
        title: classDetails.title,
        description: classDetails.description,
        openGraph: {
            locale: 'pt-Br',
            type: 'video.episode',
            title: classDetails.title,
            description: classDetails.description,
            videos: [`https://www.youtube.com/watch?v=${classDetails.videoId}`],
        }
    };
};

export default async function PagePlayer({ params }: Props) {
    const { classId, courseId } = await params;
    const courseDetails = await APIYouTube.course.getById(courseId);
    const classDetails = await APIYouTube.class.getById(classId);

    const comments = await APIYouTube.comments.getAllByVideoId(classDetails.videoId);


    const classGroupsData = courseDetails.classGroups.map(classGroup => ({
        title: classGroup.title,
        classes: classGroup.classes.map(classItem => ({
            done: false,
            classId: classItem.id,
            title: classItem.title,
        }))
    }));


    return (
        <main className='flex h-dvh flex-col overflow-hidden bg-background'>
            <PlayerHeader
                title={classDetails.title}
                subtitle={courseDetails.title}
            />

            <div className='flex min-h-0 flex-1'>
                <aside className='hidden w-80 shrink-0 border-r border-border bg-paper md:block xl:w-96'>
                    <PlayerPlaylist
                        playingClassId={classId}
                        playingCourseId={courseId}
                        classGroups={classGroupsData}
                    />
                </aside>

                <PlayerClassDetails
                    comments={comments}
                    classItem={{ ...classDetails, id: classId }}
                    course={{ ...courseDetails, classGroups: classGroupsData }}
                />
            </div>
        </main>
    );
}
