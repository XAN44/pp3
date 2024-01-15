import express from "express";
import { Request, Response, Application } from "express";
import { PrismaClient } from "@prisma/client";

const app: Application = express();
const port = 3001;
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/Alluser", async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany({});
    res.json(user);
  } catch {}
});

app.post("/reg", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const emailMeelaw = await prisma.user.findUnique({
      where: { email: email },
    });
    if (emailMeelaw) {
      return res.status(400).json({ error: "Email มีการใช้งานแล้วนะจ้ะ" });
    }

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "เกิดข้อผิดพลาด" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
