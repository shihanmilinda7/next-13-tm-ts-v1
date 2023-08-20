import { TaskObj } from "@/app/components/task/types";
import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let res;

    const staffid: string = searchParams.get("staffid") ?? "";
    // let selectedColumnsObj: Prisma.staffSelect<DefaultArgs> | null = null;


    const rawQuery = Prisma.sql`SELECT t.taskid, t.clientname, t.location,t.categoryid,c.categoryname FROM tasks AS t LEFT JOIN categories AS c ON t.categoryid = c.categoryid WHERE t.staffid = ${staffid}`;
    const tasks: TaskObj[] = await prisma.$queryRaw(rawQuery);


    // const tasks = await prisma.tasks.findMany({
    //     where: { staffid: parseInt(staffid) },
    //     select: { taskid: true, },
    // });

    if (tasks.length > 0) {
        res = { message: "SUCCESS", tasks }
    } else {
        res = { message: "FAIL" }
    }
    return NextResponse.json(res)
}