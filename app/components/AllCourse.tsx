import { createCourse } from "../actions/createCourse";
import { Button } from "./Button";

export const AllCourse = async () => {
  const courses = await createCourse();
  return (
    <div>
      {courses?.map((course, idx) => {
        return (
          <div key={idx}>
            {idx != 0 && course.num == 1 && (
              <div className="flex flex-col border-2 justify-between p-5 items-center">
                <h1 className=" uppercase">{course.plat}</h1>
                <Button numCourse={course.num} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
