// Set constants for frame and vis dimensions (height and width) and margins
const FRAME_HEIGHT = 415;
const FRAME_WIDTH = 415;
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};
const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH = FRAME_WIDTH - MARGINS.left - MARGINS.bottom;

// Create frame1
const FRAME1 = d3.select("#vis1")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Create frame2
const FRAME2 = d3.select("#vis2")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Create frame3
const FRAME3 = d3.select("#vis3")
				.append("svg")
					.attr("height", FRAME_HEIGHT)
					.attr("width", FRAME_WIDTH)
					.attr("class", "frame");

// Reading from iris file
d3.csv("data/iris.csv").then((data) => {

	// Set color based on species 
	const color = d3.scaleOrdinal()
	    .domain(["setosa", "versicolor", "virginica"])
	    .range(["#2B3467", "#BAD7E9", "#EB455F"])

// Petal_Length vs Sepal_Length Scatter plot

	// Find max of y 
	const MAX_Y = d3.max(data, (d) => {
		return parseInt(d.Petal_Length);
	}); 

	// Scale function for y 
	const Y_SCALE = d3.scaleLinear()
						.domain([0, (MAX_Y + 1)])
						.range([VIS_HEIGHT, 0]);

	// Find max of x 
	const MAX_X = d3.max(data, (d) => {
		return parseInt(d.Sepal_Length);
	});

	// Scale function for x
	const X_SCALE = d3.scaleLinear()
						.domain([0, (MAX_X + 1)])
						.range([0, VIS_WIDTH]);
        
  // Add tick marks for x axis
	FRAME1.append("g")
		.attr("transform", 
			"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
		.call(d3.axisBottom(X_SCALE).ticks(8))
			.attr("font-size", "10px");
		
	// Add tick marks for y axis 
	FRAME1.append("g")
		.attr("transform", 
			"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE).ticks(14))
			.attr("font-size", "10px");

	// Plot scatter plot
  const circle1 = FRAME1.append("g")
      .selectAll("dot")
      // Loop through all the data from the dataset and append them as a circle
      .data(data)
      .enter()
      .append("circle")
	      .attr("cx", (d) => { return X_SCALE(d.Sepal_Length) + MARGINS.left; })
				.attr("cy", (d) => { return Y_SCALE(d.Petal_Length) + MARGINS.top; })
				// set color, radius, stroke, and opacity
				.attr("fill", (d) => { return color(d.Species); })
		    .attr("r", 5)
		    .attr("stroke", "none")
		    .style("opacity", 0.5)
		    .attr("class", "point");

// Petal_Width vs Sepal_Width scatter plot

	// Find max of y 
	const MAX_Y2 = d3.max(data, (d) => {
		return parseInt(d.Petal_Width);
	}); 

	// Scale function for y 
	const Y_SCALE2 = d3.scaleLinear()
						.domain([0, (MAX_Y2 + 1)])
						.range([VIS_HEIGHT, 0]);

	// Find max of x 
	const MAX_X2 = d3.max(data, (d) => {
		return parseInt(d.Petal_Length);
	});

	// Scale function for x
	const X_SCALE2 = d3.scaleLinear()
						.domain([0, (MAX_X2 - 1)])
						.range([0, VIS_WIDTH]);

	// Add tick marks for x axis
	FRAME2.append("g")
		.attr("transform", 
			"translate(" + MARGINS.left + "," + (VIS_HEIGHT + MARGINS.bottom) + ")")
		.call(d3.axisBottom(X_SCALE2).ticks(8))
			.attr("font-size", "10px");
		
	// Add tick marks for y axis 
	FRAME2.append("g")
		.attr("transform", 
			"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
		.call(d3.axisLeft(Y_SCALE2).ticks(14))
			.attr("font-size", "10px");

	// Plot scatter plot
  const circle2 = FRAME2.append("g")
  			.selectAll("dot")
	      // Loop through all the data from the dataset and append them as a circle
	      	.data(data)
	       	.enter()
	       	.append("circle")
	       		.attr("cx", (d) => { return X_SCALE2(d.Sepal_Width) + MARGINS.left; })
						.attr("cy", (d) => { return Y_SCALE2(d.Petal_Width) + MARGINS.top; })
						// Set color, radius, stroke, and opacity
						.attr("fill", (d) => { return color(d.Species); })
					  .attr("r", 5)
					  .attr("stroke", "none")
					  .style("opacity", 0.5)
					  .attr("class", "point");

	// Add brushing
	FRAME2
	  	// Add the brush feature using the d3.brush function
	    .call( d3.brush()   
	    // initialize the brush area            
	      .extent([[MARGINS.left, MARGINS.bottom], [VIS_WIDTH + MARGINS.left, VIS_HEIGHT + MARGINS.top]]) 
	      // Each time the brush selection changes, trigger the 'updateChart' function
	      .on("start brush", updateChart)
	      )


// Count of Species Bar chart

	// Scale x axis 
  const X_SCALE3 = d3.scaleBand()
  	.domain(data.map((d) => { return d.Species; }))
    .range([0, VIS_WIDTH])
    .padding(0.2);

	// Add tick marks for x axis
  FRAME3.append("g")
		.attr("transform", "translate(" + MARGINS.left + ", " + (VIS_HEIGHT + MARGINS.top) + ")")
		.call(d3.axisBottom(X_SCALE3))
		.selectAll("text")
	    .attr("transform", "translate(-10,0)rotate(-45)")
	    .style("text-anchor", "end");

	// Find max of y 
	const MAX_Y3 = 50;

  // Scale y axis
  const Y_SCALE3 = d3.scaleLinear()
      .domain([0, (MAX_Y3)])
      .range([VIS_HEIGHT, 0]);

  // Add tick marks for y axis
  FRAME3.append("g")
		.attr("transform", 
				"translate(" + MARGINS.left + "," + (MARGINS.bottom) + ")")
	 	.call(d3.axisLeft(Y_SCALE3).ticks(12))
	  	.attr("font-size", "10px");

	// Plot barchart
	const myBar1 = FRAME3.selectAll("bars")
		// Loop through all the data from the dataset and append them as rectangles
	  	.data(data)
	  	.enter()
	  	.append("rect")
	    	.attr("x", (d) => { return X_SCALE3(d.Species) + MARGINS.left; })
	    	.attr("y", (d) => { return Y_SCALE3(MAX_Y3) + MARGINS.top; })
		    .attr("width", X_SCALE3.bandwidth())
		    .attr("height", (d) => { return VIS_HEIGHT - Y_SCALE3(MAX_Y3); })
		    .attr("fill", (d) => { return color(d.Species); })
		    .style("opacity", 0.5)
		    .attr("class", "bar");

		// Function that is triggered when brushing is performed
		function updateChart(event) {
			extent = event.selection;
			circle1.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top); });
		  circle2.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top); });
		  myBar1.classed("selected", function(d){ return isBrushed(extent, X_SCALE2(d.Sepal_Width) + MARGINS.left, Y_SCALE2(d.Petal_Width) + MARGINS.top); });
		}

		// A function that return TRUE or FALSE according if a dot is in the selection or not
		function isBrushed(brush_coords, cx, cy) {
		    let x0 = brush_coords[0][0],
		        x1 = brush_coords[1][0],
		        y0 = brush_coords[0][1],
			    y1 = brush_coords[1][1]; 
		    // This return TRUE or FALSE depending on if the points is in the selected area
		    return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;    
		 }

});
