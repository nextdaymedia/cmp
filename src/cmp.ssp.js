function createPostMessageScript(id, target) {
	let script = document.createElement("script");
	script.type = "text/javascript";
	script.text = "var div = document.querySelector('div');" +
		"var containerWidth = div.offsetWidth;" +
		"var containerHeight = div.offsetHeight;" +

		"window.parent.postMessage({" +
			"id: '" + id + "'," +
			"containerWidth: containerWidth," +
			"containerHeight: containerHeight," +
		"}, '" + target + "');";

	return script;
}

function createIframe(div, id, target) {
	let html = document.createElement("body");
	html.style.margin = 0;
	html.appendChild(div);

	let script = createPostMessageScript(id, target);
	html.appendChild(script);

	let iframe = document.createElement("iframe");
	iframe.width = "100%";
	iframe.height = "100%";
	iframe.frameBorder = 0;
	iframe.src = "data:text/html;charset=utf-8," + encodeURI(html.outerHTML);

	return iframe;
}

function createImage() {
	let div = document.createElement("div");
	div.style.position = "absolute";
	div.style.top = 0;
	div.style.right = 0;
	div.style.bottom = 0;
	div.style.left = 0;
	div.style.maxWidth = "960px";
	div.style.margin = "0 auto";
	div.style.backgroundSize = "cover";
	div.style.backgroundPosition = "center";
	div.style.backgroundImage = "url('https://files.voetbalprimeur.nl/news/2018/11/02/v2_large_ebf22d19c735b18588dc0afcbbd77e9060cb5238.jpg')";

	let a = document.createElement("a");
	a.target = "_blank";
	a.href = "https://www.voetbalprimeur.nl/nieuws/850307/openhartig-gesprek-ziyech-met-kraay-op-de-plek-van-appie-zit-niemand-meer-.html";
	a.appendChild(div);

	return a;
}

function adSense(container, format) {
	let tag = document.createElement("script");
	tag.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
	tag.async = true;
	tag.onload = function() {
		let insWidth = ins.offsetWidth;
		let insHeight = ins.offsetHeight;
		container.style.width = insWidth + "px";
		container.style.height = insHeight + "px";
	};

	let ins = document.createElement("ins");
	ins.className = "adsbygoogle";
	ins.style.textAlign = "center";
	ins.dataset.adClient = "ca-pub-4402427756333803";

	if (format === "300x600") {
		ins.style.display = "inline-block";
		ins.style.width = "300px";
		ins.style.height = "600px";
		ins.dataset.adSlot = "3453110453";
	} else if (format === "728x90") {
		ins.style.display = "inline-block";
		ins.style.width = "728px";
		ins.style.height = "90px";
		ins.dataset.adSlot = "8945110286";
	} else {
		ins.style.display = "block";
		ins.dataset.adSlot = "4786373426";
		ins.dataset.adFormat = "auto";
		ins.dataset.fullWidthResponsive = "true";
	}

	let googleScript = document.createElement("script");
	googleScript.text = "(adsbygoogle = window.adsbygoogle || []).push({});";

	let div = document.createElement("div");
	div.appendChild(googleScript);
	div.appendChild(ins);
	div.appendChild(tag);

	return div;
}

function improveSimple() {
	let tag = document.createElement("script");
	tag.type = "text/javascript";
	tag.text = "document.write('<scr'+'ipt type=\"text/javascript\" src=\"https://ad.360yield.com/adj?p=1011347&w=970&h=250&tz='+(new Date().getTimezoneOffset())+'\"><\\/scr'+'ipt>');";

	let img = document.createElement("img");
	img.width = "970px";
	img.height = "250px";
	img.src = "https://ad.360yield.com/ad?p=1011347&w=970&h=250";

	let a = document.createElement("a");
	a.target = "_blank";
	a.href = "https://ad.360yield.com/jump?p=1011347&w=970&h=250";
	a.appendChild(img);

	let noScript = document.createElement("noscript");
	noScript.appendChild(a);

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(tag);
	div.appendChild(noScript);

	return div;
}

function improveAdvance(format = "728x90") {
	let script = document.createElement("script");
	script.type = "text/javascript";

	let div = document.createElement("div");
	div.style.margin = "0 auto";

	let a = document.createElement("a");
	a.target = "_blank";

	let img = document.createElement("img");

	format = "728x90";
	if (format === "728x90") {
		script.text = "ndmtag.cmd.push(function() {" +
			"ndmtag.defineAdSlot('improve-voetbalprimeur.nl-nieuws-728x90', {" +
				"type: 'improve'," +
				"id: 737881," +
				"size: [728,90]" +
			"});" +
			"ndmtag.display('improve-voetbalprimeur.nl-nieuws-728x90');" +
		"});";

		img.width = "728";
		img.height = "90";
		img.src = "https://ad.360yield.com/ad?p=737881&w=728&h=90";

		a.href = "https://ad.360yield.com/jump?p=737881&w=728&h=90";
		a.appendChild(img);

		div.id = "improve-voetbalprimeur.nl-nieuws-728x90";
		div.style.width = "728px";
		div.style.height = "90px";
	} else {
		script.text = "ndmtag.cmd.push(function() {" +
			"ndmtag.defineAdSlot('improve-voetbalprimeur.nl-front1-970x250', {" +
				"type: 'improve'," +
				"id: 1026215," +
				"size: [970,250]" +
			"});" +
			"ndmtag.display('improve-voetbalprimeur.nl-front1-970x250');" +
		"});";

		img.width = "970";
		img.height = "250";
		img.src = "https://ad.360yield.com/ad?p=1026215&w=970&h=250";

		a.href = "https://ad.360yield.com/jump?p=1026215&w=970&h=250";
		a.appendChild(img);

		div.id = "improve-voetbalprimeur.nl-front1-970x250";
		div.style.width = "970px";
		div.style.height = "250px";
	}

	let noScript = document.createElement("noscript");
	noScript.appendChild(a);

	div.appendChild(script);
	div.appendChild(noScript);

	return div;
}

function adnxs() {
	let tag = document.createElement("script");
	tag.src = "https://secure.adnxs.com/ttj?id=13379551&cb=${CACHEBUSTER}&pubclick=${CLICK_URL}";

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(tag);

	return div;
}

function weborama() {
	let tag = document.createElement("script");
	tag.text = "weborama_display_tag = {" +
		"admire_id: '22d666e0968cdba201d55d1380a8ed3e'," +
		"mediapath: 'https://media.adrcdn.com/ads/Staatsloterij/3330313538/148731/'," +
		"random: '${CACHEBUSTER}'," +
		"placement: 'default'," +
		"width: 336," +
		"height: 280," +
		"clicks: [" +
			"'${CLICK_URL}https://ad.doubleclick.net/ddm/trackclk/N479001.2276702NEXTDAYMEDIANL/B10757124.215703095;dc_trk_aid=414721216;dc_trk_cid=98572431;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua='" +
		"]," +
		"imptrackers: [" +
			"'https://opt.objectiveportal.com/pixel.gif?customer=LOT&brand=staatsloterij&domain=NL&process=banner&utm_source=stl-wv-ndm-fixedscroll&utm_medium=bac&utm_campaign=stl-werving'," +
			"'https://ad.doubleclick.net/ddm/trackimp/N479001.2276702NEXTDAYMEDIANL/B10757124.215703095;dc_trk_aid=414721216;dc_trk_cid=98572431;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?'" +
		"] };" +
		"document.write(\"<script language='javascript' src='https://media.adrcdn.com/scripts/w-display/screenad_launch_1.0.0_scrambled.js'><\\/script>\");";

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(tag);

	return div;
}

function flashtalking() {
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
	tag.text = "var ftClick = '${CLICK_URL}';" +
		"var ftExpTrack_3421855 = '';" +
		"var ftX = '';" +
		"var ftY = '';" +
		"var ftZ = '';" +
		"var ftOBA = 1;" +
		"var ftContent = '';" +
		"var ftCustom = '';" +
		"var ft970x250_OOBclickTrack = '';" +
		"var ftRandom = Math.random()*1000000;" +
		"var ftBuildTag1 = '<scr';" +
		"var ftBuildTag2 = '</';" +
		"var ftClick_3421855 = ftClick;" +
		"if(typeof(ft_referrer)=='undefined'){" +
			"var ft_referrer=(function(){" +
				"var r='';" +
				"if(window==top){" +
					"r=window.location.href;" +
				"} else { " +
					"try{" +
						"r=window.parent.location.href;" +
					"} catch(e){}" +
					"r=(r)?r:document.referrer;" +
				"}" +
				"while(encodeURIComponent(r).length>1000){" +
					"r=r.substring(0,r.length-1);" +
				"}return r;" +
			"}());" +
		"}" +
		"var ftDomain = (window==top)?'':(function(){" +
			"var d=document.referrer," +
			"h=(d)?d.match('(?::q/q/)+([qw-]+(q.[qw-]+)+)(q/)?'.replace(/q/g,decodeURIComponent('%'+'5C')))[1]:'';" +
			"return (h&&h!=location.host)?'&ft_ifb=1&ft_domain='+encodeURIComponent(h):'';" +
		"}());" +
		"var ftTag = ftBuildTag1 + 'ipt language=\"javascript1.1\" type=\"text/javascript\" '; " +
		"ftTag += 'src=\"https://servedby.flashtalking.com/imp/6/98841;3421855;201;js;Mediamusketiers;Videobillboard30dutch/?ftx='+ftX+'&fty='+ftY+'&ftadz='+ftZ+'&ftscw='+ftContent+'&ft_custom='+ftCustom+'&ftOBA='+ftOBA+ftDomain+'&ft_agentEnv='+(window.mraid||window.ormma?'1':'0')+'&ft_referrer='+encodeURIComponent(ft_referrer)+'&cachebuster='+ftRandom+'\" " +
		"id=\"ftscript_970x250\" " +
		"name=\"ftscript_970x250\"'; " +
		"ftTag += '>' + ftBuildTag2 + 'script>';" +
		"document.write(ftTag);";

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(noScript);
	div.appendChild(tag);

	return div;
}

function dcm() {
	let script = document.createElement("script");
	script.src = "https://www.googletagservices.com/dcm/dcmads.js";

	let ins = document.createElement("ins");
	ins.className = "dcmads";
	ins.style.display = "inline-block";
	ins.style.width = "970px";
	ins.style.height = "250px";
	ins.dataset.dcmPlacement = "N33505.2276702NEXTDAYMEDIANL/B21655605.228150382";
	ins.dataset.renderingMode = "script";
	ins.dataset.dcmClickTracker = "${CLICK_URL}";
	ins.appendChild(script);

	return ins;
}

window.addEventListener("message", (event) => {
	if  (~event.origin.indexOf('null')) {
		let data = event.data;
		let id = data.id;
		let width = data.containerWidth;
		let height = data.containerHeight;
		let container = document.getElementById(id);

		if (container) {
			container.style.width = width + "px";
			container.style.height = height + "px";
		}
	}

	if  (~event.origin.indexOf('https://s3.eu-central-1.amazonaws.com')) {
		let data = event.data;

		let id = data.id;
		let target = data.target;
		let container = document.getElementById(id);

		if (container) {
			let containerWidth = container.offsetWidth;
			let containerHeight = container.offsetHeight;

			container.innerHTML = null;
			container.style.position = "relative";
			container.style.margin = "0 auto";
			container.style.textAlign = "center";
			container.style.transition = "width 300ms, height 300ms";
			container.style.width = containerWidth + "px";
			container.style.height = containerHeight + "px";

			// let type = "adnxs";
			// let type = "weborama";
			// let type = "adSense";
			// let type = "flashtalking";
			// let type = "dcm";
			// let type = "improve-simple";
			// let type = "improve-advance";
			let type = "image";

			let ad;
			let image;
			let iframe;
			let parentDiv;

			switch (type) {
				case "image":
					console.log("image");
					image = createImage();
					container.appendChild(image);
					break;
				case "adSense":
					console.log("adSense");
					ad = adSense(container, data);
					container.appendChild(ad);
					break;
				case "improve-simple":
					console.log("improve-simple");
					ad = improveSimple();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "improve-advance":
					console.log("improve-advance");
					ad = improveAdvance(containerWidth, containerHeight);
					parentDiv = container.parentNode;
					parentDiv.replaceChild(ad, container);
					break;
				case "adnxs":
					console.log("adnxs");
					ad = adnxs();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "weborama":
					console.log("weborama");
					ad = weborama();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "flashtalking":
					console.log("flashtalking");
					ad = flashtalking();
					iframe = createIframe(ad, id, target);
					container.appendChild(iframe);
					break;
				case "dcm":
					console.log("dcm");
					ad = dcm();
					container.appendChild(ad);
					break;
				default:
					container.style.height = 0;
			}
		}
	} else {
		// The data hasn't been sent from your site!
		// Be careful! Do not use it.
		return;
	}
}, false);
