const fs = require('fs');
const p = './src/data/worlds.js';
let s = fs.readFileSync(p, 'utf8');
let c = 1;
s = s.replace(/order:\s*\d+/g, () => 'order: ' + c++);
fs.writeFileSync(p, s);
console.log('Successfully updated order in worlds.js');
