const fs = require('fs-extra');
const parse = require('csv-parse/lib/sync');

const dataPath = __dirname + '/../data.csv';
const outputPath = __dirname + '/../data.json';

;(async function() {
  const file = await fs.readFile(dataPath);
  const data = parse(file, {
    columns: true,
    skip_empty_lines: true
  });
  const cleanedData = data.map(el => {
    delete el[''];
    return el;
  })
  fs.writeFile(outputPath, JSON.stringify(cleanedData, null, 2))
})()