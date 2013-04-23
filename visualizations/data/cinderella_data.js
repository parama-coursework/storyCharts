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

var title = "Cinderella";
var author = "unknown";
var description = "";/*"Folk tale embodying a myth-element of unjust 
oppression/triumphant reward. Thousands of variants are known 
throughout the world. The title character is a young woman living 
in unfortunate circumstances that are suddenly changed to remarkable 
fortune. The story was first published by Charles Perrault in 
Histoires ou contes du temps passé in 1697, and later by the 
Brothers Grimm in their folk tale collection Grimms' Fairy Tales.
<br>
Although both the story's title and the character's name change 
in different languages, in English-language folklore 'Cinderella' 
is the archetypal name. The word 'cinderella' has, by analogy, come 
to mean one whose attributes were unrecognized, or one who 
unexpectedly achieves recognition or success after a period of 
obscurity and neglect. The still-popular story of 'Cinderella' 
continues to influence popular culture internationally, lending 
plot elements, allusions, and tropes to a wide variety of media."*/
//~~~~~~~~~ STORY ELEMENTS ~~~~~~~~~//

//~~~~~~~~~ DICTIONARIES, TABLES, LISTS ~~~~~~~~~//

// Table 1: Events | Time | Chars_Present | List 3: Tropes | 

var events = [ 
	"Father has Cinderella",
	"Step Mother has Evil Step Sisters",
	"Father marries Step Mother",
	"Step Mother and Evil Step Sisters treat Cinderella poorly",
	"Prince holds a ball",
	"Step Mother + Evil Step Sisters will not let Cinderella attend the ball",
	"Fairy Godmother appears, transforms Cinderella and Animal Friends",
	"Cinderella goes to the ball",
	"Prince falls in love with Cinderella",
	"Cinderella has to rush out at midnight and leaves glass slipper",
	"Prince has every woman in the kingdom try on the glass slipper",
	"Glass slipper fits Cinderella",
	"Prince marries Cinderella",
	"Cinderella forgives Evil Step Sisters + Step Mother"

];

var timepoints = [1, 1, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// characters present - listed by ID
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


// Dictionary 1: Characters -> contain: traits, name, id/abbrev

var characters = [{"name":"Father", "traits":["absent", "weak"], "id":"F"}, {"name": "Step-Mother", "traits":["malicious", "bad"], "id":"SM"}, {"name":"Evil Step-Sisters", "traits":["vain", "bad"], "id":"ES"}, {"name":"Cinderella", "traits":["beautiful", "kind", "innocent"], "id":"C"}, {"name":"Fairy GodMother", "traits":["magical", "benevolent"], "id":"FG"}, {"name":"Animal Friends", "traits":["benevolent", "magical"], "id":"AF"}, {"name":"Prince", "traits":["heroic", "good", "handsome"], "id":"P"}];

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

tropes[6]=["evil older woman"]; tropes[7]=["fairy helper"]; tropes[8]=["underdog"]; tropes[9]=["love at first sight"]; tropes[10]=["royal ball"]; tropes[11]=["animal helpers"]; 


// List 4: Theme Incidence
// 		themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, 
// 		pursuit of power -> pick at most one major theme for each event

var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[0]=["birth"]; themes[1]=["exclusion"]; themes[2]=["opportunity"]; themes[3]=["true love"],  themes[4]=["recognition"],  themes[5]=["reconciliation"];



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
{"source":1,"target":3,"value":1,"type":"causal"},
{"source":1,"target":3,"value":1,"type":"causal"},
{"source":3,"target":4,"value":1,"type":"causal"},
{"source":4,"target":6,"value":1,"type":"causal"},
{"source":5,"target":6,"value":1,"type":"causal"},
{"source":6,"target":7,"value":1,"type":"causal"},
{"source":7,"target":8,"value":1,"type":"causal"},
{"source":8,"target":9,"value":1,"type":"causal"},
{"source":9,"target":10,"value":1,"type":"causal"},
{"source":10,"target":11,"value":1,"type":"causal"},
{"source":11,"target":12,"value":1,"type":"causal"}
]
//---------------------------------------------------------------