const colVal = 'Ñ@#W$9876543210?!abc;:+=-,._';
let vid;
let container;

let asciiW = 120;
let asciiH;

function setup() {
  noCanvas();
  container = select('.container');

  vid = createVideo(['badApple.mp4'], vidLoaded);
  vid.hide();   
  vid.volume(1);

  
  const btn = createButton("▶ Play Bad Apple");
  btn.mousePressed(() => {
    vid.loop();
    vid.play();
    btn.hide();
  });
}

function vidLoaded() {
  
}


function vidLoaded() {
  const aspect = vid.height / vid.width;
  asciiH = floor(asciiW * aspect * 0.55); 

  vid.loop();
  vid.play();
}

function draw() {
  if (!vid || !asciiH) return;

  const temp = createGraphics(asciiW, asciiH);
  temp.image(vid, 0, 0, asciiW, asciiH);
  temp.loadPixels();

  let asciiFrame = '';

  for (let y = 0; y < asciiH; y++) {
    let row = '';
    for (let x = 0; x < asciiW; x++) {
      const idx = 4 * (x + y * asciiW);
      const r = temp.pixels[idx];
      const g = temp.pixels[idx + 1];
      const b = temp.pixels[idx + 2];

      const brightness = (r + g + b) / 3;
      const charIndex = floor(map(brightness, 0, 255, colVal.length-1, 0, true));
      const c = colVal.charAt(charIndex);

      row += `<span style="color: rgb(${r},${g},${b})">${c}</span>`;
    }
    asciiFrame += row + '<br>';
  }

  container.html(asciiFrame);
}
