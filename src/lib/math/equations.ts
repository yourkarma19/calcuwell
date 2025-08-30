
import { complex, type Complex, sqrt, add, multiply, subtract, atan2, cos, pi } from "mathjs";

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

  const delta = add(multiply(q / 2, q / 2), multiply(p / 3, p / 3, p / 3)) as number;
  
  let roots: Complex[];

  if (delta >= 0) {
    const sqrtDelta = sqrt(delta);
    const u = Math.cbrt(add(-q / 2, sqrtDelta) as number);
    const v = Math.cbrt(subtract(-q / 2, sqrtDelta) as number);

    roots = [
      add(u, v) as unknown as Complex,
      add(multiply(u, complex(-0.5, 0.5 * (sqrt(3) as number))), multiply(v, complex(-0.5, -0.5 * (sqrt(3) as number)))) as Complex,
      add(multiply(u, complex(-0.5, -0.5 * (sqrt(3) as number))), multiply(v, complex(-0.5, 0.5 * (sqrt(3) as number)))) as Complex
    ];
  } else {
    // Three real roots
    const r = sqrt(multiply(-1, p, p, p, 1/27)) as number;
    const phi = atan2(Number(sqrt(-delta)), -q/2);
    
    const u = Math.pow(r, 1/3);
    
    roots = [
        complex(Number(multiply(2, u, cos(phi / 3))), 0),
        complex(Number(multiply(2, u, cos((phi + 2 * pi) / 3))), 0),
        complex(Number(multiply(2, u, cos((phi + 4 * pi) / 3))), 0),
    ];
  }

  // Convert back to roots of original equation: x = t - b / 3a
  const shift = b / (3 * a);
  return roots.map(t => subtract(t, shift) as Complex);
}
