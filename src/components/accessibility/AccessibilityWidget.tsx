"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Accessibility,
  HelpCircle,
  Languages,
  MousePointer2,
  RotateCcw,
  SunMoon,
  Type,
  Volume2,
  X,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TextSize = "normal" | "large" | "larger";
type CursorSize = "normal" | "large" | "larger";
type Language = "zh" | "en";

interface AccessibilitySettings {
  textSize: TextSize;
  highContrast: boolean;
  reducedMotion: boolean;
  cursorSize: CursorSize;
  lightMode: boolean;
  screenReader: boolean;
  language: Language;
}

const storageKey = "sunmaosun-accessibility";

const defaultSettings: AccessibilitySettings = {
  textSize: "normal",
  highContrast: false,
  reducedMotion: false,
  cursorSize: "normal",
  lightMode: false,
  screenReader: false,
  language: "zh",
};

const copy = {
  zh: {
    title: "无障碍选项",
    textSize: "文字大小",
    normal: "正常",
    large: "大",
    larger: "更大",
    highContrast: "高对比度",
    reducedMotion: "减少动效",
    cursorSize: "光标大小",
    lightMode: "昼夜模式",
    day: "昼间",
    night: "夜间",
    screenReader: "朗读辅助",
    language: "语言",
    chinese: "中文",
    english: "English",
    help: "帮助",
    helpText: "这些设置会保存在当前浏览器，用于调整页面阅读体验。",
    reset: "重置全部设置",
    on: "ON",
    off: "OFF",
    open: "打开无障碍选项",
    close: "关闭无障碍选项",
  },
  en: {
    title: "Accessibility Options",
    textSize: "Text Size",
    normal: "Normal",
    large: "Large",
    larger: "Larger",
    highContrast: "High Contrast",
    reducedMotion: "Reduced Motion",
    cursorSize: "Cursor Size",
    lightMode: "Day / Night",
    day: "Day",
    night: "Night",
    screenReader: "Screen Reader",
    language: "Language",
    chinese: "中文",
    english: "English",
    help: "Help",
    helpText: "These settings are saved in this browser to improve reading comfort.",
    reset: "Reset All Settings",
    on: "ON",
    off: "OFF",
    open: "Open accessibility options",
    close: "Close accessibility options",
  },
} as const;

function readSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return defaultSettings;
    const saved = JSON.parse(raw) as Partial<AccessibilitySettings>;
    return { ...defaultSettings, ...saved };
  } catch {
    return defaultSettings;
  }
}

function speakPage(language: Language) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const heading =
    document.querySelector("main h1")?.textContent?.trim() ??
    document.title.replace(/\s*\|.*$/, "");
  const summary =
    document
      .querySelector('meta[name="description"]')
      ?.getAttribute("content")
      ?.trim() ?? "";

  const utterance = new SpeechSynthesisUtterance(
    [document.title, heading, summary].filter(Boolean).join(". ")
  );
  utterance.lang = language === "zh" ? "zh-CN" : "en-US";
  utterance.rate = 0.92;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function OptionGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-xs font-black tracking-tight text-[var(--site-text)]">
        <span className="text-sky-300">{icon}</span>
        {label}
      </div>
      {children}
    </div>
  );
}

function ChoiceButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 flex-1 rounded-[4px] border px-3 text-xs font-semibold transition-colors",
        active
          ? "a11y-choice-active border-[color:var(--a11y-active-bg)]"
          : "border-transparent bg-white/[0.09] text-[var(--site-text)] hover:bg-white/[0.14]"
      )}
    >
      {children}
    </button>
  );
}

function ToggleRow({
  active,
  icon,
  label,
  off,
  on,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  off: string;
  on: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-11 w-full items-center justify-between rounded-[4px] px-4 text-left transition-colors",
        active
          ? "a11y-choice-active"
          : "bg-white/[0.09] text-[var(--site-text)] hover:bg-white/[0.14]"
      )}
    >
      <span className="flex items-center gap-2 text-xs font-semibold">
        {icon}
        {label}
      </span>
      <span className="font-mono text-xs font-bold">{active ? on : off}</span>
    </button>
  );
}

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [settings, setSettings] =
    useState<AccessibilitySettings>(defaultSettings);
  const [hydrated, setHydrated] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSettings(readSettings());
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    const root = document.documentElement;
    root.dataset.textSize = settings.textSize;
    root.dataset.contrast = settings.highContrast ? "high" : "normal";
    root.dataset.reducedMotion = settings.reducedMotion ? "true" : "false";
    root.dataset.cursorSize = settings.cursorSize;
    root.dataset.themeMode = settings.lightMode ? "day" : "night";
    root.dataset.language = settings.language;
    root.lang = settings.language === "zh" ? "zh-CN" : "en";

    window.localStorage.setItem(storageKey, JSON.stringify(settings));
    window.dispatchEvent(
      new CustomEvent("portfolio-accessibility-change", {
        detail: settings,
      })
    );
  }, [settings, hydrated]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("portfolio-accessibility-panel", {
        detail: { open },
      })
    );
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (
        panelRef.current?.contains(target) ||
        buttonRef.current?.contains(target)
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      setOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const t = useMemo(() => copy[settings.language], [settings.language]);

  const update = (next: Partial<AccessibilitySettings>) => {
    setSettings((current) => ({ ...current, ...next }));
  };

  const toggleScreenReader = () => {
    const next = !settings.screenReader;
    update({ screenReader: next });
    if (next) {
      window.setTimeout(() => speakPage(settings.language), 80);
    } else if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const reset = () => {
    setSettings(defaultSettings);
    setShowHelp(false);
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-6 right-6 z-[80]",
          open && "right-auto left-6 sm:left-auto sm:right-6"
        )}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? t.close : t.open}
          aria-expanded={open}
          className={cn(
            "grid h-12 w-12 place-items-center rounded-full border shadow-2xl transition-all sm:h-14 sm:w-14",
            open
              ? "a11y-fab-active border-[color:var(--a11y-active-bg)]"
              : "a11y-fab"
          )}
        >
          {open ? <X size={28} /> : <Accessibility size={28} />}
        </button>
      </div>

      {open && (
        <aside
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label={t.title}
          data-lenis-prevent
          className="a11y-panel fixed bottom-20 right-3 z-[79] max-h-[min(620px,calc(100svh-6rem))] w-[min(360px,calc(100vw-1.5rem))] overflow-y-auto rounded-[8px] border p-3.5 [scrollbar-gutter:stable] sm:bottom-24 sm:right-6 sm:w-[372px] sm:p-4"
        >
          <div className="mb-4 flex items-center gap-2">
            <Accessibility size={20} className="text-sky-300" />
            <h2 className="text-xl font-black tracking-tight text-[var(--site-text)]">
              {t.title}
            </h2>
          </div>

          <div className="space-y-4">
            <OptionGroup label={t.textSize} icon={<Type size={17} />}>
              <div className="grid grid-cols-3 gap-2">
                {(["normal", "large", "larger"] as const).map((size) => (
                  <ChoiceButton
                    key={size}
                    active={settings.textSize === size}
                    onClick={() => update({ textSize: size })}
                  >
                    {t[size]}
                  </ChoiceButton>
                ))}
              </div>
            </OptionGroup>

            <ToggleRow
              active={settings.highContrast}
              icon={<Accessibility size={17} />}
              label={t.highContrast}
              off={t.off}
              on={t.on}
              onClick={() => update({ highContrast: !settings.highContrast })}
            />

            <ToggleRow
              active={settings.reducedMotion}
              icon={<Zap size={17} />}
              label={t.reducedMotion}
              off={t.off}
              on={t.on}
              onClick={() => update({ reducedMotion: !settings.reducedMotion })}
            />

            <OptionGroup label={t.cursorSize} icon={<MousePointer2 size={17} />}>
              <div className="grid grid-cols-3 gap-2">
                {(["normal", "large", "larger"] as const).map((size) => (
                  <ChoiceButton
                    key={size}
                    active={settings.cursorSize === size}
                    onClick={() => update({ cursorSize: size })}
                  >
                    {t[size]}
                  </ChoiceButton>
                ))}
              </div>
            </OptionGroup>

            <ToggleRow
              active={settings.lightMode}
              icon={<SunMoon size={17} />}
              label={t.lightMode}
              off={t.night}
              on={t.day}
              onClick={() => update({ lightMode: !settings.lightMode })}
            />

            <ToggleRow
              active={settings.screenReader}
              icon={<Volume2 size={17} />}
              label={t.screenReader}
              off={t.off}
              on={t.on}
              onClick={toggleScreenReader}
            />

            <OptionGroup label={t.language} icon={<Languages size={17} />}>
              <div className="grid grid-cols-2 gap-2">
                <ChoiceButton
                  active={settings.language === "zh"}
                  onClick={() => update({ language: "zh" })}
                >
                  {t.chinese}
                </ChoiceButton>
                <ChoiceButton
                  active={settings.language === "en"}
                  onClick={() => update({ language: "en" })}
                >
                  {t.english}
                </ChoiceButton>
              </div>
            </OptionGroup>

            {showHelp && (
              <p className="rounded-[4px] border border-[var(--site-line)] bg-white/[0.09] p-3 text-xs leading-5 text-sky-100">
                {t.helpText}
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowHelp((value) => !value)}
              className="flex min-h-11 w-full items-center gap-2 rounded-[4px] bg-white/[0.09] px-4 text-left text-xs font-semibold text-[var(--site-text)] transition-colors hover:bg-white/[0.14]"
            >
              <HelpCircle size={17} />
              {t.help}
            </button>

            <button
              type="button"
              onClick={reset}
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-[4px] bg-white/[0.09] px-4 text-xs font-semibold text-[var(--site-text)] transition-colors hover:bg-white/[0.14]"
            >
              <RotateCcw size={17} />
              {t.reset}
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
