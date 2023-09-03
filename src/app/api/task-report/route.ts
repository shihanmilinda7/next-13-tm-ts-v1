import { TaskObj } from "@/app/components/task/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let res: any;

  const tmpPageNumber: any = searchParams.get("page-number");
  const staffid: string = searchParams.get("staffid") ?? "";
  const startDate: string = searchParams.get("start-date") ?? "";
  const endDate: string = searchParams.get("end-date") ?? "";
  const currentPage: any = parseInt(tmpPageNumber);

  const postsPerPage = 10; // Number of posts per page
  const offset = (currentPage - 1) * postsPerPage;

  try {
    await prisma.$transaction(async (tx) => {
      const completedTasksCount = await prisma.tasks.count({
        where: {
          AND: [
            {
              completeddate: {
                gte: startDate, // Greater than or equal to the start date
                lte: endDate, // Less than or equal to the end date
              },
            },
            {
              staffid: parseInt(staffid),
            },
            {
              status: "Completed",
            },
          ],
        },
      });

      const rawQuery = Prisma.sql`select t.*,c.categoryname from tasks as t left join categories as c on t.categoryid = c.categoryid where t.completeddate >= ${startDate} and t.completeddate <= ${endDate} and t.staffid = ${parseInt(
        staffid
      )} order by t.completeddate desc limit ${postsPerPage} offset ${offset}`;
      let completedTasks: any[] = await tx.$queryRaw(rawQuery);

      //get taskphotos
      for (let i = 0; i < completedTasks.length; i++) {
        const element = completedTasks[i];
        const rawQuery1 = Prisma.sql`select tp.*,cd.categorydetailname from taskphotos as tp join categorydetails as cd on tp.categorydetailid = cd.categorydetailid where tp.taskid = ${element.taskid}`;
        let photoData: any[] = await tx.$queryRaw(rawQuery1);
        element["taskPhotos"] = photoData;
      }

      res = { message: "SUCCESS", completedTasks, completedTasksCount };

      // if (completedTasks) {
      //   res = { message: "SUCCESS", completedTasks };
      // } else {
      //   res = { message: "FAIL" };
      // }
      return "";
    });
  } catch (error) {
    console.error("Error updating staff:", error);
    res = { message: "FAIL" };
  }

  // console.log("status",status,)
  // let rawQuery: any;
  // if (!status) {
  //   rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid} order by taskid desc;`;
  // } else {
  //   // console.log("run thissssss",)
  //   rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid} AND status = ${status} order by taskid desc;`;
  // }
  // const tasks: TaskObj[] = await prisma.$queryRaw(rawQuery);

  // if (tasks.length > 0) {
  //   res = { message: "SUCCESS", tasks };
  // } else {
  //   res = { message: "FAIL" };
  // }
  return NextResponse.json(res);
}
