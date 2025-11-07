import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });

  const { productId, rating, comment } = await req.json();
  if (!productId || !rating) return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });

  const review = await prisma.review.create({
    data: {
      userId: session.user.id,
      productId,
      rating,
      comment,
    },
    include: { user: true },
  });

  return new Response(JSON.stringify({ ok: true, review }), { status: 200 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");
  if (!productId) return new Response(JSON.stringify([]));

  const reviews = await prisma.review.findMany({
    where: { productId },
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(reviews), { status: 200 });
}
