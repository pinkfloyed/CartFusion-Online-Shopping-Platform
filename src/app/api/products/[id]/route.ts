import { prisma } from "@/lib/prisma"
import fs from "fs"
import { NextResponse } from "next/server"
import path from "path"
import sharp from "sharp"

// ✅ UPDATE PRODUCT
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const form = await req.formData()

    const name = form.get("name") as string
    const slug = form.get("slug") as string
    const description = form.get("description") as string
    const price = Number(form.get("price"))
    const stock = Number(form.get("stock"))
    const category = form.get("category") as string

    let imagePath = null
    const file = form.get("image") as File | null

    // ✅ Handle file upload & resize
    if (file && file.size > 0) {
      const uploadDir = path.join(process.cwd(), "public/uploads")
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(uploadDir, fileName)

      const buffer = Buffer.from(await file.arrayBuffer())

      const resized = await sharp(buffer)
        .resize(300, 300, { fit: "cover" })
        .toFormat("jpeg")
        .jpeg({ quality: 85 })
        .toBuffer()

      fs.writeFileSync(filePath, resized)

      imagePath = `/uploads/${fileName}`

      // ✅ delete old image
      const old = await prisma.product.findUnique({ where: { id } })
      if (old?.image && old.image.startsWith("/uploads/")) {
        const oldPath = path.join(process.cwd(), "public", old.image)
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath)
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        price,
        stock,
        category,
        ...(imagePath && { image: imagePath }),
      },
    })

    return NextResponse.json({ success: true, product })
  } catch (error) {
    console.error("Update product error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// ✅ ✅ DELETE handler
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // ✅ Optional — remove file if you want
    const product = await prisma.product.findUnique({ where: { id } })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // ✅ If stored image exists, delete from file system
    if (product.image) {
      const imgPath = path.join(process.cwd(), "public", product.image)
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath)
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true, message: "Product deleted" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    )
  }
}
