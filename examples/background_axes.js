
function drawAxesAndBackground(){
///////////////GRID LINES
	// Select the DIV container "D3line" then
	 // add an SVG element to it
	var width = widthBox;
	var height = h - 100;
	var totTm = maxVal(timepoints);

	var st = Math.max(r, padX);
	var edpt = st + nodeX * totTm;


	svg.append("svg:line").attr("x1", st).attr("x2", edpt - nodeX).attr("y1", height - r).attr("y2", height - r).style("stroke", "#ccc")
		.style("stroke-width", .2).style("fill", "#000");

	for (var j = st; j < totTm * (nodeX); j = j + nodeX) {
	    svg.append("svg:line").attr("x1", j).attr("y1", r).attr("x2", j).attr("y2", height - r).style("stroke", "#cdcdcd").style("stroke-width", .2);
	};

	svg.append("svg:text").attr("transform", "translate(25,0)").attr("x", function(d) {
	    wid = edpt - st;
	    fin = (wid / 2) + st - 90;
	    return fin;
	})
		//.attr("y", chary.rangeBand() / 2)
		.attr("y", height - r + 10).attr("dx", -30 + r / 2)
		//.attr("dy", ".35em")
		.attr("dy", 10 + r / 2 - 1).attr("fill", "#777").attr("text-anchor", "front").style("font-size", 12).text("Events in Chronological Order");

}