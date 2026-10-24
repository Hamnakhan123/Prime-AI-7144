students = [
    {"first": "Ayesha", "last": "Khan", "gender": "F", "programme": "Software Engineering"},
    {"first": "Bilal", "last": "Ahmed", "gender": "M", "programme": "Software Engineering"},
    {"first": "Sana", "last": "Raza", "gender": "F", "programme": "AI Track"},
]
template = """{salutation} {last},
Congratulations! You have been accepted into {programme}.
Orientation starts on 3 November.
"""
for s in students:
    salutation = "Dear Ms." if s["gender"] == "F" else "Dear Mr."
    print(template.format(salutation=salutation, last=s["last"], programme=s["programme"]))
