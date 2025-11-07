"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await new Promise((res) => setTimeout(res, 1200));
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900 drop-shadow-md">
          Contact Us
        </h1>
        <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl">
          Have questions or feedback? I’m here to help. Send a message below and
          I’ll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        <div className="p-4 md:p-6 rounded-xl shadow-lg bg-gradient-to-tr from-blue-200 to-indigo-600 text-white hover:shadow-2xl transition max-w-md mx-auto md:mx-0">
          <h2 className="text-lg md:text-xl font-bold mb-2">Get in Touch</h2>
          <p className="mb-2 text-sm md:text-base">
            Contact us via email or the form.
          </p>
          <p className="font-medium text-sm md:text-base flex items-center gap-2">
            📩 <span>support@cartfusion.com</span>
          </p>
        </div>



        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 rounded-xl shadow-lg bg-white hover:shadow-2xl transition"
        >
          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-semibold text-gray-700">Message</label>
            <textarea
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-lg transition"
          >
            Send Message
          </button>

          {status && (
            <p className="text-center mt-4 text-green-600 font-medium">{status}</p>
          )}
        </form>
      </div>
    </section>
  );
}

