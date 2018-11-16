$(document).ready(function() {
    
    var mostPopular = null;
    var mostPopularVotes = 0;
    
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
            var everything = ''; 
            //for (var comment in data) {
            for (var i = data.length - 1; i >= 0; i--) {
                var com = data[i]; 
                everything += '<div class="imageCard"><img src="'+ com.Image + '"width="100%" class="image">';
                everything += '<div class="caption"><span id="' + com._id + '" class="glyphicon glyphicon-heart upvote"> ' + com.Votes + ' </span>';
                everything += '<p>' + com.Caption +'</p></div></div>';
            
                if (com.Votes > mostPopularVotes){
                    mostPopular = com;
                    mostPopularVotes = com.Votes;
                }
            }
            $("#comments").html(everything);
            if (mostPopular != null){
                var pop = "";
                pop += '<div class="popCard"><img src="'+ com.Image + '"width="100%" class="image">';
                pop += '<div class="caption"><span id="' + com._id + '" class="glyphicon glyphicon-heart upvote"> ' + com.Votes + ' </span>';
                pop += '<p>' + com.Caption +'</p></div></div>';
                $(".trending").html(pop);
            }
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
                if (data.Votes > mostPopularVotes){
                    mostPopular = data;
                    mostPopularVotes = data.Votes;
                    var pop = "";
                    pop += '<div class="popCard"><img src="'+ data.Image + '"width="100%" class="image">';
                    pop += '<div class="caption"><span id="' + data._id + '" class="glyphicon glyphicon-heart upvote"> ' + data.Votes + ' </span>';
                    pop += '<p>' + data.Caption +'</p></div></div>';
                    $(".trending").html(pop);
                }
            }
        })

    });
    
    
    $( document ).ready(function() {
        mostPopular = null;
        mostPopularVotes = 0
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
                everything += '<div class="caption"><span id="' + com._id + '" class="glyphicon glyphicon-heart upvote"> ' + com.Votes + ' </span>';
                everything += '<p>' + com.Caption +'</p></div></div>';
                
                if (com.Votes > mostPopularVotes){
                    mostPopular = com;
                    mostPopularVotes = com.Votes;
                }
            }
            $("#comments").html(everything);
            if (mostPopular != null){
                var pop = "";
                pop += '<div class="popCard"><img src="'+ mostPopular.Image + '"width="100%" class="image">';
                pop += '<div class="caption"><span id="' + mostPopular._id + '" class="glyphicon glyphicon-heart upvote"> ' + mostPopular.Votes + ' </span>';
                pop += '<p>' + mostPopular.Caption +'</p></div></div>';
                $(".trending").html(pop);
            }
            resize();
        })
    });
    
    function resize(){
        var elements = document.getElementsByClassName("imageCard");
        var form = document.getElementsByClassName("form");
        var comments = document.getElementsByClassName("comments");



        if ($(window).width() > 1000){
            for (var i = 0; i < elements.length; i++) {
                 elements[i].style.width=(27 + "%");
             }
            comments[0].style.width=(70+"%");
            form[0].style.width=(25 + "%");

        } else if ($(window).width() < 700){
            for (var i = 0; i < elements.length; i++) {
                 elements[i].style.width=(85 + "%");
            }
            form[0].style.width=(90 + "%");
            comments[0].style.width=(90+"%");
        } else if ($(window).width() < 800){
            for (var i = 0; i < elements.length; i++) {
                 elements[i].style.width=(70 + "%");
            }
            form[0].style.width=(25 + "%");
            comments[0].style.width=(60+"%");
        }else {
            comments[0].style.width=(60+"%");
            for (var i = 0; i < elements.length; i++) {
                 elements[i].style.width=(45 + "%");
            }
            form[0].style.width=(25 + "%");
            
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