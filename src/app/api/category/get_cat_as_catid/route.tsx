import { prisma } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
  const {categoryid} = await request.json();

  let res;
  const categoriesData = await prisma.categorydetails.findMany({
    where: {
      categoryid:parseInt(categoryid)
    },
  });

  if (categoriesData.length > 0) {
    res = { message: "SUCCESS", categoriesData }
  } else {
    res = { message: "FAIL" }
  }
  return NextResponse.json(res)
}
