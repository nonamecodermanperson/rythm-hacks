const symptomsInput = document.getElementById('symptoms');
const diagnosisInput = document.getElementById('diagnosis');
const recommendationsInput = document.getElementById('recommendations');
const generateReportButton = document.getElementById('generate-report');
const generatedReportOutput = document.getElementById('generated-report');
const patientNameInput = document.getElementById('patient-name');
const saveRecordButton = document.getElementById('save-record');
const healthRecords = [];

generateReportButton.addEventListener('click', async () => {
    console.log("Generate Report button clicked");

    const symptoms = symptomsInput.value;
    const diagnosis = diagnosisInput.value;
    const recommendations = recommendationsInput.value;

    const prompt = `The patient has been experiencing ${symptoms} for the past few days, which are suggestive of ${diagnosis}. The primary concern is a suspected ${diagnosis} infection. As part of the recommended care plan, the patient is advised to ${recommendations}. Close monitoring of symptoms and proper rest are also recommended to ensure a swift recovery.`;

    console.log("Symptoms:", symptoms);
    console.log("Diagnosis:", diagnosis);
    console.log("Recommendations:", recommendations);

    const formData = new FormData();
    formData.append('symptoms', symptoms);
    formData.append('diagnosis', diagnosis);
    formData.append('recommendations', recommendations);

    try {
        console.log("Sending request to server...");
        const response = await axios.post('/generate-report', formData);
        console.log("Server response:", response.data);

        let generatedReport = response.data.generated_report;
        generatedReport = `Hey there! I'm here to help you understand your health better. It looks like you've been experiencing ${symptoms} lately, which could be indicative of ${diagnosis}. Don't worry though, we've got you covered! Our recommended care plan includes ${recommendations}. Make sure to keep an eye on your symptoms and get plenty of rest so you can recover quickly. Take care!`;
        console.log("Generated Report:", generatedReport);

        generatedReportOutput.textContent = "";
        patientNameInput.value = ""; // Clear the patient name input
        generatedReportOutput.contentEditable = true; // Make the generated report editable
        generatedReportOutput.focus(); // Set focus on the generated report for editing

        let delay = 0; // initial delay time
        const delayIncrement = 100; // delay time between each character
        for (const character of generatedReport) {
            setTimeout(() => {
                generatedReportOutput.textContent += character;
            }, delay);
            delay += delayIncrement;
        }
    } catch (error) {
        console.error('Error generating report:', error);
    }
});

saveRecordButton.addEventListener('click', () => {
    const patientName = patientNameInput.value;
    const symptoms = symptomsInput.value;
    const diagnosis = diagnosisInput.value;
    const recommendations = recommendationsInput.value;
    const generatedReport = generatedReportOutput.textContent;

    const healthRecord = {
        name: patientName,
        symptoms: symptoms,
        diagnosis: diagnosis,
        recommendations: recommendations,
        generatedReport: generatedReport
    };

    healthRecords.push(healthRecord);
    console.log(`Health record for ${patientName} saved.`);

    generatedReportOutput.contentEditable = false; // Disable editing after saving
});