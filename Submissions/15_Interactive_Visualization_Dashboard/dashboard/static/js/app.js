// Read in data with ajax/jquery,

//Initialize page
$(document).ready(function() {
    populateIDFilter();
});

//populate dropdown, build plots and table based off of dropdown selection
function populateIDFilter() {
    $.ajax({
        type: 'GET',
        url: 'samples.json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            console.log(data);
            data['names'].forEach(function(id) {
                let option = `<option>${id}</option>`;
                $('#selDataset').append(option);
            });
            //Save intial ID to populate charts
            let initID = data['names'][0];
            console.log(initID)
                //load in initial plots and charts
            JacksonPollock(initID);
        }

    });
}

// Function to change table and graphs base on selected ID
function JacksonPollock(id) {
    loadMetaData(id);
    loadBarChart(id);
    drinkChampagne(id);
    TooFastTooFurious(id);
};


//load in metadata
function loadMetaData(id) {
    $.ajax({
        type: 'GET',
        url: 'samples.json',
        contentType: 'application/json;charset=UTF-8',
        //filter on dropdown menu id
        success: function(data) {
            let metaData = data['metadata'].filter(x => x.id == id)[0];
            //clear previous data from table
            $('#sample-metadata').empty();

            //load filtered metadata
            Object.entries(metaData).forEach(function([key, value]) {
                let info = `<h4><b>${key.toUpperCase()}</b> : ${value} </h4>`;
                $('#sample-metadata').append(info);
            });
        }
    });
}

function loadBarChart(id) {
    $.ajax({
        type: 'GET',
        url: 'samples.json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            //select all otu frequency data, bacterium name
            let sampleData = data['samples'].filter(x => x.id == id)[0];
            let plotData = sampleData['otu_ids'].map(function(e, i) {
                return [e, sampleData['sample_values'][i], sampleData['otu_labels'][i].split(';').pop()];
            });
            console.log(plotData);

            //select top 10 descending, reverse so displayed in descending order
            let plotSorted = plotData.sort((a, b) => b[1] - a[1]);
            x = plotSorted.map(x => x[1]).slice(0, 10).reverse();
            y = plotSorted.map(x => 'OTU' + x[0]).slice(0, 10).reverse()
            t = plotSorted.map(x => x[2]).slice(0, 10).reverse();
            console.log(x)
                //create traces, layout, and plot data.
            var traces = [{
                type: 'bar',
                x: x,
                y: y,
                text: t,
                orientation: 'h'
            }];

            var layout = {
                title: '10 Most Populous Bacterium',
                font: {
                    size: 16,
                    color: '#337ab7'
                },
                xaxis: { title: 'Population' }

            };
            Plotly.newPlot('bar', traces, layout);
        }
    });
}

function drinkChampagne(id) {
    $.ajax({
        type: 'GET',
        url: 'samples.json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            let sampleData = data['samples'].filter(x => x.id == id)[0];

            var trace1 = {
                x: sampleData['otu_ids'],
                y: sampleData['sample_values'],
                mode: 'markers',
                marker: {
                    size: sampleData['sample_values'].map(x => x * 0.7),
                    color: sampleData['otu_ids'],
                    colorscale: 'Portland'
                }
            };

            var dataset = [trace1];

            var layout = {
                title: 'Population by Bacterium',
                font: {
                    size: 16,
                    color: '#337ab7'
                },
                showlegend: false,
                xaxis: { title: 'Bacterium by OTU ID' },
                yaxis: { title: 'Population' }
            };

            Plotly.newPlot('bubble', dataset, layout);
        }
    });
}

function TooFastTooFurious(id) {
    $.ajax({
        type: 'GET',
        url: 'samples.json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {

            //create gauge chart
            let traces = [{
                type: "indicator",
                mode: "gauge+number",
                value: data['metadata'].filter(x => x.id == id)[0]['wfreq'],
                title: { text: "Wash Frequency", font: { size: 24 } },
                gauge: {
                    axis: { range: [null, 10], tickwidth: 2, tickcolor: "black" },
                    bar: { color: "#337ab7" },
                    borderwidth: 1,
                    bordercolor: "black",
                    steps: [
                        { range: [0, 2], color: "gray" },
                        { range: [2, 4], color: "DarkGray" },
                        { range: [4, 6], color: "Silver" },
                        { range: [6, 8], color: "LightGrey" },
                        { range: [8, 10], color: "Gainsboro" },

                    ],

                }
            }];

            var layout = {
                width: 500,
                height: 400,
                margin: { t: 25, r: 25, l: 25, b: 25 },
                font: { color: "#337ab7" }
            };

            Plotly.newPlot('gauge', traces, layout);
        }
    });

}


//event listener for dropdown menu change
// $('#selDataset').change(function() {
//             updatePlotly();