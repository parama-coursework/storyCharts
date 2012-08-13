nodes = [
	{"name":"Queen wants Prince's Bride to be a true Princess", "id":0, "group":1, "value":0, "fixed": true},
    {"name":"Prince wants his bride to be true Princess",                              "id":1,             "group":1,       "value":1, "fixed": true},
    {"name":"Princess Needs Shelter",                           "id":2,             "group":1,       "value":2, "fixed": true},
    {"name":"Princess arrives at Prince's palace requesting shelter",                    "id":3,             "group":1,       "value":3, "fixed": true},
    {"name":"Prince grants her shelter for one night",                "id":4,             "group":1,       "value":4},
    {"name":"Queen places pea under 20 mattresses for Princess as test",                    "id":5,             "group":1,       "value":5, "fixed": true},
    {"name":"Princess sleeps on Pea",        "id":6,             "group":1,       "value":6, "fixed": true},
    {"name":"Princess sleeps badly",             "id":7,             "group":1,       "value":7, "fixed": true},
	{"name":"Princess states that she slept badly, citing small hard object under her mattress",             "id":8,             "group":1,       "value":8, "fixed": true},
	{"name":"Prince and Queen believe Princess is a true Princess",             "id":9,             "group":1,       "value":9, "fixed": true},
	{"name":"Prince weds Princess",             "id":10,             "group":1,       "value":10, "fixed": true}
]

links = [
					{"source":0,"target":1,"value":1},
	                {"source":0,"target":5,"value":1},
	                {"source":1,"target":4,"value":1},
	                {"source":1,"target":10,"value":1},
	                {"source":1,"target":7,"value":1},
	                {"source":2,"target":3,"value":1},
	                {"source":3,"target":4,"value":1},
	                {"source":4,"target":5,"value":1},
	                {"source":4,"target":6,"value":1},
	                {"source":5,"target":6,"value":1},
	                {"source":6,"target":7,"value":1},
					{"source":7,"target":8,"value":1},
					{"source":8,"target":9,"value":1},
					{"source":9,"target":10,"value":1}
]