/// <reference path="../index.html" />
/// <reference path="../libs/jquery-3.1.0.min.js" />

var Clock = {
    init: function () {
        Clock.makeClock()
        setInterval(Clock.makeClock,1000)
    },
    makeClock: function () {
        var czas = new Date()
        var hour = czas.getHours()
        var minute = czas.getMinutes()
        if (minute < 10) minute = "0"+minute
        if (hour < 10) hour = "0" + hour
        $("#clock").html(hour + " " + minute)
    }

}