var Data = {
    methods: {
        getToday: function(userID)
        {
            var day =new Date().getDay()
            //console.log(day)
            Database.methods.getTodaysLessons({id:userID,day: day})
            .done(function (response){
                var data = JSON.parse(response)
                console.log(data)
                var table = document.createElement("table");
                $("#paneToday .title").html(data[0].dayLongName)
                for(var i=0;i<data.length;i++)
                {
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = i+1;
                    tr.appendChild(td);
                    td = document.createElement("td");
                    td.innerHTML = data[i].subjectLong;
                    tr.appendChild(td)
                    td = document.createElement("td");
                    td.innerHTML = data[i].nSali;
                    tr.appendChild(td)
                    tr.classList.add("paneTodayClick")
                    
                    if(i%2==1)
                    {
                        tr.classList.add("tableHighlight")
                        $(tr).css("background-color", Settings.setup.background_menu_icon_hover)
                    }
                    table.appendChild(tr)
                }
                $("#dayContainer").html("");
                $("#dayContainer").append(table);

                $(".paneTodayClick").on("click", function(){
                    $("#subjectPicker #help_id").html($(this).children()[0].innerHTML)
                    $("#subjectPicker #help_day").html(new Date().getDay())
                    $("#subjectPicker").toggleClass("animate")
                })
            })
        },
        getWeek: function(userID){
            Database.methods.getWeeksLessons({id:userID})
            .done(function (response){
                var data = JSON.parse(response)
                var table = document.createElement("table");
                $(table).append("<tr><td></td><td>PN</td><td>WT</td><td>ŚR</td><td>CZW</td><td>PT</td></tr>")
                for(var lesson =0;lesson<data.length/5;lesson++){
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = lesson+1;
                    td.rowSpan = "2"
                    tr.appendChild(td);
                    
                    for(var i=0;i<data.length/15;i++)
                    {
                        var td = document.createElement("td");
                        td.innerHTML = data[lesson+i*15].subjectShort;
                        td.classList.add("paneWeekClickSubject")
                        tr.appendChild(td);
                        td.id = i+1;
                    }
                    table.appendChild(tr);
                    if(lesson%2==1)
                    {
                        tr.classList.add("tableHighlight")
                        $(tr).css("background-color", Settings.setup.background_menu_icon_hover)
                    }
                    tr = document.createElement("tr");
                    for(var i=0;i<data.length/15;i++)
                    {
                        var td = document.createElement("td");
                        td.innerHTML = data[lesson+i*15].nSali;
                        td.classList.add("paneWeekClickSala")
                        tr.appendChild(td);
                    }
                    if(lesson%2==1)
                    {
                        tr.classList.add("tableHighlight")
                        $(tr).css("background-color", Settings.setup.background_menu_icon_hover)
                    }
                    table.appendChild(tr);
                }
                $("#weekContainer").html("")
                $("#weekContainer").append(table)
                
                $(".paneWeekClickSubject").on("click", function(){
                    $("#subjectPicker #help_id").html($(this).parent().children()[0].innerHTML)
                    $("#subjectPicker #help_day").html($(this).attr("id"))
                    $("#subjectPicker").toggleClass("animate")
                })


            })
        },
        getHours: function(userID){
            Database.methods.getHours({id:userID})
            .done(function (response){
                var data = JSON.parse(response)
                var table = document.createElement("table")
                for(var i=0;i<data.length;i++)
                {
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.innerHTML = i+1;
                    tr.appendChild(td)

                    td = document.createElement("td");
                    if(data[i].odG.toString().length<2) data[i].odG = "0" + data[i].odG;
                    if(data[i].odM.toString().length<2) data[i].odM = "0" + data[i].odM;
                    td.innerHTML = data[i].odG + ":" + data[i].odM;
                    td.classList.add("paneHourClick")
                    $(td).attr("name", "od") 
                    tr.appendChild(td)

                    td = document.createElement("td");
                    if(data[i].doG.toString().length<2) data[i].doG = "0" + data[i].doG;
                    if(data[i].doM.toString().length<2) data[i].doM = "0" + data[i].doM;
                    td.innerHTML = data[i].doG + ":" + data[i].doM;
                    td.classList.add("paneHourClick")
                    $(td).attr("name", "do") 
                    tr.appendChild(td)
                    
                    if(i%2==1)
                    {
                        tr.classList.add("tableHighlight")
                        $(tr).css("background-color", Settings.setup.background_menu_icon_hover)
                    }
                    table.appendChild(tr)
                }
                $("#hoursContainer").html("")
                $("#hoursContainer").append(table)

                $(".paneHourClick").on("click",function(){
                    $("#hoursPicker").toggleClass("animate");
                    $("#help_id").html($(this).parent().children()[0].innerHTML)
                    $("#help").html($(this).attr("name"))
                })
            })
        },
        getSubjects: function(){
        Database.methods.getSubjects({})
        .done(function (response){
            var data = JSON.parse(response)
            //console.log(data)
            var table = document.createElement("table")
            for(var i=0;i<data.length;i++){
                var tr = document.createElement("tr")
                var td = document.createElement("td")

                td.innerHTML = data[i].id
                td.classList.add("subjectPickerClick")
                tr.appendChild(td)

                td = document.createElement("td")
                td.innerHTML = data[i].subjectLong,
                $(td).attr("name", data[i].subjectShort)
                td.classList.add("subjectPickerClick")
                tr.appendChild(td)

                if(i==0){
                    td = document.createElement("td")
                    td.rowSpan = data.length;
                    td.innerHTML = "<input type=\"text\" id=\"nSali\" />"
                    tr.appendChild(td)
                    
                }
                tr.appendChild(td)
                table.appendChild(tr)

            }
            $("#subjectContainer").append(table)

            $(".subjectPickerClick").on("click", function(){
                $(".subjectPickerClick").css("background-color", "rgba(0,0,0,0)")
                $($(this).parent().children()[1]).css("background-color", "red")
                $($(this).parent().children()[0]).css("background-color", "red")
                $("#subjectPicker #help").html($($(this).parent().children()[0]).html())
            })
        })
    },
    getColors: function(userID){
        Database.methods.getColors({id:userID})
        .done(function (response){
            var data = JSON.parse(response)
           // console.log(data)
            Settings.setup.background_menu_icon_hover = data[0].highlightColor
            Settings.setup.background_menu_text_hover = data[0].highlightColor
            Settings.setup.background_cells_hover = data[0].highlightColor
            $(".tableHighlight").css("background-color",data[0].highlightColor )
            $("body").css("color", data[0].textColor)
            $("body").css("background-color", data[0].backgroundColor)
        })
    },
    setColors: function(userID){
        console.log(Database.methods.setColors({id:userID,highlightColor:Settings.setup.background_menu_text_hover,textColor:$("body").css("color"),backgroundColor:$("body").css("background-color") }))
    },
    login: function(obj){
        Database.methods.login(obj)
        .done(function (response){
            //console.log(response)
            
            if(response!="Bad Password")
            {
                userID=response;
                if(userID.length>1)
                {
                    userID = userID.substring(1,userID.lastIndexOf("\""))
                }
                UI.initID(userID);
                Data.methods.getToday(userID);
                Data.methods.getWeek(userID);
                Data.methods.getHours(userID);
                Data.methods.getSubjects();
                Data.methods.getColors(userID);
                Data.methods.getCurrentLessons(userID)
                Data.methods.getNextLessons(userID)
                
                
                $("#login").css("display", "none")
            }else{
                alert("Bad Password")
            }
        })
    },
    getCurrentLessons: function(userID){
        var currentDate = new Date();
        console.log({id: userID,hour:currentDate.getHours(),minute:currentDate.getMinutes(),day:currentDate.getDay()})
        Database.methods.getCurrentLesson({id: userID,hour:currentDate.getHours(),minute:currentDate.getMinutes(),day:currentDate.getDay()})
        .done(function (response){
            var data = JSON.parse(response)
            console.log(data)
            if(data[0]!=undefined)
            {
                $("#lessonNow").html("Teraz:<br/>"+data[0].subjectLong+"<br/> Sala "+data[0].nSali+"<br/>")           
            }else{
                $("#lessonNow").html("Teraz:<br/>- -<br/> Sala - - <br/>")  
            }
        })
    },
    getNextLessons: function(userID)
    {
        var currentDate = new Date();
        console.log({id: userID,hour:currentDate.getHours(),minute:currentDate.getMinutes(),day:currentDate.getDay()})
        Database.methods.getNextLesson({id: userID,hour:currentDate.getHours(),minute:currentDate.getMinutes(),day:currentDate.getDay()})
        .done(function (response){
            var data = JSON.parse(response)
            console.log(data)
            if(data[0].next != undefined){
                Database.methods.getDayName({day:data[0].next})
                .done(function(response){
                    var data2 = JSON.parse(response)
                    $("#lessonNext").html("W "+data2[0].dayLongName+":<br/>"+data[0].subjectLong+"<br/> Sala "+data[0].nSali+"<br/>")
                })
            }else $("#lessonNext").html("Następnie:<br/>"+data[0].subjectLong+"<br/> Sala "+data[0].nSali+"<br/>")
        })
    }
    },
    
}