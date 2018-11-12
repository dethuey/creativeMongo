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
    
    $(".getComments").click(function() {
        var name = $("#search").val();
        var URL = "comment?q=" + name;
        console.log(URL);
        $.getJSON(URL, function(data) {
            console.log(data);
            var everything = '<h2>Comments:</h2><ul>';
            for (var comment in data) {
                com = data[comment];
                everything += "<li><strong> Name:</strong> " + com.Name + "<br>Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    });
});
