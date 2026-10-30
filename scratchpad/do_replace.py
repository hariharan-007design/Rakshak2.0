# Read new function
with open('D:/rakshak-2.0/scratchpad/new_func.txt', 'r', encoding='utf-8') as f:
    new_func = f.read()

# Read app.js
with open('D:/rakshak-2.0/web/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find start and end of polishWithAi function
start = None
end = None
for i, line in enumerate(lines):
    if 'async function polishWithAi()' in line:
        start = i
    if start is not None and end is None and i > start + 20:
        if line.strip() == '}':
            end = i
            break

print(f"Function spans lines {start+1} to {end+1}")

# Replace
new_lines = lines[:start] + [new_func + '\n'] + lines[end+1:]
with open('D:/rakshak-2.0/web/app.js', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

# Verify
with open('D:/rakshak-2.0/web/app.js', 'r', encoding='utf-8') as f:
    content = f.read()
print("transformers references:", content.count('transformers'))
print("Xenova references:", content.count('Xenova'))
print("polishOffline references:", content.count('polishOffline'))
print("Lines:", content.count(chr(10)))
