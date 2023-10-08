async function generateXLSX() {
  // Retrieve all feedback entries from Local Storage
  const feedbackEntries = JSON.parse(localStorage.getItem("feedbackEntries")) || [];

  if (feedbackEntries.length === 0) {
    alert("No feedback entries found.");
    return;
  }

  // Calculate the averages for numeric columns (excluding "Name" and "Gender" columns)
  const columnSums = {};
  const columnCounts = {};

  // Create a new Excel workbook and worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("FeedbackData");

  // Add headers to the worksheet
  const headers = Object.keys(feedbackEntries[0]);
  worksheet.addRow(headers);

  // Set cell styles for the headers (bold text, green background, center-aligned text)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 4 * 15;

  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "8CD5EC" }, // Green background color
    };
    cell.alignment = { vertical: "middle", horizontal: "center" }; // Center-align text

    // Reduce column width and enable word wrap for headers that are not "Name" or "Gender"
    if (cell.value !== "Name" && cell.value !== "Gender" && cell.value!=="About The Program") {
      cell.width = 15; // Adjust the width as needed
      cell.alignment = { vertical: "top", horizontal: "center" };
      cell.alignment.wrapText = true;
    }
  });
  // Add data rows to the worksheet
  for (const entry of feedbackEntries) {
    const dataRow = headers.map((header) => entry[header]);
    worksheet.addRow(dataRow);

    // Set a fixed width for "Name" and "Gender" columns
    worksheet.getColumn('A').width = 17; // Column A
    worksheet.getColumn('B').width = 17; // Column B

    // Center-align text in data cells
    const row = worksheet.lastRow;
    row.eachCell((cell) => {
      cell.alignment = { vertical: "middle", horizontal: "center" }; // Center-align text
    });

    // Calculate column sums and counts
    for (const key in entry) {
      if (key !== "Name" && key !== "Gender" && !isNaN(parseFloat(entry[key]))) {
        const value = parseFloat(entry[key]);
        if (!isNaN(value)) {
          columnSums[key] = (columnSums[key] || 0) + value;
          columnCounts[key] = (columnCounts[key] || 0) + 1;
        }
      }
    }
  }

  // Add cell borders to all cells with data or values (including the averages row)
  worksheet.eachRow((row) => {
    row.eachCell((cell) => {
      if (cell.value !== undefined && cell.value !== null) {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      }
    });
  });

  // Calculate column averages and add them to the worksheet
  const columnAverages = {};
  for (const key in columnSums) {
    if (key !== "Name" && key !== "Gender") {
      const average = parseFloat((columnSums[key] / columnCounts[key]).toFixed(2));
      const columnIndex = headers.indexOf(key) + 1; // Adjust the index

      // Add the average value to the cell
      const averageCell = worksheet.getCell(`${getColumnName(columnIndex)}${feedbackEntries.length + 2}`);
      averageCell.value = average;

      // Center-align text in the cell where the average is stored
      averageCell.alignment = { vertical: "middle", horizontal: "center" };

      // Add a yellow fill color to the cell
      averageCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFFF00" }, // Yellow background color
      };

      // Add cell borders to the cell
      averageCell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      };
// Store the average in the corresponding columnAverages object
columnAverages[key] = average;
}
}

// Calculate the average of averages for specific column ranges
const columnRanges = [
["C", "I"],
["J", "P"],
["Q", "T"],
["U", "AF"]
];

// Create an array of the header values for the new row
const newHeaderValues = ["About the Programme", "Two", "Three", "Four"];

// Shift the existing header row down
worksheet.spliceRows(1, 0, []);

// Loop through the column ranges
let headerValueIndex = 0;
for (const [startColumn, endColumn] of columnRanges) {
  // Determine the start and end indices for the new header row
  const startColumnIndex = getColumnNameToIndex(startColumn);
  const endColumnIndex = getColumnNameToIndex(endColumn);

  // Insert the new header values in the specified range
  for (let i = startColumnIndex; i <= endColumnIndex; i++) {
    const cell = worksheet.getCell(1, i);
    
    if (headerValueIndex < newHeaderValues.length) {
      cell.value = newHeaderValues[headerValueIndex];
      // console.log(cell.value);
      headerValueIndex++;
    }
  }

  // Merge the cells for the new header row
  const mergeRange = `${startColumn}1:${endColumn}1`;
  worksheet.mergeCells(mergeRange);

  // Apply styling to the new header row (if needed)
  for (let i = startColumnIndex; i <= endColumnIndex; i++) {
    const cell = worksheet.getCell(1, i);
    cell.font={bold:true}
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // Yellow background color
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  }
}
const averageOfAverages = {};
for (const [startColumn, endColumn] of columnRanges) {
const rangeAverages = [];
for (const key in columnAverages) {
  const columnIndex = headers.indexOf(key) + 1;
  if (columnIndex >= getColumnNameToIndex(startColumn) && columnIndex <= getColumnNameToIndex(endColumn)) {
    rangeAverages.push(columnAverages[key]);
  }
}
const rangeAverage = rangeAverages.length > 0 ? (rangeAverages.reduce((sum, avg) => sum + avg, 0) / rangeAverages.length).toFixed(2) : '0.00';

averageOfAverages[`${startColumn}-${endColumn}`] = rangeAverage;
// Add a new row for the average value and merge cells
const mergeRange = `${startColumn}${feedbackEntries.length + 3}:${endColumn}${feedbackEntries.length + 3}`;
const averageRow = worksheet.getRow(feedbackEntries.length + 3);
averageRow.getCell(getColumnNameToIndex(startColumn)).value = rangeAverage;
worksheet.mergeCells(mergeRange);
  averageRow.eachCell((cell) => {
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" }, // Yellow background color
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    };
  });
}

// Helper function to convert column name to index
function getColumnNameToIndex(columnName) {
let index = 0;
for (let i = 0; i < columnName.length; i++) {
  index = index * 26 + columnName.charCodeAt(i) - 64;
}
return index;
}

  // Generate and save the XLSX file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "feedback.xlsx");
}

function getColumnName(colIndex) {
  // Convert numeric column index to Excel-like column name
  let dividend = colIndex;
  let columnName = "";

  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
}
