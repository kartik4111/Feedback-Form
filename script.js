document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Retrieve existing feedback data from Local Storage or initialize an empty array
    let feedbackEntries = JSON.parse(localStorage.getItem("feedbackEntries")) || [];

    // Create a new feedback entry
    const feedbackData = {
        Name: document.getElementById("name").value.toUpperCase(),
        Gender: document.querySelector('input[name="gender"]:checked').value.toUpperCase(),
        "1. Aims & objectives of the programme are well defined and stand communicated": parseInt(document.querySelector('input[name="ques01"]:checked').value),
        "2. The programme has a blend of theory & concepts as well as applied/latest information & knowledge": parseInt(document.querySelector('input[name="ques02"]:checked').value),
        "3. The programme provides knowledge & skills for employability/entrepreneurship": parseInt(document.querySelector('input[name="ques03"]:checked').value),
        "4. The programme builds and enhances knowledge and interest in the area": parseInt(document.querySelector('input[name="ques04"]:checked').value),
        "5. The infrastructural facilities/equipments are adequate & appropriate to the requirement of the programme": parseInt(document.querySelector('input[name="ques05"]:checked').value),
        "6. Teaching inputs are relevant & appropriate for the programme": parseInt(document.querySelector('input[name="ques06"]:checked').value),
        "7. The books/reference material are available & adequate for the programme": parseInt(document.querySelector('input[name="ques07"]:checked').value),
        "1.	The department has adequate and well maintained infrastructure facilities for teaching-learning (Classrooms/ theatre halls/labs etc)": parseInt(document.querySelector('input[name="ques11"]:checked').value),
        "2.	The classrooms are equipped with the necessary ICT": parseInt(document.querySelector('input[name="ques12"]:checked').value),
        "3.	The Department has back-up facility during power shut downs": parseInt(document.querySelector('input[name="ques13"]:checked').value),
        "4.	Availability of clean drinking water facility in the Department": parseInt(document.querySelector('input[name="ques14"]:checked').value),
        "5.	The washrooms are well maintained & cleaned": parseInt(document.querySelector('input[name="ques15"]:checked').value),
        "6.	The students have access to internet and photocopying  facility in the Department": parseInt(document.querySelector('input[name="ques16"]:checked').value),
        "7.	The department has facilities for the differently-abled": parseInt(document.querySelector('input[name="ques17"]:checked').value),
        "1.	The library has physical facilities like adequate seating space, adequate ventilation (Air Cooler/fans), and proper illumination": parseInt(document.querySelector('input[name="ques21"]:checked').value),
        "2.	Adequate number of books/copies of books available": parseInt(document.querySelector('input[name="ques22"]:checked').value),
        "3.	Latest editions of text books, reference books, journals are available in the library": parseInt(document.querySelector('input[name="ques23"]:checked').value),
        "4.	The library staff is helpful and cordial": parseInt(document.querySelector('input[name="ques24"]:checked').value),
        "1.	Induction/orientation programmes are held at the beginning of the semester": parseInt(document.querySelector('input[name="ques31"]:checked').value),
        "2.	Teaching plans of courses are circulated at the beginning of the semester": parseInt(document.querySelector('input[name="ques32"]:checked').value),
        "3.	The attendance and notifications with respect to examinations are displayed timely on the notice boards": parseInt(document.querySelector('input[name="ques33"]:checked').value),
        "4.	Grievances /problems, if any are redressed well in time at departmental level": parseInt(document.querySelector('input[name="ques34"]:checked').value),
        "5.	Availability of suggestion boxes & mechanism for obtaining feedback is prevalent in the department": parseInt(document.querySelector('input[name="ques35"]:checked').value),
        "6.	There is interaction with experts/resource persons from other Universities": parseInt(document.querySelector('input[name="ques36"]:checked').value),
        "7.	There is interaction with experts from the Industry/any other field other than Higher Education Institution": parseInt(document.querySelector('input[name="ques37"]:checked').value),
        "8.	Activities other than academics (cultural,  sports etc)  are actively held for the students": parseInt(document.querySelector('input[name="ques38"]:checked').value),
        "9.	Academic activities like seminars, conferences, publishing magazines etc. organized regularly": parseInt(document.querySelector('input[name="ques39"]:checked').value),
        "10. Outreach/ community development programmes are held for the students": parseInt(document.querySelector('input[name="ques310"]:checked').value),
        "11. The Department provides campus placement opportunities": parseInt(document.querySelector('input[name="ques311"]:checked').value),
        "12. There is a strong Alumni network/Association of the Department": parseInt(document.querySelector('input[name="ques312"]:checked').value),

    };

    // Add the new feedback entry to the array
    feedbackEntries.push(feedbackData);

    // Store the updated array in Local Storage
    localStorage.setItem("feedbackEntries", JSON.stringify(feedbackEntries));

    // Display a success message
    alert("Feedback submitted successfully!");

    // Clear the form for the next entry
    document.getElementById("feedbackForm").reset();
});
