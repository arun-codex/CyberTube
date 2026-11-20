var ChaiKit=(function(m){"use strict";var ve=Object.defineProperty;var ye=(m,C,L)=>C in m?ve(m,C,{enumerable:!0,configurable:!0,writable:!0,value:L}):m[C]=L;var l=(m,C,L)=>ye(m,typeof C!="symbol"?C+"":C,L);var C=Object.defineProperty,L=(a,t,e)=>t in a?C(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e,D=(a,t,e)=>L(a,typeof t!="symbol"?t+"":t,e);function Ft(a){return Number.isInteger(a)||(a=Math.round(a)),a/100}function Z(a){if(typeof a=="string"){if(a=a.trim(),a===""||isNaN(Number(a)))return 0;const t=a.split("."),e=parseInt(t[0]||"0",10);let i=0;if(t.length>1){const n=(t[1]+"00").slice(0,2);i=parseInt(n,10)}return e*100+i}return typeof a=="number"?isNaN(a)||!isFinite(a)?0:Math.round(a*100):0}function A(a,t=!1){const e=a<0,i=Math.abs(a),n=Math.floor(i/100),r=i%100,o=Pt(n);let s="";return r>0||t?s=`₹${o}.${r.toString().padStart(2,"0")}`:s=`₹${o}`,e?`-${s}`:s}function J(a){const t=Math.max(0,Math.floor(a)),e=Math.floor(t/100),i=t%100;return`${e}.${i.toString().padStart(2,"0")}`}function Pt(a){const t=a.toString();if(t.length<=3)return t;const e=t.substring(t.length-3);return`${t.substring(0,t.length-3).replace(/\B(?=(\d{2})+(?!\d))/g,",")},${e}`}const B=1e3,N=1e6,U=[{id:"cutting",name:"Cutting Chai",amountPaise:1e3,description:"A little sip of support.",icon:"cutting"},{id:"kadak",name:"Kadak Chai",amountPaise:2500,description:"Some extra energy to keep creating.",icon:"kadak"},{id:"tandoori",name:"Tandoori Chai",amountPaise:5e3,description:"A warm boost for bigger ideas.",icon:"tandoori"},{id:"premium",name:"Premium Chai",amountPaise:1e4,description:"An extra-special cup of appreciation.",icon:"premium"}];function G(a){if(typeof a!="string")return{valid:!1,error:"UPI ID must be a string."};const t=a.trim();return t?t.length<3||t.length>70?{valid:!1,error:"UPI ID must be between 3 and 70 characters long."}:/[\s\x00-\x1F\x7F]/.test(t)?{valid:!1,error:"UPI ID must not contain spaces or control characters."}:/^[a-zA-Z0-9.\-_]{2,64}@[a-zA-Z0-9.\-_]{2,32}$/.test(t)?{valid:!0}:{valid:!1,error:"Invalid UPI ID format. Expected format: username@bank (e.g. name@okhdfcbank or user@upi)."}:{valid:!1,error:"UPI ID is required."}}function tt(a,t=B,e=N){return typeof a!="number"||isNaN(a)||!isFinite(a)?{valid:!1,error:"Amount must be a valid number."}:Number.isInteger(a)?a<t?{valid:!1,error:`Amount must be at least ₹${t/100}.`}:a>e?{valid:!1,error:`Amount cannot exceed ₹${e/100}.`}:{valid:!0}:{valid:!1,error:"Amount in paise must be an integer."}}function H(a,t=100){return typeof a!="string"?"":a.replace(/[<>'"&]/g,"").replace(/[\x00-\x1F\x7F]/g,"").trim().slice(0,t)}function et(a){const t=[];if(!a)return{valid:!1,errors:["Configuration object is required."]};(!a.creatorName||typeof a.creatorName!="string"||!a.creatorName.trim())&&t.push("creatorName is required and must not be empty.");const e=G(a.upiId);!e.valid&&e.error&&t.push(e.error);const i=a.minAmountPaise??B,n=a.maxAmountPaise??N;i<=0&&t.push("minAmountPaise must be greater than 0."),n<i&&t.push("maxAmountPaise cannot be less than minAmountPaise."),a.tiers&&(!Array.isArray(a.tiers)||a.tiers.length===0?t.push("tiers must be a non-empty array of contribution tiers."):a.tiers.forEach((s,c)=>{(!s.id||typeof s.id!="string")&&t.push(`Tier at index ${c} must have a valid string id.`),(!s.name||typeof s.name!="string")&&t.push(`Tier at index ${c} must have a valid string name.`),(typeof s.amountPaise!="number"||s.amountPaise<i||s.amountPaise>n)&&t.push(`Tier '${s.name||c}' amount (₹${s.amountPaise/100}) is outside permitted bounds (₹${i/100} - ₹${n/100}).`)}));const r=["classic","dark","cream","minimal","auto"];a.theme&&!r.includes(a.theme)&&t.push(`Invalid theme '${a.theme}'. Valid themes are: ${r.join(", ")}.`);const o=["bottom-right","bottom-left","inline"];return a.position&&!o.includes(a.position)&&t.push(`Invalid position '${a.position}'. Valid positions are: ${o.join(", ")}.`),{valid:t.length===0,errors:t}}function it(a){const t=G(a.upiId);if(!t.valid)throw new Error(`Cannot build UPI URI: ${t.error}`);if(typeof a.amountPaise!="number"||isNaN(a.amountPaise)||!isFinite(a.amountPaise)||a.amountPaise<=0)throw new Error("Cannot build UPI URI: Amount must be a positive number of paise (greater than 0).");const e=a.upiId.trim(),i=a.paymentPayeeName||a.payeeName||a.creatorName;let n=H(i,60);n||(n="Creator");const r=J(a.amountPaise),o=H(a.note||`Chai for ${n}`,80),s=[`pa=${encodeURIComponent(e)}`,`pn=${encodeURIComponent(n)}`,`am=${encodeURIComponent(r)}`,"cu=INR"];return o&&s.push(`tn=${encodeURIComponent(o)}`),`upi://pay?${s.join("&")}`}function Mt(a){try{if(!a||!a.startsWith("upi://pay?"))return null;const t=a.replace("upi://pay?",""),e=new URLSearchParams(t),i=e.get("pa"),n=e.get("pn"),r=e.get("am"),o=e.get("cu"),s=e.get("tn");if(!i||!n||!r||o!=="INR")return null;const c=Number(r);return isNaN(c)||c<=0?null:{pa:i,pn:n,am:r,cu:"INR",tn:s||void 0}}catch{return null}}function at(){if(typeof window>"u"||typeof navigator>"u")return!1;const a=navigator.userAgent||navigator.vendor||"";return("ontouchstart"in window||navigator.maxTouchPoints>0)&&/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)}function nt(a){if(typeof window>"u")return{dispatched:!1,success:!1,error:"Window environment not available.",note:"UPI handoff can only be executed in a browser environment."};try{return window.location.href=a,{dispatched:!0,success:!0,note:"Dispatched upi:// intent. This does not confirm payment completion; the supporter must complete the transfer in their banking app."}}catch(t){return{dispatched:!1,success:!1,error:t instanceof Error?t.message:"Failed to launch UPI application.",note:"Failed to dispatch upi:// intent."}}}var I=(a=>(a[a.Border=-1]="Border",a[a.Data=0]="Data",a[a.Function=1]="Function",a[a.Position=2]="Position",a[a.Timing=3]="Timing",a[a.Alignment=4]="Alignment",a))(I||{});const Tt=[0,1],rt=[1,0],ot=[2,3],st=[3,2],It={L:Tt,M:rt,Q:ot,H:st},St=/^\d*$/,Lt=/^[A-Z0-9 $%*+./:-]*$/,_="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:",Y=1,q=40,ct=3,Bt=3,z=40,Nt=10,lt=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],ht=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]];class Rt{constructor(t,e,i,n){if(D(this,"size"),D(this,"mask"),D(this,"modules",[]),D(this,"types",[]),this.version=t,this.ecc=e,t<Y||t>q)throw new RangeError("Version value out of range");if(n<-1||n>7)throw new RangeError("Mask value out of range");this.size=t*4+17;const r=Array.from({length:this.size}).fill(!1);for(let s=0;s<this.size;s++)this.modules.push(r.slice()),this.types.push(r.map(()=>0));this.drawFunctionPatterns();const o=this.addEccAndInterleave(i);if(this.drawCodewords(o),n===-1){let s=1e9;for(let c=0;c<8;c++){this.applyMask(c),this.drawFormatBits(c);const h=this.getPenaltyScore();h<s&&(n=c,s=h),this.applyMask(c)}}this.mask=n,this.applyMask(n),this.drawFormatBits(n)}getModule(t,e){return t>=0&&t<this.size&&e>=0&&e<this.size&&this.modules[e][t]}drawFunctionPatterns(){for(let i=0;i<this.size;i++)this.setFunctionModule(6,i,i%2===0,I.Timing),this.setFunctionModule(i,6,i%2===0,I.Timing);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);const t=this.getAlignmentPatternPositions(),e=t.length;for(let i=0;i<e;i++)for(let n=0;n<e;n++)i===0&&n===0||i===0&&n===e-1||i===e-1&&n===0||this.drawAlignmentPattern(t[i],t[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(t){const e=this.ecc[1]<<3|t;let i=e;for(let r=0;r<10;r++)i=i<<1^(i>>>9)*1335;const n=(e<<10|i)^21522;for(let r=0;r<=5;r++)this.setFunctionModule(8,r,F(n,r));this.setFunctionModule(8,7,F(n,6)),this.setFunctionModule(8,8,F(n,7)),this.setFunctionModule(7,8,F(n,8));for(let r=9;r<15;r++)this.setFunctionModule(14-r,8,F(n,r));for(let r=0;r<8;r++)this.setFunctionModule(this.size-1-r,8,F(n,r));for(let r=8;r<15;r++)this.setFunctionModule(8,this.size-15+r,F(n,r));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let t=this.version;for(let i=0;i<12;i++)t=t<<1^(t>>>11)*7973;const e=this.version<<12|t;for(let i=0;i<18;i++){const n=F(e,i),r=this.size-11+i%3,o=Math.floor(i/3);this.setFunctionModule(r,o,n),this.setFunctionModule(o,r,n)}}drawFinderPattern(t,e){for(let i=-4;i<=4;i++)for(let n=-4;n<=4;n++){const r=Math.max(Math.abs(n),Math.abs(i)),o=t+n,s=e+i;o>=0&&o<this.size&&s>=0&&s<this.size&&this.setFunctionModule(o,s,r!==2&&r!==4,I.Position)}}drawAlignmentPattern(t,e){for(let i=-2;i<=2;i++)for(let n=-2;n<=2;n++)this.setFunctionModule(t+n,e+i,Math.max(Math.abs(n),Math.abs(i))!==1,I.Alignment)}setFunctionModule(t,e,i,n=I.Function){this.modules[e][t]=i,this.types[e][t]=n}addEccAndInterleave(t){const e=this.version,i=this.ecc;if(t.length!==O(e,i))throw new RangeError("Invalid argument");const n=ht[i[0]][e],r=lt[i[0]][e],o=Math.floor(Q(e)/8),s=n-o%n,c=Math.floor(o/n),h=[],p=Yt(r);for(let d=0,f=0;d<n;d++){const g=t.slice(f,f+c-r+(d<s?0:1));f+=g.length;const y=qt(g,p);d<s&&g.push(0),h.push(g.concat(y))}const u=[];for(let d=0;d<h[0].length;d++)h.forEach((f,g)=>{(d!==c-r||g>=s)&&u.push(f[d])});return u}drawCodewords(t){if(t.length!==Math.floor(Q(this.version)/8))throw new RangeError("Invalid argument");let e=0;for(let i=this.size-1;i>=1;i-=2){i===6&&(i=5);for(let n=0;n<this.size;n++)for(let r=0;r<2;r++){const o=i-r,s=(i+1&2)===0?this.size-1-n:n;!this.types[s][o]&&e<t.length*8&&(this.modules[s][o]=F(t[e>>>3],7-(e&7)),e++)}}}applyMask(t){if(t<0||t>7)throw new RangeError("Mask value out of range");for(let e=0;e<this.size;e++)for(let i=0;i<this.size;i++){let n;switch(t){case 0:n=(i+e)%2===0;break;case 1:n=e%2===0;break;case 2:n=i%3===0;break;case 3:n=(i+e)%3===0;break;case 4:n=(Math.floor(i/3)+Math.floor(e/2))%2===0;break;case 5:n=i*e%2+i*e%3===0;break;case 6:n=(i*e%2+i*e%3)%2===0;break;case 7:n=((i+e)%2+i*e%3)%2===0;break;default:throw new Error("Unreachable")}!this.types[e][i]&&n&&(this.modules[e][i]=!this.modules[e][i])}}getPenaltyScore(){let t=0;for(let r=0;r<this.size;r++){let o=!1,s=0;const c=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[r][h]===o?(s++,s===5?t+=ct:s>5&&t++):(this.finderPenaltyAddHistory(s,c),o||(t+=this.finderPenaltyCountPatterns(c)*z),o=this.modules[r][h],s=1);t+=this.finderPenaltyTerminateAndCount(o,s,c)*z}for(let r=0;r<this.size;r++){let o=!1,s=0;const c=[0,0,0,0,0,0,0];for(let h=0;h<this.size;h++)this.modules[h][r]===o?(s++,s===5?t+=ct:s>5&&t++):(this.finderPenaltyAddHistory(s,c),o||(t+=this.finderPenaltyCountPatterns(c)*z),o=this.modules[h][r],s=1);t+=this.finderPenaltyTerminateAndCount(o,s,c)*z}for(let r=0;r<this.size-1;r++)for(let o=0;o<this.size-1;o++){const s=this.modules[r][o];s===this.modules[r][o+1]&&s===this.modules[r+1][o]&&s===this.modules[r+1][o+1]&&(t+=Bt)}let e=0;for(const r of this.modules)e=r.reduce((o,s)=>o+(s?1:0),e);const i=this.size*this.size,n=Math.ceil(Math.abs(e*20-i*10)/i)-1;return t+=n*Nt,t}getAlignmentPatternPositions(){if(this.version===1)return[];{const t=Math.floor(this.version/7)+2,e=this.version===32?26:Math.ceil((this.version*4+4)/(t*2-2))*2,i=[6];for(let n=this.size-7;i.length<t;n-=e)i.splice(1,0,n);return i}}finderPenaltyCountPatterns(t){const e=t[1],i=e>0&&t[2]===e&&t[3]===e*3&&t[4]===e&&t[5]===e;return(i&&t[0]>=e*4&&t[6]>=e?1:0)+(i&&t[6]>=e*4&&t[0]>=e?1:0)}finderPenaltyTerminateAndCount(t,e,i){return t&&(this.finderPenaltyAddHistory(e,i),e=0),e+=this.size,this.finderPenaltyAddHistory(e,i),this.finderPenaltyCountPatterns(i)}finderPenaltyAddHistory(t,e){e[0]===0&&(t+=this.size),e.pop(),e.unshift(t)}}function k(a,t,e){if(t<0||t>31||a>>>t)throw new RangeError("Value out of range");for(let i=t-1;i>=0;i--)e.push(a>>>i&1)}function F(a,t){return(a>>>t&1)!==0}class V{constructor(t,e,i){if(this.mode=t,this.numChars=e,this.bitData=i,e<0)throw new RangeError("Invalid argument");this.bitData=i.slice()}getData(){return this.bitData.slice()}}const Dt=[1,10,12,14],Ut=[2,9,11,13],zt=[4,8,16,16];function dt(a,t){return a[Math.floor((t+7)/17)+1]}function ut(a){const t=[];for(const e of a)k(e,8,t);return new V(zt,a.length,t)}function Ot(a){if(!pt(a))throw new RangeError("String contains non-numeric characters");const t=[];for(let e=0;e<a.length;){const i=Math.min(a.length-e,3);k(Number.parseInt(a.substring(e,e+i),10),i*3+1,t),e+=i}return new V(Dt,a.length,t)}function $t(a){if(!mt(a))throw new RangeError("String contains unencodable characters in alphanumeric mode");const t=[];let e;for(e=0;e+2<=a.length;e+=2){let i=_.indexOf(a.charAt(e))*45;i+=_.indexOf(a.charAt(e+1)),k(i,11,t)}return e<a.length&&k(_.indexOf(a.charAt(e)),6,t),new V(Ut,a.length,t)}function Gt(a){return a===""?[]:pt(a)?[Ot(a)]:mt(a)?[$t(a)]:[ut(_t(a))]}function pt(a){return St.test(a)}function mt(a){return Lt.test(a)}function Ht(a,t){let e=0;for(const i of a){const n=dt(i.mode,t);if(i.numChars>=1<<n)return Number.POSITIVE_INFINITY;e+=4+n+i.bitData.length}return e}function _t(a){a=encodeURI(a);const t=[];for(let e=0;e<a.length;e++)a.charAt(e)!=="%"?t.push(a.charCodeAt(e)):(t.push(Number.parseInt(a.substring(e+1,e+3),16)),e+=2);return t}function Q(a){if(a<Y||a>q)throw new RangeError("Version number out of range");let t=(16*a+128)*a+64;if(a>=2){const e=Math.floor(a/7)+2;t-=(25*e-10)*e-55,a>=7&&(t-=36)}return t}function O(a,t){return Math.floor(Q(a)/8)-lt[t[0]][a]*ht[t[0]][a]}function Yt(a){if(a<1||a>255)throw new RangeError("Degree out of range");const t=[];for(let i=0;i<a-1;i++)t.push(0);t.push(1);let e=1;for(let i=0;i<a;i++){for(let n=0;n<t.length;n++)t[n]=j(t[n],e),n+1<t.length&&(t[n]^=t[n+1]);e=j(e,2)}return t}function qt(a,t){const e=t.map(i=>0);for(const i of a){const n=i^e.shift();e.push(0),t.forEach((r,o)=>e[o]^=j(r,n))}return e}function j(a,t){if(a>>>8||t>>>8)throw new RangeError("Byte out of range");let e=0;for(let i=7;i>=0;i--)e=e<<1^(e>>>7)*285,e^=(t>>>i&1)*a;return e}function Vt(a,t,e=1,i=40,n=-1,r=!0){if(!(Y<=e&&e<=i&&i<=q)||n<-1||n>7)throw new RangeError("Invalid value");let o,s;for(o=e;;o++){const u=O(o,t)*8,d=Ht(a,o);if(d<=u){s=d;break}if(o>=i)throw new RangeError("Data too long")}for(const u of[rt,ot,st])r&&s<=O(o,u)*8&&(t=u);const c=[];for(const u of a){k(u.mode[0],4,c),k(u.numChars,dt(u.mode,o),c);for(const d of u.getData())c.push(d)}const h=O(o,t)*8;k(0,Math.min(4,h-c.length),c),k(0,(8-c.length%8)%8,c);for(let u=236;c.length<h;u^=253)k(u,8,c);const p=Array.from({length:Math.ceil(c.length/8)},()=>0);return c.forEach((u,d)=>p[d>>>3]|=u<<7-(d&7)),new Rt(o,t,p,n)}function Qt(a,t){var e;const{ecc:i="L",boostEcc:n=!1,minVersion:r=1,maxVersion:o=40,maskPattern:s=-1,border:c=1}=t||{},h=typeof a=="string"?Gt(a):Array.isArray(a)?[ut(a)]:void 0;if(!h)throw new Error(`uqr only supports encoding string and binary data, but got: ${typeof a}`);const p=Vt(h,It[i],r,o,s,n),u=jt({version:p.version,maskPattern:p.mask,size:p.size,data:p.modules,types:p.types},c);return t!=null&&t.invert&&(u.data=u.data.map(d=>d.map(f=>!f))),(e=t==null?void 0:t.onEncoded)==null||e.call(t,u),u}function jt(a,t=1){if(!t)return a;const{size:e}=a,i=e+t*2;a.size=i,a.data.forEach(r=>{for(let o=0;o<t;o++)r.unshift(!1),r.push(!1)});for(let r=0;r<t;r++)a.data.unshift(Array.from({length:i},o=>!1)),a.data.push(Array.from({length:i},o=>!1));const n=I.Border;a.types.forEach(r=>{for(let o=0;o<t;o++)r.unshift(n),r.push(n)});for(let r=0;r<t;r++)a.types.unshift(Array.from({length:i},o=>n)),a.types.push(Array.from({length:i},o=>n));return a}function ft(a){return a.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Xt(a,t={}){const e=Qt(a,t),{pixelSize:i=10,whiteColor:n="white",blackColor:r="black"}=t,o=e.size*i,s=e.size*i;let c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${s} ${o}">`;const h=[];for(let p=0;p<e.size;p++)for(let u=0;u<e.size;u++){const d=u*i,f=p*i;e.data[p][u]&&h.push(`M${d},${f}h${i}v${i}h-${i}z`)}return c+=`<rect fill="${ft(n)}" width="${s}" height="${o}"/>`,c+=`<path fill="${ft(r)}" d="${h.join("")}"/>`,c+="</svg>",c}function X(a,t={}){if(!a||typeof a!="string")throw new Error("QR data must be a non-empty string.");const{size:e=220,margin:i=3,foreground:n="#1B1410",background:r="#FFFFFF",ecc:o="M"}=t,s=Xt(a,{border:i,ecc:o,blackColor:n,whiteColor:r});return s.startsWith("<svg")?s.replace("<svg",`<svg width="${e}" height="${e}" shape-rendering="crispEdges" aria-label="UPI Payment QR Code" role="img"`):s}function gt(a){return`data:image/svg+xml;charset=utf-8,${encodeURIComponent(a).replace(/'/g,"%27").replace(/"/g,"%22")}`}class Kt{constructor(t){l(this,"element",null);let e=t.querySelector(".chai-announcer");e||(e=document.createElement("div"),e.className="chai-announcer sr-only",e.setAttribute("aria-live","polite"),e.setAttribute("aria-atomic","true"),t.appendChild(e)),this.element=e}announce(t){this.element&&(this.element.textContent="",setTimeout(()=>{this.element&&(this.element.textContent=t)},50))}}class Wt{constructor(t){l(this,"container");l(this,"previousActiveElement",null);l(this,"keydownListener",null);this.container=t}activate(t){if(typeof document>"u")return;const e=this.container.getRootNode();let i=null;try{i=(e&&"activeElement"in e?e.activeElement:null)||document.activeElement}catch{i=typeof document<"u"?document.activeElement:null}this.previousActiveElement=t||i;const n=this.getFocusableElements();n.length>0&&n[0].focus(),this.keydownListener=r=>this.handleKeyDown(r),this.container.addEventListener("keydown",this.keydownListener)}deactivate(){if(this.keydownListener&&(this.container.removeEventListener("keydown",this.keydownListener),this.keydownListener=null),this.previousActiveElement&&typeof this.previousActiveElement.focus=="function")try{this.previousActiveElement.focus()}catch{}this.previousActiveElement=null}handleKeyDown(t){if(t.key!=="Tab")return;const e=this.getFocusableElements();if(e.length===0){t.preventDefault();return}const i=e[0],n=e[e.length-1],r=this.container.getRootNode(),o=(r&&"activeElement"in r?r.activeElement:null)||document.activeElement;t.shiftKey?o===i&&(t.preventDefault(),n.focus()):o===n&&(t.preventDefault(),i.focus())}getFocusableElements(){return Array.from(this.container.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(e=>e.offsetParent!==null&&!e.hasAttribute("disabled"))}}function Zt(){return`
    <g class="chai-steam-group" stroke="rgba(246, 232, 210, 0.75)" stroke-width="1.8" stroke-linecap="round" fill="none">
      <path class="steam-path-1" d="M12 11 Q10 7 12 3 Q14 -1 12 -5" />
      <path class="steam-path-2" d="M16 11 Q18 7 16 3 Q14 -1 16 -5" />
    </g>
  `}function bt(){return`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chai cup icon">
      <defs>
        <linearGradient id="miniCupGrad" x1="7" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E27D56" />
          <stop offset="1" stop-color="#B24B27" />
        </linearGradient>
        <linearGradient id="miniTeaGrad" x1="7" y1="11" x2="21" y2="13" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D49352" />
          <stop offset="1" stop-color="#8C4320" />
        </linearGradient>
      </defs>
      ${Zt()}
      <!-- Saucer -->
      <ellipse cx="14" cy="21.5" rx="8" ry="1.6" fill="#E9AE5B" opacity="0.45" />
      <!-- Cup Body -->
      <path d="M7 11 H21 L19.2 19.2 C19 20 18.2 20.6 17.3 20.6 H10.7 C9.8 20.6 9 20 8.8 19.2 L7 11 Z" fill="url(#miniCupGrad)" />
      <!-- Chai Liquid Surface -->
      <ellipse cx="14" cy="11" rx="7" ry="1.8" fill="url(#miniTeaGrad)" />
      <!-- Cup Rim -->
      <ellipse cx="14" cy="11" rx="7" ry="1.8" stroke="#F6E8D2" stroke-width="0.8" fill="none" opacity="0.8" />
      <!-- Cup Handle -->
      <path d="M7 12.5 C4 12.5 4 17.5 7 18" stroke="#E27D56" stroke-width="1.8" stroke-linecap="round" fill="none" />
    </svg>
  `}function Jt(){return`
    <svg width="44" height="44" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cutting Chai Glass">
      <defs>
        <linearGradient id="cutGlassGrad" x1="11" y1="8" x2="25" y2="30" gradientUnits="userSpaceOnUse">
          <stop stop-color="rgba(255, 255, 255, 0.22)" />
          <stop offset="0.5" stop-color="rgba(255, 255, 255, 0.08)" />
          <stop offset="1" stop-color="rgba(255, 255, 255, 0.18)" />
        </linearGradient>
        <linearGradient id="cutTeaGrad" x1="12" y1="16" x2="24" y2="29" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E5A663" />
          <stop offset="0.6" stop-color="#C27536" />
          <stop offset="1" stop-color="#7A3916" />
        </linearGradient>
      </defs>
      <!-- Steam -->
      <g stroke="rgba(246, 232, 210, 0.7)" stroke-width="1.5" stroke-linecap="round" fill="none">
        <path class="steam-path-1" d="M15 8 Q13 4 15 1" />
        <path class="steam-path-2" d="M21 8 Q23 4 21 1" />
      </g>
      <!-- Shadow -->
      <ellipse cx="18" cy="32" rx="7" ry="1.5" fill="rgba(0, 0, 0, 0.25)" />
      <!-- Glass Base & Body -->
      <path d="M11 9 L13.8 29.5 C14 30.7 15 31.5 16.2 31.5 H19.8 C21 31.5 22 30.7 22.2 29.5 L25 9 Z" fill="url(#cutGlassGrad)" stroke="rgba(255, 255, 255, 0.5)" stroke-width="1.2" />
      <!-- Chai Tea Liquid -->
      <path d="M12.2 16.5 L14.2 29.2 C14.3 29.8 14.8 30.2 15.5 30.2 H20.5 C21.2 30.2 21.7 29.8 21.8 29.2 L23.8 16.5 Z" fill="url(#cutTeaGrad)" />
      <!-- Tea Froth Head -->
      <ellipse cx="18" cy="16.5" rx="5.8" ry="1.4" fill="#F8EADB" opacity="0.9" />
      <ellipse cx="18" cy="16.5" rx="3.5" ry="0.8" fill="#E2C19B" opacity="0.6" />
      <!-- Glass Vertical Ribs / Flutes -->
      <line x1="15.5" y1="12" x2="16.5" y2="29" stroke="rgba(255, 255, 255, 0.35)" stroke-width="0.9" />
      <line x1="20.5" y1="12" x2="19.5" y2="29" stroke="rgba(255, 255, 255, 0.35)" stroke-width="0.9" />
      <!-- Top Rim Ring -->
      <ellipse cx="18" cy="9" rx="7" ry="1.8" stroke="rgba(255, 255, 255, 0.7)" stroke-width="1.2" fill="rgba(255, 255, 255, 0.15)" />
    </svg>
  `}function vt(){return`
    <svg width="44" height="44" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kadak Chai Cup">
      <defs>
        <linearGradient id="kadakCupGrad" x1="9" y1="12" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D97047" />
          <stop offset="1" stop-color="#9E3B1C" />
        </linearGradient>
        <linearGradient id="kadakTeaGrad" x1="12" y1="12" x2="24" y2="15" gradientUnits="userSpaceOnUse">
          <stop stop-color="#C77D3D" />
          <stop offset="0.7" stop-color="#7F3514" />
          <stop offset="1" stop-color="#4F1D08" />
        </linearGradient>
      </defs>
      <!-- Steam -->
      <g stroke="rgba(246, 232, 210, 0.75)" stroke-width="1.6" stroke-linecap="round" fill="none">
        <path class="steam-path-1" d="M14 10 Q12 5 14 1" />
        <path class="steam-path-2" d="M20 10 Q22 5 20 1" />
      </g>
      <!-- Saucer Base -->
      <ellipse cx="18" cy="30" rx="13" ry="2.6" fill="#E9AE5B" opacity="0.35" />
      <ellipse cx="18" cy="29.2" rx="12" ry="2" stroke="#D49352" stroke-width="1" fill="#2B1D16" />
      <!-- Cup Handle -->
      <path d="M8 14 C4 14 4 21 8 22" stroke="#D97047" stroke-width="2.2" stroke-linecap="round" fill="none" />
      <!-- Cup Body -->
      <path d="M9 12 H27 L24.8 25.5 C24.5 26.8 23.4 27.8 22.1 27.8 H13.9 C12.6 27.8 11.5 26.8 11.2 25.5 L9 12 Z" fill="url(#kadakCupGrad)" />
      <!-- Tea Liquid Surface -->
      <ellipse cx="18" cy="12.5" rx="8.5" ry="2.2" fill="url(#kadakTeaGrad)" />
      <ellipse cx="18" cy="12.5" rx="6" ry="1.4" fill="#E8B078" opacity="0.4" />
      <!-- Rim Golden Accent -->
      <ellipse cx="18" cy="12" rx="9" ry="2.4" stroke="#E9AE5B" stroke-width="1.2" fill="none" />
    </svg>
  `}function te(){return`
    <svg width="44" height="44" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tandoori Clay Kulhad">
      <defs>
        <linearGradient id="clayKulhadGrad" x1="10" y1="10" x2="26" y2="30" gradientUnits="userSpaceOnUse">
          <stop stop-color="#BF5D3B" />
          <stop offset="0.4" stop-color="#9C4425" />
          <stop offset="0.85" stop-color="#6E2C14" />
          <stop offset="1" stop-color="#4A1C0C" />
        </linearGradient>
        <radialGradient id="smokyTeaGrad" cx="18" cy="11" r="8" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D9824C" />
          <stop offset="0.7" stop-color="#803518" />
          <stop offset="1" stop-color="#3D1507" />
        </radialGradient>
      </defs>
      <!-- Steam -->
      <g stroke="rgba(246, 232, 210, 0.8)" stroke-width="1.8" stroke-linecap="round" fill="none">
        <path class="steam-path-1" d="M14 9 Q11 4 14 0" />
        <path class="steam-path-2" d="M22 9 Q25 4 22 0" />
      </g>
      <!-- Ground Shadow -->
      <ellipse cx="18" cy="32.5" rx="8.5" ry="1.8" fill="rgba(0, 0, 0, 0.4)" />
      <!-- Clay Kulhad Body -->
      <path d="M10 11 L12.5 19 L13.5 29.5 C13.7 30.8 14.8 31.8 16.1 31.8 H19.9 C21.2 31.8 22.3 30.8 22.5 29.5 L23.5 19 L26 11 Z" fill="url(#clayKulhadGrad)" />
      <!-- Rustic Clay Texture Bands -->
      <path d="M11.5 15.5 Q18 18 24.5 15.5" stroke="#522110" stroke-width="1.4" fill="none" opacity="0.8" />
      <path d="M12.6 20.5 Q18 23 23.4 20.5" stroke="#522110" stroke-width="1.3" fill="none" opacity="0.75" />
      <path d="M13.5 25.5 Q18 27.5 22.5 25.5" stroke="#421A0C" stroke-width="1.2" fill="none" opacity="0.7" />
      <!-- Smoky Chai Liquid -->
      <ellipse cx="18" cy="11.5" rx="7.5" ry="2.1" fill="url(#smokyTeaGrad)" />
      <ellipse cx="17.5" cy="11.3" rx="4.5" ry="1.2" fill="#E8A370" opacity="0.45" />
      <!-- Clay Rim -->
      <ellipse cx="18" cy="11" rx="8" ry="2.3" stroke="#D97A52" stroke-width="1.4" fill="none" />
    </svg>
  `}function ee(){return`
    <svg width="44" height="44" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Premium Royal Chai Cup">
      <defs>
        <linearGradient id="royalGoldGrad" x1="8" y1="10" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stop-color="#FFDF85" />
          <stop offset="0.3" stop-color="#E9AE5B" />
          <stop offset="0.7" stop-color="#BA7824" />
          <stop offset="1" stop-color="#78490B" />
        </linearGradient>
        <linearGradient id="saffronTeaGrad" x1="12" y1="11" x2="24" y2="14" gradientUnits="userSpaceOnUse">
          <stop stop-color="#E28938" />
          <stop offset="0.6" stop-color="#A85317" />
          <stop offset="1" stop-color="#5E2606" />
        </linearGradient>
      </defs>
      <!-- Saffron-tinted Golden Steam -->
      <g stroke="rgba(245, 197, 107, 0.85)" stroke-width="1.8" stroke-linecap="round" fill="none">
        <path class="steam-path-1" d="M14 9 Q11 4 14 0" />
        <path class="steam-path-2" d="M22 9 Q25 4 22 0" />
      </g>
      <!-- Royal Brass Saucer with Filigree Bevel -->
      <ellipse cx="18" cy="30" rx="14" ry="2.8" fill="url(#royalGoldGrad)" />
      <ellipse cx="18" cy="29.2" rx="12" ry="2.2" stroke="#FFE9A8" stroke-width="1" fill="#1C140E" />
      <!-- Pedestal Foot Base -->
      <path d="M14.5 26.5 H21.5 L20.5 29 H15.5 Z" fill="url(#royalGoldGrad)" stroke="#FFE9A8" stroke-width="0.8" />
      <!-- Ornate Royal Handle -->
      <path d="M7 12.5 C2.5 12.5 2 21 7 23 C5 18.5 5 15.5 7.5 14" fill="url(#royalGoldGrad)" stroke="#B37520" stroke-width="1" />
      <!-- Royal Cup Body -->
      <path d="M8 11 H28 L25 24 C24.7 25.8 23 27 21.2 27 H14.8 C13 27 11.3 25.8 11 24 L8 11 Z" fill="#1A120D" stroke="url(#royalGoldGrad)" stroke-width="1.5" />
      <!-- Golden Arabesque Cup Motif -->
      <path d="M14 18 Q18 21 22 18 Q18 24 14 18" stroke="url(#royalGoldGrad)" stroke-width="1.2" fill="none" opacity="0.9" />
      <!-- Saffron Chai Liquid -->
      <ellipse cx="18" cy="11.5" rx="9.5" ry="2.4" fill="url(#saffronTeaGrad)" />
      <!-- Saffron Strands Floating -->
      <path d="M15 11.2 Q16.5 10.7 17.5 11.4" stroke="#DC2626" stroke-width="1.2" stroke-linecap="round" fill="none" />
      <path d="M19 11.8 Q20 11.3 20.8 12" stroke="#DC2626" stroke-width="1.2" stroke-linecap="round" fill="none" />
      <path d="M16 12 Q17 12.4 18 12.1" stroke="#DC2626" stroke-width="1" stroke-linecap="round" fill="none" />
      <!-- Brilliant Gold Rim -->
      <ellipse cx="18" cy="11" rx="10" ry="2.6" stroke="#FFE9A8" stroke-width="1.6" fill="none" />
    </svg>
  `}function ie(a){switch(a){case"cutting":return Jt();case"kadak":return vt();case"tandoori":return te();case"premium":return ee();default:return vt()}}class ae{constructor(t){l(this,"element");l(this,"buttonEl",null);l(this,"options");this.options=t,this.element=this.render()}getElement(){return this.element}getButtonElement(){return this.buttonEl}updateText(t){this.options.buttonText=t;const e=this.element.querySelector(".chai-launcher-text");e&&(e.textContent=t)}updatePosition(t){this.options.position=t,this.element.setAttribute("data-position",t)}render(){const t=document.createElement("div");t.className="chai-launcher-wrapper",t.setAttribute("data-position",this.options.position);const e=document.createElement("button");return e.type="button",e.className="chai-launcher-btn",e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-label",`${this.options.buttonText} - open support dialog`),e.innerHTML=`
      <span class="chai-launcher-icon" aria-hidden="true">
        ${bt()}
      </span>
      <span class="chai-launcher-text">${this.options.buttonText}</span>
    `,e.addEventListener("click",i=>{i.preventDefault(),this.options.onOpen()}),this.buttonEl=e,t.appendChild(e),t}}class ne{constructor(t){l(this,"element");l(this,"inputEl");l(this,"errorEl");l(this,"options");this.options=t;const{element:e,inputEl:i,errorEl:n}=this.render();this.element=e,this.inputEl=i,this.errorEl=n}getElement(){return this.element}setAmount(t){const e=t/100;this.inputEl.value=e?e.toString():"",this.clearError()}clear(){this.inputEl.value="",this.clearError()}clearError(){this.errorEl.textContent="",this.errorEl.style.display="none"}setError(t){this.errorEl.textContent=t,this.errorEl.style.display="block"}render(){const t=document.createElement("div");t.className="chai-custom-amount-wrapper";const e=document.createElement("label");e.className="chai-section-label",e.htmlFor="chai-custom-input",e.textContent=`Or choose custom amount (${A(this.options.minAmountPaise)} - ${A(this.options.maxAmountPaise)})`,t.appendChild(e);const i=document.createElement("div");i.className="chai-input-group";const n=document.createElement("span");n.className="chai-input-symbol",n.textContent="₹",n.setAttribute("aria-hidden","true"),i.appendChild(n);const r=document.createElement("input");r.id="chai-custom-input",r.type="text",r.className="chai-amount-input",r.inputMode="numeric",r.pattern="[0-9]*",r.placeholder="Enter amount in ₹",r.setAttribute("aria-label","Custom contribution amount in rupees"),this.options.initialAmountPaise&&(r.value=(this.options.initialAmountPaise/100).toString()),i.appendChild(r),t.appendChild(i);const o=document.createElement("div");return o.className="chai-input-error",o.style.display="none",o.setAttribute("role","alert"),t.appendChild(o),r.addEventListener("input",()=>{const s=r.value.trim();if(!s){this.clearError(),this.options.onAmountChange(0,!1);return}const c=Z(s),h=tt(c,this.options.minAmountPaise,this.options.maxAmountPaise);!h.valid&&h.error?(this.setError(h.error),this.options.onAmountChange(c,!1)):(this.clearError(),this.options.onAmountChange(c,!0))}),{element:t,inputEl:r,errorEl:o}}}const re="https://arun-codex.github.io/chaikit/#demo-preview-non-payable";class oe{constructor(t){l(this,"element");l(this,"options");l(this,"qrFrameEl");l(this,"amountLabelEl");l(this,"upiUri","");this.options=t;const{element:e,qrFrameEl:i,amountLabelEl:n}=this.render();this.element=e,this.qrFrameEl=i,this.amountLabelEl=n,this.updatePaymentData(t.amountPaise)}getElement(){return this.element}updatePaymentData(t){if(this.options.amountPaise=t,this.amountLabelEl.textContent=A(t),t<=0){this.qrFrameEl.innerHTML='<div style="padding: 24px; color: var(--chai-text-muted);">Please select or enter an amount to generate payment QR.</div>',this.upiUri="";return}try{let e;this.options.demoMode?(this.upiUri="",e=re):(this.upiUri=it({upiId:this.options.upiId,creatorName:this.options.creatorName,paymentPayeeName:this.options.paymentPayeeName,amountPaise:t,note:this.options.note}),e=this.upiUri);const i=X(e,{size:190,margin:3,foreground:"#1B1410",background:"#FFFFFF"});this.options.demoMode?this.qrFrameEl.innerHTML=`
          ${i}
          <div class="chai-demo-qr-overlay">
            <span class="chai-demo-tag">DEMO ONLY &bull; NON-PAYABLE</span>
          </div>
        `:this.qrFrameEl.innerHTML=i}catch{this.qrFrameEl.innerHTML='<div style="padding: 20px; color: #EF4444;">Could not generate QR. Please check UPI configuration.</div>'}}async copyText(t,e){try{if(typeof navigator<"u"&&navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(t),this.options.onCopySuccess(e);return}}catch{}try{const i=document.createElement("textarea");i.value=t,i.style.position="fixed",i.style.left="-9999px",i.style.top="-9999px",i.setAttribute("readonly",""),document.body.appendChild(i),i.select();const n=document.execCommand("copy");document.body.removeChild(i),n?this.options.onCopySuccess(e):this.options.onCopySuccess(`UPI: ${t}`)}catch{this.options.onCopySuccess(`UPI: ${t}`)}}render(){const t=document.createElement("div");t.className="chai-payment-panel";const e=document.createElement("div");e.className="chai-section-label",e.style.alignSelf="flex-start",e.textContent="Scan or pay via UPI",t.appendChild(e);const i=document.createElement("div");i.className="chai-qr-frame",i.setAttribute("role","region"),i.setAttribute("aria-label","UPI Payment QR Code"),t.appendChild(i);const n=document.createElement("div");n.className="chai-upi-details";const r=document.createElement("div");r.innerHTML=`
      <span class="chai-upi-label">Amount: </span>
      <span class="chai-upi-value chai-payment-amount">${A(this.options.amountPaise)}</span>
    `;const o=document.createElement("div");this.options.demoMode?o.innerHTML=`
        <span class="chai-upi-label">Status: </span>
        <span class="chai-upi-value chai-demo-status" style="color: var(--chai-accent); font-weight: 700;">Demo Only &bull; Non-payable</span>
      `:o.innerHTML=`
        <span class="chai-upi-label">UPI ID: </span>
        <span class="chai-upi-value">${this.options.upiId}</span>
      `,n.appendChild(r),n.appendChild(o),t.appendChild(n);const s=document.createElement("div");s.className="chai-qr-actions";const c=document.createElement("button");c.type="button",c.className="chai-btn-secondary",c.setAttribute("aria-label",this.options.demoMode?"Copying disabled in demo mode":`Copy UPI ID: ${this.options.upiId}`),c.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
      <span>Copy UPI ID</span>
    `,c.addEventListener("click",async()=>{if(this.options.demoMode){this.options.onCopySuccess("Demo Mode: Live UPI transfers are disabled. No payment destination copied.");return}await this.copyText(this.options.upiId,"UPI ID copied to clipboard!")}),s.appendChild(c);const h=document.createElement("button");h.type="button",h.className="chai-btn-secondary",h.setAttribute("aria-label","Download UPI QR Code"),h.innerHTML=`
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
      <span>Save QR</span>
    `,h.addEventListener("click",()=>{if(this.options.demoMode){this.options.onCopySuccess("Demo Mode: Saving disabled. This is a non-payable demo QR.");return}if(!this.upiUri)return;const g=X(this.upiUri,{size:300}),y=gt(g),x=document.createElement("a");x.href=y,x.download=`chai-qr-${this.options.amountPaise/100}rs.svg`,x.click()}),s.appendChild(h),t.appendChild(s);const p=at(),u=document.createElement("button");u.type="button",u.className="chai-btn-primary",this.options.demoMode?(u.classList.add("chai-btn-demo-disabled"),u.setAttribute("aria-label","UPI payments disabled in demonstration mode"),u.innerHTML=`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
        </svg>
        <span>Demo Only &mdash; No Payments</span>
      `):(u.setAttribute("aria-label","Open UPI payment in installed mobile app"),u.innerHTML=`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
        </svg>
        <span>${p?"Open in UPI App":"Pay via UPI App"}</span>
      `),u.addEventListener("click",()=>{if(this.options.demoMode){this.options.onCopySuccess("Demo Mode: Live UPI payment intent is disabled in demonstration preview."),this.options.onHandoffAttempt("demo://non-payable-preview");return}this.upiUri&&(this.options.onHandoffAttempt(this.upiUri),nt(this.upiUri))}),t.appendChild(u);const d=document.createElement("div");d.className="chai-disclaimer",this.options.demoMode?d.innerHTML=`
        <div class="chai-demo-tag" style="display:inline-block; font-size:10px; padding:3px 8px; margin-bottom:5px;">DEMO ONLY &bull; NO PAYMENTS</div>
        <p style="margin:0; font-size:12px; line-height:1.4;">Safe demonstration preview. Real bank transfers, live payment app intents, and real UPI IDs are completely disabled.</p>
      `:d.innerHTML=`
        Complete payment in Google Pay, PhonePe, Paytm, or BHIM. Direct P2P transfer &mdash; <strong>verify recipient name before confirming</strong> in your UPI app.
      `,t.appendChild(d);const f=r.querySelector(".chai-payment-amount");return{element:t,qrFrameEl:i,amountLabelEl:f}}}class se{constructor(t){l(this,"element");l(this,"options");l(this,"cards",new Map);this.options=t,this.element=this.render()}getElement(){return this.element}selectTier(t){this.options.selectedTierId=t,this.cards.forEach((e,i)=>{const n=i===t;e.classList.toggle("selected",n),e.setAttribute("aria-pressed",n?"true":"false")})}updateTiers(t){this.options.tiers=t;const e=this.element.parentElement,i=this.render();e&&e.replaceChild(i,this.element),this.element=i}render(){const t=document.createElement("div");t.className="chai-tiers-container";const e=document.createElement("div");e.className="chai-section-label",e.textContent="Choose your chai",t.appendChild(e);const i=document.createElement("div");return i.className="chai-tiers-grid",i.setAttribute("role","group"),i.setAttribute("aria-label","Contribution chai tiers"),this.cards.clear(),this.options.tiers.forEach(n=>{const r=document.createElement("button");r.type="button",r.className="chai-tier-card",r.setAttribute("data-tier",n.id),r.setAttribute("data-tier-id",n.id);const o=n.id===this.options.selectedTierId;o&&r.classList.add("selected"),r.setAttribute("aria-pressed",o?"true":"false"),r.setAttribute("aria-label",`${n.name}: ${A(n.amountPaise)}. ${n.description||""}`),r.innerHTML=`
        <div class="chai-tier-icon" aria-hidden="true">
          ${ie(n.icon||n.id)}
        </div>
        <div class="chai-tier-name">${n.name}</div>
        <div class="chai-tier-amount">${A(n.amountPaise)}</div>
        ${n.description?`<div class="chai-tier-desc">${n.description}</div>`:""}
      `,r.addEventListener("click",()=>{this.selectTier(n.id),this.options.onSelect(n)}),this.cards.set(n.id,r),i.appendChild(r)}),t.appendChild(i),t}}class ce{constructor(){l(this,"element");l(this,"timeoutId",null);this.element=document.createElement("div"),this.element.className="chai-toast",this.element.setAttribute("role","status"),this.element.setAttribute("aria-live","polite")}getElement(){return this.element}show(t,e=2500){this.timeoutId&&clearTimeout(this.timeoutId),this.element.textContent=t,this.element.classList.add("visible"),this.timeoutId=setTimeout(()=>{this.element.classList.remove("visible"),this.timeoutId=null},e)}}class le{constructor(t){l(this,"backdropEl");l(this,"modalEl");l(this,"tierSelector");l(this,"customAmountInput",null);l(this,"paymentPanel");l(this,"toast");l(this,"options");l(this,"currentAmountPaise",2500);l(this,"chai3dView",null);l(this,"chai3dStageEl",null);var r,o,s;this.options={...t,tiers:t.tiers||U,minAmountPaise:t.minAmountPaise??B,maxAmountPaise:t.maxAmountPaise??N,allowCustomAmount:t.allowCustomAmount!==!1};const e=((r=this.options.tiers)==null?void 0:r.find(c=>c.id===t.defaultTierId))||((o=this.options.tiers)==null?void 0:o[1])||((s=this.options.tiers)==null?void 0:s[0]);e&&(this.currentAmountPaise=e.amountPaise),this.toast=new ce,this.tierSelector=new se({tiers:this.options.tiers||U,selectedTierId:e?e.id:null,onSelect:c=>{this.currentAmountPaise=c.amountPaise,this.paymentPanel.updatePaymentData(c.amountPaise),this.customAmountInput&&this.customAmountInput.clear(),this.chai3dView&&this.chai3dView.setTier(c.id),this.options.onTierSelected(c),this.options.onAmountChanged(c.amountPaise)}}),this.paymentPanel=new oe({creatorName:this.options.creatorName,paymentPayeeName:this.options.paymentPayeeName,upiId:this.options.upiId,amountPaise:this.currentAmountPaise,note:this.options.note,demoMode:this.options.demoMode,onCopySuccess:c=>this.toast.show(c),onHandoffAttempt:c=>this.options.onHandoffAttempt(c)}),this.options.allowCustomAmount&&(this.customAmountInput=new ne({minAmountPaise:this.options.minAmountPaise??B,maxAmountPaise:this.options.maxAmountPaise??N,onAmountChange:(c,h)=>{h&&c>0&&(this.currentAmountPaise=c,this.tierSelector.selectTier(null),this.paymentPanel.updatePaymentData(c),this.options.onAmountChanged(c))}}));const{backdrop:i,modal:n}=this.render();this.backdropEl=i,this.modalEl=n}getBackdropElement(){return this.backdropEl}getModalElement(){return this.modalEl}open(){this.backdropEl.classList.add("open"),this.modalEl.setAttribute("aria-hidden","false")}close(){this.backdropEl.classList.remove("open"),this.modalEl.setAttribute("aria-hidden","true")}isOpen(){return this.backdropEl.classList.contains("open")}destroy(){this.chai3dView&&(this.chai3dView.destroy(),this.chai3dView=null)}setAmount(t){var i;this.currentAmountPaise=t;const e=(i=this.options.tiers)==null?void 0:i.find(n=>n.amountPaise===t);e?(this.tierSelector.selectTier(e.id),this.customAmountInput&&this.customAmountInput.clear()):this.customAmountInput&&(this.tierSelector.selectTier(null),this.customAmountInput.setAmount(t)),this.paymentPanel.updatePaymentData(t)}render(){var p,u;const t=document.createElement("div");t.className=this.options.isInline?"chai-inline-card":"chai-backdrop",this.options.isInline||t.addEventListener("click",d=>{d.target===t&&this.options.onClose()});const e=document.createElement("div");e.className=this.options.isInline?"chai-modal-inline":"chai-modal",e.setAttribute("role","dialog"),e.setAttribute("aria-modal",this.options.isInline?"false":"true"),e.setAttribute("aria-labelledby","chai-modal-title"),e.setAttribute("aria-describedby","chai-modal-desc");const i=document.createElement("header");i.className="chai-header";const n=document.createElement("div");n.className="chai-header-brand";const r=document.createElement("div");r.className="chai-header-cup",r.setAttribute("aria-hidden","true"),r.innerHTML=bt(),n.appendChild(r);const o=document.createElement("div");o.className="chai-header-titles";const s=document.createElement("h2");s.id="chai-modal-title",s.className="chai-title",s.textContent=`Buy ${this.options.creatorName} a Chai ☕`,o.appendChild(s);const c=document.createElement("p");if(c.id="chai-modal-desc",c.className="chai-subtitle",c.textContent=this.options.description||"Enjoying my work? A little chai goes a long way!",o.appendChild(c),n.appendChild(o),i.appendChild(n),!this.options.isInline){const d=document.createElement("button");d.type="button",d.className="chai-close-btn",d.setAttribute("aria-label","Close support dialog"),d.innerHTML=`
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `,d.addEventListener("click",()=>this.options.onClose()),i.appendChild(d)}e.appendChild(i);const h=document.createElement("div");if(h.className="chai-body",this.options.enable3D){const d=document.createElement("div");d.className="chai-3d-stage",d.setAttribute("role","region"),d.setAttribute("aria-label","3D Chai Cup View"),h.appendChild(d),this.chai3dStageEl=d;const f=this.options.defaultTierId||((u=(p=this.options.tiers)==null?void 0:p[1])==null?void 0:u.id)||"kadak";Promise.resolve().then(()=>me).then(({Chai3DView:g})=>{this.chai3dStageEl&&(this.chai3dView=new g(this.chai3dStageEl,{tierId:f,width:260,height:160,onFallback:()=>{this.chai3dStageEl&&(this.chai3dStageEl.style.display="none")}}))}).catch(g=>{console.warn("ChaiKit 3D lazy load skipped:",g),this.chai3dStageEl&&(this.chai3dStageEl.style.display="none")})}return h.appendChild(this.toast.getElement()),h.appendChild(this.tierSelector.getElement()),this.customAmountInput&&h.appendChild(this.customAmountInput.getElement()),h.appendChild(this.paymentPanel.getElement()),e.appendChild(h),t.appendChild(e),{backdrop:t,modal:e}}}const he=`
:host {
  --chai-font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --chai-bg: #2B1D16;
  --chai-card-bg: rgba(43, 29, 22, 0.85);
  --chai-surface: #38251C;
  --chai-surface-hover: #483024;
  --chai-text: #F6E8D2;
  --chai-text-muted: #B39E8F;
  --chai-border: rgba(199, 139, 82, 0.28);
  --chai-border-hover: rgba(233, 174, 91, 0.6);
  --chai-accent: #E9AE5B;
  --chai-accent-hover: #F2BD72;
  --chai-accent-text: #1B1410;
  --chai-shadow: 0 14px 40px rgba(0, 0, 0, 0.45);
  --chai-radius: 18px;
  --chai-radius-sm: 10px;
  --chai-qr-bg: #FFFFFF;
  --chai-qr-fg: #1B1410;
  font-family: var(--chai-font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--chai-text);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:host([theme="cream"]) {
  --chai-bg: #FFFDF9;
  --chai-card-bg: #FFFFFF;
  --chai-surface: #F6E8D2;
  --chai-surface-hover: #EEDABE;
  --chai-text: #1B1410;
  --chai-text-muted: #735D4F;
  --chai-border: rgba(199, 139, 82, 0.35);
  --chai-border-hover: #C78B52;
  --chai-accent: #C66B45;
  --chai-accent-hover: #B85B35;
  --chai-accent-text: #FFFFFF;
  --chai-shadow: 0 14px 40px rgba(27, 20, 16, 0.16);
}

:host([theme="dark"]) {
  --chai-bg: #140E0B;
  --chai-card-bg: #1D1510;
  --chai-surface: #271C16;
  --chai-surface-hover: #33251E;
  --chai-text: #F8EFE4;
  --chai-text-muted: #9F8A7D;
  --chai-border: rgba(233, 174, 91, 0.2);
  --chai-border-hover: rgba(233, 174, 91, 0.5);
  --chai-accent: #E9AE5B;
  --chai-accent-hover: #F4C47E;
  --chai-accent-text: #1B1410;
  --chai-shadow: 0 16px 44px rgba(0, 0, 0, 0.65);
}

:host([theme="minimal"]) {
  --chai-bg: #18181B;
  --chai-card-bg: #27272A;
  --chai-surface: #3F3F46;
  --chai-surface-hover: #52525B;
  --chai-text: #F4F4F5;
  --chai-text-muted: #A1A1AA;
  --chai-border: rgba(255, 255, 255, 0.15);
  --chai-border-hover: rgba(255, 255, 255, 0.35);
  --chai-accent: #FAFAFA;
  --chai-accent-hover: #FFFFFF;
  --chai-accent-text: #18181B;
  --chai-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);
}

@media (prefers-color-scheme: light) {
  :host([theme="auto"]) {
    --chai-bg: #FFFDF9;
    --chai-card-bg: #FFFFFF;
    --chai-surface: #F6E8D2;
    --chai-surface-hover: #EEDABE;
    --chai-text: #1B1410;
    --chai-text-muted: #735D4F;
    --chai-border: rgba(199, 139, 82, 0.35);
    --chai-border-hover: #C78B52;
    --chai-accent: #C66B45;
    --chai-accent-hover: #B85B35;
    --chai-accent-text: #FFFFFF;
    --chai-shadow: 0 14px 40px rgba(27, 20, 16, 0.16);
  }
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Accessibility utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ---------------- FLOATING LAUNCHER ---------------- */
.chai-launcher-wrapper {
  position: fixed;
  z-index: 2147483640;
  bottom: max(20px, env(safe-area-inset-bottom, 20px));
}

.chai-launcher-wrapper[data-position="bottom-right"] {
  right: max(20px, env(safe-area-inset-right, 20px));
}

.chai-launcher-wrapper[data-position="bottom-left"] {
  left: max(20px, env(safe-area-inset-left, 20px));
}

.chai-launcher-wrapper[data-position="inline"] {
  position: static;
  display: block;
  margin: 16px 0;
}

.chai-launcher-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--chai-bg);
  color: var(--chai-text);
  border: 1px solid var(--chai-border);
  border-radius: 9999px;
  padding: 10px 18px 10px 14px;
  font-family: var(--chai-font);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25), 0 0 12px rgba(233, 174, 91, 0.15);
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease, border-color 0.2s ease;
  user-select: none;
  outline: none;
}

.chai-launcher-btn:hover {
  transform: translateY(-2px) scale(1.02);
  border-color: var(--chai-border-hover);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35), 0 0 18px rgba(233, 174, 91, 0.25);
}

.chai-launcher-btn:active {
  transform: translateY(0) scale(0.98);
}

.chai-launcher-btn:focus-visible {
  outline: 2px solid var(--chai-accent);
  outline-offset: 3px;
}

.chai-launcher-icon {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.chai-launcher-text {
  letter-spacing: 0.01em;
}

/* ---------------- STEAM ANIMATION ---------------- */
@keyframes steam-rise-1 {
  0% { transform: translateY(0) scaleX(1); opacity: 0; }
  15% { opacity: 0.7; }
  50% { transform: translateY(-7px) scaleX(1.15) translateX(1px); opacity: 0.5; }
  100% { transform: translateY(-14px) scaleX(1.3) translateX(-1px); opacity: 0; }
}

@keyframes steam-rise-2 {
  0% { transform: translateY(0) scaleX(1); opacity: 0; }
  20% { opacity: 0.8; }
  60% { transform: translateY(-8px) scaleX(1.2) translateX(-1.5px); opacity: 0.4; }
  100% { transform: translateY(-15px) scaleX(1.4) translateX(1px); opacity: 0; }
}

.steam-path-1 {
  animation: steam-rise-1 2.2s infinite ease-out;
  transform-origin: center bottom;
}

.steam-path-2 {
  animation: steam-rise-2 2.6s infinite ease-out 0.7s;
  transform-origin: center bottom;
}

/* ---------------- MODAL BACKDROP & CONTAINER ---------------- */
.chai-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483645;
  background: rgba(15, 10, 8, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.chai-backdrop.open {
  opacity: 1;
  pointer-events: auto;
}

.chai-modal {
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  background: var(--chai-bg);
  border: 1px solid var(--chai-border);
  border-radius: var(--chai-radius);
  box-shadow: var(--chai-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateY(20px) scale(0.96);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.chai-backdrop.open .chai-modal {
  transform: translateY(0) scale(1);
}

/* Inline Card Mode */
.chai-inline-card {
  width: 100%;
  max-width: 480px;
  background: var(--chai-bg);
  border: 1px solid var(--chai-border);
  border-radius: var(--chai-radius);
  box-shadow: var(--chai-shadow);
  overflow: hidden;
  margin: 16px 0;
}

/* ---------------- HEADER ---------------- */
.chai-header {
  padding: 18px 20px 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--chai-border);
  background: linear-gradient(180deg, rgba(233, 174, 91, 0.08) 0%, transparent 100%);
}

.chai-header-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chai-header-cup {
  width: 36px;
  height: 36px;
  border-radius: var(--chai-radius-sm);
  background: var(--chai-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--chai-border);
  flex-shrink: 0;
}

.chai-header-titles {
  display: flex;
  flex-direction: column;
}

.chai-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--chai-text);
  line-height: 1.25;
}

.chai-subtitle {
  font-size: 12px;
  color: var(--chai-text-muted);
  margin-top: 2px;
}

.chai-close-btn {
  background: transparent;
  border: 1px solid transparent;
  color: var(--chai-text-muted);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.chai-close-btn:hover {
  background: var(--chai-surface);
  color: var(--chai-text);
  border-color: var(--chai-border);
}

.chai-close-btn:focus-visible {
  outline: 2px solid var(--chai-accent);
}

/* ---------------- BODY & SECTIONS ---------------- */
.chai-body {
  padding: 18px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.chai-section-label {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--chai-text-muted);
  margin-bottom: 8px;
}

/* ---------------- 3D STAGE (OPTIONAL) ---------------- */
.chai-3d-stage {
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, rgba(233, 174, 91, 0.15) 0%, rgba(43, 29, 22, 0.4) 65%, transparent 100%);
  border-radius: var(--chai-radius-sm);
  margin-bottom: 2px;
  border: 1px solid var(--chai-border);
  overflow: hidden;
  position: relative;
}

.chai-3d-canvas {
  width: 100%;
  height: 100%;
  touch-action: none;
  cursor: grab;
}

.chai-3d-canvas:active {
  cursor: grabbing;
}

/* ---------------- TIERS GRID ---------------- */
.chai-tiers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.chai-tier-card {
  background: var(--chai-surface);
  border: 1px solid var(--chai-border);
  border-radius: var(--chai-radius-sm);
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  user-select: none;
  outline: none;
}

.chai-tier-card:hover {
  background: var(--chai-surface-hover);
  border-color: var(--chai-border-hover);
  transform: translateY(-2px);
}

.chai-tier-card.selected {
  border-color: var(--chai-accent);
  background: linear-gradient(180deg, rgba(233, 174, 91, 0.12) 0%, var(--chai-surface) 100%);
  box-shadow: 0 0 16px rgba(233, 174, 91, 0.2);
}

.chai-tier-card:focus-visible {
  outline: 2px solid var(--chai-accent);
  outline-offset: 2px;
}

.chai-tier-icon {
  width: 44px;
  height: 44px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chai-tier-name {
  font-size: 13px;
  font-weight: 600;
  color: var(--chai-text);
}

.chai-tier-amount {
  font-size: 15px;
  font-weight: 700;
  color: var(--chai-accent);
  margin-top: 2px;
}

.chai-tier-desc {
  font-size: 11px;
  color: var(--chai-text-muted);
  margin-top: 4px;
  line-height: 1.25;
}

/* ---------------- CUSTOM AMOUNT INPUT ---------------- */
.chai-custom-amount-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.chai-input-group {
  display: flex;
  align-items: center;
  background: var(--chai-surface);
  border: 1px solid var(--chai-border);
  border-radius: var(--chai-radius-sm);
  padding: 0 12px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.chai-input-group:focus-within {
  border-color: var(--chai-accent);
  box-shadow: 0 0 0 2px rgba(233, 174, 91, 0.25);
}

.chai-input-symbol {
  font-size: 16px;
  font-weight: 700;
  color: var(--chai-accent);
  margin-right: 6px;
}

.chai-amount-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--chai-text);
  font-family: var(--chai-font);
  font-size: 15px;
  font-weight: 600;
  padding: 10px 0;
  width: 100%;
}

.chai-input-error {
  font-size: 11px;
  color: #EF4444;
  margin-top: 2px;
}

/* ---------------- PAYMENT PANEL ---------------- */
.chai-payment-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  background: var(--chai-surface);
  border: 1px solid var(--chai-border);
  border-radius: var(--chai-radius-sm);
  padding: 16px;
  text-align: center;
}

.chai-qr-frame {
  position: relative;
  background: var(--chai-qr-bg);
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.chai-qr-frame:hover {
  transform: scale(1.02);
}

.chai-qr-frame svg {
  display: block;
  border-radius: 6px;
}

.chai-demo-qr-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(27, 20, 16, 0.68);
  border-radius: 12px;
  backdrop-filter: blur(2px);
  pointer-events: none;
}

.chai-demo-tag {
  background: #E9AE5B;
  color: #1B1410;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  padding: 6px 12px;
  border-radius: 999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  text-transform: uppercase;
  text-align: center;
}

.chai-qr-actions {
  display: flex;
  gap: 8px;
  width: 100%;
  justify-content: center;
}

.chai-btn-secondary {
  background: transparent;
  border: 1px solid var(--chai-border);
  color: var(--chai-text);
  border-radius: var(--chai-radius-sm);
  padding: 7px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s ease;
}

.chai-btn-secondary:hover {
  background: var(--chai-surface-hover);
  border-color: var(--chai-border-hover);
}

.chai-btn-secondary:focus-visible {
  outline: 2px solid var(--chai-accent);
}

.chai-btn-primary {
  width: 100%;
  background: var(--chai-accent);
  color: var(--chai-accent-text);
  border: none;
  border-radius: var(--chai-radius-sm);
  padding: 12px 18px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 4px 14px rgba(233, 174, 91, 0.35);
  transition: transform 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
  outline: none;
}

.chai-btn-primary:hover {
  background: var(--chai-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(233, 174, 91, 0.45);
}

.chai-btn-primary:active {
  transform: translateY(0);
}

.chai-btn-primary:focus-visible {
  outline: 2px solid var(--chai-accent);
  outline-offset: 2px;
}

.chai-btn-demo-disabled {
  background: var(--chai-surface) !important;
  color: var(--chai-text-muted) !important;
  border: 1px dashed var(--chai-border-hover) !important;
  box-shadow: none !important;
  cursor: not-allowed !important;
}

.chai-btn-demo-disabled:hover {
  background: var(--chai-surface-hover) !important;
  color: var(--chai-text) !important;
  transform: none !important;
  box-shadow: none !important;
}

.chai-upi-details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
}

.chai-upi-label {
  color: var(--chai-text-muted);
}

.chai-upi-value {
  font-family: monospace;
  font-weight: 600;
  color: var(--chai-text);
}

/* ---------------- HONEST PAYMENT DISCLAIMER ---------------- */
.chai-disclaimer {
  font-size: 11px;
  color: var(--chai-text-muted);
  line-height: 1.4;
  padding: 4px 6px;
  text-align: center;
}

.chai-disclaimer strong {
  color: var(--chai-text);
}

/* ---------------- TOAST NOTIFICATION ---------------- */
.chai-toast {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  background: #10B981;
  color: #FFFFFF;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  z-index: 10;
}

.chai-toast.visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* ---------------- REDUCED MOTION ---------------- */
@media (prefers-reduced-motion: reduce) {
  .steam-path-1, .steam-path-2 {
    animation: none !important;
    opacity: 0.6;
  }
  .chai-launcher-btn,
  .chai-backdrop,
  .chai-modal,
  .chai-tier-card,
  .chai-btn-primary,
  .chai-qr-frame,
  .chai-toast {
    transition: opacity 0.05s linear !important;
    transform: none !important;
  }
}

/* ---------------- MOBILE RESPONSIVENESS ---------------- */
@media (max-width: 480px) {
  .chai-backdrop {
    padding: 0;
    align-items: flex-end;
  }

  .chai-modal {
    max-width: 100%;
    max-height: 85vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .chai-header {
    padding: 16px 18px 12px 18px;
  }

  .chai-body {
    padding: 14px 16px 24px 16px;
  }
}
`,de=typeof HTMLElement<"u"?HTMLElement:class{};class yt extends de{constructor(){super();l(this,"config",{creatorName:"",upiId:"",theme:"classic",position:"bottom-right",buttonText:"Buy Me a Chai ☕"});l(this,"shadow");l(this,"launcher",null);l(this,"modal",null);l(this,"focusTrap",null);l(this,"announcer",null);l(this,"paymentState","idle");l(this,"escapeListener",null);l(this,"isRendered",!1);typeof this.attachShadow=="function"?this.shadow=this.attachShadow({mode:"open"}):this.shadow=null}static get observedAttributes(){return["creator-name","payment-payee-name","payee-name","upi-id","description","theme","position","button-text","accent-color","headless","min-amount","max-amount","default-tier","note","enable-3d","demo-mode","tiers","suggested-amounts"]}connectedCallback(){this.readAttributes(),this.render()}disconnectedCallback(){this.cleanup()}attributeChangedCallback(e,i,n){i===n||!this.isRendered||(this.readAttributes(),this.render())}open(){var e,i;this.modal&&(this.modal.open(),this.paymentState="modal_open",this.focusTrap&&this.focusTrap.activate((e=this.launcher)==null?void 0:e.getButtonElement()),(i=this.announcer)==null||i.announce(`Opened support modal for ${this.config.creatorName}`),this.dispatchChaiEvent("chai:opened",{creatorName:this.config.creatorName}))}close(){var e;this.modal&&(this.modal.close(),this.paymentState="closed",this.focusTrap&&this.focusTrap.deactivate(),(e=this.announcer)==null||e.announce("Closed support modal"),this.dispatchChaiEvent("chai:closed",{}))}updateConfig(e){this.config={...this.config,...e},this.render()}setAmount(e){this.modal&&this.modal.setAmount(e)}destroy(){this.cleanup(),this.remove()}readAttributes(){const e=this.getAttribute("creator-name")||this.config.creatorName||"",i=this.getAttribute("payment-payee-name")||this.getAttribute("payee-name")||this.config.paymentPayeeName,n=this.getAttribute("upi-id")||this.config.upiId||"",r=this.getAttribute("description")||this.config.description,o=this.getAttribute("theme")||this.config.theme||"classic",s=this.getAttribute("position")||this.config.position||"bottom-right",c=this.getAttribute("button-text")||this.config.buttonText||"Buy Me a Chai ☕",h=this.getAttribute("accent-color")||this.config.accentColor,p=this.hasAttribute("headless")||this.config.headless||!1,u=this.getAttribute("note")||this.config.note,d=this.getAttribute("default-tier")||this.config.defaultTierId,f=this.hasAttribute("enable-3d")||!!this.config.enable3D,g=this.hasAttribute("demo-mode")||!!this.config.demoMode;let y=this.config.tiers;const x=this.getAttribute("tiers");if(x)try{y=JSON.parse(x)}catch(v){console.warn("ChaiKit: Could not parse tiers JSON attribute",v)}else{const v=this.getAttribute("suggested-amounts");if(v){const M=v.split(",").map(w=>parseInt(w.trim(),10)*100).filter(w=>!isNaN(w)&&w>0);if(M.length>0){const w=["cutting","kadak","tandoori","premium"],S=["Cutting Chai","Kadak Chai","Tandoori Chai","Premium Chai"];y=M.slice(0,4).map((R,T)=>({id:w[T]||`tier-${T+1}`,name:S[T]||`Chai Tier ${T+1}`,amountPaise:R,icon:w[T]||"kadak",description:`Support with ${A(R)}`}))}}}const P=this.getAttribute("min-amount"),E=this.getAttribute("max-amount"),$=P?parseInt(P,10)*100:this.config.minAmountPaise??B,b=E?parseInt(E,10)*100:this.config.maxAmountPaise??N;this.config={...this.config,creatorName:e,paymentPayeeName:i,upiId:n,description:r,theme:o,position:s,buttonText:c,accentColor:h,headless:p,note:u,defaultTierId:d,enable3D:f,demoMode:g,tiers:y,minAmountPaise:$,maxAmountPaise:b}}render(){this.cleanup(),this.shadow.innerHTML="",this.config.theme&&this.setAttribute("theme",this.config.theme),this.config.accentColor&&this.style.setProperty("--chai-accent",this.config.accentColor);const e=et(this.config);if(!e.valid){const r=`ChaiKit configuration error: ${e.errors.join(" ")}`;console.error(r),this.dispatchChaiEvent("chai:error",{message:r,code:"INVALID_CONFIG"})}const i=document.createElement("style");i.textContent=he,this.shadow.appendChild(i),this.announcer=new Kt(this.shadow);const n=this.config.position==="inline";this.modal=new le({creatorName:this.config.creatorName||"Creator",paymentPayeeName:this.config.paymentPayeeName,upiId:this.config.upiId||"creator@upi",description:this.config.description,tiers:this.config.tiers||U,defaultTierId:this.config.defaultTierId,allowCustomAmount:this.config.allowCustomAmount!==!1,minAmountPaise:this.config.minAmountPaise,maxAmountPaise:this.config.maxAmountPaise,note:this.config.note,enable3D:this.config.enable3D,demoMode:this.config.demoMode,isInline:n,onClose:()=>this.close(),onTierSelected:r=>{var o;this.paymentState="tier_selected",(o=this.announcer)==null||o.announce(`Selected ${r.name} for ${A(r.amountPaise)}`),this.dispatchChaiEvent("chai:tier-selected",{tier:r,amountPaise:r.amountPaise})},onAmountChanged:r=>{this.dispatchChaiEvent("chai:amount-changed",{amountPaise:r,formattedRupees:A(r)})},onHandoffAttempt:r=>{this.paymentState="handoff_attempted",this.dispatchChaiEvent("chai:upi-handoff-attempted",{upiUri:r,timestamp:Date.now()})}}),n?this.shadow.appendChild(this.modal.getBackdropElement()):(this.config.headless||(this.launcher=new ae({buttonText:this.config.buttonText||"Buy Me a Chai ☕",position:this.config.position||"bottom-right",onOpen:()=>this.open()}),this.shadow.appendChild(this.launcher.getElement())),this.shadow.appendChild(this.modal.getBackdropElement()),this.focusTrap=new Wt(this.modal.getModalElement()),this.escapeListener=r=>{var o;r.key==="Escape"&&((o=this.modal)!=null&&o.isOpen())&&this.close()},window.addEventListener("keydown",this.escapeListener)),this.isRendered=!0}dispatchChaiEvent(e,i){const n=new CustomEvent(e,{bubbles:!0,composed:!0,detail:i});this.dispatchEvent(n)}cleanup(){this.modal&&this.modal.destroy(),this.escapeListener&&(window.removeEventListener("keydown",this.escapeListener),this.escapeListener=null),this.focusTrap&&(this.focusTrap.deactivate(),this.focusTrap=null)}}typeof window<"u"&&"customElements"in window&&(customElements.get("chai-support")||customElements.define("chai-support",yt));function ue(a,t){if(typeof document>"u")return null;const e=t||document.body,i=document.createElement("chai-support");return a.creatorName&&i.setAttribute("creator-name",a.creatorName),a.paymentPayeeName&&i.setAttribute("payment-payee-name",a.paymentPayeeName),a.upiId&&i.setAttribute("upi-id",a.upiId),a.description&&i.setAttribute("description",a.description),a.theme&&i.setAttribute("theme",a.theme),a.position&&i.setAttribute("position",a.position),a.buttonText&&i.setAttribute("button-text",a.buttonText),a.accentColor&&i.setAttribute("accent-color",a.accentColor),a.headless&&i.setAttribute("headless",""),a.note&&i.setAttribute("note",a.note),a.defaultTierId&&i.setAttribute("default-tier",a.defaultTierId),a.enable3D&&i.setAttribute("enable-3d",""),a.demoMode&&i.setAttribute("demo-mode",""),e.appendChild(i),i}class pe{constructor(t,e){l(this,"container");l(this,"canvas");l(this,"gl",null);l(this,"program",null);l(this,"animFrameId",null);l(this,"intersectionObserver",null);l(this,"isVisible",!0);l(this,"isDestroyed",!1);l(this,"prefersReducedMotion",!1);l(this,"targetRotationX",.2);l(this,"targetRotationY",0);l(this,"currentRotationX",.2);l(this,"currentRotationY",0);l(this,"currentTier","kadak");l(this,"targetShapeFactor",1);l(this,"currentShapeFactor",1);l(this,"positionBuffer",null);l(this,"normalBuffer",null);l(this,"colorBuffer",null);l(this,"indexBuffer",null);l(this,"indexCount",0);l(this,"uMatrixLoc",null);l(this,"uLightPosLoc",null);l(this,"uTimeLoc",null);l(this,"uColorTintLoc",null);l(this,"pointerMoveHandler",null);l(this,"pointerLeaveHandler",null);var n;this.container=t,this.currentTier=e.tierId||"kadak",this.updateShapeFactorForTier(this.currentTier),this.currentShapeFactor=this.targetShapeFactor,typeof window<"u"&&window.matchMedia&&(this.prefersReducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches),this.canvas=document.createElement("canvas"),this.canvas.className="chai-3d-canvas",this.canvas.width=e.width||220,this.canvas.height=e.height||220,this.canvas.style.width="100%",this.canvas.style.height="100%",this.canvas.style.display="block",this.canvas.setAttribute("role","img"),this.canvas.setAttribute("aria-label","Interactive 3D Chai Cup");const i=this.canvas.getContext("webgl",{alpha:!0,antialias:!0,preserveDrawingBuffer:!1,powerPreference:"low-power"});if(!i){console.warn("ChaiKit 3D: WebGL not supported or disabled. Falling back to 2D."),(n=e.onFallback)==null||n.call(e);return}this.gl=i,this.initGL(),this.container.appendChild(this.canvas),this.setupInteractivity(),this.setupVisibilityObserver(),this.startRenderLoop()}setTier(t){this.currentTier=t,this.updateShapeFactorForTier(t),this.rebuildGeometry()}resize(t,e){if(!this.gl||this.isDestroyed)return;const i=Math.min(typeof window<"u"&&window.devicePixelRatio||1,1.5);this.canvas.width=Math.floor(t*i),this.canvas.height=Math.floor(e*i),this.gl.viewport(0,0,this.canvas.width,this.canvas.height)}destroy(){this.isDestroyed=!0,this.animFrameId!==null&&(cancelAnimationFrame(this.animFrameId),this.animFrameId=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),this.pointerMoveHandler&&(window.removeEventListener("mousemove",this.pointerMoveHandler),this.pointerMoveHandler=null),this.pointerLeaveHandler&&(this.canvas.removeEventListener("mouseleave",this.pointerLeaveHandler),this.pointerLeaveHandler=null),this.gl&&(this.positionBuffer&&this.gl.deleteBuffer(this.positionBuffer),this.normalBuffer&&this.gl.deleteBuffer(this.normalBuffer),this.colorBuffer&&this.gl.deleteBuffer(this.colorBuffer),this.indexBuffer&&this.gl.deleteBuffer(this.indexBuffer),this.program&&this.gl.deleteProgram(this.program)),this.canvas.parentElement&&this.canvas.parentElement.removeChild(this.canvas)}updateShapeFactorForTier(t){switch(t){case"cutting":this.targetShapeFactor=.8;break;case"kadak":this.targetShapeFactor=1;break;case"tandoori":this.targetShapeFactor=1.25;break;case"premium":this.targetShapeFactor=1.45;break;default:this.targetShapeFactor=1}}initGL(){const t=this.gl;if(!t)return;const e=`
      attribute vec3 aPosition;
      attribute vec3 aNormal;
      attribute vec3 aColor;

      uniform mat4 uMatrix;
      uniform vec3 uLightPos;

      varying vec3 vNormal;
      varying vec3 vColor;
      varying vec3 vLightDir;
      varying vec3 vViewPos;

      void main() {
        gl_Position = uMatrix * vec4(aPosition, 1.0);
        vNormal = aNormal;
        vColor = aColor;
        vLightDir = normalize(uLightPos - aPosition);
        vViewPos = gl_Position.xyz;
      }
    `,i=`
      precision mediump float;

      varying vec3 vNormal;
      varying vec3 vColor;
      varying vec3 vLightDir;
      varying vec3 vViewPos;

      uniform vec3 uColorTint;
      uniform float uTime;

      void main() {
        vec3 norm = normalize(vNormal);
        float diff = max(dot(norm, vLightDir), 0.0);

        // Ambient warmth
        vec3 ambient = vec3(0.28, 0.16, 0.11);

        // Warm directional key light
        vec3 keyLight = vec3(1.0, 0.88, 0.72) * diff * 0.85;

        // Rim highlight (cinematic golden back-light)
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        float rim = 1.0 - max(dot(viewDir, norm), 0.0);
        rim = pow(rim, 2.5) * 0.45;
        vec3 rimLight = vec3(0.95, 0.72, 0.45) * rim;

        vec3 finalColor = (vColor * uColorTint) * (ambient + keyLight) + rimLight;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `,n=this.compileShader(t.VERTEX_SHADER,e),r=this.compileShader(t.FRAGMENT_SHADER,i);if(!n||!r)return;const o=t.createProgram();if(o){if(t.attachShader(o,n),t.attachShader(o,r),t.linkProgram(o),!t.getProgramParameter(o,t.LINK_STATUS)){console.error("ChaiKit 3D shader link error:",t.getProgramInfoLog(o));return}this.program=o,t.useProgram(o),this.uMatrixLoc=t.getUniformLocation(o,"uMatrix"),this.uLightPosLoc=t.getUniformLocation(o,"uLightPos"),this.uTimeLoc=t.getUniformLocation(o,"uTime"),this.uColorTintLoc=t.getUniformLocation(o,"uColorTint"),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.enable(t.CULL_FACE),t.cullFace(t.BACK),this.rebuildGeometry()}}compileShader(t,e){const i=this.gl;if(!i)return null;const n=i.createShader(t);return n?(i.shaderSource(n,e),i.compileShader(n),i.getShaderParameter(n,i.COMPILE_STATUS)?n:(console.error("ChaiKit 3D shader compile error:",i.getShaderInfoLog(n)),i.deleteShader(n),null)):null}rebuildGeometry(){const t=this.gl;if(!t||!this.program)return;const e=28,i=16,n=[],r=[],o=[],s=[],c=this.currentTier==="cutting",h=this.currentTier==="tandoori",p=this.currentTier==="premium";let u=.78,d=.42,f=.27;c?(u=.55,d=.65,f=.7):p?(u=.91,d=.68,f=.35):h&&(u=.7,d=.34,f=.2);const g=1.6,y=c?.38:p?.48:.42,x=c?.62:p?.78:.7;for(let b=0;b<=i;b++){const v=b/i,M=(v-.5)*g;let w=y+(x-y)*Math.pow(v,.85);h?w+=Math.sin(v*Math.PI)*.08:p&&v<.2&&(w=y+.12*(1-v/.2));for(let S=0;S<=e;S++){const T=S/e*Math.PI*2,xt=Math.cos(T),wt=Math.sin(T),fe=c?Math.sin(T*8)*.025:0,At=w+fe,ge=xt*At,be=wt*At;n.push(ge,M,be);const Et=xt,Ct=(y-x)/g,kt=wt,K=Math.hypot(Et,Ct,kt);r.push(Et/K,Ct/K,kt/K);const W=.8+.4*v;o.push(u*W,d*W,f*W)}}for(let b=0;b<i;b++)for(let v=0;v<e;v++){const M=b*(e+1)+v,w=(b+1)*(e+1)+v,S=(b+1)*(e+1)+(v+1),R=b*(e+1)+(v+1);s.push(M,w,R),s.push(w,S,R)}const P=n.length/3,E=g*.5-.15,$=x-.05;n.push(0,E,0),r.push(0,1,0),o.push(.58,.29,.12);for(let b=0;b<=e;b++){const M=b/e*Math.PI*2;n.push(Math.cos(M)*$,E,Math.sin(M)*$),r.push(0,1,0),o.push(.52,.25,.1)}for(let b=0;b<e;b++)s.push(P,P+1+b,P+2+b);this.indexCount=s.length,this.positionBuffer||(this.positionBuffer=t.createBuffer()),t.bindBuffer(t.ARRAY_BUFFER,this.positionBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(n),t.STATIC_DRAW),this.normalBuffer||(this.normalBuffer=t.createBuffer()),t.bindBuffer(t.ARRAY_BUFFER,this.normalBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(r),t.STATIC_DRAW),this.colorBuffer||(this.colorBuffer=t.createBuffer()),t.bindBuffer(t.ARRAY_BUFFER,this.colorBuffer),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW),this.indexBuffer||(this.indexBuffer=t.createBuffer()),t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,this.indexBuffer),t.bufferData(t.ELEMENT_ARRAY_BUFFER,new Uint16Array(s),t.STATIC_DRAW)}setupInteractivity(){this.pointerMoveHandler=t=>{if(this.prefersReducedMotion||this.isDestroyed||!this.isVisible)return;const e=this.canvas.getBoundingClientRect(),i=e.left+e.width/2,n=e.top+e.height/2,r=(t.clientX-i)/(e.width/2),o=(t.clientY-n)/(e.height/2);this.targetRotationY=Math.max(-.4,Math.min(.4,r*.35)),this.targetRotationX=Math.max(.05,Math.min(.45,.25+o*.2))},this.pointerLeaveHandler=()=>{this.targetRotationX=.2,this.targetRotationY=0},window.addEventListener("mousemove",this.pointerMoveHandler,{passive:!0}),this.canvas.addEventListener("mouseleave",this.pointerLeaveHandler,{passive:!0})}setupVisibilityObserver(){typeof IntersectionObserver>"u"||(this.intersectionObserver=new IntersectionObserver(t=>{for(const e of t)this.isVisible=e.isIntersecting}),this.intersectionObserver.observe(this.canvas))}startRenderLoop(){const t=e=>{this.isDestroyed||(this.isVisible&&this.drawScene(e*.001),this.animFrameId=requestAnimationFrame(t))};this.animFrameId=requestAnimationFrame(t)}drawScene(t){const e=this.gl;if(!e||!this.program||this.indexCount===0)return;e.viewport(0,0,this.canvas.width,this.canvas.height),e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);const i=this.prefersReducedMotion?1:.08;this.currentRotationX+=(this.targetRotationX-this.currentRotationX)*i,this.currentRotationY+=(this.targetRotationY-this.currentRotationY)*i;const n=this.prefersReducedMotion?0:Math.sin(t*1.5)*.08,r=this.currentRotationY+n,o=this.canvas.width/this.canvas.height,s=this.createModelViewProjectionMatrix(o,this.currentRotationX,r);e.useProgram(this.program),this.uMatrixLoc&&e.uniformMatrix4fv(this.uMatrixLoc,!1,s),this.uLightPosLoc&&e.uniform3f(this.uLightPosLoc,1.5,3,2.5),this.uTimeLoc&&e.uniform1f(this.uTimeLoc,t),this.uColorTintLoc&&e.uniform3f(this.uColorTintLoc,1,1,1);const c=e.getAttribLocation(this.program,"aPosition");e.bindBuffer(e.ARRAY_BUFFER,this.positionBuffer),e.enableVertexAttribArray(c),e.vertexAttribPointer(c,3,e.FLOAT,!1,0,0);const h=e.getAttribLocation(this.program,"aNormal");e.bindBuffer(e.ARRAY_BUFFER,this.normalBuffer),e.enableVertexAttribArray(h),e.vertexAttribPointer(h,3,e.FLOAT,!1,0,0);const p=e.getAttribLocation(this.program,"aColor");e.bindBuffer(e.ARRAY_BUFFER,this.colorBuffer),e.enableVertexAttribArray(p),e.vertexAttribPointer(p,3,e.FLOAT,!1,0,0),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this.indexBuffer),e.drawElements(e.TRIANGLES,this.indexCount,e.UNSIGNED_SHORT,0)}createModelViewProjectionMatrix(t,e,i){const n=45*Math.PI/180,r=.1,o=100,s=1/Math.tan(n/2),c=new Float32Array([s/t,0,0,0,0,s,0,0,0,0,(o+r)/(r-o),-1,0,0,2*o*r/(r-o),0]),h=Math.cos(e),p=Math.sin(e),u=Math.cos(i),d=Math.sin(i),f=new Float32Array([u,p*d,-h*d,0,0,h,p,0,d,-p*u,h*u,0,0,-.2,-3.6,1]),g=new Float32Array(16);for(let y=0;y<4;y++)for(let x=0;x<4;x++){let P=0;for(let E=0;E<4;E++)P+=c[E*4+x]*f[y*4+E];g[y*4+x]=P}return g}}const me=Object.freeze(Object.defineProperty({__proto__:null,Chai3DView:pe},Symbol.toStringTag,{value:"Module"}));return m.ChaiSupportElement=yt,m.DEFAULT_MAX_AMOUNT_PAISE=N,m.DEFAULT_MIN_AMOUNT_PAISE=B,m.DEFAULT_TIERS=U,m.attemptUpiHandoff=nt,m.buildUpiUri=it,m.formatRupees=A,m.formatUpiAmount=J,m.generateQrSvg=X,m.isMobileDevice=at,m.mountChaiKit=ue,m.paiseToRupees=Ft,m.parseUpiUri=Mt,m.rupeesToPaise=Z,m.sanitizeText=H,m.svgToDataUrl=gt,m.validateAmount=tt,m.validateConfig=et,m.validateUpiId=G,Object.defineProperty(m,Symbol.toStringTag,{value:"Module"}),m})({});
//# sourceMappingURL=chaikit.iife.js.map
