/* 

Frame Variables: 
	Title, Author, Story Description

Story Elements:
	Characters
		Character_Abbreviations, Traits

		belong to -> Events
	
	Events
		Descriptions, Time Points, Characters_Present (array of characters) , Tropes, Themes

Story Details:
	Themes, Tropes, Characters

*/


/* 

Nodes, Links, Data Field

*/

//~~~~~~~~~ FRAME VARIABLES ~~~~~~~~~//

var title = "Sleeping Beauty";
var author = "Charles Perrault";
/*var description = "The Sleeping Beauty (French: La Belle au bois dormant, 
	The Beauty sleeping in the wood) by Charles Perrault or 'Little Briar Rose' 
(German: Dornröschen) by the Brothers Grimm is a classic fairytale involving a 
beautiful princess, enchantment of sleep, and a handsome prince. Written as an 
original literary tale, it was first published by Charles Perrault in Histoires 
ou contes du temps passé in 1697. In 1959 the story was made into a Walt Disney 
animated film.";*/

//~~~~~~~~~ STORY ELEMENTS ~~~~~~~~~//

//~~~~~~~~~ DICTIONARIES, TABLES, LISTS ~~~~~~~~~//

// Table 1: Events | Time | Chars_Present | List 3: Tropes | 

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


var timepoints = [1,2,2,3,3,3.5,3.75,4,5,6,7,8,9,10,11,12,13,14,15,15.5,16,16,17,18,19,20,21];

// characters present - listed by ID
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


// Dictionary 1: Characters -> contain: traits, name, id/abbrev

var characters = [{"name":"King and Queen", "traits":["careless"], "id":"KQ"}, {"name": "Aurora", "traits":["beautiful", "innocent"], "id":"A"}, {"name":"Good Fairies", "traits":["benevolent", "good", "magical"], "id":"GF"}, {"name":"Bad Fairy", "traits":["malicious", "bad", "magical"], "id":"BF"}, {"name":"Old Woman", "traits":["malicious", "bad"], "id":"W"}, {"name":"Prince", "traits":["heroic", "good"], "id":"P"}];

// List 1: Themes

//themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, pursuit of power -> pick at most one major theme for each event

// List 2: Tropes
/* tropes: fatal mistake, evil older woman, revenge, fairy helper,   
   deathlike sleep, imprisonment, damsel in distress, heroism, 
   rescue -> again, pick at most one major theme for each event. 
   we're looking for similarities, so pick one type of thing and stick to it for multiple events, 
   even though some of these are similar*/


// List 3: Trope Incidence

var byTrope = false; //there are two ways to enter data. 
// The first way would be to do as I have done below, or, simply list the array of tropes that each index for each 
// event corresponds to. The other way would be to give an array of event indices that corresponded to the tropes 
// one wanted.
// example for 
//var byTrope = true:
/*var tropeDict = [
	{"evil older woman": [5,15,16,]}, 
	{"fatal mistake":[17]}, 
	{"deathlike sleep":[18]},
	{"damsel in distress":[20]},
	{"heroism": [21]},
	{"rescue":[23]},
	{"revenge":[27]}
];*/

var tropes = [];
for (i=1;i<=events.length;i++)
{
	tropes[i-1]=[];
}

tropes[3]=["fatal mistake"]; tropes[4]=["evil older woman"]; tropes[7]=["revenge"]; tropes[8]=["fairy helper"]; tropes[10]=["fatal mistake"]; tropes[11]=["evil older woman"]; tropes[17]=["deathlike sleep"]; tropes[18]=["imprisonment"]; tropes[19]=["damsel in distress"]; tropes[20]=["heroism"]; tropes[23]=["heroism"]; tropes[24]=["heroism"]; tropes[25]=["rescue"];


// List 4: Theme Incidence
// 		themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, 
// 		pursuit of power -> pick at most one major theme for each event

var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[0]=["birth"]; themes[1]=["inclusion"]; themes[2]=["exclusion"]; themes[7]=["revenge"];


// List 5: Nodes -> Correspond to Event Incidence here. 

var nodes = [];

var i=0;
for (i=0;i<events.length;i++)
{
	nodes[i]={"name":events[i],"id":i,"time":timepoints[i],"chars":chars[i], "themes":themes[i], "tropes":tropes[i], "fixed":false}
}

// List 6: Links: you can enter them directly as I have done below, or set the boolean var to true. 

var columnEntry = false; //
//how to enter data: 
// settings: compressedEntry=true, differentValues = true, columnEntry = false
// format the dictionary entries as - {sourceNodeNumber:[[target1,value1],[target2,value2]]}
// sources = [
/* {1:[[0,1]]}, 
...,
{5:[[8,1],[10,1],[15,1],[16,1],[17,1]]}
]...] */

var links = [
{"source":0,"target":1,"value":1,"type":"causal"},
{"source":1,"target":3,"value":1,"type":"causal"},
{"source":2,"target":4,"value":1,"type":"causal"},
{"source":3,"target":5,"value":1,"type":"causal"},
{"source":5,"target":6,"value":1,"type":"causal"},
{"source":4,"target":7,"value":1,"type":"causal"},
{"source":3,"target":8,"value":1,"type":"causal"},
{"source":7,"target":8,"value":1,"type":"causal"},
{"source":7,"target":9,"value":1,"type":"causal"},
{"source":8,"target":9,"value":1,"type":"causal"},
{"source":9,"target":10,"value":1,"type":"causal"},
{"source":10,"target":15,"value":1,"type":"causal"},
{"source":11,"target":12,"value":1,"type":"causal"},
{"source":12,"target":13,"value":1,"type":"causal"},
{"source":13,"target":14,"value":1,"type":"causal"},
{"source":14,"target":15,"value":1,"type":"causal"},
{"source":7,"target":17,"value":1,"type":"causal"},
{"source":16,"target":17,"value":1,"type":"causal"},
{"source":17,"target":18,"value":1,"type":"causal"},
{"source":18,"target":19,"value":1,"type":"causal"},
{"source":20,"target":23,"value":1,"type":"causal"},
{"source":22,"target":23,"value":1,"type":"causal"},
{"source":21,"target":23,"value":1,"type":"causal"},
{"source":23,"target":24,"value":1,"type":"causal"},
{"source":24,"target":25,"value":1,"type":"causal"},
{"source":25,"target":26,"value":1,"type":"causal"},
{"source":21,"target":26,"value":1,"type":"causal"}
];
//---------------------------------------------------------------