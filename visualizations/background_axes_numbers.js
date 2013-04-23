
function drawAxesAndBackground(){
///////////////GRID LINES
	// Select the DIV container "D3line" then
	 // add an SVG element to it
	var width = widthBox;
	var height = h - 100;
	var totTm = maxVal(timepoints);

	var st = Math.max(r, padX);
	var edpt = st + nodeX * totTm;

	svg.append("svg:rect")
			.attr("x", st)
			//.attr("x2", edpt)
			.attr("height", 15)
			.attr("width", edpt-st-nodeX)
			.attr("y", height-r)
			.style("stroke", "#ccc")
			.style("opacity", .6)
		    .style("stroke-width", .2)
		    .style("fill","#bbb"); 


	svg.append("svg:line").attr("x1", st).attr("x2", edpt - nodeX).attr("y1", height - r).attr("y2", height - r).style("stroke", "#ccc")
		.style("stroke-width", .2).style("fill", "#000");

	for (var j = st; j < totTm * (nodeX); j = j + nodeX) {
	    svg.append("svg:line").attr("x1", j).attr("y1", r).attr("x2", j).attr("y2", height - r).style("stroke", "#cdcdcd").style("stroke-width", .2);
	
		svg.append("svg:text")
	    	.attr("transform","translate(25,0)")
		    .attr("x", j)
		    //.attr("y", chary.rangeBand() / 2)
			.attr("y",function(d,i) { 
				var pos = height - r; 
				return pos;})
		    .attr("dx", -30+r/2)
		    //.attr("dy", ".35em")
		    .attr("dy", 10+r/2-1)
		    .attr("fill", "#fff")
		    .attr("text-anchor", "front")
		    .text(function(d,i) { 
		    	sol = (j-st)/nodeX;
		    	return sol; });

	};



	svg.append("svg:text").attr("transform", "translate(25,0)").attr("x", function(d) {
	    wid = edpt - st;
	    fin = (wid / 2) + st - 113;
	    return fin;
	})
		//.attr("y", chary.rangeBand() / 2)
		.attr("y", height - r + 10).attr("dx", -30 + r / 2)
		//.attr("dy", ".35em")
		.attr("dy", 20 + r / 2 - 1).attr("fill", "#777")
		.attr("text-anchor", "front").style("font-size", 12)
		.text("Events in Chronological Order by Day");

}