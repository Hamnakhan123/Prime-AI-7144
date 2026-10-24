files_gb = {"Lecture recordings": 3.2, "Photos": 1.4, "Projects": 0.6, "Documents": 0.3}
for plan, quota in [("Free", 5), ("Microsoft 365", 1024)]:
    used = sum(files_gb.values())
    print(f"{plan:<14} used {used:.1f} / {quota} GB  ->  {used/quota:.1%} full")
online_only = files_gb["Lecture recordings"]
print(f"Making recordings online-only frees {online_only} GB on your laptop disk")
