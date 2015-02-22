var decision_to_make = "";
var factors = {};
var options = {};

function add_decision(){
	decision_to_make = $("#decision-box").val();
}

function add_factor(){
	var factorname = $("#factor-box").val();
	$("#factor-box").val("");
	var factorimportance = $("#factor-importance").val();
	var wantHigh = $("#want-high").val();
	factors[factorname] = {"importance":factorimportance, "want_high": wantHigh};
}

function add_option(){
	var theOption = $("#option-box").val();
	options[theOption] = {};
}

function test(){
	console.log(factors);
}