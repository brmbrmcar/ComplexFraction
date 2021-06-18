newFraction a b c d = if (a>=0&&b>0)||(a<=0&&b<0) && (c>=0&&d>0)||(c<=0&&d<0)
   then (abs a, abs b, abs c, abs d)
   else if (a>=0&&b>0)||(a<=0&&b<0)
   then (abs a, abs b, -abs c, abs d)
   else if (c>=0&&d>0)||(c<=0&&d<0)
   then (-abs a, abs b, abs c, abs d)
   else (-abs a, abs b, -abs c, abs d)
simplify :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer)
simplify x = ((rnum x) `div` (gcd (rnum x) (rden x)), (rden x) `div` (gcd (rnum x) (rden x)), (inum x) `div` (gcd (inum x) (iden x)), (iden x) `div` (gcd (inum x) (iden x)))
rnum (a,_,_,_) = a
rden (_,a,_,_) = a
inum (_,_,a,_) = a
iden (_,_,_,a) = a
frRec x = (rnum x * (rden x * iden x)^2, rden x * ((rnum x * iden x)^2 + (rden x * inum x)^2), -inum x * (rden x * iden x)^2, iden x * ((rnum x * iden x)^2 + (rden x * inum x)^2))
frAbs2 x = ((rnum x * iden x)^2+(inum x * rden x)^2, (rden x * iden x)^2, 0, 1)
frAdd x y = (rnum x * rden y + rnum y * rden x, rden x * rden y, inum x * iden y + inum y * iden x, iden x * iden y)
frSubtract x y = (rnum x * rden y - rnum y * rden x, rden x * rden y, inum x * iden y - inum y * iden x, iden x * iden y)
frMultiply x y = (rnum x * rnum y * iden x * iden y - inum x * inum y * rden x * rden y, rden x * rden y * iden x * iden y, rnum x * inum y * iden x * rden y + rnum y * inum x * iden y * rden x, rden x * rden y * iden x * iden y)
frDivide x y = frMultiply x (frRec y)
frSqrt x a = if inum x == 0
   then frSqrt2 x a (1,1,0,1)
   else if inum x > 0
   then frSqrt2 x a (1,1,1,1)
   else frSqrt2 x a (1,1,-1,1)
frSqrt2 x a s = if rnum (frSubtract a (frAbs2 (frSubtract (frAbs2 (frMultiply s s)) (frAbs2 (x))))) > 0
   then s
   else frSqrt2 x a (frSubtract s (frDivide (frSubtract (frMultiply s s) (x)) (frAdd s s)))
