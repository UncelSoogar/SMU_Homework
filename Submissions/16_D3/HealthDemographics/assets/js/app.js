// Define graphic area by browser window size
function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("#scatter").select("svg");

    // clear svg is not empty
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // SVG wrapper dimensions are determined by the current browser window.
    var svgWidth = window.innerWidth * .65;
    var svgHeight = window.innerHeight * .60;

    // Create margins and subtract from svg area
    var margin = {
        top: 20,
        right: 100,
        bottom: 90,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper
    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // Append an SVG group
    var scatterGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Initial Axis Values
    var chosenXAxis = "poverty";
    var chosenYAxis = "healthcare";

    // Define, update, and trainsition x-axis range to selected variable
    function xScale(demoData, chosenXAxis) {
        // create scales
        var xLinearScale = d3.scaleLinear()
            .domain([d3.min(demoData, d => d[chosenXAxis]) * 0.8,
                d3.max(demoData, d => d[chosenXAxis]) * 1.2
            ])
            .range([0, width]);
        return xLinearScale;
    }

    // Update xAxis to match selected label
    function renderXAxes(newXScale, xAxis) {
        var bottomAxis = d3.axisBottom(newXScale);
        // Tranistion to new label
        xAxis.transition()
            .duration(1000)
            .call(bottomAxis);
        return xAxis;
    }

    // Define, update, and trainsition y-axis range to selected variable
    function yScale(demoData, chosenYAxis) {
        var yLinearScale = d3.scaleLinear()
            .domain([0, d3.max(demoData, d => d[chosenYAxis])])
            .range([height, 0]);
        return yLinearScale;
    }

    // Update yAxis to match selected label
    function renderYAxes(newYScale, yAxis) {
        var leftAxis = d3.axisLeft(newYScale);
        yAxis.transition()
            .duration(1000)
            .call(leftAxis);
        return yAxis;
    }


    // Update circles with transitions
    function renderXCircles(circlesGroup, newXScale, chosenXAxis) {
        circlesGroup.transition()
            .duration(1000)
            .attr("cx", d => newXScale(d[chosenXAxis]))
        return circlesGroup;
    }

    function renderYCircles(circlesGroup, newYScale, chosenYAxis) {
        circlesGroup.transition()
            .duration(1000)
            .attr("cy", d => newYScale(d[chosenYAxis]))
        return circlesGroup;
    }
    //Update text postion with transition
    function renderXText(textGroup, newXScale, chosenXAxis) {
        textGroup.transition()
            .duration(1000)
            .attr("dx", d => newXScale(d[chosenXAxis]))
        return textGroup;
    }

    function renderYText(textGroup, newYScale, chosenYAxis) {
        textGroup.transition()
            .duration(1000)
            .attr("dy", d => newYScale(d[chosenYAxis]));
        return textGroup;
    }

    // Update circle with new tooltip on mouseover
    function updateCircleToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
        var xlabel;
        if (chosenXAxis === "poverty") {
            xlabel = "Muggles as % of Population";
        } else if (chosenXAxis === "age") {
            xlabel = "Age (Median)";
        } else {
            xlabel = "Household Income (Median)";
        }

        var ylabel;
        if (chosenYAxis === "healthcare") {
            ylabel = "Lacks Healthcare %";
        } else if (chosenYAxis === "obesity") {
            ylabel = "Weekly Every Flavour Bean Consumption (Oz per Capita)";
        } else {
            ylabel = "Weekly Butter Beer Consumpution (L per Capita)";
        }

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .offset([110, -70])
            .html(function(d) {
                return (`<strong>${d.state}</strong><br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`);
            });

        circlesGroup.call(toolTip);

        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data)
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "gray")
                .attr("r", "30");
        })

        // Exit tooltip
        .on("mouseout", function(data, index) {
            toolTip.hide(data);
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("fill", "yellow")
                .attr("r", "15");
        });

        return circlesGroup;
    }

    // Update circle text with new tooltip on mouseover
    function updateTextToolTip(chosenXAxis, chosenYAxis, textGroup) {
        var xlabel;
        if (chosenXAxis === "poverty") {
            xlabel = "Muggles as % of Population";
        } else if (chosenXAxis === "age") {
            xlabel = "Age (Median)";
        } else {
            xlabel = "Household Income (Median)";
        }

        var ylabel;
        if (chosenYAxis === "healthcare") {
            ylabel = "Lacks Healthcare %";
        } else if (chosenYAxis === "obesity") {
            ylabel = "Weekly Every Flavour Bean Consumption (Oz per Capita)";
        } else {
            ylabel = "Weekly Butter Beer Consumpution (L per Capita)";
        }

        var toolTip = d3.tip()
            .attr("class", "d3-tip")
            .offset([110, -70])
            .html(function(d) {
                return (`<strong>${d.state}</strong><br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`);
            });

        textGroup.call(toolTip);

        textGroup.on("mouseover", function(data) {
            toolTip.show(data)
            d3.select(this)
                .attr("cursor", "default");
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("font-size", "24px");
        })

        // Exit tooltip
        .on("mouseout", function(data) {
            toolTip.hide(data);
            d3.select(this)
                .transition()
                .duration(1000)
                .attr("font-size", "12px");
        });

        return textGroup;
    }

    // Read in data 

    d3.csv("assets/data/data.csv").then(function(demoData, err) {
        if (err) throw err;

        // parse data to int
        demoData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.age = +data.age;
            data.income = +data.income;
            data.healthcare = +data.healthcare;
            data.smokes = +data.smokes;
            data.obesity = +data.obesity;

        });

        // xLinearScale function above csv import
        var xLinearScale = xScale(demoData, chosenXAxis);

        // Create y scale function
        var yLinearScale = yScale(demoData, chosenYAxis);

        // Create initial axis functions
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Draw x axis
        var xAxis = scatterGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // Draw y axis
        var yAxis = scatterGroup.append("g")
            .call(leftAxis);

        // Draw initial circles
        var overallPoints = scatterGroup.selectAll("circle")
            .data(demoData)
            .enter();

        var circlesGroup = overallPoints
            .append("circle")
            .attr("r", "15")
            .attr("fill", "yellow")
            .attr("stroke-width", "1")
            .attr("stroke", "black")
            .attr("opacity", ".7");

        //Transition from corner
        circlesGroup
            .transition()
            .duration(2000)
            .attr("cx", d => xLinearScale(d[chosenXAxis]))
            .attr("cy", d => yLinearScale(d[chosenYAxis]));

        // Write circle text
        var textGroup = overallPoints
            .append("text")
            .text(d => d.abbr)
            .attr("font-size", "12px")
            .attr("class", "stateText");

        // Transition from corner
        textGroup
            .transition()
            .duration(2000)
            .attr("dx", d => xLinearScale(d[chosenXAxis]))
            .attr("dy", d => yLinearScale(d[chosenYAxis]))

        // X-axis labels 
        var xlabelsGroup = scatterGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        var povertyLabel = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 20)
            .attr("value", "poverty")
            .classed("active", true)
            .text("Muggles as % of Population");

        var ageLabel = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 40)
            .attr("value", "age")
            .classed("inactive", true)
            .text("Median Age");

        var incomeLabel = xlabelsGroup.append("text")
            .attr("x", 0)
            .attr("y", 60)
            .attr("value", "income")
            .classed("inactive", true)
            .text("Median Income ($)");


        //create group for Y axis labels

        var ylabelsGroup = scatterGroup.append("g")
            .attr("transform", "rotate(-90)");

        var healthcareLabel = ylabelsGroup.append("text")
            .attr("y", 20 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "healthcare")
            .classed("active", true)
            .text("Inadequate Healthcare Access");

        var obesityLabel = ylabelsGroup.append("text")
            .attr("y", 40 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "obesity")
            .classed("inactive", true)
            .text("Weekly Every Flavour Bean Consumption (Oz per Capita)");

        var smokesLabel = ylabelsGroup.append("text")
            .attr("y", 60 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("value", "smokes")
            .classed("inactive", true)
            .text("Weekly Butter Beer Consumpution (L per Capita)");


        // initialize circles and circle text
        circlesGroup = updateCircleToolTip(chosenXAxis, chosenYAxis, circlesGroup);
        textGroup = updateTextToolTip(chosenXAxis, chosenYAxis, textGroup);

        // Event listener to change x-axis on click
        xlabelsGroup.selectAll("text")
            .on("click", function() {
                // get value of selection
                var value = d3.select(this).attr("value");
                if (value !== chosenXAxis) {

                    // replaces chosenXAxis with value
                    chosenXAxis = value;

                    // updates x scale for new data
                    xLinearScale = xScale(demoData, chosenXAxis);

                    // updates x axis with transition
                    xAxis = renderXAxes(xLinearScale, xAxis);

                    // updates circles and text with new x values
                    circlesGroup = renderXCircles(circlesGroup, xLinearScale, chosenXAxis);
                    textGroup = renderXText(textGroup, xLinearScale, chosenXAxis);

                    // updates tooltips with new info
                    circlesGroup = updateCircleToolTip(chosenXAxis, chosenYAxis, circlesGroup);
                    textGroup = updateTextToolTip(chosenXAxis, chosenYAxis, textGroup);

                    // Change selected axis label to active class
                    if (chosenXAxis === "poverty") {
                        povertyLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenXAxis === "age") {
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        ageLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        incomeLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        incomeLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                }
            });


        // Event listener to change x-axis on click
        ylabelsGroup.selectAll("text")
            .on("click", function() {
                var value = d3.select(this).attr("value");
                if (value !== chosenYAxis) {

                    // replaces chosenYAxis with value
                    chosenYAxis = value;

                    // updates y scale for new data
                    yLinearScale = yScale(demoData, chosenYAxis);

                    // updates y axis with transition
                    yAxis = renderYAxes(yLinearScale, yAxis);

                    // updates circles  and text with new y values
                    circlesGroup = renderYCircles(circlesGroup, yLinearScale, chosenYAxis);
                    textGroup = renderYText(textGroup, yLinearScale, chosenYAxis);

                    // updates tooltips with new info
                    circlesGroup = updateCircleToolTip(chosenXAxis, chosenYAxis, circlesGroup);
                    textGroup = updateTextToolTip(chosenXAxis, chosenYAxis, textGroup);

                    // Change selected axis label to active class
                    if (chosenYAxis === "healthcare") {
                        healthcareLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        obesityLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else if (chosenYAxis === "obesity") {
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        smokesLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } else {
                        healthcareLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        obesityLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        smokesLabel
                            .classed("active", true)
                            .classed("inactive", false);
                    }
                }
            });
    }).catch(function(error) {
        console.log(error);
    });
}


// Initialize SVG when browser loads
makeResponsive();

// Resize SVG area when browser window is resized
d3.select(window).on("resize", makeResponsive);