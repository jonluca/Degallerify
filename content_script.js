$(document).on("click", "a", function(){
    var link_target = $(this).attr('href');
    var converted_url = link_target.replace(www\.\imgur.com\/gallery\/, i\.imgur\.com\/$1);
    $(this).attr('href', converted_url);
});