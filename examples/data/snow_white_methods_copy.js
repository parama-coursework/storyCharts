
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// 
//~~~~~~~~~ Datavore Tables ~~~~~~~~~//
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~// 


// methods need to write

//make nodes given data
//make links given data

//so real question is, what is the easiest way to enter data?

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

/* ~~~~~~~~~~ DATA PROCESSING FUNCTIONS ~~~~~~~~~~~~~~~~~ */


function determineDistTropes()
{
	//returns an array of 4 values: [list of tropes, array with distribution of how many times each trope appears, array with specific nodes corresponding to each trope, total number of nodes with tropes]
	
	//lets compile total number of tropes used
	var p=0;
	var count = 0;
	for(p=0;p<tropes.length;p++)
	{
		count = count + tropes[p].length;
	}
	
	tropestotal = count;
	
	//now lets iterate through and store new tropes
	tropeslist = [];
	nodeslist = [];
	tropescount = []
	//console.log("length of tropeslist is "+tropeslist.length);
	for(i=0;i<tropes.length;i++)
	{
		if(tropes[i].length>0)
		{
			var j=0;
			for(j=0;j<tropes[i].length;j++)
			{
				if(!contain(tropes[i][j],tropeslist))
				{
					tropeslist.push(tropes[i][j]);
					nodeslist.push([i]);
					tropescount.push(1);
				}
				else
				{
					var k=0;
					for(k=0;k<tropeslist.length;k++)
					{
						if(tropes[i][j]===tropeslist[k])
						{
							nodeslist[k].push(i);
							tropescount[k]=tropescount[k]+1;
						}
					}
				}
			}
		}
	}
	
	var giveback = [];
	giveback.push(tropeslist);
	giveback.push(tropescount);
	giveback.push(nodeslist);
	giveback.push(tropestotal);
	
	return giveback;
	
}

function determineDistThemes()
{
	//returns an array of 4 values: [list of themes, array with distribution of how many times each theme appears, array with specific nodes corresponding to each theme, total number of nodes with themes]
	
	//lets compile total number of themes used
	var p=0;
	var count = 0;
	for(p=0;p<themes.length;p++)
	{
		count = count + themes[p].length;
	}
	
	themestotal = count;
	
	//now lets iterate through and store new themes
	themeslist = [];
	nodeslist = [];
	themescount = [];
	for(i=0;i<themes.length;i++)
	{
		if(themes[i].length>0)
		{
			var j=0;
			for(j=0;j<themes[i].length;j++)
			{
				if(!contain(themes[i][j],themeslist))
				{
					themeslist.push(themes[i][j]);
					nodeslist.push([i]);
					themescount.push(1);
				}
				else
				{
					var k=0;
					for(k=0;k<themeslist.length;k++)
					{
						if(themes[i][j]===themeslist[k])
						{
							nodeslist[k].push(i);
							themescount[k]=themescount[k]+1;
						}
					}
				}
			}
		}
	}
	
	var giveback = [];
	giveback.push(themeslist);
	giveback.push(themescount);
	giveback.push(nodeslist);
	giveback.push(themestotal);
	
	return giveback;
	
}




function sortByTrope(d_height){
	//console.log(d_height);
	var stats = determineDistTropes();
	var tropesList = stats[0];
	var tropesIncidence = stats[1];
	var nodesList = stats[2];
	var tots = stats[3];
	
	var i=0;
	var maxima = [];
	var average = tots/tropesList.length;
	//console.log("average was "+average);
	
	for(i=1;i<tropesIncidence.length;i++)
	{
		if(tropesIncidence[i]>average)
		{
			maxima.push(i);f
		}
	}
	//console.log(maxima);
	
	//now we decide on the y coordinates for the nodes
	//console.log("dheight is" + d_height);
	var perc = (events.length-tots)/events.length;
	//console.log("perc is "+ perc);
	var left = Math.floor(d_height-d_height*perc);
	//console.log("left is "+ left);
	var totpx = Math.floor(left/tots); //how many pixels each node w trope has
	//console.log("totpx is "+ totpx);
	
	//lets order by trope, where no trope is category -1
	var order = maxima;
	//console.log("tropesList is "+ tropesList);
	for(i=0;i<tropesList.length;i++)
	{
		//console.log("order is "+order);
		//console.log("output of contains is " + contain(i,order));
		
		if(!contain(i,order))
		{
			order.push(i)
			
			//console.log("order is now "+ order)
		}
	}
	order.push(tropesList.length);
	//console.log("order is" + order);
	
	var nodeYVals = [];
	for(i=0;i<events.length;i++)
	{
		nodeYVals[i]=0;
	}
	
	//console.log("nodeYvals initialized at"+ nodeYVals );
	
	for(i=0;i<events.length;i++)
	{
		var j=0;
		for(j=0;j<tropesList.length;j++)
		{
			var k=0;
			for(k=0;k<nodesList[j].length;k++)
			{	nodeYVals[nodesList[j][k]]=i*totpx+Math.floor(totpx*Math.random());
				//console.log("nodeYvals is"+nodeYVals);
			}
		}
	}
	
	for(i=0;i<events.length;i++)
	{
		if(nodeYVals[i]===0)
		{
			nodeYVals[i]= tots*totpx+Math.floor((h-left)*Math.random());
		}
	}
	//console.log("nodeyvals is "+nodeYVals);
	//console.log("tropesIncidence is "+tropesIncidence);
	console.log("order is "+order);
	
	var labelY = [];
	labelY = tropesIncidence;
	var running_sum = 0;
	for(i=0;i<tropesIncidence.length;i++)
	{
		var val = Math.floor((tropesIncidence[order[i]]*totpx)/2);
		running_sum = running_sum + tropesIncidence[order[i]]*totpx;
		labelY[i] = running_sum+val;
		console.log("labelY is now "+labelY[i]);
	}
	
	labelY.push((d_height-left)+Math.floor(.5*left));

	var orderedList = [];
	for(i=0;i<tropesIncidence.length;i++)
	{
		orderedList.push(tropesList[order[i]]);
	}
	orderedList.push("none")
	
	var giveback = [];
	
	giveback.push(nodeYVals);
	giveback.push(orderedList);
	giveback.push(labelY);
	console.log("Node Y vals " + nodeYVals);
	console.log("Ordered List " + orderedList);
	console.log("Label Y " + labelY);
	
	return giveback;
	
  }

//tally total character appearances
//create arrays corresponding to the nodes each character appears in?
//want to be able to hover over a character bar and have nodes circled for that character? or maybe just have the bars for that character appear better?

function totalChars()
{
	chartally = [];
	var i=0;
	var j=0;
	
	for(i=0; i<characters.length; i++)
	{
		chartally.push(0);
	}
	
	for(i=0;i<chars.length;i++)
	{
		for(j=0;j<chars[i].length;j++)
		{
			for(k=0; k<characters.length; k++)
			{
				if(chars[i][j]===characters[k].id)
				{
					chartally[k]=chartally[k]+1;
				}
			}
		}
	}
	
	//console.log("chartally is "+chartally);
	return chartally;
}

function tfChars(name)
{
	console.log("in tfChars name is: "+ name);
	var checker = "";
	//find out what the abbreviation for this character's id is
	for(i=0; i<characters.length; i++)
	{
		if(characters[i].name === name)
		{	
			checker = checker +characters[i].id;
		}
	}
	
	//console.log("checker is "+checker);
	
	var tfchars = [];
	var checked = false;
	
	for(i=0; i<chars.length; i++)
	{
		checked = false;
		for(j=0; j<chars[i].length; j++)
		{
			//console.log("checking..."+chars[i][j]+"..same as "+checker);
			if(chars[i][j]===checker)
			{
				checked = true;
			}
		}
		tfchars.push(checked);
	}
	
	//console.log(tfchars);
	return tfchars;
}

//as of now, an event can only have one trope, so this method deals with that case and is not robust to multiple tropes, even though the data structures do allow for it. 
function tfTropes(trope)
{

	//find out what the abbreviation for this character's id is
	tfarray = [];

	for(i=0; i<tropes.length; i++)
	{
		if(tropes[i][0] === trope)
		{	
			console.log("found a match")
			tfarray.push(true);
		}
		else
		{
			tfarray.push(false);
		}
	}

	return tfarray;

}

/* ~~~~~~~~~~ REFRESH DISPLAY FUNCTIONS ~~~~~~~~~~~~~~~~~ */

function outlineNodes (bls, color)
{
		
	circle.style("stroke",function(d,i){
			if(bls[i])
			{return color;}
			else
			{
				return "#aaa";
			}
			})
		 .style("opacity", function(d,i){
			if(bls[i])
			{return 1;
			}
			else
			{
				return .3;
			}
			})
		 .style("stroke-width", function(d,i){
			if(bls[i])
			{
				return 1.5+"px";
			}
			else
			{
				return .5+"px";
			}
		 });

	path.style("opacity", function(d,i){

		if(bls[d.target.id] || bls[d.source.id]){
			return .7
		}
		else
		{
			return .2;
		}
	})
		.attr("marker-end", function(d) { 
			if(bls[d.target.id] || bls[d.source.id]){
				return "url(#" + "background" + ")";
				}
			else{
				return "url(#" + d.type + ")";
			}
			});
}

function highlightNodes (bls, colorScale)
{
	
	circle.style("opacity", function(d,i){
			if(bls[i])
			{return 1;
			}
			else
			{
				return .3;
			}
			})
		 .style("stroke-width", function(d,i){
			if(bls[i])
			{
				return 1.5+"px";
			}
			else
			{
				return .5+"px";
			}
		 });

	path.style("opacity", function(d,i){
		if(bls[d.target.id] || bls[d.source.id]){
			return .7
		}
		else
		{
			return .2;
		}
	})
		.attr("marker-end", function(d) { 
			if(bls[d.target.id] || bls[d.source.id]){
				return "url(#" + "background" + ")";
				}
			else{
				return "url(#" + d.type + ")";
			}
			});
}

function restoreNodes (bls, colorScale)
{
		
	circle.style("stroke",function(d,i){
		return "#aaa";}
		)
		 .style("opacity", function(d,i){
			if(bls[i])
			{return 1;
			}
			else
			{
				return 1;
			}
			})
		 .style("stroke-width", function(d,i){
			if(bls[i])
			{
				return 1.5+"px";
			}
			else
			{
				return .5+"px";
			}
		 });
	path.style("opacity", function(d,i){
		if(bls[d.target.id] || bls[d.source.id]){
			return .7;
		}
	})
		.attr("marker-end", function(d) { return "url(#" + d.type + ")"; });
}

function expandNodes(){

	if(expandedBubbles)
	{
		return;
	}

	else
	{
		expandedBubbles = true;

		var fill = d3.scale.category20b();

		//circle.style("opacity", 0);
		$("circle").parent().remove();

		var vis = d3.selectAll("#chartBox").append('div')
			.attr("class","chartBoxDivCanvas")
			.style("width", "auto")
		    .style("height", "auto");

		var node = vis.selectAll("div.node")
	      	.data(nodes)
	    	.enter().append("div")
	      	.attr("class", "node")
	      	.style("background", function(d) {
		 		//console.log("d.id "+d.id)
				//console.log("nodevals[d.id] "+nodevals[d.id])
				if(nodevals[d.id]==0)
				{return "lightgrey"}
				else   
				{
					return fill(nodevals[d.id]);
				} 
				})
	      	/*.style("border-color", function(d) { 
				return d3.rgb(fill(d.group)).darker(); 
				})*/
			.style("opacity", .9)
			.style("width", nodeX)
			.call(force.drag);

		//console.log("node variable is there and all of the div nodes were selected");

		force
		    .on("tick", tick)
	     	.start();

		node.append("text")
			.attr("dx", function(d) { return d.x < 180 ? 20 : -20; })
		 	.attr("dy", ".41em")
			.attr("text-anchor", function(d) { return d.x < 180 ? 100 : "end"; })
			.attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
			.text(function(d) { return d.name; });

		node.style("border-style", "solid")
			.style("border-width", "2px")
			.style("width", nodeX+"px")
			
			.style("border-color", function(d) { if(selectedChars.length===0)
				{return "transparent" /*d3.rgb(fill(d.group)).darker()*/;}
				else
				{
					if(selectedChars[d.id]===true)
					{
						return "black";
					}
					else
					{
						return "transparent";
					}
				}
				});

		function tick() {
		    /*node.style("left",  function(d) { return (d.x = Math.max(r, nodeX*d.value+20 )) + "px"; })
		        .style("top", function(d) { return (d.y = Math.max(r, Math.min(h - r, d.y))) + "px";
	 });*/
			//var yvals = sortByTrope(h);


			var nodeLeft = [];
			var nodeTop = [];

			

	 		  circle.attr("transform", function(d,i) {
			  	d.x = Math.max(r, nodeX*d.time+padX-r );
			  	d.y = Math.max(r, Math.min(h - (1.5*r+100+5), d.y));
			    return "translate(" + d.x + "," + d.y + ")";
			  });

			  path.attr("d", function(d, i) {
			    var dx = d.target.x - d.source.x,
			        dy = d.target.y - d.source.y,
			        //dr = Math.sqrt(dx * dx + dy * dy);
			        dr = 0,
			        shifter = 0,
				    original = "M" + d.source.x + "," + (d.source.y + shifter) + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + (d.target.y + shifter);
				    //console.log("original expander output: "+ original);
			        shifter = -100-r;
			    var changed = "M" + d.source.x + "," + (d.source.y + shifter) + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + (d.target.y + shifter);
				//console.log("shifter was used");


			    return "M" + d.source.x + "," + (d.source.y + shifter) + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + (d.target.y + shifter);
			  });

			  node.style("left", function(d) { return (d.x = Math.max(r, nodeX*(d.time-1)+padX+(widthBox/6) )) + "px"; })

			    //.style("top", function(d) { return (d.y = Math.max(r, yvals[0][d.id])) + "px"; });
				.style("top", function(d, i) { 
					//if(i==5) {console.log("node d.y is: "+ d.y+" for node "+i);}
					return (d.y = Math.max(r, Math.min(h - (1.5*r+100+5), d.y)))  + "px";
	 		});



			  text.attr("transform", function(d) {
			    return "translate(" + d.x + "," + d.y + ")";
			  }); 
 		}
 	}
}

function contractNodes() {

	if(!expandedBubbles){

		return;
	}

	else{

		expandedBubbles = false;

	    var fill = d3.scale.category20b();

	    xcoords = [];
	    ycoords = [];

	    //circle.style("opacity", 1);
	    circle.style("opacity", function(d, i) {
	        xcoords.push(d.x);
	        ycoords.push(d.y);
	        return 1;
	    });

	    console.log("circle ycoords: " + ycoords);


	    d3.selectAll("div.node").remove();
	    d3.selectAll("path").remove();
	    d3.selectAll("div.chartBoxDivCanvas").remove();

	    svg.append("svg:defs").selectAll("marker").data(["causal", "background"]).enter().append("svg:marker").attr("id", String).attr("viewBox", "0 -5 10 10").attr("refX", 15).attr("refY", -1.5).attr("markerWidth", 6).attr("markerHeight", 6).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5");



	    path = svg.append("svg:g").selectAll("path").data(force.links()).enter().append("svg:path").attr("class", function(d) {
	        console.log("drawing paths now for contract nodes");
	        return "link " + d.type;
	    }).attr("marker-end", function(d) {
	        return "url(#" + d.type + ")";
	    });

	    //reposition the path object
	    var circleEltYPos = $("circle").parent().offset().top,
	        pathEltYPos = $("path.link").parent().offset().top,
	        posDif = circleEltYPos - pathEltYPos;

	    var pathways = $("path.link").parent();

	    console.log("old path position: " + pathEltYPos);
	    console.log("old circle position: " + circleEltYPos);
	    console.log(posDif);


	    pathways.attr("transform", function(d, i) {
	        //console.log("let's see if this is used");
	        return "translate(" + 0 + "," + (posDif-r  ) + ")";
	    });

	    //calculate the difference if any in where the divs are positioned for the paths and the circles. 

	    circle.call(force.drag);

	    function tick() {

	        console.log("contractNodes tick function was used");

	        var xcoords = [],
	            ycoords = [];

	        var psourcex = [],
	            psourcey = [],
	            ptargetx = [],
	            ptargety = [],
	            sourceid = [],
	            targetid = [];



	        circle.attr("transform", function(d, i) {
	            d.x = Math.max(r, nodeX * d.time + padX - r);
	            d.y = Math.max(r, Math.min(h - (1.5 * r + 100 + 5), d.y));
	            xcoords.push(d.x);
	            ycoords.push(d.y);
	            return "translate(" + d.x + "," + d.y + ")";
	        });

	        function comparison(sx, sy, tx, ty, sid, tid) {

	            origx = xcoords;
	            origy = ycoords;
	            console.log("origx " + origx);
	            console.log("origy" + origy);

	            console.log("sx " + sx);
	            console.log("sy " + sy);

	        }


	        path.attr("d", function(d, i) {
	            var dx = d.target.x - d.source.x,
	                dy = d.target.y - d.source.y,
	                //dr = Math.sqrt(dx * dx + dy * dy);
	                dr = 0;
	            shifter = 100 + r;
	            psourcex.push(d.source.x);
	            psourcey.push(d.source.y);
	            ptargetx.push(d.target.x);
	            ptargety.push(d.target.y);
	            sourceid.push(d.source.id);
	            targetid.push(d.target.id);
	            console.log("this function is being used");

	            return "M" + d.source.x + "," + (d.source.y + shifter) + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + (d.target.y + shifter);
	        });

	        comparison(psourcex, psourcey, ptargetx, ptargety, sourceid, targetid);



	        text.attr("transform", function(d) {
	            return "translate(" + d.x + "," + d.y + ")";
	        });
	    }
	}
}

/* ~~~~~~~~~~ UTILITY FUNCTIONS ~~~~~~~~~~~~~~~~~ */

function maxVal(aName)
{
	if(aName.length < 1)
	{
		return "NaN";
	}
	else
	{
		var ans = aName[0];
		for(i=0; i<aName.length; i++)
		{
			if(ans<aName[i])
			{
				ans = aName[i];
			}
		}
		return ans;
	}

}

function minVal(aName)
{
	if(aName.length < 1)
	{
		return "NaN"
	}
	else
	{
		var ans = aName[0];
		for(i=0; i<aName.length; i++)
		{
			if(ans>aName[i])
			{
				ans = aName[i];
			}
		}
		return ans;
	}

}

function contain(a, l)
{
	var i=0;
	for(i=0;i<l.length;i++)
	{
		if(l[i]===(a))
		{
			return true;
		}
	}
	return false;
}

function first(a, l)
{
	var i=0;
	for(i=0;i<l.length;i++)
	{
		if(l[i]===(a))
		{
			return i;
		}
	}
	return -1;
}

