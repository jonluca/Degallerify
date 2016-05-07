var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js";
document.querySelector('head').appendChild(jq);

jq.onload = procede;
function procede(){
	var el = document.getElementsByTagName("a");
	for(var j=0;j<el.length;j++){
		if((el[j].href).indexOf("imgur.com/a/") != -1){
			continue;
		}
		if((el[j].href).indexOf("imgur.com") != -1){
			var matches = el[j].href.match(/(?:\/(a|gallery|signin))?\/([^\W_]{5,8})(?:\/|\.[a-zA-Z]+|#([^\W_]{5,8}|\d+))?(\/new|\/all|\?\d*)?$/);
			if(matches && matches[2]){
				var view = matches[1];
				var hash = matches[2];
				if(view == 'gallery'){
					$.ajax({
						type: "GET",
						url: "https://api.imgur.com/3/gallery/" + hash,
						dataType: "json",
						headers:{
							'Authorization':'Client-ID c606aeeec9ca098'
						},
						success: function(data) {
							if(data.data.is_album === true) {
								el[j].href = el[j].href.replace(/(http:\/\/)?(www\.)?imgur.com\/gallery\//, "https://imgur.com/a/");
							} 
							else{
								el[j].href = el[j].href.replace(/(http:\/\/)?(www\.)?imgur.com\/gallery\//, "https://i.imgur.com/") + '.jpg';
							}                 
						}
					});
				}
			}
		}
	}
}