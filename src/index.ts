const canvas = document.createElement('canvas');
const wrapper = document.querySelector('#canvasWrapper');

if(wrapper) {
  wrapper.appendChild(canvas);
}

canvas.width = innerWidth;
canvas.height = innerHeight;

const c = canvas.getContext('2d')!;

class Circle {
  private x: number;
  private y: number;
  private dx: number;
  private dy: number;
  private readonly radius: number;

  constructor(x: number, y: number, dx: number, dy: number, radius: number) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
  }

  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c.strokeStyle = 'blue';
    c.stroke();
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
  }
}



const circleArray: Array<Circle> = [];
for(let i = 0; i<100; i++ ){
  const radius = 30;
  const x = Math.random() * (innerWidth - radius * 2) + radius;
  const y = Math.random() * (innerHeight - radius * 2) + radius;
  const dx = Math.random() - 0.5;
  const dy = Math.random() - 0.5;
  circleArray.push(new Circle(x, y, dx, dy, radius));
}

const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  circleArray.forEach(circle => {
    circle.draw();
    circle.update();
  })

};

animate();