const fs = require('fs');

const QuickChart = require('../build/quickchart.cjs');

const qc = new QuickChart();

qc.setConfig({
    type: 'bar',
    data: { labels: ['Hello', 'Y-Axis?'], datasets: [{label:'Days', data: [1,2,3,4,5,6,7]}]},
});

qc.setWidth(500).setHeight(300).setBackgroundColor('transparent');

async function saveChart() {
    await qc.toFile('/tmp/chart.png');
}

console.log('Written to /tmp/chart.png');

document.querySelector(/*button for chart generation*/).addEventListener('submit', saveChart());