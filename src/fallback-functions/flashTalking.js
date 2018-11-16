function flashTalking() {
	let img = document.createElement("img");
	img.src = "https://servedby.flashtalking.com/imp/6/98841;3421855;205;gif;Mediamusketiers;Videobillboard30dutch/?";

	let a = document.createElement("a");
	a.href = "https://servedby.flashtalking.com/click/6/98841;3421855;0;209;0/?ft_width=970&ft_height=250&url=21093314";
	a.target = "_blank";
	a.appendChild(img);

	let noScript = document.createElement("noscript");
	noScript.appendChild(a);

	let tag = document.createElement("script");
	tag.type = "text/javascript";
	tag.text = `var ftClick = "\${CLICK_URL}";
		var ftExpTrack_3421855 = "";
		var ftX = "";
		var ftY = "";
		var ftZ = "";
		var ftOBA = 1;
		var ftContent = "";
		var ftCustom = "";
		var ft970x250_OOBclickTrack = "";
		var ftRandom = Math.random()*1000000;
		var ftBuildTag1 = "<scr";
		var ftBuildTag2 = "</";
		var ftClick_3421855 = ftClick;
		if(typeof(ft_referrer)=="undefined"){
			var ft_referrer=(function(){
				var r="";
				if(window==top){
					r=window.location.href;
				} else {
					try{
						r=window.parent.location.href;
					} catch(e){}
					r=(r)?r:document.referrer;
				}
				while(encodeURIComponent(r).length > 1000){
					r=r.substring(0,r.length-1);
				}return r;
			}());
		}
		var ftDomain = (window==top)?"":(function(){
			var d=document.referrer,
			h=(d)?d.match("(?::q/q/)+([qw-]+(q.[qw-]+)+)(q/)?".replace(/q/g,decodeURIComponent("%"+"5C")))[1]:"";
			return (h&&h!=location.host)?"&ft_ifb=1&ft_domain="+encodeURIComponent(h):"";
		}());
		var ftTag = ftBuildTag1 + 'ipt language="javascript1.1" type="text/javascript" ';
		ftTag += 'src="https://servedby.flashtalking.com/imp/6/98841;3421855;201;js;Mediamusketiers;Videobillboard30dutch/?ftx='+ftX+'&fty='+ftY+'&ftadz='+ftZ+'&ftscw='+ftContent+'&ft_custom='+ftCustom+'&ftOBA='+ftOBA+ftDomain+'&ft_agentEnv='+(window.mraid||window.ormma?'1':'0')+'&ft_referrer='+encodeURIComponent(ft_referrer)+'&cachebuster='+ftRandom+'"
		id="ftscript_970x250";
		name="ftscript_970x250";
		ftTag += '>' + ftBuildTag2 + 'script>';
		document.write(ftTag);`;

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(noScript);
	div.appendChild(tag);

	return div;
}

export default flashTalking;
