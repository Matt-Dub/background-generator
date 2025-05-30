const textItems = [document.querySelector("h1"), document.querySelector("h2"), document.querySelector("h3")];
const [ color1, color2 ] = document.querySelector(".color1");
const body = document.getElementById("gradient");
const slider = document.querySelector(".slider");
let degrees = 90;

function updateBG(){
	body.style.background = _getLinearGradient;
	textItems[2].textContent = body.style.background + ";";
  let light = hexToHSL(color1.value) + hexToHSL(color2.value);

	if((light) < 80){
		textItems.forEach((item) => item.style.color = "rgba(255, 255, 255, 0.7)");
	} else {
		textItems.forEach((item) => item.style.color = "rgba(0, 0, 0, 0.7)");
	}
}
updateBG();

_getLinearGradient = () => {
  return `linear-gradient(${degrees}deg, ${color1.value}, ${color2.value}`;
}

color1.addEventListener("input", updateBG);
color2.addEventListener("input", updateBG);

slider.addEventListener("input", function() {
	degrees = Math.round(this.value * 3.6);
	updateBG();
})


function hexToHSL(H) {
  // Convert hex to RGB first

  let r = 0, g = 0, b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

  if (delta == 0)
    h = 0;
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  else if (cmax == g)
    h = (b - r) / delta + 2;
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0)
    h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return l;
}