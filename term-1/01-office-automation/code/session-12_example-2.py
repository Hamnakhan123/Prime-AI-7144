from datetime import date
minutes = {
    "meeting": "Capstone Group 3 - Weekly review",
    "date": date(2026, 11, 2).isoformat(),
    "attendees": ["Ayesha", "Bilal", "Sana", "Usman"],
    "decisions": ["Use Bootstrap 5 grid", "Freeze design by Friday"],
    "actions": [("Ayesha", "Navbar + footer", "Wed"), ("Bilal", "Contact form validation", "Thu")],
}
print(f'{minutes["meeting"]} ({minutes["date"]})')
print("Attendees:", ", ".join(minutes["attendees"]))
print("Decisions:")
for d in minutes["decisions"]:
    print("  *", d)
print("Action items:")
for who, what, due in minutes["actions"]:
    print(f"  [ ] {what:<25} owner={who:<7} due={due}")
