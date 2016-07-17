// JavaScript Document

$(document).ready(function() {
	"use strict";
    if($(window).scrollTop()>40){
    //begin to scroll
    $("#sidebar-wrapper").css("position","fixed");
    $("#sidebar-wrapper").css("top",0);
}
else{
    //lock it back into place
    $("#sidebar-wrapper").css("position","relative");
}
});