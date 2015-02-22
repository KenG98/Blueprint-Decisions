// $(document).ready(function(){
// 	$(".pictures").click(function(){
// 		$("#intro").fadeOut();
// 	});
// });

var decision_to_make = "";
var factors = {};
var options = {};

function add_decision(){
	decision_to_make = $("#decision-box").val();
	var text_to_add = "<div id='actual_decision'>" + decision_to_make + "</div>";
	$("#decision").fadeOut();
	$("#decision").after(text_to_add);
	$("#actual_decision").hide();
	$("#actual_decision").fadeIn();
	$("#after-decision").fadeIn();
}

function add_factor(){
	//add it to the json
	var factorname = $("#factor-box").val();
	$("#factor-box").val("");
	var factorimportance = parseInt($("#factor-importance").val());
	$("#factor-importance").val("");
	var wantHigh = $("#want-high").val();
	factors[factorname] = {"importance":factorimportance, "want_high": wantHigh};

	//add it to the form
	var nametemp = factorname.charAt(0).toUpperCase() + factorname.slice(1);
	var formtemp = nametemp + ": <input type='text' id='" + factorname + "'> (Importance:" + factorimportance + "&nbsp; Ideally:" + wantHigh + ")<br>"; //factorname &nbsp; <input type='text' id='factorname'>
	$("#add-after-this").after(formtemp);
}

function add_option(){
	var theOption = $("#option-box").val();
	var parameters = {}
	for(factor in factors){
		parameters[factor] = parseInt($("#" + factor).val());
	}
	options[theOption] = parameters;

	//clear some stuff
	$("#option-box").val("");
	for(factor in factors){
		$("#" + factor).val("");
	}
}

function set_high_lows(){
	for(factor in factors){
		var high = undefined;
		var low = undefined;
		for(option in options){
			current = options[option][factor];
			if(high == undefined){
				high = current; 
			}
			if(low == undefined){
				low = current;
			}
			if(current < low){
				low = current;
			}
			if(current > high){
				high = current;
			}
		}
		factors[factor]["high"] = high;
		factors[factor]["low"] = low;
	}
}

function do_calculations(){
	//before we start
	set_high_lows();
	//all points set to 0
	for(tempop in options){
		options[tempop]["points"] = 0;
	}

	for(option in options){
		for(factor in factors){
			// console.log(option + " " + factor + " " + options[option][factor]);

			var temppoints = 0;
			var current = options[option][factor];
			var tempimportance = factors[factor]["importance"];
			var high = factors[factor]["high"];
			var low = factors[factor]["low"];
			var wantHigh = factors[factor]["want_high"];
			// console.log(temppoints,current,tempimportance,high,low,wantHigh);

			if(wantHigh == "high"){
				temppoints += (current - low)/(high - low) * tempimportance;
			}
			else if(wantHigh == "low"){
				temppoints += (high - current)/(high - low) * tempimportance;
			}
			options[option]["points"] += temppoints;
		}
	}
	var highest = undefined;
	var highscore = undefined;
	for(option in options){
		if(highest == undefined){
			highest = option;
			highscore = options[option]["points"];
		}
		if(highscore < options[option]["points"]){
			highscore = options[option]["points"];
			highest = option;
		}
		$("#results").append(option + ": " + options[option]["points"] + "<br>");
		//console.log(option + " " + options[option]["points"]);
	}
	$("#results").append("<br>Go with " + highest + ".<br>");
}