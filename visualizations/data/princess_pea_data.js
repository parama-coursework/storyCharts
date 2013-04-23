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

var title = "The Princess and the Pea";
var author = "";
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
	"Queen wants Prince's Bride to be a true Princess",
    "Prince wants his bride to be true Princess",
    "Princess Needs Shelter",
    "Princess arrives at Prince's palace requesting shelter",
    "Prince grants her shelter for one night",
    "Queen places pea under 20 mattresses for Princess as test",
    "Princess sleeps on Pea",
    "Princess sleeps badly",
    "Princess states to Queen that she slept badly, citing small hard object under her mattress",
    "Prince and Queen believe Princess is a true Princess",

    "Prince weds Princess"


];

var timepoints = [0,0,1,1,1,2,2,2,3,3,4];

// characters present - listed by ID
var chars = [
["Q"],
["PR"],
["PP"],
["PP","PR"],
["PP","PR"],
["Q"],
["PP"],
["PP"],
    ["PR","Q"],
["PR","Q"],

["PP","PR"]
];


// Dictionary 1: Characters -> contain: traits, name, id/abbrev

var characters = [{"name":"Queen", "traits":["clever","scheming","skeptical"], "id":"Q"},{"name":"Prince", "traits":["passive","truthful"], "id":"Pr"},{"name":"Princess", "traits":["resourceful","sensitive","truthful","resourceful"], "id":"PP"}];

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

tropes[4]=["insanity"]; tropes[5]=["insanity"]; tropes[6]=["insanity"]; tropes[8]=["greed"]; tropes[10]=["greed"]; tropes[11]=["greed"];


// List 4: Theme Incidence
// 		themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, 
// 		pursuit of power -> pick at most one major theme for each event

var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[0]=[""]; themes[1]=[""]; themes[2]=[""]; themes[7]=[""];



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

var links=[       {"source":0,"target":1,"value":1,"type":"causal"},
                {"source":0,"target":5,"value":1,"type":"causal"},
                {"source":1,"target":4,"value":1,"type":"causal"},
                {"source":1,"target":10,"value":1,"type":"causal"},
                {"source":1,"target":7,"value":1,"type":"causal"},
                {"source":2,"target":3,"value":1,"type":"causal"},
                {"source":3,"target":4,"value":1,"type":"causal"},
                {"source":4,"target":5,"value":1,"type":"causal"},
                {"source":4,"target":6,"value":1,"type":"causal"},
                {"source":5,"target":6,"value":1,"type":"causal"},
                {"source":6,"target":7,"value":1,"type":"causal"},
                {"source":7,"target":8,"value":1,"type":"causal"},
                {"source":8,"target":9,"value":1,"type":"causal"},
                {"source":9,"target":10,"value":1,"type":"causal"},
                {"source":0,"target":11,"value":1,"type":"causal"}
        ]