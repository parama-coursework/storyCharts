var events = [ 
	"Father has Cinderella",
	"Step Mother has Evil Step Sisters",
	"Father marries Step Mother",
	"Step Mother and Evil Step Sisters treat Cinderella poorly",
	"Prince holds a ball",
	"Step Mother + Evil Step Sisters will not let Cinderella attend the ball",
	"Fairy Godmother appears, transforms Cinderella and Animal Friends"
	"Cinderella goes to the ball"
	"Prince falls in love with Cinderella"
	"Cinderella has to rush out at midnight and leaves glass slipper"
	"Prince has every woman in the kingdom try on the glass slipper"
	"Glass slipper fits Cinderella"
	"Prince marries Cinderella"
	"Cinderella forgives Evil Step Sisters + Step Mother"

];

var characters = [{"name":"Father", "traits":["absent", "weak"], "id":"F"}, {"name": "Step-Mother", "traits":["malicious", "bad"], "id":"SM"}, {"name":"Evil Step-Sisters", "traits":["vain", "bad"], "id":"ES"}, {"name":"Cinderella", "traits":["beautiful", "kind", "innocent"], "id":"C"}, {"name":"Fairy GodMother", "traits":["magical", "benevolent"], "id":"FG"}, {"name":"Animal Friends", "traits":["benevolent", "magical"], "id":"AF"}, {"name":"Prince", "traits":["heroic", "good", "handsome"], "id":"P"}];

var timepoints = [1, 1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12];

var chars = [
["F","C"],
["SM","ES"],
["F","SM"],
["SM","ES", "C"],
["P"],
["SM","ES", "C"],
["FG","C", "AF"],
["C"],
["P","C"],
["C"],
["P"],
["C"],
["P","C"],
["SM","ES", "C"],

];


//themes: birth, exclusion, -> pick at most one major theme for each event
var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[0]=["birth"]; themes[1]=["exclusion"]; themes[2]=["opportunity"]; themes[3]=["true love"],  themes[4]=["recognition"],  themes[5]=["reconciliation"];

/*tropes: evil older woman, fairy helper, underdog, love at first sight, royal ball, animal helpers-> again, pick at most one major theme for each event. we're looking for similarities, so pick one type of thing and stick to it for multiple events, even though some of these are similar*/
var tropes = [];
for (i=1;i<=events.length;i++)
{
	tropes[i-1]=[];
}

tropes[6]=["evil older woman"]; tropes[7]=["fairy helper"]; tropes[8]=["underdog"]; tropes[9]=["love at first sight"]; tropes[10]=["royal ball"]; tropes[11]=["animal helpers"]; 

var links = [
{"source":1,"target":3,"value":1},
{"source":1,"target":3,"value":1},
{"source":3,"target":4,"value":1},
{"source":4,"target":6,"value":1},
{"source":5,"target":6,"value":1},
{"source":6,"target":7,"value":1},
{"source":7,"target":8,"value":1},
{"source":8,"target":9,"value":1},
{"source":9,"target":10,"value":1},
{"source":10,"target":11,"value":1},
{"source":11,"target":12,"value":1}
]

var nodes = [];

for (i=0;i<events.length;i++)
{
	nodes[i]={"name":events[i],"id":i,"time":timepoints[i],"chars":chars[i], "themes":themes[i], "tropes":tropes[i], /*"x":20, "y":20,*/ "fixed":false}
}

var nodes = [];

var i=0;
for (i=0;i<events.length;i++)
{
	nodes[i]={"name":events[i],"id":i,"time":timepoints[i],"chars":chars[i], "themes":themes[i], "tropes":tropes[i], "fixed":false}
}

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
	console.log("length of tropeslist is "+tropeslist.length);
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
	themescount = []
	console.log("length of themeslist is "+themeslist.length);
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

function sortByTrope(d){
	var stats = determineDistTropes();
	var tropesList = stats[0];
	var tropesIncidence = stats[1];
	var nodesList = stats[2];
	var tots = stats[3];
	
	var i=0;
	var maxima = [];
	var average = tots/tropesList.length;
	console.log("average was "+average);
	
	for(i=1;i<tropesIncidence.length;i++)
	{
		if(tropesIncidence[i]>average)
		{
			maxima.push(i);
		}
	}
	console.log(maxima);
	
	//now we decide on the y coordinates for the nodes
	var perc = (events.length-tots)/events.length;
	var left = Math.floor(d-d*perc);
	var totpx = Math.floor(left/tots); //how many pixels each node w trope has
	
	//lets order by trope, where no trope is category -1
	var order = maxima;
	for(i=1;i<tropesList;i++)
	{
		if(!contain(i,order))
		{
			order.push(i)
		}
	}
	order.push(-1);
	
	var nodeYVals = [];
	for(i=0;i<events.length;i++)
	{
		nodeYVals[i]=0;
	}
	
	for(i=0;i<events.length;i++)
	{
		var j=0;
		for(j=0;j<tropesList.length;j++)
		{
			var k=0;
			for(k=0;k<nodesList[j].length;k++)
			{
				nodeYVals[nodesList[j][k]]=i*totpx+Math.floor(totpx*Math.random());
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
	
	var labelY = tropesIncidence;
	var running_sum = 0;
	for(i=0;i<tropesIncidence.length;i++)
	{
		var val = Math.floor((tropesIncidence[order[i]]*totpx)/2);
		running_sum = running_sum + tropesIncidence[order[i]]*totpx;
		labelY = running_sum+val;
	}
	
	labelY.push((h-left)+Math.floor(.5*left));
	
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
	console.log(nodeYVals);
	console.log(orderedList);
	console.log(labelY);
	
	return giveback;
	
  }

