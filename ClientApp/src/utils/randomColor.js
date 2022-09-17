export const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


export function getColorsPair() {
  var color1 = '#'+Math.floor(Math.random()*16777215).toString(16);
  var color2;
  if(isColorLight(color1)) {
    color2 = "#000000";
  } else {
    color2 = "#dedede";
  }
  return [color1, color2];
}

function isColorLight(color) {  
  const hex = color.replace('#', '');
  const c_r = parseInt(hex.substring(0, 0 + 2), 16);
  const c_g = parseInt(hex.substring(2, 2 + 2), 16);
  const c_b = parseInt(hex.substring(4, 4 + 2), 16);
  const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
  return brightness > 155;
}