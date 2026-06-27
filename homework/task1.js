const arr = [4, 4, 8, 3, 3, 3, 2, 4, 4];

// 1. Print each element of the array
console.log("1. Each element of the array:");
arr.forEach((el) => console.log(el));

// 2. Print the first 3 elements of the array
console.log("\n2. First 3 elements:");
arr.slice(0, 3).forEach((el) => console.log(el));

// 3. Print the sum of all elements
const sum = arr.reduce((acc, el) => acc + el, 0);
console.log("\n3. Sum of all elements:", sum);

// 4. Print the sum of all elements except elements equal to 4
const sumWithout4 = arr
  .filter((el) => el !== 4)
  .reduce((acc, el) => acc + el, 0);
console.log("\n4. Sum without elements equal to 4:", sumWithout4);