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

class Style {
  constructor() {
    this.styles = [];
  }

  addAttribute = (attribute, value) => {
    this.styles.push(attribute + ': ' + value);
  }

  toHtml = () => this.styles.join(';')
}

const randomInt = limit => Math.round(Math.random() * limit);

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
    const style = new Style;
    style.addAttribute('background-color', colour.toHexa());
    style.addAttribute('height', dia + 'px');
    style.addAttribute('width', dia + 'px');
    style.addAttribute('border-radius', '50%');
    style.addAttribute('position', 'absolute');
    style.addAttribute('top', this.y + 'px');
    style.addAttribute('left', this.x + 'px');

    return `<div style="${style.toHtml()}"></div>`
  }
}


const circles = Array(500).fill(0).map(() => {
  const circle = new Circle(randomInt(1750), randomInt(1000), randomInt(5));
  return circle.toHtml();
}).join('');

const fs = require('fs');
fs.writeFileSync('index.html', circles, 'utf8');
