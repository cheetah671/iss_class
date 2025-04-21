const CHANNEL_ID = '2838682';
const READ_API_KEY = 'IC16EXWU5HNTZ192';

// Function to fetch historical data and display graphs
async function fetchHistory(field, title, divID) {
    try {
        const response = await fetch(
            `https://api.thingspeak.com/channels/${CHANNEL_ID}/fields/${field}.json?api_key=${READ_API_KEY}&results=50`
        );
        const data = await response.json();

        const timestamps = data.feeds.map(feed => new Date(feed.created_at).toLocaleString());
        const values = data.feeds.map(feed => parseFloat(feed[`field${field}`]));

        Plotly.newPlot(divID, [{
            x: timestamps,
            y: values,
            mode: 'lines+markers',
            line: { color: '#FF6464' }
        }], { 
            title: title, 
            xaxis: { title: 'Time' }, 
            yaxis: { title: title, gridcolor: '#ccc' } 
        });
    } catch (error) {
        console.error(`Error loading ${title}:`, error);
    }
}

// Fetch history data
fetchHistory(1, '🌡 Temperature', 'temperature-graph');
fetchHistory(2, '💧 TDS', 'tds-graph');
fetchHistory(3, '🌊 Turbidity', 'turbidity-graph');
fetchHistory(4, '⚗ pH Level', 'ph-graph');
