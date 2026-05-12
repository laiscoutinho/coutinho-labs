import { Component, ElementRef, ViewChild,
  AfterViewInit, OnDestroy,
  ChangeDetectionStrategy, NgZone, inject } from '@angular/core';

interface Satellite {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  opacity: number;
  color: string;
  rx: number;
  rotation: number;
  rotSpeed: number;
  pulsePhase: number;
}

@Component({
  selector: 'app-animated-bg',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas #c style="
    position:fixed;inset:0;width:100%;height:100%;
    pointer-events:none;z-index:0;"></canvas>`,
})
export class AnimatedBgComponent implements AfterViewInit, OnDestroy {
  @ViewChild('c') ref!: ElementRef<HTMLCanvasElement>;
  private zone = inject(NgZone);

  private ctx!: CanvasRenderingContext2D;
  private raf = 0;
  private sats: Satellite[] = [];
  private mouse = { x: -9999, y: -9999 };
  private t = 0;

  // paleta Coutinho Lab's
  private readonly COLORS = ['#3D3B8E','#7F77DD','#3D3B8E','#3D3B8E'];
  private readonly COUNT_DESKTOP = 55;
  private readonly COUNT_MOBILE  = 28;
  private readonly CONNECT_DIST  = 140;   // px — raio de conexão mouse
  private readonly SAT_DIST      = 100;   // px — raio de conexão sat-sat

  private isMobile = false;
  private resizeObs!: ResizeObserver;
  private onMouseMove!: (e: MouseEvent | TouchEvent) => void;

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      const canvas = this.ref.nativeElement;
      this.ctx = canvas.getContext('2d')!;
      this.isMobile = window.matchMedia('(pointer:coarse)').matches;
      this.resize(canvas);

      this.resizeObs = new ResizeObserver(() => this.resize(canvas));
      this.resizeObs.observe(document.documentElement);

      this.onMouseMove = (e: MouseEvent | TouchEvent) => {
        if (e instanceof MouseEvent) {
          this.mouse.x = e.clientX;
          this.mouse.y = e.clientY;
        } else if (e.touches?.length) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
        }
      };
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('touchmove', this.onMouseMove, { passive: true });

      this.spawn();
      this.loop();
    });
  }

  private resize(canvas: HTMLCanvasElement) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    this.spawn();
  }

  private spawn() {
    const count = this.isMobile
      ? this.COUNT_MOBILE : this.COUNT_DESKTOP;
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.sats = Array.from({ length: count }, () => {
      const size = this.isMobile
        ? 4 + Math.random() * 7
        : 5 + Math.random() * 12;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size,
        opacity: 0.06 + Math.random() * 0.18,
        color: this.COLORS[Math.floor(Math.random() * this.COLORS.length)],
        rx: 1.5 + Math.random() * 2.5,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });
  }

  private loop() {
    this.t += 0.012;
    const { ctx } = this;
    const W = ctx.canvas.width;
    const H = ctx.canvas.height;

    ctx.clearRect(0, 0, W, H);

    // --- mover satélites ---
    for (const s of this.sats) {
      s.x += s.vx;
      s.y += s.vy;
      s.rotation += s.rotSpeed;
      if (s.x < -20) s.x = W + 20;
      if (s.x > W + 20) s.x = -20;
      if (s.y < -20) s.y = H + 20;
      if (s.y > H + 20) s.y = -20;
    }

    // --- linhas sat-sat próximos ---
    for (let i = 0; i < this.sats.length; i++) {
      for (let j = i + 1; j < this.sats.length; j++) {
        const a = this.sats[i];
        const b = this.sats[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.SAT_DIST) {
          const alpha = (1 - dist / this.SAT_DIST) * 0.08;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(127,119,221,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // --- linhas mouse → satélites próximos ---
    const mx = this.mouse.x;
    const my = this.mouse.y;
    const hasPointer = mx > 0;

    if (hasPointer) {
      for (const s of this.sats) {
        const dx = s.x - mx;
        const dy = s.y - my;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < this.CONNECT_DIST) {
          const t = 1 - dist / this.CONNECT_DIST;
          const alpha = t * 0.55;

          // gradiente na linha: do mouse até o satélite
          const grad = ctx.createLinearGradient(mx, my, s.x, s.y);
          grad.addColorStop(0, `rgba(127,119,221,${alpha})`);
          grad.addColorStop(1, `rgba(61,59,142,${alpha * 0.4})`);

          ctx.beginPath();
          ctx.moveTo(mx, my);
          ctx.lineTo(s.x, s.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8 + t * 0.6;
          ctx.stroke();

          // satélite próximo pulsa levemente
          s.opacity = Math.min(0.9, s.opacity + t * 0.25);
        }
      }

      // ponto central do cursor no canvas
      const pulse = 0.6 + 0.4 * Math.sin(this.t * 3);
      ctx.beginPath();
      ctx.arc(mx, my, 2 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(127,119,221,${0.35 * pulse})`;
      ctx.fill();
    }

    // --- desenhar satélites ---
    for (const s of this.sats) {
      const pOpacity = s.opacity * (0.85 + 0.15 * Math.sin(this.t + s.pulsePhase));
      ctx.save();
      ctx.translate(s.x, s.y);
      ctx.rotate(s.rotation);
      ctx.globalAlpha = pOpacity;
      ctx.fillStyle = s.color;
      this.roundRect(ctx, -s.size/2, -s.size/2, s.size, s.size, s.rx);
      ctx.fill();
      ctx.restore();

      // decay da opacidade de volta ao valor base
      if (s.opacity > 0.06 + 0.18) {
        s.opacity *= 0.96;
      }
    }

    this.raf = requestAnimationFrame(() => this.loop());
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number,
    w: number, h: number, r: number
  ) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w,y, x+w,y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w,y+h, x+w-r,y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x,y+h, x,y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x,y, x+r,y);
    ctx.closePath();
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.raf);
    this.resizeObs?.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('touchmove', this.onMouseMove);
  }
}
