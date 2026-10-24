amount, months = 500000, 36          # Rs 500,000 over 3 years
def pmt(annual_rate):
    r = annual_rate / 12
    return amount * r / (1 - (1 + r) ** -months)
print("Rate   Monthly instalment")
for rate in [0.10, 0.12, 0.14, 0.16, 0.18, 0.20]:
    print(f"{rate:>4.0%}   Rs {pmt(rate):>10,.0f}")
