items = [("Notebook", 3, 250), ("Pen pack", 2, 180), ("USB drive", 1, 1500)]
for name, qty, price in items:
    print(f"{name:<10} {qty} x {price:>5} = {qty*price:>5}")
print("Column sum of prices :", sum(p for _, _, p in items))
print("Real bill (qty*price):", sum(q*p for _, q, p in items))
