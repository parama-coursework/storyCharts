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

var title = "Macbeth";
var author = "Shakespeare";
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
	"Duncan becomes happy",
    "Duncan is the King",
    "Lady Macbeth is Macbeth's wife",
    "Macbeth is Duncan's successor",
    "Macbeth is insane",
    "Lady Macbeth is insane",
    "Macduff is insane",
    "Macduff is Duncan's friend",
    "Lady Macbeth persuades Macbeth to want to become King",
    "Lady Macbeth kills herself",

    "Macbeth wants to become King",
    "Duncan rewards Macbeth",
    "Lady Macbeth harms herself",
    "Lady Macbeth becomes dead",

    "Macbeth murders Duncan",
    "Macbeth becomes happy",

    "Duncan becomes dead",
    "Macbeth harms Duncan",
    
    "Macbeth becomes the King",
    "Macbeth harms Macduff",

    "Lady Macbeth becomes the Queen",
    "Macbeth angers Macduff",
    "Macduff becomes unhappy",

    "Macduff kills Macbeth",
    
    "Macbeth becomes dead",
    "Macduff harms Macbeth"


];

var timepoints = [1,0,0,3,0,0,0,0,2,9,1,1,9,9,3,3,3,3,3,6,3,6,6,9,9,9];

// characters present - listed by ID
var chars = [
["D"],
["D"],
["LM","MB"],
["MB","D"],
["MB"],
["LM"],
["MD"],
["MD","D"],
    ["LM","MB"],
["LM"],

["MB"],
    ["D","MB"],
["LM"],
["LM"],

["D"],
    ["D","MB"],

["MB"],
    ["MB","MD"],

["LM"],
    ["MB","MD"],
["MD"],

["MD","MB"],
["MB"],
["MD","MB"],
];


// Dictionary 1: Characters -> contain: traits, name, id/abbrev

var characters = [{"name":"Macbeth", "traits":["insane","treacherous","proud"], "id":"MB"}, {"name": "Lady Macbeth", "traits":["insane","greedy"], "id":"LM"}, {"name":"Duncan", "traits":["Kingly","generous","trusting"], "id":"D"}, {"name":"Macduff", "traits":["insane","loyal","from his mother's womb untimely ripped"], "id":"MD"}];

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

tropes[4]=["insanity"]; tropes[5]=["insanity"]; tropes[6]=["insanity"]; tropes[8]=["greed"]; tropes[10]=["greed"]; tropes[11]=["greed"]; tropes[14]=["greed"]; tropes[21]=["revenge"], tropes[23]=["revenge"];


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

var links = [
{"source":0,"target":11,"value":1,"type":"causal"},
{"source":1,"target":14,"value":1,"type":"causal"},
{"source":2,"target":20,"value":1,"type":"causal"},
{"source":3,"target":14,"value":1,"type":"causal"},
{"source":3,"target":18,"value":1,"type":"causal"},
{"source":4,"target":14,"value":1,"type":"causal"},
{"source":5,"target":8,"value":1,"type":"causal"},
{"source":5,"target":9,"value":1,"type":"causal"},
{"source":6,"target":23,"value":1,"type":"causal"},
{"source":7,"target":21,"value":1,"type":"causal"},
{"source":8,"target":10,"value":1,"type":"causal"},
{"source":9,"target":12,"value":1,"type":"causal"},
{"source":9,"target":13,"value":1,"type":"causal"},
{"source":10,"target":14,"value":1,"type":"causal"},
{"source":14,"target":16,"value":1,"type":"causal"},
{"source":14,"target":17,"value":1,"type":"causal"},
{"source":16,"target":19,"value":1,"type":"causal"},
{"source":19,"target":21,"value":1,"type":"causal"},
{"source":21,"target":23,"value":1,"type":"causal"},
{"source":19,"target":22,"value":1,"type":"causal"},
{"source":23,"target":24,"value":1,"type":"causal"},
{"source":23,"target":25,"value":1,"type":"causal"},
{"source":16,"target":18,"value":1,"type":"causal"},
{"source":18,"target":20,"value":1,"type":"causal"}
]