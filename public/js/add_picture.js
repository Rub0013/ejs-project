$(document).ready(function() {
    $(document).on( "click", "#add_pic_buton", function() {
        var new_image = $('#image_file')[0].files[0];
        var errors = [];
        if(new_image==undefined) {
            errors.push('Add picture!');
        }
        if(errors.length==0) {
            var formData = new FormData();
            formData.append('new_image',new_image);
            $.ajax({
                type:'post',
                url:'add_pictures/add_pic',
                encType: 'multipart/form-data',
                data: formData,
                processData: false,
                contentType: false,
                success:function(answer)
                {
                    if(!answer.error){
                        $(":file").filestyle('clear');
                        alert("Picture added!");
                    }
                    else{
                        alert("Something went wrong!");
                    }
                }
            });
        }
        else {
            alert(errors[0]);
        }
    });
});
