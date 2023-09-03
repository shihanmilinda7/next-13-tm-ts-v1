// import { TaskObj } from "@/app/components/task/types";
// import { prisma } from "@/db";
// import { Prisma } from "@prisma/client";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   let res: any;

//   const staffid: string = searchParams.get("staffid") ?? "";
//   const startDate: string = searchParams.get("start-date") ?? "";
//   const endDate: string = searchParams.get("end-date") ?? "";
//   console.log("startDate", startDate, endDate);

//   try {
//     await prisma.$transaction(async (tx) => {
//       const completedTasks = await prisma.tasks.findMany({
//         where: {
//           AND: [
//             {
//               completeddate: {
//                 gte: startDate, // Greater than or equal to the start date
//                 lte: endDate, // Less than or equal to the end date
//               },
//             },
//             {
//               staffid: parseInt(staffid),
//             },
//             {
//               status: "Completed",
//             },
//           ],
//         },
//       });
//       console.log("completedTasks", completedTasks);
//       res = { message: "SUCCESS", completedTasks };

//       // if (completedTasks) {
//       //   res = { message: "SUCCESS", completedTasks };
//       // } else {
//       //   res = { message: "FAIL" };
//       // }
//       return "";
//     });
//   } catch (error) {
//     console.error("Error updating staff:", error);
//     res = { message: "FAIL" };
//   }

//   // console.log("status",status,)
//   // let rawQuery: any;
//   // if (!status) {
//   //   rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid} order by taskid desc;`;
//   // } else {
//   //   // console.log("run thissssss",)
//   //   rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid} AND status = ${status} order by taskid desc;`;
//   // }
//   // const tasks: TaskObj[] = await prisma.$queryRaw(rawQuery);

//   // if (tasks.length > 0) {
//   //   res = { message: "SUCCESS", tasks };
//   // } else {
//   //   res = { message: "FAIL" };
//   // }
//   return NextResponse.json(res);
// }
