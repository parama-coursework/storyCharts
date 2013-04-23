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

var characters = [{"name":"Macbeth", "traits":["insane","treacherous","proud"], "id":"MB"}, {"name": "Lady Macbeth", "traits":["insane","greedy"], "id":"LM"}, {"name":"Duncan", "traits":["Kingly","generous","trusting"], "id":"D"}, {"name":"Macduff", "traits":["insane","loyal","from his mother's womb untimely ripped"], "id":"MD"}];

var timepoints = [1,1,1,1,1,1,1,1,1,1,2,2,2,2,3,3,4,4,5,5,6,6,6,7,8,8];

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


//themes: birth, death, joy, good, evil, beauty, inclusion, exclusion, revenge, pursuit of power -> pick at most one major theme for each event
var themes = [];
for (i=1;i<=events.length;i++)
{
	themes[i-1]=[];
}

themes[0]=[""]; themes[1]=[""]; themes[2]=[""]; themes[7]=[""];

/*tropes: fatal mistake, evil older woman, revenge, fairy helper, deathlike sleep, imprisonment, damsel in distress, heroism, rescue -> again, pick at most one major theme for each event. we're looking for similarities, so pick one type of thing and stick to it for multiple events, even though some of these are similar*/
var tropes = [];
for (i=1;i<=events.length;i++)
{
	tropes[i-1]=[];
}

tropes[4]=["insanity"]; tropes[5]=["insanity"]; tropes[6]=["insanity"]; tropes[8]=["greed"]; tropes[10]=["greed"]; tropes[11]=["greed"]; tropes[14]=["greed"]; tropes[21]=["revenge"], tropes[23]=["revenge"];

var links = [
{"source":0,"target":11,"value":1},
{"source":1,"target":14,"value":1},
{"source":2,"target":20,"value":1},
{"source":3,"target":14,"value":1},
{"source":3,"target":18,"value":1},
{"source":4,"target":14,"value":1},
{"source":5,"target":8,"value":1},
{"source":5,"target":9,"value":1},
{"source":6,"target":23,"value":1},
{"source":7,"target":21,"value":1},
{"source":8,"target":10,"value":1},
{"source":9,"target":12,"value":1},
{"source":9,"target":13,"value":1},
{"source":10,"target":14,"value":1},
{"source":14,"target":16,"value":1},
{"source":14,"target":17,"value":1},
{"source":16,"target":19,"value":1},
{"source":19,"target":21,"value":1},
{"source":21,"target":23,"value":1},
{"source":19,"target":22,"value":1},
{"source":23,"target":24,"value":1},
{"source":23,"target":25,"value":1},
{"source":16,"target":18,"value":1},
{"source":18,"target":20,"value":1}
]

var nodes = [];

for (i=0;i<events.length;i++)
{
	nodes[i]={"name":events[i],"id":i,"time":timepoints[i],"chars":chars[i], "themes":themes[i], "tropes":tropes[i], /*"x":20, "y":20,*/ "fixed":false}
}

