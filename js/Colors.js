/// <reference path="Settings.js" />
/// <reference path="../index.html" />
var Colors = {
    init: function () {
        
        for(i=0;i<17;i++)
        {
            var div = document.createElement("div")
            $(div).css("background-color", "rgb(" + i * 15 + "," + i * 15 + "," + i * 15 + ")")
            $(div).css("display", "inline-block")
            $(div).width($(".colorBackgroudPicker").width()/4)
            $(div).height($(div).width())
            $(".colorBackgroudPicker").append(div)
            $(div).on("click", function () {
                //this.style.backgroundColor
                $("body").css("background-color", this.style.backgroundColor)
                Data.methods.setColors(userID)
            })
        }
        for (i = 0; i < 17; i++) {
            var div = document.createElement("div")
            console.log(Colors.colors[i])
                $(div).css("background-color", Colors.colors[i])
                $(div).css("display", "inline-block")
                $(div).width($(".colorTextPicker").width() / 4)
                $(div).height($(div).width())
                $(".colorTextPicker").append(div)
                $(div).on("click", function () {
                    //this.style.backgroundColor
                    $("body").css("color", this.style.backgroundColor)
                    Data.methods.setColors(userID)
                })
        }
        for (i = 0; i < 17; i++) {
            var div = document.createElement("div")
            console.log(Colors.colors[i])
            $(div).css("background-color", Colors.colors[i])
            $(div).css("display", "inline-block")
            $(div).width($(".colorHighlightPicker").width() / 4)
            $(div).height($(div).width())
            $(".colorHighlightPicker").append(div)
            $(div).on("click", function () {
                //this.style.backgroundColor
                console.log(this.style.backgroundColor)
                Settings.setup.background_menu_icon_hover = this.style.backgroundColor
                Settings.setup.background_menu_text_hover = this.style.backgroundColor
                Settings.setup.background_cells_hover = this.style.backgroundColor
                $(".tableHighlight").css("background-color",this.style.backgroundColor )
                Data.methods.setColors(userID)
            })
        }

    },
    colors:[
"#F44336",
"#E91E63",
"#9C27B0",
"#673AB7",
"#3F51B5",
"#2196F3",
"#03A9F4",
"#00BCD4",
"#009688",
"#4CAF50",
"#8BC34A",
"#CDDC39",
"#FFEB3B",
"#FF5722",
"#FFC107",
"#FF9800",
"#FFFFFF"
    ]

}