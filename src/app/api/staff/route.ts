import { prisma } from "@/db";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    let res;
    // const selectedCol = searchParams.get('page');
    // console.log("searchParams", searchParams)
    const selectedColumns: string = searchParams.get("columns") ?? "";
    let selectedColumnsObj: Prisma.staffSelect<DefaultArgs> | null = null;
    if (selectedColumns) {
        console.log("selectedColumnsObj",selectedColumnsObj,)
        selectedColumnsObj = JSON.parse(selectedColumns);
    }
    console.log("selectedColumnsObj11",selectedColumns,)

    // const staff = await prisma.staff.findMany({
    // });
    const staff = await prisma.staff.findMany({
        select: selectedColumnsObj,
    });

    if (staff.length > 0) {
        res = { message: "SUCCESS", staff }
    } else {
        res = { message: "FAIL" }
    }
    return NextResponse.json(res)
}

export async function POST(request: Request) {
    const { staffname, contracttype, contactno, nic, password, username } = await request.json();
    let message: string = "SUCCESS"
    try {
        await prisma.$transaction(async (tx) => {
            // 1. addnew staff .
            const staff = await tx.staff.create({
                data: {
                    staffname,
                    contracttype,
                    contactno,
                    nic,
                },
            });

            // 2. Verify staff enterd
            if (!staff.staffid) {
                throw new Error(`Staff not enterd`)
            }

            const headerId: number = staff.staffid

            // 3. addnew user
           if (staff.staffid) {
            await tx.users.create({
                data: {
                    staffid: headerId,
                    username,
                    password
                },
            });
        }

            return ""
        })





        // const staff = await prisma.staff.create({
        //     data: {
        //         staffname,
        //         contracttype,
        //         contactno,
        //         nic,
        //     },
        // });

        // if (staff.staffid) {
        //     await prisma.users.create({
        //         data: {
        //             staffid: staff.staffid,
        //             username,
        //             password
        //         },
        //     });
        // }
    } catch (error) {
        console.error('Error adding new staff:', error);
        message = "FAIL"
    }
    //   return NextResponse.json({message:"SUCCESS",newUser})
    return NextResponse.json(message)
}

export async function PUT(request: Request) {
    const { staffid, staffname, contracttype, contactno, nic, password, username } = await request.json();
    let message: string = "SUCCESS"
    try {
        const updateStaff = await prisma.staff.updateMany({
            where: { staffid },
            data: {
                staffname,
                contracttype,
                contactno,
                nic,
            },
        });
    } catch (error) {
        console.error('Error updating staff:', error);
        message = "FAIL"
    }
    return NextResponse.json(message)
}

export async function DELETE(request:Request) {
    const {staffid} = await request.json();

    let message: string = "SUCCESS"
  
    try {
        await prisma.staff.delete({
            where: {
                staffid: staffid
            },
        })
    } catch (error) {
        console.error('Error updating staff:', error);
        message = "FAIL"
    }
    
  
    return NextResponse.json(message)
  }
  