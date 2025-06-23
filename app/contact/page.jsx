// app/contact/page.tsx or pages/contact.tsx
"use client";

import React from "react";

export default function ContactPage() {
  return (
    <div className="min-h-screen  bg-[#fefdf8] mt-[10vh] text-black px-4 md:px-20 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Column - Contact Info */}
      <div className="animate-fadeIn">
        <h2 className="text-lg mb-2">Nidhi Harlalka</h2>
        <h1 className="text-2xl font-bold mb-4 uppercase">
          WYSIWYG Communications Private Limited
        </h1>
        <p className="mb-2">220 AJC Bose Road, 2nd Floor</p>
        <p className="mb-2">Kolkata 700017</p>
        <p className="mb-2">
          <strong>P.</strong> (+91) 33 22802154
        </p>
        <p className="mb-2">
          <strong>E.</strong>{" "}
          <a
            href="mailto:business@wysiwyg.co.in"
            className="text-blue-600 underline"
          >
            business@wysiwyg.co.in
          </a>
        </p>
        <p className="mb-6">
          <strong>H.</strong> Monday–Friday, 9.30 am to 5.30 pm
        </p>
        <div className="w-full h-64">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7369.993152959088!2d88.359731!3d22.541801!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02771f12abf9bf%3A0x8cb2f599989f1332!2sWYSIWYG%20Communications%20Private%20Limited!5e0!3m2!1sen!2sus!4v1750420074179!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Right Column - Form */}
      <form className="space-y-6 animate-fadeIn">
        <h2 className="text-2xl font-semibold mb-4">Send us a message</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Full Name *</label>
          <input
            type="text"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Subject *</label>
          <select required className="w-full border rounded px-3 py-2">
            <option value="">- Select -</option>
            <option>We'd love you to design for us </option>
            <option>Just Curious</option>
            <option>I'd Love to work at wysiwyg</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message *</label>
          <textarea
            rows={5}
            required
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>

        {/* CAPTCHA placeholder */}

        <button
          type="submit"
          className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
