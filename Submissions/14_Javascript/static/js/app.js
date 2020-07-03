// from data.js
var tableData = data;

// Append table to homepage. Append rows to table with a loop
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

    // Select, save, and filter date input.
    var input_date = d3.select("#datetime");
    var date_value = input_date.property("value");

    // Conditional statement. If input is not empty, filter for input.
    if (date_value != '') {
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


// Code used for testing individual filters

// function date_filter() {
//     // Nobody likes fresca
//     d3.event.preventDefault();

//     // Select date input field
//     var input_date = d3.select("#datetime");

//     // Save the date from the input
//     var date_value = input_date.property("value");

//     // Conditional statement. If input is empty, return full table.
//     if (date_value != '') {
//         //Use saved date to filter
//         var ufo_date = tableData.filter(tableData => tableData.datetime === date_value);

//         //clear table of all rows inside body
//         d3.select('tbody').selectAll('tr').remove();

//         //Write filtered data to table
//         ufo_date.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });
//         });
//     }

//     // Else: return full table
//     else {
//         //Write filtered data to table
//         tableData.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });

//         });
//     };
// };

// // city filter

// function city_filter() {
//     // Nobody likes fresca
//     d3.event.preventDefault();

//     // Select date input field
//     var input_city = d3.select("#city");

//     // Save the date from the input. Change to lowercase
//     var city_value = input_city.property("value").toLowerCase();

//     // Conditional statement. If input is empty, return full table.
//     if (city_value != '') {
//         //Use saved date to filter
//         var ufo_city = tableData.filter(tableData => tableData.city === city_value);

//         //clear table of all rows inside body
//         d3.select('tbody').selectAll('tr').remove();

//         //Write filtered data to table
//         ufo_city.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });
//         });
//     }

//     // Else: return full table
//     else {
//         //Write filtered data to table
//         tableData.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });

//         });
//     };
// };

// //state filter
// function state_filter() {
//     // Nobody likes fresca
//     d3.event.preventDefault();

//     // Select date input field
//     var input_state = d3.select("#state");

//     // Save the city from the input. Change to lowercase
//     var state_value = input_state.property("value").toLowerCase();

//     // Conditional statement. If input is empty, return full table.
//     if (state_value != '') {
//         //Use saved date to filter
//         var ufo_state = tableData.filter(tableData => tableData.state === state_value);

//         //clear table of all rows inside body
//         d3.select('tbody').selectAll('tr').remove();

//         //Write filtered data to table
//         ufo_state.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });
//         });
//     }

//     // Else: return full table
//     else {
//         //Write filtered data to table
//         tableData.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });

//         });
//     };
// };

// //country filter
// function country_filter() {
//     // Nobody likes fresca
//     d3.event.preventDefault();

//     // Select date input field
//     var input_country = d3.select("#country");

//     // Save the country from the input. Change to lowercase
//     var country_value = input_country.property("value").toLowerCase();

//     // Conditional statement. If input is empty, return full table.
//     if (country_value != '') {
//         //Use saved date to filter
//         var ufo_country = tableData.filter(tableData => tableData.country === country_value);

//         //clear table of all rows inside body
//         d3.select('tbody').selectAll('tr').remove();

//         //Write filtered data to table
//         ufo_country.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });
//         });
//     }

//     // Else: return full table
//     else {
//         //Write filtered data to table
//         tableData.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });

//         });
//     };
// };

// // shape filter
// function shape_filter() {
//     // Nobody likes fresca
//     d3.event.preventDefault();

//     // Select date input field
//     var input_shape = d3.select("#shape");

//     // Save the shape from the input. Change to lowercase
//     var shape_value = input_shape.property("value").toLowerCase();

//     // Conditional statement. If input is empty, return full table.
//     if (shape_value != '') {
//         //Use saved date to filter
//         var ufo_shape = tableData.filter(tableData => tableData.shape === shape_value);

//         //clear table of all rows inside body
//         d3.select('tbody').selectAll('tr').remove();

//         //Write filtered data to table
//         ufo_shape.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });
//         });
//     }

//     // Else: return full table
//     else {
//         //Write filtered data to table
//         tableData.forEach((conspiracy) => {
//             var row = d3.select('tbody').append("tr");
//             Object.entries(conspiracy).forEach(([key, value]) => {
//                 var cell = row.append("td");
//                 cell.text(value);
//             });

//         });
//     };
// };