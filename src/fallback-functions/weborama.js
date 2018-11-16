function weborama() {
	let tag = document.createElement("script");
	tag.text = `weborama_display_tag = {
		admire_id: "22d666e0968cdba201d55d1380a8ed3e",
		mediapath: "https://media.adrcdn.com/ads/Staatsloterij/3330313538/148731/",
		random: "\${CACHEBUSTER}",
		placement: "default",
		width: 336,
		height: 280,
		clicks: [
			"\${CLICK_URL}https://ad.doubleclick.net/ddm/trackclk/N479001.2276702NEXTDAYMEDIANL/B10757124.215703095;dc_trk_aid=414721216;dc_trk_cid=98572431;dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua="
		],
		imptrackers: [
			"https://opt.objectiveportal.com/pixel.gif?customer=LOT&brand=staatsloterij&domain=NL&process=banner&utm_source=stl-wv-ndm-fixedscroll&utm_medium=bac&utm_campaign=stl-werving",
			"https://ad.doubleclick.net/ddm/trackimp/N479001.2276702NEXTDAYMEDIANL/B10757124.215703095;dc_trk_aid=414721216;dc_trk_cid=98572431;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?"
		]};
		document.write('<scr'+'ipt type="text/javascript" src="https://media.adrcdn.com/scripts/w-display/screenad_launch_1.0.0_scrambled.js"></scr'+'ipt>');`;

	let div = document.createElement("div");
	div.style.display = "inline-block";
	div.appendChild(tag);

	return div;
}

export default weborama;