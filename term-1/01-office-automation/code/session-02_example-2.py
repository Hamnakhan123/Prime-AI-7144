one_time = 52000          # Office Home & Business 2021 (illustrative)
monthly = 1600            # Microsoft 365 Personal per month (illustrative)
for years in range(1, 5):
    sub = monthly * 12 * years
    better = "subscription" if sub < one_time else "one-time"
    print(f"Year {years}: subscription total = {sub:>6} PKR -> cheaper: {better}")
