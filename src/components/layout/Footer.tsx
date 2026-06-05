import Link from "next/link";
import { Mail } from "lucide-react";

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const socialLinks = [
  { icon: GithubIcon, href: "https://github.com/litangdingzhen114", label: "GitHub" },
  { icon: Mail, href: "mailto:llf374603@gmail.com", label: "邮箱" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background">
      <div className="section-shell py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="inline-flex items-center gap-3 text-lg font-bold tracking-tight text-white transition-colors hover:text-primary"
            >
              <span className="grid h-8 w-8 place-items-center rounded-[6px] border border-white/[0.12] text-sm text-primary">
                S
              </span>
              sunmaosun
            </Link>
            <p className="mt-2 text-sm text-white/[0.42]">
              AI 产品经理方向 / 原型开发
            </p>
          </div>

          <div className="flex justify-center gap-6 text-sm text-white/[0.48] md:gap-8">
            <Link href="/work" className="transition-colors hover:text-primary">
              作品
            </Link>
            <Link href="/about" className="transition-colors hover:text-primary">
              关于
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-primary"
            >
              联系
            </Link>
          </div>

          <div className="flex justify-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="rounded-[6px] border border-white/10 p-2 text-white/[0.38] transition-all hover:border-primary/40 hover:text-primary"
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-8 md:flex-row md:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} sunmaosun. Portfolio in progress.
          </p>
          <p className="text-xs text-white/30">
            用产品思维、AI 工作流和代码原型整理项目
          </p>
        </div>
      </div>
    </footer>
  );
}
