import { prisma } from "@/lib/prisma";
import ProductReviews from "@/components/ProductReviews";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    return <div className="p-8 text-center">Product slug missing</div>;
  }

  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    return <div className="p-8 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">{product.name} — Add Review</h1>

      <div className="bg-white p-6 rounded shadow">
        <p className="mb-4">{product.description}</p>
        <ProductReviews productId={product.id} />
      </div>
    </div>
  );
}
