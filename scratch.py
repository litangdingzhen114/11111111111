import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove glow
content = re.sub(r'\.glow-purple\s*\{[^}]+\}', '.glow-purple {\n  box-shadow: none !important;\n}', content)
content = re.sub(r'\.glow-purple-strong\s*\{[^}]+\}', '.glow-purple-strong {\n  box-shadow: none !important;\n}', content)

# Remove text gradient
content = re.sub(r'\.text-gradient\s*\{[^}]+\}', '.text-gradient {\n  color: var(--site-gradient-text);\n}', content)

# Remove hero surface background
content = re.sub(r'html\[data-theme-mode="day"\] \.hero-surface\s*\{[^}]+\}', 'html[data-theme-mode="day"] .hero-surface {\n  background: var(--hero-bg) !important;\n}', content)
content = re.sub(r'html:not\(\[data-theme-mode="day"\]\) \.hero-surface\s*\{[^}]+\}', 'html:not([data-theme-mode="day"]) .hero-surface {\n  background: var(--hero-bg);\n}', content)

# Replace CTA button styling
content = re.sub(r'\.site-primary-cta\s*\{[^}]+\}', '.site-primary-cta {\n  background: var(--site-button-start) !important;\n  color: var(--site-button-text) !important;\n  box-shadow: 4px 4px 0px #111111;\n  border: 1px solid #111111;\n  border-radius: 0 !important;\n}', content)
content = re.sub(r'\.site-primary-cta:hover\s*\{[^}]+\}', '.site-primary-cta:hover {\n  box-shadow: 6px 6px 0px #111111;\n  transform: translate(-2px, -2px);\n}', content)

with open('src/app/globals.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("CSS updated successfully")
