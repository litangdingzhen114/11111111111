import type { Metadata } from "next";
import { Mail, Calendar, MapPin, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — let's build something great together.",
};

const contactLinks = [
  { icon: Mail, label: "Email", value: "hello@myportfolio.com", href: "mailto:hello@myportfolio.com" },
  { icon: GithubIcon, label: "GitHub", value: "github.com/myportfolio", href: "https://github.com" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/myportfolio", href: "https://linkedin.com" },
  { icon: Calendar, label: "Calendly", value: "Book a call", href: "https://calendly.com" },
];

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-400">Contact</p>
            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Let&apos;s build<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">something great.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 leading-relaxed">
              Have a project in mind? Want to discuss a product idea? Or just want to say hi? I&apos;d love to hear from you.
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} /> Remote / Worldwide
            </div>
            <div className="mt-10 space-y-4">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:border-purple-500/20 hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/10">
                      <link.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{link.label}</p>
                      <p className="text-xs text-gray-500">{link.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
