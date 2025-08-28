
import { complex, type Complex, pow, sqrt } from "mathjs";

/**
 * Solves a cubic equation of the form ax³ + bx² + cx + d = 0.
 * @param a - The coefficient of the x³ term.
 * @param b - The coefficient of the x² term.
 * @param c - The coefficient of the x term.
 * @param d - The constant term.
 * @returns An array of three complex roots.
 */
export function solveCubic(a: number, b: number, c: number, d: number): Complex[] {
  if (a === 0) {
    // This is a quadratic equation, not implemented here.
    return [complex(NaN, NaN), complex(NaN, NaN), complex(NaN, NaN)];
  }

  // Normalize to depressed cubic: t³ + pt + q = 0
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

  const delta = pow(q / 2, 2) + pow(p / 3, 3);
  
  let roots: Complex[];

  if (delta >= 0) {
    const sqrtDelta = sqrt(delta) as number;
    const u = cbrtComplex(-q / 2 + sqrtDelta);
    const v = cbrtComplex(-q / 2 - sqrtDelta);

    roots = [
      u.add(v) as Complex,
      u.mul(complex(-0.5, 0.5 * sqrt(3))).add(v.mul(complex(-0.5, -0.5 * sqrt(3)))) as Complex,
      u.mul(complex(-0.5, -0.5 * sqrt(3))).add(v.mul(complex(-0.5, 0.5 * sqrt(3)))) as Complex
    ];
  } else {
    // Three real roots
    const r = sqrt(-p * p * p / 27) as number;
    const phi = Math.atan2(sqrt(-delta) as number, -q/2);
    
    const u = Math.cbrt(r);
    
    roots = [
        complex(2 * u * Math.cos(phi / 3), 0),
        complex(2 * u * Math.cos((phi + 2 * Math.PI) / 3), 0),
        complex(2 * u * Math.cos((phi + 4 * Math.PI) / 3), 0),
    ];
  }

  // Convert back to roots of original equation: x = t - b / 3a
  const shift = b / (3 * a);
  return roots.map(t => t.sub(shift) as Complex);
}

function cbrtComplex(c: number | Complex): Complex {
    if (typeof c === 'number') {
        return complex(Math.cbrt(c), 0);
    }
    return pow(c, 1/3) as Complex;
}
