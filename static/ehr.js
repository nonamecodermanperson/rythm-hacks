document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-patient');
    const retrievedPatientInfoContainer = document.getElementById('retrieved-patient-info');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();
        const testHealthRecords = [
            {
                name: "John Doe",
                symptoms: "Fever, cough",
                diagnosis: "Common cold",
                recommendations: "Get plenty of rest",
                generatedReport: "Patient is advised to take medication and rest."
            },
            {
                name: "Jane Smith",
                symptoms: "Headache, fatigue",
                diagnosis: "Migraine",
                recommendations: "Avoid triggers, take pain relief",
                generatedReport: "Patient should rest in a quiet, dark room and take pain relief as needed."
            }
            // Add more test health records if needed
        ];
        
        if (searchTerm) {
            try {
                console.log('Searching for:', searchTerm);

                // Simulated response using testHealthRecords for testing
                const matchingRecords = testHealthRecords.filter(record =>
                    record.name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (matchingRecords.length > 0) {
                    // Display retrieved patient information on the EHR screen
                    let retrievedPatientInfo = '';

                    matchingRecords.forEach(record => {
                        retrievedPatientInfo += `
                            <div class="card mt-2">
                                <div class="card-body">
                                    <h5 class="card-title">${record.name}</h5>
                                    <p class="card-text">Symptoms: ${record.symptoms}</p>
                                    <p class="card-text">Diagnosis: ${record.diagnosis}</p>
                                    <p class="card-text">Recommendations: ${record.recommendations}</p>
                                    <p class="card-text">Generated Report: ${record.generatedReport}</p>
                                </div>
                            </div>
                        `;
                    });

                    retrievedPatientInfoContainer.innerHTML = retrievedPatientInfo;
                } else {
                    retrievedPatientInfoContainer.innerHTML = '<p>No records found for the specified patient.</p>';
                }
            } catch (error) {
                console.error('Error searching for health records:', error);
            }
        }
    });
});
