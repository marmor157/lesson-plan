/// <reference path="../index.html" />
/// <reference path="../libs/jquery-3.1.0.min.js" />
var Settings = {
    setup: {
        background_page: "rgb(50,50,50)",
        background_menu: "rgb(0,0,0)",
        background_menu_icon_hover: "rgb(88,137,255)",
        background_menu_text_hover: "rgb(42,89,232)",
        title_color: "rgb(88,137,255)",
        background_paneToday: "rgba(50,50,50,0.8)",
        settings_button_color: "rgb(0,0,0)",
        background_hours_pick: "rgba(50,50,50,0.95)",
        background_cells_hover: "rgb(42,89,232)",

    },
    colors:{

    },
    
    urls: {
        
        databaseUrl: "http://localhost:51751/server/sql.aspx",
        downloadDayUrl: "http://localhost:51751/server/day.aspx",
        downloadWeekUrl: "http://localhost:51751/server/week.aspx",
        login: "http://localhost:51751/server/Login.aspx"

    },
    init: function () {
        function responsiveElements(width,height)
        {
            $(".pane").height(height);
            $("#paneSettings").height(height)
            if (width > height) {
                $("#paneHours").height(height - 125)
                $("#paneToday").height(height - 125)
                $("#paneWeek").height(height - 125)
                $("#paneColors").height(height - 125)
                $("#menuBar").css("bottom",0)
                $(".menuBarOption").height(125)
                $(".menuOptionText").height(75)
                $(".menuIcon").height(50)
                $(".menuIcon").width("100%")
                $(".menuIcon img").height(50)
                $(".menuIcon img").width(50)
                $(".menuIcon img").css("background-size", "50px")
                $(".menuOptionText").css("line-height", "75px")
                $(".pane").height(height-125)
                $("#login").height(height)
            } else {
                $("#paneHours").height(height)
                $("#paneToday").height(height)
                $("#paneWeek").height(height)
                $("#paneColors").height(height)
                $("#menuBar").css("bottom",-height)
                $(".menuBarOption").height(height/3)
                $(".menuOptionText").height(height/3)
                $(".menuIcon").height(height/3)
                $(".menuIcon").width(width/3)
                $(".menuIcon img").height(height/3)
                $(".menuIcon img").width(width/3)
                $(".menuIcon img").css("background-size", width/3+"px")
                $(".menuOptionText").css("line-height", height/3+"px")
                $(".pane").height(height-150)
                $("#login").height(height)
                $("#loginContainer").css("transform" ,"scale(2)")
                $("#loginContainer").css("-moz-transform" ,"scale(2)")
                $("#loginContainer").css("-o-transform" ,"scale(2)")
            }
        }
        height = $(window).height();
        width = $(window).width();
        responsiveElements(width,height)
        $(window).resize(function () {
            height = $(window).height();
            width = $(window).width();
            responsiveElements(width,height)
        })
        
    }
}