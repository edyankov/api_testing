import json

# Read the lists.json file
with open("lists.json", "r") as file:
    data = json.load(file)

# Find all list objects and print their ID and name
print("Lists from ClickUp:")
for lst in data["lists"]:
    print(f"ID: {lst['id']} | Name: {lst['name']}")