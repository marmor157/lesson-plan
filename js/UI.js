/// <reference path="../index.html" />
/// <reference path="Ajax.js" />
/// <reference path="Database.js" />
/// <reference path="../index.html" />

var UI = {
    initID: function(userID){
        $("#hoursPickerAccept").on("click",function(){
            var num = $("#hoursPicker #help_id").html()
            var hour = $("#hoursPickerHours").html();
            var minute = $("#hoursPickerMinutes").html();
            var type = $("#hoursPicker #help").html();
            Database.methods.setHour({num:num,id:userID,type:type,hour:hour,minute:minute})
            console.log($("#hoursContainer table").children()[num-1])
            if(type=="od") $($("#hoursContainer table").children()[num-1]).children()[1].innerHTML = hour+":"+minute
            else if(type=="do")  $($("#hoursContainer table").children()[num-1]).children()[2].innerHTML = hour+":"+minute
            $(this).parent().toggleClass("animate")
        })
        $("#subjectPickerAccept").on("click",function(){
            var num = $("#subjectPicker #help_id").html()
            var subject = $("#subjectPicker #help").html()
            var day =  $("#subjectPicker #help_day").html()
            var nSali =  $("#nSali").val()

            Database.methods.setLesson({num:num,id:userID,subject:subject,day:day,nSali:nSali})
            .done(function(response){
                console.log(response)
                if(day == new Date().getDay())
                {
                    $($("#dayContainer table").children()[num-1]).children()[1].innerHTML = $($("#subjectContainer table").children()[subject-1]).children()[1].innerHTML
                    $($("#dayContainer table").children()[num-1]).children()[2].innerHTML = nSali
                }
                $($("#weekContainer table").children()[(num*2)-1]).children()[day].innerHTML = $($($("#subjectContainer table").children()[subject-1]).children()[1]).attr("name")
                $($("#weekContainer table").children()[(num*2)]).children()[day-1].innerHTML = nSali

                
            })
            $(this).parent().toggleClass("animate")
            
        })
    },
    init: function () {
        $("#alertButton").on("click", function () {
            $("#alert").removeClass("animate")
            $("#alertText").html("")
        })
        $(".menuBarOption").on("mouseover", function () {
            $(this).children(".menuOptionText").css("background-color", Settings.setup.background_menu_text_hover)
            var colors = hexToRgb($(this).children(".menuOptionText").css("background-color"))
            $(this).children(".menuIcon").css("background-color","rgb("+(colors[0]+30)+", "+(colors[1]+30)+", "+(colors[2]+30)+")");
            Settings.setup.background_menu_icon_hover = "rgb("+(colors[0]+30)+", "+(colors[1]+30)+", "+(colors[2]+30)+")"
            
        })
        $(".menuBarOption").on("mouseout", function () {
            $(this).css("background-color", Settings.setup.background_menu)
            $(this).children(".menuOptionText").css("background-color", Settings.setup.background_menu)
            var colors = hexToRgb($(this).children(".menuOptionText").css("background-color"))
            $(this).children(".menuIcon").css("background-color","rgb("+(colors[0]+30)+", "+(colors[1]+30)+", "+(colors[2]+30)+")");
            
        })
        $(".settingsButton").on("mouseover", function () {
            $(this).css("background-color",Settings.setup.background_menu_icon_hover)
        })
        $(".settingsButton").on("mouseout", function () {
            $(this).css("background-color", "rgba(0,0,0,0)")
        })
        $("#menuShowButton").on("click", function () {
            $("#menuBar").toggleClass("animate")
            $(".hide").removeClass("animate")
        })
        $(".menuBarOption").on("click", function () {
            $("#menuBar").toggleClass("animate")
            switch ($(this).index()) {
                case 0:
                                     
                    if ($("#paneSettings").hasClass("animate"))
                    {
                        $("#paneSettings").removeClass("animate")
                    } else {
                        $(".hide").removeClass("animate")
                        $("#paneSettings").toggleClass("animate")
                    }
                    break;
                case 1:
                    if ($("#paneToday").hasClass("animate"))
                    {
                        $(".hide").removeClass("animate")
                        $(".pane").removeClass("animate")
                    } else {
                        $(".hide").removeClass("animate")
                        $("#paneToday").toggleClass("animate")
                    }
                    break;    
                case 2:
                    if ($("#paneWeek").hasClass("animate")) {
                        $(".hide").removeClass("animate")
                        $(".pane").removeClass("animate")
                    } else {
                        $(".hide").removeClass("animate")
                        $("#paneWeek").toggleClass("animate")
                    }
                    break;
            }
        })
        $(".settingsButton").on("click", function () {
            switch($(this).index())
            {
                case 1:
                    $(".hide").removeClass("animate")
                    $("#paneHours").toggleClass("animate")
                    break;
                case 2:
                    $(".hide").removeClass("animate")
                    $("#paneColors").toggleClass("animate")
                    break;
               
                    
            }
        })
        $(".closeButton").on("click", function () {
            $(this).parent().removeClass("animate")
        })
        
        
        for (i = 7; i < 21; i++) {
            var div = document.createElement("div")
            div.classList.add("pickNumber")
            div.classList.add("pickHour")
            div.innerText = i
            $("#hoursPickingHours").append(div)
        }
        
        for (i = 0; i < 60; i += 5) {
            var div = document.createElement("div")
            div.classList.add("pickNumber")
            div.classList.add("pickMinute")
            div.innerText = i
            $("#hoursPickingMinutes").append(div)

        }

        $(".pickNumber").css("display", "inline-block")

        $(".pickNumber").on("click", function () {
            var temp = this.innerHTML
            if (this.classList[1] == "pickMinute") {
                if(temp<10) temp = "0"+temp
                $("#hoursPickerMinutes").text(temp)
            }
            else {
                if (temp < 10) temp = "0" + temp
                $("#hoursPickerHours").text(temp)
            }
        })

        $("#loginAccept").on("click", function(){
            var login  = $("#loginInput").val();
            var password  = $("#passwordInput").val()
            if(login!="" && password != "")
            {
                Data.methods.login({login:login,password:password})
            }
        })
        
        
            
        
    }
} 