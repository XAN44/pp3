import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import * as  z from "zod";


const usersSchema = z
    .object({
        name: z.string().min(1, 'ชื่อผู้ใช้นี้มีการใช้งานแล้ว').max(100),
        email: z.string().min(1, 'อีเมลล์มีการใช้งานแล้ว').email('รูปแบบอีเมล์ไม่ถูกต้อง'),
        password: z.string().min(1, 'รหัสผ่านไม่ถูกต้อง').min(8, 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร'),
    })



export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, name, password } = usersSchema.parse(body)

        const existhingEmail = await db.user.findUnique({
            where: {
                email
            }
        })
        if (existhingEmail) {
            return NextResponse.json({
                user: null,
                error: "อีเมล์นี้มีการใช้งานแล้ว"
            }
                , { status: 400 })
        }
        const existhingUsername = await db.user.findUnique({
            where: {
                name
            }
        })
        if (existhingUsername) {
            return NextResponse.json({
                user: null,
                error: "ชื่อผู้ใช้นี้มีการใช้งานแล้ว"
            }
                , { status: 400 })
        }

        const hashpw = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                email: email,
                name: name,
                password: hashpw
            }
        })

        const { password: newUserPw, ...rest } = newUser;

        return NextResponse.json({ user: rest, message: "สมัครสมาชิกสำเร็จ" })
    } catch (error) {

        return NextResponse.json({ message: 'มีข้อผิดพลาดบางอย่าง' }, { status: 500 })
    }
}