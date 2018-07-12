$(document).ready(function(){
    $("#add_food").css("display","none");
    $("#submit").on("click", function(e) {
        e.preventDefault();
        $("#add_food").css("display","inherit");
        $("#login").css("display","none");
    })
    $("#submitFood").on("click", function(e) {
        e.preventDefault();
        $("#add_food").css("display","none");
        $(".modal").modal("toggle");
    })
})