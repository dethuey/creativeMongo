$(document).ready(function() {
    
    $("#postComment").click(function() {
        var myobj = { Image: $("#name").val(), Caption: $("#comment").val() };
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
            var everything = ''; //'<h2>Comments:</h2>';//<ul>';
            //for (var comment in data) {
            for (var i = data.length - 1; i >= 0; i--) {
                var com = data[i]; //comment];
                everything += '<div class="imageCard"><img src="'+ com.Image + '"width="100%" class="image">';
                everything += '<div class="caption"><span id="' + com._id + '" class="glyphicon glyphicon-heart upvote"> ' + com.Votes + ' </span>';
                everything += '<p>' + com.Caption +'</p></div></div>';
               // everything += "<li><strong> Name:</strong> " + com.Name + "<br>Comment: " + com.Comment + "</li>";
            }
            $("#comments").html(everything);
        })
    });
    
    $("#deleteComments").click(function() {
        var myobj = { Image: $("#name").val(), Caption: $("#comment").val() };
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

    
    $("body").on('click', ".upvote", function(e) {
        e.preventDefault();
        //alert("CLICKED!");
        //console.log("EVENT = " + e);
        //alert($(this).attr("id"));
        var id = $(this).attr("id");
        var url = "comment/" + id + "/upvote";
        $.ajax({
            url: url,
            type: "PUT",
            success: function(data, textStatus) {
                console.log("PUT worked");
                //console.log(data);
                //console.log("ID VAL = " + $("#" + id).text());
                var newUpvote = parseInt($("#" + id).text()) + 1;
                $("#" + id).text(" " + newUpvote);
            }
        })

    });
    
    
    $( document ).ready(function() {
        resize();
        var URL = "comment?q=";
        console.log(URL);
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = ''; // = '<h2>Comments:</h2>';//<ul>';
            //for (var comment in data) {
            for (var i = data.length - 1; i >= 0; i--) {
                var com = data[i]; //comment];
                everything += '<div class="imageCard"><img src="'+ com.Image + '"width="100%" class="image">';
                everything += '<div class="caption"><span id="' + com._id + '" class="glyphicon glyphicon-heart upvote"> ' + com.Votes + '</span>';
                everything += '<p>' + com.Caption +'</p></div></div>';
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
    
    /*function getId(element){
        var id = $(element).attr(“id”);
        console.log("Span clicked");
        console.log(id);
    }*/
    
    //Trying to get the click functionality of upvotes to work
    /*$("span").click(function(){
        alert($(this).attr("id"));
    });
    
    $("#upvote").click(function() {
        console.log("Upvote clicked");
    });*/
});
