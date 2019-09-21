const canvas = document.createElement('canvas');
const wrapper = document.querySelector('#canvasWrapper');

canvas.width = innerWidth;
canvas.height = innerHeight;

if (wrapper) {
  wrapper.appendChild(canvas);
}

const mouse: { x: number | undefined, y: number | undefined } = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init()
});
const c = canvas.getContext('2d')!;
const MAX_RADIUS = 40;
// const MIN_RADIUS = 2;

const colorArray = [
  '#67493C',
  '#E68F71',
  '#FDCA95',
  '#FEE2C3',
  '#C0CBB7'
];

let circleArray: Array<Circle> = [];
const init = () => {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
    const radius = Math.random() * 3 + 1;
    const x = Math.random() * (innerWidth - radius * 2) + radius;
    const y = Math.random() * (innerHeight - radius * 2) + radius;
    const dx = Math.random() - 0.5;
    const dy = Math.random() - 0.5;
    circleArray.push(new Circle(x, y, dx, dy, radius));
  }
}
class Circle {
  private x: number;
  private y: number;
  private dx: number;
  private dy: number;
  private radius: number;
  private minRadius: number;
  private color: string;

  constructor(x: number, y: number, dx: number, dy: number, radius: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }

    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    // interactivity
    if (mouse.x && mouse.y) {
      if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if (this.radius < MAX_RADIUS)
          this.radius += 1
      } else if (this.radius > this.minRadius) {
        this.radius -= 1
      }
    }
  }


}


const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach(circle => {
    circle.draw();
    circle.update();
  })
};

init();
animate();