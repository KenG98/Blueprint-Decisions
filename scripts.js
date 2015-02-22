var decision_to_make = "";
var factors = {};
var options = {};

function add_decision(){
	decision_to_make = $("#decision-box").val();
}

function add_factor(){
	//add it to the json
	var factorname = $("#factor-box").val();
	$("#factor-box").val("");
	var factorimportance = $("#factor-importance").val();
	var wantHigh = $("#want-high").val();
	factors[factorname] = {"importance":factorimportance, "want_high": wantHigh};

	//add it to the form
	var nametemp = factorname.charAt(0).toUpperCase() + factorname.slice(1);
	var formtemp = nametemp + "&nbsp; <input type='text' id='" + factorname + "'><br>"; //factorname &nbsp; <input type='text' id='factorname'>
	$("#options").append(formtemp);
}

function add_option(){
	var theOption = $("#option-box").val();
	options[theOption] = {};
}