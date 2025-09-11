
import {
  complex as c,
  type Complex,
  sqrt as s,
  add as a,
  multiply as m,
  subtract as sub,
  atan2 as at,
  cos as co,
  pi,
} from "mathjs";

/**
 * Solves a cubic equation of the form ax³ + bx² + cx + d = 0.
 * @param a - The coefficient of the x³ term.
 * @param b - The coefficient of the x² term.
 * @param c - The coefficient of the x term.
 * @param d - The constant term.
 * @returns An array of three complex roots.
 */
export function solveCubic(
  a: number,
  b: number,
  c: number,
  d: number,
): Complex[] {
  if (a === 0) {
    // This is a quadratic equation, not implemented here.
    return [c(NaN, NaN), c(NaN, NaN), c(NaN, NaN)];
  }

  // Normalize to depressed cubic: t³ + pt + q = 0
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

  const delta = a(m(q / 2, q / 2), m(p / 3, p / 3, p / 3)) as number;

  let roots: Complex[];

  if (delta >= 0) {
    const sqrtDelta = s(delta);
    const u = Math.cbrt(a(-q / 2, sqrtDelta) as number);
    const v = Math.cbrt(sub(-q / 2, sqrtDelta) as number);

    roots = [
      a(u, v) as unknown as Complex,
      a(
        m(u, c(-0.5, 0.5 * (s(3) as number))),
        m(v, c(-0.5, -0.5 * (s(3) as number))),
      ) as Complex,
      a(
        m(u, c(-0.5, -0.5 * (s(3) as number))),
        m(v, c(-0.5, 0.5 * (s(3) as number))),
      ) as Complex,
    ];
  } else {
    // Three real roots
    const r = s(m(-1, p, p, p, 1 / 27)) as number;
    const phi = at(Number(s(-delta)), -q / 2);

    const u = Math.pow(r, 1 / 3);

    roots = [
      c(Number(m(2, u, co(phi / 3))), 0),
      c(Number(m(2, u, co((phi + 2 * pi) / 3))), 0),
      c(Number(m(2, u, co((phi + 4 * pi) / 3))), 0),
    ];
  }

  // Convert back to roots of original equation: x = t - b / 3a
  const shift = b / (3 * a);
  return roots.map((t) => sub(t, shift) as Complex);
}
