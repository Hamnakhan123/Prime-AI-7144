rows = [("Ayesha", 18, 27, 44), ("Bilal", 12, 19, 30), ("Sana", 20, 25, 41), ("Usman", 8, 14, 22)]

def grade(p):            # same logic as =IFS(...)
    if p >= 0.8: return "A"
    if p >= 0.65: return "B"
    if p >= 0.5: return "C"
    return "F"

totals = []
for name, q, m, f in rows:
    total = q + m + f
    totals.append(total)
    print(f"{name:<7} total={total:>3}  percent={total/100:.0%}  grade={grade(total/100)}")
print("Class average:", sum(totals) / len(totals))
print("Passed:", sum(1 for t in totals if grade(t/100) != "F"))
