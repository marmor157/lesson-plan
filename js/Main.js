/// <reference path="../libs/jquery-3.1.0.min.js" />
/// <reference path="Settings.js" />
/// <reference path="../index.html" />
function hexToRgb(color)
{
    var colors = []
    colors[0] = parseInt(color.substring(4, color.indexOf(",")))
    colors[1] = parseInt(color.substring(color.indexOf(",")+2, color.lastIndexOf(",")))
    colors[2] = parseInt(color.substring(color.lastIndexOf(",")+2, color.length-1))
    return colors
}
var Main = {
    init: function () {
        $("body").css("background-color", Settings.setup.background_page)
        $(".menuOptionText").css("background-color", Settings.setup.background_menu)
        var colors =  hexToRgb($(".menuOptionText").css("background-color"))
        $(".menuIcon").css("background-color", "rgb("+(colors[0]+30)+", "+(colors[1]+30)+", "+(colors[2]+30)+")")
        $(".title").css("color", Settings.setup.title_color)
        $("#paneToday").css("background-color", Settings.setup.background_paneToday)
        $("#paneWeek").css("background-color", Settings.setup.background_paneToday)
        $("#paneSettings").css("background-color", Settings.setup.background_paneToday)
        $("#hoursPicker").css("background-color", Settings.setup.background_hours_pick)
        $("#paneHours").css("background-color", Settings.setup.background_paneToday)
        $("#paneColors").css("background-color", Settings.setup.background_paneToday)
        $("#subjectPicker").css("background-color", Settings.setup.background_hours_pick)
    }
}
function alert(tekst)
{
    $("#alertText").html(tekst)
    $("#alert").addClass("animate")
}