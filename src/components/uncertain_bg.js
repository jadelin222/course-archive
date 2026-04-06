"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

export default function UncertainBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    let sketchInstance;

    const sketch = (p) => {

        let t = 0;

        // --- tweak here ---
        const CANVAS = 900;
        const PAD = 120;

        const COLS = 75;   // denser weave -> 80~95
        const ROWS = 75;

        const AMP = 24;    // wrinkle strength
        const SPEED = 0.08;

        const NSCALE = 0.010;  // field smoothness
        const SHEAR_X = 0.00;  // overall slant like reference (0.12~0.30)
        const SHEAR_Y = 0.00; // subtle counter-shear

        p.setup = () => {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent(containerRef.current);

            p.pixelDensity(2);
            p.smooth();
            p.noFill();
        };

        p.draw = () => {
            // p.background(255, 0, 0);

            p.background(245);

            const x0 = PAD, y0 = PAD + 70;
            const x1 = p.width - PAD, y1 = p.height - PAD + 70;

            // paper grain (very subtle)
            drawPaperGrain();

            // irregular spacing: cumulative jittered u/v coordinates
            const U = buildIrregularAxis(COLS, 0.020); // 0.015~0.035
            const V = buildIrregularAxis(ROWS, 0.020);

            // precompute warped grid points
            const P = [];
            for (let j = 0; j <= ROWS; j++) {
                P[j] = [];
                for (let i = 0; i <= COLS; i++) {
                const u = U[i];
                const v = V[j];

                // base position
                let x = p.lerp(x0, x1, u);
                let y = p.lerp(y0, y1, v);

                // apply global shear/stretch around center (matches "pulled cloth")
                const cx = (x0 + x1) * 0.5;
                const cy = (y0 + y1) * 0.5;
                const dx0 = x - cx;
                const dy0 = y - cy;

                // shear transform
                x = cx + dx0 + dy0 * SHEAR_X;
                y = cy + dy0 + dx0 * SHEAR_Y;

                // edge loosen (stronger near edges)
                const edge = 1.0 - p.pow(p.sin(p.PI * u) * p.sin(p.PI * v), 0.85); // 0 center, 1 edges
                const edgeAmp = 0.45 + 1.05 * edge; // stronger loosen like reference

                // displacement field (smooth wrinkles)
                const nx = p.noise(x * NSCALE, y * NSCALE, t);
                const ny = p.noise(1000 + x * NSCALE, 1000 + y * NSCALE, t);

                // signed displacement
                const fx = (nx - 0.5) * 2;
                const fy = (ny - 0.5) * 2;

                // anisotropic wrinkles: more vertical drag + subtle lateral
                const dx = fx * AMP * 0.85 * edgeAmp;
                const dy = fy * AMP * 1.15 * edgeAmp;

                // small "hand tremor" (static, not time-based)
                const trem = (p.noise(5000 + i * 0.18, 6000 + j * 0.18) - 0.5) * 2.2;

                P[j][i] = p.createVector(x + dx + trem, y + dy - trem);
                }
            }

            // line style: lighter + layered looks like ink
            p.stroke(0, 150);
            p.strokeWeight(1);

            // draw weft (horizontal) with slight line-by-line variation
            for (let j = 0; j <= ROWS; j++) {
                p.stroke(0, 125 + 35 * p.noise(j * 0.08, 10)); // small ink variation
                p.beginShape();
                for (let i = 0; i <= COLS; i++) {
                const pt = P[j][i];
                p.vertex(pt.x, pt.y);
                }
                p.endShape();
            }

            // draw warp (vertical)
            for (let i = 0; i <= COLS; i++) {
                p.stroke(0, 125 + 35 * p.noise(i * 0.08, 20));
                p.beginShape();
                for (let j = 0; j <= ROWS; j++) {
                const pt = P[j][i];
                p.vertex(pt.x, pt.y);
                }
                p.endShape();
            }

            // loose outer strokes (frayed edges / outer contour)
            drawFrayedEdges(P);

            t += SPEED;
        };

        // Build a cumulative, slightly irregular axis mapping 0..1
        function buildIrregularAxis(n, jitterAmt) {
        // create small random-ish step variations, then normalize cumulative sum
        let steps = new Array(n + 1).fill(1);
        for (let i = 0; i <= n; i++) {
            // stable randomness (not time-based)
            const r = p.noise(900 + i * 0.37);
            steps[i] = 1.0 + (r - 0.5) * 2 * jitterAmt;
        }
        let cum = [0];
        let total = 0;
        for (let i = 1; i <= n; i++) {
            total += steps[i];
            cum[i] = total;
        }
        // normalize
        for (let i = 0; i <= n; i++) cum[i] /= total;
        return cum;
        }

        function drawFrayedEdges(P) {
        const cols = COLS;
        const rows = ROWS;

        p.strokeWeight(1);
        p.stroke(0, 110);

        // Multiple offset contours; top is usually more "stacked" in your reference
        drawEdgeContour(P[0], 0, -1, 6);         // top
        drawEdgeContour(P[rows], 0, +1, 4);      // bottom
        drawEdgeContour(getCol(P, 0), -1, 0, 4); // left
        drawEdgeContour(getCol(P, cols), +1, 0, 4); // right
        }

        function drawEdgeContour(edgePts, dirX, dirY, layers) {
        for (let k = 0; k < layers; k++) {
            const off = (k + 1) * 4;
            p.beginShape();
            for (let i = 0; i < edgePts.length; i++) {
            const pt = edgePts[i];
            const wob = p.sin(i * 0.10 + k * 0.9 + t * 0.6) * 1.6;
            p.vertex(pt.x + dirX * off + wob, pt.y + dirY * off - wob);
            }
            p.endShape();
        }
        }

        function getCol(P, i) {
        let col = [];
        for (let j = 0; j < P.length; j++) col.push(P[j][i]);
        return col;
        }

        function drawPaperGrain() {
        // subtle grain overlay
        p.noStroke();
        for (let k = 0; k < 180; k++) {
            const x = p.noise(100 + k * 0.7, t * 0.2) * p.width;
            const y = p.noise(200 + k * 0.7, t * 0.2) * p.height;
            const a = 6;
            p.fill(0, a);
            p.rect(x, y, 1, 1);
        }
        }

        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    };

    sketchInstance = new p5(sketch);

    return () => {
      if (sketchInstance) {
        sketchInstance.remove();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}