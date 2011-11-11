$(function() {
	$(".edit_name").editable(function(value,settings){
		return(value);
		}, {
		select:true
	});
	$(".edit_playto").editable(function(value,settings){
		$.cookie('playto',value);
		return(value);
		},{
		select:true
	});
	$(".edit_bestof").editable(function(value,settings){
		$.cookie('bestof',value);
		return(value);
		},{
		select:true
	});

});
$(window).resize(function() {refresh_scores()});

function increment_score(div) {
	"use strict";
	var val = $(div).text();
	val = Number(val);
	val = zero_pad(val + 1);
	$(div).html(val);
	refresh_scores();
}
function decrement_score(div) {
	"use strict";
	var val = $(div).text();
	val = Number(val) - 1;
	if (val < 0) {
		val = '0';
	}
	val = zero_pad(val);
	$(div).html(val);
	refresh_scores();
}
function increment_wins(div) {
	"use strict";
	var val = $(div).text();
	val = Number(val);
	val = val + 1;
	$(div).html(val);
}

/*
	refresh_scores - refreshes the scores (obviously)
	also: 
		zero-pads (both sizes)
		checks for win/loss conditions
		populates the out of fields at the top
*/
function refresh_scores() {
	"use strict";
	var bestof = $('#best_of').text();
	var playto = $('#play_to').text();
	$('#left_score').html("<div>" + zero_pad($('#left_score').text()) + "</div>");	
	$('#right_score').html("<div>" + zero_pad($('#right_score').text()) + "</div>");		
	if (Number($('#left_score').text()) >= playto) {
		//Check for match win?
		var cur = Number($('#left_wins').text());
		cur = cur + 1;
		$('#left_wins').html(cur);
		init_scores();
	}
	if (Number($('#right_score').text()) >= playto) {
		//Check for match win?
		var cur = Number($('#right_wins').text());
		cur = cur + 1;
		$('#right_wins').html(cur);
		init_scores();
	}
	$('#left_bestof').html(bestof);
	$('#right_bestof').html(bestof);
	$('#left_score').bigtext();
	$('#right_score').bigtext();
}

function zero_pad(mynum) {
	mynum = mynum.toString();
	var maxlen = $('#left_score').text().length < $('right_score').text().length ? $('right_score').text().length : $('#left_score').text().length;
	while (mynum.length < maxlen) {
		mynum = "0" + mynum;
	}
	return mynum;
}
function init_games() {
	$('#left_wins').html('0');
	$('#right_wins').html('0');
	init_scores();
}

function init_scores() {
	$('#left_score').html('00');
	$('#right_score').html('00');
	if ($('#play_to').text() == '0') {
		$('#play_to').html($.cookie('playto') != null ? $.cookie('playto') : '21');
	}
	if ($('#best_of').text() == '0') {
		$('#best_of').html($.cookie('bestof') != null ? $.cookie('bestof') : '3');
	}
	refresh_scores();
}
