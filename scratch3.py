import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

navy_root = """
  --background: #0b132b;
  --foreground: #f0ead6;
  --card: rgba(255, 255, 255, 0.04);
  --card-foreground: #f0ead6;
  --popover: #121c3b;
  --popover-foreground: #f0ead6;
  --primary: #5bc0be;
  --primary-foreground: #0b132b;
  --secondary: rgba(91, 192, 190, 0.12);
  --secondary-foreground: #f0ead6;
  --muted: rgba(255, 255, 255, 0.06);
  --muted-foreground: #8a9bbe;
  --accent: rgba(91, 192, 190, 0.15);
  --accent-foreground: #d2fcfb;
  --destructive: #cc5b5b;
  --border: rgba(240, 234, 214, 0.08);
  --input: rgba(240, 234, 214, 0.08);
  --ring: rgba(91, 192, 190, 0.4);
  --chart-1: #5bc0be;
  --chart-2: #e6c280;
  --chart-3: #8a9bbe;
  --chart-4: #4a638c;
  --chart-5: #f0ead6;
  --radius: 0.5rem;
  --sidebar: #121c3b;
  --sidebar-foreground: #f0ead6;
  --sidebar-primary: #5bc0be;
  --sidebar-primary-foreground: #0b132b;
  --sidebar-accent: rgba(255, 255, 255, 0.06);
  --sidebar-accent-foreground: #f0ead6;
  --sidebar-border: rgba(240, 234, 214, 0.08);
  --sidebar-ring: rgba(91, 192, 190, 0.4);

  --site-bg: #0b132b;
  --site-bg-grid: rgba(91, 192, 190, 0.024);
  --site-text: #f0ead6;
  --site-muted: #8a9bbe;
  --site-muted-strong: #bac6dd;
  --site-line: rgba(240, 234, 214, 0.1);
  --site-panel: rgba(255, 255, 255, 0.045);
  --site-panel-hover: rgba(255, 255, 255, 0.075);
  --site-panel-strong: #121c3b;
  --site-panel-inverse: #f0ead6;
  --site-inverse-text: #0b132b;
  --site-accent: #5bc0be;
  --site-accent-2: #e6c280;
  --site-accent-3: #8a9bbe;
  --site-button-start: #3b908e;
  --site-button-end: #b59152;
  --site-button-text: #fffdf6;
  --site-selection: rgba(91, 192, 190, 0.35);
  --site-scrollbar: rgba(91, 192, 190, 0.25);
  --site-scrollbar-hover: rgba(230, 194, 128, 0.4);
  --site-gradient-text: linear-gradient(135deg, #e4eff2, #5bc0be 48%, #e6c280);
  --featured-bg: #0f1938;
  --featured-fg: #f0ead6;
  --featured-muted: rgba(240, 234, 214, 0.58);
  --featured-accent: #e6c280;
  --featured-link-border: rgba(240, 234, 214, 0.16);
  --featured-link-hover-bg: #f0ead6;
  --featured-link-hover-text: #0b132b;
  --featured-card-bg: #131c3b;
  --featured-card-fg: #f0ead6;
  --featured-card-border: rgba(255, 255, 255, 0.09);
  --featured-card-muted: rgba(240, 234, 214, 0.58);
  --featured-card-count: rgba(240, 234, 214, 0.28);
  --featured-card-shadow: 0 18px 48px rgba(7, 12, 28, 0.16), 0 28px 80px rgba(7, 12, 28, 0.2);
  --featured-card-hover-shadow: 0 26px 70px rgba(7, 12, 28, 0.22), 0 38px 110px rgba(7, 12, 28, 0.24);
  --featured-card-body-bg: transparent;
  --featured-card-chip-bg: transparent;
  --featured-card-chip-border: rgba(255, 255, 255, 0.1);
  --featured-card-chip-fg: rgba(240, 234, 214, 0.52);
  --featured-media-bg: #152244;
  --featured-media-overlay: linear-gradient(180deg, rgba(7, 12, 28, 0.1), rgba(7, 12, 28, 0.76));
  --featured-media-grid: rgba(255, 255, 255, 0.12);
  --featured-index-bg: rgba(255, 255, 255, 0.7);
  --featured-index-fg: #0b132b;
  --featured-index-border: rgba(0, 0, 0, 0.2);
  --featured-media-pill-bg: rgba(0, 0, 0, 0.25);
  --featured-media-pill-fg: rgba(255, 255, 255, 0.72);
  --featured-media-pill-border: rgba(255, 255, 255, 0.15);
  --featured-type-bg: rgba(7, 12, 28, 0.78);
  --featured-type-fg: rgba(255, 255, 255, 0.78);
  --featured-action-bg: #ffffff;
  --featured-action-fg: #0b132b;
  --a11y-panel-bg: rgba(14, 22, 46, 0.94);
  --a11y-panel-text: #f0ead6;
  --a11y-panel-muted: #8a9bbe;
  --a11y-panel-item: rgba(255, 255, 255, 0.09);
  --a11y-panel-border: rgba(255, 255, 255, 0.11);
  --a11y-panel-shadow: rgba(0, 0, 0, 0.34);
  --a11y-active-bg: #5bc0be;
  --a11y-active-text: #050a17;
  --a11y-fab-bg: #f0ead6;
  --a11y-fab-icon: #0b132b;
  --a11y-fab-border: rgba(240, 234, 214, 0.3);
  --a11y-fab-shadow: rgba(0, 0, 0, 0.42);
  --hero-bg: #0b132b;
  --hero-vignette-top: rgba(11, 19, 43, 0.88);
  --hero-vignette-bottom: rgba(11, 19, 43, 0.82);
  --hero-vignette-side: rgba(11, 19, 43, 0.18);
  --hero-badge-bg: rgba(91, 192, 190, 0.11);
  --hero-badge-border: rgba(91, 192, 190, 0.24);
  --hero-badge-text: #d2fcfb;
  --device-shell: #0d152c;
  --device-screen: #152244;
  --device-panel: rgba(255, 255, 255, 0.07);
  --device-panel-strong: rgba(255, 255, 255, 0.1);
"""

navy_day = """
  --background: #fcfbfa;
  --foreground: #1c2333;
  --card: rgba(255, 255, 255, 0.85);
  --card-foreground: #1c2333;
  --popover: #ffffff;
  --popover-foreground: #1c2333;
  --primary: #337371;
  --primary-foreground: #fcfbfa;
  --secondary: rgba(51, 115, 113, 0.12);
  --secondary-foreground: #1c2333;
  --muted: rgba(28, 35, 51, 0.05);
  --muted-foreground: #697891;
  --accent: rgba(51, 115, 113, 0.15);
  --accent-foreground: #1e4544;
  --destructive: #b42b2b;
  --border: rgba(28, 35, 51, 0.1);
  --input: rgba(28, 35, 51, 0.1);
  --ring: rgba(51, 115, 113, 0.36);
  --chart-1: #337371;
  --chart-2: #ab8646;
  --chart-3: #697891;
  --chart-4: #435473;
  --chart-5: #1c2333;
  --sidebar: #ffffff;
  --sidebar-foreground: #1c2333;
  --sidebar-primary: #337371;
  --sidebar-primary-foreground: #fcfbfa;
  --sidebar-accent: rgba(51, 115, 113, 0.08);
  --sidebar-accent-foreground: #1c2333;
  --sidebar-border: rgba(28, 35, 51, 0.1);
  --sidebar-ring: rgba(51, 115, 113, 0.36);

  --site-bg: #fcfbfa;
  --site-bg-grid: rgba(28, 35, 51, 0.04);
  --site-text: #1c2333;
  --site-muted: #697891;
  --site-muted-strong: #3b475c;
  --site-line: rgba(28, 35, 51, 0.1);
  --site-panel: rgba(255, 255, 255, 0.85);
  --site-panel-hover: rgba(255, 255, 255, 0.98);
  --site-panel-strong: #ffffff;
  --site-panel-inverse: #0b132b;
  --site-inverse-text: #f0ead6;
  --site-accent: #337371;
  --site-accent-2: #ab8646;
  --site-accent-3: #697891;
  --site-button-start: #337371;
  --site-button-end: #1e4544;
  --site-button-text: #fcfbfa;
  --site-selection: rgba(51, 115, 113, 0.25);
  --site-scrollbar: rgba(51, 115, 113, 0.2);
  --site-scrollbar-hover: rgba(171, 134, 70, 0.4);
  --site-gradient-text: linear-gradient(135deg, #1c2333, #337371 48%, #ab8646);
  --featured-bg: linear-gradient(180deg, #ffffff 0%, #f7f7f9 46%, #fcfbfa 100%);
  --featured-fg: #1c2333;
  --featured-muted: rgba(28, 35, 51, 0.62);
  --featured-accent: #ab8646;
  --featured-link-border: rgba(28, 35, 51, 0.14);
  --featured-link-hover-bg: #1c2333;
  --featured-link-hover-text: #fcfbfa;
  --featured-card-bg: rgba(255, 255, 255, 0.84);
  --featured-card-fg: #1c2333;
  --featured-card-border: rgba(28, 35, 51, 0.11);
  --featured-card-muted: rgba(59, 71, 92, 0.68);
  --featured-card-count: rgba(28, 35, 51, 0.22);
  --featured-card-shadow: 0 20px 55px rgba(45, 53, 69, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.82);
  --featured-card-hover-shadow: 0 28px 76px rgba(45, 53, 69, 0.16), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  --featured-card-body-bg: linear-gradient(135deg, rgba(255, 255, 255, 0.68), rgba(248, 249, 252, 0.74));
  --featured-card-chip-bg: rgba(28, 35, 51, 0.045);
  --featured-card-chip-border: rgba(28, 35, 51, 0.1);
  --featured-card-chip-fg: rgba(59, 71, 92, 0.72);
  --featured-media-bg: #e5e8f0;
  --featured-media-overlay: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(28, 35, 51, 0.42));
  --featured-media-grid: rgba(28, 35, 51, 0.08);
  --featured-index-bg: rgba(255, 255, 255, 0.84);
  --featured-index-fg: #1c2333;
  --featured-index-border: rgba(28, 35, 51, 0.12);
  --featured-media-pill-bg: rgba(255, 255, 255, 0.76);
  --featured-media-pill-fg: rgba(28, 35, 51, 0.68);
  --featured-media-pill-border: rgba(28, 35, 51, 0.1);
  --featured-type-bg: rgba(28, 35, 51, 0.72);
  --featured-type-fg: rgba(255, 255, 255, 0.86);
  --featured-action-bg: #1c2333;
  --featured-action-fg: #fcfbfa;
  --a11y-panel-bg: rgba(255, 255, 255, 0.94);
  --a11y-panel-text: #1c2333;
  --a11y-panel-muted: #697891;
  --a11y-panel-item: rgba(28, 35, 51, 0.08);
  --a11y-panel-border: rgba(28, 35, 51, 0.12);
  --a11y-panel-shadow: rgba(45, 53, 69, 0.18);
  --a11y-active-bg: #337371;
  --a11y-active-text: #ffffff;
  --a11y-fab-bg: #ffffff;
  --a11y-fab-icon: #337371;
  --a11y-fab-border: rgba(51, 115, 113, 0.24);
  --a11y-fab-shadow: rgba(51, 115, 113, 0.2);
  --hero-bg: #f8f9fc;
  --hero-vignette-top: rgba(248, 249, 252, 0.9);
  --hero-vignette-bottom: rgba(248, 249, 252, 0.84);
  --hero-vignette-side: rgba(248, 249, 252, 0.1);
  --hero-badge-bg: rgba(51, 115, 113, 0.08);
  --hero-badge-border: rgba(51, 115, 113, 0.18);
  --hero-badge-text: #1e4544;
  --device-shell: #202636;
  --device-screen: #273145;
  --device-panel: rgba(255, 255, 255, 0.08);
  --device-panel-strong: rgba(255, 255, 255, 0.13);
"""

# Replace the variables blocks
content = re.sub(r':root\s*\{[^}]+\}', f':root {{\n{navy_root}\n}}', content)
content = re.sub(r'html\[data-theme-mode="day"\]\s*\{[^}]+\}', f'html[data-theme-mode="day"] {{\n{navy_day}\n}}', content)

# Also update the primary CTA to use Navy/Sand complementary colors but KEEP the flat structure
content = re.sub(r'\.site-primary-cta\s*\{[^}]+\}', '.site-primary-cta {\n  background: var(--site-button-start) !important;\n  color: var(--site-button-text) !important;\n  box-shadow: 4px 4px 0px rgba(91, 192, 190, 0.4);\n  border: 1px solid rgba(91, 192, 190, 0.6);\n  border-radius: 0 !important;\n}', content)
content = re.sub(r'\.site-primary-cta:hover\s*\{[^}]+\}', '.site-primary-cta:hover {\n  box-shadow: 6px 6px 0px rgba(91, 192, 190, 0.6);\n  transform: translate(-2px, -2px);\n}', content)

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Restored to Option D with flat utilities")
