import type { Metadata } from "next";
import { Mail, Globe, MapPin, ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export const metadata: Metadata = {
  title: "联系我",
  description: "欢迎联系我，聊项目、原型、小程序或实习机会。",
};

const contactLinks = [
  { icon: Mail, label: "邮箱", value: "sunmoe.dev@gmail.com", href: "mailto:sunmoe.dev@gmail.com" },
  { icon: GithubIcon, label: "GitHub", value: "github.com/litangdingzhen114", href: "https://github.com/litangdingzhen114" },
  { icon: Globe, label: "作品集", value: "www.sunmaosun.com", href: "https://personal.sun.com" },
  { icon: MapPin, label: "所在城市", value: "杭州", href: "https://maps.google.com/?q=Hangzhou" },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">联系</p>
            <h1 className="mt-3 text-4xl font-bold text-[var(--site-text)] sm:text-5xl lg:text-6xl">
              一起把
              <br />
              <span className="text-gradient">好想法做出来。</span>
            </h1>
            <p className="mt-6 text-base leading-7 text-[var(--site-muted)] sm:text-lg sm:leading-relaxed">
              如果你想了解某个项目，或者有产品、前端、小程序相关机会，可以发消息给我。
            </p>
            <div className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={14} /> 杭州 / 可远程沟通
            </div>
            <div className="mt-10 space-y-4">
              {contactLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="project-card-surface group flex items-center justify-between gap-3 rounded-[8px] border p-4 transition-all sm:rounded-xl">
                  <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/15 bg-primary/10 text-primary">
                      <link.icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-[var(--site-text)]">{link.label}</p>
                      <p className="truncate text-xs text-gray-500">{link.value}</p>
                    </div>
                  </div>
                  <ArrowUpRight size={16} className="shrink-0 text-[var(--site-muted-strong)] transition-colors group-hover:text-primary" />
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
