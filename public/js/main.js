$(document).ready(function() {
//            $('#all_users').scrollTop($('#all_users').prop('scrollHeight'));
    $(document).on( "click", ".remove_user", function() {
        var id = $(this).prev().val();
        var button = $(this);
        $.ajax({
            type: 'post',
            url: '/delete',
            cache: false,
            data: {id : id},
            success: function (answer) {
                if(answer){
                    button.parent().remove();
                }
            }
        });
    });
});
