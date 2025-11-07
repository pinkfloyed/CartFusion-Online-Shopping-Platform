export default function AboutPage() {
  return (
    <section className="bg-gray-100 min-h-screen px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 drop-shadow-md">
          About CartFusion
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl">
          CartFusion is a modern ecommerce platform designed to provide quality
          products at the best prices, ensuring a smooth and delightful online
          shopping experience.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
        <img
          src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8"
          className="rounded-xl shadow-lg w-full object-cover"
          alt="about"
        />

        <div>
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            As an independent developer, I built CartFusion to deliver a fast,
            simple, and user-friendly shopping experience. I focus on product
            quality, quick delivery, and excellent customer handling.
          </p>
          <p className="text-gray-700 leading-relaxed">
            From coding to design, every aspect of this platform is carefully
            crafted to ensure smooth navigation and a seamless experience.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Core Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-tr from-gray-800 to-gray-700 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-3">Quality</h3>
            <p>
              We ensure every product listed meets high standards for quality.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-blue-600 to-blue-500 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-3">Trust</h3>
            <p>
              Secure checkout, transparent policies, and reliable services.
            </p>
          </div>

          <div className="bg-gradient-to-tr from-green-500 to-green-400 rounded-xl p-6 text-white shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold mb-3">Support</h3>
            <p>
              Whether you need help or have questions, we’re here to assist.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-3xl font-semibold mb-6 text-gray-900">
          Have questions or suggestions?
        </h3>
        <a
          href="/contact"
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-green-600 transition shadow-lg"
        >
          Contact Us
        </a>
      </div>
    </section>
  );
}
