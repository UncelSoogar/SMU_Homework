// from data.js
var tableData = data;


// Append full table to homepage. Append rows to table with a loop
data.forEach((conspiracy) => {
    var row = d3.select('tbody').append("tr");
    Object.entries(conspiracy).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});


// S/U action for all form submission and button click
var button = d3.select("#filter-btn");
var form_date = d3.select('#form-date');
var form_city = d3.select('#form-city');
var form_state = d3.select('#form-state');
var form_country = d3.select('#form-country');
var form_shape = d3.select('#form-shape');

button.on("click", all_filter);
form_date.on("submit", all_filter);
form_city.on("submit", all_filter);
form_state.on("submit", all_filter);
form_country.on("submit", all_filter);
form_shape.on("submit", all_filter);


// Filter for all forms

function all_filter() {
    // Nobody likes fresca
    d3.event.preventDefault();

    // Select and save date input.
    var input_date = d3.select("#datetime");
    var temp_date_value = input_date.property("value");

    // Conditional statement. If input is not empty, reformat date and filter.

    if (temp_date_value != '') {

        // convert to timestamp, and reformat to (m/d/yyyy)
        var timestamp = Date.parse(temp_date_value);
        var date_value = moment(timestamp).format("M/D/YYYY");
        console.log(date_value);

        //filter on reformated date
        var ufo_date = tableData.filter(tableData => tableData.datetime === date_value);
    }
    //If input empty, save full table to same variable
    else {
        var ufo_date = tableData
    };

    // Select, save, and filter city input.
    var input_city = d3.select("#city");
    var city_value = input_city.property("value").toLowerCase();
    if (city_value != '') {
        var ufo_city = ufo_date.filter(ufo_date => ufo_date.city === city_value);
    } else {
        var ufo_city = ufo_date
    };

    // Select, save, and filter state input.
    var input_state = d3.select("#state");
    var state_value = input_state.property("value").toLowerCase();
    if (state_value != '') {
        var ufo_state = ufo_city.filter(ufo_city => ufo_city.state === state_value);
    } else {
        var ufo_state = ufo_state
    };

    // Select, save, and filter state input.
    var input_state = d3.select("#state");
    var state_value = input_state.property("value").toLowerCase();
    if (state_value != '') {
        var ufo_state = ufo_city.filter(ufo_city => ufo_city.state === state_value);
    } else {
        var ufo_state = ufo_city
    };

    // Select, save, and filter country input.
    var input_country = d3.select("#country");
    var country_value = input_country.property("value").toLowerCase();
    if (country_value != '') {
        var ufo_country = ufo_state.filter(ufo_state => ufo_state.country === country_value);
    } else {
        var ufo_country = ufo_state
    };

    // Select, save, and filter shape input.
    var input_shape = d3.select("#shape");
    var shape_value = input_shape.property("value").toLowerCase();
    if (shape_value != '') {
        var ufo_shape = ufo_country.filter(ufo_country => ufo_country.shape === shape_value);
    } else {
        var ufo_shape = ufo_country
    };

    //clear table of all rows inside body
    d3.select('tbody').selectAll('tr').remove();

    //write filtered data to table
    ufo_shape.forEach((conspiracy) => {
        var row = d3.select('tbody').append("tr");
        Object.entries(conspiracy).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};