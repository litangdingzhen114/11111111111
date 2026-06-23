import re

with open('src/app/globals.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the :root variables
root_match = re.search(r':root\s*\{([^}]+)\}', content)
if root_match:
    root_vars = root_match.group(1)
    
    # Replace the html[data-theme-mode="day"] block with the root variables
    content = re.sub(r'html\[data-theme-mode="day"\]\s*\{[^}]+\}', f'html[data-theme-mode="day"] {{{root_vars}}}', content)
    
    with open('src/app/globals.css', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully synchronized day mode with night mode variables.")
else:
    print("Could not find :root variables")
