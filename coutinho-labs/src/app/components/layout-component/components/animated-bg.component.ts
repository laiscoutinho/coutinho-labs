import { Component, ElementRef, ViewChild,
  AfterViewInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-animated-bg',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas #canvas style="
      position:fixed; inset:0; width:100%; height:100%;
      pointer-events:none; z-index:0;">
    </canvas>`,
})
export class AnimatedBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;
  private raf = 0;
  private blocks: Block[] = [];

  private readonly COLORS = ['#3D3B8E', '#7F77DD'];
  private readonly COUNT = 18; // poucos blocos = leve

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resize(canvas);
    window.addEventListener('resize', () => this.resize(canvas));
    this.spawn();
    this.loop();
  }

  private resize(canvas: HTMLCanvasElement) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  private spawn() {
    this.blocks = Array.from({ length: this.COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 8 + Math.random() * 18,
      speed: 0.2 + Math.random() * 0.5,
      opacity: 0.05 + Math.random() * 0.12,
      color: this.COLORS[Math.floor(Math.random() * 2)],
      rotation: Math.random() * Math.PI,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      rx: 2 + Math.random() * 3,
    }));
  }

  private loop() {
    const { ctx } = this;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const b of this.blocks) {
      b.y -= b.speed;
      b.rotation += b.rotSpeed;
      if (b.y + b.size < 0) {
        b.y = ctx.canvas.height + b.size;
        b.x = Math.random() * ctx.canvas.width;
      }
      this.drawBlock(b);
    }
    this.raf = requestAnimationFrame(() => this.loop());
  }

  private drawBlock(b: Block) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rotation);
    ctx.globalAlpha = b.opacity;
    ctx.fillStyle = b.color;
    this.roundRect(ctx, -b.size/2, -b.size/2, b.size, b.size, b.rx);
    ctx.fill();
    ctx.restore();
  }

  private roundRect(ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', () => {});
  }
}

interface Block {
  x: number; y: number; size: number; speed: number;
  opacity: number; color: string; rotation: number;
  rotSpeed: number; rx: number;
}
