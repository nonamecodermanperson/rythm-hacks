const symptomsInput = document.getElementById('symptoms');
const diagnosisInput = document.getElementById('diagnosis');
const recommendationsInput = document.getElementById('recommendations');
const generateReportButton = document.getElementById('generate-report');
const generatedReportOutput = document.getElementById('generated-report');
const patientNameInput = document.getElementById('patient-name');
const saveRecordButton = document.getElementById('save-record');

generateReportButton.addEventListener('click', async () => {
    const symptoms = symptomsInput.value;
    const diagnosis = diagnosisInput.value;
    const recommendations = recommendationsInput.value;

    const formData = new FormData();
    formData.append('symptoms', symptoms);
    formData.append('diagnosis', diagnosis);
    formData.append('recommendations', recommendations);

    try {
        const response = await axios.post('/generate-report', formData);

        let generatedReport = response.data.generated_report;
        generatedReport = `Medical Report:
        
        Presenting Symptoms: ${symptoms}
        
        Clinical Diagnosis: ${diagnosis}
        
        Proposed Therapeutic Interventions: ${recommendations}
        
        This report provides a comprehensive overview of the patient's presenting symptoms, clinical diagnosis based on our assessment, and proposed therapeutic interventions. It is intended for professional review and further medical consultation.`;
        
        generatedReportOutput.textContent = "";
        patientNameInput.value = ""; // Clear the patient name input
        generatedReportOutput.contentEditable = true; // Make the generated report editable
        generatedReportOutput.focus(); // Set focus on the generated report for editing

        let delay = 0; // Initial delay time
        const delayIncrement = 50; // Delay time between each character
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
    const date = new Date().toLocaleDateString(); // Get the current date
    const generatedReport = generatedReportOutput.textContent;

    const healthRecord = {
        name: patientName,
        date: date,
        generatedReport: generatedReport
    };

    localStorage.setItem(patientName, JSON.stringify(healthRecord)); // Save to local storage

    console.log(`Health record for ${patientName} saved on ${date}.`);

    generatedReportOutput.contentEditable = false; // Disable editing after saving
});