var el = document.getElementsByTagName("a");
for(var i=0;i<el.length;i++){
    el[i].href = el[i].href.replace((www\.)?imgur.com\/gallery\/, i\.imgur\.com\/);
}