class RGB {
  constructor(red, green, blue) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }

  toRGB() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  toHexa() {
    return Object.values(this).map((x) => x.toString(16).padStart(2, 0)).join('');
  }
}

const randomInt = limit => Math.round(Math.random() * limit);

const createAttribute = (attribute, value) => attribute + ': ' + value;

const randomColour = () => [randomInt(255), randomInt(255), randomInt(255)];

class Circle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  toHtml() {
    const dia = this.radius * 2;
    const colour = new RGB(...randomColour());
    const bg = createAttribute('background-color', colour.toHexa());
    const height = createAttribute('height', dia + 'px');
    const width = createAttribute('width', dia + 'px');
    const border = createAttribute('border-radius', '50%');
    const position = createAttribute('position', 'absolute');
    const top = createAttribute('top', this.y + 'px');
    const left = createAttribute('left', this.x + 'px');
    return `<div style="${bg}; ${height}; ${width}; ${border}; ${position}; ${top}; ${left} "></div>`
  }
}


const circles = Array(1000).fill(0).map(() => {
  const circle = new Circle(randomInt(1750), randomInt(1000), randomInt(5));
  return circle.toHtml();
}).join('');

const fs = require('fs');
fs.writeFileSync('index.html', circles, 'utf8');
