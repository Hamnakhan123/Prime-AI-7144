inbox = [
    {"from": "finance@uni.edu", "subject": "Invoice #2231", "folder": "Inbox"},
    {"from": "ali@gmail.com", "subject": "Group project", "folder": "Inbox"},
    {"from": "finance@uni.edu", "subject": "Fee reminder", "folder": "Inbox"},
]
def rule(mail):
    if mail["from"].startswith("finance@") and "invoice" in mail["subject"].lower():
        mail["folder"] = "Finance"; mail["category"] = "Red"
for m in inbox:
    rule(m)
    print(f'{m["subject"]:<15} -> {m["folder"]:<8} {m.get("category", "")}')
