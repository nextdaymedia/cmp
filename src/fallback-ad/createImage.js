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

export default createImage;