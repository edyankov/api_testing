arr = [4, 4, 8, 3, 3, 3, 2, 4, 4]

# 1. Print each element of the array
print("1. Each element of the array:")
for el in arr:
    print(el)

# 2. Print the first 3 elements of the array
print("\n2. First 3 elements:")
for el in arr[:3]:
    print(el)

# 3. Print the sum of all elements
print("\n3. Sum of all elements:", sum(arr))

# 4. Print the sum of all elements except elements equal to 4
print("\n4. Sum without elements equal to 4:", sum(el for el in arr if el != 4))