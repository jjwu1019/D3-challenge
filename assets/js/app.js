// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


d3.csv("./assets/data/data.csv").then(function(x) {
    console.log(x)
    
    // Step 1: Parse Data/Cast as numbers
    // ==============================
    x.forEach(function(data) {
      data.poverty = +data.poverty;
      data.healthcareLow = +data.healthcareLow;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(x, d => d.poverty)-1 , d3.max(x, d => d.poverty)])
      .range([0, width]);

      var yLinearScale = d3.scaleLinear()
      .domain([d3.min(x, d => d.healthcareLow)-1 , d3.max(x, d => d.healthcareLow)])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
      var bottomAxis = d3.axisBottom(xLinearScale);
      var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

      // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Lacks Healthcare (%)");

  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("In Poverty (%)");

    // Step 5: Create Circles
    // ==============================
    // var circlesGroup = chartGroup.selectAll("circle")
    // .data(x)
    // .enter()
    // .append("circle")
    // .attr("cx", d => xLinearScale(d.poverty))
    // .attr("cy", d => yLinearScale(d.healthcareLow))
    // .attr("r", "10")
    // .attr("fill", "blue")
    // .attr("opacity", "0.3");

    var elem = chartGroup.selectAll("g")
        .data(x);
    
    var elemEnter = elem.enter()
        .append("g")
        .attr("transform", d => `translate(${xLinearScale(d.poverty)} , ${yLinearScale(d.healthcareLow)})`)
        //.attr("transform", function(d){return `translate(${xLinearScale(d.poverty)} , ${yLinearScale(d.healthcareLow)})`})
    
    
    elemEnter.append("text")
        .attr("dx", function(d){return -10})
        .attr("dy", function(d){return +5})
        .attr("fill", "black")
        .text(function(d){return d.abbr});
    
    var circle = elemEnter.append("circle")
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", "0.3");
    


    /*
    // Step 6: Initialize tool tip
    // ==============================
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.abbr}<br>poverty%: ${d.poverty}<br>healthcarelow%: ${d.healthcareLow}`);
      });
    
    // Step 7: Create tooltip in the chart
    // ==============================
    chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    circlesGroup.on("click", function(data) {
        toolTip.show(data, this);
      })
        // onmouseout event
        .on("mouseout", function(data, index) {
          toolTip.hide(data);
        });
    */
    

}).catch(function(error) {
    console.log(error);
  });

