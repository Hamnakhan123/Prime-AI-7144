rate = 0.05                      # cell B1 (absolute: $B$1)
sales = [120000, 85000, 240000, 56000]   # A4:A7 (relative: A4, A5, ...)
for row, s in enumerate(sales, start=4):
    print(f"B{row}: =A{row}*$B$1 -> {s * rate:,.0f}")
