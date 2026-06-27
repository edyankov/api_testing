const fs = require("fs");

// Read the list.json file
const rawData = fs.readFileSync("list.json", "utf-8");
const data = JSON.parse(rawData);

// Find all list objects and print their ID and name
console.log("Lists from ClickUp:");
data.lists.forEach((list) => {
  console.log(`ID: ${list.id} | Name: ${list.name}`);
});