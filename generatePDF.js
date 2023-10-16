async function generatePDF() {
    const averageOfAveragesJSON = localStorage.getItem("averageOfAverages");
    const averageOfAverages = JSON.parse(averageOfAveragesJSON);

    if (averageOfAverages === null) {
        alert("Generate the excel file first.");
        return
    }

    // Define key replacements
    const keyReplacements = {
        "C-I": "About The Programme",
        "J-P": "About The Departmental Facilites - General Infrastructure",
        "Q-T": "About The Departmental Facilites - Library",
        "U-AF": "About The Departmental Facilites - Governance",
    };

    // Replace keys in the averageOfAverages object
    for (const key in keyReplacements) {
        if (averageOfAverages[key]) {
            averageOfAverages[keyReplacements[key]] = averageOfAverages[key];
            delete averageOfAverages[key];
        }
    }

    //create new jspdf document
    const doc = new jspdf.jsPDF()
    var year = new Date().getFullYear();
    // Add the heading at the top of the page
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("DEPARTMENT OF COMPUTER SCIENCE & IT", 105, 15, { align: "center" }); // Center-aligned text
    doc.text("UNIVERSITY OF JAMMU", 105, 20, { align: "center" }); // Center-aligned text
    doc.setFontSize(13);
    doc.text("Overall Student Feedback", 105, 35, { align: "center" }); // Center-aligned text

    // Define the table columns and rows
    const columns = ["Parameter", year];
    const rows = [];

    for (const key in averageOfAverages) {
        rows.push([key, averageOfAverages[key]]);
    }
    doc.autoTable({
        head: [columns],
        body: rows,
        margin: { top: 50 },
        theme: "plain",
        headStyles: { lineWidth: 0.1, cellPadding:3,halign:"center" },
        bodyStyles: { lineWidth: 0.1, cellPadding:7, halign:"center" },
        columnStyles: { 0: { cellWidth: 150 }},
    });
    doc.save('table.pdf');
}