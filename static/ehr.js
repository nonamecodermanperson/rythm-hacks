const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-patient');
const retrievedPatientInfoContainer = document.getElementById('retrieved-patient-info');

searchButton.addEventListener('click', async () => {
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        try {
            console.log('Searching for:', searchTerm);

            // Retrieve the health record from local storage
            const healthRecordString = localStorage.getItem(searchTerm);
            if (healthRecordString) {
                const healthRecordObject = JSON.parse(healthRecordString);

                // Display retrieved patient information on the EHR screen
                let retrievedPatientInfo =
                    `<div class="card mt-2">
                        <div class="card-body">
                            <h5 class="card-title">${healthRecordObject.name}</h5>
                            <p class="card-text">Date: ${healthRecordObject.date}</p>
                            <p class="card-text">Generated Report: ${healthRecordObject.generatedReport}</p>
                        </div>
                    </div>`;

                retrievedPatientInfoContainer.innerHTML = retrievedPatientInfo;
            } else {
                retrievedPatientInfoContainer.innerHTML = '<p>No records found for the specified patient.</p>';
            }
        } catch (error) {
            console.error('Error searching for health records:', error);
        }
    }
});