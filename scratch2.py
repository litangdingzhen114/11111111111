import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Define Dark Brutalism variables
dark_brutalism = """
  --background: #000000;
  --foreground: #ffffff;
  --card: #000000;
  --card-foreground: #ffffff;
  --popover: #000000;
  --popover-foreground: #ffffff;
  --primary: #ffffff;
  --primary-foreground: #000000;
  --secondary: #111111;
  --secondary-foreground: #ffffff;
  --muted: #111111;
  --muted-foreground: #999999;
  --accent: #111111;
  --accent-foreground: #ffffff;
  --destructive: #ff0000;
  --border: #ffffff;
  --input: #ffffff;
  --ring: #ffffff;
  --chart-1: #ffffff;
  --chart-2: #cccccc;
  --chart-3: #999999;
  --chart-4: #666666;
  --chart-5: #333333;
  --radius: 0rem;
  --sidebar: #000000;
  --sidebar-foreground: #ffffff;
  --sidebar-primary: #ffffff;
  --sidebar-primary-foreground: #000000;
  --sidebar-accent: #111111;
  --sidebar-accent-foreground: #ffffff;
  --sidebar-border: #ffffff;
  --sidebar-ring: #ffffff;

  --site-bg: #000000;
  --site-bg-grid: rgba(255, 255, 255, 0.05);
  --site-text: #ffffff;
  --site-muted: #999999;
  --site-muted-strong: #cccccc;
  --site-line: #ffffff;
  --site-panel: #000000;
  --site-panel-hover: #111111;
  --site-panel-strong: #ffffff;
  --site-panel-inverse: #ffffff;
  --site-inverse-text: #000000;
  --site-accent: #ffffff;
  --site-accent-2: #ffffff;
  --site-accent-3: #ffffff;
  --site-button-start: #ffffff;
  --site-button-end: #ffffff;
  --site-button-text: #000000;
  --site-selection: rgba(255, 255, 255, 0.2);
  --site-scrollbar: #ffffff;
  --site-scrollbar-hover: #cccccc;
  --site-gradient-text: #ffffff;
  --featured-bg: #000000;
  --featured-fg: #ffffff;
  --featured-muted: #999999;
  --featured-accent: #ffffff;
  --featured-link-border: #ffffff;
  --featured-link-hover-bg: #ffffff;
  --featured-link-hover-text: #000000;
  --featured-card-bg: #000000;
  --featured-card-fg: #ffffff;
  --featured-card-border: #ffffff;
  --featured-card-muted: #999999;
  --featured-card-count: #666666;
  --featured-card-shadow: 4px 4px 0px rgba(255, 255, 255, 1);
  --featured-card-hover-shadow: 8px 8px 0px rgba(255, 255, 255, 1);
  --featured-card-body-bg: transparent;
  --featured-card-chip-bg: transparent;
  --featured-card-chip-border: #ffffff;
  --featured-card-chip-fg: #ffffff;
  --featured-media-bg: #111111;
  --featured-media-overlay: transparent;
  --featured-media-grid: rgba(255, 255, 255, 0.05);
  --featured-index-bg: #000000;
  --featured-index-fg: #ffffff;
  --featured-index-border: #ffffff;
  --featured-media-pill-bg: #000000;
  --featured-media-pill-fg: #ffffff;
  --featured-media-pill-border: #ffffff;
  --featured-type-bg: #ffffff;
  --featured-type-fg: #000000;
  --featured-action-bg: #ffffff;
  --featured-action-fg: #000000;
  --a11y-panel-bg: #000000;
  --a11y-panel-text: #ffffff;
  --a11y-panel-muted: #999999;
  --a11y-panel-item: #111111;
  --a11y-panel-border: #ffffff;
  --a11y-panel-shadow: 4px 4px 0px #ffffff;
  --a11y-active-bg: #ffffff;
  --a11y-active-text: #000000;
  --a11y-fab-bg: #000000;
  --a11y-fab-icon: #ffffff;
  --a11y-fab-border: #ffffff;
  --a11y-fab-shadow: 4px 4px 0px #ffffff;
  --hero-bg: #000000;
  --hero-vignette-top: transparent;
  --hero-vignette-bottom: transparent;
  --hero-vignette-side: transparent;
  --hero-badge-bg: #000000;
  --hero-badge-border: #ffffff;
  --hero-badge-text: #ffffff;
  --device-shell: #000000;
  --device-screen: #000000;
  --device-panel: #111111;
  --device-panel-strong: #222222;
"""

# Replace the variables blocks inside :root and html[data-theme-mode="day"]
content = re.sub(r':root\s*\{[^}]+\}', f':root {{\n{dark_brutalism}\n}}', content)
content = re.sub(r'html\[data-theme-mode="day"\]\s*\{[^}]+\}', f'html[data-theme-mode="day"] {{\n{dark_brutalism}\n}}', content)

# Update the CTA button to use white borders and shadows
content = re.sub(r'\.site-primary-cta\s*\{[^}]+\}', '.site-primary-cta {\n  background: var(--site-button-start) !important;\n  color: var(--site-button-text) !important;\n  box-shadow: 4px 4px 0px #ffffff;\n  border: 1px solid #ffffff;\n  border-radius: 0 !important;\n}', content)
content = re.sub(r'\.site-primary-cta:hover\s*\{[^}]+\}', '.site-primary-cta:hover {\n  box-shadow: 6px 6px 0px #ffffff;\n  transform: translate(-2px, -2px);\n}', content)

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Dark Brutalism CSS updated successfully")
