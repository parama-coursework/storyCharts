	/////////// T BARS
function plotDevices() {
	var i=0;
	var foo = [];
	for(i=0;i<tropesList.length;i++)
	{
		foo.push[i];
	}

	var dataB = tropesIncidence;
	var mortdataB = foo;
	//mortData = findMortData(5,15);

	var tBarW = 150,
	    tBarH = 120,
	    agex = d3.scale.linear().domain([0, 5]).range([0, tBarW]),
	    agey = d3.scale.ordinal().domain(d3.range(dataB.length)).rangeBands([0, tBarH]);
		size = 600;
		padding = 20;
		/*fill = d3.scale.category20b();
		fillSet = [];

	for(i=0;i<20;i++)
	{
		fill(i);
	}*/


	var tropeBar = d3.select("#tropeBar")
		.append("svg:svg")
		    .attr("width", tBarW + 40) //add padding for axis labels
		    .attr("height", tBarH + 20)
		  .append("svg:g")
		    .attr("transform", "translate(20,0)");
		tropeBar.append("svg:text")
		  .attr("class", "title")
		  .attr("y", 10 )
		  //.attr("dy", ".71em")
		  //.attr("transform", function(d) {return "translate(" + ((d % numPerRow) * (mainPanelW + margin)) + "," + (Math.floor(d/numPerRow) * (mainPanelH + margin) + textOffset) + ")";})
		  .text("PLOT DEVICES");

	var tBars = tropeBar.selectAll("g.bar")
	    .data(dataB)
	  .enter().append("svg:g").attr("class", "bar");
	    //.attr("class", "oneBar")
	    //.attr("transform", function(d, i) { return "translate(0," + agey(i) + ")"; });


	tBars.append("svg:rect")
	    .attr("x", 0)
	    .attr("y", function(d,i) { return agey(i)+15; })
	    .attr("width", agex)
	    .attr("height", agey.rangeBand())
		.style("fill", function(d,i){ 
		//console.log("fill bar "+fill(i))
		return fill20b(18-2*i)
		})
		.style("opacity", .7)

		.on("mouseout", function(d,i) {
			d3.select(this).style("opacity", .7);
			var selectedTropes = tfTropes(tropesList[i]);

			restoreNodes(selectedTropes, fill(i));
		})
			//console.log(selectedChars);
		 	
			//DM: didn't see this function doing anything
			//highlight(-1);
		


		.on("mouseover", function(d,i) {
			d3.select(this).style("opacity", 1);
			console.log("selected trope is: "+ tropesList[i]);
			var selectedTropes = tfTropes(tropesList[i]);
			highlightNodes(selectedTropes, fill(i));}

			//circle.
			//selectedChars = tfChars(d.name);
			//console.log(selectedChars);
			/*if(mouseIsDown){
				if(maxRange < d.index)
					maxRange = d.index;
				if(minRange > d.index)
					minRange = d.index;
			};*/);

		/*.on("mouseout", function(d,i) {
			if(!mouseIsDown)
				d3.select(this).style("border-color", function(d,i){ 
					return "black"
					});
			//DM: didn't see this function doing anything
			//highlight(-1);
		})*/


		/*.on("mouseover", function(d,i) {
			d3.select(this).style("fill", "blue");
			if(mouseIsDown){
				if(maxRange < d.index)
					maxRange = d.index;
				if(minRange > d.index)
					minRange = d.index;
			};*/


	tBars.append("svg:text")
		.attr("transform","translate(25,0)")
	    .attr("x", agex)
	    //.attr("y", agey.rangeBand() / 2)
		.attr("y",function(d,i) { return 15+ agey(i)+ agey.rangeBand()/2;})
	    .attr("dx", -20)
	    .attr("dy", ".35em")
	    .attr("fill", "black")
	    .attr("text-anchor", "front")
	    .text(function(d,i) { return tropesList[i]; });

		tBars.append("svg:text")
			.attr("transform","translate(25,0)")
		    .attr("x", agex)
		    //.attr("y", agey.rangeBand() / 2)
			.attr("y",function(d,i) { return 15+ agey(i)+ agey.rangeBand()/2;})
		    .attr("dx", -40)
		    .attr("dy", ".35em")
		    .attr("fill", "white")
		    .attr("text-anchor", "front")
		    .text(function(d,i) { return tropesIncidence[i]; });
		   }