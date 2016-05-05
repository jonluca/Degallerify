var el = document.getElementsByTagName("a");
var j = 0;
for(j=0;j<el.length;j++){
	if((el[j].href).indexOf("imgur.com/a/") != -1){
		continue;
	}
	if((el[j].href).indexOf("imgur.com") != -1){
    	el[j].href = el[j].href.replace(/(www\.)?imgur.com\/gallery\//, "i.imgur.com/");
    	if((el[j].href).indexOf("gif") == -1 && el[j].href.indexOf("/a/")){
    		el[j].href += .jpg;
    	}
    }
}