function improve(format) {
	let tag = document.createElement("script");
	tag.type = "text/javascript";

	let div = document.createElement("div");
	div.style.margin = "0 auto";

	let a = document.createElement("a");
	a.target = "_blank";

	let img = document.createElement("img");

	if (format == "970x250") {
		tag.text = `document.write('<scr'+'ipt type="text/javascript" src="https://ad.360yield.com/adj?p=1011347&w=970&h=250&tz='+(new Date().getTimezoneOffset())+'"></scr'+'ipt>');`;	

		img.width = "970";
		img.height = "250";
		img.src = "https://ad.360yield.com/ad?p=1011347&w=970&h=250";

		a.target = "_blank";
		a.href = "https://ad.360yield.com/jump?p=1011347&w=970&h=250";
		a.appendChild(img);	

		div.style.display = "inline-block";	
	} else if (format === "728x90") {
		tag.text = `ndmtag.cmd.push(function() {
			ndmtag.defineAdSlot("improve-voetbalprimeur.nl-nieuws-728x90", {
				type: "improve",
				id: 737881,
				size: [728,90]
			});
			ndmtag.display("improve-voetbalprimeur.nl-nieuws-728x90");
		});`;

		img.width = "728";
		img.height = "90";
		img.src = "https://ad.360yield.com/ad?p=737881&w=728&h=90";

		a.href = "https://ad.360yield.com/jump?p=737881&w=728&h=90";
		a.appendChild(img);

		div.id = "improve-voetbalprimeur.nl-nieuws-728x90";
		div.style.width = "728px";
		div.style.height = "90px";
	} else {
		tag.text = `ndmtag.cmd.push(function() {
			ndmtag.defineAdSlot("improve-voetbalprimeur.nl-front1-970x250", {
				type: "improve",
				id: 1026215,
				size: [970,250]
			});
			ndmtag.display("improve-voetbalprimeur.nl-front1-970x250");
		});`;

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

	div.appendChild(tag);
	div.appendChild(noScript);

	return div;
}

export default improve;