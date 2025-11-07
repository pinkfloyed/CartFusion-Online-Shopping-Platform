import { prisma } from "@/lib/prisma"
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
import sharp from "sharp"

export async function POST(req: Request) {
  try {
    const form = await req.formData()

    const name = form.get("name") as string
    const slug = form.get("slug") as string
    const description = form.get("description") as string
    const price = Number(form.get("price"))
    const stock = Number(form.get("stock"))
    const category = form.get("category") as string

    let imagePath = null
    const file = form.get("image") as File | null

    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads")
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, fileName)

      const buffer = Buffer.from(await file.arrayBuffer())

      const resized = await sharp(buffer)
        .resize(300, 300, {
          fit: "cover", 
        })
        .toFormat("jpeg")
        .jpeg({ quality: 85 })
        .toBuffer()

      fs.writeFileSync(filePath, resized)
      imagePath = `/uploads/${fileName}`
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        stock,
        category,
        image: imagePath,
      },
    })

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Product create error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
