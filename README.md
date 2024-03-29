All numerators and denominators must be BigInts. The real numerator may be replaced with a fraction object and it will return itself. It is recommended that you simplify before and after every major calculation.

Create fraction:

newFraction(real numerator, real denominator, imaginary numerator, imaginary denominator)

or

newFraction(fraction object)

or 

newFractionM(modulus numerator, modulus denominator, argument numerator, argument denominator)

Object data:

nr: real numerator
dr: real denominator
sr: real negative?
ni: imaginary numerator
di: imaginary denominator
si: imaginary negative?

Simplify:

.sim()

Add:

.add(real numerator, real denominator, imaginary numerator, imaginary denominator)

or

.add(fraction object)

Subtract:

.sub(real numerator, real denominator, imaginary numerator, imaginary denominator)

or

.sub(fraction object)

Multiply:

.mul(real numerator, real denominator, imaginary numerator, imaginary denominator)

or

.mul(fraction object)

Divide:

.div(real numerator, real denominator, imaginary numerator, imaginary denominator)

or

.div(fraction object)

Reciprocal:

.rec()

Exponentiation (by real integers):

.intrpow(int)

Round:

.rou(maximum denominator = 340282366920938463463374607431768211456n)

Square root:

.sqrt(maximum denominator = 340282366920938463463374607431768211456n)

Cube root:

.cbrt(maximum denominator = 340282366920938463463374607431768211456n)

Absolute value:

.abs(maximum denominator = 340282366920938463463374607431768211456n)

Argument:

.arg(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Natural logarithm:

.ln(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Exponential function (eˣ):

.exp(iterations = 250n, maximum denominator = 340282366920938463463374607431768211456n)

Exponentiate:

.pow(real numerator, real denominator, imaginary numerator, imaginary denominator, iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Sine:

.sin(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Cosine:

.cos(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Tangent:

.tan(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Inverse sine:

.asin(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Inverse cosine:

.acos(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Inverse tangent:

.atan(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Hyperbolic sine:

.sinh(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Hyperbolic cosine:

.cosh(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Hyperbolic tangent:

.tanh(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Inverse hyperbolic sine:

.asinh(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Inverse hyperbolic cosine:

.acosh(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)

Inverse hyperbolic tangent:

.atanh(iterations = 100n, maximum denominator = 340282366920938463463374607431768211456n)
