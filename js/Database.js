var Database ={

    methods:{
        getTodaysLessons: function(obj){
            return Ajax.send(obj,"php/getTodaysLessons.php")
        },
        login: function(obj){
            return Ajax.send(obj,"php/login.php")
        },
        getWeeksLessons: function(obj){
            return Ajax.send(obj,"php/getWeeksLessons.php")
        },
        getHours: function(obj){
            return Ajax.send(obj,"php/getHours.php")
        },
        setHour: function(obj){
            return Ajax.send(obj,"php/setHour.php")
        },
        getSubjects: function(obj){
            return Ajax.send(obj,"php/getSubjects.php")
        },
        setLesson: function(obj){
            return Ajax.send(obj,"php/setLesson.php")
        },
        getColors: function(obj){
            return Ajax.send(obj,"php/getColors.php")
        },
        setColors: function(obj){
            return Ajax.send(obj,"php/setColors.php")
        },
        getCurrentLesson: function(obj){
            return Ajax.send(obj,"php/getCurrentLesson.php")
        },
        getNextLesson: function(obj){
            return Ajax.send(obj,"php/getNextLesson.php")
        },
        getDayName: function(obj){
            return Ajax.send(obj,"php/getDayName.php")
        }
    }
}