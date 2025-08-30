
import { complex, type Complex, pow, sqrt, add, multiply, divide, subtract, atan2, cos, sin, pi } from "mathjs";

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

  const delta = add(multiply(q / 2, q / 2), multiply(p / 3, p / 3, p / 3));
  
  let roots: Complex[];

  if (typeof delta === 'number' && delta >= 0) {
    const sqrtDelta = sqrt(delta);
    const u = cbrtComplex(add(-q / 2, sqrtDelta));
    const v = cbrtComplex(subtract(-q / 2, sqrtDelta));

    roots = [
      add(u, v) as Complex,
      add(multiply(u, complex(-0.5, 0.5 * sqrt(3))), multiply(v, complex(-0.5, -0.5 * sqrt(3)))) as Complex,
      add(multiply(u, complex(-0.5, -0.5 * sqrt(3))), multiply(v, complex(-0.5, 0.5 * sqrt(3)))) as Complex
    ];
  } else {
    // Three real roots or complex delta
    const r = sqrt(multiply(-1, p, p, p, 1/27));
    const phi = atan2(sqrt(multiply(delta, -1)) as unknown as number, -q/2) as number;
    
    const u = pow(r, 1/3);
    
    roots = [
        complex(multiply(2, u, cos(phi / 3)), 0),
        complex(multiply(2, u, cos(add(phi, 2 * pi) / 3)), 0),
        complex(multiply(2, u, cos(add(phi, 4 * pi) / 3)), 0),
    ];
  }

  // Convert back to roots of original equation: x = t - b / 3a
  const shift = b / (3 * a);
  return roots.map(t => subtract(t, shift) as Complex);
}

function cbrtComplex(c: number | Complex): Complex {
    if (typeof c === 'number') {
        return complex(Math.cbrt(c), 0);
    }
    return pow(c, 1/3) as Complex;
}
