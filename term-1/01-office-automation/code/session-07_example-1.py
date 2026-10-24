import pandas as pd
sales = pd.DataFrame({
    "City":    ["Karachi", "Lahore", "Karachi", "Islamabad", "Lahore", "Karachi", "Islamabad", "Lahore"],
    "Product": ["Laptop", "Laptop", "Phone", "Phone", "Phone", "Laptop", "Laptop", "Tablet"],
    "Amount":  [180000, 175000, 60000, 65000, 58000, 190000, 170000, 45000],
})
pt = pd.pivot_table(sales, index="City", columns="Product", values="Amount",
                    aggfunc="sum", fill_value=0, margins=True, margins_name="Grand Total")
print(pt)
print()
share = (sales.groupby("City")["Amount"].sum() / sales["Amount"].sum() * 100).round(1)
print("% of grand total by city:")
print(share.to_string())
