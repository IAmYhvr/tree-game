//Compressed with UglifyJS 3 https://skalman.github.io/UglifyJS-online/
!function(r){"use strict";var e={rounding:4,maxArrow:1e3,debug:0},n="[OmegaNumError] ",t=n+"Invalid argument: ",i=/^[-\+]*(Infinity|NaN|(10(\^+|\{[1-9]\d*\})|\(10(\^+|\{[1-9]\d*\})\)\^[1-9]\d* )*(([1-9]\d*(\.\d*)?)?([Ee][-\+]*))*(0|[1-9]\d*(\.\d*)?))$/,a=Math.log10(9007199254740991),o={},u={};o.absoluteValue=o.abs=function(){var r=this.clone();return r.sign=1,r},u.absoluteValue=u.abs=function(r){return new e(r).abs()},o.negate=o.neg=function(){var r=this.clone();return r.sign=-1*r.sign,r},u.negate=u.neg=function(r){return new e(r).neg()},o.compareTo=o.cmp=function(r){if(r=new e(r),isNaN(this.array[0])||isNaN(r.array[0]))return NaN;if(this.array[0]==1/0&&r.array[0]!=1/0)return this.sign;if(this.array[0]!=1/0&&r.array[0]==1/0)return-r.sign;if(1==this.array.length&&0===this.array[0]&&1==r.array.length&&0===r.array[0])return 0;if(this.sign!=r.sign)return this.sign;var n,t=this.sign;if(this.array.length>r.array.length)n=1;else if(this.array.length<r.array.length)n=-1;else{for(var i=this.array.length-1;i>=0;--i){if(this.array[i]>r.array[i]){n=1;break}if(this.array[i]<r.array[i]){n=-1;break}}n=n||0}return n*t},u.compare=u.cmp=function(r,n){return new e(r).cmp(n)},o.greaterThan=o.gt=function(r){return this.cmp(r)>0},u.greaterThan=u.gt=function(r,n){return new e(r).gt(n)},o.greaterThanOrEqualTo=o.gte=function(r){return this.cmp(r)>=0},u.greaterThanOrEqualTo=u.gte=function(r,n){return new e(r).gte(n)},o.lessThan=o.lt=function(r){return this.cmp(r)<0},u.lessThan=u.lt=function(r,n){return new e(r).lt(n)},o.lessThanOrEqualTo=o.lte=function(r){return this.cmp(r)<=0},u.lessThanOrEqualTo=u.lte=function(r,n){return new e(r).lte(n)},o.equalsTo=o.equal=o.eq=function(r){return 0===this.cmp(r)},u.equalsTo=u.equal=u.eq=function(r,n){return new e(r).eq(n)},o.minimum=o.min=function(r){return this.lt(r)?this.clone():new e(r)},u.minimum=u.min=function(r,n){return new e(r).min(n)},o.maximum=o.max=function(r){return this.gt(r)?this.clone():new e(r)},u.maximum=u.max=function(r,n){return new e(r).max(n)},o.isPositive=o.ispos=function(){return this.gt(0)},u.isPositive=u.ispos=function(r){return new e(r).ispos()},o.isNegative=o.isneg=function(){return this.lt(0)},u.isNegative=u.isneg=function(r){return new e(r).isneg()},o.isNaN=function(){return isNaN(this.array[0])},u.isNaN=function(r){return new e(r).isNaN()},o.isFinite=function(){return isFinite(this.array[0])},u.isFinite=function(r){return new e(r).isFinite()},o.isInfinite=function(){return this.array[0]==1/0},u.isInfinite=function(r){return new e(r).isInfinite()},o.isInteger=o.isint=function(){return-1==this.sign?this.abs().isint():!!this.gt(9007199254740991)||Number.isInteger(this.toNumber())},u.isInteger=u.isint=function(r){return new e(r).isint()},o.floor=function(){return this.isInteger()?this.clone():new e(Math.floor(this.toNumber()))},u.floor=function(r){return new e(r).floor()},o.ceiling=o.ceil=function(){return this.isInteger()?this.clone():new e(Math.ceil(this.toNumber()))},u.ceiling=u.ceil=function(r){return new e(r).ceil()},o.round=function(){return this.isInteger()?this.clone():new e(Math.round(this.toNumber()))},u.round=function(r){return new e(r).round()},o.plus=o.add=function(r){var n=this.clone();if(r=new e(r),e.debug>=e.NORMAL&&console.log(this+"+"+r),-1==n.sign)return n.neg().add(r.neg()).neg();if(-1==r.sign)return n.sub(r.neg());if(n.eq(0))return r;if(r.eq(0))return n;if(n.isNaN()||r.isNaN()||n.isInfinite()&&r.isInfinite()&&n.eq(r.neg()))return new e(NaN);if(n.isInfinite())return n;if(r.isInfinite())return r;var t,i=n.min(r),a=n.max(r);if(a.gt("e9007199254740991")||a.div(i).gt(9007199254740991))t=a;else if(a.array[1]){if(1==a.array[1]){var o=i.array[1]?i.array[0]:Math.log10(i.array[0]);t=new e([o+Math.log10(Math.pow(10,a.array[0]-o)+1),1])}}else t=new e(n.toNumber()+r.toNumber());return i=a=null,t},u.plus=u.add=function(r,n){return new e(r).add(n)},o.minus=o.sub=function(r){var n=this.clone();if(r=new e(r),e.debug>=e.NORMAL&&console.log(n+"-"+r),-1==n.sign)return n.neg().sub(r.neg()).neg();if(-1==r.sign)return n.add(r.neg());if(n.eq(r))return new e(0);if(r.eq(0))return n;if(n.isNaN()||r.isNaN()||n.isInfinite()&&r.isInfinite())return new e(NaN);if(n.isInfinite())return n;if(r.isInfinite())return r.neg();var t,i=n.min(r),a=n.max(r),o=r.gt(n);if(a.gt("e9007199254740991")||a.div(i).gt(9007199254740991))t=a,t=o?t.neg():t;else if(a.array[1]){if(1==a.array[1]){var u=i.array[1]?i.array[0]:Math.log10(i.array[0]);t=new e([u+Math.log10(Math.pow(10,a.array[0]-u)-1),1]),t=o?t.neg():t}}else t=new e(n.toNumber()-r.toNumber());return i=a=null,t},u.minus=u.sub=function(r,n){return new e(r).sub(n)},o.times=o.mul=function(r){var n=this.clone();if(r=new e(r),e.debug>=e.NORMAL&&console.log(n+"*"+r),n.sign*r.sign==-1)return n.abs().mul(r.abs()).neg();if(-1==n.sign)return n.abs().mul(r.abs());if(n.isNaN()||r.isNaN()||n.eq(0)&&r.isInfinite()||n.isInfinite()&&r.abs().eq(0))return new e(NaN);if(r.eq(0))return new e(0);if(r.eq(1))return n.clone();if(n.isInfinite())return n;if(r.isInfinite())return r;if(n.max(r).gt("ee9007199254740991"))return n.max(r);var t=n*r;return t<=9007199254740991?new e(t):e.pow(10,n.log10().add(r.log10()))},u.times=u.mul=function(r,n){return new e(r).mul(n)},o.divide=o.div=function(r){var n=this.clone();if(r=new e(r),e.debug>=e.NORMAL&&console.log(n+"/"+r),n.sign*r.sign==-1)return n.abs().div(r.abs()).neg();if(-1==n.sign)return n.abs().div(r.abs());if(n.isNaN()||r.isNaN()||n.isInfinite()&&r.isInfinite()||n.eq(0)&&r.eq(0))return new e(NaN);if(r.eq(0))return new e(1/0);if(r.eq(1))return n.clone();if(n.eq(r))return new e(1);if(n.isInfinite())return n;if(r.isInfinite())return new e(0);if(n.max(r).gt("ee9007199254740991"))return n.gt(r)?n.clone():new e(0);var t=n/r;if(t<=9007199254740991)return new e(t);var i=e.pow(10,n.log10().sub(r.log10())),a=i.floor();return i.sub(a).lt(new e(1e-9))?a:i},u.divide=u.div=function(r,n){return new e(r).div(n)},o.reciprocate=o.rec=function(){return e.debug>=e.NORMAL&&console.log(this+"^-1"),this.isNaN()||this.eq(0)?new e(NaN):this.abs().gt("2e323")?new e(0):new e(1/this)},u.reciprocate=u.rec=function(r){return new e(r).rec()},o.modular=o.mod=function(r){return(r=new e(r)).eq(0)?new e(0):this.sign*r.sign<0?this.abs().mod(r.abs()).neg():this.sign<0?this.abs().mod(r.abs()):this.sub(this.div(r).floor().mul(r))},u.modular=u.mod=function(r,n){return new e(r).mod(n)};o.gamma=function(){var r=this.clone();if(r.gt("10^^9007199254740991"))return r;if(r.gt("e9007199254740991"))return e.exp(r);if(r.gt(9007199254740991))return e.exp(e.mul(r,e.ln(r).sub(1)));var n=r.array[0];if(n>1){if(n<24)return new e(function(r){if(!isFinite(r))return r;if(r<-50)return r==Math.trunc(r)?Number.NEGATIVE_INFINITY:0;for(var e=1;r<10;)e*=r,++r;var n=.9189385332046727;n+=(.5+(r-=1))*Math.log(r),n-=r;var t=r*r,i=r;return n+=1/(12*i),n+=1/(360*(i*=t)),n+=1/(1260*(i*=i*t)),n+=1/(1680*(i*=t)),n+=1/(1188*(i*=t)),n+=691/(360360*(i*=t)),n+=7/(1092*(i*=t)),n+=3617/(122400*(i*=t)),Math.exp(n)/e}(r.sign*n));var t=n-1,i=.9189385332046727;i+=(t+.5)*Math.log(t);var a=t*t,o=t,u=12*o,s=1/u,f=(i-=t)+s;if(f==i)return e.exp(i);if((f=(i=f)-(s=1/(u=360*(o*=a))))==i)return e.exp(i);i=f;var l=1/(u=1260*(o*=a));return i+=l,i-=l=1/(u=1680*(o*=a)),e.exp(i)}return this.rec()},u.gamma=function(r){return new e(r).gamma()},u.factorials=[1,1,2,6,24,120,720,5040,40320,362880,3628800,39916800,479001600,6227020800,87178291200,1307674368e3,20922789888e3,355687428096e3,6402373705728e3,0x1b02b9306890000,243290200817664e4,5109094217170944e4,0x3ceea4c2b3e0d80000,2.585201673888498e22,6.204484017332394e23,1.5511210043330986e25,4.0329146112660565e26,1.0888869450418352e28,3.0488834461171387e29,8.841761993739702e30,2.6525285981219107e32,8.222838654177922e33,2.631308369336935e35,8.683317618811886e36,2.9523279903960416e38,1.0333147966386145e40,3.7199332678990125e41,1.3763753091226346e43,5.230226174666011e44,2.0397882081197444e46,8.159152832478977e47,3.345252661316381e49,1.40500611775288e51,6.041526306337383e52,2.658271574788449e54,1.1962222086548019e56,5.502622159812089e57,2.5862324151116818e59,1.2413915592536073e61,6.082818640342675e62,3.0414093201713376e64,1.5511187532873822e66,8.065817517094388e67,4.2748832840600255e69,2.308436973392414e71,1.2696403353658276e73,7.109985878048635e74,4.0526919504877214e76,2.3505613312828785e78,1.3868311854568984e80,8.32098711274139e81,5.075802138772248e83,3.146997326038794e85,1.98260831540444e87,1.2688693218588417e89,8.247650592082472e90,5.443449390774431e92,3.647111091818868e94,2.4800355424368305e96,1.711224524281413e98,1.1978571669969892e100,8.504785885678623e101,6.1234458376886085e103,4.4701154615126844e105,3.307885441519386e107,2.48091408113954e109,1.8854947016660504e111,1.4518309202828587e113,1.1324281178206297e115,8.946182130782976e116,7.156945704626381e118,5.797126020747368e120,4.753643337012842e122,3.945523969720659e124,3.314240134565353e126,2.81710411438055e128,2.4227095383672734e130,2.107757298379528e132,1.8548264225739844e134,1.650795516090846e136,1.4857159644817615e138,1.352001527678403e140,1.2438414054641308e142,1.1567725070816416e144,1.087366156656743e146,1.032997848823906e148,9.916779348709496e149,9.619275968248212e151,9.426890448883248e153,9.332621544394415e155,9.332621544394415e157,9.42594775983836e159,9.614466715035127e161,9.90290071648618e163,1.0299016745145628e166,1.081396758240291e168,1.1462805637347084e170,1.226520203196138e172,1.324641819451829e174,1.4438595832024937e176,1.588245541522743e178,1.7629525510902446e180,1.974506857221074e182,2.2311927486598138e184,2.5435597334721877e186,2.925093693493016e188,3.393108684451898e190,3.969937160808721e192,4.684525849754291e194,5.574585761207606e196,6.689502913449127e198,8.094298525273444e200,9.875044200833601e202,1.214630436702533e205,1.506141741511141e207,1.882677176888926e209,2.372173242880047e211,3.0126600184576594e213,3.856204823625804e215,4.974504222477287e217,6.466855489220474e219,8.47158069087882e221,1.1182486511960043e224,1.4872707060906857e226,1.9929427461615188e228,2.6904727073180504e230,3.659042881952549e232,5.012888748274992e234,6.917786472619489e236,9.615723196941089e238,1.3462012475717526e241,1.898143759076171e243,2.695364137888163e245,3.854370717180073e247,5.5502938327393044e249,8.047926057471992e251,1.1749972043909107e254,1.727245890454639e256,2.5563239178728654e258,3.80892263763057e260,5.713383956445855e262,8.62720977423324e264,1.3113358856834524e267,2.0063439050956823e269,3.0897696138473508e271,4.789142901463394e273,7.471062926282894e275,1.1729568794264145e278,1.853271869493735e280,2.9467022724950384e282,4.7147236359920616e284,7.590705053947219e286,1.2296942187394494e289,2.0044015765453026e291,3.287218585534296e293,5.423910666131589e295,9.003691705778438e297,1.503616514864999e300,2.5260757449731984e302,4.269068009004705e304,7.257415615307999e306],o.factorial=o.fact=function(){var r=this.clone(),n=e.factorials;if(r.lt(0)||!r.isint())return r.add(1).gamma();if(r.lte(170))return new e(n[+r]);var t=+r;return t<500&&(t+=163879/209018880*Math.pow(t,5)),t<1e3&&(t+=-571/2488320*Math.pow(t,4)),t<5e4&&(t+=-139/51840*Math.pow(t,3)),t<1e7&&(t+=1/288*Math.pow(t,2)),t<1e20&&(t+=1/12*t),r.div(new e(Math.E)).pow(r).mul(r.mul(new e(Math.PI)).mul(2).sqrt()).times(1)},u.factorial=u.fact=function(r){return new e(r).fact()},o.toPower=o.pow=function(r){if(r=new e(r),e.debug>=e.NORMAL&&console.log(this+"^"+r),r.eq(0))return new e(1);if(r.eq(1))return this.clone();if(r.lt(0))return this.pow(r.neg()).rec();if(this.lt(0)&&r.isint())return r.mod(2).lt(1)?this.abs().pow(r):this.abs().pow(r).neg();if(this.lt(0))return new e(NaN);if(this.eq(1))return new e(1);if(this.eq(0))return new e(0);if(this.max(r).gt("10^^9007199254740991"))return this.max(r);if(this.eq(10))return r.gt(0)?(r.array[1]=r.array[1]+1||1,r.standardize(),r):new e(Math.pow(10,r));if(r.lt(1))return this.root(r.rec());var n=Math.pow(this,r);return n<=9007199254740991?new e(n):e.pow(10,this.log10().mul(r))},u.toPower=u.pow=function(r,n){return new e(r).pow(n)},o.exponential=o.exp=function(){return e.pow(Math.E,this)},u.exponential=u.exp=function(r){return e.pow(Math.E,r)},o.squareRoot=o.sqrt=function(){return this.root(2)},u.squareRoot=u.sqrt=function(r){return new e(r).root(2)},o.cubeRoot=o.cbrt=function(){return this.root(3)},u.cubeRoot=u.cbrt=function(r){return new e(r).root(3)},o.root=function(r){return r=new e(r),e.debug>=e.NORMAL&&console.log(this+"root"+r),r.eq(1)?this.clone():r.lt(0)?this.root(r.neg()).rec():r.lt(1)?this.pow(r.rec()):this.lt(0)&&r.isint()&&r.mod(2).eq(1)?this.neg().root(r).neg():this.lt(0)?new e(NaN):this.eq(1)?new e(1):this.eq(0)?new e(0):this.max(r).gt("10^^9007199254740991")?this.gt(r)?this.clone():new e(0):e.pow(10,this.log10().div(r))},u.root=function(r,n){return new e(r).root(n)},o.generalLogarithm=o.log10=function(){var r=this.clone();return e.debug>=e.NORMAL&&console.log("log"+this),r.lt(0)?new e(NaN):r.eq(0)?new e(-1/0):r.lt(9007199254740991)?new e(Math.log10(r.toNumber())):r.isFinite()?r.gt("10^^9007199254740991")?r:(r.array[1]--,r.standardize()):r},u.generalLogarithm=u.log10=function(r){return new e(r).log10()},o.logarithm=o.logBase=function(r){return void 0===r&&(r=Math.E),this.log10().div(e.log10(r))},u.logarithm=u.logBase=function(r,n){return new e(r).logBase(n)},o.naturalLogarithm=o.log=o.ln=function(){return this.logBase(Math.E)},u.naturalLogarithm=u.log=u.ln=function(r){return new e(r).ln()};function s(r){if(!r||"object"!=typeof r)throw Error(n+"Object expected");var e,i,a,o=["rounding",0,8,"maxArrow",1,Number.MAX_SAFE_INTEGER,"debug",0,2];for(e=0;e<o.length;e+=3)if(void 0!==(a=r[i=o[e]])){if(!(Math.floor(a)===a&&a>=o[e+1]&&a<=o[e+2]))throw Error(t+i+": "+a);this[i]=a}return this}o.lambertw=function(){var r=this.clone();if(r.isNaN())return r;if(r.lt(-.3678794411710499))throw Error("lambertw is unimplemented for results less than -1, sorry!");return r.gt("10^^9007199254740991")?r:r.gt("ee9007199254740991")?(r.array[1]--,r):r.gt(9007199254740991)?function(r,n){var t,i,a,o;if(void 0===n&&(n=1e-10),!(r=new e(r)).isFinite())return r;if(0===r)return r;if(1===r)return.5671432904097838;t=e.ln(r);for(var u=0;u<100;++u){if(i=e.exp(-t),a=t.sub(r.mul(i)),o=t.sub(a.div(t.add(1).sub(t.add(2).mul(a).div(e.mul(2,t).add(2))))),e.abs(o.sub(t)).lt(e.abs(o).mul(n)))return o;t=o}throw Error("Iteration failed to converge: "+r)}(r):new e(function(r,e){var n,t;if(void 0===e&&(e=1e-10),!Number.isFinite(r))return r;if(0===r)return r;if(1===r)return.5671432904097838;n=r<10?0:Math.log(r)-Math.log(Math.log(r));for(var i=0;i<100;++i){if(t=(r*Math.exp(-n)+n*n)/(n+1),Math.abs(t-n)<e*Math.abs(t))return t;n=t}throw Error("Iteration failed to converge: "+r)}(r.sign*r.array[0]))},u.lambertw=function(r){return new e(r).lambertw()},o.tetrate=o.tetr=function(r){var n=this.clone();if(r=new e(r),e.debug>=e.NORMAL&&console.log(n+"^^"+r),r.isInfinite()&&r.sign>0){if(this.gt(Math.pow(Math.E,1/Math.E)))return new e(1/0);var t=n.ln().neg();return t.lambertw().div(t)}if(r.lte(-2))return new e(NaN);if(n.eq(0))return r.eq(0)?new e(NaN):r.mod(2).eq(0)?new e(0):new e(1);if(n.eq(1))return r.eq(-1)?new e(NaN):new e(1);if(r.eq(-1))return new e(0);if(r.eq(0))return new e(1);if(r.eq(1))return n;if(r.eq(2))return n.pow(n);if(n.eq(2)){if(r.eq(3))return new e(16);if(r.eq(4))return new e(65536)}if((f=n.max(r)).gt("10^^^9007199254740991"))return f;if(r.gt(9007199254740991)){var i=n.slog(10).add(r);return i.array[2]=(r.array[2]||0)+1,i.standardize(),i}for(var a=r.toNumber(),o=Math.floor(a),u=n.pow(a-o),s=0,f=new e("e9007199254740991");0!==o&&u.lt(f)&&s<100;++s)o>0?(u=n.pow(u),--o):u=u.logBase(n);return 100==s&&(o=0),u.array[1]=u.array[1]+o||o,u.standardize(),u},u.tetrate=u.tetr=function(r,n){return new e(r).tetr(n)},o.ssqrt=o.ssrt=function(){var r=this.clone();if(r.lt(Math.exp(-1/Math.E)))return new e(NaN);if(!r.isFinite())return r;if(r.gt("10^^9007199254740991"))return r;if(r.gt("ee9007199254740991"))return r.array[1]--,r;var n=r.ln();return n.div(n.lambertw())},u.ssqrt=u.ssrt=function(r){return new e(r).ssqrt()},o.slog=function(r){void 0===r&&(r=10);var n=new e(this);if(r=new e(r),n.isNaN()||r.isNaN()||n.isInfinite()&&r.isInfinite())return new e(NaN);if(n.isInfinite())return n;if(r.isInfinite())return new e(0);if(n.lt(0))return new e(-1);if(n.eq(1))return new e(0);if(n.eq(r))return new e(1);if(r.lt(Math.exp(1/Math.E))){var t=e.tetr(r,1/0);if(n.eq(t))return new e(1/0);if(n.gt(t))return new e(NaN)}if(n.max(r).gt("10^^^9007199254740991"))return n.gt(r)?n:new e(0);if(n.max(r).gt("10^^9007199254740991"))return n.gt(r)?(n.array[2]--,n.standardize(),n.sub(n.array[1])):new e(0);var i=0,a=(n.array[1]||0)-(r.array[1]||0);if(a>3){var o=a-3;i+=o,n.array[1]=n.array[1]-o}for(var u=0;u<100;++u)if(n.lt(0))n=e.pow(r,n),--i;else{if(n.lte(1))return new e(i+n.toNumber()-1);++i,n=e.logBase(n,r)}return n.gt(10)?new e(i):void 0},u.slog=function(r,n){return new e(r).slog(n)},o.pentate=o.pent=function(r){return this.arrow(3)(r)},u.pentate=u.pent=function(r,n){return e.arrow(r,3,n)},o.arrow=function(r){var n=this.clone();return!(r=new e(r)).isint()||r.lt(0)?function(r){return new e(NaN)}:r.eq(0)?function(r){return n.mul(r)}:r.eq(1)?function(r){return n.pow(r)}:r.eq(2)?function(r){return n.tetr(r)}:function(t){if(t=new e(t),e.debug>=e.NORMAL&&console.log(n+"{"+r+"}"+t),t.lt(0))return new e(NaN);if(t.eq(0))return new e(1);if(t.eq(1))return n.clone();if(r.gte(e.maxArrow))return console.warn("Number too large to reasonably handle it: tried to "+r.add(2)+"-ate."),new e(1/0);if(t.eq(2))return n.arrow(r-1)(n);if(n.max(t).gt("10{"+r.add(1)+"}9007199254740991"))return n.max(t);var i;if(t.gt(9007199254740991)){n.gt("10{"+r+"}9007199254740991")?((i=n.clone()).array[r]--,i.standardize()):i=n.gt("10{"+r.sub(1)+"}9007199254740991")?new e(i.array[r]):new e(0);var a=i.add(t);return a.array[r]=(t.array[r]||0)+1,a.standardize(),a}var o=t.toNumber(),u=Math.floor(o);i=n.arrow(r.sub(1))(o-u);for(var s=0,f=new e("10{"+r.sub(1)+"}9007199254740991");0!==u&&i.lt(f)&&s<100;++s)u>0&&(i=n.arrow(r.sub(1))(i),--u);return 100==s&&(u=0),i.array[r.sub(1)]=i.array[r.sub(1)]+u||u,i.standardize(),i}},o.chain=function(r,e){return this.arrow(e)(r)},u.arrow=function(r,n,t){return new e(r).arrow(n)(t)},u.chain=function(r,n,t){return new e(r).arrow(t)(n)},u.hyper=function(r){return(r=new e(r)).eq(0)?function(r,n){return new e(n).eq(0)?new e(r):new e(r).add(1)}:r.eq(1)?function(r,n){return e.add(r,n)}:function(n,t){return new e(n).arrow(r.sub(2))(t)}},u.affordGeometricSeries=function(r,n,t,i){r=new e(r),n=new e(n),t=new e(t);var a=n.mul(t.pow(i));return e.floor(r.div(a).mul(t.sub(1)).add(1).log10().div(t.log10()))},u.affordArithmeticSeries=function(r,n,t,i){r=new e(r),n=new e(n),t=new e(t),i=new e(i);var a=n.add(i.mul(t)).sub(t.div(2)),o=a.pow(2);return a.neg().add(o.add(t.mul(r).mul(2)).sqrt()).div(t).floor()},u.sumGeometricSeries=function(r,n,t,i){return n=new e(n),t=new e(t),n.mul(t.pow(i)).mul(e.sub(1,t.pow(r))).div(e.sub(1,t))},u.sumArithmeticSeries=function(r,n,t,i){r=new e(r),n=new e(n),i=new e(i);var a=n.add(i.mul(t));return r.div(2).mul(a.mul(2).plus(r.sub(1).mul(t)))},u.choose=function(r,n){return new e(r).factorial().div(new e(n).factorial().mul(new e(r).sub(new e(n)).factorial()))},o.choose=function(r){return e.choose(this,r)},o.standardize=function(){var r,n=this;e.debug>=e.ALL&&console.log(n.toString()),n.array&&n.array.length||(n.array=[0]),1!=n.sign&&-1!=n.sign&&("number"!=typeof n.sign&&(n.sign=Number(n.sign)),n.sign=n.sign<0?-1:1);for(var t=n.array.length,i=0;i<t;i++){var o=n.array[i];if(null!=o){if(isNaN(o))return n.array=[NaN],n;if(!isFinite(o))return n.array=[1/0],n}else n.array[i]=0}do{for(e.debug>=e.ALL&&console.log(n.toString()),r=!1;n.array.length&&0===n.array[n.array.length-1];)n.array.pop(),r=!0;for(n.array[0]>9007199254740991&&(n.array[1]=(n.array[1]||0)+1,n.array[0]=Math.log10(n.array[0]),r=!0);n.array[0]<a&&n.array[1];)n.array[0]=Math.pow(10,n.array[0]),n.array[1]--,r=!0;if(n.array.length>2&&!n.array[1]){for(i=2;!n.array[i];++i)continue;n.array[i-1]=n.array[0],n.array[0]=1,n.array[i]--,r=!0}for(t=n.array.length,i=1;i<t;++i)if(n.array[i]>9007199254740991){n.array[i+1]=(n.array[i+1]||0)+1,n.array[0]=n.array[i]+1;for(var u=1;u<=i;++u)n.array[u]=0;r=!0}}while(r);return n.array.length||(n.array=[0]),n},o.toNumber=function(){return-1==this.sign?-1*this.abs():this.array.length>=2||this.array[1]>=2||1==this.array[1]&&this.array[0]>Math.log10(Number.MAX_VALUE)?1/0:1==this.array[1]?Math.pow(10,this.array[0]):this.array[0]},o.toString=function(){if(-1==this.sign)return"-"+this.abs();if(isNaN(this.array[0]))return"NaN";if(!isFinite(this.array[0]))return"Infinity";var r="";if(this.array.length>=2)for(var e=2;e<this.array.length;++e){var n=e>=5?"{"+e+"}":"^".repeat(e);this.array[e]>1?r="(10"+n+")^"+this.array[e]+" "+r:1==this.array[e]&&(r="10"+n+r)}return this.array[1]?this.array[1]<3?r+="e".repeat(this.array[1]-1)+Math.pow(10,this.array[0]-Math.floor(this.array[0]))+"e"+Math.floor(this.array[0]):this.array[1]<8?r+="e".repeat(this.array[1])+this.array[0]:r+="(10^)^"+this.array[1]+" "+this.array[0]:r+=String(this.toNumber()),r},o.toJSON=function(){return{array:this.array.slice(0),sign:this.sign}},o.toHyperE=function(){if(-1==this.sign)return"-"+this.abs().toHyperE();if(isNaN(this.array[0]))return"NaN";if(!isFinite(this.array[0]))return"Infinity";if(this.lt(9007199254740991))return String(this.array[0]);if(this.lt("e9007199254740991"))return"E"+this.array[0];for(var r="E"+this.array[0]+"#"+this.array[1],e=2;e<this.array.length;++e)r+="#"+(this.array[e]+1);return r},u.fromNumber=function(r){if("number"!=typeof r)throw Error(t+"Expected Number");var n=new e;return n.array[0]=Math.abs(r),n.sign=r<0?-1:1,n.standardize(),n},u.fromString=function(r){if("string"!=typeof r)throw Error(t+"Expected String");var o=!1;if("string"==typeof r&&("["==r[0]||"{"==r[0]))try{JSON.parse(r)}finally{o=!0}if(o)return e.fromJSON(r);var u=new e;if(u.array=[0],!i.test(r))return console.warn(n+"Malformed input: "+r),u.array=[NaN],u;var s=!1;if("-"==r[0]||"+"==r[0]){var f=r.search(/[^-\+]/);s=r.substring(0,f).match(/-/g).length%2==1,r=r.substring(f)}if("NaN"==r)u.array=[NaN];else if("Infinity"==r)u.array=[1/0];else{for(var l,h,g,c,w;r&&/^\(?10[\^\{]/.test(r);){var y;if("("==r[0]&&(r=r.substring(1)),"^"==r[2]?(y=l=r.substring(2).search(/[^\^]/),h=l+2):(l=r.indexOf("}"),y=Number(r.substring(3,l)),h=l+1),y>=e.maxArrow){console.warn("Number too large to reasonably handle it: tried to "+y.add(2)+"-ate."),u.array=[1/0];break}if(")"==(r=r.substring(h))[0]?(l=r.indexOf(" "),g=Number(r.substring(2,l)),r=r.substring(l+1)):g=1,1==y)u.array[1]=(u.array[1]||0)+g;else if(2==y)l=u.array[1]||0,(h=u.array[0]||0)>=1e10&&++l,h>=10&&++l,u.array[0]=l,u.array[1]=0,u.array[2]=(u.array[2]||0)+g;else{for(l=u.array[y-1]||0,(h=u.array[y-2]||0)>=10&&++l,w=1;w<y;++w)u.array[w]=0;u.array[0]=l,u.array[y]=(u.array[y]||0)+g}}for(l=r.split(/[Ee]/),h=[u.array[0],0],g=1,w=l.length-1;w>=0;--w)c=l[w]?Number(l[w]):1,h[0]<a&&0===h[1]?h[0]=Math.pow(10,g*h[0]):-1==g?(0===h[1]?h[0]=Math.pow(10,g*h[0]):1==h[1]&&h[0]<=Math.log10(Number.MAX_VALUE)?h[0]=Math.pow(10,g*Math.pow(10,h[0])):h[0]=0,h[1]=0):h[1]++,0===h[1]?h[0]*=Number(c):1==h[1]?h[0]+=Math.log10(Number(c)):2==h[1]&&h[0]<a+Math.log10(Math.log10(Number(c)))&&(h[0]+=Math.log10(1+Math.pow(10,Math.log10(Math.log10(Number(c)))-h[0]))),h[0]<a&&h[1]?(h[0]=Math.pow(10,h[0]),h[1]--):h[0]>9007199254740991&&(h[0]=Math.log10(h[0]),h[1]++);u.array[0]=h[0],u.array[1]=(u.array[1]||0)+h[1]}return s&&(u.sign*=-1),u.standardize(),u},u.fromArray=function(r,n){var i,a;if(r instanceof Array&&(void 0===n||"number"==typeof n))i=r,a=n;else{if(!(n instanceof Array&&"number"==typeof r))throw Error(t+"Expected an Array [and Boolean]");i=n,a=r}var o=new e;return o.array=i.slice(0),o.sign=a?Number(a):1,o.standardize(),o},u.fromObject=function(r){if("object"!=typeof r)throw Error(t+"Expected Object");if(null===r)return new e(0);if(r instanceof Array)return e.fromArray(r);if(r instanceof e)return new e(r);if(!(r.array instanceof Array))throw Error(t+"Expected that property 'array' exists");if(void 0!==r.sign&&"number"!=typeof r.sign)throw Error(t+"Expected that property 'sign' is Number");var n=new e;return n.array=r.array.slice(0),n.sign=Number(r.sign)||1,n.standardize(),n},u.fromJSON=function(r){if("string"!=typeof r)throw Error(t+"Expected String");var n,i;try{n=JSON.parse(r)}catch(r){throw n=null,r}finally{i=e.fromObject(n)}return n=null,i},u.fromHyperE=function(r){if("string"!=typeof r)throw Error(t+"Expected String");var i=new e;if(i.array=[0],!/^[-\+]*(0|[1-9]\d*(\.\d*)?|Infinity|NaN|E[1-9]\d*(\.\d*)?(#[1-9]\d*)*)$/.test(r))return console.warn(n+"Malformed input: "+r),i.array=[NaN],i;var a=!1;if("-"==r[0]||"+"==r[0]){var o=r.search(/[^-\+]/);a=r.substring(0,o).match(/-/g).length%2==0,r=r.substring(o)}if("NaN"==r)i.array=[NaN];else if("Infinity"==r)i.array=[1/0];else if("E"!=r[0])i.array[0]=Number(r);else if(-1==r.indexOf("#"))i.array[0]=Number(r.substring(1)),i.array[1]=1;else for(var u=r.substring(1).split("#"),s=0;s<u.length;++s){var f=Number(u[s]);s>=2&&--f,i.array[s]=f}return a&&(i.sign*=-1),i.standardize(),i},o.clone=function(){return new e(this)},(e=function r(e){var n,t,i;function a(r,e){var n=this;if(!(n instanceof a))return new a(r,e);n.constructor=a;var t,i,o=null;if("string"==typeof r&&("["==r[0]||"{"==r[0]))try{o=JSON.parse(r)}catch(r){}return"number"!=typeof r||e instanceof Array?o?t=a.fromObject(o):"string"==typeof r&&"E"==r[0]?t=a.fromHyperE(r):"string"==typeof r?t=a.fromString(r):r instanceof Array||e instanceof Array?t=a.fromArray(r,e):r instanceof a?(t=r.array.slice(0),i=r.sign):"object"==typeof r?t=a.fromObject(r):(t=[NaN],i=1):t=a.fromNumber(r),void 0===i?(n.array=t.array,n.sign=t.sign):(n.array=t,n.sign=i),n}for(var f in a.prototype=o,a.ROUND_UP=0,a.ROUND_DOWN=1,a.ROUND_CEIL=2,a.ROUND_FLOOR=3,a.ROUND_HALF_UP=4,a.ROUND_HALF_DOWN=5,a.ROUND_HALF_EVEN=6,a.ROUND_HALF_CEIL=7,a.ROUND_HALF_FLOOR=8,a.NONE=0,a.NORMAL=1,a.ALL=2,a.clone=r,a.config=a.set=s,u)u.hasOwnProperty(f)&&(a[f]=u[f]);if(void 0===e&&(e={}),e)for(i=["rounding","maxArrow","debug"],n=0;n<i.length;)e.hasOwnProperty(t=i[n++])||(e[t]=this[t]);return a.config(e),a}(e)).default=e.OmegaNum=e,"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:(r||(r="undefined"!=typeof self&&self&&self.self==self?self:Function("return this")()),r.OmegaNum=e)}(this);