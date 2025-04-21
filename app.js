const CHANNEL_ID = '2838682';
const READ_API_KEY = 'IC16EXWU5HNTZ192';
const UPDATE_INTERVAL = 5000; 

const liveDataDiv = document.getElementById('live-data');

// Function to fetch live data from ThingSpeak
async function fetchLiveData() {
    try {
        const response = await fetch(
            `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds/last.json?api_key=${READ_API_KEY}`
        );
        const data = await response.json();

        liveDataDiv.innerHTML = `
            <div class="data-card">
                <p>🌡 Temperature: <b>${data.field1}°C</b></p>
                <p>💧 TDS: <b>${data.field2} ppm</b></p>
                <p>🌊 Turbidity: <b>${data.field3} NTU</b></p>
                <p>⚗ pH Level: <b>${data.field4}</b></p>
                <p>⏳ Last Update: ${new Date(data.created_at).toLocaleString()}</p>
            </div>
        `;

        // Animate the live data
        liveDataDiv.classList.add("fade-in");
        setTimeout(() => liveDataDiv.classList.remove("fade-in"), 1000);
    } catch (error) {
        console.error('Error fetching data:', error);
        liveDataDiv.innerHTML = `<p style="color: red;">⚠ Error loading data</p>`;
    }
}


// Pump Control Buttons
document.getElementById('pump-on').addEventListener('click', () => {
    alert("🚰 Pump Turned ON! (API integration required)");
});
document.getElementById('pump-off').addEventListener('click', () => {
    alert("💧 Pump Turned OFF! (API integration required)");
});

// Fetch live data every 5 seconds
setInterval(fetchLiveData, UPDATE_INTERVAL);

// Initial load
fetchLiveData();
