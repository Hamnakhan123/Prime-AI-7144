pages = {
    "HTML - Session 1": ["[todo] install VS Code", "DOCTYPE tells browser HTML5", "[question] why lang attr?"],
    "CSS - Selectors": ["[question] specificity of :is()?", "class beats element", "[todo] finish lab 2"],
}
summary = {"todo": [], "question": []}
for page, lines in pages.items():
    for line in lines:
        for tag in summary:
            if line.startswith(f"[{tag}]"):
                summary[tag].append(f"{line[len(tag)+3:]}  ({page})")
for tag, items in summary.items():
    print(tag.upper())
    for i in items:
        print("  -", i)
