import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    take: 12,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-gray-50">
      {/* HERO SECTION */}
      <section
        className="
          relative
          h-[70vh] 
          w-full
          bg-cover 
          bg-center 
          bg-no-repeat
          flex
          items-center
          justify-center
          text-white
        "
        style={{
          backgroundImage: `url("/hero-bg.jpg")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-blue-800/50 to-gray-800/60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg">
            Welcome to CartFusion
          </h1>
          <p className="text-lg md:text-2xl mb-6 max-w-3xl mx-auto drop-shadow-md">
            Discover amazing products with the best deals and fast delivery.
          </p>
          <Link
            href="#featured"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 hover:from-blue-700 hover:to-green-600 rounded-lg font-bold text-white shadow-lg transition-transform transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURES / CATEGORY / SHORT CONTENT */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8 text-center">
        <div className="bg-gradient-to-tr from-gray-800 to-gray-700 rounded-lg p-6 text-white shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p>We deliver your orders quickly & safely.</p>
        </div>
        <div className="bg-gradient-to-tr from-blue-600 to-blue-500 rounded-lg p-6 text-white shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
          <p>Pay with trusted platforms securely.</p>
        </div>
        <div className="bg-gradient-to-tr from-green-500 to-green-400 rounded-lg p-6 text-white shadow-lg hover:shadow-2xl transition">
          <h3 className="text-xl font-semibold mb-2">Best Quality</h3>
          <p>Top quality products guaranteed.</p>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="featured" className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-lg font-semibold shadow-lg hover:from-blue-700 hover:to-green-600 transition-transform transform hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* CONTACT / CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 mt-12 text-center text-white rounded-lg mx-4 md:mx-16 shadow-lg">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Need help?</h3>
        <p className="mb-6">
          Contact our support team for quick help!
        </p>
        <Link
          href="/contact"
          className="px-6 py-3 bg-green-500 hover:bg-green-600 font-semibold rounded-full shadow-lg transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
}
