import { ClassGroup, IClassGroupProps } from './components/ClassGroup';


interface ICourseContentProps {
  classGroups: IClassGroupProps[];
}
export const CourseContent = ({ classGroups }: ICourseContentProps) => {

  return (
    <div className='flex flex-col gap-5'>
      <h2 className='text-2xl font-black tracking-tight'>Conteúdo do curso</h2>

      <ol className='flex flex-col gap-3'>
        {classGroups.map((classGroup, index) => (
          <li key={classGroup.classes[0]?.id ?? `${classGroup.courseId}-${index}`} className='flex flex-col'>
            <ClassGroup {...classGroup} />
          </li>
        ))}
      </ol>
    </div>
  );
};
