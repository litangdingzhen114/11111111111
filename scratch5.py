import os
import re

# 1. Update globals.css with Brutalist White theme
css_path = 'src/app/globals.css'
with open(css_path, 'r', encoding='utf-8') as f:
    css_content = f.read()

brutalist_white = """
  --background: #fdfcfb;
  --foreground: #111111;
  --card: #ffffff;
  --card-foreground: #111111;
  --popover: #ffffff;
  --popover-foreground: #111111;
  --primary: #111111;
  --primary-foreground: #ffffff;
  --secondary: #f4f4f4;
  --secondary-foreground: #111111;
  --muted: #f4f4f4;
  --muted-foreground: #666666;
  --accent: #f4f4f4;
  --accent-foreground: #111111;
  --destructive: #ff0000;
  --border: #111111;
  --input: #111111;
  --ring: #111111;
  --chart-1: #111111;
  --chart-2: #666666;
  --chart-3: #999999;
  --chart-4: #cccccc;
  --chart-5: #eeeeee;
  --radius: 0rem;
  --sidebar: #ffffff;
  --sidebar-foreground: #111111;
  --sidebar-primary: #111111;
  --sidebar-primary-foreground: #ffffff;
  --sidebar-accent: #f4f4f4;
  --sidebar-accent-foreground: #111111;
  --sidebar-border: #111111;
  --sidebar-ring: #111111;

  --site-bg: #fdfcfb;
  --site-bg-grid: rgba(17, 17, 17, 0.05);
  --site-text: #111111;
  --site-muted: #666666;
  --site-muted-strong: #333333;
  --site-line: rgba(17, 17, 17, 0.15);
  --site-panel: #ffffff;
  --site-panel-hover: #f4f4f4;
  --site-panel-strong: #111111;
  --site-panel-inverse: #111111;
  --site-inverse-text: #ffffff;
  --site-accent: #111111;
  --site-accent-2: #111111;
  --site-accent-3: #111111;
  --site-button-start: #111111;
  --site-button-end: #111111;
  --site-button-text: #ffffff;
  --site-selection: rgba(17, 17, 17, 0.1);
  --site-scrollbar: #111111;
  --site-scrollbar-hover: #000000;
  --site-gradient-text: #111111;
  --featured-bg: #fdfcfb;
  --featured-fg: #111111;
  --featured-muted: #666666;
  --featured-accent: #111111;
  --featured-link-border: #111111;
  --featured-link-hover-bg: #111111;
  --featured-link-hover-text: #ffffff;
  --featured-card-bg: #ffffff;
  --featured-card-fg: #111111;
  --featured-card-border: #111111;
  --featured-card-muted: #666666;
  --featured-card-count: #999999;
  --featured-card-shadow: 4px 4px 0px rgba(17, 17, 17, 1);
  --featured-card-hover-shadow: 8px 8px 0px rgba(17, 17, 17, 1);
  --featured-card-body-bg: transparent;
  --featured-card-chip-bg: transparent;
  --featured-card-chip-border: rgba(17, 17, 17, 0.2);
  --featured-card-chip-fg: #111111;
  --featured-media-bg: #f4f4f4;
  --featured-media-overlay: transparent;
  --featured-media-grid: rgba(17, 17, 17, 0.05);
  --featured-index-bg: #ffffff;
  --featured-index-fg: #111111;
  --featured-index-border: #111111;
  --featured-media-pill-bg: #ffffff;
  --featured-media-pill-fg: #111111;
  --featured-media-pill-border: #111111;
  --featured-type-bg: #111111;
  --featured-type-fg: #ffffff;
  --featured-action-bg: #111111;
  --featured-action-fg: #ffffff;
  --a11y-panel-bg: #ffffff;
  --a11y-panel-text: #111111;
  --a11y-panel-muted: #666666;
  --a11y-panel-item: #f4f4f4;
  --a11y-panel-border: #111111;
  --a11y-panel-shadow: 4px 4px 0px #111111;
  --a11y-active-bg: #111111;
  --a11y-active-text: #ffffff;
  --a11y-fab-bg: #ffffff;
  --a11y-fab-icon: #111111;
  --a11y-fab-border: #111111;
  --a11y-fab-shadow: 4px 4px 0px #111111;
  --hero-bg: #fdfcfb;
  --hero-vignette-top: transparent;
  --hero-vignette-bottom: transparent;
  --hero-vignette-side: transparent;
  --hero-badge-bg: #ffffff;
  --hero-badge-border: #111111;
  --hero-badge-text: #111111;
  --device-shell: #111111;
  --device-screen: #fdfcfb;
  --device-panel: #f4f4f4;
  --device-panel-strong: #eeeeee;
"""

css_content = re.sub(r':root\s*\{[^}]+\}', f':root {{\n{brutalist_white}\n}}', css_content)
css_content = re.sub(r'html\[data-theme-mode="day"\]\s*\{[^}]+\}', f'html[data-theme-mode="day"] {{\n{brutalist_white}\n}}', css_content)

# Update the CTA button
css_content = re.sub(r'\.site-primary-cta\s*\{[^}]+\}', '.site-primary-cta {\n  background: var(--site-button-start) !important;\n  color: var(--site-button-text) !important;\n  box-shadow: 4px 4px 0px #111111;\n  border: 1px solid #111111;\n  border-radius: 0 !important;\n}', css_content)
css_content = re.sub(r'\.site-primary-cta:hover\s*\{[^}]+\}', '.site-primary-cta:hover {\n  box-shadow: 6px 6px 0px #111111;\n  transform: translate(-2px, -2px);\n}', css_content)

with open(css_path, 'w', encoding='utf-8') as f:
    f.write(css_content)


# 2. Walk through all .tsx files and replace hardcoded colors
def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Sort replacements by length to avoid partial matches
    replacements = {
        'text-white/70': 'text-[var(--site-muted)]',
        'text-white/[0.38]': 'text-[var(--site-muted)]',
        'text-white/[0.54]': 'text-[var(--site-muted)]',
        'text-white/[0.48]': 'text-[var(--site-muted)]',
        'text-white/[0.64]': 'text-[var(--site-muted)]',
        'text-white/[0.34]': 'text-[var(--site-muted-strong)]',
        'text-white/[0.45]': 'text-[var(--site-muted)]',
        'text-white/[0.52]': 'text-[var(--site-muted)]',
        'text-white/[0.68]': 'text-[var(--site-muted)]',
        'text-white/[0.36]': 'text-[var(--site-muted)]',
        'text-white/[0.56]': 'text-[var(--site-muted)]',
        'text-white/[0.62]': 'text-[var(--site-muted)]',
        'text-white/[0.42]': 'text-[var(--site-muted)]',
        'text-white/42': 'text-[var(--site-muted)]',
        'text-white/30': 'text-[var(--site-muted)]',
        'text-white/20': 'text-[var(--site-muted)]',
        'text-white': 'text-[var(--site-text)]',
        
        'bg-white/[0.035]': 'bg-[var(--site-panel)]',
        'bg-white/[0.04]': 'bg-[var(--site-panel)]',
        'bg-white/[0.06]': 'bg-[var(--site-panel-hover)]',
        
        'border-white/10': 'border-[var(--site-line)]',
        'border-white/[0.08]': 'border-[var(--site-line)]',
        'border-white/[0.12]': 'border-[var(--site-line)]',
        
        'text-gray-400': 'text-[var(--site-muted)]',
        'text-gray-600': 'text-[var(--site-muted-strong)]',
        'placeholder-gray-600': 'placeholder:text-[var(--site-muted)]'
    }

    # Be careful with word boundaries, text-white shouldn't match inside text-white/70
    # The sorted dictionary handles this if we process longer strings first.
    for old, new in sorted(replacements.items(), key=lambda x: len(x[0]), reverse=True):
        content = content.replace(old, new)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for root, _, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx'):
            process_file(os.path.join(root, file))

print("Done restoring Brutalist White scheme and fixing text contrast.")
