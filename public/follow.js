// follow
$(function () {
    
$(document).on("click", "#follow",function(e) {
    e.preventDefault()
var user_id =$("#user_id").val()
    $.ajax({
        type: "POST",
        url: "/follow/" + user_id,
        success:function (data) {
            $("#follow").removeClass("btn-default").addClass("btn-primary")
            .html("following").attr("id", "unfollow")
        },
        error:function(data) {
            console.log(data)
        }
    })
})
})


// unfollow
$(function () {
    
    $(document).on("click", "#unfollow",function(e) {
        e.preventDefault()
    var user_id =$("#user_id").val()
        $.ajax({
            type: "POST",
            url: "/unfollow/" + user_id,
            success:function (data) {
                $("#unfollow").removeClass("btn-primary").addClass("btn-default")
                .html("follow").attr("id", "follow")
            },
            error:function(data) {
                console.log(data)
            }
        })
    })
    
    $(document).on("mouseenter", "#unfollow",function(e) {
    $(this).removeClass("btn-primary").addClass("btn-danger").html("unfollow")
    })
   
    $(document).on("mouseleave", "#unfollow",function(e) {
        $(this).removeClass("btn-danger").addClass("btn-primary").html("following")
        })
})