coursework = 68.0
def overall(final):
    return coursework * 0.4 + final * 0.6

lo, hi = 0.0, 100.0
for _ in range(40):                 # Goal Seek iterates in a similar way
    mid = (lo + hi) / 2
    if overall(mid) < 75: lo = mid
    else: hi = mid
print(f"Final exam needed: {hi:.2f}%")
print(f"Check: overall = {overall(hi):.2f}%")
