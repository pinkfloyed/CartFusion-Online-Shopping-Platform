// src/app/api/reviews/admin/route.ts
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session as any).user.role !== "admin")
    return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });

  const reviews = await prisma.review.findMany({
    include: { user: true, product: true },
    orderBy: { createdAt: "desc" },
  });

  return new Response(JSON.stringify(reviews), { status: 200 });
}
