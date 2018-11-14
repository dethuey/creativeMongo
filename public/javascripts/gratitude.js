$(document).ready(function() {
    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);

        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
                console.log("test");
            }
        })
        
        var URL = "comment?q=";
        console.log(URL);
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = '<h2>Comments:</h2>';//<ul>';
            //for (var comment in data) {
            for (var i = data.length - 1; i >= 0; i--) {
                var com = data[i]; //comment];
                everything += '<div class="imageCard"><img src="'+ com.Name + '"width="100%" class="image"><p class="caption">' + com.Comment +'</p></div>';
               // everything += "<li><strong> Name:</strong> " + com.Name + "<br>Comment: " + com.Comment + "</li>";
            }
            $("#comments").html(everything);
        })
    });
    
    $("#deleteComments").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);

        var url = "delete";
        $.ajax({
            url: url,
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
    
    $( document ).ready(function() {
        resize();
        var URL = "comment?q=";
        console.log(URL);
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = '<h2>Comments:</h2>';//<ul>';
            for (var comment in data) {
            //for (var i = data.length - 1; i >= 0; i--) {
                var com = data[comment];
                everything += '<div class="imageCard"><img src="'+ com.Name + '"width="100%" class="image"><p class="caption">Caption:' + com.Comment +'</p></div>';
            }
            $("#comments").html(everything);
            resize();
        })
    });
    
    function resize(){
        console.log()
        var elements = document.getElementsByClassName("imageCard");

        if ($(window).width() > 1500){
            for (var i = 0; i < elements.length; i++) {
                console.log("test");
                elements[i].style.width=(27 + "%");
            }
        } else if($(window).width() > 970){
            for (var i = 0; i < elements.length; i++) {
                console.log("test");
                elements[i].style.width=(40 + "%");
            }            
        } else {
            for (var i = 0; i < elements.length; i++) {
                console.log("test");
                elements[i].style.width=(80 + "%");
            }        
            
        } 
    }
    $( window ).resize(function() {
        resize();
    });
});
