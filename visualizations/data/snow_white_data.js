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

var title = "Snow White and the Seven Dwarfs";
var author = "unknown";
var description = "German fairy tale known in many countries in Europe, the best known version being the German one collected by the Brothers Grimm in 1812 (German: Schneewittchen und die sieben Zwerge, ''Snow White and the Seven Dwarfs''). The German version features such elements as the magic mirror, the poisoned apple, the glass coffin, and the seven dwarfs, who were first given individual names in the Broadway play Snow White and the Seven Dwarfs (1912) and then given different names in Walt Disney's 1937 film Snow White and the Seven Dwarfs. The Grimm story, which is commonly referred to as ''Snow White'', should not be confused with the story of ''Snow White and Rose Red'', another fairy tale collected by the Brothers Grimm (in German ''Schneeweißchen'', rather than ''Schneewittchen'').";

//~~~~~~~~~ STORY ELEMENTS ~~~~~~~~~//

//~~~~~~~~~ DICTIONARIES, TABLES, LISTS ~~~~~~~~~//

// Table 1: Events | Time | Chars_Present | List 3: Tropes | 

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


var timepoints = [1,2,3,4,5,5,6,6,7,8,9,10,11,12,13,14,15,16,17,18,18,19,19,20,21,22,23,24];

// characters present - listed by ID
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


// Dictionary 1: Characters -> contain: traits, name, id/abbrev

var characters = [{"name":"King", "traits":[""], "id":"K"}, {"name":"Old Queen", "traits":[""], "id":"OQ"}, {"name": "Snow White", "traits":["beautiful", "innocent"], "id":"SW"}, {"name":"Dwarves", "traits":["benevolent", "good"], "id":"D"}, {"name":"Evil Queen", "traits":["malicious", "bad", "magical"], "id":"EQ"}, {"name":"Huntsman", "traits":["heroic", "good"], "id":"H"}, {"name":"Prince", "traits":["heroic", "good"], "id":"P"}];

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

tropes[5]=["evil older woman"]; tropes[15]=["evil older woman"]; tropes[16]=["evil older woman"]; 
tropes[17]=["fatal mistake"]; 
tropes[18]=["deathlike sleep"]; 
tropes[20]=["damsel in distress"]; 
tropes[21]=["heroism"]; 
tropes[23]=["rescue"]; 
tropes[27]=["revenge"];

// List 4: Theme Incidence
// 		themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, 
// 		pursuit of power -> pick at most one major theme for each event

var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[2]=["birth"]; 
themes[3]=["death"]; 
themes[7]=["beauty"]; 
themes[12]=["good"]; themes[13]=["good"]; 
themes[15]=["evil"]; themes[16]=["evil"]; themes[17]=["evil"]; 
themes[23]=["joy"]; 
themes[27]=["revenge"];


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
{"source":1,"target":2,"value":1,"type":"causal"},
{"source":2,"target":3,"value":1,"type":"causal"},
{"source":3,"target":4,"value":1,"type":"causal"},
{"source":5,"target":8,"value":1,"type":"causal"},
{"source":6,"target":7,"value":1,"type":"causal"},
{"source":7,"target":9,"value":1,"type":"causal"},
{"source":8,"target":9,"value":1,"type":"causal"},
{"source":9,"target":10,"value":1,"type":"causal"},
{"source":5,"target":10,"value":1,"type":"causal"},
{"source":10,"target":12,"value":1,"type":"causal"},
{"source":11,"target":12,"value":1,"type":"causal"},
{"source":10,"target":13,"value":1,"type":"causal"},
{"source":12,"target":13,"value":1,"type":"causal"},
{"source":12,"target":14,"value":1,"type":"causal"},
{"source":14,"target":15,"value":1,"type":"causal"},
{"source":15,"target":16,"value":1,"type":"causal"},
{"source":16,"target":17,"value":1,"type":"causal"},
{"source":5,"target":15,"value":1,"type":"causal"},
{"source":5,"target":16,"value":1,"type":"causal"},
{"source":5,"target":17,"value":1,"type":"causal"},
{"source":17,"target":18,"value":1,"type":"causal"},
{"source":18,"target":19,"value":1,"type":"causal"},
{"source":19,"target":20,"value":1,"type":"causal"},
{"source":21,"target":22,"value":1,"type":"causal"},
{"source":21,"target":23,"value":1,"type":"causal"},
{"source":22,"target":23,"value":1,"type":"causal"},
{"source":22,"target":25,"value":1,"type":"causal"},
{"source":23,"target":25,"value":1,"type":"causal"},
{"source":24,"target":26,"value":1,"type":"causal"},
{"source":25,"target":26,"value":1,"type":"causal"},
{"source":26,"target":27,"value":1,"type":"causal"},
]
//---------------------------------------------------------------