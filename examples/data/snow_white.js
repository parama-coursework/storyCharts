var title = "Snow White and the Seven Dwarfs"
var author = "unknown"
var description = "German fairy tale known in many countries in Europe, the best known version being the German one collected by the Brothers Grimm in 1812. The German version features such elements as the magic mirror, the poisoned apple, the glass coffin, and the seven dwarfs, who were first given individual names in the Broadway play Snow White and the Seven Dwarfs (1912) and then given different names in Walt Disney's 1937 film Snow White and the Seven Dwarfs."

var events = [ 
	"Queen pricks finger, sees blood in snow",
	"Queen wishes for a child with snow white skin",
	"King and Queen have child",
	"Queen dies",
	"King chooses new (Evil) Queen",
	"Evil Queen wishes to be the fairest",
	"Snow White turns 7",
	"Snow White becomes beautiful",
	"Evil Queen asks Magic Mirror who is fairest of them all",
	"Mirror responds that Snow White is the fairest of them all",
	"Evil Queen orders Huntsman kill Snow White",
	"Huntsman falls in love with Snow White",
	"Huntsman instead kills a boar and brings the New Queen its heart, which she eats",
	"Snow White rests with dwarves in the woods",
	"Evil Queen once again informed by Magic Mirror that Snow White is the fairest",
	"Evil Queen tries to kill Snow White with tight laces, but dwarves save her",
	"Evil Queen tries to kill Snow White with poison comb, but dwarves save her",
	"Evil Queen tries to kill Snow White with poison apple and Snow White takes a bite",
	"Snow White falls into deep stupor",
	"Dwarves put Snow White in glass coffin",
	"Snow White is damsel in distress",
	"Prince sees Snow White's beauty",
	"Prince falls in love with Snow White",
	"Prince kisses Snow White, waking her",
	"Evil Queen finds out that young queen is fairest from her Magic Mirror",
	"Prince weds Snow White",
	"Evil Queen attends wedding of Snow White and Prince",
	"Evil Queen is punished for her evils"
];

var characters = [{"name":"King", "traits":[""], "id":"K"}, {"name":"Old Queen", "traits":[""], "id":"OQ"}, {"name": "Snow White", "traits":["beautiful", "innocent"], "id":"SW"}, {"name":"Dwarves", "traits":["benevolent", "good"], "id":"D"}, {"name":"Evil Queen", "traits":["malicious", "bad", "magical"], "id":"EQ"}, {"name":"Huntsman", "traits":["heroic", "good"], "id":"H"}, {"name":"Prince", "traits":["heroic", "good"], "id":"P"}];

var timepoints = [1,2,3,4,5,5,6,6,7,8,9,10,11,12,13,14,15,16,17,18,18,19,19,20,21,22,23,24];

var chars = [
["OQ"],
["OQ"],
["OQ","K","SW"],
["OQ"],
["K","EQ"],
["EQ"],
["SW"],
["SW"],
["EQ"],
["EQ","SW"],
["EQ","H"],
["H","SW"],
["H","SW","EQ"],
["SW","D"],
["EQ","SW"],
["EQ","SW","D"],
["EQ","SW","D"],
["EQ","SW"],
["SW"],
["SW","D"],
["SW"],
["P","SW"],
["P","SW"],
["P","SW"],
["EQ","SW"],
["P","SW"],
["EQ","P","SW"],
["EQ"],
];


//themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, pursuit of power -> pick at most one major theme for each event
var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[2]=["birth"]; themes[3]=["death"]; themes[7]=["beauty"]; themes[12]=["good"]; themes[13]=["good"]; 
themes[15]=["evil"]; themes[16]=["evil"]; themes[17]=["evil"]; themes[23]=["joy"]; themes[27]=["revenge"];

/*tropes: fatal mistake, evil older woman, revenge, fairy helper, deathlike sleep, imprisonment, damsel in distress, heroism, rescue -> again, pick at most one major theme for each event. we're looking for similarities, so pick one type of thing and stick to it for multiple events, even though some of these are similar*/
var tropes = [];
for (i=1;i<=events.length;i++)
{
	tropes[i-1]=[];
}

tropes[5]=["evil older woman"]; tropes[15]=["evil older woman"]; tropes[16]=["evil older woman"]; tropes[17]=["fatal mistake"]; tropes[18]=["deathlike sleep"]; tropes[20]=["damsel in distress"]; tropes[21]=["heroism"]; tropes[23]=["rescue"]; tropes[27]=["revenge"];

var links = [
{"source":0,"target":1,"value":1},
{"source":1,"target":2,"value":1},
{"source":2,"target":3,"value":1},
{"source":3,"target":4,"value":1},
{"source":5,"target":8,"value":1},
{"source":6,"target":7,"value":1},
{"source":7,"target":9,"value":1},
{"source":8,"target":9,"value":1},
{"source":9,"target":10,"value":1},
{"source":5,"target":10,"value":1},
{"source":10,"target":12,"value":1},
{"source":11,"target":12,"value":1},
{"source":10,"target":13,"value":1},
{"source":12,"target":13,"value":1},
{"source":12,"target":14,"value":1},
{"source":14,"target":15,"value":1},
{"source":15,"target":16,"value":1},
{"source":16,"target":17,"value":1},
{"source":5,"target":15,"value":1},
{"source":5,"target":16,"value":1},
{"source":5,"target":17,"value":1},
{"source":17,"target":18,"value":1},
{"source":18,"target":19,"value":1},
{"source":19,"target":20,"value":1},
{"source":21,"target":22,"value":1},
{"source":21,"target":23,"value":1},
{"source":22,"target":23,"value":1},
{"source":22,"target":25,"value":1},
{"source":23,"target":25,"value":1},
{"source":24,"target":26,"value":1},
{"source":25,"target":26,"value":1},
{"source":26,"target":27,"value":1},
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
	console.log("labelY is "+ labelY);
	
	labelY.push((d_height-left)+Math.floor(.5*left));
	console.log("extra val is"+ (d_height-left)+Math.floor(.5*left));
	
	console.log(labelY);
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
	
	console.log("chartally is "+chartally);
	return chartally;
}

function tfChars(name)
{
	checker = " ";
	//find out what the abbreviation for this character's id is
	for(i=0; i<characters.length; i++)
	{
		if(characters[i].name===name)
		{
			checker = characters[i].id;
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

