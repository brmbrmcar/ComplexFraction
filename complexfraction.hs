newFraction a b c d = if (a>=0&&b>0)||(a<=0&&b<0) && (c>=0&&d>0)||(c<=0&&d<0)
   then (abs a, abs b, abs c, abs d)
   else if (a>=0&&b>0)||(a<=0&&b<0)
   then (abs a, abs b, -abs c, abs d)
   else if (c>=0&&d>0)||(c<=0&&d<0)
   then (-abs a, abs b, abs c, abs d)
   else (-abs a, abs b, -abs c, abs d)
simplify :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer)
simplify x = ((rnum x) `div` (gcd (rnum x) (rden x)), (rden x) `div` (gcd (rnum x) (rden x)), (inum x) `div` (gcd (inum x) (iden x)), (iden x) `div` (gcd (inum x) (iden x)))
listProduct :: [(Integer, Integer, Integer, Integer)] -> (Integer, Integer, Integer, Integer)
listProduct x = if length x == 1
   then x !! 0
   else listProduct ((simplify (frMultiply (x !! 0) (x !! 1))):(tail (tail x)))
factorise :: Int -> Int -> [Int] -> [Int]
factorise x n f = if n==x && length f /= 0 -- stupid but nobody should be finding the roots of massive numbers lol
   then n:f
   else if n==x
   then [x]
   else if x `mod` n /= 0
   then factorise x (n+1) f
   else factorise (x `div` n) n (n:f)
minus (a,b,c,d) = (-a,b,-c,d)
rnum (a,_,_,_) = a
rden (_,a,_,_) = a
inum (_,_,a,_) = a
iden (_,_,_,a) = a
frRec :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer)
frRec x = (rnum x * (rden x * iden x)^2, rden x * ((rnum x * iden x)^2 + (rden x * inum x)^2), -inum x * (rden x * iden x)^2, iden x * ((rnum x * iden x)^2 + (rden x * inum x)^2))
frAbs2 :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer)
frAbs2 x = ((rnum x * iden x)^2+(inum x * rden x)^2, (rden x * iden x)^2, 0, 1)
frRound :: (Integer, Integer, Integer, Integer) -> Integer -> (Integer, Integer, Integer, Integer)
frRound x n = frRound3 (frRound2 ([abs (rnum x), abs (rden x)]) n) (frRound2 ([abs (inum x), abs (iden x)]) n) [(rnum x) >=0, (rden x) > 0, (inum x) >=0, (iden x) > 0]
frRound2 :: [Integer] -> Integer -> [Integer]
frRound2 x n = if (x !! 1) > n && ((n * (x !! 0)) `mod` (x !! 1) > (x !! 1) `div` 2)
   then [(n * (x !! 0)) `div` (x !! 1) + 1, n]
   else if (x !! 1) > n
   then [(n * (x !! 0)) `div` (x !! 1), n]
   else x
frRound3 :: [Integer] -> [Integer] -> [Bool] -> (Integer, Integer, Integer, Integer)
frRound3 r i s = if (s !! 0) == (s !! 1) && (s !! 2) == (s !! 3)
   then (r !! 0,r !! 1,i !! 0,i !! 1)
   else if (s !! 0) /= (s !! 1) && (s !! 2) == (s !! 3)
   then (-(r !! 0),r !! 1,i !! 0,i !! 1)
   else if (s !! 0) == (s !! 1) && (s !! 2) /= (s !! 3)
   then (-(r !! 0),r !! 1,i !! 0,i !! 1)
   else (-(r !! 0),r !! 1,-(i !! 0),i !! 1)
frAdd :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer)
frAdd x y = frAdd3 (frAdd2 (rnum x) (rden x) (rnum y) (rden y)) (frAdd2 (inum x) (iden x) (inum y) (iden y))
frAdd2 :: Integer -> Integer -> Integer -> Integer -> [Integer]
frAdd2 a b c d = if b == d
   then [a+c,b]
   else [a*d+c*b,b*d]
frAdd3 :: [Integer] -> [Integer] -> (Integer, Integer, Integer, Integer)
frAdd3 r i = (r !! 0,r !! 1,i !! 0,i !! 1)
frSubtract x y = frAdd x (minus y)
frMultiply :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer)
frMultiply x y = (rnum x * rnum y * iden x * iden y - inum x * inum y * rden x * rden y, rden x * rden y * iden x * iden y, rnum x * inum y * iden x * rden y + rnum y * inum x * iden y * rden x, rden x * rden y * iden x * iden y)
frDivide x y = frMultiply x (frRec y)
frSqrt :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer) -> [(Integer, Integer, Integer, Integer)]
frSqrt x a = if inum x == 0
   then frSqrt2 x a (1,1,0,1)
   else if inum x > 0
   then frSqrt2 x a (1,1,1,1)
   else frSqrt2 x a (1,1,-1,1)
frSqrt2 :: (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer) -> (Integer, Integer, Integer, Integer) -> [(Integer, Integer, Integer, Integer)]
frSqrt2 x a s = if rnum (frSubtract (frAbs2 a) (frAbs2 (frSubtract (frMultiply s s) x))) > 0
   then [s, minus s]
   else frSqrt2 x a (simplify (frSubtract s (frDivide (frSubtract (frMultiply s s) (x)) (frAdd s s))))
frIntPow :: (Integer, Integer, Integer, Integer) -> Int -> (Integer, Integer, Integer, Integer)
frIntPow x n = if n == 0
   then (1,1,0,1)
   else if n == 1
   then x
   else if n == 2
   then simplify (frMultiply x x)
   else if n<0
   then frIntPow (simplify (frRec x)) (-n)
   else if n `mod` 2 == 1
   then simplify (frMultiply x (frIntPow (frMultiply x x) (n `div` 2)))
   else simplify (frIntPow (frMultiply x x) (n `div` 2))
frNRoot :: (Integer, Integer, Integer, Integer) -> Int -> (Integer, Integer, Integer, Integer) -> Integer -> [(Integer, Integer, Integer, Integer)] -- slowwwwwww :(
frNRoot x n a l = if n == 1
   then [x]
   else frNRoot2 x n a 0 ([frIntPow x y | y <- [0..n-1]]) True l
frNRoot2 :: (Integer, Integer, Integer, Integer) -> Int -> (Integer, Integer, Integer, Integer) -> Int -> [(Integer, Integer, Integer, Integer)] -> Bool -> Integer -> [(Integer, Integer, Integer, Integer)]
frNRoot2 x n a c s ch l = if c == 0 && ch
   then frNRootTest x n a c s l
   else frNRoot2 x n a ((c+1) `mod` n) (frNRoot3 x c n s l) True l
frNRoot3 :: (Integer, Integer, Integer, Integer) -> Int -> Int -> [(Integer, Integer, Integer, Integer)] -> Integer -> [(Integer, Integer, Integer, Integer)]
frNRoot3 x p n s l = take p s ++ [frRound (frSubtract (s !! p) (frDivide (frSubtract (frIntPow (s !! p) n) x) (listProduct ([frSubtract (s !! p) x | x <- take p s ++ drop (p+1) s])))) l] ++ drop (p+1) s
frNRootTest :: (Integer, Integer, Integer, Integer) -> Int -> (Integer, Integer, Integer, Integer) -> Int -> [(Integer, Integer, Integer, Integer)] -> Integer -> [(Integer, Integer, Integer, Integer)]
frNRootTest x n a c s l = if c == n
   then s
   else if rnum (frSubtract (frAbs2 a) (frAbs2 (frSubtract (frIntPow (s !! c) n) x))) > 0
   then frNRootTest x n a (c+1) s l
   else frNRoot2 x n a 0 s False l
