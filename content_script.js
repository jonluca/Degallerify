var jq = document.createElement("script");

jq.addEventListener("load", proceed); // pass my hoisted function
jq.src = "https://code.jquery.com/jquery-3.1.1.js";
document.querySelector("head").appendChild(jq);

function proceed () {
	var el = document.getElementsByTagName("a");
	var gal = false;
	var singularID = null;
	var ext = null;
	for(var j=0;j<el.length;j++){
		if((el[j].href).indexOf("imgur.com/a/") != -1 || (el[j].href).indexOf("i.imgur.com") != -1){
			continue;
		}
		gal = false;
		ext = null;
		singularID = null;
		if((el[j].href).indexOf("imgur.com/a/") != -1){
			var matches = el[j].href.match(/(?:\/(a|gallery|signin))?\/([^\W_]{5,8})(?:\/|\.[a-zA-Z]+|#([^\W_]{5,8}|\d+))?(\/new|\/all|\?\d*)?$/);
			if(matches && matches[2]){
				var hash = matches[2];
				ajaxCall(j,'a');
			}
		}
		else if((el[j].href).indexOf("imgur.com") != -1){
			var matches = el[j].href.match(/(?:\/(a|gallery|signin))?\/([^\W_]{5,8})(?:\/|\.[a-zA-Z]+|#([^\W_]{5,8}|\d+))?(\/new|\/all|\?\d*)?$/);
			if(matches && matches[2]){
				var view = matches[1];
				var hash = matches[2];
				if(view == 'gallery'){
					ajaxCall(j,'g');
				}
				else if(view == null){
					ajaxCall(j,'i');
				}
			}
		}
	}

	function ajaxCall(j,in2){
		var urlHash;
		if(in2 === 'g'){
			urlHash = "https://api.imgur.com/3/gallery/" + hash;
		}
		else if(in2 === 'a') {
			urlHash = "https://api.imgur.com/3/album/" + hash;
		}
		else{
			urlHash = "https://api.imgur.com/3/image/" + hash;
		}
		$.ajax({
			type: "GET",
			url: urlHash,
			dataType: "json",
			headers:{
				'Authorization':'Client-ID c606aeeec9ca098'
			},
			success: function(data) {
				if(data.data.is_album == true) {
					if(data.data.images_count == 1){
						var temp = el[j];
						if(temp.getAttribute("data-href-url") != null){

							temp.setAttribute("data-href-url",temp.getAttribute("data-href-url").replace(/(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/gallery\/.*/, data.data.images[0].link));
							temp.setAttribute("href",temp.getAttribute("data-href-url").replace(/(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/gallery\/.*/, data.data.images[0].link));
						//el[j].href = el[j].href.replace(/(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/gallery\/.*/, data.data.images[0].link);
					}
				}else{
					var temp = el[j];
					if(temp.getAttribute("data-href-url") != null){

						temp.setAttribute("data-href-url",temp.getAttribute("data-href-url").replace(/(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/gallery\//, "https://imgur.com/a/"));

						temp.setAttribute("href",temp.getAttribute("data-href-url").replace(/(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/gallery\//, "https://imgur.com/a/"));
					}
						//el[j].href = el[j].href.replace(/(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/gallery\//, "https://imgur.com/a/");
					}
				} 
				else{
					if(data.data.animated == true){
						singularID = data.data.gifv;
					}else{
						singularID = data.data.link;
					}
					var temp = el[j];
					if(temp.getAttribute("data-href-url") != null){
						temp.setAttribute("data-href-url",temp.getAttribute("data-href-url").replace(/(.*)?(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/.*/, singularID));
						temp.setAttribute("href",temp.getAttribute("data-href-url").replace(/(.*)?(http(s)?:\/\/)?(www\.)?(m\.)?imgur.com\/.*/, singularID));

					}
				}
				temp.removeAttribute('data-outbound-url');

			},
			error: function(data){
				console.log("Failed to fetch data!");
				console.log(data);
			}
		});
	}
}