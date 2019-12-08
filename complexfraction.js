'use strict'

var simplify = function simplify(a, b) {
   if (!b) throw "Cannot divide by zero!"
   var mod = 1n
   var c = a // so we can refer back to our inputs
   var d = b
   while (mod) { // basic gcd algorithm
      mod = a % b
      a = b
      b = mod
   }
   c /= a
   d /= a
   return [c, d]
}

var absolutereal = function absolutereal(a) {
   return a > 0n ? a : -a
}

var comparereal = function comparereal(a, b, c, d) {
   return newFraction(c, d, 0n, 1n).sub(a, b, 0n, 1n).sr
}

// we need to actually add the functions to each fraction object

var addfunctions = function addfunctions(object) {
   object.add = function(nr, dr, ni, di) { return add(object, newFraction(nr, dr, ni, di)) } // perhaps a little hacky
   object.sub = function(nr, dr, ni, di) { return sub(object, newFraction(nr, dr, ni, di)) }
   object.mul = function(nr, dr, ni, di) { return mul(object, newFraction(nr, dr, ni, di)) }
   object.rec = function() { return rec(object) }
   object.sim = function() { return sim(object) }
   object.div = function(nr, dr, ni, di) { return mul(object, newFraction(nr, dr, ni, di).rec()) }
   object.abs = function(prec = 340282366920938463463374607431768211456n) { return abs(object, prec) }
   object.arg = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return arg(object, count, prec) }
   object.intrpow = function(r) { return intrpow(object, r) }
   object.rou = function(prec = 340282366920938463463374607431768211456n) { return rou(object, prec) } // default = 2¹²⁸
   object.sqrt = function(prec = 340282366920938463463374607431768211456n) { return sqrt(object, prec) }
   object.cbrt = function(prec = 340282366920938463463374607431768211456n) { return cbrt(object, prec) }
   object.atan = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return atan(object, count, prec) }
   object.asin = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return asin(object, count, prec) }
   object.acos = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return acos(object, count, prec) }
   object.ln = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return ln(object, count, prec) }
   object.exp = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return exp(object, count, prec) }
   object.pow = function(nr, dr, ni, di, count = 100n, prec = 340282366920938463463374607431768211456n) { return pow(object, newFraction(nr, dr, ni, di), count, prec) }
   object.sin = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return sin(object, count, prec) }
   object.cos = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return cos(object, count, prec) }
   object.tan = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return tan(object, count, prec) }
   object.sinh = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return sinh(object, count, prec) }
   object.cosh = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return cosh(object, count, prec) }
   object.tanh = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return tanh(object, count, prec) }
   object.asinh = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return asinh(object, count, prec) }
   object.acosh = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return acosh(object, count, prec) }
   object.atanh = function(count = 100n, prec = 340282366920938463463374607431768211456n) { return atanh(object, count, prec) }
   object.fact = function(count = 1000n, prec = 340282366920938463463374607431768211456n) { return fact(object, count, prec) }
   return object
}

var newFraction = function newFraction(nr, dr, ni, di) {
   if (typeof nr == 'object') return nr
   if (typeof nr != 'bigint' || typeof dr != 'bigint' || typeof ni != 'bigint' || typeof di != 'bigint') throw "All inputs must be of BigInt type!"
   if (!dr || !di) throw "Cannot divide by zero!"
   var sr = nr > 0n != dr > 0n && Boolean(nr) // we want to seperate the sign from the fractions to make things easier
   var si = ni > 0n != di > 0n && Boolean(ni)
   var nr = absolutereal(nr)
   var dr = absolutereal(dr)
   var ni = absolutereal(ni)
   var di =  absolutereal(di)
   if (!nr) dr = 1n // avoid unnecessarily huge denominators
   if (!ni) di = 1n
   if (nr == dr) {
      nr = 1n
      dr = 1n
   }
   if (ni == di) {
      ni = 1n
      di = 1n
   }
   var outobj = {nr: nr, dr: dr, sr: sr, ni: ni, di: di, si: si}
   outobj = addfunctions(outobj)
   return outobj
}

var newFractionM = function newFractionM(nm, dm, na, da, count = 100n, prec = 340282366920938463463374607431768211456n) {
   return newFraction(0n, 1n, na, da).exp(count, prec).mul(nm, dm, 0n, 1n)
}

const pi = newFraction(66042797939237166593884738204157484089092316293360698857652736037180939496165955732022219028922303238278884350880930977738444480894204885073561133915852158762830955124503109884186732012071604231944097603126153436186816088678459979947158713265064200606216578194272934874913747158097580421842542309478496565496574774618010335406253731527294915764547198225734744777621607640106726773243024074961092805891107390790210126829373542596789478673443466915628973990351283389391922106351340639443903889729623328257566841975550019620200727459833280683912644949302621889238802339325596769136973744116289502043505819722622377975890675117168392044558499523988711861596389462574949055866240562477556182349897925000201350526107117273462862598585161964429979743100535843309505047201705911357841120209245549160948075617628939659716059304747459837276230748755184483305341308784651604771848817664889338382560215433058318123407199996983022092056781767918785082337669650565803768749635731843541250633558028822852739358511583n, 21022075495297667614751928455960893690002438624272829115943839442806697504563795810911475838925470847093888365073324129408307927215659038831381730042108594316069968993921710440066615373648013489084747192164702790165341729959309681053742435982348771802000052373069440771396425769052441514403521407536728128889781028801132578826022062769352911176463634450170163296745842783117938980939247969435740743001570797837710407965981817426675496744371408847255540644683853435409907956707419528276220597673982859710791069009098407760090115938669912137943834639403188507830370601269798039898169080981489165239144575694919684542547605895094295783643386486022949610288499640395373040658654793126647779511115211120505631892026006581024605674375718403810353971988226672991384150071118735359260805836448334210284378550299021477624961784815505849836613829000945773667835109750063160924999729813089918945408968987807443139072657540797083733008610554369282190595406709387044689284121274412920058465067984094788550926532608n, 0n, 1n)
const e = newFraction(57143925815361832921464921497745850770273917170204169075750403908174304050591752560620917322159184511976798657353452084307059294388622554939943435029247083631981926281185555491427674426789065131627292676278826865013479208691152601453245405506012509586567529941001893423250421411827639784134188711798507628163815919595145850760111416005168076384047485518364245613145204147234562868359676985473949533471299959517828486360139446224416313370092374473744655864849123329220560221398272323543159392392376324450601232692467140870188797250552207403097547275241187654060657433854012443407062009462813284454135168210636468277425475822313157838545143794899783640288104937503008632443421974095522211341481511092793610441590444083318453545197083610892714512240875926367311053730536703344620629351135403949271055969080373558710697451123294510583907646521362922731516878390233010579486860573451952518126638952851694938764156512599909676761144743314801555374207709564875677507678953041294511490279413722169121709655601n,  21022075495297667614751928455960893690002438624272829115943839442806697504563795810911475838925470847093888365073324129408307927215659038831381730042108594316069968993921710440066615373648013489084747192164702790165341729959309681053742435982348771802000052373069440771396425769052441514403521407536728128889781028801132578826022062769352911176463634450170163296745842783117938980939247969435740743001570797837710407965981817426675496744371408847255540644683853435409907956707419528276220597673982859710791069009098407760090115938669912137943834639403188507830370601269798039898169080981489165239144575694919684542547605895094295783643386486022949610288499640395373040658654793126647779511115211120505631892026006581024605674375718403810353971988226672991384150071118735359260805836448334210284378550299021477624961784815505849836613829000945773667835109750063160924999729813089918945408968987807443139072657540797083733008610554369282190595406709387044689284121274412920058465067984094788550926532608n, 0n, 1n)
const eeu = newFraction(5614594835668851698241432147908807867657103869251531681541590760450879670742856371328711589342143587673191310095450418381529496477n, 10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000n, 0n, 1n)

var sim = function sim(frac) {
   var reals = simplify(frac.nr, frac.dr)
   var imas = simplify(frac.ni, frac.di)
   frac.nr = reals[0]
   frac.dr = reals[1]
   frac.ni = imas[0]
   frac.di = imas[1]
   return frac
}

var abs = function abs(frac, prec) {
   var reals = newFraction(frac.nr, frac.dr, 0n, 1n).intrpow(2n)
   var imas = newFraction(frac.ni, frac.di, 0n, 1n).intrpow(2n)
   return reals.add(imas).sqrt(prec)
}

var arg = function abs(frac, count, prec) {
   if (!frac.nr && !frac.ni) throw "Argument is undefined at 0!"
   frac = frac.sim()
   if (frac.ni) {
      if (frac.si) frac.ni = -frac.ni
      if (frac.sr) frac.nr = -frac.nr
      return frac.abs(prec).sub(frac.nr, frac.dr, 0n, 1n).div(frac.ni, frac.di, 0n, 1n).atan(count, prec).mul(2n, 1n, 0n, 1n)
   }
   if (frac.sr) {
      return pi.rou(prec)
   }
   return newFraction(0n, 1n, 0n, 1n)
}

var rou = function rou(frac, prec) {
   if (typeof prec != 'bigint') throw "All inputs must be of BigInt type!"
   var nr = frac.nr
   var dr = frac.dr
   var ni = frac.ni
   var di = frac.di
   if (frac.dr > prec) {
      nr = (nr*prec)/dr
      if ((nr*prec)%dr >= dr/2n) nr += 1n
      dr = prec 
   }
   if (frac.di > prec) {
      ni = (ni*prec)/di
      if ((ni*prec)%di >= di/2n) ni += 1n
      di = prec 
   }
   if (!nr) dr = 1n // avoid unnecessarily huge denominators
   if (!ni) di = 1n
   if (nr == dr) {
      nr = 1n
      dr = 1n
   }
   if (ni == di) {
      ni = 1n
      di = 1n
   }
   var outobj = {nr: nr, dr: dr, sr: frac.sr, ni: ni, di: di, si: frac.si}
   outobj = addfunctions(outobj)
   return outobj
}

var rec = function rec(frac) {
   var x = frac.sr ? -frac.nr : frac.nr
   var y = frac.dr
   var z = frac.si ? -frac.ni : frac.ni
   var ä = frac.di
   var rnum = x*y*y*ä*ä // rearranged values
   var rden = y*((ä*ä*x*x+y*y*z*z))
   var inum = -(z*y*y*ä*ä) // needs to be subtracted
   var iden = ä*((ä*ä*x*x+y*y*z*z))
   var realsign = rnum < 0n
   var imaginarysign = inum < 0n
   rnum = absolutereal(rnum)
   inum = absolutereal(inum)
   if (!rnum) rden = 1n // avoid unnecessarily huge denominators
   if (!inum) iden = 1n
   if (rnum == rden) {
      rnum = 1n
      rden = 1n
   }
   if (inum == iden) {
      inum = 1n
      iden = 1n
   }
   var outobj = {nr: rnum, dr: rden, sr: realsign, ni: inum, di: iden, si: imaginarysign}
   outobj = addfunctions(outobj)
   return outobj
}

var add = function add(frac1, frac2) {
   var realnum = frac1.nr // create variable for all the objects to prevent accidental overwrites
   var realden = frac1.dr
   var imaginarynum = frac1.ni
   var imaginaryden = frac1.di
   var realnum2 = frac2.nr
   var realden2 = frac2.dr
   var imaginarynum2 = frac2.ni
   var imaginaryden2 = frac2.di
   if (frac1.sr) realnum = -realnum // only the numerators should be set to negative
   if (frac2.sr) realnum2 = -realnum2
   if (frac1.si) imaginarynum = -imaginarynum
   if (frac2.si) imaginarynum2 = -imaginarynum2
   if (realden == realden2) { // there is no point multiplying the denominators together if they are already the same
	realnum += realnum2
   }
   else { // multiply the numerators by their opposite denominators, **then** multiply the denominators together and add the numerators
	realnum *= realden2
	realnum2 *= realden
	realden *= realden2
        realnum += realnum2
   }
   if (imaginaryden == imaginaryden2) {
	imaginarynum += imaginarynum2
   }
   else {
	imaginarynum *= imaginaryden2
	imaginarynum2 *= imaginaryden
	imaginaryden *= imaginaryden2
        imaginarynum += imaginarynum2
   }
   var realsign = realnum < 0n // set sign
   var imaginarysign = imaginarynum < 0n
   realnum = absolutereal(realnum)
   imaginarynum = absolutereal(imaginarynum)
   var outobj = {nr: realnum, dr: realden, sr: realsign, ni: imaginarynum, di: imaginaryden, si: imaginarysign}
   outobj = addfunctions(outobj)
   return outobj
}

var sub = function sub(frac1, frac2) {
   var realnum = frac1.nr
   var realden = frac1.dr
   var imaginarynum = frac1.ni
   var imaginaryden = frac1.di
   var realnum2 = frac2.nr
   var realden2 = frac2.dr
   var imaginarynum2 = frac2.ni
   var imaginaryden2 = frac2.di
   if (frac1.sr) realnum = -realnum
   if (frac2.sr) realnum2 = -realnum2
   if (frac1.si) imaginarynum = -imaginarynum
   if (frac2.si) imaginarynum2 = -imaginarynum2
   if (realden == realden2) { 
	realnum -= realnum2
   }
   else {
	realnum *= realden2
	realnum2 *= realden
	realden *= realden2
        realnum -= realnum2
   }
   if (imaginaryden == imaginaryden2) {
	imaginarynum -= imaginarynum2
   }
   else {
	imaginarynum *= imaginaryden2
	imaginarynum2 *= imaginaryden
	imaginaryden *= imaginaryden2
        imaginarynum -= imaginarynum2
   }
   var realsign = realnum < 0n
   var imaginarysign = imaginarynum < 0n
   realnum = absolutereal(realnum)
   imaginarynum = absolutereal(imaginarynum)
   var outobj = {nr: realnum, dr: realden, sr: realsign, ni: imaginarynum, di: imaginaryden, si: imaginarysign}
   outobj = addfunctions(outobj)
   return outobj
}

var mul = function mul(frac1, frac2) {
   var realnum = frac1.nr
   var realden = frac1.dr
   var imaginarynum = frac1.ni
   var imaginaryden = frac1.di
   var realnum2 = frac2.nr
   var realden2 = frac2.dr
   var imaginarynum2 = frac2.ni
   var imaginaryden2 = frac2.di
   if (frac1.sr) realnum = -realnum
   if (frac2.sr) realnum2 = -realnum2
   if (frac1.si) imaginarynum = -imaginarynum
   if (frac2.si) imaginarynum2 = -imaginarynum2
   var realnum3 = realnum * realnum2 // multiply numerators and denominators of the same type together to calculate real part
   var realden3 = realden * realden2
   var realnum4 = -(imaginarynum * imaginarynum2) // i² = -1
   var realden4 = imaginaryden * imaginaryden2
   if (realden3 == realden4) {  // add the two fractions
	realnum3 += realnum4
   }
   else {
	realnum3 *= realden4
	realnum4 *= realden3
	realden3 *= realden4
        realnum3 += realnum4
   }
   var imaginarynum3 = realnum * imaginarynum2 // multiply opposite types for the imaginary part
   var imaginaryden3 = realden * imaginaryden2
   var imaginarynum4 = realnum2 * imaginarynum
   var imaginaryden4 = realden2 * imaginaryden
   if (imaginaryden3 == imaginaryden4) { 
	imaginarynum3 += imaginarynum4
   }
   else {
	imaginarynum3 *= imaginaryden4
	imaginarynum4 *= imaginaryden3
	imaginaryden3 *= imaginaryden4
        imaginarynum3 += imaginarynum4
   }
   var realsign = realnum3 < 0n
   var imaginarysign = imaginarynum3 < 0n
   realnum = absolutereal(realnum3) // we can use the first variables now they are free
   imaginarynum = absolutereal(imaginarynum3)
   var outobj = {nr: realnum, dr: realden3, sr: realsign, ni: imaginarynum, di: imaginaryden3, si: imaginarysign}
   outobj = addfunctions(outobj)
   return outobj
}

var intrpow = function intrpow(frac1, power) {
   if (typeof power != 'bigint') throw "All inputs must be of BigInt type!"
   var frac = frac1 // avoid accidental overwrites
   if (!power && !frac.nr && !frac.ni) throw "Cannot compute 0⁰!"
   if (!power) return newFraction(1n, 1n, 0n, 1n) // exponentiation by 0
   if (power < 0n) frac = frac.rec()
   if (power < 0n) power = -power
   if (!frac.nr && !frac.ni) return newFraction(0n, 1n, 0n, 1n)
   if (power == 1n) return frac
   if (power % 2n == 0n) return frac.mul(frac).intrpow(power/2n)
   else return frac.mul(frac.mul(frac).intrpow(power/2n))
}

var sqrt = function sqrt(frac1, prec) {
   var frac = frac1
   if (!frac.ni && !frac.nr) return frac // division by zero otherwise
   if (frac.ni) var seed = newFraction(2n, 1n, 2n, 1n)
   else var seed = frac.sr ? newFraction(0n, 1n, 2n, 1n) : newFraction(2n, 1n, 0n, 1n)
   var a = seed.sub(newFraction(seed.intrpow(2n).sub(frac)).div(seed.add(seed))).rou(prec)
   var b = a.sub(newFraction(a.intrpow(2n).sub(frac)).div(a.add(a))).rou(prec)
   var count = 0n
   while ((a.nr != b.nr || a.dr != b.dr || a.ni != b.ni || a.di != b.di || a.sr != b.sr || a.si != b.si) && count < 50n) { // check not equal nor excessive
      a = b.sub(newFraction(b.intrpow(2n).sub(frac)).div(b.add(b))).rou(prec)
      b = a.sub(newFraction(a.intrpow(2n).sub(frac)).div(a.add(a))).rou(prec)
      count += 1n
   }
   return a
}

var cbrt = function cbrt(frac1, prec) {
   var frac = frac1
   if (!frac.ni && !frac.nr) return frac
   if (frac.ni) var seed = newFraction(2n, 1n, 2n, 1n)
   else var seed = newFraction(2n, 1n, 0n, 1n)
   var a = seed.sub(newFraction(seed.intrpow(3n).sub(frac)).div(seed.mul(seed).mul(3n, 1n, 0n, 1n))).rou(prec)
   var b = a.sub(newFraction(a.intrpow(3n).sub(frac)).div(a.mul(a).mul(3n, 1n, 0n, 1n))).rou(prec)
   var count = 0n
   while ((a.nr != b.nr || a.dr != b.dr || a.ni != b.ni || a.di != b.di || a.sr != b.sr || a.si != b.si) && count < 50n) {
      a = b.sub(newFraction(b.intrpow(3n).sub(frac)).div(b.mul(b).mul(3n, 1n, 0n, 1n))).rou(prec)
      b = a.sub(newFraction(a.intrpow(3n).sub(frac)).div(a.mul(a).mul(3n, 1n, 0n, 1n))).rou(prec)
      count += 1n
   }
   return a
}

var atan = function atan(frac1, count, prec) {
   var frac = frac1
   frac = frac.sim()
   if (frac.ni) {
     if (!frac.nr) { 
	var out = newFraction(0n, 1n, 1n, 1n).sub(frac).div(frac.add(0n, 1n, 1n, 1n)).ln(count, prec).mul(0n, 1n, -1n, 2n)
	out.sr = out.si
	return out
     }
     return newFraction(0n, 1n, 1n, 1n).sub(frac).div(frac.add(0n, 1n, 1n, 1n)).ln(count, prec).mul(0n, 1n, -1n, 2n)
   }
   if (!frac.ni && !frac.nr) return frac // atan(0) = 0
   if (comparereal(frac.nr, frac.dr, 2n, 1n)) { // fix non-convergence issues
     frac = frac.div(newFraction(1n, 1n, 0n, 1n).add(newFraction(1n, 1n, 0n, 1n).add(frac.intrpow(2n)).sqrt(prec)))
     return frac.atan(count, prec).mul(2n, 1n, 0n, 1n)
   }
   var n = 1n
   var i2z = newFraction(0n, 1n, 2n, 1n).div(frac).rou(prec) // 2i/frac
   var frac1 = i2z.add(1n, 1n, 0n, 1n).rec().sim() // 1/(1+2i/frac)
   var frac2 = newFraction(1n, 1n, 0n, 1n).sub(i2z).rec().sim() // 1/(1-2i/frac)
   var frac12 = frac1.intrpow(2n).rou(prec).sim() // 1/((1+2i/frac)^2)
   var frac22 = frac2.intrpow(2n).rou(prec).sim() // 1/((1-2i/frac)^2)
   var outfrac = frac1.sub(frac2)
   var out = outfrac
   var fracd = frac1.mul(frac12)
   var fracd2 = frac2.mul(frac22)
   while (n < count) {
      n += 1n
      outfrac = fracd.sub(fracd2).rou(prec)
      var n2 = 2n*n-1n
      outfrac.dr *= n2
      outfrac.di *= n2
      out = out.add(outfrac.rou(prec))
      fracd = fracd.mul(frac12).rou(prec)
      fracd2 = fracd2.mul(frac22).rou(prec)
   }
   return out.mul(0n, 1n, 1n, 1n).rou(prec)
}

var ln = function ln(frac1, count, prec) {
   var frac = frac1
   if (!frac.nr && !frac.ni) throw "Cannot divide by zero!"
   frac = frac.sim()
   var realp = frac.abs(prec).sim()
   var imap = frac.arg(count, prec).mul(0n, 1n, 1n, 1n).sim()
   if (realp.nr == 1n && realp.dr == 1n) realp.nr = 0n
   else {
      var out = newFraction(0n, 1n, 0n, 1n)
      var ln2 = false
      var torec = false
      if (!comparereal(realp.nr, realp.dr, 1n, 1n)) {
	torec = true
	realp = realp.rec()
      }
      realp.sr = false
      while (comparereal(realp.nr, realp.dr, 2n, 1n)) {
	if (!ln2) ln2 = newFraction(2n, 1n, 0n, 1n).ln(count, prec**2n).sim()
	if (torec) imap = imap.sub(ln2)
	else imap = imap.add(ln2)
	realp = realp.mul(1n, 2n, 0n, 1n) //.rou(prec)
      }
      realp = realp.sub(1n, 1n, 0n, 1n).div(realp.add(1n, 1n, 0n, 1n)).sim()
      var n = 0n
      var realp2 = realp.intrpow(2n) //.rou(prec)
      out = out.add(realp)
      while (n < count) {
	n += 1n
	realp = realp.mul(realp2).rou(prec)
	const tempr = realp.dr 
	realp.dr *= 2n*n+1n
	out = out.add(realp) //.rou(prec)
	realp.dr = tempr
      }
      if (torec) out.sr = true
      realp = out.mul(2n, 1n, 0n, 1n)
   }
   return realp.add(imap)
}

var exp = function exp(frac1, count, prec) {
   var frac = frac1
   //var exp2 = false
   var tempe = false
   var pi2 = false
   var out = newFraction(1n, 1n, 0n, 1n)
   var out1 = newFraction(1n, 1n, 0n, 1n)
   if (frac1.ni) {
      while (!comparereal(7n, 1n, frac.ni, frac.di)) { // faster convergence
	if (!pi2) pi2 = pi.rou(prec).mul(0n, 1n, 2n, 1n)
	if (frac.si) frac = frac.add(pi2)
	else frac = frac.sub(pi2)
      }
   }
   while (!comparereal(1n, 1n, frac.nr, frac.dr)) {
      //if (!exp2) exp2 = frac.sr ? newFraction(2n, 1n, 0n, 1n).exp(count, prec).rec() : newFraction(2n, 1n, 0n, 1n).exp(count, prec)
      var tempe = tempe ? tempe : e //.rou(prec)
      out = out.mul(tempe).rou(prec**2n)
      frac = frac.sr ? frac.add(1n, 1n, 0n, 1n) : frac.sub(1n, 1n, 0n, 1n)
   }
   var num = newFraction(1n, 1n, 0n, 1n)
   var den = 1n
   var n = 0n
   while (n < count) {
      n += 1n
      num = num.mul(frac).rou(prec)
      den *= n
      out1 = out1.add(num.div(den, 1n, 0n, 1n))
   }
   out = out1.mul(out)
   return out //.rou(prec)
}

var pow = function pow(frac1, frac2, count, prec) {
   return frac1.ln(count, prec).mul(frac2).rou(prec).exp(count, prec)
}

var asin = function asin(frac, count, prec) {
   return frac.mul(0n, 1n, 1n, 1n).add(newFraction(1n, 1n, 0n, 1n).sub(frac.intrpow(2n)).sqrt(prec)).ln(count, prec).mul(0n, 1n, -1n, 1n)
}

var acos = function acos(frac, count, prec) {
   return frac.add(newFraction(-1n, 1n, 0n, 1n).add(frac.intrpow(2n)).sqrt(prec)).ln(count, prec).mul(0n, 1n, -1n, 1n)
}

var sin = function sin(frac, count, prec) {
   var expt = frac.mul(0n, 1n, 1n, 1n).exp(count, prec).rou(prec)
   return expt.sub(expt.rec()).mul(0n, 1n, -1n, 2n).rou(prec)
}

var cos = function cos(frac, count, prec) {
   var expt = frac.mul(0n, 1n, 1n, 1n).exp(count, prec).rou(prec)
   return expt.add(expt.rec()).mul(1n, 2n, 0n, 1n).rou(prec)
}

var tan = function tan(frac, count, prec) {
   var expt = frac.mul(0n, 1n, 1n, 1n).exp(count, prec).rou(prec)
   var exptr = expt.rec()
   return expt.sub(exptr).div(expt.add(exptr)).mul(0n, 1n, -1n, 1n).rou(prec)
}

var sinh = function sinh(frac, count, prec) {
   var expt = frac.exp(count, prec).rou(prec)
   return expt.sub(expt.rec()).mul(1n, 2n, 0n, 1n).rou(prec)
}

var cosh = function cosh(frac, count, prec) {
   var expt = frac.exp(count, prec).rou(prec)
   return expt.add(expt.rec()).mul(1n, 2n, 0n, 1n).rou(prec)
}

var tanh = function cosh(frac, count, prec) {
   var expt = frac.mul(2n, 1n, 0n, 1n).exp(count, prec).rou(prec)
   return expt.sub(1n, 1n, 0n, 1n).div(expt.add(1n, 1n, 0n, 1n)).rou(prec)
}

var asinh = function asinh(frac, count, prec) {
   var frac2 = frac.intrpow(2n).add(1n, 1n, 0n, 1n) // 1+z²
   return frac.add(frac2.abs(prec).sqrt(prec).mul(frac2.arg(count, prec).mul(0n, 1n, 1n, 2n).exp(count, prec))).ln(count, prec)
}

var acosh = function acosh(frac, count, prec) {
   var frac2 = frac.intrpow(2n).sub(1n, 1n, 0n, 1n)
   return frac.add(frac2.abs(prec).sqrt(prec).mul(frac2.arg(count, prec).mul(0n, 1n, 1n, 2n).exp(count, prec))).ln(count, prec)
}

var atanh = function atanh(frac, count, prec) {
   return frac.add(1n, 1n, 0n, 1n).ln(count, prec).sub(newFraction(1n, 1n, 0n, 1n).sub(frac).ln(count, prec)).mul(1n, 2n, 0n, 1n).rou(prec)
}

var fact = function fact(frac1, count, prec) {
   var frac = frac1.sim()
     
}
