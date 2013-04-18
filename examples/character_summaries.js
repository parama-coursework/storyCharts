function characterSummaries() {
		///////////////Character bars	
		var i=0;
		var foo = [];
		for(i=0;i<characters.length;i++)
		{
			foo.push[characters[i].name];
			//console.log(foo);
		}

		//console.log(foo);

		var dataB = totalChars();
		var mortdataB = foo;
		//mortData = findMortData(5,15);

		var cBarW = 250,
		    cBarH = 150,
		    charx = d3.scale.linear().domain([0, 35]).range([0, cBarW]),
		    chary = d3.scale.ordinal().domain(d3.range(dataB.length)).rangeBands([0, cBarH]);
			size = 300;
			padding = 20;
			fill = d3.scale.category20c();
			for(i=0;i<20;i++)
			{
				fill(i);
			}

			fill = d3.scale.category20b();
			for(i=0;i<20;i++)
			{
				fill20b(i);
			}

			var fillryb = d3.scale.ordinal()
	    	.range(colorbrewer.RdYlBu[9]);

			for (i = 0; i < 9; i++) {
			    fillryb(i);
			}

			fill10 = d3.scale.category10();

			for(i=0;i<20;i++)
			{
				fill10(i);
			}


		var charBar = d3.select("#charBar")
			.append("svg:svg")
			    .attr("width", cBarW + 40) //add padding for axis labels
			    .attr("height", cBarH + 20)
			  .append("svg:g")
			    .attr("transform", "translate(20,0)");
			charBar.append("svg:text")
			  .attr("class", "title")
			  .attr("y", 10 )
			  //.attr("dy", ".71em")
			  //.attr("transform", function(d) {return "translate(" + ((d % numPerRow) * (mainPanelW + margin)) + "," + (Math.floor(d/numPerRow) * (mainPanelH + margin) + textOffset) + ")";})
			  .text("CHARACTERS");

		var cBars = charBar.selectAll("g.bar")
		    .data(dataB)
		  .enter().append("svg:g").attr("class", "bar");
		    //.attr("class", "oneBar")
		    //.attr("transform", function(d, i) { return "translate(0," + chary(i) + ")"; });


		cBars.append("svg:rect")
		    .attr("x", 0)
		    .attr("y", function(d,i) { return chary(i)+15; })
		    .attr("width", charx)
		    .attr("height", chary.rangeBand())
			.style("fill", function(d,i){ 
			//console.log("fill bar "+fill(i))
			return fill20b(i)
			})
			.style("opacity", .7)

			.on("mouseout", function(d,i) {
				d3.select(this).style("opacity", .7);
				selectedChars = tfChars(" ");

				restoreNodes(selectedChars, fill20b(i));
			})
				//console.log(selectedChars);
			 	
				//DM: didn't see this function doing anything
				//highlight(-1);
			


			.on("mouseover", function(d,i) {
				d3.select(this).style("opacity", 1);
				console.log("selected name is: "+ characters[i].name);
				var chartf = tfChars(characters[i].name);
				console.log("chartf is: "+chartf);
				outlineNodes(chartf, fill20b(i));}

				//circle.
				//selectedChars = tfChars(d.name);
				//console.log(selectedChars);
				/*if(mouseIsDown){
					if(maxRange < d.index)
						maxRange = d.index;
					if(minRange > d.index)
						minRange = d.index;
				};*/);


		cBars.append("svg:text")
			.attr("transform","translate(25,0)")
		    .attr("x", charx)
		    //.attr("y", chary.rangeBand() / 2)
			.attr("y",function(d,i) { return 15+ chary(i)+ chary.rangeBand()/2;})
		    .attr("dx", -20)
		    .attr("dy", ".35em")
		    .attr("fill", "black")
		    .attr("text-anchor", "front")
		    .text(function(d,i) { return characters[i].name; });

		cBars.append("svg:text")
			.attr("transform","translate(25,0)")
		    .attr("x", charx)
		    //.attr("y", chary.rangeBand() / 2)
			.attr("y",function(d,i) { return 15+ chary(i)+ chary.rangeBand()/2;})
		    .attr("dx", -37)
		    .attr("dy", ".35em")
		    .attr("fill", "white")
		    .attr("text-anchor", "front")
		    .text(function(d,i) { 

		    	if(dataB[i]<10)
		    	{
		    		digit = dataB[i];
		    		composed = " "+digit;
		    		return composed;
		    	}
		    	else
		    	{
		    		return dataB[i];
		    	}

		    });
		}









