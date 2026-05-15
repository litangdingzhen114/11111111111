"use client";

export default function ContactForm() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8">
      <h2 className="text-xl font-bold text-white mb-6">Send a message</h2>
      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Name</label>
          <input type="text" id="name" placeholder="Your name"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email</label>
          <input type="email" id="email" placeholder="you@example.com"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/20 transition-all" />
        </div>
        <div>
          <label htmlFor="project" className="block text-sm font-medium text-gray-400 mb-2">Project Type</label>
          <select id="project"
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/20 transition-all">
            <option value="">Select a project type</option>
            <option value="web-app">Web Application</option>
            <option value="saas">SaaS Product</option>
            <option value="ai">AI Integration</option>
            <option value="consulting">Product Consulting</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Message</label>
          <textarea id="message" rows={5} placeholder="Tell me about your project..."
            className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/30 focus:ring-1 focus:ring-purple-500/20 transition-all resize-none" />
        </div>
        <button type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all hover:scale-[1.01]">
          Send Message
        </button>
        <p className="text-center text-xs text-gray-600">I&apos;ll get back to you within 24 hours.</p>
      </form>
    </div>
  );
}
