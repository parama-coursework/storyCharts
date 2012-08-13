var events = [ 
	"King and Queen have baby Aurora",
	"King and Queen invite Good Fairies to bless Aurora",
	"King and Queen forget to invite bad fairy",
	"Good Fairies are grateful to Kind and Queen",
	"Bad Fairy is angry at King and Queen",
	"6 Good Fairies bestow virtues including beauty on Aurora",
	"Aurora is beautiful",
	"Bad Fairy bestows curse of death by spindle on Aurora",
	"7th Good fairy ameliorates curse to sleep by spindle",
	"King and Queen outlaw spindles",
	"King and Queen do not tell Aurora about curse",
	"King and Queen go on holiday",
	"Aurora is unsupervised",
	"Aurora explores",
	"Aurora finds old woman with spindle in palace",
	"Aurora is curious",
	"Aurora pricks herself on spindle",
	"Aurora and King and Queen and Kingdom fall into magical sleep",
	"Aurora, King and Queen, and Kingdom imprisoned via asleep for 100 years",
	"Aurora is damsel in distress",
	"Prince is hero",
	"Prince wants beautiful wife",
	"Prince hears about Aurora's beauty",
	"Prince decides to save her",
	"Prince endures hardship",
	"Prince rescues Aurora, waking her, Kingdom, King and Queen",
	"Prince weds Aurora"

];

var characters = [{"name":"King and Queen", "traits":["careless"], "id":"KQ"}, {"name": "Aurora", "traits":["beautiful", "innocent"], "id":"A"}, {"name":"Good Fairies", "traits":["benevolent", "good", "magical"], "id":"GF"}, {"name":"Bad Fairy", "traits":["malicious", "bad", "magical"], "id":"BF"}, {"name":"Old Woman", "traits":["malicious", "bad"], "id":"W"}, {"name":"Prince", "traits":["heroic", "good"], "id":"P"}];

var timepoints = [1,2,2,3,3,3.5,3.75,4,5,6,7,8,9,10,11,12,13,14,15,15.5,16,16,17,18,19,20,21];

var chars = [
["KQ","A"],
["KQ","GF"],
["KQ","BF"],
["GF"],
["BF"],
["GF","A"],
["A"],
["BF","A"],
["BF"],
["KQ"],
["KQ","A"],
["KQ"],
["A"],
["A"],
["W","A"],
["A"],
["W","A"],
["KQ","A"],
["KQ","A"],
["A"],
["P"],
["P"],
["P"],
["P"],
["P"],
["P","A"],
["P","A"]
];


//themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, pursuit of power -> pick at most one major theme for each event
var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[0]=["birth"]; themes[1]=["inclusion"]; themes[2]=["exclusion"]; themes[7]=["revenge"];

/*tropes: fatal mistake, evil older woman, revenge, fairy helper, deathlike sleep, imprisonment, damsel in distress, heroism, rescue -> again, pick at most one major theme for each event. we're looking for similarities, so pick one type of thing and stick to it for multiple events, even though some of these are similar*/
var tropes = [];
for (i=1;i<=events.length;i++)
{
	tropes[i-1]=[];
}

tropes[3]=["fatal mistake"]; tropes[4]=["evil older woman"]; tropes[7]=["revenge"]; tropes[8]=["fairy helper"]; tropes[10]=["fatal mistake"]; tropes[11]=["evil older woman"]; tropes[17]=["deathlike sleep"]; tropes[18]=["imprisonment"]; tropes[19]=["damsel in distress"]; tropes[20]=["heroism"]; tropes[23]=["heroism"]; tropes[24]=["heroism"]; tropes[25]=["rescue"];

var links = [
{"source":0,"target":1,"value":1},
{"source":1,"target":3,"value":1},
{"source":2,"target":4,"value":1},
{"source":3,"target":5,"value":1},
{"source":5,"target":6,"value":1},
{"source":4,"target":7,"value":1},
{"source":3,"target":8,"value":1},
{"source":7,"target":8,"value":1},
{"source":7,"target":9,"value":1},
{"source":8,"target":9,"value":1},
{"source":9,"target":10,"value":1},
{"source":10,"target":15,"value":1},
{"source":11,"target":12,"value":1},
{"source":12,"target":13,"value":1},
{"source":13,"target":14,"value":1},
{"source":14,"target":15,"value":1},
{"source":7,"target":17,"value":1},
{"source":16,"target":17,"value":1},
{"source":17,"target":18,"value":1},
{"source":18,"target":19,"value":1},
{"source":20,"target":23,"value":1},
{"source":22,"target":23,"value":1},
{"source":21,"target":23,"value":1},
{"source":23,"target":24,"value":1},
{"source":24,"target":25,"value":1},
{"source":25,"target":26,"value":1},
{"source":21,"target":26,"value":1}
]

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
