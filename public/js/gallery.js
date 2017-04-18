$(document).ready(function() {
    $(document).on( "click", ".delete_pic", function() {
        var id = $(this).prev().val();
        var name = $(this).prev().prev().val();
        var button = $(this);
        $.ajax({
            type:'post',
            url:'gallery/remove_pic',
            data: {
                id:id,
                name:name
            },
            success:function(answer)
            {
                if(!answer.error){
                    button.parent().remove();
                }
            }
        });
    });
});
