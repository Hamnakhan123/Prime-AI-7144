plan = {"Title": 20, "Problem": 50, "Solution": 60, "How it works": 60, "Evidence": 60, "Ask": 30}
total = sum(plan.values())
print(f"Total: {total} s = {total // 60} min {total % 60} s")
for slide, sec in plan.items():
    bar = "#" * (sec // 10)
    print(f"{slide:<13}{sec:>3}s {bar}")
print("Within 5 minutes?", total <= 300)
