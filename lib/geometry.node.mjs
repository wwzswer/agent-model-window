// 由 build/build-node.mjs 生成：three + 几何内核内联，server.mjs 直接 import。
var Gg=Object.defineProperty;var jh=(s,e)=>()=>(s&&(e=s(s=0)),e);var kd=(s,e)=>{for(var t in e)Gg(s,t,{get:e[t],enumerable:!0})};function hn(){let s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Bt[s&255]+Bt[s>>8&255]+Bt[s>>16&255]+Bt[s>>24&255]+"-"+Bt[e&255]+Bt[e>>8&255]+"-"+Bt[e>>16&15|64]+Bt[e>>24&255]+"-"+Bt[t&63|128]+Bt[t>>8&255]+"-"+Bt[t>>16&255]+Bt[t>>24&255]+Bt[n&255]+Bt[n>>8&255]+Bt[n>>16&255]+Bt[n>>24&255]).toLowerCase()}function Fe(s,e,t){return Math.max(e,Math.min(t,s))}function kf(s,e){return(s%e+e)%e}function Wg(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function Xg(s,e,t){return s!==e?(t-s)/(e-s):0}function mo(s,e,t){return(1-t)*s+t*e}function qg(s,e,t,n){return mo(s,e,1-Math.exp(-t*n))}function Yg(s,e=1){return e-Math.abs(kf(s,e*2)-e)}function Zg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function Jg(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function $g(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Kg(s,e){return s+Math.random()*(e-s)}function jg(s){return s*(.5-Math.random())}function Qg(s){s!==void 0&&(Vd=s);let e=Vd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function e_(s){return s*ls}function t_(s){return s*ds}function n_(s){return(s&s-1)===0&&s!==0}function i_(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function s_(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function r_(s,e,t,n,i){let r=Math.cos,o=Math.sin,a=r(t/2),c=o(t/2),l=r((e+n)/2),h=o((e+n)/2),u=r((e-n)/2),d=o((e-n)/2),f=r((n-e)/2),m=o((n-e)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*m,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*m,a*l);break;case"ZYZ":s.set(c*m,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Xt(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Xe(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}function Vf(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ar(s,e){return new o_[s](e)}function fr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Hf(){let s=fr("canvas");return s.style.display="block",s}function dr(s){s in Gd||(Gd[s]=!0,console.warn(s))}function Um(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function a_(){let s={enabled:!0,workingColorSpace:Di,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===lt&&(i.r=oi(i.r),i.g=oi(i.g),i.b=oi(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===lt&&(i.r=cr(i.r),i.g=cr(i.g),i.b=cr(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===En?hr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return dr("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return dr("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Di]:{primaries:e,whitePoint:n,transfer:hr,toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:e,whitePoint:n,transfer:lt,toXYZ:Wd,fromXYZ:Xd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}}),s}function oi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function cr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}function tu(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?ps.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function iu(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Ki.fromArray(s,r);let a=i.x*Math.abs(Ki.x)+i.y*Math.abs(Ki.y)+i.z*Math.abs(Ki.z),c=e.dot(Ki),l=t.dot(Ki),h=n.dot(Ki);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}function gu(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}function x_(){let s=new ArrayBuffer(4),e=new Float32Array(s),t=new Uint32Array(s),n=new Uint32Array(512),i=new Uint32Array(512);for(let c=0;c<256;++c){let l=c-127;l<-27?(n[c]=0,n[c|256]=32768,i[c]=24,i[c|256]=24):l<-14?(n[c]=1024>>-l-14,n[c|256]=1024>>-l-14|32768,i[c]=-l-1,i[c|256]=-l-1):l<=15?(n[c]=l+15<<10,n[c|256]=l+15<<10|32768,i[c]=13,i[c|256]=13):l<128?(n[c]=31744,n[c|256]=64512,i[c]=24,i[c|256]=24):(n[c]=31744,n[c|256]=64512,i[c]=13,i[c|256]=13)}let r=new Uint32Array(2048),o=new Uint32Array(64),a=new Uint32Array(64);for(let c=1;c<1024;++c){let l=c<<13,h=0;for(;(l&8388608)===0;)l<<=1,h-=8388608;l&=-8388609,h+=947912704,r[c]=l|h}for(let c=1024;c<2048;++c)r[c]=939524096+(c-1024<<13);for(let c=1;c<31;++c)o[c]=c<<23;o[31]=1199570944,o[32]=2147483648;for(let c=33;c<63;++c)o[c]=2147483648+(c-32<<23);o[63]=3347054592;for(let c=1;c<64;++c)c!==32&&(a[c]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:r,exponentTable:o,offsetTable:a}}function jt(s){Math.abs(s)>65504&&console.warn("THREE.DataUtils.toHalfFloat(): Value out of range."),s=Fe(s,-65504,65504),ri.floatView[0]=s;let e=ri.uint32View[0],t=e>>23&511;return ri.baseTable[t]+((e&8388607)>>ri.shiftTable[t])}function uo(s){let e=s>>10;return ri.uint32View[0]=ri.mantissaTable[ri.offsetTable[e]+(s&1023)]+ri.exponentTable[e],ri.floatView[0]}function M_(s,e,t,n,i,r,o,a){let c;if(e.side===Vt?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,e.side===Wn,a),c===null)return null;Bc.copy(a),Bc.applyMatrix4(s.matrixWorld);let l=t.ray.origin.distanceTo(Bc);return l<t.near||l>t.far?null:{distance:l,point:Bc.clone(),object:s}}function zc(s,e,t,n,i,r,o,a,c,l){s.getVertexPosition(a,Uc),s.getVertexPosition(c,Nc),s.getVertexPosition(l,Fc);let h=M_(s,e,t,n,Uc,Nc,Fc,np);if(h){let u=new R;Pn.getBarycoord(np,Uc,Nc,Fc,u),i&&(h.uv=Pn.getInterpolatedAttribute(i,a,c,l,u,new K)),r&&(h.uv1=Pn.getInterpolatedAttribute(r,a,c,l,u,new K)),o&&(h.normal=Pn.getInterpolatedAttribute(o,a,c,l,u,new R),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:c,c:l,normal:new R,materialIndex:0};Pn.getNormal(Uc,Nc,Fc,d.normal),h.face=d,h.barycoord=u}return h}function Ns(s){let e={};for(let t in s){e[t]={};for(let n in s[t]){let i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Ht(s){let e={};for(let t=0;t<s.length;t++){let n=Ns(s[t]);for(let i in n)e[i]=n[i]}return e}function S_(s){let e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Gf(s){let e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:tt.workingColorSpace}function Hc(s,e,t,n,i,r){nr.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(so.x=r*nr.x-i*nr.y,so.y=i*nr.x+r*nr.y):so.copy(nr),s.copy(e),s.x+=so.x,s.y+=so.y,s.applyMatrix4(Fm)}function bu(s,e){return s-e}function L_(s,e){return s.z-e.z}function D_(s,e){return e.z-s.z}function O_(s,e,t=0){let n=e.itemSize;if(s.isInterleavedBufferAttribute||s.array.constructor!==e.array.constructor){let i=s.count;for(let r=0;r<i;r++)for(let o=0;o<n;o++)e.setComponent(r+t,o,s.getComponent(r,o))}else e.array.set(s.array,t*n);e.needsUpdate=!0}function ts(s,e){if(s.constructor!==e.constructor){let t=Math.min(s.length,e.length);for(let n=0;n<t;n++)e[n]=s[n]}else{let t=Math.min(s.length,e.length);e.set(new s.constructor(s.buffer,0,t))}}function $c(s,e,t,n,i,r,o){let a=s.geometry.attributes.position;if(bl.fromBufferAttribute(a,i),Tl.fromBufferAttribute(a,r),t.distanceSqToSegment(bl,Tl,Eu,yp)>n)return;Eu.applyMatrix4(s.matrixWorld);let l=e.ray.origin.distanceTo(Eu);if(!(l<e.near||l>e.far))return{distance:l,point:yp.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}function bp(s,e,t,n,i,r,o){let a=Bu.distanceSqToPoint(s);if(a<t){let c=new R;Bu.closestPointToPoint(s,c),c.applyMatrix4(n);let l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}function Xf(){let s=0,e=0,t=0,n=0;function i(r,o,a,c){s=r,e=a,t=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){let o=r*r,a=o*r;return s+e*r+t*o+n*a}}}function Tp(s,e,t,n,i){let r=(n-e)*.5,o=(i-t)*.5,a=s*s,c=s*a;return(2*t-2*n+r+o)*c+(-3*t+3*n-2*r-o)*a+r*s+t}function B_(s,e){let t=1-s;return t*t*e}function z_(s,e){return 2*(1-s)*s*e}function k_(s,e){return s*s*e}function go(s,e,t,n){return B_(s,e)+z_(s,t)+k_(s,n)}function V_(s,e){let t=1-s;return t*t*t*e}function H_(s,e){let t=1-s;return 3*t*t*s*e}function G_(s,e){return 3*(1-s)*s*s*e}function W_(s,e){return s*s*s*e}function _o(s,e,t,n,i){return V_(s,e)+H_(s,t)+G_(s,n)+W_(s,i)}function X_(s,e,t=2){let n=e&&e.length,i=n?e[0]*t:s.length,r=Om(s,0,i,t,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l;if(n&&(r=$_(s,e,r,t)),s.length>80*t){a=1/0,c=1/0;let h=-1/0,u=-1/0;for(let d=t;d<i;d+=t){let f=s[d],m=s[d+1];f<a&&(a=f),m<c&&(c=m),f>h&&(h=f),m>u&&(u=m)}l=Math.max(h-a,u-c),l=l!==0?32767/l:0}return Vo(r,o,t,a,c,l,0),o}function Om(s,e,t,n,i){let r;if(i===a0(s,e,t,n)>0)for(let o=e;o<t;o+=n)r=Ep(o/n|0,s[o],s[o+1],r);else for(let o=t-n;o>=e;o-=n)r=Ep(o/n|0,s[o],s[o+1],r);return r&&Ar(r,r.next)&&(Go(r),r=r.next),r}function Ts(s,e){if(!s)return s;e||(e=s);let t=s,n;do if(n=!1,!t.steiner&&(Ar(t,t.next)||_t(t.prev,t,t.next)===0)){if(Go(t),t=e=t.prev,t===t.next)break;n=!0}else t=t.next;while(n||t!==e);return e}function Vo(s,e,t,n,i,r,o){if(!s)return;!o&&r&&t0(s,n,i,r);let a=s;for(;s.prev!==s.next;){let c=s.prev,l=s.next;if(r?Y_(s,n,i,r):q_(s)){e.push(c.i,s.i,l.i),Go(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=Z_(Ts(s),e),Vo(s,e,t,n,i,r,2)):o===2&&J_(s,e,t,n,i,r):Vo(Ts(s),e,t,n,i,r,1);break}}}function q_(s){let e=s.prev,t=s,n=s.next;if(_t(e,t,n)>=0)return!1;let i=e.x,r=t.x,o=n.x,a=e.y,c=t.y,l=n.y,h=Math.min(i,r,o),u=Math.min(a,c,l),d=Math.max(i,r,o),f=Math.max(a,c,l),m=n.next;for(;m!==e;){if(m.x>=h&&m.x<=d&&m.y>=u&&m.y<=f&&fo(i,a,r,c,o,l,m.x,m.y)&&_t(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function Y_(s,e,t,n){let i=s.prev,r=s,o=s.next;if(_t(i,r,o)>=0)return!1;let a=i.x,c=r.x,l=o.x,h=i.y,u=r.y,d=o.y,f=Math.min(a,c,l),m=Math.min(h,u,d),_=Math.max(a,c,l),g=Math.max(h,u,d),p=zu(f,m,e,t,n),y=zu(_,g,e,t,n),v=s.prevZ,x=s.nextZ;for(;v&&v.z>=p&&x&&x.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&fo(a,h,c,u,l,d,v.x,v.y)&&_t(v.prev,v,v.next)>=0||(v=v.prevZ,x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&fo(a,h,c,u,l,d,x.x,x.y)&&_t(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;v&&v.z>=p;){if(v.x>=f&&v.x<=_&&v.y>=m&&v.y<=g&&v!==i&&v!==o&&fo(a,h,c,u,l,d,v.x,v.y)&&_t(v.prev,v,v.next)>=0)return!1;v=v.prevZ}for(;x&&x.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=m&&x.y<=g&&x!==i&&x!==o&&fo(a,h,c,u,l,d,x.x,x.y)&&_t(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function Z_(s,e){let t=s;do{let n=t.prev,i=t.next.next;!Ar(n,i)&&zm(n,t,t.next,i)&&Ho(n,i)&&Ho(i,n)&&(e.push(n.i,t.i,i.i),Go(t),Go(t.next),t=s=i),t=t.next}while(t!==s);return Ts(t)}function J_(s,e,t,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&s0(o,a)){let c=km(o,a);o=Ts(o,o.next),c=Ts(c,c.next),Vo(o,e,t,n,i,r,0),Vo(c,e,t,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function $_(s,e,t,n){let i=[];for(let r=0,o=e.length;r<o;r++){let a=e[r]*n,c=r<o-1?e[r+1]*n:s.length,l=Om(s,a,c,n,!1);l===l.next&&(l.steiner=!0),i.push(i0(l))}i.sort(K_);for(let r=0;r<i.length;r++)t=j_(i[r],t);return t}function K_(s,e){let t=s.x-e.x;if(t===0&&(t=s.y-e.y,t===0)){let n=(s.next.y-s.y)/(s.next.x-s.x),i=(e.next.y-e.y)/(e.next.x-e.x);t=n-i}return t}function j_(s,e){let t=Q_(s,e);if(!t)return e;let n=km(t,s);return Ts(n,n.next),Ts(t,t.next)}function Q_(s,e){let t=e,n=s.x,i=s.y,r=-1/0,o;if(Ar(s,t))return t;do{if(Ar(s,t.next))return t.next;if(i<=t.y&&i>=t.next.y&&t.next.y!==t.y){let u=t.x+(i-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=n&&u>r&&(r=u,o=t.x<t.next.x?t:t.next,u===n))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,c=o.x,l=o.y,h=1/0;t=o;do{if(n>=t.x&&t.x>=c&&n!==t.x&&Bm(i<l?n:r,i,c,l,i<l?r:n,i,t.x,t.y)){let u=Math.abs(i-t.y)/(n-t.x);Ho(t,s)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&e0(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function e0(s,e){return _t(s.prev,s,e.prev)<0&&_t(e.next,s,s.next)<0}function t0(s,e,t,n){let i=s;do i.z===0&&(i.z=zu(i.x,i.y,e,t,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,n0(i)}function n0(s){let e,t=1;do{let n=s,i;s=null;let r=null;for(e=0;n;){e++;let o=n,a=0;for(let l=0;l<t&&(a++,o=o.nextZ,!!o);l++);let c=t;for(;a>0||c>0&&o;)a!==0&&(c===0||!o||n.z<=o.z)?(i=n,n=n.nextZ,a--):(i=o,o=o.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;n=o}r.nextZ=null,t*=2}while(e>1);return s}function zu(s,e,t,n,i){return s=(s-t)*i|0,e=(e-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,s|e<<1}function i0(s){let e=s,t=s;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==s);return t}function Bm(s,e,t,n,i,r,o,a){return(i-o)*(e-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(t-o)*(e-a)&&(t-o)*(r-a)>=(i-o)*(n-a)}function fo(s,e,t,n,i,r,o,a){return!(s===o&&e===a)&&Bm(s,e,t,n,i,r,o,a)}function s0(s,e){return s.next.i!==e.i&&s.prev.i!==e.i&&!r0(s,e)&&(Ho(s,e)&&Ho(e,s)&&o0(s,e)&&(_t(s.prev,s,e.prev)||_t(s,e.prev,e))||Ar(s,e)&&_t(s.prev,s,s.next)>0&&_t(e.prev,e,e.next)>0)}function _t(s,e,t){return(e.y-s.y)*(t.x-e.x)-(e.x-s.x)*(t.y-e.y)}function Ar(s,e){return s.x===e.x&&s.y===e.y}function zm(s,e,t,n){let i=sl(_t(s,e,t)),r=sl(_t(s,e,n)),o=sl(_t(t,n,s)),a=sl(_t(t,n,e));return!!(i!==r&&o!==a||i===0&&il(s,t,e)||r===0&&il(s,n,e)||o===0&&il(t,s,n)||a===0&&il(t,e,n))}function il(s,e,t){return e.x<=Math.max(s.x,t.x)&&e.x>=Math.min(s.x,t.x)&&e.y<=Math.max(s.y,t.y)&&e.y>=Math.min(s.y,t.y)}function sl(s){return s>0?1:s<0?-1:0}function r0(s,e){let t=s;do{if(t.i!==s.i&&t.next.i!==s.i&&t.i!==e.i&&t.next.i!==e.i&&zm(t,t.next,s,e))return!0;t=t.next}while(t!==s);return!1}function Ho(s,e){return _t(s.prev,s,s.next)<0?_t(s,e,s.next)>=0&&_t(s,s.prev,e)>=0:_t(s,e,s.prev)<0||_t(s,s.next,e)<0}function o0(s,e){let t=s,n=!1,i=(s.x+e.x)/2,r=(s.y+e.y)/2;do t.y>r!=t.next.y>r&&t.next.y!==t.y&&i<(t.next.x-t.x)*(r-t.y)/(t.next.y-t.y)+t.x&&(n=!n),t=t.next;while(t!==s);return n}function km(s,e){let t=ku(s.i,s.x,s.y),n=ku(e.i,e.x,e.y),i=s.next,r=e.prev;return s.next=e,e.prev=s,t.next=i,i.prev=t,n.next=t,t.prev=n,r.next=n,n.prev=r,n}function Ep(s,e,t,n){let i=ku(s,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Go(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function ku(s,e,t){return{i:s,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function a0(s,e,t,n){let i=0;for(let r=e,o=t-n;r<t;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}function wp(s){let e=s.length;e>2&&s[e-1].equals(s[0])&&s.pop()}function Ap(s,e){for(let t=0;t<e.length;t++)s.push(e[t].x),s.push(e[t].y)}function l0(s,e,t){if(t.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){let r=s[n];t.shapes.push(r.uuid)}else t.shapes.push(s.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}function h0(s,e){if(e.shapes=[],Array.isArray(s))for(let t=0,n=s.length;t<n;t++){let i=s[t];e.shapes.push(i.uuid)}else e.shapes.push(s.uuid);return e}function Rp(s,e,t){let n=`${s.x},${s.y},${s.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${s.x},${s.y},${s.z}`;return t.has(n)===!0||t.has(i)===!0?!1:(t.add(n),t.add(i),!0)}function cs(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function Vm(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function Hm(s){function e(i,r){return s[i]-s[r]}let t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Hu(s,e,t){let n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){let a=t[r]*e;for(let c=0;c!==e;++c)i[o++]=s[a+c]}return i}function qf(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}function u0(s,e,t,n,i=30){let r=s.clone();r.name=e;let o=[];for(let c=0;c<r.tracks.length;++c){let l=r.tracks[c],h=l.getValueSize(),u=[],d=[];for(let f=0;f<l.times.length;++f){let m=l.times[f]*i;if(!(m<t||m>=n)){u.push(l.times[f]);for(let _=0;_<h;++_)d.push(l.values[f*h+_])}}u.length!==0&&(l.times=cs(u,l.times.constructor),l.values=cs(d,l.values.constructor),o.push(l))}r.tracks=o;let a=1/0;for(let c=0;c<r.tracks.length;++c)a>r.tracks[c].times[0]&&(a=r.tracks[c].times[0]);for(let c=0;c<r.tracks.length;++c)r.tracks[c].shift(-1*a);return r.resetDuration(),r}function f0(s,e=0,t=s,n=30){n<=0&&(n=30);let i=t.tracks.length,r=e/n;for(let o=0;o<i;++o){let a=t.tracks[o],c=a.ValueTypeName;if(c==="bool"||c==="string")continue;let l=s.tracks.find(function(p){return p.name===a.name&&p.ValueTypeName===c});if(l===void 0)continue;let h=0,u=a.getValueSize();a.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(h=u/3);let d=0,f=l.getValueSize();l.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline&&(d=f/3);let m=a.times.length-1,_;if(r<=a.times[0]){let p=h,y=u-h;_=a.values.slice(p,y)}else if(r>=a.times[m]){let p=m*u+h,y=p+u-h;_=a.values.slice(p,y)}else{let p=a.createInterpolant(),y=h,v=u-h;p.evaluate(r),_=p.resultBuffer.slice(y,v)}c==="quaternion"&&new At().fromArray(_).normalize().conjugate().toArray(_);let g=l.times.length;for(let p=0;p<g;++p){let y=p*f+d;if(c==="quaternion")At.multiplyQuaternionsFlat(l.values,y,_,0,l.values,y);else{let v=f-d*2;for(let x=0;x<v;++x)l.values[y+x]-=_[x]}}}return s.blendMode=Lh,s}function d0(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Hi;case"vector":case"vector2":case"vector3":case"vector4":return Wi;case"color":return Lr;case"quaternion":return Gi;case"bool":case"boolean":return Xn;case"string":return qn}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function p0(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=d0(s.type);if(s.times===void 0){let t=[],n=[];qf(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}function zp(s,e){return s.distance-e.distance}function Zu(s,e,t,n){let i=!0;if(s.layers.test(e.layers)&&s.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let r=s.children;for(let o=0,a=r.length;o<a;o++)Zu(r[o],e,t,!0)}}function R0(){this._document.hidden===!1&&this.reset()}function Gm(s){let e=[];s.isBone===!0&&e.push(s);for(let t=0;t<s.children.length;t++)e.push(...Gm(s.children[t]));return e}function Mt(s,e,t,n,i,r,o){ll.set(i,r,o).unproject(n);let a=e[s];if(a!==void 0){let c=t.getAttribute("position");for(let l=0,h=a.length;l<h;l++)c.setXYZ(a[l],ll.x,ll.y,ll.z)}}function L0(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2):(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0),s}function D0(s,e){let t=s.image&&s.image.width?s.image.width/s.image.height:1;return t>e?(s.repeat.x=e/t,s.repeat.y=1,s.offset.x=(1-s.repeat.x)/2,s.offset.y=0):(s.repeat.x=1,s.repeat.y=t/e,s.offset.x=0,s.offset.y=(1-s.repeat.y)/2),s}function U0(s){return s.repeat.x=1,s.repeat.y=1,s.offset.x=0,s.offset.y=0,s}function Nh(s,e,t,n){let i=N0(n);switch(t){case Ch:return s*e;case Oa:return s*e/i.components*i.byteLength;case kr:return s*e/i.components*i.byteLength;case Ph:return s*e*2/i.components*i.byteLength;case Ba:return s*e*2/i.components*i.byteLength;case Ih:return s*e*3/i.components*i.byteLength;case Ut:return s*e*4/i.components*i.byteLength;case za:return s*e*4/i.components*i.byteLength;case Vr:case Hr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Wr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Va:case Ga:return Math.max(s,16)*Math.max(e,8)/4;case ka:case Ha:return Math.max(s,8)*Math.max(e,8)/2;case Wa:case Xa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case qa:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Ya:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Za:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Ja:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case $a:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case Ka:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case ja:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Qa:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case ec:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case tc:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case nc:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case ic:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case sc:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case rc:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case oc:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case ac:case cc:case lc:return Math.ceil(s/4)*Math.ceil(e/4)*16;case hc:case uc:return Math.ceil(s/4)*Math.ceil(e/4)*8;case fc:case dc:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function N0(s){switch(s){case Tn:case Eh:return{byteLength:1,components:1};case Ps:case wh:case Ls:return{byteLength:2,components:1};case Na:case Fa:return{byteLength:2,components:4};case $n:case Ua:case Yt:return{byteLength:4,components:1};case Ah:case Rh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}var Ea,Zp,Jp,Ju,vh,$u,$p,Kp,Mh,Ku,Bn,Wn,Vt,Jt,Yn,Ri,Sh,bh,Th,ju,ai,Qu,ef,tf,nf,sf,rf,of,af,xo,yo,cf,lf,hf,uf,ff,df,pf,mf,gf,wa,Aa,Ra,Ci,Ca,Ia,Pa,La,Fr,_f,xf,Zn,yf,vf,Mf,Sf,bf,Tf,Ef,fl,wf,Da,Jn,pi,Or,Br,Is,Ii,qt,Pi,wt,zr,jp,mi,Qp,vt,Yi,em,mn,tm,Tn,Eh,wh,Ps,Ua,$n,Yt,Ls,Na,Fa,Ds,Ah,Rh,Ch,Ih,Ut,hs,Us,Oa,kr,Ph,Ba,nm,za,Vr,Hr,Gr,Wr,ka,Va,Ha,Ga,Wa,Xa,qa,Ya,Za,Ja,$a,Ka,ja,Qa,ec,tc,nc,ic,sc,rc,oc,ac,cc,lc,hc,uc,fc,dc,Af,Rf,Cf,Li,us,po,wi,Ai,lr,pc,Lh,im,sm,rm,If,Pf,om,am,gi,Lf,En,Ft,Di,hr,lt,cm,Ei,lm,hm,um,fm,dm,pm,mm,gm,_m,xm,ym,vm,Mm,dl,Df,Uf,Nf,Dh,Ff,Of,Bf,zf,ur,Sm,bm,Tm,Em,wm,Am,Rm,Cm,Im,Uh,Qt,fs,Pm,Lm,Dm,fn,Bt,Vd,ls,ds,zn,K,At,R,Qh,Hd,ze,eu,o_,Gd,Wd,Xd,tt,Vs,ps,c_,ln,l_,nu,St,it,pr,dn,ms,pl,gs,ml,Rt,Qn,An,Tc,Hs,Gs,Ws,xi,yi,$i,Qr,Ec,wc,Ki,h_,eo,su,Et,ei,ru,Ac,vi,ou,Rc,au,ci,Ue,Xs,Rn,u_,f_,Mi,Cc,an,qd,Yd,en,_s,d_,Zd,qs,ti,Ic,to,p_,m_,Jd,$d,Kd,jd,g_,Ys,cu,at,Cn,ni,lu,ii,Zs,Js,Qd,hu,uu,fu,du,pu,mu,Pn,Nm,Si,Pc,de,zt,__,Ct,Un,ri,gl,bt,Lc,y_,Je,_l,xl,yl,vl,mr,Ml,gr,Sl,ye,v_,yn,_u,$s,cn,no,Dt,ke,ep,ji,Dc,tp,Uc,Nc,Fc,xu,Oc,np,Bc,pt,Sn,Wf,b_,T_,tn,xs,bi,ip,sp,Tt,Ks,js,vo,Ui,Mo,Ln,E_,ys,So,bo,Ni,vs,Wt,Fi,_r,Qs,io,er,tr,nr,so,Fm,kc,ro,Vc,rp,yu,op,To,Gc,ap,Eo,cp,lp,hp,w_,up,Wc,vu,fp,Mu,wo,xr,un,dp,A_,Ao,li,ir,pp,Xc,mp,R_,oo,ao,Ro,Su,C_,I_,In,Qi,P_,qc,hi,Hn,Gn,Co,Ou,Kt,U_,gp,N_,Yc,es,co,_p,F_,Tu,kt,Zc,Io,Nt,bl,Tl,xp,lo,Jc,Eu,yp,Nn,vp,Mp,pn,Po,yr,Sp,Bu,Kc,jc,Lo,Do,El,wl,Fn,Al,Rl,Cl,vr,Mr,Ms,Uo,Oi,ui,fi,No,Qc,el,wu,tl,Fo,nn,Ss,Oo,nl,Au,Ru,Cu,Bi,Sr,Bo,br,zo,Tr,Er,wr,Il,ko,bs,Mn,Vu,vn,Es,c0,Wo,ws,Rr,di,Xo,qo,zi,Yo,As,Zo,Rs,Jo,Cp,$o,Ko,ki,jo,Qo,ea,ta,na,Cr,Ir,ia,sa,Pl,Vi,ra,Pr,oa,Zt,Xn,Lr,Hi,aa,Gi,qn,Wi,Xi,Dn,Dr,Yf,Ot,si,Gu,bn,Ll,Dl,sr,qi,Ul,Nl,Fl,On,ca,Iu,Ip,Pp,la,Wu,ha,Lp,ho,Pu,Xu,ua,Cs,qu,fa,da,pa,ma,ga,_a,Ur,xa,ya,Ol,m0,Dp,Up,Lu,Bl,rl,Nr,zl,Np,Fp,ns,kl,va,Ma,is,Du,g0,ss,rs,Vl,Sa,os,Op,_0,as,Hl,Gl,ba,Zf,x0,Jf,y0,v0,M0,S0,b0,T0,E0,Yu,et,Wl,Ta,w0,Xl,ql,Yl,A0,Zl,Jl,$l,Bp,Kl,jl,Ql,eh,th,kp,nh,Vp,ol,rr,or,Uu,C0,I0,ih,Hp,sh,Ti,al,Nu,rh,oh,P0,Gp,Wp,ah,ch,lh,Xp,cl,qp,hh,ll,yt,uh,hl,fh,dh,ph,Yp,ul,Fu,mh,gh,_h,xh,yh,$f=jh(()=>{Ea="180",Zp={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},Jp={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ju=0,vh=1,$u=2,$p=3,Kp=0,Mh=1,Ku=2,Bn=3,Wn=0,Vt=1,Jt=2,Yn=0,Ri=1,Sh=2,bh=3,Th=4,ju=5,ai=100,Qu=101,ef=102,tf=103,nf=104,sf=200,rf=201,of=202,af=203,xo=204,yo=205,cf=206,lf=207,hf=208,uf=209,ff=210,df=211,pf=212,mf=213,gf=214,wa=0,Aa=1,Ra=2,Ci=3,Ca=4,Ia=5,Pa=6,La=7,Fr=0,_f=1,xf=2,Zn=0,yf=1,vf=2,Mf=3,Sf=4,bf=5,Tf=6,Ef=7,fl="attached",wf="detached",Da=300,Jn=301,pi=302,Or=303,Br=304,Is=306,Ii=1e3,qt=1001,Pi=1002,wt=1003,zr=1004,jp=1004,mi=1005,Qp=1005,vt=1006,Yi=1007,em=1007,mn=1008,tm=1008,Tn=1009,Eh=1010,wh=1011,Ps=1012,Ua=1013,$n=1014,Yt=1015,Ls=1016,Na=1017,Fa=1018,Ds=1020,Ah=35902,Rh=35899,Ch=1021,Ih=1022,Ut=1023,hs=1026,Us=1027,Oa=1028,kr=1029,Ph=1030,Ba=1031,nm=1032,za=1033,Vr=33776,Hr=33777,Gr=33778,Wr=33779,ka=35840,Va=35841,Ha=35842,Ga=35843,Wa=36196,Xa=37492,qa=37496,Ya=37808,Za=37809,Ja=37810,$a=37811,Ka=37812,ja=37813,Qa=37814,ec=37815,tc=37816,nc=37817,ic=37818,sc=37819,rc=37820,oc=37821,ac=36492,cc=36494,lc=36495,hc=36283,uc=36284,fc=36285,dc=36286,Af=2200,Rf=2201,Cf=2202,Li=2300,us=2301,po=2302,wi=2400,Ai=2401,lr=2402,pc=2500,Lh=2501,im=0,sm=1,rm=2,If=3200,Pf=3201,om=3202,am=3203,gi=0,Lf=1,En="",Ft="srgb",Di="srgb-linear",hr="linear",lt="srgb",cm=0,Ei=7680,lm=7681,hm=7682,um=7683,fm=34055,dm=34056,pm=5386,mm=512,gm=513,_m=514,xm=515,ym=516,vm=517,Mm=518,dl=519,Df=512,Uf=513,Nf=514,Dh=515,Ff=516,Of=517,Bf=518,zf=519,ur=35044,Sm=35048,bm=35040,Tm=35045,Em=35049,wm=35041,Am=35046,Rm=35050,Cm=35042,Im="100",Uh="300 es",Qt=2e3,fs=2001,Pm={COMPUTE:"compute",RENDER:"render"},Lm={PERSPECTIVE:"perspective",LINEAR:"linear",FLAT:"flat"},Dm={NORMAL:"normal",CENTROID:"centroid",SAMPLE:"sample",FIRST:"first",EITHER:"either"},fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let i=n[e];if(i!==void 0){let r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}},Bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vd=1234567,ls=Math.PI/180,ds=180/Math.PI;zn={DEG2RAD:ls,RAD2DEG:ds,generateUUID:hn,clamp:Fe,euclideanModulo:kf,mapLinear:Wg,inverseLerp:Xg,lerp:mo,damp:qg,pingpong:Yg,smoothstep:Zg,smootherstep:Jg,randInt:$g,randFloat:Kg,randFloatSpread:jg,seededRandom:Qg,degToRad:e_,radToDeg:t_,isPowerOfTwo:n_,ceilPowerOfTwo:i_,floorPowerOfTwo:s_,setQuaternionFromProperEuler:r_,normalize:Xe,denormalize:Xt},K=class s{constructor(e=0,t=0){s.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},At=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3],d=r[o+0],f=r[o+1],m=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=m,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==m){let g=1-a,p=c*d+l*f+h*m+u*_,y=p>=0?1:-1,v=1-p*p;if(v>Number.EPSILON){let T=Math.sqrt(v),E=Math.atan2(T,p*y);g=Math.sin(g*E)/T,a=Math.sin(a*E)/T}let x=a*y;if(c=c*g+d*x,l=l*g+f*x,h=h*g+m*x,u=u*g+_*x,g===1-a){let T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,r,o){let a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],m=r[o+3];return e[t]=a*m+h*u+c*f-l*d,e[t+1]=c*m+h*d+l*u-a*f,e[t+2]=l*m+h*f+a*d-c*u,e[t+3]=h*m-a*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),m=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u+d*f*m;break;case"YZX":this._x=d*h*u+l*f*m,this._y=l*f*u+d*h*m,this._z=l*h*m-d*f*u,this._w=l*h*u-d*f*m;break;case"XZY":this._x=d*h*u-l*f*m,this._y=l*f*u-d*h*m,this._z=l*h*m+d*f*u,this._w=l*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){let f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){let f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{let f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Fe(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,r=this._z,o=this._w,a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*n+t*this._x,this._y=f*i+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},R=class s{constructor(e=0,t=0,n=0){s.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Hd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Hd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*i-a*n),h=2*(a*t-r*i),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qh.copy(this).projectOnVector(e),this.sub(Qh)}reflect(e){return this.sub(Qh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Fe(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Qh=new R,Hd=new At,ze=class s{constructor(e,t,n,i,r,o,a,c,l){s.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l)}set(e,t,n,i,r,o,a,c,l){let h=this.elements;return h[0]=e,h[1]=i,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],m=n[8],_=i[0],g=i[3],p=i[6],y=i[1],v=i[4],x=i[7],T=i[2],E=i[5],w=i[8];return r[0]=o*_+a*y+c*T,r[3]=o*g+a*v+c*E,r[6]=o*p+a*x+c*w,r[1]=l*_+h*y+u*T,r[4]=l*g+h*v+u*E,r[7]=l*p+h*x+u*w,r[2]=d*_+f*y+m*T,r[5]=d*g+f*v+m*E,r[8]=d*p+f*x+m*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,m=t*u+n*d+i*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/m;return e[0]=u*_,e[1]=(i*l-h*n)*_,e[2]=(a*n-i*o)*_,e[3]=d*_,e[4]=(h*t-i*c)*_,e[5]=(i*r-a*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-i*l,i*c,-i*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(eu.makeScale(e,t)),this}rotate(e){return this.premultiply(eu.makeRotation(-e)),this}translate(e,t){return this.premultiply(eu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},eu=new ze;o_={Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array};Gd={};Wd=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Xd=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);tt=a_();ps=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vs===void 0&&(Vs=fr("canvas")),Vs.width=e.width,Vs.height=e.height;let i=Vs.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Vs}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=fr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=oi(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(oi(t[n]/255)*255):t[n]=oi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},c_=0,ln=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:c_++}),this.uuid=hn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(tu(i[o].image)):r.push(tu(i[o]))}else r=tu(i);n.url=r}return t||(e.images[this.uuid]=n),n}};l_=0,nu=new R,St=class s extends fn{constructor(e=s.DEFAULT_IMAGE,t=s.DEFAULT_MAPPING,n=qt,i=qt,r=vt,o=mn,a=Ut,c=Tn,l=s.DEFAULT_ANISOTROPY,h=En){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:l_++}),this.uuid=hn(),this.name="",this.source=new ln(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(nu).x}get height(){return this.source.getSize(nu).y}get depth(){return this.source.getSize(nu).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Da)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ii:e.x=e.x-Math.floor(e.x);break;case qt:e.x=e.x<0?0:1;break;case Pi:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ii:e.y=e.y-Math.floor(e.y);break;case qt:e.y=e.y<0?0:1;break;case Pi:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=Da;St.DEFAULT_ANISOTROPY=1;it=class s{constructor(e=0,t=0,n=0,i=1){s.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r,c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let v=(l+1)/2,x=(f+1)/2,T=(p+1)/2,E=(h+d)/4,w=(u+_)/4,C=(m+g)/4;return v>x&&v>T?v<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(v),i=E/n,r=w/n):x>T?x<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(x),n=E/i,r=C/i):T<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(T),n=w/r,i=C/r),this.set(n,i,r,t),this}let y=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(g-m)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Fe(this.x,e.x,t.x),this.y=Fe(this.y,e.y,t.y),this.z=Fe(this.z,e.z,t.z),this.w=Fe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Fe(this.x,e,t),this.y=Fe(this.y,e,t),this.z=Fe(this.z,e,t),this.w=Fe(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Fe(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},pr=class extends fn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);let i={width:e,height:t,depth:n.depth},r=new St(i);this.textures=[];let o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let i=Object.assign({},e.textures[t].image);this.textures[t].source=new ln(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},dn=class extends pr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},ms=class extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},pl=class extends dn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGLArrayRenderTarget=!0,this.depth=n,this.texture=new ms(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},gs=class extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=wt,this.minFilter=wt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ml=class extends dn{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isWebGL3DRenderTarget=!0,this.depth=n,this.texture=new gs(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Rt=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(An.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(An.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=An.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,An):An.fromBufferAttribute(r,o),An.applyMatrix4(e.matrixWorld),this.expandByPoint(An);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Tc.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Tc.copy(n.boundingBox)),Tc.applyMatrix4(e.matrixWorld),this.union(Tc)}let i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,An),An.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Qr),Ec.subVectors(this.max,Qr),Hs.subVectors(e.a,Qr),Gs.subVectors(e.b,Qr),Ws.subVectors(e.c,Qr),xi.subVectors(Gs,Hs),yi.subVectors(Ws,Gs),$i.subVectors(Hs,Ws);let t=[0,-xi.z,xi.y,0,-yi.z,yi.y,0,-$i.z,$i.y,xi.z,0,-xi.x,yi.z,0,-yi.x,$i.z,0,-$i.x,-xi.y,xi.x,0,-yi.y,yi.x,0,-$i.y,$i.x,0];return!iu(t,Hs,Gs,Ws,Ec)||(t=[1,0,0,0,1,0,0,0,1],!iu(t,Hs,Gs,Ws,Ec))?!1:(wc.crossVectors(xi,yi),t=[wc.x,wc.y,wc.z],iu(t,Hs,Gs,Ws,Ec))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,An).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(An).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Qn=[new R,new R,new R,new R,new R,new R,new R,new R],An=new R,Tc=new Rt,Hs=new R,Gs=new R,Ws=new R,xi=new R,yi=new R,$i=new R,Qr=new R,Ec=new R,wc=new R,Ki=new R;h_=new Rt,eo=new R,su=new R,Et=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):h_.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;eo.subVectors(e,this.center);let t=eo.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(eo,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(su.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(eo.copy(e.center).add(su)),this.expandByPoint(eo.copy(e.center).sub(su))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},ei=new R,ru=new R,Ac=new R,vi=new R,ou=new R,Rc=new R,au=new R,ci=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){ru.copy(e).add(t).multiplyScalar(.5),Ac.copy(t).sub(e).normalize(),vi.copy(this.origin).sub(ru);let r=e.distanceTo(t)*.5,o=-this.direction.dot(Ac),a=vi.dot(this.direction),c=-vi.dot(Ac),l=vi.lengthSq(),h=Math.abs(1-o*o),u,d,f,m;if(h>0)if(u=o*c-a,d=o*a-c,m=r*h,u>=0)if(d>=-m)if(d<=m){let _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-m?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=m?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(ru).addScaledVector(Ac,d),f}intersectSphere(e,t){ei.subVectors(e.center,this.origin);let n=ei.dot(this.direction),i=ei.dot(ei)-n*n,r=e.radius*e.radius;if(i>r)return null;let o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,i=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,i=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,i,r){ou.subVectors(t,e),Rc.subVectors(n,e),au.crossVectors(ou,Rc);let o=this.direction.dot(au),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;vi.subVectors(this.origin,e);let c=a*this.direction.dot(Rc.crossVectors(vi,Rc));if(c<0)return null;let l=a*this.direction.dot(ou.cross(vi));if(l<0||c+l>o)return null;let h=-a*vi.dot(au);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ue=class s{constructor(e,t,n,i,r,o,a,c,l,h,u,d,f,m,_,g){s.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,c,l,h,u,d,f,m,_,g)}set(e,t,n,i,r,o,a,c,l,h,u,d,f,m,_,g){let p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new s().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Xs.setFromMatrixColumn(e,0).length(),r=1/Xs.setFromMatrixColumn(e,1).length(),o=1/Xs.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+m*l,t[5]=d-_*l,t[9]=-a*c,t[2]=_-d*l,t[6]=m+f*l,t[10]=o*c}else if(e.order==="YXZ"){let d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d+_*a,t[4]=m*a-f,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-m,t[6]=_+d*a,t[10]=o*c}else if(e.order==="ZXY"){let d=c*h,f=c*u,m=l*h,_=l*u;t[0]=d-_*a,t[4]=-o*u,t[8]=m+f*a,t[1]=f+m*a,t[5]=o*h,t[9]=_-d*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){let d=o*h,f=o*u,m=a*h,_=a*u;t[0]=c*h,t[4]=m*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-m,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){let d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=_-d*u,t[8]=m*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=f*u+m,t[10]=d-_*u}else if(e.order==="XZY"){let d=o*c,f=o*l,m=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=o*h,t[9]=f*u-m,t[2]=m*u-f,t[6]=a*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(u_,e,f_)}lookAt(e,t,n){let i=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),Mi.crossVectors(n,an),Mi.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),Mi.crossVectors(n,an)),Mi.normalize(),Cc.crossVectors(an,Mi),i[0]=Mi.x,i[4]=Cc.x,i[8]=an.x,i[1]=Mi.y,i[5]=Cc.y,i[9]=an.y,i[2]=Mi.z,i[6]=Cc.z,i[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],m=n[2],_=n[6],g=n[10],p=n[14],y=n[3],v=n[7],x=n[11],T=n[15],E=i[0],w=i[4],C=i[8],M=i[12],S=i[1],P=i[5],U=i[9],B=i[13],k=i[2],z=i[6],W=i[10],Q=i[14],G=i[3],he=i[7],me=i[11],Me=i[15];return r[0]=o*E+a*S+c*k+l*G,r[4]=o*w+a*P+c*z+l*he,r[8]=o*C+a*U+c*W+l*me,r[12]=o*M+a*B+c*Q+l*Me,r[1]=h*E+u*S+d*k+f*G,r[5]=h*w+u*P+d*z+f*he,r[9]=h*C+u*U+d*W+f*me,r[13]=h*M+u*B+d*Q+f*Me,r[2]=m*E+_*S+g*k+p*G,r[6]=m*w+_*P+g*z+p*he,r[10]=m*C+_*U+g*W+p*me,r[14]=m*M+_*B+g*Q+p*Me,r[3]=y*E+v*S+x*k+T*G,r[7]=y*w+v*P+x*z+T*he,r[11]=y*C+v*U+x*W+T*me,r[15]=y*M+v*B+x*Q+T*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],m=e[3],_=e[7],g=e[11],p=e[15];return m*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*f-n*c*f)+_*(+t*c*f-t*l*d+r*o*d-i*o*f+i*l*h-r*c*h)+g*(+t*l*u-t*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-t*c*u+t*a*d+i*o*u-n*o*d+n*c*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],m=e[12],_=e[13],g=e[14],p=e[15],y=u*g*l-_*d*l+_*c*f-a*g*f-u*c*p+a*d*p,v=m*d*l-h*g*l-m*c*f+o*g*f+h*c*p-o*d*p,x=h*_*l-m*u*l+m*a*f-o*_*f-h*a*p+o*u*p,T=m*u*c-h*_*c-m*a*d+o*_*d+h*a*g-o*u*g,E=t*y+n*v+i*x+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/E;return e[0]=y*w,e[1]=(_*d*r-u*g*r-_*i*f+n*g*f+u*i*p-n*d*p)*w,e[2]=(a*g*r-_*c*r+_*i*l-n*g*l-a*i*p+n*c*p)*w,e[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*f-n*c*f)*w,e[4]=v*w,e[5]=(h*g*r-m*d*r+m*i*f-t*g*f-h*i*p+t*d*p)*w,e[6]=(m*c*r-o*g*r-m*i*l+t*g*l+o*i*p-t*c*p)*w,e[7]=(o*d*r-h*c*r+h*i*l-t*d*l-o*i*f+t*c*f)*w,e[8]=x*w,e[9]=(m*u*r-h*_*r-m*n*f+t*_*f+h*n*p-t*u*p)*w,e[10]=(o*_*r-m*a*r+m*n*l-t*_*l-o*n*p+t*a*p)*w,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*f-t*a*f)*w,e[12]=T*w,e[13]=(h*_*i-m*u*i+m*n*d-t*_*d-h*n*g+t*u*g)*w,e[14]=(m*a*i-o*_*i-m*n*c+t*_*c+o*n*g-t*a*g)*w,e[15]=(o*u*i-h*a*i+h*n*c-t*u*c-o*n*d+t*a*d)*w,this}scale(e){let t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,m=r*u,_=o*h,g=o*u,p=a*u,y=c*l,v=c*h,x=c*u,T=n.x,E=n.y,w=n.z;return i[0]=(1-(_+p))*T,i[1]=(f+x)*T,i[2]=(m-v)*T,i[3]=0,i[4]=(f-x)*E,i[5]=(1-(d+p))*E,i[6]=(g+y)*E,i[7]=0,i[8]=(m+v)*w,i[9]=(g-y)*w,i[10]=(1-(d+_))*w,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,r=Xs.set(i[0],i[1],i[2]).length(),o=Xs.set(i[4],i[5],i[6]).length(),a=Xs.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],Rn.copy(this);let l=1/r,h=1/o,u=1/a;return Rn.elements[0]*=l,Rn.elements[1]*=l,Rn.elements[2]*=l,Rn.elements[4]*=h,Rn.elements[5]*=h,Rn.elements[6]*=h,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,t.setFromRotationMatrix(Rn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=Qt,c=!1){let l=this.elements,h=2*r/(t-e),u=2*r/(n-i),d=(t+e)/(t-e),f=(n+i)/(n-i),m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===Qt)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===fs)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=u,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=Qt,c=!1){let l=this.elements,h=2/(t-e),u=2/(n-i),d=-(t+e)/(t-e),f=-(n+i)/(n-i),m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===Qt)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===fs)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=d,l[1]=0,l[5]=u,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Xs=new R,Rn=new Ue,u_=new R(0,0,0),f_=new R(1,1,1),Mi=new R,Cc=new R,an=new R,qd=new Ue,Yd=new At,en=class s{constructor(e=0,t=0,n=0,i=s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Fe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Fe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Yd.setFromEuler(this),this.setFromQuaternion(Yd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};en.DEFAULT_ORDER="XYZ";_s=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},d_=0,Zd=new R,qs=new At,ti=new Ue,Ic=new R,to=new R,p_=new R,m_=new At,Jd=new R(1,0,0),$d=new R(0,1,0),Kd=new R(0,0,1),jd={type:"added"},g_={type:"removed"},Ys={type:"childadded",child:null},cu={type:"childremoved",child:null},at=class s extends fn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:d_++}),this.uuid=hn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=s.DEFAULT_UP.clone();let e=new R,t=new en,n=new At,i=new R(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ue},normalMatrix:{value:new ze}}),this.matrix=new Ue,this.matrixWorld=new Ue,this.matrixAutoUpdate=s.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=s.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _s,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.multiply(qs),this}rotateOnWorldAxis(e,t){return qs.setFromAxisAngle(e,t),this.quaternion.premultiply(qs),this}rotateX(e){return this.rotateOnAxis(Jd,e)}rotateY(e){return this.rotateOnAxis($d,e)}rotateZ(e){return this.rotateOnAxis(Kd,e)}translateOnAxis(e,t){return Zd.copy(e).applyQuaternion(this.quaternion),this.position.add(Zd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Jd,e)}translateY(e){return this.translateOnAxis($d,e)}translateZ(e){return this.translateOnAxis(Kd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ic.copy(e):Ic.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),to.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(to,Ic,this.up):ti.lookAt(Ic,to,this.up),this.quaternion.setFromRotationMatrix(ti),i&&(ti.extractRotation(i.matrixWorld),qs.setFromRotationMatrix(ti),this.quaternion.premultiply(qs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jd),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(g_),cu.child=e,this.dispatchEvent(cu),cu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ti.multiply(e.parent.matrixWorld)),e.applyMatrix4(ti),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jd),Ys.child=e,this.dispatchEvent(Ys),Ys.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,e,p_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(to,m_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];i.animations.push(r(e.animations,c))}}if(t){let a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),m=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),m.length>0&&(n.nodes=m)}return n.object=i,n;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};at.DEFAULT_UP=new R(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Cn=new R,ni=new R,lu=new R,ii=new R,Zs=new R,Js=new R,Qd=new R,hu=new R,uu=new R,fu=new R,du=new it,pu=new it,mu=new it,Pn=class s{constructor(e=new R,t=new R,n=new R){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Cn.subVectors(e,t),i.cross(Cn);let r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){Cn.subVectors(i,t),ni.subVectors(n,t),lu.subVectors(e,t);let o=Cn.dot(Cn),a=Cn.dot(ni),c=Cn.dot(lu),l=ni.dot(ni),h=ni.dot(lu),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,f=(l*c-a*h)*d,m=(o*h-a*c)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ii)===null?!1:ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,i,r,o,a,c){return this.getBarycoord(e,t,n,i,ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ii.x),c.addScaledVector(o,ii.y),c.addScaledVector(a,ii.z),c)}static getInterpolatedAttribute(e,t,n,i,r,o){return du.setScalar(0),pu.setScalar(0),mu.setScalar(0),du.fromBufferAttribute(e,t),pu.fromBufferAttribute(e,n),mu.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(du,r.x),o.addScaledVector(pu,r.y),o.addScaledVector(mu,r.z),o}static isFrontFacing(e,t,n,i){return Cn.subVectors(n,t),ni.subVectors(e,t),Cn.cross(ni).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),Cn.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return s.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return s.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return s.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return s.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return s.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,r=this.c,o,a;Zs.subVectors(i,n),Js.subVectors(r,n),hu.subVectors(e,n);let c=Zs.dot(hu),l=Js.dot(hu);if(c<=0&&l<=0)return t.copy(n);uu.subVectors(e,i);let h=Zs.dot(uu),u=Js.dot(uu);if(h>=0&&u<=h)return t.copy(i);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Zs,o);fu.subVectors(e,r);let f=Zs.dot(fu),m=Js.dot(fu);if(m>=0&&f<=m)return t.copy(r);let _=f*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),t.copy(n).addScaledVector(Js,a);let g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return Qd.subVectors(r,i),a=(u-h)/(u-h+(f-m)),t.copy(i).addScaledVector(Qd,a);let p=1/(g+_+d);return o=_*p,a=d*p,t.copy(n).addScaledVector(Zs,o).addScaledVector(Js,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Nm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},Pc={h:0,s:0,l:0};de=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,tt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=tt.workingColorSpace){return this.r=e,this.g=t,this.b=n,tt.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=tt.workingColorSpace){if(e=kf(e,1),t=Fe(t,0,1),n=Fe(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=gu(o,r,e+1/3),this.g=gu(o,r,e),this.b=gu(o,r,e-1/3)}return tt.colorSpaceToWorking(this,i),this}setStyle(e,t=Ft){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){let n=Nm[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=oi(e.r),this.g=oi(e.g),this.b=oi(e.b),this}copyLinearToSRGB(e){return this.r=cr(e.r),this.g=cr(e.g),this.b=cr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return tt.workingToColorSpace(zt.copy(this),e),Math.round(Fe(zt.r*255,0,255))*65536+Math.round(Fe(zt.g*255,0,255))*256+Math.round(Fe(zt.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=tt.workingColorSpace){tt.workingToColorSpace(zt.copy(this),t);let n=zt.r,i=zt.g,r=zt.b,o=Math.max(n,i,r),a=Math.min(n,i,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=tt.workingColorSpace){return tt.workingToColorSpace(zt.copy(this),t),e.r=zt.r,e.g=zt.g,e.b=zt.b,e}getStyle(e=Ft){tt.workingToColorSpace(zt.copy(this),e);let t=zt.r,n=zt.g,i=zt.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(Pc);let n=mo(Si.h,Pc.h,t),i=mo(Si.s,Pc.s,t),r=mo(Si.l,Pc.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},zt=new de;de.NAMES=Nm;__=0,Ct=class extends fn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:__++}),this.uuid=hn(),this.name="",this.type="Material",this.blending=Ri,this.side=Wn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=xo,this.blendDst=yo,this.blendEquation=ai,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new de(0,0,0),this.blendAlpha=0,this.depthFunc=Ci,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ri&&(n.blending=this.blending),this.side!==Wn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==xo&&(n.blendSrc=this.blendSrc),this.blendDst!==yo&&(n.blendDst=this.blendDst),this.blendEquation!==ai&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ci&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(t){let r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Un=class extends Ct{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Fr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ri=x_();gl=class{static toHalfFloat(e){return jt(e)}static fromHalfFloat(e){return uo(e)}},bt=new R,Lc=new K,y_=0,Je=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:y_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ur,this.updateRanges=[],this.gpuType=Yt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Lc.fromBufferAttribute(this,t),Lc.applyMatrix3(e),this.setXY(t,Lc.x,Lc.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Xt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ur&&(e.usage=this.usage),e}},_l=class extends Je{constructor(e,t,n){super(new Int8Array(e),t,n)}},xl=class extends Je{constructor(e,t,n){super(new Uint8Array(e),t,n)}},yl=class extends Je{constructor(e,t,n){super(new Uint8ClampedArray(e),t,n)}},vl=class extends Je{constructor(e,t,n){super(new Int16Array(e),t,n)}},mr=class extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Ml=class extends Je{constructor(e,t,n){super(new Int32Array(e),t,n)}},gr=class extends Je{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Sl=class extends Je{constructor(e,t,n){super(new Uint16Array(e),t,n),this.isFloat16BufferAttribute=!0}getX(e){let t=uo(this.array[e*this.itemSize]);return this.normalized&&(t=Xt(t,this.array)),t}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize]=jt(t),this}getY(e){let t=uo(this.array[e*this.itemSize+1]);return this.normalized&&(t=Xt(t,this.array)),t}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+1]=jt(t),this}getZ(e){let t=uo(this.array[e*this.itemSize+2]);return this.normalized&&(t=Xt(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+2]=jt(t),this}getW(e){let t=uo(this.array[e*this.itemSize+3]);return this.normalized&&(t=Xt(t,this.array)),t}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.array[e*this.itemSize+3]=jt(t),this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.array[e+0]=jt(t),this.array[e+1]=jt(n),this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.array[e+0]=jt(t),this.array[e+1]=jt(n),this.array[e+2]=jt(i),this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.array[e+0]=jt(t),this.array[e+1]=jt(n),this.array[e+2]=jt(i),this.array[e+3]=jt(r),this}},ye=class extends Je{constructor(e,t,n){super(new Float32Array(e),t,n)}},v_=0,yn=new Ue,_u=new at,$s=new R,cn=new Rt,no=new Rt,Dt=new R,ke=class s extends fn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:v_++}),this.uuid=hn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Vf(e)?gr:mr)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return _u.lookAt(e),_u.updateMatrix(),this.applyMatrix4(_u.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($s).negate(),this.translate($s.x,$s.y,$s.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,r=e.length;i<r;i++){let o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ye(n,3))}else{let n=Math.min(e.length,t.count);for(let i=0;i<n;i++){let r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let r=t[n];cn.setFromBufferAttribute(r),this.morphTargetsRelative?(Dt.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Dt),Dt.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Dt)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Et);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){let a=t[r];no.setFromBufferAttribute(a),this.morphTargetsRelative?(Dt.addVectors(cn.min,no.min),cn.expandByPoint(Dt),Dt.addVectors(cn.max,no.max),cn.expandByPoint(Dt)):(cn.expandByPoint(no.min),cn.expandByPoint(no.max))}cn.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Dt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Dt));if(t)for(let r=0,o=t.length;r<o;r++){let a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Dt.fromBufferAttribute(a,l),c&&($s.fromBufferAttribute(e,l),Dt.add($s)),i=Math.max(i,n.distanceToSquared(Dt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Je(new Float32Array(4*n.count),4));let o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new R,c[C]=new R;let l=new R,h=new R,u=new R,d=new K,f=new K,m=new K,_=new R,g=new R;function p(C,M,S){l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,M),m.fromBufferAttribute(r,S),h.sub(l),u.sub(l),f.sub(d),m.sub(d);let P=1/(f.x*m.y-m.x*f.y);isFinite(P)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(P),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(P),a[C].add(_),a[M].add(_),a[S].add(_),c[C].add(g),c[M].add(g),c[S].add(g))}let y=this.groups;y.length===0&&(y=[{start:0,count:e.count}]);for(let C=0,M=y.length;C<M;++C){let S=y[C],P=S.start,U=S.count;for(let B=P,k=P+U;B<k;B+=3)p(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let v=new R,x=new R,T=new R,E=new R;function w(C){T.fromBufferAttribute(i,C),E.copy(T);let M=a[C];v.copy(M),v.sub(T.multiplyScalar(T.dot(M))).normalize(),x.crossVectors(E,M);let P=x.dot(c[C])<0?-1:1;o.setXYZW(C,v.x,v.y,v.z,P)}for(let C=0,M=y.length;C<M;++C){let S=y[C],P=S.start,U=S.count;for(let B=P,k=P+U;B<k;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Je(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);let i=new R,r=new R,o=new R,a=new R,c=new R,l=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);i.fromBufferAttribute(t,m),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)i.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Dt.fromBufferAttribute(e,t),Dt.normalize(),e.setXYZ(t,Dt.x,Dt.y,Dt.z)}toNonIndexed(){function e(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),f=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[m++]=l[f++]}return new Je(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new s,n=this.index.array,i=this.attributes;for(let a in i){let c=i[a],l=e(c,n);t.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let c in n){let l=n[c];e.data.attributes[c]=l.toJSON(e.data)}let i={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let i=e.attributes;for(let l in i){let h=i[l];this.setAttribute(l,h.clone(t))}let r=e.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ep=new Ue,ji=new ci,Dc=new Et,tp=new R,Uc=new R,Nc=new R,Fc=new R,xu=new R,Oc=new R,np=new R,Bc=new R,pt=class extends at{constructor(e=new ke,t=new Un){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let a=this.morphTargetInfluences;if(r&&a){Oc.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(xu.fromBufferAttribute(u,e),o?Oc.addScaledVector(xu,h):Oc.addScaledVector(xu.sub(t),h))}t.add(Oc)}return t}raycast(e,t){let n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Dc.copy(n.boundingSphere),Dc.applyMatrix4(r),ji.copy(e.ray).recast(e.near),!(Dc.containsPoint(ji.origin)===!1&&(ji.intersectSphere(Dc,tp)===null||ji.origin.distanceToSquared(tp)>(e.far-e.near)**2))&&(ep.copy(r).invert(),ji.copy(e.ray).applyMatrix4(ep),!(n.boundingBox!==null&&ji.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ji)))}_computeIntersections(e,t,n){let i,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),v=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,T=v;x<T;x+=3){let E=a.getX(x),w=a.getX(x+1),C=a.getX(x+2);i=zc(this,p,e,n,l,h,u,E,w,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let y=a.getX(g),v=a.getX(g+1),x=a.getX(g+2);i=zc(this,o,e,n,l,h,u,y,v,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){let g=d[m],p=o[g.materialIndex],y=Math.max(g.start,f.start),v=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let x=y,T=v;x<T;x+=3){let E=x,w=x+1,C=x+2;i=zc(this,p,e,n,l,h,u,E,w,C),i&&(i.faceIndex=Math.floor(x/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{let m=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){let y=g,v=g+1,x=g+2;i=zc(this,o,e,n,l,h,u,y,v,x),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}};Sn=class s extends ke{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};let a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,f=0;m("z","y","x",-1,-1,n,t,e,o,r,0),m("z","y","x",1,-1,n,t,-e,o,r,1),m("x","z","y",1,1,e,n,t,i,o,2),m("x","z","y",1,-1,e,n,-t,i,o,3),m("x","y","z",1,-1,e,t,n,i,r,4),m("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new ye(l,3)),this.setAttribute("normal",new ye(h,3)),this.setAttribute("uv",new ye(u,2));function m(_,g,p,y,v,x,T,E,w,C,M){let S=x/w,P=T/C,U=x/2,B=T/2,k=E/2,z=w+1,W=C+1,Q=0,G=0,he=new R;for(let me=0;me<W;me++){let Me=me*P-B;for(let Ve=0;Ve<z;Ve++){let $e=Ve*S-U;he[_]=$e*y,he[g]=Me*v,he[p]=k,l.push(he.x,he.y,he.z),he[_]=0,he[g]=0,he[p]=E>0?1:-1,h.push(he.x,he.y,he.z),u.push(Ve/w),u.push(1-me/C),Q+=1}}for(let me=0;me<C;me++)for(let Me=0;Me<w;Me++){let Ve=d+Me+z*me,$e=d+Me+z*(me+1),rt=d+(Me+1)+z*(me+1),je=d+(Me+1)+z*me;c.push(Ve,$e,je),c.push($e,rt,je),G+=6}a.addGroup(f,G,M),f+=G,d+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};Wf={clone:Ns,merge:Ht},b_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,tn=class extends Ct{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=b_,this.fragmentShader=T_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ns(e.uniforms),this.uniformsGroups=S_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},xs=class extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ue,this.projectionMatrix=new Ue,this.projectionMatrixInverse=new Ue,this.coordinateSystem=Qt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},bi=new R,ip=new K,sp=new K,Tt=class extends xs{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ds*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ls*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ds*2*Math.atan(Math.tan(ls*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){bi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(bi.x,bi.y).multiplyScalar(-e/bi.z),bi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(bi.x,bi.y).multiplyScalar(-e/bi.z)}getViewSize(e,t){return this.getViewBounds(e,ip,sp),t.subVectors(sp,ip)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ls*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,t-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}let a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ks=-90,js=1,vo=class extends at{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Tt(Ks,js,e,t);i.layers=this.layers,this.add(i);let r=new Tt(Ks,js,e,t);r.layers=this.layers,this.add(r);let o=new Tt(Ks,js,e,t);o.layers=this.layers,this.add(o);let a=new Tt(Ks,js,e,t);a.layers=this.layers,this.add(a);let c=new Tt(Ks,js,e,t);c.layers=this.layers,this.add(c);let l=new Tt(Ks,js,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,c]=t;for(let l of t)this.remove(l);if(e===Qt)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===fs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,c),e.setRenderTarget(n,4,i),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},Ui=class extends St{constructor(e=[],t=Jn,n,i,r,o,a,c,l,h){super(e,t,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Mo=class extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Ui(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Sn(5,5,5),r=new tn({name:"CubemapFromEquirect",uniforms:Ns(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Vt,blending:Yn});r.uniforms.tEquirect.value=t;let o=new pt(i,r),a=t.minFilter;return t.minFilter===mn&&(t.minFilter=vt),new vo(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){let r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}},Ln=class extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}},E_={type:"move"},ys=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ln,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ln,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ln,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(let _ of e.hand.values()){let g=t.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;l.inputState.pinching&&d>f+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(E_)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ln;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},So=class s{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new de(e),this.density=t}clone(){return new s(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}},bo=class s{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new de(e),this.near=t,this.far=n}clone(){return new s(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Ni=class extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new en,this.environmentIntensity=1,this.environmentRotation=new en,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},vs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ur,this.updateRanges=[],this.version=0,this.uuid=hn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Wt=new R,Fi=class s{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Xt(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Xe(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Xe(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Xt(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Xt(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Xt(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Xt(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Xe(t,this.array),n=Xe(n,this.array),i=Xe(i,this.array),r=Xe(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new Je(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new s(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},_r=class extends Ct{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},io=new R,er=new R,tr=new R,nr=new K,so=new K,Fm=new Ue,kc=new R,ro=new R,Vc=new R,rp=new K,yu=new K,op=new K,To=class extends at{constructor(e=new _r){if(super(),this.isSprite=!0,this.type="Sprite",Qs===void 0){Qs=new ke;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new vs(t,5);Qs.setIndex([0,1,2,0,2,3]),Qs.setAttribute("position",new Fi(n,3,0,!1)),Qs.setAttribute("uv",new Fi(n,2,3,!1))}this.geometry=Qs,this.material=e,this.center=new K(.5,.5),this.count=1}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),er.setFromMatrixScale(this.matrixWorld),Fm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),tr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&er.multiplyScalar(-tr.z);let n=this.material.rotation,i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));let o=this.center;Hc(kc.set(-.5,-.5,0),tr,o,er,i,r),Hc(ro.set(.5,-.5,0),tr,o,er,i,r),Hc(Vc.set(.5,.5,0),tr,o,er,i,r),rp.set(0,0),yu.set(1,0),op.set(1,1);let a=e.ray.intersectTriangle(kc,ro,Vc,!1,io);if(a===null&&(Hc(ro.set(-.5,.5,0),tr,o,er,i,r),yu.set(0,1),a=e.ray.intersectTriangle(kc,Vc,ro,!1,io),a===null))return;let c=e.ray.origin.distanceTo(io);c<e.near||c>e.far||t.push({distance:c,point:io.clone(),uv:Pn.getInterpolation(io,kc,ro,Vc,rp,yu,op,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};Gc=new R,ap=new R,Eo=class extends at{constructor(){super(),this.isLOD=!0,this._currentLevel=0,this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}}),this.autoUpdate=!0}copy(e){super.copy(e,!1);let t=e.levels;for(let n=0,i=t.length;n<i;n++){let r=t[n];this.addLevel(r.object.clone(),r.distance,r.hysteresis)}return this.autoUpdate=e.autoUpdate,this}addLevel(e,t=0,n=0){t=Math.abs(t);let i=this.levels,r;for(r=0;r<i.length&&!(t<i[r].distance);r++);return i.splice(r,0,{distance:t,hysteresis:n,object:e}),this.add(e),this}removeLevel(e){let t=this.levels;for(let n=0;n<t.length;n++)if(t[n].distance===e){let i=t.splice(n,1);return this.remove(i[0].object),!0}return!1}getCurrentLevel(){return this._currentLevel}getObjectForDistance(e){let t=this.levels;if(t.length>0){let n,i;for(n=1,i=t.length;n<i;n++){let r=t[n].distance;if(t[n].object.visible&&(r-=r*t[n].hysteresis),e<r)break}return t[n-1].object}return null}raycast(e,t){if(this.levels.length>0){Gc.setFromMatrixPosition(this.matrixWorld);let i=e.ray.origin.distanceTo(Gc);this.getObjectForDistance(i).raycast(e,t)}}update(e){let t=this.levels;if(t.length>1){Gc.setFromMatrixPosition(e.matrixWorld),ap.setFromMatrixPosition(this.matrixWorld);let n=Gc.distanceTo(ap)/e.zoom;t[0].object.visible=!0;let i,r;for(i=1,r=t.length;i<r;i++){let o=t[i].distance;if(t[i].object.visible&&(o-=o*t[i].hysteresis),n>=o)t[i-1].object.visible=!1,t[i].object.visible=!0;else break}for(this._currentLevel=i-1;i<r;i++)t[i].object.visible=!1}}toJSON(e){let t=super.toJSON(e);this.autoUpdate===!1&&(t.object.autoUpdate=!1),t.object.levels=[];let n=this.levels;for(let i=0,r=n.length;i<r;i++){let o=n[i];t.object.levels.push({object:o.object.uuid,distance:o.distance,hysteresis:o.hysteresis})}return t}},cp=new R,lp=new it,hp=new it,w_=new R,up=new Ue,Wc=new R,vu=new Et,fp=new Ue,Mu=new ci,wo=class extends pt{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=fl,this.bindMatrix=new Ue,this.bindMatrixInverse=new Ue,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Rt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Wc),this.boundingBox.expandByPoint(Wc)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Et),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Wc),this.boundingSphere.expandByPoint(Wc)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),vu.copy(this.boundingSphere),vu.applyMatrix4(i),e.ray.intersectsSphere(vu)!==!1&&(fp.copy(i).invert(),Mu.copy(e.ray).applyMatrix4(fp),!(this.boundingBox!==null&&Mu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Mu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new it,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===fl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===wf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;lp.fromBufferAttribute(i.attributes.skinIndex,e),hp.fromBufferAttribute(i.attributes.skinWeight,e),cp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let o=hp.getComponent(r);if(o!==0){let a=lp.getComponent(r);up.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(w_.copy(cp).applyMatrix4(up),o)}}return t.applyMatrix4(this.bindMatrixInverse)}},xr=class extends at{constructor(){super(),this.isBone=!0,this.type="Bone"}},un=class extends St{constructor(e=null,t=1,n=1,i,r,o,a,c,l=wt,h=wt,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},dp=new Ue,A_=new Ue,Ao=class s{constructor(e=[],t=[]){this.uuid=hn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ue)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ue;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){let a=e[r]?e[r].matrixWorld:A_;dp.multiplyMatrices(a,t[r]),dp.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new s(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new un(t,e,e,Ut,Yt);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let r=e.bones[n],o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new xr),this.bones.push(o),this.boneInverses.push(new Ue().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){let o=t[i];e.bones.push(o.uuid);let a=n[i];e.boneInverses.push(a.toArray())}return e}},li=class extends Je{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ir=new Ue,pp=new Ue,Xc=[],mp=new Rt,R_=new Ue,oo=new pt,ao=new Et,Ro=class extends pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new li(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,R_)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Rt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ir),mp.copy(e.boundingBox).applyMatrix4(ir),this.boundingBox.union(mp)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Et),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ir),ao.copy(e.boundingSphere).applyMatrix4(ir),this.boundingSphere.union(ao)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(oo.geometry=this.geometry,oo.material=this.material,oo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ao.copy(this.boundingSphere),ao.applyMatrix4(n),e.ray.intersectsSphere(ao)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ir),pp.multiplyMatrices(n,ir),oo.matrixWorld=pp,oo.raycast(e,Xc);for(let o=0,a=Xc.length;o<a;o++){let c=Xc[o];c.instanceId=r,c.object=this,t.push(c)}Xc.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new li(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new un(new Float32Array(i*this.count),i,this.count,Oa,Yt));let r=this.morphTexture.source.data.data,o=0;for(let l=0;l<n.length;l++)o+=n[l];let a=this.geometry.morphTargetsRelative?1:1-o,c=i*e;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Su=new R,C_=new R,I_=new ze,In=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=Su.subVectors(n,t).cross(C_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Su),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||I_.getNormalMatrix(e),i=this.coplanarPoint(Su).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Qi=new Et,P_=new K(.5,.5),qc=new R,hi=class{constructor(e=new In,t=new In,n=new In,i=new In,r=new In,o=new In){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Qt,n=!1){let i=this.planes,r=e.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],d=r[6],f=r[7],m=r[8],_=r[9],g=r[10],p=r[11],y=r[12],v=r[13],x=r[14],T=r[15];if(i[0].setComponents(l-o,f-h,p-m,T-y).normalize(),i[1].setComponents(l+o,f+h,p+m,T+y).normalize(),i[2].setComponents(l+a,f+u,p+_,T+v).normalize(),i[3].setComponents(l-a,f-u,p-_,T-v).normalize(),n)i[4].setComponents(c,d,g,x).normalize(),i[5].setComponents(l-c,f-d,p-g,T-x).normalize();else if(i[4].setComponents(l-c,f-d,p-g,T-x).normalize(),t===Qt)i[5].setComponents(l+c,f+d,p+g,T+x).normalize();else if(t===fs)i[5].setComponents(c,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qi)}intersectsSprite(e){Qi.center.set(0,0,0);let t=P_.distanceTo(e.center);return Qi.radius=.7071067811865476+t,Qi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qi)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(qc.x=i.normal.x>0?e.max.x:e.min.x,qc.y=i.normal.y>0?e.max.y:e.min.y,qc.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(qc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Hn=new Ue,Gn=new hi,Co=class s{constructor(){this.coordinateSystem=Qt}intersectsObject(e,t){if(!t.isArrayCamera||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Hn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(Hn,i.coordinateSystem,i.reversedDepth),Gn.intersectsObject(e))return!0}return!1}intersectsSprite(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Hn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(Hn,i.coordinateSystem,i.reversedDepth),Gn.intersectsSprite(e))return!0}return!1}intersectsSphere(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Hn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(Hn,i.coordinateSystem,i.reversedDepth),Gn.intersectsSphere(e))return!0}return!1}intersectsBox(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Hn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(Hn,i.coordinateSystem,i.reversedDepth),Gn.intersectsBox(e))return!0}return!1}containsPoint(e,t){if(!t||!t.cameras||t.cameras.length===0)return!1;for(let n=0;n<t.cameras.length;n++){let i=t.cameras[n];if(Hn.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),Gn.setFromProjectionMatrix(Hn,i.coordinateSystem,i.reversedDepth),Gn.containsPoint(e))return!0}return!1}clone(){return new s}};Ou=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let r=this.pool,o=this.list;this.index>=r.length&&r.push({start:-1,count:-1,z:-1,index:-1});let a=r[this.index];o.push(a),this.index++,a.start=e,a.count=t,a.z=n,a.index=i}reset(){this.list.length=0,this.index=0}},Kt=new Ue,U_=new de(1,1,1),gp=new hi,N_=new Co,Yc=new Rt,es=new Et,co=new R,_p=new R,F_=new R,Tu=new Ou,kt=new pt,Zc=[];Io=class extends pt{constructor(e,t,n=t*2,i){super(new ke,i),this.isBatchedMesh=!0,this.perObjectFrustumCulled=!0,this.sortObjects=!0,this.boundingBox=null,this.boundingSphere=null,this.customSort=null,this._instanceInfo=[],this._geometryInfo=[],this._availableInstanceIds=[],this._availableGeometryIds=[],this._nextIndexStart=0,this._nextVertexStart=0,this._geometryCount=0,this._visibilityChanged=!0,this._geometryInitialized=!1,this._maxInstanceCount=e,this._maxVertexCount=t,this._maxIndexCount=n,this._multiDrawCounts=new Int32Array(e),this._multiDrawStarts=new Int32Array(e),this._multiDrawCount=0,this._multiDrawInstances=null,this._matricesTexture=null,this._indirectTexture=null,this._colorsTexture=null,this._initMatricesTexture(),this._initIndirectTexture()}get maxInstanceCount(){return this._maxInstanceCount}get instanceCount(){return this._instanceInfo.length-this._availableInstanceIds.length}get unusedVertexCount(){return this._maxVertexCount-this._nextVertexStart}get unusedIndexCount(){return this._maxIndexCount-this._nextIndexStart}_initMatricesTexture(){let e=Math.sqrt(this._maxInstanceCount*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4),n=new un(t,e,e,Ut,Yt);this._matricesTexture=n}_initIndirectTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Uint32Array(e*e),n=new un(t,e,e,kr,$n);this._indirectTexture=n}_initColorsTexture(){let e=Math.sqrt(this._maxInstanceCount);e=Math.ceil(e);let t=new Float32Array(e*e*4).fill(1),n=new un(t,e,e,Ut,Yt);n.colorSpace=tt.workingColorSpace,this._colorsTexture=n}_initializeGeometry(e){let t=this.geometry,n=this._maxVertexCount,i=this._maxIndexCount;if(this._geometryInitialized===!1){for(let r in e.attributes){let o=e.getAttribute(r),{array:a,itemSize:c,normalized:l}=o,h=new a.constructor(n*c),u=new Je(h,c,l);t.setAttribute(r,u)}if(e.getIndex()!==null){let r=n>65535?new Uint32Array(i):new Uint16Array(i);t.setIndex(new Je(r,1))}this._geometryInitialized=!0}}_validateGeometry(e){let t=this.geometry;if(!!e.getIndex()!=!!t.getIndex())throw new Error('THREE.BatchedMesh: All geometries must consistently have "index".');for(let n in t.attributes){if(!e.hasAttribute(n))throw new Error(`THREE.BatchedMesh: Added geometry missing "${n}". All geometries must have consistent attributes.`);let i=e.getAttribute(n),r=t.getAttribute(n);if(i.itemSize!==r.itemSize||i.normalized!==r.normalized)throw new Error("THREE.BatchedMesh: All attributes must have a consistent itemSize and normalized value.")}}validateInstanceId(e){let t=this._instanceInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid instanceId ${e}. Instance is either out of range or has been deleted.`)}validateGeometryId(e){let t=this._geometryInfo;if(e<0||e>=t.length||t[e].active===!1)throw new Error(`THREE.BatchedMesh: Invalid geometryId ${e}. Geometry is either out of range or has been deleted.`)}setCustomSort(e){return this.customSort=e,this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Rt);let e=this.boundingBox,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Kt),this.getBoundingBoxAt(r,Yc).applyMatrix4(Kt),e.union(Yc)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Et);let e=this.boundingSphere,t=this._instanceInfo;e.makeEmpty();for(let n=0,i=t.length;n<i;n++){if(t[n].active===!1)continue;let r=t[n].geometryIndex;this.getMatrixAt(n,Kt),this.getBoundingSphereAt(r,es).applyMatrix4(Kt),e.union(es)}}addInstance(e){if(this._instanceInfo.length>=this.maxInstanceCount&&this._availableInstanceIds.length===0)throw new Error("THREE.BatchedMesh: Maximum item count reached.");let n={visible:!0,active:!0,geometryIndex:e},i=null;this._availableInstanceIds.length>0?(this._availableInstanceIds.sort(bu),i=this._availableInstanceIds.shift(),this._instanceInfo[i]=n):(i=this._instanceInfo.length,this._instanceInfo.push(n));let r=this._matricesTexture;Kt.identity().toArray(r.image.data,i*16),r.needsUpdate=!0;let o=this._colorsTexture;return o&&(U_.toArray(o.image.data,i*4),o.needsUpdate=!0),this._visibilityChanged=!0,i}addGeometry(e,t=-1,n=-1){this._initializeGeometry(e),this._validateGeometry(e);let i={vertexStart:-1,vertexCount:-1,reservedVertexCount:-1,indexStart:-1,indexCount:-1,reservedIndexCount:-1,start:-1,count:-1,boundingBox:null,boundingSphere:null,active:!0},r=this._geometryInfo;i.vertexStart=this._nextVertexStart,i.reservedVertexCount=t===-1?e.getAttribute("position").count:t;let o=e.getIndex();if(o!==null&&(i.indexStart=this._nextIndexStart,i.reservedIndexCount=n===-1?o.count:n),i.indexStart!==-1&&i.indexStart+i.reservedIndexCount>this._maxIndexCount||i.vertexStart+i.reservedVertexCount>this._maxVertexCount)throw new Error("THREE.BatchedMesh: Reserved space request exceeds the maximum buffer size.");let c;return this._availableGeometryIds.length>0?(this._availableGeometryIds.sort(bu),c=this._availableGeometryIds.shift(),r[c]=i):(c=this._geometryCount,this._geometryCount++,r.push(i)),this.setGeometryAt(c,e),this._nextIndexStart=i.indexStart+i.reservedIndexCount,this._nextVertexStart=i.vertexStart+i.reservedVertexCount,c}setGeometryAt(e,t){if(e>=this._geometryCount)throw new Error("THREE.BatchedMesh: Maximum geometry count reached.");this._validateGeometry(t);let n=this.geometry,i=n.getIndex()!==null,r=n.getIndex(),o=t.getIndex(),a=this._geometryInfo[e];if(i&&o.count>a.reservedIndexCount||t.attributes.position.count>a.reservedVertexCount)throw new Error("THREE.BatchedMesh: Reserved space not large enough for provided geometry.");let c=a.vertexStart,l=a.reservedVertexCount;a.vertexCount=t.getAttribute("position").count;for(let h in n.attributes){let u=t.getAttribute(h),d=n.getAttribute(h);O_(u,d,c);let f=u.itemSize;for(let m=u.count,_=l;m<_;m++){let g=c+m;for(let p=0;p<f;p++)d.setComponent(g,p,0)}d.needsUpdate=!0,d.addUpdateRange(c*f,l*f)}if(i){let h=a.indexStart,u=a.reservedIndexCount;a.indexCount=t.getIndex().count;for(let d=0;d<o.count;d++)r.setX(h+d,c+o.getX(d));for(let d=o.count,f=u;d<f;d++)r.setX(h+d,c);r.needsUpdate=!0,r.addUpdateRange(h,a.reservedIndexCount)}return a.start=i?a.indexStart:a.vertexStart,a.count=i?a.indexCount:a.vertexCount,a.boundingBox=null,t.boundingBox!==null&&(a.boundingBox=t.boundingBox.clone()),a.boundingSphere=null,t.boundingSphere!==null&&(a.boundingSphere=t.boundingSphere.clone()),this._visibilityChanged=!0,e}deleteGeometry(e){let t=this._geometryInfo;if(e>=t.length||t[e].active===!1)return this;let n=this._instanceInfo;for(let i=0,r=n.length;i<r;i++)n[i].active&&n[i].geometryIndex===e&&this.deleteInstance(i);return t[e].active=!1,this._availableGeometryIds.push(e),this._visibilityChanged=!0,this}deleteInstance(e){return this.validateInstanceId(e),this._instanceInfo[e].active=!1,this._availableInstanceIds.push(e),this._visibilityChanged=!0,this}optimize(){let e=0,t=0,n=this._geometryInfo,i=n.map((o,a)=>a).sort((o,a)=>n[o].vertexStart-n[a].vertexStart),r=this.geometry;for(let o=0,a=n.length;o<a;o++){let c=i[o],l=n[c];if(l.active!==!1){if(r.index!==null){if(l.indexStart!==t){let{indexStart:h,vertexStart:u,reservedIndexCount:d}=l,f=r.index,m=f.array,_=e-u;for(let g=h;g<h+d;g++)m[g]=m[g]+_;f.array.copyWithin(t,h,h+d),f.addUpdateRange(t,d),l.indexStart=t}t+=l.reservedIndexCount}if(l.vertexStart!==e){let{vertexStart:h,reservedVertexCount:u}=l,d=r.attributes;for(let f in d){let m=d[f],{array:_,itemSize:g}=m;_.copyWithin(e*g,h*g,(h+u)*g),m.addUpdateRange(e*g,u*g)}l.vertexStart=e}e+=l.reservedVertexCount,l.start=r.index?l.indexStart:l.vertexStart,this._nextIndexStart=r.index?l.indexStart+l.reservedIndexCount:0,this._nextVertexStart=l.vertexStart+l.reservedVertexCount}}return this}getBoundingBoxAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingBox===null){let r=new Rt,o=n.index,a=n.attributes.position;for(let c=i.start,l=i.start+i.count;c<l;c++){let h=c;o&&(h=o.getX(h)),r.expandByPoint(co.fromBufferAttribute(a,h))}i.boundingBox=r}return t.copy(i.boundingBox),t}getBoundingSphereAt(e,t){if(e>=this._geometryCount)return null;let n=this.geometry,i=this._geometryInfo[e];if(i.boundingSphere===null){let r=new Et;this.getBoundingBoxAt(e,Yc),Yc.getCenter(r.center);let o=n.index,a=n.attributes.position,c=0;for(let l=i.start,h=i.start+i.count;l<h;l++){let u=l;o&&(u=o.getX(u)),co.fromBufferAttribute(a,u),c=Math.max(c,r.center.distanceToSquared(co))}r.radius=Math.sqrt(c),i.boundingSphere=r}return t.copy(i.boundingSphere),t}setMatrixAt(e,t){this.validateInstanceId(e);let n=this._matricesTexture,i=this._matricesTexture.image.data;return t.toArray(i,e*16),n.needsUpdate=!0,this}getMatrixAt(e,t){return this.validateInstanceId(e),t.fromArray(this._matricesTexture.image.data,e*16)}setColorAt(e,t){return this.validateInstanceId(e),this._colorsTexture===null&&this._initColorsTexture(),t.toArray(this._colorsTexture.image.data,e*4),this._colorsTexture.needsUpdate=!0,this}getColorAt(e,t){return this.validateInstanceId(e),t.fromArray(this._colorsTexture.image.data,e*4)}setVisibleAt(e,t){return this.validateInstanceId(e),this._instanceInfo[e].visible===t?this:(this._instanceInfo[e].visible=t,this._visibilityChanged=!0,this)}getVisibleAt(e){return this.validateInstanceId(e),this._instanceInfo[e].visible}setGeometryIdAt(e,t){return this.validateInstanceId(e),this.validateGeometryId(t),this._instanceInfo[e].geometryIndex=t,this}getGeometryIdAt(e){return this.validateInstanceId(e),this._instanceInfo[e].geometryIndex}getGeometryRangeAt(e,t={}){this.validateGeometryId(e);let n=this._geometryInfo[e];return t.vertexStart=n.vertexStart,t.vertexCount=n.vertexCount,t.reservedVertexCount=n.reservedVertexCount,t.indexStart=n.indexStart,t.indexCount=n.indexCount,t.reservedIndexCount=n.reservedIndexCount,t.start=n.start,t.count=n.count,t}setInstanceCount(e){let t=this._availableInstanceIds,n=this._instanceInfo;for(t.sort(bu);t[t.length-1]===n.length-1;)n.pop(),t.pop();if(e<n.length)throw new Error(`BatchedMesh: Instance ids outside the range ${e} are being used. Cannot shrink instance count.`);let i=new Int32Array(e),r=new Int32Array(e);ts(this._multiDrawCounts,i),ts(this._multiDrawStarts,r),this._multiDrawCounts=i,this._multiDrawStarts=r,this._maxInstanceCount=e;let o=this._indirectTexture,a=this._matricesTexture,c=this._colorsTexture;o.dispose(),this._initIndirectTexture(),ts(o.image.data,this._indirectTexture.image.data),a.dispose(),this._initMatricesTexture(),ts(a.image.data,this._matricesTexture.image.data),c&&(c.dispose(),this._initColorsTexture(),ts(c.image.data,this._colorsTexture.image.data))}setGeometrySize(e,t){let n=[...this._geometryInfo].filter(a=>a.active);if(Math.max(...n.map(a=>a.vertexStart+a.reservedVertexCount))>e)throw new Error(`BatchedMesh: Geometry vertex values are being used outside the range ${t}. Cannot shrink further.`);if(this.geometry.index&&Math.max(...n.map(c=>c.indexStart+c.reservedIndexCount))>t)throw new Error(`BatchedMesh: Geometry index values are being used outside the range ${t}. Cannot shrink further.`);let r=this.geometry;r.dispose(),this._maxVertexCount=e,this._maxIndexCount=t,this._geometryInitialized&&(this._geometryInitialized=!1,this.geometry=new ke,this._initializeGeometry(r));let o=this.geometry;r.index&&ts(r.index.array,o.index.array);for(let a in r.attributes)ts(r.attributes[a].array,o.attributes[a].array)}raycast(e,t){let n=this._instanceInfo,i=this._geometryInfo,r=this.matrixWorld,o=this.geometry;kt.material=this.material,kt.geometry.index=o.index,kt.geometry.attributes=o.attributes,kt.geometry.boundingBox===null&&(kt.geometry.boundingBox=new Rt),kt.geometry.boundingSphere===null&&(kt.geometry.boundingSphere=new Et);for(let a=0,c=n.length;a<c;a++){if(!n[a].visible||!n[a].active)continue;let l=n[a].geometryIndex,h=i[l];kt.geometry.setDrawRange(h.start,h.count),this.getMatrixAt(a,kt.matrixWorld).premultiply(r),this.getBoundingBoxAt(l,kt.geometry.boundingBox),this.getBoundingSphereAt(l,kt.geometry.boundingSphere),kt.raycast(e,Zc);for(let u=0,d=Zc.length;u<d;u++){let f=Zc[u];f.object=this,f.batchId=a,t.push(f)}Zc.length=0}kt.material=null,kt.geometry.index=null,kt.geometry.attributes={},kt.geometry.setDrawRange(0,1/0)}copy(e){return super.copy(e),this.geometry=e.geometry.clone(),this.perObjectFrustumCulled=e.perObjectFrustumCulled,this.sortObjects=e.sortObjects,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this._geometryInfo=e._geometryInfo.map(t=>({...t,boundingBox:t.boundingBox!==null?t.boundingBox.clone():null,boundingSphere:t.boundingSphere!==null?t.boundingSphere.clone():null})),this._instanceInfo=e._instanceInfo.map(t=>({...t})),this._availableInstanceIds=e._availableInstanceIds.slice(),this._availableGeometryIds=e._availableGeometryIds.slice(),this._nextIndexStart=e._nextIndexStart,this._nextVertexStart=e._nextVertexStart,this._geometryCount=e._geometryCount,this._maxInstanceCount=e._maxInstanceCount,this._maxVertexCount=e._maxVertexCount,this._maxIndexCount=e._maxIndexCount,this._geometryInitialized=e._geometryInitialized,this._multiDrawCounts=e._multiDrawCounts.slice(),this._multiDrawStarts=e._multiDrawStarts.slice(),this._indirectTexture=e._indirectTexture.clone(),this._indirectTexture.image.data=this._indirectTexture.image.data.slice(),this._matricesTexture=e._matricesTexture.clone(),this._matricesTexture.image.data=this._matricesTexture.image.data.slice(),this._colorsTexture!==null&&(this._colorsTexture=e._colorsTexture.clone(),this._colorsTexture.image.data=this._colorsTexture.image.data.slice()),this}dispose(){this.geometry.dispose(),this._matricesTexture.dispose(),this._matricesTexture=null,this._indirectTexture.dispose(),this._indirectTexture=null,this._colorsTexture!==null&&(this._colorsTexture.dispose(),this._colorsTexture=null)}onBeforeRender(e,t,n,i,r){if(!this._visibilityChanged&&!this.perObjectFrustumCulled&&!this.sortObjects)return;let o=i.getIndex(),a=o===null?1:o.array.BYTES_PER_ELEMENT,c=this._instanceInfo,l=this._multiDrawStarts,h=this._multiDrawCounts,u=this._geometryInfo,d=this.perObjectFrustumCulled,f=this._indirectTexture,m=f.image.data,_=n.isArrayCamera?N_:gp;d&&!n.isArrayCamera&&(Kt.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse).multiply(this.matrixWorld),gp.setFromProjectionMatrix(Kt,n.coordinateSystem,n.reversedDepth));let g=0;if(this.sortObjects){Kt.copy(this.matrixWorld).invert(),co.setFromMatrixPosition(n.matrixWorld).applyMatrix4(Kt),_p.set(0,0,-1).transformDirection(n.matrixWorld).transformDirection(Kt);for(let v=0,x=c.length;v<x;v++)if(c[v].visible&&c[v].active){let T=c[v].geometryIndex;this.getMatrixAt(v,Kt),this.getBoundingSphereAt(T,es).applyMatrix4(Kt);let E=!1;if(d&&(E=!_.intersectsSphere(es,n)),!E){let w=u[T],C=F_.subVectors(es.center,co).dot(_p);Tu.push(w.start,w.count,C,v)}}let p=Tu.list,y=this.customSort;y===null?p.sort(r.transparent?D_:L_):y.call(this,p,n);for(let v=0,x=p.length;v<x;v++){let T=p[v];l[g]=T.start*a,h[g]=T.count,m[g]=T.index,g++}Tu.reset()}else for(let p=0,y=c.length;p<y;p++)if(c[p].visible&&c[p].active){let v=c[p].geometryIndex,x=!1;if(d&&(this.getMatrixAt(p,Kt),this.getBoundingSphereAt(v,es).applyMatrix4(Kt),x=!_.intersectsSphere(es,n)),!x){let T=u[v];l[g]=T.start*a,h[g]=T.count,m[g]=p,g++}}f.needsUpdate=!0,this._multiDrawCount=g,this._visibilityChanged=!1}onBeforeShadow(e,t,n,i,r,o){this.onBeforeRender(e,null,i,r,o)}},Nt=class extends Ct{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new de(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},bl=new R,Tl=new R,xp=new Ue,lo=new ci,Jc=new Et,Eu=new R,yp=new R,Nn=class extends at{constructor(e=new ke,t=new Nt){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)bl.fromBufferAttribute(t,i-1),Tl.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=bl.distanceTo(Tl);e.setAttribute("lineDistance",new ye(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Jc.copy(n.boundingSphere),Jc.applyMatrix4(i),Jc.radius+=r,e.ray.intersectsSphere(Jc)===!1)return;xp.copy(i).invert(),lo.copy(e.ray).applyMatrix4(xp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let f=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){let p=h.getX(_),y=h.getX(_+1),v=$c(this,e,lo,c,p,y,_);v&&t.push(v)}if(this.isLineLoop){let _=h.getX(m-1),g=h.getX(f),p=$c(this,e,lo,c,_,g,m-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=f,g=m-1;_<g;_+=l){let p=$c(this,e,lo,c,_,_+1,_);p&&t.push(p)}if(this.isLineLoop){let _=$c(this,e,lo,c,m-1,f,m-1);_&&t.push(_)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};vp=new R,Mp=new R,pn=class extends Nn{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)vp.fromBufferAttribute(t,i),Mp.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+vp.distanceTo(Mp);e.setAttribute("lineDistance",new ye(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Po=class extends Nn{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},yr=class extends Ct{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new de(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Sp=new Ue,Bu=new ci,Kc=new Et,jc=new R,Lo=class extends at{constructor(e=new ke,t=new yr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Kc.copy(n.boundingSphere),Kc.applyMatrix4(i),Kc.radius+=r,e.ray.intersectsSphere(Kc)===!1)return;Sp.copy(i).invert(),Bu.copy(e.ray).applyMatrix4(Sp);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){let d=Math.max(0,o.start),f=Math.min(l.count,o.start+o.count);for(let m=d,_=f;m<_;m++){let g=l.getX(m);jc.fromBufferAttribute(u,g),bp(jc,g,c,i,e,t,this)}}else{let d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let m=d,_=f;m<_;m++)jc.fromBufferAttribute(u,m),bp(jc,m,c,i,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){let a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}};Do=class extends St{constructor(e,t,n,i,r=vt,o=vt,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isVideoTexture=!0,this.generateMipmaps=!1,this._requestVideoFrameCallbackId=0;let h=this;function u(){h.needsUpdate=!0,h._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u)}"requestVideoFrameCallback"in e&&(this._requestVideoFrameCallbackId=e.requestVideoFrameCallback(u))}clone(){return new this.constructor(this.image).copy(this)}update(){let e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}dispose(){this._requestVideoFrameCallbackId!==0&&this.source.data.cancelVideoFrameCallback(this._requestVideoFrameCallbackId),super.dispose()}},El=class extends Do{constructor(e,t,n,i,r,o,a,c){super({},e,t,n,i,r,o,a,c),this.isVideoFrameTexture=!0}update(){}clone(){return new this.constructor().copy(this)}setFrame(e){this.image=e,this.needsUpdate=!0}},wl=class extends St{constructor(e,t){super({width:e,height:t}),this.isFramebufferTexture=!0,this.magFilter=wt,this.minFilter=wt,this.generateMipmaps=!1,this.needsUpdate=!0}},Fn=class extends St{constructor(e,t,n,i,r,o,a,c,l,h,u,d){super(null,o,a,c,l,h,i,r,u,d),this.isCompressedTexture=!0,this.image={width:t,height:n},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}},Al=class extends Fn{constructor(e,t,n,i,r,o){super(e,t,n,r,o),this.isCompressedArrayTexture=!0,this.image.depth=i,this.wrapR=qt,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Rl=class extends Fn{constructor(e,t,n){super(void 0,e[0].width,e[0].height,t,n,Jn),this.isCompressedCubeTexture=!0,this.isCubeTexture=!0,this.image=e}},Cl=class extends St{constructor(e,t,n,i,r,o,a,c,l){super(e,t,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},vr=class extends St{constructor(e,t,n=$n,i,r,o,a=wt,c=wt,l,h=hs,u=1){if(h!==hs&&h!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ln(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Mr=class extends St{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ms=class s extends ke{constructor(e=1,t=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));let o=[],a=[],c=[],l=[],h=t/2,u=Math.PI/2*e,d=t,f=2*u+d,m=n*2+r,_=i+1,g=new R,p=new R;for(let y=0;y<=m;y++){let v=0,x=0,T=0,E=0;if(y<=n){let M=y/n,S=M*Math.PI/2;x=-h-e*Math.cos(S),T=e*Math.sin(S),E=-e*Math.cos(S),v=M*u}else if(y<=n+r){let M=(y-n)/r;x=-h+M*t,T=e,E=0,v=u+M*d}else{let M=(y-n-r)/n,S=M*Math.PI/2;x=h+e*Math.sin(S),T=e*Math.cos(S),E=e*Math.sin(S),v=u+d+M*u}let w=Math.max(0,Math.min(1,v/f)),C=0;y===0?C=.5/i:y===m&&(C=-.5/i);for(let M=0;M<=i;M++){let S=M/i,P=S*Math.PI*2,U=Math.sin(P),B=Math.cos(P);p.x=-T*B,p.y=x,p.z=T*U,a.push(p.x,p.y,p.z),g.set(-T*B,E,T*U),g.normalize(),c.push(g.x,g.y,g.z),l.push(S+C,w)}if(y>0){let M=(y-1)*_;for(let S=0;S<i;S++){let P=M+S,U=M+S+1,B=y*_+S,k=y*_+S+1;o.push(P,U,B),o.push(U,k,B)}}}this.setIndex(o),this.setAttribute("position",new ye(a,3)),this.setAttribute("normal",new ye(c,3)),this.setAttribute("uv",new ye(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}},Uo=class s extends ke{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let r=[],o=[],a=[],c=[],l=new R,h=new K;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let f=n+u/t*i;l.x=e*Math.cos(f),l.y=e*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/e+1)/2,h.y=(o[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ye(o,3)),this.setAttribute("normal",new ye(a,3)),this.setAttribute("uv",new ye(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.segments,e.thetaStart,e.thetaLength)}},Oi=class s extends ke{constructor(e=1,t=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;i=Math.floor(i),r=Math.floor(r);let h=[],u=[],d=[],f=[],m=0,_=[],g=n/2,p=0;y(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new ye(u,3)),this.setAttribute("normal",new ye(d,3)),this.setAttribute("uv",new ye(f,2));function y(){let x=new R,T=new R,E=0,w=(t-e)/n;for(let C=0;C<=r;C++){let M=[],S=C/r,P=S*(t-e)+e;for(let U=0;U<=i;U++){let B=U/i,k=B*c+a,z=Math.sin(k),W=Math.cos(k);T.x=P*z,T.y=-S*n+g,T.z=P*W,u.push(T.x,T.y,T.z),x.set(z,w,W).normalize(),d.push(x.x,x.y,x.z),f.push(B,1-S),M.push(m++)}_.push(M)}for(let C=0;C<i;C++)for(let M=0;M<r;M++){let S=_[M][C],P=_[M+1][C],U=_[M+1][C+1],B=_[M][C+1];(e>0||M!==0)&&(h.push(S,P,B),E+=3),(t>0||M!==r-1)&&(h.push(P,U,B),E+=3)}l.addGroup(p,E,0),p+=E}function v(x){let T=m,E=new K,w=new R,C=0,M=x===!0?e:t,S=x===!0?1:-1;for(let U=1;U<=i;U++)u.push(0,g*S,0),d.push(0,S,0),f.push(.5,.5),m++;let P=m;for(let U=0;U<=i;U++){let k=U/i*c+a,z=Math.cos(k),W=Math.sin(k);w.x=M*W,w.y=g*S,w.z=M*z,u.push(w.x,w.y,w.z),d.push(0,S,0),E.x=z*.5+.5,E.y=W*.5*S+.5,f.push(E.x,E.y),m++}for(let U=0;U<i;U++){let B=T+U,k=P+U;x===!0?h.push(k,k+1,B):h.push(k+1,k,B),C+=3}l.addGroup(p,C,x===!0?1:2),p+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},ui=class s extends Oi{constructor(e=1,t=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new s(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},fi=class s extends ke{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new ye(r,3)),this.setAttribute("normal",new ye(r.slice(),3)),this.setAttribute("uv",new ye(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let v=new R,x=new R,T=new R;for(let E=0;E<t.length;E+=3)f(t[E+0],v),f(t[E+1],x),f(t[E+2],T),c(v,x,T,y)}function c(y,v,x,T){let E=T+1,w=[];for(let C=0;C<=E;C++){w[C]=[];let M=y.clone().lerp(x,C/E),S=v.clone().lerp(x,C/E),P=E-C;for(let U=0;U<=P;U++)U===0&&C===E?w[C][U]=M:w[C][U]=M.clone().lerp(S,U/P)}for(let C=0;C<E;C++)for(let M=0;M<2*(E-C)-1;M++){let S=Math.floor(M/2);M%2===0?(d(w[C][S+1]),d(w[C+1][S]),d(w[C][S])):(d(w[C][S+1]),d(w[C+1][S+1]),d(w[C+1][S]))}}function l(y){let v=new R;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(y),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){let y=new R;for(let v=0;v<r.length;v+=3){y.x=r[v+0],y.y=r[v+1],y.z=r[v+2];let x=g(y)/2/Math.PI+.5,T=p(y)/Math.PI+.5;o.push(x,1-T)}m(),u()}function u(){for(let y=0;y<o.length;y+=6){let v=o[y+0],x=o[y+2],T=o[y+4],E=Math.max(v,x,T),w=Math.min(v,x,T);E>.9&&w<.1&&(v<.2&&(o[y+0]+=1),x<.2&&(o[y+2]+=1),T<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,v){let x=y*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function m(){let y=new R,v=new R,x=new R,T=new R,E=new K,w=new K,C=new K;for(let M=0,S=0;M<r.length;M+=9,S+=6){y.set(r[M+0],r[M+1],r[M+2]),v.set(r[M+3],r[M+4],r[M+5]),x.set(r[M+6],r[M+7],r[M+8]),E.set(o[S+0],o[S+1]),w.set(o[S+2],o[S+3]),C.set(o[S+4],o[S+5]),T.copy(y).add(v).add(x).divideScalar(3);let P=g(T);_(E,S+0,y,P),_(w,S+2,v,P),_(C,S+4,x,P)}}function _(y,v,x,T){T<0&&y.x===1&&(o[v]=y.x-1),x.x===0&&x.z===0&&(o[v]=T/2/Math.PI+.5)}function g(y){return Math.atan2(y.z,-y.x)}function p(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.vertices,e.indices,e.radius,e.details)}},No=class s extends fi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},Qc=new R,el=new R,wu=new R,tl=new Pn,Fo=class extends ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),r=Math.cos(ls*t),o=e.getIndex(),a=e.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let m=0;m<c;m+=3){o?(l[0]=o.getX(m),l[1]=o.getX(m+1),l[2]=o.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);let{a:_,b:g,c:p}=tl;if(_.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),tl.getNormal(wu),u[0]=`${Math.round(_.x*i)},${Math.round(_.y*i)},${Math.round(_.z*i)}`,u[1]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[2]=`${Math.round(p.x*i)},${Math.round(p.y*i)},${Math.round(p.z*i)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let y=0;y<3;y++){let v=(y+1)%3,x=u[y],T=u[v],E=tl[h[y]],w=tl[h[v]],C=`${x}_${T}`,M=`${T}_${x}`;M in d&&d[M]?(wu.dot(d[M].normal)<=r&&(f.push(E.x,E.y,E.z),f.push(w.x,w.y,w.z)),d[M]=null):C in d||(d[C]={index0:l[y],index1:l[v],normal:wu.clone()})}}for(let m in d)if(d[m]){let{index0:_,index1:g}=d[m];Qc.fromBufferAttribute(a,_),el.fromBufferAttribute(a,g),f.push(Qc.x,Qc.y,Qc.z),f.push(el.x,el.y,el.z)}this.setAttribute("position",new ye(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},nn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)n=this.getPoint(o/e),r+=n.distanceTo(i),t.push(r),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),i=0,r=n.length,o;t?o=t:o=e*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);let h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(e,t){let i=e-1e-4,r=e+1e-4;i<0&&(i=0),r>1&&(r=1);let o=this.getPoint(i),a=this.getPoint(r),c=t||(o.isVector2?new K:new R);return c.copy(a).sub(o).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new R,i=[],r=[],o=[],a=new R,c=new Ue;for(let f=0;f<=e;f++){let m=f/e;i[f]=this.getTangentAt(m,new R)}r[0]=new R,o[0]=new R;let l=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();let m=Math.acos(Fe(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,m))}o[f].crossVectors(i[f],r[f])}if(t===!0){let f=Math.acos(Fe(r[0].dot(r[e]),-1,1));f/=e,i[0].dot(a.crossVectors(r[0],r[e]))>0&&(f=-f);for(let m=1;m<=e;m++)r[m].applyMatrix4(c.makeRotationAxis(i[m],f*m)),o[m].crossVectors(i[m],r[m])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Ss=class extends nn{constructor(e=0,t=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(e,t=new K){let n=t,i=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);let a=this.aStartAngle+e*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Oo=class extends Ss{constructor(e,t,n,i,r,o){super(e,t,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};nl=new R,Au=new Xf,Ru=new Xf,Cu=new Xf,Bi=class extends nn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new R){let n=t,i=this.points,r=i.length,o=(r-(this.closed?0:1))*e,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(nl.subVectors(i[0],i[1]).add(i[0]),l=nl);let u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(nl.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=nl),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,m=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Au.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,m,_,g),Ru.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,m,_,g),Cu.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(Au.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),Ru.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),Cu.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(Au.calc(c),Ru.calc(c),Cu.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new R().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Sr=class extends nn{constructor(e=new K,t=new K,n=new K,i=new K){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new K){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_o(e,i.x,r.x,o.x,a.x),_o(e,i.y,r.y,o.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Bo=class extends nn{constructor(e=new R,t=new R,n=new R,i=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new R){let n=t,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(_o(e,i.x,r.x,o.x,a.x),_o(e,i.y,r.y,o.y,a.y),_o(e,i.z,r.z,o.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},br=class extends nn{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zo=class extends nn{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Tr=class extends nn{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(go(e,i.x,r.x,o.x),go(e,i.y,r.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Er=class extends nn{constructor(e=new R,t=new R,n=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new R){let n=t,i=this.v0,r=this.v1,o=this.v2;return n.set(go(e,i.x,r.x,o.x),go(e,i.y,r.y,o.y),go(e,i.z,r.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},wr=class extends nn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new K){let n=t,i=this.points,r=(i.length-1)*e,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Tp(a,c.x,l.x,h.x,u.x),Tp(a,c.y,l.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new K().fromArray(i))}return this}},Il=Object.freeze({__proto__:null,ArcCurve:Oo,CatmullRomCurve3:Bi,CubicBezierCurve:Sr,CubicBezierCurve3:Bo,EllipseCurve:Ss,LineCurve:br,LineCurve3:zo,QuadraticBezierCurve:Tr,QuadraticBezierCurve3:Er,SplineCurve:wr}),ko=class extends nn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Il[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),r=0;for(;r<i.length;){if(i[r]>=n){let o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,t)}r++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,r=this.curves;i<r.length;i++){let o=r[i],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new Il[i.type]().fromJSON(i))}return this}},bs=class extends ko{constructor(e){super(),this.type="Path",this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new br(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let r=new Tr(this.currentPoint.clone(),new K(e,t),new K(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,r,o){let a=new Sr(this.currentPoint.clone(),new K(e,t),new K(n,i),new K(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new wr(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+a,t+c,n,i,r,o),this}absarc(e,t,n,i,r,o){return this.absellipse(e,t,n,n,i,r,o),this}ellipse(e,t,n,i,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+l,t+h,n,i,r,o,a,c),this}absellipse(e,t,n,i,r,o,a,c){let l=new Ss(e,t,n,i,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Mn=class extends bs{constructor(e){super(e),this.uuid=hn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new bs().fromJSON(i))}return this}};Vu=class{static triangulate(e,t,n=2){return X_(e,t,n)}},vn=class s{static area(e){let t=e.length,n=0;for(let i=t-1,r=0;r<t;i=r++)n+=e[i].x*e[r].y-e[r].x*e[i].y;return n*.5}static isClockWise(e){return s.area(e)<0}static triangulateShape(e,t){let n=[],i=[],r=[];wp(e),Ap(n,e);let o=e.length;t.forEach(wp);for(let c=0;c<t.length;c++)i.push(o),o+=t[c].length,Ap(n,t[c]);let a=Vu.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};Es=class s extends ke{constructor(e=new Mn([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],r=[];for(let a=0,c=e.length;a<c;a++){let l=e[a];o(l)}this.setAttribute("position",new ye(i,3)),this.setAttribute("uv",new ye(r,2)),this.computeVertexNormals();function o(a){let c=[],l=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,m=t.bevelSize!==void 0?t.bevelSize:f-.1,_=t.bevelOffset!==void 0?t.bevelOffset:0,g=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,y=t.UVGenerator!==void 0?t.UVGenerator:c0,v,x=!1,T,E,w,C;p&&(v=p.getSpacedPoints(h),x=!0,d=!1,T=p.computeFrenetFrames(h,!1),E=new R,w=new R,C=new R),d||(g=0,f=0,m=0,_=0);let M=a.extractPoints(l),S=M.shape,P=M.holes;if(!vn.isClockWise(S)){S=S.reverse();for(let ee=0,$=P.length;ee<$;ee++){let Z=P[ee];vn.isClockWise(Z)&&(P[ee]=Z.reverse())}}function B(ee){let Z=10000000000000001e-36,J=ee[0];for(let le=1;le<=ee.length;le++){let ie=le%ee.length,ue=ee[ie],Ge=ue.x-J.x,He=ue.y-J.y,I=Ge*Ge+He*He,b=Math.max(Math.abs(ue.x),Math.abs(ue.y),Math.abs(J.x),Math.abs(J.y)),O=Z*b*b;if(I<=O){ee.splice(ie,1),le--;continue}J=ue}}B(S),P.forEach(B);let k=P.length,z=S;for(let ee=0;ee<k;ee++){let $=P[ee];S=S.concat($)}function W(ee,$,Z){return $||console.error("THREE.ExtrudeGeometry: vec does not exist"),ee.clone().addScaledVector($,Z)}let Q=S.length;function G(ee,$,Z){let J,le,ie,ue=ee.x-$.x,Ge=ee.y-$.y,He=Z.x-ee.x,I=Z.y-ee.y,b=ue*ue+Ge*Ge,O=ue*I-Ge*He;if(Math.abs(O)>Number.EPSILON){let X=Math.sqrt(b),ne=Math.sqrt(He*He+I*I),q=$.x-Ge/X,Ce=$.y+ue/X,ce=Z.x-I/ne,we=Z.y+He/ne,Ae=((ce-q)*I-(we-Ce)*He)/(ue*I-Ge*He);J=q+ue*Ae-ee.x,le=Ce+Ge*Ae-ee.y;let se=J*J+le*le;if(se<=2)return new K(J,le);ie=Math.sqrt(se/2)}else{let X=!1;ue>Number.EPSILON?He>Number.EPSILON&&(X=!0):ue<-Number.EPSILON?He<-Number.EPSILON&&(X=!0):Math.sign(Ge)===Math.sign(I)&&(X=!0),X?(J=-Ge,le=ue,ie=Math.sqrt(b)):(J=ue,le=Ge,ie=Math.sqrt(b/2))}return new K(J/ie,le/ie)}let he=[];for(let ee=0,$=z.length,Z=$-1,J=ee+1;ee<$;ee++,Z++,J++)Z===$&&(Z=0),J===$&&(J=0),he[ee]=G(z[ee],z[Z],z[J]);let me=[],Me,Ve=he.concat();for(let ee=0,$=k;ee<$;ee++){let Z=P[ee];Me=[];for(let J=0,le=Z.length,ie=le-1,ue=J+1;J<le;J++,ie++,ue++)ie===le&&(ie=0),ue===le&&(ue=0),Me[J]=G(Z[J],Z[ie],Z[ue]);me.push(Me),Ve=Ve.concat(Me)}let $e;if(g===0)$e=vn.triangulateShape(z,P);else{let ee=[],$=[];for(let Z=0;Z<g;Z++){let J=Z/g,le=f*Math.cos(J*Math.PI/2),ie=m*Math.sin(J*Math.PI/2)+_;for(let ue=0,Ge=z.length;ue<Ge;ue++){let He=W(z[ue],he[ue],ie);Ie(He.x,He.y,-le),J===0&&ee.push(He)}for(let ue=0,Ge=k;ue<Ge;ue++){let He=P[ue];Me=me[ue];let I=[];for(let b=0,O=He.length;b<O;b++){let X=W(He[b],Me[b],ie);Ie(X.x,X.y,-le),J===0&&I.push(X)}J===0&&$.push(I)}}$e=vn.triangulateShape(ee,$)}let rt=$e.length,je=m+_;for(let ee=0;ee<Q;ee++){let $=d?W(S[ee],Ve[ee],je):S[ee];x?(w.copy(T.normals[0]).multiplyScalar($.x),E.copy(T.binormals[0]).multiplyScalar($.y),C.copy(v[0]).add(w).add(E),Ie(C.x,C.y,C.z)):Ie($.x,$.y,0)}for(let ee=1;ee<=h;ee++)for(let $=0;$<Q;$++){let Z=d?W(S[$],Ve[$],je):S[$];x?(w.copy(T.normals[ee]).multiplyScalar(Z.x),E.copy(T.binormals[ee]).multiplyScalar(Z.y),C.copy(v[ee]).add(w).add(E),Ie(C.x,C.y,C.z)):Ie(Z.x,Z.y,u/h*ee)}for(let ee=g-1;ee>=0;ee--){let $=ee/g,Z=f*Math.cos($*Math.PI/2),J=m*Math.sin($*Math.PI/2)+_;for(let le=0,ie=z.length;le<ie;le++){let ue=W(z[le],he[le],J);Ie(ue.x,ue.y,u+Z)}for(let le=0,ie=P.length;le<ie;le++){let ue=P[le];Me=me[le];for(let Ge=0,He=ue.length;Ge<He;Ge++){let I=W(ue[Ge],Me[Ge],J);x?Ie(I.x,I.y+v[h-1].y,v[h-1].x+Z):Ie(I.x,I.y,u+Z)}}}Y(),te();function Y(){let ee=i.length/3;if(d){let $=0,Z=Q*$;for(let J=0;J<rt;J++){let le=$e[J];ve(le[2]+Z,le[1]+Z,le[0]+Z)}$=h+g*2,Z=Q*$;for(let J=0;J<rt;J++){let le=$e[J];ve(le[0]+Z,le[1]+Z,le[2]+Z)}}else{for(let $=0;$<rt;$++){let Z=$e[$];ve(Z[2],Z[1],Z[0])}for(let $=0;$<rt;$++){let Z=$e[$];ve(Z[0]+Q*h,Z[1]+Q*h,Z[2]+Q*h)}}n.addGroup(ee,i.length/3-ee,0)}function te(){let ee=i.length/3,$=0;Se(z,$),$+=z.length;for(let Z=0,J=P.length;Z<J;Z++){let le=P[Z];Se(le,$),$+=le.length}n.addGroup(ee,i.length/3-ee,1)}function Se(ee,$){let Z=ee.length;for(;--Z>=0;){let J=Z,le=Z-1;le<0&&(le=ee.length-1);for(let ie=0,ue=h+g*2;ie<ue;ie++){let Ge=Q*ie,He=Q*(ie+1),I=$+J+Ge,b=$+le+Ge,O=$+le+He,X=$+J+He;qe(I,b,O,X)}}}function Ie(ee,$,Z){c.push(ee),c.push($),c.push(Z)}function ve(ee,$,Z){nt(ee),nt($),nt(Z);let J=i.length/3,le=y.generateTopUV(n,i,J-3,J-2,J-1);L(le[0]),L(le[1]),L(le[2])}function qe(ee,$,Z,J){nt(ee),nt($),nt(J),nt($),nt(Z),nt(J);let le=i.length/3,ie=y.generateSideWallUV(n,i,le-6,le-3,le-2,le-1);L(ie[0]),L(ie[1]),L(ie[3]),L(ie[1]),L(ie[2]),L(ie[3])}function nt(ee){i.push(c[ee*3+0]),i.push(c[ee*3+1]),i.push(c[ee*3+2])}function L(ee){r.push(ee.x),r.push(ee.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return l0(t,n,e)}static fromJSON(e,t){let n=[];for(let r=0,o=e.shapes.length;r<o;r++){let a=t[e.shapes[r]];n.push(a)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new Il[i.type]().fromJSON(i)),new s(n,e.options)}},c0={generateTopUV:function(s,e,t,n,i){let r=e[t*3],o=e[t*3+1],a=e[n*3],c=e[n*3+1],l=e[i*3],h=e[i*3+1];return[new K(r,o),new K(a,c),new K(l,h)]},generateSideWallUV:function(s,e,t,n,i,r){let o=e[t*3],a=e[t*3+1],c=e[t*3+2],l=e[n*3],h=e[n*3+1],u=e[n*3+2],d=e[i*3],f=e[i*3+1],m=e[i*3+2],_=e[r*3],g=e[r*3+1],p=e[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new K(o,1-c),new K(l,1-u),new K(d,1-m),new K(_,1-p)]:[new K(a,1-c),new K(h,1-u),new K(f,1-m),new K(g,1-p)]}};Wo=class s extends fi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},ws=class s extends ke{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Fe(i,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/t,u=new R,d=new K,f=new R,m=new R,_=new R,g=0,p=0;for(let y=0;y<=e.length-1;y++)switch(y){case 0:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case e.length-1:c.push(_.x,_.y,_.z);break;default:g=e[y+1].x-e[y].x,p=e[y+1].y-e[y].y,f.x=p*1,f.y=-g,f.z=p*0,m.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(m)}for(let y=0;y<=t;y++){let v=n+y*h*i,x=Math.sin(v),T=Math.cos(v);for(let E=0;E<=e.length-1;E++){u.x=e[E].x*x,u.y=e[E].y,u.z=e[E].x*T,o.push(u.x,u.y,u.z),d.x=y/t,d.y=E/(e.length-1),a.push(d.x,d.y);let w=c[3*E+0]*x,C=c[3*E+1],M=c[3*E+0]*T;l.push(w,C,M)}}for(let y=0;y<t;y++)for(let v=0;v<e.length-1;v++){let x=v+y*e.length,T=x,E=x+e.length,w=x+e.length+1,C=x+1;r.push(T,E,C),r.push(w,C,E)}this.setIndex(r),this.setAttribute("position",new ye(o,3)),this.setAttribute("uv",new ye(a,2)),this.setAttribute("normal",new ye(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.points,e.segments,e.phiStart,e.phiLength)}},Rr=class s extends fi{constructor(e=1,t=0){let n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},di=class s extends ke{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=e/a,d=t/c,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){let y=p*d-o;for(let v=0;v<l;v++){let x=v*u-r;m.push(x,-y,0),_.push(0,0,1),g.push(v/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){let v=y+l*p,x=y+l*(p+1),T=y+1+l*(p+1),E=y+1+l*p;f.push(v,x,E),f.push(x,T,E)}this.setIndex(f),this.setAttribute("position",new ye(m,3)),this.setAttribute("normal",new ye(_,3)),this.setAttribute("uv",new ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.width,e.height,e.widthSegments,e.heightSegments)}},Xo=class s extends ke{constructor(e=.5,t=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);let a=[],c=[],l=[],h=[],u=e,d=(t-e)/i,f=new R,m=new K;for(let _=0;_<=i;_++){for(let g=0;g<=n;g++){let p=r+g/n*o;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<i;_++){let g=_*(n+1);for(let p=0;p<n;p++){let y=p+g,v=y,x=y+n+1,T=y+n+2,E=y+1;a.push(v,x,E),a.push(x,T,E)}}this.setIndex(a),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(l,3)),this.setAttribute("uv",new ye(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},qo=class s extends ke{constructor(e=new Mn([new K(0,.5),new K(-.5,-.5),new K(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],r=[],o=[],a=0,c=0;if(Array.isArray(e)===!1)l(e);else for(let h=0;h<e.length;h++)l(e[h]),this.addGroup(a,c,h),a+=c,c=0;this.setIndex(n),this.setAttribute("position",new ye(i,3)),this.setAttribute("normal",new ye(r,3)),this.setAttribute("uv",new ye(o,2));function l(h){let u=i.length/3,d=h.extractPoints(t),f=d.shape,m=d.holes;vn.isClockWise(f)===!1&&(f=f.reverse());for(let g=0,p=m.length;g<p;g++){let y=m[g];vn.isClockWise(y)===!0&&(m[g]=y.reverse())}let _=vn.triangulateShape(f,m);for(let g=0,p=m.length;g<p;g++){let y=m[g];f=f.concat(y)}for(let g=0,p=f.length;g<p;g++){let y=f[g];i.push(y.x,y.y,0),r.push(0,0,1),o.push(y.x,y.y)}for(let g=0,p=_.length;g<p;g++){let y=_[g],v=y[0]+u,x=y[1]+u,T=y[2]+u;n.push(v,x,T),c+=3}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes;return h0(t,e)}static fromJSON(e,t){let n=[];for(let i=0,r=e.shapes.length;i<r;i++){let o=t[e.shapes[i]];n.push(o)}return new s(n,e.curveSegments)}};zi=class s extends ke{constructor(e=1,t=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new R,d=new R,f=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){let y=[],v=p/n,x=0;p===0&&o===0?x=.5/t:p===n&&c===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){let E=T/t;u.x=-e*Math.cos(i+E*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(i+E*r)*Math.sin(o+v*a),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(E+x,1-v),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<t;y++){let v=h[p][y+1],x=h[p][y],T=h[p+1][y],E=h[p+1][y+1];(p!==0||o>0)&&f.push(v,x,E),(p!==n-1||c<Math.PI)&&f.push(x,T,E)}this.setIndex(f),this.setAttribute("position",new ye(m,3)),this.setAttribute("normal",new ye(_,3)),this.setAttribute("uv",new ye(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Yo=class s extends fi{constructor(e=1,t=0){let n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new s(e.radius,e.detail)}},As=class s extends ke{constructor(e=1,t=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);let o=[],a=[],c=[],l=[],h=new R,u=new R,d=new R;for(let f=0;f<=n;f++)for(let m=0;m<=i;m++){let _=m/i*r,g=f/n*Math.PI*2;u.x=(e+t*Math.cos(g))*Math.cos(_),u.y=(e+t*Math.cos(g))*Math.sin(_),u.z=t*Math.sin(g),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(m/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let m=1;m<=i;m++){let _=(i+1)*f+m-1,g=(i+1)*(f-1)+m-1,p=(i+1)*(f-1)+m,y=(i+1)*f+m;o.push(_,g,y),o.push(g,p,y)}this.setIndex(o),this.setAttribute("position",new ye(a,3)),this.setAttribute("normal",new ye(c,3)),this.setAttribute("uv",new ye(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Zo=class s extends ke{constructor(e=1,t=.4,n=64,i=8,r=2,o=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:r,q:o},n=Math.floor(n),i=Math.floor(i);let a=[],c=[],l=[],h=[],u=new R,d=new R,f=new R,m=new R,_=new R,g=new R,p=new R;for(let v=0;v<=n;++v){let x=v/n*r*Math.PI*2;y(x,r,o,e,f),y(x+.01,r,o,e,m),g.subVectors(m,f),p.addVectors(m,f),_.crossVectors(g,p),p.crossVectors(_,g),_.normalize(),p.normalize();for(let T=0;T<=i;++T){let E=T/i*Math.PI*2,w=-t*Math.cos(E),C=t*Math.sin(E);u.x=f.x+(w*p.x+C*_.x),u.y=f.y+(w*p.y+C*_.y),u.z=f.z+(w*p.z+C*_.z),c.push(u.x,u.y,u.z),d.subVectors(u,f).normalize(),l.push(d.x,d.y,d.z),h.push(v/n),h.push(T/i)}}for(let v=1;v<=n;v++)for(let x=1;x<=i;x++){let T=(i+1)*(v-1)+(x-1),E=(i+1)*v+(x-1),w=(i+1)*v+x,C=(i+1)*(v-1)+x;a.push(T,E,C),a.push(E,w,C)}this.setIndex(a),this.setAttribute("position",new ye(c,3)),this.setAttribute("normal",new ye(l,3)),this.setAttribute("uv",new ye(h,2));function y(v,x,T,E,w){let C=Math.cos(v),M=Math.sin(v),S=T/x*v,P=Math.cos(S);w.x=E*(2+P)*.5*C,w.y=E*(2+P)*M*.5,w.z=E*Math.sin(S)*.5}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new s(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},Rs=class s extends ke{constructor(e=new Er(new R(-1,-1,0),new R(-1,1,0),new R(1,1,0)),t=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:r};let o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;let a=new R,c=new R,l=new K,h=new R,u=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new ye(u,3)),this.setAttribute("normal",new ye(d,3)),this.setAttribute("uv",new ye(f,2));function _(){for(let v=0;v<t;v++)g(v);g(r===!1?t:0),y(),p()}function g(v){h=e.getPointAt(v/t,h);let x=o.normals[v],T=o.binormals[v];for(let E=0;E<=i;E++){let w=E/i*Math.PI*2,C=Math.sin(w),M=-Math.cos(w);c.x=M*x.x+C*T.x,c.y=M*x.y+C*T.y,c.z=M*x.z+C*T.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let v=1;v<=t;v++)for(let x=1;x<=i;x++){let T=(i+1)*(v-1)+(x-1),E=(i+1)*v+(x-1),w=(i+1)*v+x,C=(i+1)*(v-1)+x;m.push(T,E,C),m.push(E,w,C)}}function y(){for(let v=0;v<=t;v++)for(let x=0;x<=i;x++)l.x=v/t,l.y=x/i,f.push(l.x,l.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new s(new Il[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Jo=class extends ke{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new R,r=new R;if(e.index!==null){let o=e.attributes.position,a=e.index,c=e.groups;c.length===0&&(c=[{start:0,count:a.count,materialIndex:0}]);for(let l=0,h=c.length;l<h;++l){let u=c[l],d=u.start,f=u.count;for(let m=d,_=d+f;m<_;m+=3)for(let g=0;g<3;g++){let p=a.getX(m+g),y=a.getX(m+(g+1)%3);i.fromBufferAttribute(o,p),r.fromBufferAttribute(o,y),Rp(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}}else{let o=e.attributes.position;for(let a=0,c=o.count/3;a<c;a++)for(let l=0;l<3;l++){let h=3*a+l,u=3*a+(l+1)%3;i.fromBufferAttribute(o,h),r.fromBufferAttribute(o,u),Rp(i,r,n)===!0&&(t.push(i.x,i.y,i.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new ye(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};Cp=Object.freeze({__proto__:null,BoxGeometry:Sn,CapsuleGeometry:Ms,CircleGeometry:Uo,ConeGeometry:ui,CylinderGeometry:Oi,DodecahedronGeometry:No,EdgesGeometry:Fo,ExtrudeGeometry:Es,IcosahedronGeometry:Wo,LatheGeometry:ws,OctahedronGeometry:Rr,PlaneGeometry:di,PolyhedronGeometry:fi,RingGeometry:Xo,ShapeGeometry:qo,SphereGeometry:zi,TetrahedronGeometry:Yo,TorusGeometry:As,TorusKnotGeometry:Zo,TubeGeometry:Rs,WireframeGeometry:Jo}),$o=class extends Ct{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new de(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}},Ko=class extends tn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}},ki=class extends Ct{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new de(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},jo=class extends ki{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new K(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Fe(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new de(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new de(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new de(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Qo=class extends Ct{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new de(16777215),this.specular=new de(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Fr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ea=class extends Ct{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new de(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ta=class extends Ct{constructor(e){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(e)}copy(e){return super.copy(e),this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.flatShading=e.flatShading,this}},na=class extends Ct{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new de(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new de(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new en,this.combine=Fr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Cr=class extends Ct{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=If,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ir=class extends Ct{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},ia=class extends Ct{constructor(e){super(),this.isMeshMatcapMaterial=!0,this.defines={MATCAP:""},this.type="MeshMatcapMaterial",this.color=new de(16777215),this.matcap=null,this.map=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gi,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={MATCAP:""},this.color.copy(e.color),this.matcap=e.matcap,this.map=e.map,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.flatShading=e.flatShading,this.fog=e.fog,this}},sa=class extends Nt{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};Pl=class{static convertArray(e,t){return cs(e,t)}static isTypedArray(e){return Vm(e)}static getKeyframeOrder(e){return Hm(e)}static sortedArray(e,t,n){return Hu(e,t,n)}static flattenJSON(e,t,n,i){qf(e,t,n,i)}static subclip(e,t,n,i,r=30){return u0(e,t,n,i,r)}static makeClipAdditive(e,t=0,n=e,i=30){return f0(e,t,n,i)}},Vi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){let a=t[1];e<a&&(n=2,r=a);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){let a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},ra=class extends Vi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wi,endingEnd:wi}}intervalChanged_(e,t,n){let i=this.parameterPositions,r=e-2,o=e+1,a=i[r],c=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case Ai:r=e,a=2*t-n;break;case lr:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Ai:o=e,c=2*n-t;break;case lr:o=1,c=n+i[1]-i[0];break;default:o=e-1,c=t}let l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-a),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(n-t)/(i-t),_=m*m,g=_*m,p=-d*g+2*d*_-d*m,y=(1+d)*g+(-1.5-2*d)*_+(-.5+d)*m+1,v=(-1-f)*g+(1.5+f)*_+.5*m,x=f*g-f*_;for(let T=0;T!==a;++T)r[T]=p*o[h+T]+y*o[l+T]+v*o[c+T]+x*o[u+T];return r}},Pr=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=e*a,l=c-a,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},oa=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},Zt=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=cs(t,this.TimeBufferType),this.values=cs(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:cs(e.times,Array),values:cs(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new oa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Pr(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ra(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Li:t=this.InterpolantFactoryMethodDiscrete;break;case us:t=this.InterpolantFactoryMethodLinear;break;case po:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Li;case this.InterpolantFactoryMethodLinear:return us;case this.InterpolantFactoryMethodSmooth:return po}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){let c=n[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),e=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),e=!1;break}o=c}if(i!==void 0&&Vm(i))for(let a=0,c=i.length;a!==c;++a){let l=i[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===po,r=e.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=e[a],h=e[a+1];if(l!==h&&(a!==1||l!==e[0]))if(i)c=!0;else{let u=a*n,d=u-n,f=u+n;for(let m=0;m!==n;++m){let _=t[u+m];if(_!==t[d+m]||_!==t[f+m]){c=!0;break}}}if(c){if(a!==o){e[o]=e[a];let u=a*n,d=o*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,c=o*n,l=0;l!==n;++l)t[c+l]=t[a+l];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}};Zt.prototype.ValueTypeName="";Zt.prototype.TimeBufferType=Float32Array;Zt.prototype.ValueBufferType=Float32Array;Zt.prototype.DefaultInterpolation=us;Xn=class extends Zt{constructor(e,t,n){super(e,t,n)}};Xn.prototype.ValueTypeName="bool";Xn.prototype.ValueBufferType=Array;Xn.prototype.DefaultInterpolation=Li;Xn.prototype.InterpolantFactoryMethodLinear=void 0;Xn.prototype.InterpolantFactoryMethodSmooth=void 0;Lr=class extends Zt{constructor(e,t,n,i){super(e,t,n,i)}};Lr.prototype.ValueTypeName="color";Hi=class extends Zt{constructor(e,t,n,i){super(e,t,n,i)}};Hi.prototype.ValueTypeName="number";aa=class extends Vi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(n-t)/(i-t),l=e*a;for(let h=l+a;l!==h;l+=4)At.slerpFlat(r,0,o,l-a,o,l,c);return r}},Gi=class extends Zt{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new aa(this.times,this.values,this.getValueSize(),e)}};Gi.prototype.ValueTypeName="quaternion";Gi.prototype.InterpolantFactoryMethodSmooth=void 0;qn=class extends Zt{constructor(e,t,n){super(e,t,n)}};qn.prototype.ValueTypeName="string";qn.prototype.ValueBufferType=Array;qn.prototype.DefaultInterpolation=Li;qn.prototype.InterpolantFactoryMethodLinear=void 0;qn.prototype.InterpolantFactoryMethodSmooth=void 0;Wi=class extends Zt{constructor(e,t,n,i){super(e,t,n,i)}};Wi.prototype.ValueTypeName="vector";Xi=class{constructor(e="",t=-1,n=[],i=pc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=hn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(p0(n[o]).scale(i));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r.userData=JSON.parse(e.userData||"{}"),r}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let r=0,o=n.length;r!==o;++r)t.push(Zt.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let r=t.length,o=[];for(let a=0;a<r;a++){let c=[],l=[];c.push((a+r-1)%r,a,(a+1)%r),l.push(0,1,0);let h=Hm(c);c=Hu(c,1,h),l=Hu(l,1,h),!i&&c[0]===0&&(c.push(r),l.push(l[0])),o.push(new Hi(".morphTargetInfluences["+t[a].name+"]",c,l).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,c=e.length;a<c;a++){let l=e[a],h=l.name.match(r);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(l)}}let o=[];for(let a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,f,m,_){if(f.length!==0){let g=[],p=[];qf(f,g,p,m),g.length!==0&&_.push(new u(d,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode,c=e.length||-1,l=e.hierarchy||[];for(let u=0;u<l.length;u++){let d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let f={},m;for(m=0;m<d.length;m++)if(d[m].morphTargets)for(let _=0;_<d[m].morphTargets.length;_++)f[d[m].morphTargets[_]]=-1;for(let _ in f){let g=[],p=[];for(let y=0;y!==d[m].morphTargets.length;++y){let v=d[m];g.push(v.time),p.push(v.morphTarget===_?1:0)}i.push(new Hi(".morphTargetInfluence["+_+"]",g,p))}c=f.length*o}else{let f=".bones["+t[u].name+"]";n(Wi,f+".position",d,"pos",i),n(Gi,f+".quaternion",d,"rot",i),n(Wi,f+".scale",d,"scl",i)}}return i.length===0?null:new this(r,c,i,a)}resetDuration(){let e=this.tracks,t=0;for(let n=0,i=e.length;n!==i;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};Dn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}},Dr=class{constructor(e,t,n){let i=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let f=l[u],m=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return m}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},Yf=new Dr,Ot=class{constructor(e){this.manager=e!==void 0?e:Yf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Ot.DEFAULT_MATERIAL_NAME="__DEFAULT";si={},Gu=class extends Error{constructor(e,t){super(e),this.response=t}},bn=class extends Ot{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=Dn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(si[e]!==void 0){si[e].push({onLoad:t,onProgress:n,onError:i});return}si[e]=[],si[e].push({onLoad:t,onProgress:n,onError:i});let o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,c=this.responseType;fetch(o).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let h=si[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,m=f!==0,_=0,g=new ReadableStream({start(p){y();function y(){u.read().then(({done:v,value:x})=>{if(v)p.close();else{_+=x.byteLength;let T=new ProgressEvent("progress",{lengthComputable:m,loaded:_,total:f});for(let E=0,w=h.length;E<w;E++){let C=h[E];C.onProgress&&C.onProgress(T)}p.enqueue(x),y()}},v=>{p.error(v)})}}});return new Response(g)}else throw new Gu(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,a));case"json":return l.json();default:if(a==="")return l.text();{let u=/charset="?([^;"\s]*)"?/i.exec(a),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(m=>f.decode(m))}}}).then(l=>{Dn.add(`file:${e}`,l);let h=si[e];delete si[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{let h=si[e];if(h===void 0)throw this.manager.itemError(e),l;delete si[e];for(let u=0,d=h.length;u<d;u++){let f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Ll=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new bn(this.manager);o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){let t=[];for(let n=0;n<e.length;n++){let i=Xi.parse(e[n]);t.push(i)}return t}},Dl=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=this,o=[],a=new Fn,c=new bn(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(r.withCredentials);let l=0;function h(u){c.load(e[u],function(d){let f=r.parse(d,!0);o[u]={width:f.width,height:f.height,format:f.format,mipmaps:f.mipmaps},l+=1,l===6&&(f.mipmapCount===1&&(a.minFilter=vt),a.image=o,a.format=f.format,a.needsUpdate=!0,t&&t(a))},n,i)}if(Array.isArray(e))for(let u=0,d=e.length;u<d;++u)h(u);else c.load(e,function(u){let d=r.parse(u,!0);if(d.isCubemap){let f=d.mipmaps.length/d.mipmapCount;for(let m=0;m<f;m++){o[m]={mipmaps:[]};for(let _=0;_<d.mipmapCount;_++)o[m].mipmaps.push(d.mipmaps[m*d.mipmapCount+_]),o[m].format=d.format,o[m].width=d.width,o[m].height=d.height}a.image=o}else a.image.width=d.width,a.image.height=d.height,a.mipmaps=d.mipmaps;d.mipmapCount===1&&(a.minFilter=vt),a.format=d.format,a.needsUpdate=!0,t&&t(a)},n,i);return a}},sr=new WeakMap,qi=class extends Ot{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Dn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let u=sr.get(o);u===void 0&&(u=[],sr.set(o,u)),u.push({onLoad:t,onError:i})}return o}let a=fr("img");function c(){h(),t&&t(this);let u=sr.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}sr.delete(this),r.manager.itemEnd(e)}function l(u){h(),i&&i(u),Dn.remove(`image:${e}`);let d=sr.get(this)||[];for(let f=0;f<d.length;f++){let m=d[f];m.onError&&m.onError(u)}sr.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){a.removeEventListener("load",c,!1),a.removeEventListener("error",l,!1)}return a.addEventListener("load",c,!1),a.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Dn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}},Ul=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=new Ui;r.colorSpace=Ft;let o=new qi(this.manager);o.setCrossOrigin(this.crossOrigin),o.setPath(this.path);let a=0;function c(l){o.load(e[l],function(h){r.images[l]=h,a++,a===6&&(r.needsUpdate=!0,t&&t(r))},void 0,i)}for(let l=0;l<e.length;++l)c(l);return r}},Nl=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new un,a=new bn(this.manager);return a.setResponseType("arraybuffer"),a.setRequestHeader(this.requestHeader),a.setPath(this.path),a.setWithCredentials(r.withCredentials),a.load(e,function(c){let l;try{l=r.parse(c)}catch(h){if(i!==void 0)i(h);else{console.error(h);return}}l.image!==void 0?o.image=l.image:l.data!==void 0&&(o.image.width=l.width,o.image.height=l.height,o.image.data=l.data),o.wrapS=l.wrapS!==void 0?l.wrapS:qt,o.wrapT=l.wrapT!==void 0?l.wrapT:qt,o.magFilter=l.magFilter!==void 0?l.magFilter:vt,o.minFilter=l.minFilter!==void 0?l.minFilter:vt,o.anisotropy=l.anisotropy!==void 0?l.anisotropy:1,l.colorSpace!==void 0&&(o.colorSpace=l.colorSpace),l.flipY!==void 0&&(o.flipY=l.flipY),l.format!==void 0&&(o.format=l.format),l.type!==void 0&&(o.type=l.type),l.mipmaps!==void 0&&(o.mipmaps=l.mipmaps,o.minFilter=mn),l.mipmapCount===1&&(o.minFilter=vt),l.generateMipmaps!==void 0&&(o.generateMipmaps=l.generateMipmaps),o.needsUpdate=!0,t&&t(o,l)},n,i),o}},Fl=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=new St,o=new qi(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}},On=class extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new de(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},ca=class extends On{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new de(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},Iu=new Ue,Ip=new R,Pp=new R,la=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=Tn,this.map=null,this.mapPass=null,this.matrix=new Ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new hi,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ip.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ip),Pp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Pp),t.updateMatrixWorld(),Iu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Iu,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Iu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Wu=class extends la{constructor(){super(new Tt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ds*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ha=class extends On{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Wu}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Lp=new Ue,ho=new R,Pu=new R,Xu=class extends la{constructor(){super(new Tt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new K(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new R(1,0,0),new R(-1,0,0),new R(0,0,1),new R(0,0,-1),new R(0,1,0),new R(0,-1,0)],this._cubeUps=[new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,1,0),new R(0,0,1),new R(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ho.setFromMatrixPosition(e.matrixWorld),n.position.copy(ho),Pu.copy(n.position),Pu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Pu),n.updateMatrixWorld(),i.makeTranslation(-ho.x,-ho.y,-ho.z),Lp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Lp,n.coordinateSystem,n.reversedDepth)}},ua=class extends On{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Xu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Cs=class extends xs{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-e,o=n+e,a=i+t,c=i-t;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},qu=class extends la{constructor(){super(new Cs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},fa=class extends On{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new qu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},da=class extends On{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}},pa=class extends On{constructor(e,t,n=10,i=10){super(e,t),this.isRectAreaLight=!0,this.type="RectAreaLight",this.width=n,this.height=i}get power(){return this.intensity*this.width*this.height*Math.PI}set power(e){this.intensity=e/(this.width*this.height*Math.PI)}copy(e){return super.copy(e),this.width=e.width,this.height=e.height,this}toJSON(e){let t=super.toJSON(e);return t.object.width=this.width,t.object.height=this.height,t}},ma=class{constructor(){this.isSphericalHarmonics3=!0,this.coefficients=[];for(let e=0;e<9;e++)this.coefficients.push(new R)}set(e){for(let t=0;t<9;t++)this.coefficients[t].copy(e[t]);return this}zero(){for(let e=0;e<9;e++)this.coefficients[e].set(0,0,0);return this}getAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.282095),t.addScaledVector(o[1],.488603*i),t.addScaledVector(o[2],.488603*r),t.addScaledVector(o[3],.488603*n),t.addScaledVector(o[4],1.092548*(n*i)),t.addScaledVector(o[5],1.092548*(i*r)),t.addScaledVector(o[6],.315392*(3*r*r-1)),t.addScaledVector(o[7],1.092548*(n*r)),t.addScaledVector(o[8],.546274*(n*n-i*i)),t}getIrradianceAt(e,t){let n=e.x,i=e.y,r=e.z,o=this.coefficients;return t.copy(o[0]).multiplyScalar(.886227),t.addScaledVector(o[1],2*.511664*i),t.addScaledVector(o[2],2*.511664*r),t.addScaledVector(o[3],2*.511664*n),t.addScaledVector(o[4],2*.429043*n*i),t.addScaledVector(o[5],2*.429043*i*r),t.addScaledVector(o[6],.743125*r*r-.247708),t.addScaledVector(o[7],2*.429043*n*r),t.addScaledVector(o[8],.429043*(n*n-i*i)),t}add(e){for(let t=0;t<9;t++)this.coefficients[t].add(e.coefficients[t]);return this}addScaledSH(e,t){for(let n=0;n<9;n++)this.coefficients[n].addScaledVector(e.coefficients[n],t);return this}scale(e){for(let t=0;t<9;t++)this.coefficients[t].multiplyScalar(e);return this}lerp(e,t){for(let n=0;n<9;n++)this.coefficients[n].lerp(e.coefficients[n],t);return this}equals(e){for(let t=0;t<9;t++)if(!this.coefficients[t].equals(e.coefficients[t]))return!1;return!0}copy(e){return this.set(e.coefficients)}clone(){return new this.constructor().copy(this)}fromArray(e,t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].fromArray(e,t+i*3);return this}toArray(e=[],t=0){let n=this.coefficients;for(let i=0;i<9;i++)n[i].toArray(e,t+i*3);return e}static getBasisAt(e,t){let n=e.x,i=e.y,r=e.z;t[0]=.282095,t[1]=.488603*i,t[2]=.488603*r,t[3]=.488603*n,t[4]=1.092548*n*i,t[5]=1.092548*i*r,t[6]=.315392*(3*r*r-1),t[7]=1.092548*n*r,t[8]=.546274*(n*n-i*i)}},ga=class extends On{constructor(e=new ma,t=1){super(void 0,t),this.isLightProbe=!0,this.sh=e}copy(e){return super.copy(e),this.sh.copy(e.sh),this}fromJSON(e){return this.intensity=e.intensity,this.sh.fromArray(e.sh),this}toJSON(e){let t=super.toJSON(e);return t.object.sh=this.sh.toArray(),t}},_a=class s extends Ot{constructor(e){super(e),this.textures={}}load(e,t,n,i){let r=this,o=new bn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){let t=this.textures;function n(r){return t[r]===void 0&&console.warn("THREE.MaterialLoader: Undefined texture",r),t[r]}let i=this.createMaterialFromType(e.type);if(e.uuid!==void 0&&(i.uuid=e.uuid),e.name!==void 0&&(i.name=e.name),e.color!==void 0&&i.color!==void 0&&i.color.setHex(e.color),e.roughness!==void 0&&(i.roughness=e.roughness),e.metalness!==void 0&&(i.metalness=e.metalness),e.sheen!==void 0&&(i.sheen=e.sheen),e.sheenColor!==void 0&&(i.sheenColor=new de().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(i.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&i.emissive!==void 0&&i.emissive.setHex(e.emissive),e.specular!==void 0&&i.specular!==void 0&&i.specular.setHex(e.specular),e.specularIntensity!==void 0&&(i.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&i.specularColor!==void 0&&i.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(i.shininess=e.shininess),e.clearcoat!==void 0&&(i.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(i.dispersion=e.dispersion),e.iridescence!==void 0&&(i.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(i.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(i.transmission=e.transmission),e.thickness!==void 0&&(i.thickness=e.thickness),e.attenuationDistance!==void 0&&(i.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&i.attenuationColor!==void 0&&i.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(i.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(i.fog=e.fog),e.flatShading!==void 0&&(i.flatShading=e.flatShading),e.blending!==void 0&&(i.blending=e.blending),e.combine!==void 0&&(i.combine=e.combine),e.side!==void 0&&(i.side=e.side),e.shadowSide!==void 0&&(i.shadowSide=e.shadowSide),e.opacity!==void 0&&(i.opacity=e.opacity),e.transparent!==void 0&&(i.transparent=e.transparent),e.alphaTest!==void 0&&(i.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(i.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(i.depthFunc=e.depthFunc),e.depthTest!==void 0&&(i.depthTest=e.depthTest),e.depthWrite!==void 0&&(i.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(i.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(i.blendSrc=e.blendSrc),e.blendDst!==void 0&&(i.blendDst=e.blendDst),e.blendEquation!==void 0&&(i.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(i.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(i.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(i.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&i.blendColor!==void 0&&i.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(i.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(i.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(i.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(i.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(i.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(i.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(i.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(i.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(i.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(i.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(i.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(i.rotation=e.rotation),e.linewidth!==void 0&&(i.linewidth=e.linewidth),e.dashSize!==void 0&&(i.dashSize=e.dashSize),e.gapSize!==void 0&&(i.gapSize=e.gapSize),e.scale!==void 0&&(i.scale=e.scale),e.polygonOffset!==void 0&&(i.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(i.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(i.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(i.dithering=e.dithering),e.alphaToCoverage!==void 0&&(i.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(i.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(i.forceSinglePass=e.forceSinglePass),e.visible!==void 0&&(i.visible=e.visible),e.toneMapped!==void 0&&(i.toneMapped=e.toneMapped),e.userData!==void 0&&(i.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?i.vertexColors=e.vertexColors>0:i.vertexColors=e.vertexColors),e.uniforms!==void 0)for(let r in e.uniforms){let o=e.uniforms[r];switch(i.uniforms[r]={},o.type){case"t":i.uniforms[r].value=n(o.value);break;case"c":i.uniforms[r].value=new de().setHex(o.value);break;case"v2":i.uniforms[r].value=new K().fromArray(o.value);break;case"v3":i.uniforms[r].value=new R().fromArray(o.value);break;case"v4":i.uniforms[r].value=new it().fromArray(o.value);break;case"m3":i.uniforms[r].value=new ze().fromArray(o.value);break;case"m4":i.uniforms[r].value=new Ue().fromArray(o.value);break;default:i.uniforms[r].value=o.value}}if(e.defines!==void 0&&(i.defines=e.defines),e.vertexShader!==void 0&&(i.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(i.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(i.glslVersion=e.glslVersion),e.extensions!==void 0)for(let r in e.extensions)i.extensions[r]=e.extensions[r];if(e.lights!==void 0&&(i.lights=e.lights),e.clipping!==void 0&&(i.clipping=e.clipping),e.size!==void 0&&(i.size=e.size),e.sizeAttenuation!==void 0&&(i.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(i.map=n(e.map)),e.matcap!==void 0&&(i.matcap=n(e.matcap)),e.alphaMap!==void 0&&(i.alphaMap=n(e.alphaMap)),e.bumpMap!==void 0&&(i.bumpMap=n(e.bumpMap)),e.bumpScale!==void 0&&(i.bumpScale=e.bumpScale),e.normalMap!==void 0&&(i.normalMap=n(e.normalMap)),e.normalMapType!==void 0&&(i.normalMapType=e.normalMapType),e.normalScale!==void 0){let r=e.normalScale;Array.isArray(r)===!1&&(r=[r,r]),i.normalScale=new K().fromArray(r)}return e.displacementMap!==void 0&&(i.displacementMap=n(e.displacementMap)),e.displacementScale!==void 0&&(i.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(i.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(i.roughnessMap=n(e.roughnessMap)),e.metalnessMap!==void 0&&(i.metalnessMap=n(e.metalnessMap)),e.emissiveMap!==void 0&&(i.emissiveMap=n(e.emissiveMap)),e.emissiveIntensity!==void 0&&(i.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(i.specularMap=n(e.specularMap)),e.specularIntensityMap!==void 0&&(i.specularIntensityMap=n(e.specularIntensityMap)),e.specularColorMap!==void 0&&(i.specularColorMap=n(e.specularColorMap)),e.envMap!==void 0&&(i.envMap=n(e.envMap)),e.envMapRotation!==void 0&&i.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(i.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(i.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(i.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(i.lightMap=n(e.lightMap)),e.lightMapIntensity!==void 0&&(i.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(i.aoMap=n(e.aoMap)),e.aoMapIntensity!==void 0&&(i.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(i.gradientMap=n(e.gradientMap)),e.clearcoatMap!==void 0&&(i.clearcoatMap=n(e.clearcoatMap)),e.clearcoatRoughnessMap!==void 0&&(i.clearcoatRoughnessMap=n(e.clearcoatRoughnessMap)),e.clearcoatNormalMap!==void 0&&(i.clearcoatNormalMap=n(e.clearcoatNormalMap)),e.clearcoatNormalScale!==void 0&&(i.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(i.iridescenceMap=n(e.iridescenceMap)),e.iridescenceThicknessMap!==void 0&&(i.iridescenceThicknessMap=n(e.iridescenceThicknessMap)),e.transmissionMap!==void 0&&(i.transmissionMap=n(e.transmissionMap)),e.thicknessMap!==void 0&&(i.thicknessMap=n(e.thicknessMap)),e.anisotropyMap!==void 0&&(i.anisotropyMap=n(e.anisotropyMap)),e.sheenColorMap!==void 0&&(i.sheenColorMap=n(e.sheenColorMap)),e.sheenRoughnessMap!==void 0&&(i.sheenRoughnessMap=n(e.sheenRoughnessMap)),i}setTextures(e){return this.textures=e,this}createMaterialFromType(e){return s.createMaterialFromType(e)}static createMaterialFromType(e){let t={ShadowMaterial:$o,SpriteMaterial:_r,RawShaderMaterial:Ko,ShaderMaterial:tn,PointsMaterial:yr,MeshPhysicalMaterial:jo,MeshStandardMaterial:ki,MeshPhongMaterial:Qo,MeshToonMaterial:ea,MeshNormalMaterial:ta,MeshLambertMaterial:na,MeshDepthMaterial:Cr,MeshDistanceMaterial:Ir,MeshBasicMaterial:Un,MeshMatcapMaterial:ia,LineDashedMaterial:sa,LineBasicMaterial:Nt,Material:Ct};return new t[e]}},Ur=class{static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},xa=class extends ke{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}},ya=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new bn(r.manager);o.setPath(r.path),o.setRequestHeader(r.requestHeader),o.setWithCredentials(r.withCredentials),o.load(e,function(a){try{t(r.parse(JSON.parse(a)))}catch(c){i?i(c):console.error(c),r.manager.itemError(e)}},n,i)}parse(e){let t={},n={};function i(f,m){if(t[m]!==void 0)return t[m];let g=f.interleavedBuffers[m],p=r(f,g.buffer),y=ar(g.type,p),v=new vs(y,g.stride);return v.uuid=g.uuid,t[m]=v,v}function r(f,m){if(n[m]!==void 0)return n[m];let g=f.arrayBuffers[m],p=new Uint32Array(g).buffer;return n[m]=p,p}let o=e.isInstancedBufferGeometry?new xa:new ke,a=e.data.index;if(a!==void 0){let f=ar(a.type,a.array);o.setIndex(new Je(f,1))}let c=e.data.attributes;for(let f in c){let m=c[f],_;if(m.isInterleavedBufferAttribute){let g=i(e.data,m.data);_=new Fi(g,m.itemSize,m.offset,m.normalized)}else{let g=ar(m.type,m.array),p=m.isInstancedBufferAttribute?li:Je;_=new p(g,m.itemSize,m.normalized)}m.name!==void 0&&(_.name=m.name),m.usage!==void 0&&_.setUsage(m.usage),o.setAttribute(f,_)}let l=e.data.morphAttributes;if(l)for(let f in l){let m=l[f],_=[];for(let g=0,p=m.length;g<p;g++){let y=m[g],v;if(y.isInterleavedBufferAttribute){let x=i(e.data,y.data);v=new Fi(x,y.itemSize,y.offset,y.normalized)}else{let x=ar(y.type,y.array);v=new Je(x,y.itemSize,y.normalized)}y.name!==void 0&&(v.name=y.name),_.push(v)}o.morphAttributes[f]=_}e.data.morphTargetsRelative&&(o.morphTargetsRelative=!0);let u=e.data.groups||e.data.drawcalls||e.data.offsets;if(u!==void 0)for(let f=0,m=u.length;f!==m;++f){let _=u[f];o.addGroup(_.start,_.count,_.materialIndex)}let d=e.data.boundingSphere;return d!==void 0&&(o.boundingSphere=new Et().fromJSON(d)),e.name&&(o.name=e.name),e.userData&&(o.userData=e.userData),o}},Ol=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=this,o=this.path===""?Ur.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||o;let a=new bn(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(c){let l=null;try{l=JSON.parse(c)}catch(u){i!==void 0&&i(u),console.error("THREE:ObjectLoader: Can't parse "+e+".",u.message);return}let h=l.metadata;if(h===void 0||h.type===void 0||h.type.toLowerCase()==="geometry"){i!==void 0&&i(new Error("THREE.ObjectLoader: Can't load "+e)),console.error("THREE.ObjectLoader: Can't load "+e);return}r.parse(l,t)},n,i)}async loadAsync(e,t){let n=this,i=this.path===""?Ur.extractUrlBase(e):this.path;this.resourcePath=this.resourcePath||i;let r=new bn(this.manager);r.setPath(this.path),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials);let o=await r.loadAsync(e,t),a=JSON.parse(o),c=a.metadata;if(c===void 0||c.type===void 0||c.type.toLowerCase()==="geometry")throw new Error("THREE.ObjectLoader: Can't load "+e);return await n.parseAsync(a)}parse(e,t){let n=this.parseAnimations(e.animations),i=this.parseShapes(e.shapes),r=this.parseGeometries(e.geometries,i),o=this.parseImages(e.images,function(){t!==void 0&&t(l)}),a=this.parseTextures(e.textures,o),c=this.parseMaterials(e.materials,a),l=this.parseObject(e.object,r,c,a,n),h=this.parseSkeletons(e.skeletons,l);if(this.bindSkeletons(l,h),this.bindLightTargets(l),t!==void 0){let u=!1;for(let d in o)if(o[d].data instanceof HTMLImageElement){u=!0;break}u===!1&&t(l)}return l}async parseAsync(e){let t=this.parseAnimations(e.animations),n=this.parseShapes(e.shapes),i=this.parseGeometries(e.geometries,n),r=await this.parseImagesAsync(e.images),o=this.parseTextures(e.textures,r),a=this.parseMaterials(e.materials,o),c=this.parseObject(e.object,i,a,o,t),l=this.parseSkeletons(e.skeletons,c);return this.bindSkeletons(c,l),this.bindLightTargets(c),c}parseShapes(e){let t={};if(e!==void 0)for(let n=0,i=e.length;n<i;n++){let r=new Mn().fromJSON(e[n]);t[r.uuid]=r}return t}parseSkeletons(e,t){let n={},i={};if(t.traverse(function(r){r.isBone&&(i[r.uuid]=r)}),e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=new Ao().fromJSON(e[r],i);n[a.uuid]=a}return n}parseGeometries(e,t){let n={};if(e!==void 0){let i=new ya;for(let r=0,o=e.length;r<o;r++){let a,c=e[r];switch(c.type){case"BufferGeometry":case"InstancedBufferGeometry":a=i.parse(c);break;default:c.type in Cp?a=Cp[c.type].fromJSON(c,t):console.warn(`THREE.ObjectLoader: Unsupported geometry type "${c.type}"`)}a.uuid=c.uuid,c.name!==void 0&&(a.name=c.name),c.userData!==void 0&&(a.userData=c.userData),n[c.uuid]=a}}return n}parseMaterials(e,t){let n={},i={};if(e!==void 0){let r=new _a;r.setTextures(t);for(let o=0,a=e.length;o<a;o++){let c=e[o];n[c.uuid]===void 0&&(n[c.uuid]=r.parse(c)),i[c.uuid]=n[c.uuid]}}return i}parseAnimations(e){let t={};if(e!==void 0)for(let n=0;n<e.length;n++){let i=e[n],r=Xi.parse(i);t[r.uuid]=r}return t}parseImages(e,t){let n=this,i={},r;function o(c){return n.manager.itemStart(c),r.load(c,function(){n.manager.itemEnd(c)},void 0,function(){n.manager.itemError(c),n.manager.itemEnd(c)})}function a(c){if(typeof c=="string"){let l=c,h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(l)?l:n.resourcePath+l;return o(h)}else return c.data?{data:ar(c.type,c.data),width:c.width,height:c.height}:null}if(e!==void 0&&e.length>0){let c=new Dr(t);r=new qi(c),r.setCrossOrigin(this.crossOrigin);for(let l=0,h=e.length;l<h;l++){let u=e[l],d=u.url;if(Array.isArray(d)){let f=[];for(let m=0,_=d.length;m<_;m++){let g=d[m],p=a(g);p!==null&&(p instanceof HTMLImageElement?f.push(p):f.push(new un(p.data,p.width,p.height)))}i[u.uuid]=new ln(f)}else{let f=a(u.url);i[u.uuid]=new ln(f)}}}return i}async parseImagesAsync(e){let t=this,n={},i;async function r(o){if(typeof o=="string"){let a=o,c=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(a)?a:t.resourcePath+a;return await i.loadAsync(c)}else return o.data?{data:ar(o.type,o.data),width:o.width,height:o.height}:null}if(e!==void 0&&e.length>0){i=new qi(this.manager),i.setCrossOrigin(this.crossOrigin);for(let o=0,a=e.length;o<a;o++){let c=e[o],l=c.url;if(Array.isArray(l)){let h=[];for(let u=0,d=l.length;u<d;u++){let f=l[u],m=await r(f);m!==null&&(m instanceof HTMLImageElement?h.push(m):h.push(new un(m.data,m.width,m.height)))}n[c.uuid]=new ln(h)}else{let h=await r(c.url);n[c.uuid]=new ln(h)}}}return n}parseTextures(e,t){function n(r,o){return typeof r=="number"?r:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",r),o[r])}let i={};if(e!==void 0)for(let r=0,o=e.length;r<o;r++){let a=e[r];a.image===void 0&&console.warn('THREE.ObjectLoader: No "image" specified for',a.uuid),t[a.image]===void 0&&console.warn("THREE.ObjectLoader: Undefined image",a.image);let c=t[a.image],l=c.data,h;Array.isArray(l)?(h=new Ui,l.length===6&&(h.needsUpdate=!0)):(l&&l.data?h=new un:h=new St,l&&(h.needsUpdate=!0)),h.source=c,h.uuid=a.uuid,a.name!==void 0&&(h.name=a.name),a.mapping!==void 0&&(h.mapping=n(a.mapping,m0)),a.channel!==void 0&&(h.channel=a.channel),a.offset!==void 0&&h.offset.fromArray(a.offset),a.repeat!==void 0&&h.repeat.fromArray(a.repeat),a.center!==void 0&&h.center.fromArray(a.center),a.rotation!==void 0&&(h.rotation=a.rotation),a.wrap!==void 0&&(h.wrapS=n(a.wrap[0],Dp),h.wrapT=n(a.wrap[1],Dp)),a.format!==void 0&&(h.format=a.format),a.internalFormat!==void 0&&(h.internalFormat=a.internalFormat),a.type!==void 0&&(h.type=a.type),a.colorSpace!==void 0&&(h.colorSpace=a.colorSpace),a.minFilter!==void 0&&(h.minFilter=n(a.minFilter,Up)),a.magFilter!==void 0&&(h.magFilter=n(a.magFilter,Up)),a.anisotropy!==void 0&&(h.anisotropy=a.anisotropy),a.flipY!==void 0&&(h.flipY=a.flipY),a.generateMipmaps!==void 0&&(h.generateMipmaps=a.generateMipmaps),a.premultiplyAlpha!==void 0&&(h.premultiplyAlpha=a.premultiplyAlpha),a.unpackAlignment!==void 0&&(h.unpackAlignment=a.unpackAlignment),a.compareFunction!==void 0&&(h.compareFunction=a.compareFunction),a.userData!==void 0&&(h.userData=a.userData),i[a.uuid]=h}return i}parseObject(e,t,n,i,r){let o;function a(d){return t[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined geometry",d),t[d]}function c(d){if(d!==void 0){if(Array.isArray(d)){let f=[];for(let m=0,_=d.length;m<_;m++){let g=d[m];n[g]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",g),f.push(n[g])}return f}return n[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined material",d),n[d]}}function l(d){return i[d]===void 0&&console.warn("THREE.ObjectLoader: Undefined texture",d),i[d]}let h,u;switch(e.type){case"Scene":o=new Ni,e.background!==void 0&&(Number.isInteger(e.background)?o.background=new de(e.background):o.background=l(e.background)),e.environment!==void 0&&(o.environment=l(e.environment)),e.fog!==void 0&&(e.fog.type==="Fog"?o.fog=new bo(e.fog.color,e.fog.near,e.fog.far):e.fog.type==="FogExp2"&&(o.fog=new So(e.fog.color,e.fog.density)),e.fog.name!==""&&(o.fog.name=e.fog.name)),e.backgroundBlurriness!==void 0&&(o.backgroundBlurriness=e.backgroundBlurriness),e.backgroundIntensity!==void 0&&(o.backgroundIntensity=e.backgroundIntensity),e.backgroundRotation!==void 0&&o.backgroundRotation.fromArray(e.backgroundRotation),e.environmentIntensity!==void 0&&(o.environmentIntensity=e.environmentIntensity),e.environmentRotation!==void 0&&o.environmentRotation.fromArray(e.environmentRotation);break;case"PerspectiveCamera":o=new Tt(e.fov,e.aspect,e.near,e.far),e.focus!==void 0&&(o.focus=e.focus),e.zoom!==void 0&&(o.zoom=e.zoom),e.filmGauge!==void 0&&(o.filmGauge=e.filmGauge),e.filmOffset!==void 0&&(o.filmOffset=e.filmOffset),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new Cs(e.left,e.right,e.top,e.bottom,e.near,e.far),e.zoom!==void 0&&(o.zoom=e.zoom),e.view!==void 0&&(o.view=Object.assign({},e.view));break;case"AmbientLight":o=new da(e.color,e.intensity);break;case"DirectionalLight":o=new fa(e.color,e.intensity),o.target=e.target||"";break;case"PointLight":o=new ua(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new pa(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new ha(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay),o.target=e.target||"";break;case"HemisphereLight":o=new ca(e.color,e.groundColor,e.intensity);break;case"LightProbe":o=new ga().fromJSON(e);break;case"SkinnedMesh":h=a(e.geometry),u=c(e.material),o=new wo(h,u),e.bindMode!==void 0&&(o.bindMode=e.bindMode),e.bindMatrix!==void 0&&o.bindMatrix.fromArray(e.bindMatrix),e.skeleton!==void 0&&(o.skeleton=e.skeleton);break;case"Mesh":h=a(e.geometry),u=c(e.material),o=new pt(h,u);break;case"InstancedMesh":h=a(e.geometry),u=c(e.material);let d=e.count,f=e.instanceMatrix,m=e.instanceColor;o=new Ro(h,u,d),o.instanceMatrix=new li(new Float32Array(f.array),16),m!==void 0&&(o.instanceColor=new li(new Float32Array(m.array),m.itemSize));break;case"BatchedMesh":h=a(e.geometry),u=c(e.material),o=new Io(e.maxInstanceCount,e.maxVertexCount,e.maxIndexCount,u),o.geometry=h,o.perObjectFrustumCulled=e.perObjectFrustumCulled,o.sortObjects=e.sortObjects,o._drawRanges=e.drawRanges,o._reservedRanges=e.reservedRanges,o._geometryInfo=e.geometryInfo.map(_=>{let g=null,p=null;return _.boundingBox!==void 0&&(g=new Rt().fromJSON(_.boundingBox)),_.boundingSphere!==void 0&&(p=new Et().fromJSON(_.boundingSphere)),{..._,boundingBox:g,boundingSphere:p}}),o._instanceInfo=e.instanceInfo,o._availableInstanceIds=e._availableInstanceIds,o._availableGeometryIds=e._availableGeometryIds,o._nextIndexStart=e.nextIndexStart,o._nextVertexStart=e.nextVertexStart,o._geometryCount=e.geometryCount,o._maxInstanceCount=e.maxInstanceCount,o._maxVertexCount=e.maxVertexCount,o._maxIndexCount=e.maxIndexCount,o._geometryInitialized=e.geometryInitialized,o._matricesTexture=l(e.matricesTexture.uuid),o._indirectTexture=l(e.indirectTexture.uuid),e.colorsTexture!==void 0&&(o._colorsTexture=l(e.colorsTexture.uuid)),e.boundingSphere!==void 0&&(o.boundingSphere=new Et().fromJSON(e.boundingSphere)),e.boundingBox!==void 0&&(o.boundingBox=new Rt().fromJSON(e.boundingBox));break;case"LOD":o=new Eo;break;case"Line":o=new Nn(a(e.geometry),c(e.material));break;case"LineLoop":o=new Po(a(e.geometry),c(e.material));break;case"LineSegments":o=new pn(a(e.geometry),c(e.material));break;case"PointCloud":case"Points":o=new Lo(a(e.geometry),c(e.material));break;case"Sprite":o=new To(c(e.material));break;case"Group":o=new Ln;break;case"Bone":o=new xr;break;default:o=new at}if(o.uuid=e.uuid,e.name!==void 0&&(o.name=e.name),e.matrix!==void 0?(o.matrix.fromArray(e.matrix),e.matrixAutoUpdate!==void 0&&(o.matrixAutoUpdate=e.matrixAutoUpdate),o.matrixAutoUpdate&&o.matrix.decompose(o.position,o.quaternion,o.scale)):(e.position!==void 0&&o.position.fromArray(e.position),e.rotation!==void 0&&o.rotation.fromArray(e.rotation),e.quaternion!==void 0&&o.quaternion.fromArray(e.quaternion),e.scale!==void 0&&o.scale.fromArray(e.scale)),e.up!==void 0&&o.up.fromArray(e.up),e.castShadow!==void 0&&(o.castShadow=e.castShadow),e.receiveShadow!==void 0&&(o.receiveShadow=e.receiveShadow),e.shadow&&(e.shadow.intensity!==void 0&&(o.shadow.intensity=e.shadow.intensity),e.shadow.bias!==void 0&&(o.shadow.bias=e.shadow.bias),e.shadow.normalBias!==void 0&&(o.shadow.normalBias=e.shadow.normalBias),e.shadow.radius!==void 0&&(o.shadow.radius=e.shadow.radius),e.shadow.mapSize!==void 0&&o.shadow.mapSize.fromArray(e.shadow.mapSize),e.shadow.camera!==void 0&&(o.shadow.camera=this.parseObject(e.shadow.camera))),e.visible!==void 0&&(o.visible=e.visible),e.frustumCulled!==void 0&&(o.frustumCulled=e.frustumCulled),e.renderOrder!==void 0&&(o.renderOrder=e.renderOrder),e.userData!==void 0&&(o.userData=e.userData),e.layers!==void 0&&(o.layers.mask=e.layers),e.children!==void 0){let d=e.children;for(let f=0;f<d.length;f++)o.add(this.parseObject(d[f],t,n,i,r))}if(e.animations!==void 0){let d=e.animations;for(let f=0;f<d.length;f++){let m=d[f];o.animations.push(r[m])}}if(e.type==="LOD"){e.autoUpdate!==void 0&&(o.autoUpdate=e.autoUpdate);let d=e.levels;for(let f=0;f<d.length;f++){let m=d[f],_=o.getObjectByProperty("uuid",m.object);_!==void 0&&o.addLevel(_,m.distance,m.hysteresis)}}return o}bindSkeletons(e,t){Object.keys(t).length!==0&&e.traverse(function(n){if(n.isSkinnedMesh===!0&&n.skeleton!==void 0){let i=t[n.skeleton];i===void 0?console.warn("THREE.ObjectLoader: No skeleton found with UUID:",n.skeleton):n.bind(i,n.bindMatrix)}})}bindLightTargets(e){e.traverse(function(t){if(t.isDirectionalLight||t.isSpotLight){let n=t.target,i=e.getObjectByProperty("uuid",n);i!==void 0?t.target=i:t.target=new at}})}},m0={UVMapping:Da,CubeReflectionMapping:Jn,CubeRefractionMapping:pi,EquirectangularReflectionMapping:Or,EquirectangularRefractionMapping:Br,CubeUVReflectionMapping:Is},Dp={RepeatWrapping:Ii,ClampToEdgeWrapping:qt,MirroredRepeatWrapping:Pi},Up={NearestFilter:wt,NearestMipmapNearestFilter:zr,NearestMipmapLinearFilter:mi,LinearFilter:vt,LinearMipmapNearestFilter:Yi,LinearMipmapLinearFilter:mn},Lu=new WeakMap,Bl=class extends Ot{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,o=Dn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(l=>{if(Lu.has(o)===!0)i&&i(Lu.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(l),r.manager.itemEnd(e),l});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}let a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let c=fetch(e,a).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return Dn.add(`image-bitmap:${e}`,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Lu.set(c,l),Dn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Dn.add(`image-bitmap:${e}`,c),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Nr=class{static getContext(){return rl===void 0&&(rl=new(window.AudioContext||window.webkitAudioContext)),rl}static setContext(e){rl=e}},zl=class extends Ot{constructor(e){super(e)}load(e,t,n,i){let r=this,o=new bn(this.manager);o.setResponseType("arraybuffer"),o.setPath(this.path),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(c){try{let l=c.slice(0);Nr.getContext().decodeAudioData(l,function(u){t(u)}).catch(a)}catch(l){a(l)}},n,i);function a(c){i?i(c):console.error(c),r.manager.itemError(e)}}},Np=new Ue,Fp=new Ue,ns=new Ue,kl=class{constructor(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new Tt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new Tt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1,this._cache={focus:null,fov:null,aspect:null,near:null,far:null,zoom:null,eyeSep:null}}update(e){let t=this._cache;if(t.focus!==e.focus||t.fov!==e.fov||t.aspect!==e.aspect*this.aspect||t.near!==e.near||t.far!==e.far||t.zoom!==e.zoom||t.eyeSep!==this.eyeSep){t.focus=e.focus,t.fov=e.fov,t.aspect=e.aspect*this.aspect,t.near=e.near,t.far=e.far,t.zoom=e.zoom,t.eyeSep=this.eyeSep,ns.copy(e.projectionMatrix);let i=t.eyeSep/2,r=i*t.near/t.focus,o=t.near*Math.tan(ls*t.fov*.5)/t.zoom,a,c;Fp.elements[12]=-i,Np.elements[12]=i,a=-o*t.aspect+r,c=o*t.aspect+r,ns.elements[0]=2*t.near/(c-a),ns.elements[8]=(c+a)/(c-a),this.cameraL.projectionMatrix.copy(ns),a=-o*t.aspect-r,c=o*t.aspect-r,ns.elements[0]=2*t.near/(c-a),ns.elements[8]=(c+a)/(c-a),this.cameraR.projectionMatrix.copy(ns)}this.cameraL.matrixWorld.copy(e.matrixWorld).multiply(Fp),this.cameraR.matrixWorld.copy(e.matrixWorld).multiply(Np)}},va=class extends Tt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ma=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}},is=new R,Du=new At,g0=new R,ss=new R,rs=new R,Vl=class extends at{constructor(){super(),this.type="AudioListener",this.context=Nr.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null,this.timeDelta=0,this._clock=new Ma}getInput(){return this.gain}removeFilter(){return this.filter!==null&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null),this}getFilter(){return this.filter}setFilter(e){return this.filter!==null?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=e,this.gain.connect(this.filter),this.filter.connect(this.context.destination),this}getMasterVolume(){return this.gain.gain.value}setMasterVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}updateMatrixWorld(e){super.updateMatrixWorld(e);let t=this.context.listener;if(this.timeDelta=this._clock.getDelta(),this.matrixWorld.decompose(is,Du,g0),ss.set(0,0,-1).applyQuaternion(Du),rs.set(0,1,0).applyQuaternion(Du),t.positionX){let n=this.context.currentTime+this.timeDelta;t.positionX.linearRampToValueAtTime(is.x,n),t.positionY.linearRampToValueAtTime(is.y,n),t.positionZ.linearRampToValueAtTime(is.z,n),t.forwardX.linearRampToValueAtTime(ss.x,n),t.forwardY.linearRampToValueAtTime(ss.y,n),t.forwardZ.linearRampToValueAtTime(ss.z,n),t.upX.linearRampToValueAtTime(rs.x,n),t.upY.linearRampToValueAtTime(rs.y,n),t.upZ.linearRampToValueAtTime(rs.z,n)}else t.setPosition(is.x,is.y,is.z),t.setOrientation(ss.x,ss.y,ss.z,rs.x,rs.y,rs.z)}},Sa=class extends at{constructor(e){super(),this.type="Audio",this.listener=e,this.context=e.context,this.gain=this.context.createGain(),this.gain.connect(e.getInput()),this.autoplay=!1,this.buffer=null,this.detune=0,this.loop=!1,this.loopStart=0,this.loopEnd=0,this.offset=0,this.duration=void 0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.source=null,this.sourceType="empty",this._startedAt=0,this._progress=0,this._connected=!1,this.filters=[]}getOutput(){return this.gain}setNodeSource(e){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=e,this.connect(),this}setMediaElementSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaNode",this.source=this.context.createMediaElementSource(e),this.connect(),this}setMediaStreamSource(e){return this.hasPlaybackControl=!1,this.sourceType="mediaStreamNode",this.source=this.context.createMediaStreamSource(e),this.connect(),this}setBuffer(e){return this.buffer=e,this.sourceType="buffer",this.autoplay&&this.play(),this}play(e=0){if(this.isPlaying===!0){console.warn("THREE.Audio: Audio is already playing.");return}if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}this._startedAt=this.context.currentTime+e;let t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.loopStart=this.loopStart,t.loopEnd=this.loopEnd,t.onended=this.onEnded.bind(this),t.start(this._startedAt,this._progress+this.offset,this.duration),this.isPlaying=!0,this.source=t,this.setDetune(this.detune),this.setPlaybackRate(this.playbackRate),this.connect()}pause(){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.isPlaying===!0&&(this._progress+=Math.max(this.context.currentTime-this._startedAt,0)*this.playbackRate,this.loop===!0&&(this._progress=this._progress%(this.duration||this.buffer.duration)),this.source.stop(),this.source.onended=null,this.isPlaying=!1),this}stop(e=0){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this._progress=0,this.source!==null&&(this.source.stop(this.context.currentTime+e),this.source.onended=null),this.isPlaying=!1,this}connect(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].connect(this.filters[e]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this._connected=!0,this}disconnect(){if(this._connected!==!1){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(let e=1,t=this.filters.length;e<t;e++)this.filters[e-1].disconnect(this.filters[e]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this._connected=!1,this}}getFilters(){return this.filters}setFilters(e){return e||(e=[]),this._connected===!0?(this.disconnect(),this.filters=e.slice(),this.connect()):this.filters=e.slice(),this}setDetune(e){return this.detune=e,this.isPlaying===!0&&this.source.detune!==void 0&&this.source.detune.setTargetAtTime(this.detune,this.context.currentTime,.01),this}getDetune(){return this.detune}getFilter(){return this.getFilters()[0]}setFilter(e){return this.setFilters(e?[e]:[])}setPlaybackRate(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.playbackRate=e,this.isPlaying===!0&&this.source.playbackRate.setTargetAtTime(this.playbackRate,this.context.currentTime,.01),this}getPlaybackRate(){return this.playbackRate}onEnded(){this.isPlaying=!1,this._progress=0}getLoop(){return this.hasPlaybackControl===!1?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop}setLoop(e){if(this.hasPlaybackControl===!1){console.warn("THREE.Audio: this Audio has no playback control.");return}return this.loop=e,this.isPlaying===!0&&(this.source.loop=this.loop),this}setLoopStart(e){return this.loopStart=e,this}setLoopEnd(e){return this.loopEnd=e,this}getVolume(){return this.gain.gain.value}setVolume(e){return this.gain.gain.setTargetAtTime(e,this.context.currentTime,.01),this}copy(e,t){return super.copy(e,t),e.sourceType!=="buffer"?(console.warn("THREE.Audio: Audio source type cannot be copied."),this):(this.autoplay=e.autoplay,this.buffer=e.buffer,this.detune=e.detune,this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this.offset=e.offset,this.duration=e.duration,this.playbackRate=e.playbackRate,this.hasPlaybackControl=e.hasPlaybackControl,this.sourceType=e.sourceType,this.filters=e.filters.slice(),this)}clone(e){return new this.constructor(this.listener).copy(this,e)}},os=new R,Op=new At,_0=new R,as=new R,Hl=class extends Sa{constructor(e){super(e),this.panner=this.context.createPanner(),this.panner.panningModel="HRTF",this.panner.connect(this.gain)}connect(){return super.connect(),this.panner.connect(this.gain),this}disconnect(){return super.disconnect(),this.panner.disconnect(this.gain),this}getOutput(){return this.panner}getRefDistance(){return this.panner.refDistance}setRefDistance(e){return this.panner.refDistance=e,this}getRolloffFactor(){return this.panner.rolloffFactor}setRolloffFactor(e){return this.panner.rolloffFactor=e,this}getDistanceModel(){return this.panner.distanceModel}setDistanceModel(e){return this.panner.distanceModel=e,this}getMaxDistance(){return this.panner.maxDistance}setMaxDistance(e){return this.panner.maxDistance=e,this}setDirectionalCone(e,t,n){return this.panner.coneInnerAngle=e,this.panner.coneOuterAngle=t,this.panner.coneOuterGain=n,this}updateMatrixWorld(e){if(super.updateMatrixWorld(e),this.hasPlaybackControl===!0&&this.isPlaying===!1)return;this.matrixWorld.decompose(os,Op,_0),as.set(0,0,1).applyQuaternion(Op);let t=this.panner;if(t.positionX){let n=this.context.currentTime+this.listener.timeDelta;t.positionX.linearRampToValueAtTime(os.x,n),t.positionY.linearRampToValueAtTime(os.y,n),t.positionZ.linearRampToValueAtTime(os.z,n),t.orientationX.linearRampToValueAtTime(as.x,n),t.orientationY.linearRampToValueAtTime(as.y,n),t.orientationZ.linearRampToValueAtTime(as.z,n)}else t.setPosition(os.x,os.y,os.z),t.setOrientation(as.x,as.y,as.z)}},Gl=class{constructor(e,t=2048){this.analyser=e.context.createAnalyser(),this.analyser.fftSize=t,this.data=new Uint8Array(this.analyser.frequencyBinCount),e.getOutput().connect(this.analyser)}getFrequencyData(){return this.analyser.getByteFrequencyData(this.data),this.data}getAverageFrequency(){let e=0,t=this.getFrequencyData();for(let n=0;n<t.length;n++)e+=t[n];return e/t.length}},ba=class{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){let n=this.buffer,i=this.valueSize,r=e*i+i,o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;let a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){let t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){let t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){let c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){a.setValue(n,i);break}}saveOriginalState(){let e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){let e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){let e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){let e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){At.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){let o=this._workIndex*r;At.multiplyQuaternionsFlat(e,o,e,t,e,n),At.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){let o=1-i;for(let a=0;a!==r;++a){let c=t+a;e[c]=e[c]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){let a=t+o;e[a]=e[a]+e[n+o]*i}}},Zf="\\[\\]\\.:\\/",x0=new RegExp("["+Zf+"]","g"),Jf="[^"+Zf+"]",y0="[^"+Zf.replace("\\.","")+"]",v0=/((?:WC+[\/:])*)/.source.replace("WC",Jf),M0=/(WCOD+)?/.source.replace("WCOD",y0),S0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jf),b0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jf),T0=new RegExp("^"+v0+M0+S0+b0+"$"),E0=["material","materials","bones","map"],Yu=class{constructor(e,t,n){let i=n||et.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},et=class s{constructor(e,t,n){this.path=t,this.parsedPath=n||s.parseTrackName(t),this.node=s.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new s.Composite(e,t,n):new s(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(x0,"")}static parseTrackName(e){let t=T0.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let r=n.nodeName.substring(i+1);E0.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===t||a.uuid===t)return a;let c=n(a.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,r=t.propertyIndex;if(e||(e=s.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}let o=e[i];if(o===void 0){let l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};et.Composite=Yu;et.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};et.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};et.prototype.GetterByBindingType=[et.prototype._getValue_direct,et.prototype._getValue_array,et.prototype._getValue_arrayElement,et.prototype._getValue_toArray];et.prototype.SetterByBindingTypeAndVersioning=[[et.prototype._setValue_direct,et.prototype._setValue_direct_setNeedsUpdate,et.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[et.prototype._setValue_array,et.prototype._setValue_array_setNeedsUpdate,et.prototype._setValue_array_setMatrixWorldNeedsUpdate],[et.prototype._setValue_arrayElement,et.prototype._setValue_arrayElement_setNeedsUpdate,et.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[et.prototype._setValue_fromArray,et.prototype._setValue_fromArray_setNeedsUpdate,et.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];Wl=class{constructor(){this.isAnimationObjectGroup=!0,this.uuid=hn(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;let e={};this._indicesByUUID=e;for(let n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};let t=this;this.stats={objects:{get total(){return t._objects.length},get inUse(){return this.total-t.nCachedObjects_}},get bindingsPerObject(){return t._bindings.length}}}add(){let e=this._objects,t=this._indicesByUUID,n=this._paths,i=this._parsedPaths,r=this._bindings,o=r.length,a,c=e.length,l=this.nCachedObjects_;for(let h=0,u=arguments.length;h!==u;++h){let d=arguments[h],f=d.uuid,m=t[f];if(m===void 0){m=c++,t[f]=m,e.push(d);for(let _=0,g=o;_!==g;++_)r[_].push(new et(d,n[_],i[_]))}else if(m<l){a=e[m];let _=--l,g=e[_];t[g.uuid]=m,e[m]=g,t[f]=_,e[_]=d;for(let p=0,y=o;p!==y;++p){let v=r[p],x=v[_],T=v[m];v[m]=x,T===void 0&&(T=new et(d,n[p],i[p])),v[_]=T}}else e[m]!==a&&console.error("THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.")}this.nCachedObjects_=l}remove(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_;for(let o=0,a=arguments.length;o!==a;++o){let c=arguments[o],l=c.uuid,h=t[l];if(h!==void 0&&h>=r){let u=r++,d=e[u];t[d.uuid]=h,e[h]=d,t[l]=u,e[u]=c;for(let f=0,m=i;f!==m;++f){let _=n[f],g=_[u],p=_[h];_[h]=g,_[u]=p}}}this.nCachedObjects_=r}uncache(){let e=this._objects,t=this._indicesByUUID,n=this._bindings,i=n.length,r=this.nCachedObjects_,o=e.length;for(let a=0,c=arguments.length;a!==c;++a){let l=arguments[a],h=l.uuid,u=t[h];if(u!==void 0)if(delete t[h],u<r){let d=--r,f=e[d],m=--o,_=e[m];t[f.uuid]=u,e[u]=f,t[_.uuid]=d,e[d]=_,e.pop();for(let g=0,p=i;g!==p;++g){let y=n[g],v=y[d],x=y[m];y[u]=v,y[d]=x,y.pop()}}else{let d=--o,f=e[d];d>0&&(t[f.uuid]=u),e[u]=f,e.pop();for(let m=0,_=i;m!==_;++m){let g=n[m];g[u]=g[d],g.pop()}}}this.nCachedObjects_=r}subscribe_(e,t){let n=this._bindingsIndicesByPath,i=n[e],r=this._bindings;if(i!==void 0)return r[i];let o=this._paths,a=this._parsedPaths,c=this._objects,l=c.length,h=this.nCachedObjects_,u=new Array(l);i=r.length,n[e]=i,o.push(e),a.push(t),r.push(u);for(let d=h,f=c.length;d!==f;++d){let m=c[d];u[d]=new et(m,e,t)}return u}unsubscribe_(e){let t=this._bindingsIndicesByPath,n=t[e];if(n!==void 0){let i=this._paths,r=this._parsedPaths,o=this._bindings,a=o.length-1,c=o[a],l=e[a];t[l]=n,o[n]=c,o.pop(),r[n]=r[a],r.pop(),i[n]=i[a],i.pop()}}},Ta=class{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;let r=t.tracks,o=r.length,a=new Array(o),c={endingStart:wi,endingEnd:wi};for(let l=0;l!==o;++l){let h=r[l].createInterpolant(null);a[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=Rf,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){let i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){let e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){let i=this._mixer,r=i.time,o=this.timeScale,a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);let c=a.parameterPositions,l=a.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/o,l[1]=t/o,this}stopWarping(){let e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}let r=this._startTime;if(r!==null){let c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);let o=this._updateTime(t),a=this._updateWeight(e);if(a>0){let c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Lh:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulateAdditive(a);break;case pc:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(o),l[h].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;let n=this._weightInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;let n=this._timeScaleInterpolant;if(n!==null){let i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){let t=this._clip.duration,n=this.loop,i=this.time+e,r=this._loopCount,o=n===Cf;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===Af){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){let a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);let c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){let l=e<0;this._setEndings(l,!l,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){let i=this._interpolantSettings;n?(i.endingStart=Ai,i.endingEnd=Ai):(e?i.endingStart=this.zeroSlopeAtStart?Ai:wi:i.endingStart=lr,t?i.endingEnd=this.zeroSlopeAtEnd?Ai:wi:i.endingEnd=lr)}_scheduleFading(e,t,n){let i=this._mixer,r=i.time,o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);let a=o.parameterPositions,c=o.sampleValues;return a[0]=r,c[0]=t,a[1]=r+e,c[1]=n,this}},w0=new Float32Array(1),Xl=class extends fn{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){let n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName,h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){let d=i[u],f=d.name,m=h[f];if(m!==void 0)++m.referenceCount,o[u]=m;else{if(m=o[u],m!==void 0){m._cacheIndex===null&&(++m.referenceCount,this._addInactiveBinding(m,c,f));continue}let _=t&&t._propertyBindings[u].binding.parsedPath;m=new ba(et.create(n,f,_),d.ValueTypeName,d.getValueSize()),++m.referenceCount,this._addInactiveBinding(m,c,f),o[u]=m}a[u].resultBuffer=m.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){let n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;let e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){let t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){let i=this._actions,r=this._actionsByClip,o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{let a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){let t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;let r=e._clip.uuid,o=this._actionsByClip,a=o[r],c=a.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;let u=a.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){let t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){let r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){let t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){let t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){let i=this._bindingsByRootAndName,r=this._bindings,o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){let t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){let t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){let t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){let e=this._controlInterpolants,t=this._nActiveControlInterpolants++,n=e[t];return n===void 0&&(n=new Pr(new Float32Array(2),new Float32Array(2),1,w0),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){let t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){let i=t||this._root,r=i.uuid,o=typeof e=="string"?Xi.findByName(i,e):e,a=o!==null?o.uuid:e,c=this._actionsByClip[a],l=null;if(n===void 0&&(o!==null?n=o.blendMode:n=pc),c!==void 0){let u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],o===null&&(o=l._clip)}if(o===null)return null;let h=new Ta(this,o,t,n);return this._bindAction(h,l),this._addInactiveAction(h,a,r),h}existingAction(e,t){let n=t||this._root,i=n.uuid,r=typeof e=="string"?Xi.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){let e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;let t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,r,o);let a=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)a[l].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){let t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){let o=r.knownActions;for(let a=0,c=o.length;a!==c;++a){let l=o[a];this._deactivateAction(l);let h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){let t=e.uuid,n=this._actionsByClip;for(let o in n){let a=n[o].actionByRoot,c=a[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}let i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(let o in r){let a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){let n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}},ql=class extends pr{constructor(e=1,t=1,n=1,i={}){super(e,t,i),this.isRenderTarget3D=!0,this.depth=n,this.texture=new gs(null,e,t,n),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}},Yl=class s{constructor(e){this.value=e}clone(){return new s(this.value.clone===void 0?this.value:this.value.clone())}},A0=0,Zl=class extends fn{constructor(){super(),this.isUniformsGroup=!0,Object.defineProperty(this,"id",{value:A0++}),this.name="",this.usage=ur,this.uniforms=[]}add(e){return this.uniforms.push(e),this}remove(e){let t=this.uniforms.indexOf(e);return t!==-1&&this.uniforms.splice(t,1),this}setName(e){return this.name=e,this}setUsage(e){return this.usage=e,this}dispose(){this.dispatchEvent({type:"dispose"})}copy(e){this.name=e.name,this.usage=e.usage;let t=e.uniforms;this.uniforms.length=0;for(let n=0,i=t.length;n<i;n++){let r=Array.isArray(t[n])?t[n]:[t[n]];for(let o=0;o<r.length;o++)this.uniforms.push(r[o].clone())}return this}clone(){return new this.constructor().copy(this)}},Jl=class extends vs{constructor(e,t,n=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=n}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}},$l=class{constructor(e,t,n,i,r,o=!1){this.isGLBufferAttribute=!0,this.name="",this.buffer=e,this.type=t,this.itemSize=n,this.elementSize=i,this.count=r,this.normalized=o,this.version=0}set needsUpdate(e){e===!0&&this.version++}setBuffer(e){return this.buffer=e,this}setType(e,t){return this.type=e,this.elementSize=t,this}setItemSize(e){return this.itemSize=e,this}setCount(e){return this.count=e,this}},Bp=new Ue,Kl=class{constructor(e,t,n=0,i=1/0){this.ray=new ci(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new _s,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Bp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Bp),this}intersectObject(e,t=!0,n=[]){return Zu(e,this,n,t),n.sort(zp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,r=e.length;i<r;i++)Zu(e[i],this,n,t);return n.sort(zp),n}};jl=class{constructor(){this._previousTime=0,this._currentTime=0,this._startTime=performance.now(),this._delta=0,this._elapsed=0,this._timescale=1,this._document=null,this._pageVisibilityHandler=null}connect(e){this._document=e,e.hidden!==void 0&&(this._pageVisibilityHandler=R0.bind(this),e.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disconnect(){this._pageVisibilityHandler!==null&&(this._document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this._pageVisibilityHandler=null),this._document=null}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getTimescale(){return this._timescale}setTimescale(e){return this._timescale=e,this}reset(){return this._currentTime=performance.now()-this._startTime,this}dispose(){this.disconnect()}update(e){return this._pageVisibilityHandler!==null&&this._document.hidden===!0?this._delta=0:(this._previousTime=this._currentTime,this._currentTime=(e!==void 0?e:performance.now())-this._startTime,this._delta=(this._currentTime-this._previousTime)*this._timescale,this._elapsed+=this._delta),this}};Ql=class{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Fe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Fe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}},eh=class{constructor(e=1,t=0,n=0){this.radius=e,this.theta=t,this.y=n}set(e,t,n){return this.radius=e,this.theta=t,this.y=n,this}copy(e){return this.radius=e.radius,this.theta=e.theta,this.y=e.y,this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+n*n),this.theta=Math.atan2(e,n),this.y=t,this}clone(){return new this.constructor().copy(this)}},th=class s{constructor(e,t,n,i){s.prototype.isMatrix2=!0,this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){let r=this.elements;return r[0]=e,r[2]=t,r[1]=n,r[3]=i,this}},kp=new K,nh=class{constructor(e=new K(1/0,1/0),t=new K(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=kp.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,kp).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Vp=new R,ol=new R,rr=new R,or=new R,Uu=new R,C0=new R,I0=new R,ih=class{constructor(e=new R,t=new R){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Vp.subVectors(e,this.start),ol.subVectors(this.end,this.start);let n=ol.dot(ol),r=ol.dot(Vp)/n;return t&&(r=Fe(r,0,1)),r}closestPointToPoint(e,t,n){let i=this.closestPointToPointParameter(e,t);return this.delta(n).multiplyScalar(i).add(this.start)}distanceSqToLine3(e,t=C0,n=I0){let i=10000000000000001e-32,r,o,a=this.start,c=e.start,l=this.end,h=e.end;rr.subVectors(l,a),or.subVectors(h,c),Uu.subVectors(a,c);let u=rr.dot(rr),d=or.dot(or),f=or.dot(Uu);if(u<=i&&d<=i)return t.copy(a),n.copy(c),t.sub(n),t.dot(t);if(u<=i)r=0,o=f/d,o=Fe(o,0,1);else{let m=rr.dot(Uu);if(d<=i)o=0,r=Fe(-m/u,0,1);else{let _=rr.dot(or),g=u*d-_*_;g!==0?r=Fe((_*f-m*d)/g,0,1):r=0,o=(_*r+f)/d,o<0?(o=0,r=Fe(-m/u,0,1)):o>1&&(o=1,r=Fe((_-m)/u,0,1))}}return t.copy(a).add(rr.multiplyScalar(r)),n.copy(c).add(or.multiplyScalar(o)),t.sub(n),t.dot(t)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}},Hp=new R,sh=class extends at{constructor(e,t){super(),this.light=e,this.matrixAutoUpdate=!1,this.color=t,this.type="SpotLightHelper";let n=new ke,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1];for(let o=0,a=1,c=32;o<c;o++,a++){let l=o/c*Math.PI*2,h=a/c*Math.PI*2;i.push(Math.cos(l),Math.sin(l),1,Math.cos(h),Math.sin(h),1)}n.setAttribute("position",new ye(i,3));let r=new Nt({fog:!1,toneMapped:!1});this.cone=new pn(n,r),this.add(this.cone),this.update()}dispose(){this.cone.geometry.dispose(),this.cone.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),this.parent?(this.parent.updateWorldMatrix(!0),this.matrix.copy(this.parent.matrixWorld).invert().multiply(this.light.matrixWorld)):this.matrix.copy(this.light.matrixWorld),this.matrixWorld.copy(this.light.matrixWorld);let e=this.light.distance?this.light.distance:1e3,t=e*Math.tan(this.light.angle);this.cone.scale.set(t,t,e),Hp.setFromMatrixPosition(this.light.target.matrixWorld),this.cone.lookAt(Hp),this.color!==void 0?this.cone.material.color.set(this.color):this.cone.material.color.copy(this.light.color)}},Ti=new R,al=new Ue,Nu=new Ue,rh=class extends pn{constructor(e){let t=Gm(e),n=new ke,i=[],r=[];for(let l=0;l<t.length;l++){let h=t[l];h.parent&&h.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(0,0,0),r.push(0,0,0))}n.setAttribute("position",new ye(i,3)),n.setAttribute("color",new ye(r,3));let o=new Nt({vertexColors:!0,depthTest:!1,depthWrite:!1,toneMapped:!1,transparent:!0});super(n,o),this.isSkeletonHelper=!0,this.type="SkeletonHelper",this.root=e,this.bones=t,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1;let a=new de(255),c=new de(65280);this.setColors(a,c)}updateMatrixWorld(e){let t=this.bones,n=this.geometry,i=n.getAttribute("position");Nu.copy(this.root.matrixWorld).invert();for(let r=0,o=0;r<t.length;r++){let a=t[r];a.parent&&a.parent.isBone&&(al.multiplyMatrices(Nu,a.matrixWorld),Ti.setFromMatrixPosition(al),i.setXYZ(o,Ti.x,Ti.y,Ti.z),al.multiplyMatrices(Nu,a.parent.matrixWorld),Ti.setFromMatrixPosition(al),i.setXYZ(o+1,Ti.x,Ti.y,Ti.z),o+=2)}n.getAttribute("position").needsUpdate=!0,super.updateMatrixWorld(e)}setColors(e,t){let i=this.geometry.getAttribute("color");for(let r=0;r<i.count;r+=2)i.setXYZ(r,e.r,e.g,e.b),i.setXYZ(r+1,t.r,t.g,t.b);return i.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}};oh=class extends pt{constructor(e,t,n){let i=new zi(t,4,2),r=new Un({wireframe:!0,fog:!1,toneMapped:!1});super(i,r),this.light=e,this.color=n,this.type="PointLightHelper",this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}dispose(){this.geometry.dispose(),this.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.color!==void 0?this.material.color.set(this.color):this.material.color.copy(this.light.color)}},P0=new R,Gp=new de,Wp=new de,ah=class extends at{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="HemisphereLightHelper";let i=new Rr(t);i.rotateY(Math.PI*.5),this.material=new Un({wireframe:!0,fog:!1,toneMapped:!1}),this.color===void 0&&(this.material.vertexColors=!0);let r=i.getAttribute("position"),o=new Float32Array(r.count*3);i.setAttribute("color",new Je(o,3)),this.add(new pt(i,this.material)),this.update()}dispose(){this.children[0].geometry.dispose(),this.children[0].material.dispose()}update(){let e=this.children[0];if(this.color!==void 0)this.material.color.set(this.color);else{let t=e.geometry.getAttribute("color");Gp.copy(this.light.color),Wp.copy(this.light.groundColor);for(let n=0,i=t.count;n<i;n++){let r=n<i/2?Gp:Wp;t.setXYZ(n,r.r,r.g,r.b)}t.needsUpdate=!0}this.light.updateWorldMatrix(!0,!1),e.lookAt(P0.setFromMatrixPosition(this.light.matrixWorld).negate())}},ch=class extends pn{constructor(e=10,t=10,n=4473924,i=8947848){n=new de(n),i=new de(i);let r=t/2,o=e/t,a=e/2,c=[],l=[];for(let d=0,f=0,m=-a;d<=t;d++,m+=o){c.push(-a,0,m,a,0,m),c.push(m,0,-a,m,0,a);let _=d===r?n:i;_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3,_.toArray(l,f),f+=3}let h=new ke;h.setAttribute("position",new ye(c,3)),h.setAttribute("color",new ye(l,3));let u=new Nt({vertexColors:!0,toneMapped:!1});super(h,u),this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},lh=class extends pn{constructor(e=10,t=16,n=8,i=64,r=4473924,o=8947848){r=new de(r),o=new de(o);let a=[],c=[];if(t>1)for(let u=0;u<t;u++){let d=u/t*(Math.PI*2),f=Math.sin(d)*e,m=Math.cos(d)*e;a.push(0,0,0),a.push(f,0,m);let _=u&1?r:o;c.push(_.r,_.g,_.b),c.push(_.r,_.g,_.b)}for(let u=0;u<n;u++){let d=u&1?r:o,f=e-e/n*u;for(let m=0;m<i;m++){let _=m/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f;a.push(g,0,p),c.push(d.r,d.g,d.b),_=(m+1)/i*(Math.PI*2),g=Math.sin(_)*f,p=Math.cos(_)*f,a.push(g,0,p),c.push(d.r,d.g,d.b)}}let l=new ke;l.setAttribute("position",new ye(a,3)),l.setAttribute("color",new ye(c,3));let h=new Nt({vertexColors:!0,toneMapped:!1});super(l,h),this.type="PolarGridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}},Xp=new R,cl=new R,qp=new R,hh=class extends at{constructor(e,t,n){super(),this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let i=new ke;i.setAttribute("position",new ye([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new Nt({fog:!1,toneMapped:!1});this.lightPlane=new Nn(i,r),this.add(this.lightPlane),i=new ke,i.setAttribute("position",new ye([0,0,0,0,0,1],3)),this.targetLine=new Nn(i,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Xp.setFromMatrixPosition(this.light.matrixWorld),cl.setFromMatrixPosition(this.light.target.matrixWorld),qp.subVectors(cl,Xp),this.lightPlane.lookAt(cl),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(cl),this.targetLine.scale.z=qp.length()}},ll=new R,yt=new xs,uh=class extends pn{constructor(e){let t=new ke,n=new Nt({color:16777215,vertexColors:!0,toneMapped:!1}),i=[],r=[],o={};a("n1","n2"),a("n2","n4"),a("n4","n3"),a("n3","n1"),a("f1","f2"),a("f2","f4"),a("f4","f3"),a("f3","f1"),a("n1","f1"),a("n2","f2"),a("n3","f3"),a("n4","f4"),a("p","n1"),a("p","n2"),a("p","n3"),a("p","n4"),a("u1","u2"),a("u2","u3"),a("u3","u1"),a("c","t"),a("p","c"),a("cn1","cn2"),a("cn3","cn4"),a("cf1","cf2"),a("cf3","cf4");function a(m,_){c(m),c(_)}function c(m){i.push(0,0,0),r.push(0,0,0),o[m]===void 0&&(o[m]=[]),o[m].push(i.length/3-1)}t.setAttribute("position",new ye(i,3)),t.setAttribute("color",new ye(r,3)),super(t,n),this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=o,this.update();let l=new de(16755200),h=new de(16711680),u=new de(43775),d=new de(16777215),f=new de(3355443);this.setColors(l,h,u,d,f)}setColors(e,t,n,i,r){let a=this.geometry.getAttribute("color");return a.setXYZ(0,e.r,e.g,e.b),a.setXYZ(1,e.r,e.g,e.b),a.setXYZ(2,e.r,e.g,e.b),a.setXYZ(3,e.r,e.g,e.b),a.setXYZ(4,e.r,e.g,e.b),a.setXYZ(5,e.r,e.g,e.b),a.setXYZ(6,e.r,e.g,e.b),a.setXYZ(7,e.r,e.g,e.b),a.setXYZ(8,e.r,e.g,e.b),a.setXYZ(9,e.r,e.g,e.b),a.setXYZ(10,e.r,e.g,e.b),a.setXYZ(11,e.r,e.g,e.b),a.setXYZ(12,e.r,e.g,e.b),a.setXYZ(13,e.r,e.g,e.b),a.setXYZ(14,e.r,e.g,e.b),a.setXYZ(15,e.r,e.g,e.b),a.setXYZ(16,e.r,e.g,e.b),a.setXYZ(17,e.r,e.g,e.b),a.setXYZ(18,e.r,e.g,e.b),a.setXYZ(19,e.r,e.g,e.b),a.setXYZ(20,e.r,e.g,e.b),a.setXYZ(21,e.r,e.g,e.b),a.setXYZ(22,e.r,e.g,e.b),a.setXYZ(23,e.r,e.g,e.b),a.setXYZ(24,t.r,t.g,t.b),a.setXYZ(25,t.r,t.g,t.b),a.setXYZ(26,t.r,t.g,t.b),a.setXYZ(27,t.r,t.g,t.b),a.setXYZ(28,t.r,t.g,t.b),a.setXYZ(29,t.r,t.g,t.b),a.setXYZ(30,t.r,t.g,t.b),a.setXYZ(31,t.r,t.g,t.b),a.setXYZ(32,n.r,n.g,n.b),a.setXYZ(33,n.r,n.g,n.b),a.setXYZ(34,n.r,n.g,n.b),a.setXYZ(35,n.r,n.g,n.b),a.setXYZ(36,n.r,n.g,n.b),a.setXYZ(37,n.r,n.g,n.b),a.setXYZ(38,i.r,i.g,i.b),a.setXYZ(39,i.r,i.g,i.b),a.setXYZ(40,r.r,r.g,r.b),a.setXYZ(41,r.r,r.g,r.b),a.setXYZ(42,r.r,r.g,r.b),a.setXYZ(43,r.r,r.g,r.b),a.setXYZ(44,r.r,r.g,r.b),a.setXYZ(45,r.r,r.g,r.b),a.setXYZ(46,r.r,r.g,r.b),a.setXYZ(47,r.r,r.g,r.b),a.setXYZ(48,r.r,r.g,r.b),a.setXYZ(49,r.r,r.g,r.b),a.needsUpdate=!0,this}update(){let e=this.geometry,t=this.pointMap,n=1,i=1,r,o;if(yt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse),this.camera.reversedDepth===!0)r=1,o=0;else if(this.camera.coordinateSystem===Qt)r=-1,o=1;else if(this.camera.coordinateSystem===fs)r=0,o=1;else throw new Error("THREE.CameraHelper.update(): Invalid coordinate system: "+this.camera.coordinateSystem);Mt("c",t,e,yt,0,0,r),Mt("t",t,e,yt,0,0,o),Mt("n1",t,e,yt,-n,-i,r),Mt("n2",t,e,yt,n,-i,r),Mt("n3",t,e,yt,-n,i,r),Mt("n4",t,e,yt,n,i,r),Mt("f1",t,e,yt,-n,-i,o),Mt("f2",t,e,yt,n,-i,o),Mt("f3",t,e,yt,-n,i,o),Mt("f4",t,e,yt,n,i,o),Mt("u1",t,e,yt,n*.7,i*1.1,r),Mt("u2",t,e,yt,-n*.7,i*1.1,r),Mt("u3",t,e,yt,0,i*2,r),Mt("cf1",t,e,yt,-n,0,o),Mt("cf2",t,e,yt,n,0,o),Mt("cf3",t,e,yt,0,-i,o),Mt("cf4",t,e,yt,0,i,o),Mt("cn1",t,e,yt,-n,0,r),Mt("cn2",t,e,yt,n,0,r),Mt("cn3",t,e,yt,0,-i,r),Mt("cn4",t,e,yt,0,i,r),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}};hl=new Rt,fh=class extends pn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new ke;r.setIndex(new Je(n,1)),r.setAttribute("position",new Je(i,3)),super(r,new Nt({color:t,toneMapped:!1})),this.object=e,this.type="BoxHelper",this.matrixAutoUpdate=!1,this.update()}update(){if(this.object!==void 0&&hl.setFromObject(this.object),hl.isEmpty())return;let e=hl.min,t=hl.max,n=this.geometry.attributes.position,i=n.array;i[0]=t.x,i[1]=t.y,i[2]=t.z,i[3]=e.x,i[4]=t.y,i[5]=t.z,i[6]=e.x,i[7]=e.y,i[8]=t.z,i[9]=t.x,i[10]=e.y,i[11]=t.z,i[12]=t.x,i[13]=t.y,i[14]=e.z,i[15]=e.x,i[16]=t.y,i[17]=e.z,i[18]=e.x,i[19]=e.y,i[20]=e.z,i[21]=t.x,i[22]=e.y,i[23]=e.z,n.needsUpdate=!0,this.geometry.computeBoundingSphere()}setFromObject(e){return this.object=e,this.update(),this}copy(e,t){return super.copy(e,t),this.object=e.object,this}dispose(){this.geometry.dispose(),this.material.dispose()}},dh=class extends pn{constructor(e,t=16776960){let n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],r=new ke;r.setIndex(new Je(n,1)),r.setAttribute("position",new ye(i,3)),super(r,new Nt({color:t,toneMapped:!1})),this.box=e,this.type="Box3Helper",this.geometry.computeBoundingSphere()}updateMatrixWorld(e){let t=this.box;t.isEmpty()||(t.getCenter(this.position),t.getSize(this.scale),this.scale.multiplyScalar(.5),super.updateMatrixWorld(e))}dispose(){this.geometry.dispose(),this.material.dispose()}},ph=class extends Nn{constructor(e,t=1,n=16776960){let i=n,r=[1,-1,0,-1,1,0,-1,-1,0,1,1,0,-1,1,0,-1,-1,0,1,-1,0,1,1,0],o=new ke;o.setAttribute("position",new ye(r,3)),o.computeBoundingSphere(),super(o,new Nt({color:i,toneMapped:!1})),this.type="PlaneHelper",this.plane=e,this.size=t;let a=[1,1,0,-1,1,0,-1,-1,0,1,1,0,-1,-1,0,1,-1,0],c=new ke;c.setAttribute("position",new ye(a,3)),c.computeBoundingSphere(),this.add(new pt(c,new Un({color:i,opacity:.2,transparent:!0,depthWrite:!1,toneMapped:!1})))}updateMatrixWorld(e){this.position.set(0,0,0),this.scale.set(.5*this.size,.5*this.size,1),this.lookAt(this.plane.normal),this.translateZ(-this.plane.constant),super.updateMatrixWorld(e)}dispose(){this.geometry.dispose(),this.material.dispose(),this.children[0].geometry.dispose(),this.children[0].material.dispose()}},Yp=new R,mh=class extends at{constructor(e=new R(0,0,1),t=new R(0,0,0),n=1,i=16776960,r=n*.2,o=r*.2){super(),this.type="ArrowHelper",ul===void 0&&(ul=new ke,ul.setAttribute("position",new ye([0,0,0,0,1,0],3)),Fu=new ui(.5,1,5,1),Fu.translate(0,-.5,0)),this.position.copy(t),this.line=new Nn(ul,new Nt({color:i,toneMapped:!1})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new pt(Fu,new Un({color:i,toneMapped:!1})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(e),this.setLength(n,r,o)}setDirection(e){if(e.y>.99999)this.quaternion.set(0,0,0,1);else if(e.y<-.99999)this.quaternion.set(1,0,0,0);else{Yp.set(e.z,0,-e.x).normalize();let t=Math.acos(e.y);this.quaternion.setFromAxisAngle(Yp,t)}}setLength(e,t=e*.2,n=t*.2){this.line.scale.set(1,Math.max(1e-4,e-t),1),this.line.updateMatrix(),this.cone.scale.set(n,t,n),this.cone.position.y=e,this.cone.updateMatrix()}setColor(e){this.line.material.color.set(e),this.cone.material.color.set(e)}copy(e){return super.copy(e,!1),this.line.copy(e.line),this.cone.copy(e.cone),this}dispose(){this.line.geometry.dispose(),this.line.material.dispose(),this.cone.geometry.dispose(),this.cone.material.dispose()}},gh=class extends pn{constructor(e=1){let t=[0,0,0,e,0,0,0,0,0,0,e,0,0,0,0,0,0,e],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new ke;i.setAttribute("position",new ye(t,3)),i.setAttribute("color",new ye(n,3));let r=new Nt({vertexColors:!0,toneMapped:!1});super(i,r),this.type="AxesHelper"}setColors(e,t,n){let i=new de,r=this.geometry.attributes.color.array;return i.set(e),i.toArray(r,0),i.toArray(r,3),i.set(t),i.toArray(r,6),i.toArray(r,9),i.set(n),i.toArray(r,12),i.toArray(r,15),this.geometry.attributes.color.needsUpdate=!0,this}dispose(){this.geometry.dispose(),this.material.dispose()}},_h=class{constructor(){this.type="ShapePath",this.color=new de,this.subPaths=[],this.currentPath=null}moveTo(e,t){return this.currentPath=new bs,this.subPaths.push(this.currentPath),this.currentPath.moveTo(e,t),this}lineTo(e,t){return this.currentPath.lineTo(e,t),this}quadraticCurveTo(e,t,n,i){return this.currentPath.quadraticCurveTo(e,t,n,i),this}bezierCurveTo(e,t,n,i,r,o){return this.currentPath.bezierCurveTo(e,t,n,i,r,o),this}splineThru(e){return this.currentPath.splineThru(e),this}toShapes(e){function t(p){let y=[];for(let v=0,x=p.length;v<x;v++){let T=p[v],E=new Mn;E.curves=T.curves,y.push(E)}return y}function n(p,y){let v=y.length,x=!1;for(let T=v-1,E=0;E<v;T=E++){let w=y[T],C=y[E],M=C.x-w.x,S=C.y-w.y;if(Math.abs(S)>Number.EPSILON){if(S<0&&(w=y[E],M=-M,C=y[T],S=-S),p.y<w.y||p.y>C.y)continue;if(p.y===w.y){if(p.x===w.x)return!0}else{let P=S*(p.x-w.x)-M*(p.y-w.y);if(P===0)return!0;if(P<0)continue;x=!x}}else{if(p.y!==w.y)continue;if(C.x<=p.x&&p.x<=w.x||w.x<=p.x&&p.x<=C.x)return!0}}return x}let i=vn.isClockWise,r=this.subPaths;if(r.length===0)return[];let o,a,c,l=[];if(r.length===1)return a=r[0],c=new Mn,c.curves=a.curves,l.push(c),l;let h=!i(r[0].getPoints());h=e?!h:h;let u=[],d=[],f=[],m=0,_;d[m]=void 0,f[m]=[];for(let p=0,y=r.length;p<y;p++)a=r[p],_=a.getPoints(),o=i(_),o=e?!o:o,o?(!h&&d[m]&&m++,d[m]={s:new Mn,p:_},d[m].s.curves=a.curves,h&&m++,f[m]=[]):f[m].push({h:a,p:_[0]});if(!d[0])return t(r);if(d.length>1){let p=!1,y=0;for(let v=0,x=d.length;v<x;v++)u[v]=[];for(let v=0,x=d.length;v<x;v++){let T=f[v];for(let E=0;E<T.length;E++){let w=T[E],C=!0;for(let M=0;M<d.length;M++)n(w.p,d[M].p)&&(v!==M&&y++,C?(C=!1,u[M].push(w)):p=!0);C&&u[v].push(w)}}y>0&&p===!1&&(f=u)}let g;for(let p=0,y=d.length;p<y;p++){c=d[p].s,l.push(c),g=f[p];for(let v=0,x=g.length;v<x;v++)c.holes.push(g[v].h)}return l}},xh=class extends fn{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};yh=class{static contain(e,t){return L0(e,t)}static cover(e,t){return D0(e,t)}static fill(e){return U0(e)}static getByteLength(e,t,n,i){return Nh(e,t,n,i)}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180")});var kh={};kd(kh,{ACESFilmicToneMapping:()=>Sf,AddEquation:()=>ai,AddOperation:()=>xf,AdditiveAnimationBlendMode:()=>Lh,AdditiveBlending:()=>Sh,AgXToneMapping:()=>Tf,AlphaFormat:()=>Ch,AlwaysCompare:()=>zf,AlwaysDepth:()=>Aa,AlwaysStencilFunc:()=>dl,AmbientLight:()=>da,AnimationAction:()=>Ta,AnimationClip:()=>Xi,AnimationLoader:()=>Ll,AnimationMixer:()=>Xl,AnimationObjectGroup:()=>Wl,AnimationUtils:()=>Pl,ArcCurve:()=>Oo,ArrayCamera:()=>va,ArrowHelper:()=>mh,AttachedBindMode:()=>fl,Audio:()=>Sa,AudioAnalyser:()=>Gl,AudioContext:()=>Nr,AudioListener:()=>Vl,AudioLoader:()=>zl,AxesHelper:()=>gh,BackSide:()=>Vt,BasicDepthPacking:()=>If,BasicShadowMap:()=>Kp,BatchedMesh:()=>Io,Bone:()=>xr,BooleanKeyframeTrack:()=>Xn,Box2:()=>nh,Box3:()=>Rt,Box3Helper:()=>dh,BoxGeometry:()=>Sn,BoxHelper:()=>fh,BufferAttribute:()=>Je,BufferGeometry:()=>ke,BufferGeometryLoader:()=>ya,ByteType:()=>Eh,Cache:()=>Dn,Camera:()=>xs,CameraHelper:()=>uh,CanvasTexture:()=>Cl,CapsuleGeometry:()=>Ms,CatmullRomCurve3:()=>Bi,CineonToneMapping:()=>Mf,CircleGeometry:()=>Uo,ClampToEdgeWrapping:()=>qt,Clock:()=>Ma,Color:()=>de,ColorKeyframeTrack:()=>Lr,ColorManagement:()=>tt,CompressedArrayTexture:()=>Al,CompressedCubeTexture:()=>Rl,CompressedTexture:()=>Fn,CompressedTextureLoader:()=>Dl,ConeGeometry:()=>ui,ConstantAlphaFactor:()=>mf,ConstantColorFactor:()=>df,Controls:()=>xh,CubeCamera:()=>vo,CubeReflectionMapping:()=>Jn,CubeRefractionMapping:()=>pi,CubeTexture:()=>Ui,CubeTextureLoader:()=>Ul,CubeUVReflectionMapping:()=>Is,CubicBezierCurve:()=>Sr,CubicBezierCurve3:()=>Bo,CubicInterpolant:()=>ra,CullFaceBack:()=>vh,CullFaceFront:()=>$u,CullFaceFrontBack:()=>$p,CullFaceNone:()=>Ju,Curve:()=>nn,CurvePath:()=>ko,CustomBlending:()=>ju,CustomToneMapping:()=>bf,CylinderGeometry:()=>Oi,Cylindrical:()=>eh,Data3DTexture:()=>gs,DataArrayTexture:()=>ms,DataTexture:()=>un,DataTextureLoader:()=>Nl,DataUtils:()=>gl,DecrementStencilOp:()=>um,DecrementWrapStencilOp:()=>dm,DefaultLoadingManager:()=>Yf,DepthFormat:()=>hs,DepthStencilFormat:()=>Us,DepthTexture:()=>vr,DetachedBindMode:()=>wf,DirectionalLight:()=>fa,DirectionalLightHelper:()=>hh,DiscreteInterpolant:()=>oa,DodecahedronGeometry:()=>No,DoubleSide:()=>Jt,DstAlphaFactor:()=>cf,DstColorFactor:()=>hf,DynamicCopyUsage:()=>Rm,DynamicDrawUsage:()=>Sm,DynamicReadUsage:()=>Em,EdgesGeometry:()=>Fo,EllipseCurve:()=>Ss,EqualCompare:()=>Nf,EqualDepth:()=>Ca,EqualStencilFunc:()=>_m,EquirectangularReflectionMapping:()=>Or,EquirectangularRefractionMapping:()=>Br,Euler:()=>en,EventDispatcher:()=>fn,ExternalTexture:()=>Mr,ExtrudeGeometry:()=>Es,FileLoader:()=>bn,Float16BufferAttribute:()=>Sl,Float32BufferAttribute:()=>ye,FloatType:()=>Yt,Fog:()=>bo,FogExp2:()=>So,FramebufferTexture:()=>wl,FrontSide:()=>Wn,Frustum:()=>hi,FrustumArray:()=>Co,GLBufferAttribute:()=>$l,GLSL1:()=>Im,GLSL3:()=>Uh,GreaterCompare:()=>Ff,GreaterDepth:()=>Pa,GreaterEqualCompare:()=>Bf,GreaterEqualDepth:()=>Ia,GreaterEqualStencilFunc:()=>Mm,GreaterStencilFunc:()=>ym,GridHelper:()=>ch,Group:()=>Ln,HalfFloatType:()=>Ls,HemisphereLight:()=>ca,HemisphereLightHelper:()=>ah,IcosahedronGeometry:()=>Wo,ImageBitmapLoader:()=>Bl,ImageLoader:()=>qi,ImageUtils:()=>ps,IncrementStencilOp:()=>hm,IncrementWrapStencilOp:()=>fm,InstancedBufferAttribute:()=>li,InstancedBufferGeometry:()=>xa,InstancedInterleavedBuffer:()=>Jl,InstancedMesh:()=>Ro,Int16BufferAttribute:()=>vl,Int32BufferAttribute:()=>Ml,Int8BufferAttribute:()=>_l,IntType:()=>Ua,InterleavedBuffer:()=>vs,InterleavedBufferAttribute:()=>Fi,Interpolant:()=>Vi,InterpolateDiscrete:()=>Li,InterpolateLinear:()=>us,InterpolateSmooth:()=>po,InterpolationSamplingMode:()=>Dm,InterpolationSamplingType:()=>Lm,InvertStencilOp:()=>pm,KeepStencilOp:()=>Ei,KeyframeTrack:()=>Zt,LOD:()=>Eo,LatheGeometry:()=>ws,Layers:()=>_s,LessCompare:()=>Uf,LessDepth:()=>Ra,LessEqualCompare:()=>Dh,LessEqualDepth:()=>Ci,LessEqualStencilFunc:()=>xm,LessStencilFunc:()=>gm,Light:()=>On,LightProbe:()=>ga,Line:()=>Nn,Line3:()=>ih,LineBasicMaterial:()=>Nt,LineCurve:()=>br,LineCurve3:()=>zo,LineDashedMaterial:()=>sa,LineLoop:()=>Po,LineSegments:()=>pn,LinearFilter:()=>vt,LinearInterpolant:()=>Pr,LinearMipMapLinearFilter:()=>tm,LinearMipMapNearestFilter:()=>em,LinearMipmapLinearFilter:()=>mn,LinearMipmapNearestFilter:()=>Yi,LinearSRGBColorSpace:()=>Di,LinearToneMapping:()=>yf,LinearTransfer:()=>hr,Loader:()=>Ot,LoaderUtils:()=>Ur,LoadingManager:()=>Dr,LoopOnce:()=>Af,LoopPingPong:()=>Cf,LoopRepeat:()=>Rf,MOUSE:()=>Zp,Material:()=>Ct,MaterialLoader:()=>_a,MathUtils:()=>zn,Matrix2:()=>th,Matrix3:()=>ze,Matrix4:()=>Ue,MaxEquation:()=>nf,Mesh:()=>pt,MeshBasicMaterial:()=>Un,MeshDepthMaterial:()=>Cr,MeshDistanceMaterial:()=>Ir,MeshLambertMaterial:()=>na,MeshMatcapMaterial:()=>ia,MeshNormalMaterial:()=>ta,MeshPhongMaterial:()=>Qo,MeshPhysicalMaterial:()=>jo,MeshStandardMaterial:()=>ki,MeshToonMaterial:()=>ea,MinEquation:()=>tf,MirroredRepeatWrapping:()=>Pi,MixOperation:()=>_f,MultiplyBlending:()=>Th,MultiplyOperation:()=>Fr,NearestFilter:()=>wt,NearestMipMapLinearFilter:()=>Qp,NearestMipMapNearestFilter:()=>jp,NearestMipmapLinearFilter:()=>mi,NearestMipmapNearestFilter:()=>zr,NeutralToneMapping:()=>Ef,NeverCompare:()=>Df,NeverDepth:()=>wa,NeverStencilFunc:()=>mm,NoBlending:()=>Yn,NoColorSpace:()=>En,NoToneMapping:()=>Zn,NormalAnimationBlendMode:()=>pc,NormalBlending:()=>Ri,NotEqualCompare:()=>Of,NotEqualDepth:()=>La,NotEqualStencilFunc:()=>vm,NumberKeyframeTrack:()=>Hi,Object3D:()=>at,ObjectLoader:()=>Ol,ObjectSpaceNormalMap:()=>Lf,OctahedronGeometry:()=>Rr,OneFactor:()=>rf,OneMinusConstantAlphaFactor:()=>gf,OneMinusConstantColorFactor:()=>pf,OneMinusDstAlphaFactor:()=>lf,OneMinusDstColorFactor:()=>uf,OneMinusSrcAlphaFactor:()=>yo,OneMinusSrcColorFactor:()=>af,OrthographicCamera:()=>Cs,PCFShadowMap:()=>Mh,PCFSoftShadowMap:()=>Ku,PMREMGenerator:()=>gc,Path:()=>bs,PerspectiveCamera:()=>Tt,Plane:()=>In,PlaneGeometry:()=>di,PlaneHelper:()=>ph,PointLight:()=>ua,PointLightHelper:()=>oh,Points:()=>Lo,PointsMaterial:()=>yr,PolarGridHelper:()=>lh,PolyhedronGeometry:()=>fi,PositionalAudio:()=>Hl,PropertyBinding:()=>et,PropertyMixer:()=>ba,QuadraticBezierCurve:()=>Tr,QuadraticBezierCurve3:()=>Er,Quaternion:()=>At,QuaternionKeyframeTrack:()=>Gi,QuaternionLinearInterpolant:()=>aa,RED_GREEN_RGTC2_Format:()=>fc,RED_RGTC1_Format:()=>hc,REVISION:()=>Ea,RGBADepthPacking:()=>Pf,RGBAFormat:()=>Ut,RGBAIntegerFormat:()=>za,RGBA_ASTC_10x10_Format:()=>sc,RGBA_ASTC_10x5_Format:()=>tc,RGBA_ASTC_10x6_Format:()=>nc,RGBA_ASTC_10x8_Format:()=>ic,RGBA_ASTC_12x10_Format:()=>rc,RGBA_ASTC_12x12_Format:()=>oc,RGBA_ASTC_4x4_Format:()=>Ya,RGBA_ASTC_5x4_Format:()=>Za,RGBA_ASTC_5x5_Format:()=>Ja,RGBA_ASTC_6x5_Format:()=>$a,RGBA_ASTC_6x6_Format:()=>Ka,RGBA_ASTC_8x5_Format:()=>ja,RGBA_ASTC_8x6_Format:()=>Qa,RGBA_ASTC_8x8_Format:()=>ec,RGBA_BPTC_Format:()=>ac,RGBA_ETC2_EAC_Format:()=>qa,RGBA_PVRTC_2BPPV1_Format:()=>Ga,RGBA_PVRTC_4BPPV1_Format:()=>Ha,RGBA_S3TC_DXT1_Format:()=>Hr,RGBA_S3TC_DXT3_Format:()=>Gr,RGBA_S3TC_DXT5_Format:()=>Wr,RGBDepthPacking:()=>om,RGBFormat:()=>Ih,RGBIntegerFormat:()=>nm,RGB_BPTC_SIGNED_Format:()=>cc,RGB_BPTC_UNSIGNED_Format:()=>lc,RGB_ETC1_Format:()=>Wa,RGB_ETC2_Format:()=>Xa,RGB_PVRTC_2BPPV1_Format:()=>Va,RGB_PVRTC_4BPPV1_Format:()=>ka,RGB_S3TC_DXT1_Format:()=>Vr,RGDepthPacking:()=>am,RGFormat:()=>Ph,RGIntegerFormat:()=>Ba,RawShaderMaterial:()=>Ko,Ray:()=>ci,Raycaster:()=>Kl,RectAreaLight:()=>pa,RedFormat:()=>Oa,RedIntegerFormat:()=>kr,ReinhardToneMapping:()=>vf,RenderTarget:()=>pr,RenderTarget3D:()=>ql,RepeatWrapping:()=>Ii,ReplaceStencilOp:()=>lm,ReverseSubtractEquation:()=>ef,RingGeometry:()=>Xo,SIGNED_RED_GREEN_RGTC2_Format:()=>dc,SIGNED_RED_RGTC1_Format:()=>uc,SRGBColorSpace:()=>Ft,SRGBTransfer:()=>lt,Scene:()=>Ni,ShaderChunk:()=>Ze,ShaderLib:()=>kn,ShaderMaterial:()=>tn,ShadowMaterial:()=>$o,Shape:()=>Mn,ShapeGeometry:()=>qo,ShapePath:()=>_h,ShapeUtils:()=>vn,ShortType:()=>wh,Skeleton:()=>Ao,SkeletonHelper:()=>rh,SkinnedMesh:()=>wo,Source:()=>ln,Sphere:()=>Et,SphereGeometry:()=>zi,Spherical:()=>Ql,SphericalHarmonics3:()=>ma,SplineCurve:()=>wr,SpotLight:()=>ha,SpotLightHelper:()=>sh,Sprite:()=>To,SpriteMaterial:()=>_r,SrcAlphaFactor:()=>xo,SrcAlphaSaturateFactor:()=>ff,SrcColorFactor:()=>of,StaticCopyUsage:()=>Am,StaticDrawUsage:()=>ur,StaticReadUsage:()=>Tm,StereoCamera:()=>kl,StreamCopyUsage:()=>Cm,StreamDrawUsage:()=>bm,StreamReadUsage:()=>wm,StringKeyframeTrack:()=>qn,SubtractEquation:()=>Qu,SubtractiveBlending:()=>bh,TOUCH:()=>Jp,TangentSpaceNormalMap:()=>gi,TetrahedronGeometry:()=>Yo,Texture:()=>St,TextureLoader:()=>Fl,TextureUtils:()=>yh,Timer:()=>jl,TimestampQuery:()=>Pm,TorusGeometry:()=>As,TorusKnotGeometry:()=>Zo,Triangle:()=>Pn,TriangleFanDrawMode:()=>rm,TriangleStripDrawMode:()=>sm,TrianglesDrawMode:()=>im,TubeGeometry:()=>Rs,UVMapping:()=>Da,Uint16BufferAttribute:()=>mr,Uint32BufferAttribute:()=>gr,Uint8BufferAttribute:()=>xl,Uint8ClampedBufferAttribute:()=>yl,Uniform:()=>Yl,UniformsGroup:()=>Zl,UniformsLib:()=>pe,UniformsUtils:()=>Wf,UnsignedByteType:()=>Tn,UnsignedInt101111Type:()=>Rh,UnsignedInt248Type:()=>Ds,UnsignedInt5999Type:()=>Ah,UnsignedIntType:()=>$n,UnsignedShort4444Type:()=>Na,UnsignedShort5551Type:()=>Fa,UnsignedShortType:()=>Ps,VSMShadowMap:()=>Bn,Vector2:()=>K,Vector3:()=>R,Vector4:()=>it,VectorKeyframeTrack:()=>Wi,VideoFrameTexture:()=>El,VideoTexture:()=>Do,WebGL3DRenderTarget:()=>ml,WebGLArrayRenderTarget:()=>pl,WebGLCoordinateSystem:()=>Qt,WebGLCubeRenderTarget:()=>Mo,WebGLRenderTarget:()=>dn,WebGLRenderer:()=>ud,WebGLUtils:()=>xg,WebGPUCoordinateSystem:()=>fs,WebXRController:()=>ys,WireframeGeometry:()=>Jo,WrapAroundEnding:()=>lr,ZeroCurvatureEnding:()=>wi,ZeroFactor:()=>sf,ZeroSlopeEnding:()=>Ai,ZeroStencilOp:()=>cm,createCanvasElement:()=>Hf});function dg(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function F0(s){let e=new WeakMap;function t(a,c){let l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=s.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){let h=c.array,u=c.updateRanges;if(s.bindBuffer(l,a),u.length===0)s.bufferSubData(l,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){let m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){let _=u[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);let c=e.get(a);c&&(s.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:r,update:o}}function _v(s,e,t,n,i,r,o){let a=new de(0),c=r===!0?0:1,l,h,u=null,d=0,f=null;function m(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function _(v){let x=!1,T=m(v);T===null?p(a,c):T&&T.isColor&&(p(T,1),x=!0);let E=s.xr.getEnvironmentBlendMode();E==="additive"?n.buffers.color.setClear(0,0,0,1,o):E==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(v,x){let T=m(x);T&&(T.isCubeTexture||T.mapping===Is)?(h===void 0&&(h=new pt(new Sn(1,1,1),new tn({name:"BackgroundCubeMaterial",uniforms:Ns(kn.backgroundCube.uniforms),vertexShader:kn.backgroundCube.vertexShader,fragmentShader:kn.backgroundCube.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Fs.copy(x.backgroundRotation),Fs.x*=-1,Fs.y*=-1,Fs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Fs.y*=-1,Fs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(gv.makeRotationFromEuler(Fs)),h.material.toneMapped=tt.getTransfer(T.colorSpace)!==lt,(u!==T||d!==T.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=s.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new pt(new di(2,2),new tn({name:"BackgroundMaterial",uniforms:Ns(kn.background.uniforms),vertexShader:kn.background.vertexShader,fragmentShader:kn.background.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=tt.getTransfer(T.colorSpace)!==lt,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=T,d=T.version,f=s.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function p(v,x){v.getRGB(Fh,Gf(s)),n.buffers.color.setClear(Fh.r,Fh.g,Fh.b,x,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,p(a,c)},render:_,addToRenderList:g,dispose:y}}function xv(s,e){let t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null),r=i,o=!1;function a(S,P,U,B,k){let z=!1,W=u(B,U,P);r!==W&&(r=W,l(r.object)),z=f(S,B,U,k),z&&m(S,B,U,k),k!==null&&e.update(k,s.ELEMENT_ARRAY_BUFFER),(z||o)&&(o=!1,x(S,P,U,B),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return s.createVertexArray()}function l(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,P,U){let B=U.wireframe===!0,k=n[S.id];k===void 0&&(k={},n[S.id]=k);let z=k[P.id];z===void 0&&(z={},k[P.id]=z);let W=z[B];return W===void 0&&(W=d(c()),z[B]=W),W}function d(S){let P=[],U=[],B=[];for(let k=0;k<t;k++)P[k]=0,U[k]=0,B[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:U,attributeDivisors:B,object:S,attributes:{},index:null}}function f(S,P,U,B){let k=r.attributes,z=P.attributes,W=0,Q=U.getAttributes();for(let G in Q)if(Q[G].location>=0){let me=k[G],Me=z[G];if(Me===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(Me=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(Me=S.instanceColor)),me===void 0||me.attribute!==Me||Me&&me.data!==Me.data)return!0;W++}return r.attributesNum!==W||r.index!==B}function m(S,P,U,B){let k={},z=P.attributes,W=0,Q=U.getAttributes();for(let G in Q)if(Q[G].location>=0){let me=z[G];me===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(me=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(me=S.instanceColor));let Me={};Me.attribute=me,me&&me.data&&(Me.data=me.data),k[G]=Me,W++}r.attributes=k,r.attributesNum=W,r.index=B}function _(){let S=r.newAttributes;for(let P=0,U=S.length;P<U;P++)S[P]=0}function g(S){p(S,0)}function p(S,P){let U=r.newAttributes,B=r.enabledAttributes,k=r.attributeDivisors;U[S]=1,B[S]===0&&(s.enableVertexAttribArray(S),B[S]=1),k[S]!==P&&(s.vertexAttribDivisor(S,P),k[S]=P)}function y(){let S=r.newAttributes,P=r.enabledAttributes;for(let U=0,B=P.length;U<B;U++)P[U]!==S[U]&&(s.disableVertexAttribArray(U),P[U]=0)}function v(S,P,U,B,k,z,W){W===!0?s.vertexAttribIPointer(S,P,U,k,z):s.vertexAttribPointer(S,P,U,B,k,z)}function x(S,P,U,B){_();let k=B.attributes,z=U.getAttributes(),W=P.defaultAttributeValues;for(let Q in z){let G=z[Q];if(G.location>=0){let he=k[Q];if(he===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(he=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(he=S.instanceColor)),he!==void 0){let me=he.normalized,Me=he.itemSize,Ve=e.get(he);if(Ve===void 0)continue;let $e=Ve.buffer,rt=Ve.type,je=Ve.bytesPerElement,Y=rt===s.INT||rt===s.UNSIGNED_INT||he.gpuType===Ua;if(he.isInterleavedBufferAttribute){let te=he.data,Se=te.stride,Ie=he.offset;if(te.isInstancedInterleavedBuffer){for(let ve=0;ve<G.locationSize;ve++)p(G.location+ve,te.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ve=0;ve<G.locationSize;ve++)g(G.location+ve);s.bindBuffer(s.ARRAY_BUFFER,$e);for(let ve=0;ve<G.locationSize;ve++)v(G.location+ve,Me/G.locationSize,rt,me,Se*je,(Ie+Me/G.locationSize*ve)*je,Y)}else{if(he.isInstancedBufferAttribute){for(let te=0;te<G.locationSize;te++)p(G.location+te,he.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let te=0;te<G.locationSize;te++)g(G.location+te);s.bindBuffer(s.ARRAY_BUFFER,$e);for(let te=0;te<G.locationSize;te++)v(G.location+te,Me/G.locationSize,rt,me,Me*je,Me/G.locationSize*te*je,Y)}}else if(W!==void 0){let me=W[Q];if(me!==void 0)switch(me.length){case 2:s.vertexAttrib2fv(G.location,me);break;case 3:s.vertexAttrib3fv(G.location,me);break;case 4:s.vertexAttrib4fv(G.location,me);break;default:s.vertexAttrib1fv(G.location,me)}}}}y()}function T(){C();for(let S in n){let P=n[S];for(let U in P){let B=P[U];for(let k in B)h(B[k].object),delete B[k];delete P[U]}delete n[S]}}function E(S){if(n[S.id]===void 0)return;let P=n[S.id];for(let U in P){let B=P[U];for(let k in B)h(B[k].object),delete B[k];delete P[U]}delete n[S.id]}function w(S){for(let P in n){let U=n[P];if(U[S.id]===void 0)continue;let B=U[S.id];for(let k in B)h(B[k].object),delete B[k];delete U[S.id]}}function C(){M(),o=!0,r!==i&&(r=i,l(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:M,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:w,initAttributes:_,enableAttribute:g,disableUnusedAttributes:y}}function yv(s,e,t){let n;function i(l){n=l}function r(l,h){s.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<l.length;m++)o(l[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];t.update(m,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function vv(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let w=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(w){return!(w!==Ut&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(w){let C=w===Ls&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Tn&&n.convert(w)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==Yt&&!C)}function c(w){if(w==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp",h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),m=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),v=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,E=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:y,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:T,maxSamples:E}}function Mv(s){let e=this,t=null,n=0,i=!1,r=!1,o=new In,a=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=s.get(u);if(!i||m===null||m.length===0||r&&!g)r?h(null):l();else{let y=r?0:n,v=y*4,x=p.clippingState||null;c.value=x,x=h(m,d,v,f);for(let T=0;T!==v;++T)x[T]=t[T];p.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,m){let _=u!==null?u.length:0,g=null;if(_!==0){if(g=c.value,m!==!0||g===null){let p=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(g===null||g.length<p)&&(g=new Float32Array(p));for(let v=0,x=f;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(y,a),o.normal.toArray(g,x),g[x+3]=o.constant}c.value=g,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,g}}function Sv(s){let e=new WeakMap;function t(o,a){return a===Or?o.mapping=Jn:a===Br&&(o.mapping=pi),o}function n(o){if(o&&o.isTexture){let a=o.mapping;if(a===Or||a===Br)if(e.has(o)){let c=e.get(o).texture;return t(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Mo(c.height);return l.fromEquirectangularTexture(s,o),e.set(o,l),o.addEventListener("dispose",i),t(l.texture,o.mapping)}else return null}}return o}function i(o){let a=o.target;a.removeEventListener("dispose",i);let c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}function Tv(s){let e=[],t=[],n=[],i=s,r=s-qr+1+Wm.length;for(let o=0;o<r;o++){let a=Math.pow(2,i);t.push(a);let c=1/a;o>s-qr?c=Wm[o-s+qr-1]:o===0&&(c=0),n.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,y=new Float32Array(_*m*f),v=new Float32Array(g*m*f),x=new Float32Array(p*m*f);for(let E=0;E<f;E++){let w=E%3*2/3-1,C=E>2?0:-1,M=[w,C,0,w+2/3,C,0,w+2/3,C+1,0,w,C,0,w+2/3,C+1,0,w,C+1,0];y.set(M,_*m*E),v.set(d,g*m*E);let S=[E,E,E,E,E,E];x.set(S,p*m*E)}let T=new ke;T.setAttribute("position",new Je(y,_)),T.setAttribute("uv",new Je(v,g)),T.setAttribute("faceIndex",new Je(x,p)),e.push(T),i>qr&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Ym(s,e,t){let n=new dn(s,e,t);return n.texture.mapping=Is,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Oh(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Ev(s,e,t){let n=new Float32Array(zs),i=new R(0,1,0);return new tn({name:"SphericalGaussianBlur",defines:{n:zs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Zm(){return new tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function Jm(){return new tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Yn,depthTest:!1,depthWrite:!1})}function fd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function wv(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){let c=a.mapping,l=c===Or||c===Br,h=c===Jn||c===pi;if(l||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new gc(s)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(t===null&&(t=new gc(s)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function Av(s){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&dr("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Rv(s,e,t,n){let i={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",o),delete i[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,t.memory.geometries++),d}function c(u){let d=u.attributes;for(let f in d)e.update(d[f],s.ARRAY_BUFFER)}function l(u){let d=[],f=u.index,m=u.attributes.position,_=0;if(f!==null){let y=f.array;_=f.version;for(let v=0,x=y.length;v<x;v+=3){let T=y[v+0],E=y[v+1],w=y[v+2];d.push(T,E,E,w,w,T)}}else if(m!==void 0){let y=m.array;_=m.version;for(let v=0,x=y.length/3-1;v<x;v+=3){let T=v+0,E=v+1,w=v+2;d.push(T,E,E,w,w,T)}}else return;let g=new(Vf(d)?gr:mr)(d,1);g.version=_;let p=r.get(u);p&&e.remove(p),r.set(u,g)}function h(u){let d=r.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Cv(s,e,t){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function c(d,f){s.drawElements(n,f,r,d*o),t.update(f,n,1)}function l(d,f,m){m!==0&&(s.drawElementsInstanced(n,f,r,d*o,m),t.update(f,n,m))}function h(d,f,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];t.update(g,n,1)}function u(d,f,m,_){if(m===0)return;let g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)l(d[p]/o,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,m);let p=0;for(let y=0;y<m;y++)p+=f[y]*_[y];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Iv(s){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Pv(s,e,t){let n=new WeakMap,i=new it;function r(o,a,c){let l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(a);if(d===void 0||d.count!==u){let M=function(){w.dispose(),n.delete(a),a.removeEventListener("dispose",M)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],y=a.morphAttributes.color||[],v=0;f===!0&&(v=1),m===!0&&(v=2),_===!0&&(v=3);let x=a.attributes.position.count*v,T=1;x>e.maxTextureSize&&(T=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let E=new Float32Array(x*T*4*u),w=new ms(E,x,T,u);w.type=Yt,w.needsUpdate=!0;let C=v*4;for(let S=0;S<u;S++){let P=g[S],U=p[S],B=y[S],k=x*T*4*S;for(let z=0;z<P.count;z++){let W=z*C;f===!0&&(i.fromBufferAttribute(P,z),E[k+W+0]=i.x,E[k+W+1]=i.y,E[k+W+2]=i.z,E[k+W+3]=0),m===!0&&(i.fromBufferAttribute(U,z),E[k+W+4]=i.x,E[k+W+5]=i.y,E[k+W+6]=i.z,E[k+W+7]=0),_===!0&&(i.fromBufferAttribute(B,z),E[k+W+8]=i.x,E[k+W+9]=i.y,E[k+W+10]=i.z,E[k+W+11]=B.itemSize===4?i.w:1)}}d={count:u,texture:w,size:new K(x,T)},n.set(a,d),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];let m=a.morphTargetsRelative?1:1-f;c.getUniforms().setValue(s,"morphTargetBaseInfluence",m),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Lv(s,e,t,n){let i=new WeakMap;function r(c){let l=n.render.frame,h=c.geometry,u=e.get(c,h);if(i.get(u)!==l&&(e.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}function Zr(s,e,t){let n=s[0];if(n<=0||n>0)return s;let i=e*t,r=Km[i];if(r===void 0&&(r=new Float32Array(i),Km[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function It(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Pt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function zh(s,e){let t=jm[e];t===void 0&&(t=new Int32Array(e),jm[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Dv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Uv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2fv(this.addr,e),Pt(t,e)}}function Nv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(It(t,e))return;s.uniform3fv(this.addr,e),Pt(t,e)}}function Fv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4fv(this.addr,e),Pt(t,e)}}function Ov(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,n))return;tg.set(n),s.uniformMatrix2fv(this.addr,!1,tg),Pt(t,n)}}function Bv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,n))return;eg.set(n),s.uniformMatrix3fv(this.addr,!1,eg),Pt(t,n)}}function zv(s,e){let t=this.cache,n=e.elements;if(n===void 0){if(It(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(It(t,n))return;Qm.set(n),s.uniformMatrix4fv(this.addr,!1,Qm),Pt(t,n)}}function kv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Vv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2iv(this.addr,e),Pt(t,e)}}function Hv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;s.uniform3iv(this.addr,e),Pt(t,e)}}function Gv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4iv(this.addr,e),Pt(t,e)}}function Wv(s,e){let t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Xv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(It(t,e))return;s.uniform2uiv(this.addr,e),Pt(t,e)}}function qv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(It(t,e))return;s.uniform3uiv(this.addr,e),Pt(t,e)}}function Yv(s,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(It(t,e))return;s.uniform4uiv(this.addr,e),Pt(t,e)}}function Zv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?($m.compareFunction=Dh,r=$m):r=pg,t.setTexture2D(e||r,i)}function Jv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||gg,i)}function $v(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||_g,i)}function Kv(s,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||mg,i)}function jv(s){switch(s){case 5126:return Dv;case 35664:return Uv;case 35665:return Nv;case 35666:return Fv;case 35674:return Ov;case 35675:return Bv;case 35676:return zv;case 5124:case 35670:return kv;case 35667:case 35671:return Vv;case 35668:case 35672:return Hv;case 35669:case 35673:return Gv;case 5125:return Wv;case 36294:return Xv;case 36295:return qv;case 36296:return Yv;case 35678:case 36198:case 36298:case 36306:case 35682:return Zv;case 35679:case 36299:case 36307:return Jv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Kv}}function Qv(s,e){s.uniform1fv(this.addr,e)}function eM(s,e){let t=Zr(e,this.size,2);s.uniform2fv(this.addr,t)}function tM(s,e){let t=Zr(e,this.size,3);s.uniform3fv(this.addr,t)}function nM(s,e){let t=Zr(e,this.size,4);s.uniform4fv(this.addr,t)}function iM(s,e){let t=Zr(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function sM(s,e){let t=Zr(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function rM(s,e){let t=Zr(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function oM(s,e){s.uniform1iv(this.addr,e)}function aM(s,e){s.uniform2iv(this.addr,e)}function cM(s,e){s.uniform3iv(this.addr,e)}function lM(s,e){s.uniform4iv(this.addr,e)}function hM(s,e){s.uniform1uiv(this.addr,e)}function uM(s,e){s.uniform2uiv(this.addr,e)}function fM(s,e){s.uniform3uiv(this.addr,e)}function dM(s,e){s.uniform4uiv(this.addr,e)}function pM(s,e,t){let n=this.cache,i=e.length,r=zh(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Pt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||pg,r[o])}function mM(s,e,t){let n=this.cache,i=e.length,r=zh(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Pt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||gg,r[o])}function gM(s,e,t){let n=this.cache,i=e.length,r=zh(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Pt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||_g,r[o])}function _M(s,e,t){let n=this.cache,i=e.length,r=zh(t,i);It(n,r)||(s.uniform1iv(this.addr,r),Pt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||mg,r[o])}function xM(s){switch(s){case 5126:return Qv;case 35664:return eM;case 35665:return tM;case 35666:return nM;case 35674:return iM;case 35675:return sM;case 35676:return rM;case 5124:case 35670:return oM;case 35667:case 35671:return aM;case 35668:case 35672:return cM;case 35669:case 35673:return lM;case 5125:return hM;case 36294:return uM;case 36295:return fM;case 36296:return dM;case 35678:case 36198:case 36298:case 36306:case 35682:return pM;case 35679:case 36299:case 36307:return mM;case 35680:case 36300:case 36308:case 36293:return gM;case 36289:case 36303:case 36311:case 36292:return _M}}function ng(s,e){s.seq.push(e),s.map[e.id]=e}function yM(s,e,t){let n=s.name,i=n.length;for(nd.lastIndex=0;;){let r=nd.exec(n),o=nd.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){ng(t,l===void 0?new id(a,s,e):new sd(a,s,e));break}else{let u=t.map[a];u===void 0&&(u=new rd(a),ng(t,u)),t=u}}}function ig(s,e,t){let n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}function SM(s,e){let t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){let a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}function bM(s){tt._getMatrix(sg,tt.workingColorSpace,s);let e=`mat3( ${sg.elements.map(t=>t.toFixed(4))} )`;switch(tt.getTransfer(s)){case hr:return[e,"LinearTransferOETF"];case lt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function rg(s,e,t){let n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";let o=/ERROR: 0:(\d+)/.exec(r);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+SM(s.getShaderSource(e),a)}else return r}function TM(s,e){let t=bM(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function EM(s,e){let t;switch(e){case yf:t="Linear";break;case vf:t="Reinhard";break;case Mf:t="Cineon";break;case Sf:t="ACESFilmic";break;case Tf:t="AgX";break;case Ef:t="Neutral";break;case bf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function wM(){tt.getLuminanceCoefficients(Bh);let s=Bh.x.toFixed(4),e=Bh.y.toFixed(4),t=Bh.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function AM(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mc).join(`
`)}function RM(s){let e=[];for(let t in s){let n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function CM(s,e){let t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){let r=s.getActiveAttrib(e,i),o=r.name,a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function mc(s){return s!==""}function og(s,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ag(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function od(s){return s.replace(IM,LM)}function LM(s,e){let t=Ze[e];if(t===void 0){let n=PM.get(e);if(n!==void 0)t=Ze[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return od(t)}function cg(s){return s.replace(DM,UM)}function UM(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function lg(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function NM(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Mh?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ku?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Bn&&(e="SHADOWMAP_TYPE_VSM"),e}function FM(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Jn:case pi:e="ENVMAP_TYPE_CUBE";break;case Is:e="ENVMAP_TYPE_CUBE_UV";break}return e}function OM(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case pi:e="ENVMAP_MODE_REFRACTION";break}return e}function BM(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Fr:e="ENVMAP_BLENDING_MULTIPLY";break;case _f:e="ENVMAP_BLENDING_MIX";break;case xf:e="ENVMAP_BLENDING_ADD";break}return e}function zM(s){let e=s.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function kM(s,e,t,n){let i=s.getContext(),r=t.defines,o=t.vertexShader,a=t.fragmentShader,c=NM(t),l=FM(t),h=OM(t),u=BM(t),d=zM(t),f=AM(t),m=RM(r),_=i.createProgram(),g,p,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(mc).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(mc).join(`
`),p.length>0&&(p+=`
`)):(g=[lg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mc).join(`
`),p=[lg(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Zn?"#define TONE_MAPPING":"",t.toneMapping!==Zn?Ze.tonemapping_pars_fragment:"",t.toneMapping!==Zn?EM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ze.colorspace_pars_fragment,TM("linearToOutputTexel",t.outputColorSpace),wM(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(mc).join(`
`)),o=od(o),o=og(o,t),o=ag(o,t),a=od(a),a=og(a,t),a=ag(a,t),o=cg(o),a=cg(a),t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Uh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Uh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let v=y+g+o,x=y+p+a,T=ig(i,i.VERTEX_SHADER,v),E=ig(i,i.FRAGMENT_SHADER,x);i.attachShader(_,T),i.attachShader(_,E),t.index0AttributeName!==void 0?i.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function w(P){if(s.debug.checkShaderErrors){let U=i.getProgramInfoLog(_)||"",B=i.getShaderInfoLog(T)||"",k=i.getShaderInfoLog(E)||"",z=U.trim(),W=B.trim(),Q=k.trim(),G=!0,he=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(G=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,T,E);else{let me=rg(i,T,"vertex"),Me=rg(i,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+z+`
`+me+`
`+Me)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(W===""||Q==="")&&(he=!1);he&&(P.diagnostics={runnable:G,programLog:z,vertexShader:{log:W,prefix:g},fragmentShader:{log:Q,prefix:p}})}i.deleteShader(T),i.deleteShader(E),C=new Yr(i,_),M=CM(i,_)}let C;this.getUniforms=function(){return C===void 0&&w(this),C};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,vM)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=MM++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=E,this}function HM(s,e,t,n,i,r,o){let a=new _s,c=new ad,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,f=i.precision,m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return l.add(M),M===0?"uv":`uv${M}`}function g(M,S,P,U,B){let k=U.fog,z=B.geometry,W=M.isMeshStandardMaterial?U.environment:null,Q=(M.isMeshStandardMaterial?t:e).get(M.envMap||W),G=Q&&Q.mapping===Is?Q.image.height:null,he=m[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));let me=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,Me=me!==void 0?me.length:0,Ve=0;z.morphAttributes.position!==void 0&&(Ve=1),z.morphAttributes.normal!==void 0&&(Ve=2),z.morphAttributes.color!==void 0&&(Ve=3);let $e,rt,je,Y;if(he){let ct=kn[he];$e=ct.vertexShader,rt=ct.fragmentShader}else $e=M.vertexShader,rt=M.fragmentShader,c.update(M),je=c.getVertexShaderID(M),Y=c.getFragmentShaderID(M);let te=s.getRenderTarget(),Se=s.state.buffers.depth.getReversed(),Ie=B.isInstancedMesh===!0,ve=B.isBatchedMesh===!0,qe=!!M.map,nt=!!M.matcap,L=!!Q,ee=!!M.aoMap,$=!!M.lightMap,Z=!!M.bumpMap,J=!!M.normalMap,le=!!M.displacementMap,ie=!!M.emissiveMap,ue=!!M.metalnessMap,Ge=!!M.roughnessMap,He=M.anisotropy>0,I=M.clearcoat>0,b=M.dispersion>0,O=M.iridescence>0,X=M.sheen>0,ne=M.transmission>0,q=He&&!!M.anisotropyMap,Ce=I&&!!M.clearcoatMap,ce=I&&!!M.clearcoatNormalMap,we=I&&!!M.clearcoatRoughnessMap,Ae=O&&!!M.iridescenceMap,se=O&&!!M.iridescenceThicknessMap,xe=X&&!!M.sheenColorMap,Oe=X&&!!M.sheenRoughnessMap,Pe=!!M.specularMap,ge=!!M.specularColorMap,Ye=!!M.specularIntensityMap,D=ne&&!!M.transmissionMap,ae=ne&&!!M.thicknessMap,fe=!!M.gradientMap,Te=!!M.alphaMap,re=M.alphaTest>0,j=!!M.alphaHash,Re=!!M.extensions,We=Zn;M.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(We=s.toneMapping);let ft={shaderID:he,shaderType:M.type,shaderName:M.name,vertexShader:$e,fragmentShader:rt,defines:M.defines,customVertexShaderID:je,customFragmentShaderID:Y,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:ve,batchingColor:ve&&B._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&B.instanceColor!==null,instancingMorph:Ie&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:te===null?s.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Di,alphaToCoverage:!!M.alphaToCoverage,map:qe,matcap:nt,envMap:L,envMapMode:L&&Q.mapping,envMapCubeUVHeight:G,aoMap:ee,lightMap:$,bumpMap:Z,normalMap:J,displacementMap:d&&le,emissiveMap:ie,normalMapObjectSpace:J&&M.normalMapType===Lf,normalMapTangentSpace:J&&M.normalMapType===gi,metalnessMap:ue,roughnessMap:Ge,anisotropy:He,anisotropyMap:q,clearcoat:I,clearcoatMap:Ce,clearcoatNormalMap:ce,clearcoatRoughnessMap:we,dispersion:b,iridescence:O,iridescenceMap:Ae,iridescenceThicknessMap:se,sheen:X,sheenColorMap:xe,sheenRoughnessMap:Oe,specularMap:Pe,specularColorMap:ge,specularIntensityMap:Ye,transmission:ne,transmissionMap:D,thicknessMap:ae,gradientMap:fe,opaque:M.transparent===!1&&M.blending===Ri&&M.alphaToCoverage===!1,alphaMap:Te,alphaTest:re,alphaHash:j,combine:M.combine,mapUv:qe&&_(M.map.channel),aoMapUv:ee&&_(M.aoMap.channel),lightMapUv:$&&_(M.lightMap.channel),bumpMapUv:Z&&_(M.bumpMap.channel),normalMapUv:J&&_(M.normalMap.channel),displacementMapUv:le&&_(M.displacementMap.channel),emissiveMapUv:ie&&_(M.emissiveMap.channel),metalnessMapUv:ue&&_(M.metalnessMap.channel),roughnessMapUv:Ge&&_(M.roughnessMap.channel),anisotropyMapUv:q&&_(M.anisotropyMap.channel),clearcoatMapUv:Ce&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:ce&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:se&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&_(M.sheenRoughnessMap.channel),specularMapUv:Pe&&_(M.specularMap.channel),specularColorMapUv:ge&&_(M.specularColorMap.channel),specularIntensityMapUv:Ye&&_(M.specularIntensityMap.channel),transmissionMapUv:D&&_(M.transmissionMap.channel),thicknessMapUv:ae&&_(M.thicknessMap.channel),alphaMapUv:Te&&_(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(J||He),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!z.attributes.uv&&(qe||Te),fog:!!k,useFog:M.fog===!0,fogExp2:!!k&&k.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Se,skinning:B.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ve,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:We,decodeVideoTexture:qe&&M.map.isVideoTexture===!0&&tt.getTransfer(M.map.colorSpace)===lt,decodeVideoTextureEmissive:ie&&M.emissiveMap.isVideoTexture===!0&&tt.getTransfer(M.emissiveMap.colorSpace)===lt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Jt,flipSided:M.side===Vt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Re&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&M.extensions.multiDraw===!0||ve)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return ft.vertexUv1s=l.has(1),ft.vertexUv2s=l.has(2),ft.vertexUv3s=l.has(3),l.clear(),ft}function p(M){let S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(let P in M.defines)S.push(P),S.push(M.defines[P]);return M.isRawShaderMaterial===!1&&(y(S,M),v(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function y(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function v(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function x(M){let S=m[M.type],P;if(S){let U=kn[S];P=Wf.clone(U.uniforms)}else P=M.uniforms;return P}function T(M,S){let P;for(let U=0,B=h.length;U<B;U++){let k=h[U];if(k.cacheKey===S){P=k,++P.usedTimes;break}}return P===void 0&&(P=new kM(s,S,M,r),h.push(P)),P}function E(M){if(--M.usedTimes===0){let S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function w(M){c.remove(M)}function C(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:x,acquireProgram:T,releaseProgram:E,releaseShaderCache:w,programs:h,dispose:C}}function GM(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,c){s.get(o)[a]=c}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function WM(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function hg(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function ug(){let s=[],e=0,t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(u,d,f,m,_,g){let p=s[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},s[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),e++,p}function a(u,d,f,m,_,g){let p=o(u,d,f,m,_,g);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):t.push(p)}function c(u,d,f,m,_,g){let p=o(u,d,f,m,_,g);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||WM),n.length>1&&n.sort(d||hg),i.length>1&&i.sort(d||hg)}function h(){for(let u=e,d=s.length;u<d;u++){let f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function XM(){let s=new WeakMap;function e(n,i){let r=s.get(n),o;return r===void 0?(o=new ug,s.set(n,[o])):i>=r.length?(o=new ug,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function qM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new de};break;case"SpotLight":t={position:new R,direction:new R,color:new de,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new de,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new de,groundColor:new de};break;case"RectAreaLight":t={color:new de,position:new R,halfWidth:new R,halfHeight:new R};break}return s[e.id]=t,t}}}function YM(){let s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}function JM(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function $M(s){let e=new qM,t=YM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new R);let i=new R,r=new Ue,o=new Ue;function a(l){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,y=0,v=0,x=0,T=0,E=0,w=0;l.sort(JM);for(let M=0,S=l.length;M<S;M++){let P=l[M],U=P.color,B=P.intensity,k=P.distance,z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=U.r*B,u+=U.g*B,d+=U.b*B;else if(P.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(P.sh.coefficients[W],B);w++}else if(P.isDirectionalLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let Q=P.shadow,G=t.get(P);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=z,n.directionalShadowMatrix[f]=P.shadow.matrix,y++}n.directional[f]=W,f++}else if(P.isSpotLight){let W=e.get(P);W.position.setFromMatrixPosition(P.matrixWorld),W.color.copy(U).multiplyScalar(B),W.distance=k,W.coneCos=Math.cos(P.angle),W.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),W.decay=P.decay,n.spot[_]=W;let Q=P.shadow;if(P.map&&(n.spotLightMap[T]=P.map,T++,Q.updateMatrices(P),P.castShadow&&E++),n.spotLightMatrix[_]=Q.matrix,P.castShadow){let G=t.get(P);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=z,x++}_++}else if(P.isRectAreaLight){let W=e.get(P);W.color.copy(U).multiplyScalar(B),W.halfWidth.set(P.width*.5,0,0),W.halfHeight.set(0,P.height*.5,0),n.rectArea[g]=W,g++}else if(P.isPointLight){let W=e.get(P);if(W.color.copy(P.color).multiplyScalar(P.intensity),W.distance=P.distance,W.decay=P.decay,P.castShadow){let Q=P.shadow,G=t.get(P);G.shadowIntensity=Q.intensity,G.shadowBias=Q.bias,G.shadowNormalBias=Q.normalBias,G.shadowRadius=Q.radius,G.shadowMapSize=Q.mapSize,G.shadowCameraNear=Q.camera.near,G.shadowCameraFar=Q.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=z,n.pointShadowMatrix[m]=P.shadow.matrix,v++}n.point[m]=W,m++}else if(P.isHemisphereLight){let W=e.get(P);W.skyColor.copy(P.color).multiplyScalar(B),W.groundColor.copy(P.groundColor).multiplyScalar(B),n.hemi[p]=W,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==f||C.pointLength!==m||C.spotLength!==_||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==y||C.numPointShadows!==v||C.numSpotShadows!==x||C.numSpotMaps!==T||C.numLightProbes!==w)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=w,C.directionalLength=f,C.pointLength=m,C.spotLength=_,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=y,C.numPointShadows=v,C.numSpotShadows=x,C.numSpotMaps=T,C.numLightProbes=w,n.version=ZM++)}function c(l,h){let u=0,d=0,f=0,m=0,_=0,g=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){let v=l[p];if(v.isDirectionalLight){let x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),u++}else if(v.isSpotLight){let x=n.spot[f];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),x.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(i),x.direction.transformDirection(g),f++}else if(v.isRectAreaLight){let x=n.rectArea[m];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),o.identity(),r.copy(v.matrixWorld),r.premultiply(g),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),m++}else if(v.isPointLight){let x=n.point[d];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(g),d++}else if(v.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function fg(s){let e=new $M(s),t=[],n=[];function i(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}let l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function KM(s){let e=new WeakMap;function t(i,r=0){let o=e.get(i),a;return o===void 0?(a=new fg(s),e.set(i,[a])):r>=o.length?(a=new fg(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function eS(s,e,t){let n=new hi,i=new K,r=new K,o=new it,a=new Cr({depthPacking:Pf}),c=new Ir,l={},h=t.maxTextureSize,u={[Wn]:Vt,[Vt]:Wn,[Jt]:Jt},d=new tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:jM,fragmentShader:QM}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new ke;m.setAttribute("position",new Je(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new pt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mh;let p=this.type;this.render=function(E,w,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||E.length===0)return;let M=s.getRenderTarget(),S=s.getActiveCubeFace(),P=s.getActiveMipmapLevel(),U=s.state;U.setBlending(Yn),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let B=p!==Bn&&this.type===Bn,k=p===Bn&&this.type!==Bn;for(let z=0,W=E.length;z<W;z++){let Q=E[z],G=Q.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);let he=G.getFrameExtents();if(i.multiply(he),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/he.x),i.x=r.x*he.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/he.y),i.y=r.y*he.y,G.mapSize.y=r.y)),G.map===null||B===!0||k===!0){let Me=this.type!==Bn?{minFilter:wt,magFilter:wt}:{};G.map!==null&&G.map.dispose(),G.map=new dn(i.x,i.y,Me),G.map.texture.name=Q.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();let me=G.getViewportCount();for(let Me=0;Me<me;Me++){let Ve=G.getViewport(Me);o.set(r.x*Ve.x,r.y*Ve.y,r.x*Ve.z,r.y*Ve.w),U.viewport(o),G.updateMatrices(Q,Me),n=G.getFrustum(),x(w,C,G.camera,Q,this.type)}G.isPointLightShadow!==!0&&this.type===Bn&&y(G,C),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(M,S,P)};function y(E,w){let C=e.update(_);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,f.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new dn(i.x,i.y)),d.uniforms.shadow_pass.value=E.map.texture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,s.setRenderTarget(E.mapPass),s.clear(),s.renderBufferDirect(w,null,C,d,_,null),f.uniforms.shadow_pass.value=E.mapPass.texture,f.uniforms.resolution.value=E.mapSize,f.uniforms.radius.value=E.radius,s.setRenderTarget(E.map),s.clear(),s.renderBufferDirect(w,null,C,f,_,null)}function v(E,w,C,M){let S=null,P=C.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(P!==void 0)S=P;else if(S=C.isPointLight===!0?c:a,s.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let U=S.uuid,B=w.uuid,k=l[U];k===void 0&&(k={},l[U]=k);let z=k[B];z===void 0&&(z=S.clone(),k[B]=z,w.addEventListener("dispose",T)),S=z}if(S.visible=w.visible,S.wireframe=w.wireframe,M===Bn?S.side=w.shadowSide!==null?w.shadowSide:w.side:S.side=w.shadowSide!==null?w.shadowSide:u[w.side],S.alphaMap=w.alphaMap,S.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,S.map=w.map,S.clipShadows=w.clipShadows,S.clippingPlanes=w.clippingPlanes,S.clipIntersection=w.clipIntersection,S.displacementMap=w.displacementMap,S.displacementScale=w.displacementScale,S.displacementBias=w.displacementBias,S.wireframeLinewidth=w.wireframeLinewidth,S.linewidth=w.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let U=s.properties.get(S);U.light=C}return S}function x(E,w,C,M,S){if(E.visible===!1)return;if(E.layers.test(w.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&S===Bn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,E.matrixWorld);let B=e.update(E),k=E.material;if(Array.isArray(k)){let z=B.groups;for(let W=0,Q=z.length;W<Q;W++){let G=z[W],he=k[G.materialIndex];if(he&&he.visible){let me=v(E,he,M,S);E.onBeforeShadow(s,E,w,C,B,me,G),s.renderBufferDirect(C,null,B,me,E,G),E.onAfterShadow(s,E,w,C,B,me,G)}}}else if(k.visible){let z=v(E,k,M,S);E.onBeforeShadow(s,E,w,C,B,z,null),s.renderBufferDirect(C,null,B,z,E,null),E.onAfterShadow(s,E,w,C,B,z,null)}}let U=E.children;for(let B=0,k=U.length;B<k;B++)x(U[B],w,C,M,S)}function T(E){E.target.removeEventListener("dispose",T);for(let C in l){let M=l[C],S=E.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}function nS(s,e){function t(){let D=!1,ae=new it,fe=null,Te=new it(0,0,0,0);return{setMask:function(re){fe!==re&&!D&&(s.colorMask(re,re,re,re),fe=re)},setLocked:function(re){D=re},setClear:function(re,j,Re,We,ft){ft===!0&&(re*=We,j*=We,Re*=We),ae.set(re,j,Re,We),Te.equals(ae)===!1&&(s.clearColor(re,j,Re,We),Te.copy(ae))},reset:function(){D=!1,fe=null,Te.set(-1,0,0,0)}}}function n(){let D=!1,ae=!1,fe=null,Te=null,re=null;return{setReversed:function(j){if(ae!==j){let Re=e.get("EXT_clip_control");j?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ae=j;let We=re;re=null,this.setClear(We)}},getReversed:function(){return ae},setTest:function(j){j?te(s.DEPTH_TEST):Se(s.DEPTH_TEST)},setMask:function(j){fe!==j&&!D&&(s.depthMask(j),fe=j)},setFunc:function(j){if(ae&&(j=tS[j]),Te!==j){switch(j){case wa:s.depthFunc(s.NEVER);break;case Aa:s.depthFunc(s.ALWAYS);break;case Ra:s.depthFunc(s.LESS);break;case Ci:s.depthFunc(s.LEQUAL);break;case Ca:s.depthFunc(s.EQUAL);break;case Ia:s.depthFunc(s.GEQUAL);break;case Pa:s.depthFunc(s.GREATER);break;case La:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Te=j}},setLocked:function(j){D=j},setClear:function(j){re!==j&&(ae&&(j=1-j),s.clearDepth(j),re=j)},reset:function(){D=!1,fe=null,Te=null,re=null,ae=!1}}}function i(){let D=!1,ae=null,fe=null,Te=null,re=null,j=null,Re=null,We=null,ft=null;return{setTest:function(ct){D||(ct?te(s.STENCIL_TEST):Se(s.STENCIL_TEST))},setMask:function(ct){ae!==ct&&!D&&(s.stencilMask(ct),ae=ct)},setFunc:function(ct,jn,Vn){(fe!==ct||Te!==jn||re!==Vn)&&(s.stencilFunc(ct,jn,Vn),fe=ct,Te=jn,re=Vn)},setOp:function(ct,jn,Vn){(j!==ct||Re!==jn||We!==Vn)&&(s.stencilOp(ct,jn,Vn),j=ct,Re=jn,We=Vn)},setLocked:function(ct){D=ct},setClear:function(ct){ft!==ct&&(s.clearStencil(ct),ft=ct)},reset:function(){D=!1,ae=null,fe=null,Te=null,re=null,j=null,Re=null,We=null,ft=null}}}let r=new t,o=new n,a=new i,c=new WeakMap,l=new WeakMap,h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,T=null,E=null,w=new de(0,0,0),C=0,M=!1,S=null,P=null,U=null,B=null,k=null,z=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,Q=0,G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=Q>=1):G.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=Q>=2);let he=null,me={},Me=s.getParameter(s.SCISSOR_BOX),Ve=s.getParameter(s.VIEWPORT),$e=new it().fromArray(Me),rt=new it().fromArray(Ve);function je(D,ae,fe,Te){let re=new Uint8Array(4),j=s.createTexture();s.bindTexture(D,j),s.texParameteri(D,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(D,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Re=0;Re<fe;Re++)D===s.TEXTURE_3D||D===s.TEXTURE_2D_ARRAY?s.texImage3D(ae,0,s.RGBA,1,1,Te,0,s.RGBA,s.UNSIGNED_BYTE,re):s.texImage2D(ae+Re,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,re);return j}let Y={};Y[s.TEXTURE_2D]=je(s.TEXTURE_2D,s.TEXTURE_2D,1),Y[s.TEXTURE_CUBE_MAP]=je(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Y[s.TEXTURE_2D_ARRAY]=je(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Y[s.TEXTURE_3D]=je(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(s.DEPTH_TEST),o.setFunc(Ci),Z(!1),J(vh),te(s.CULL_FACE),ee(Yn);function te(D){h[D]!==!0&&(s.enable(D),h[D]=!0)}function Se(D){h[D]!==!1&&(s.disable(D),h[D]=!1)}function Ie(D,ae){return u[D]!==ae?(s.bindFramebuffer(D,ae),u[D]=ae,D===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=ae),D===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=ae),!0):!1}function ve(D,ae){let fe=f,Te=!1;if(D){fe=d.get(ae),fe===void 0&&(fe=[],d.set(ae,fe));let re=D.textures;if(fe.length!==re.length||fe[0]!==s.COLOR_ATTACHMENT0){for(let j=0,Re=re.length;j<Re;j++)fe[j]=s.COLOR_ATTACHMENT0+j;fe.length=re.length,Te=!0}}else fe[0]!==s.BACK&&(fe[0]=s.BACK,Te=!0);Te&&s.drawBuffers(fe)}function qe(D){return m!==D?(s.useProgram(D),m=D,!0):!1}let nt={[ai]:s.FUNC_ADD,[Qu]:s.FUNC_SUBTRACT,[ef]:s.FUNC_REVERSE_SUBTRACT};nt[tf]=s.MIN,nt[nf]=s.MAX;let L={[sf]:s.ZERO,[rf]:s.ONE,[of]:s.SRC_COLOR,[xo]:s.SRC_ALPHA,[ff]:s.SRC_ALPHA_SATURATE,[hf]:s.DST_COLOR,[cf]:s.DST_ALPHA,[af]:s.ONE_MINUS_SRC_COLOR,[yo]:s.ONE_MINUS_SRC_ALPHA,[uf]:s.ONE_MINUS_DST_COLOR,[lf]:s.ONE_MINUS_DST_ALPHA,[df]:s.CONSTANT_COLOR,[pf]:s.ONE_MINUS_CONSTANT_COLOR,[mf]:s.CONSTANT_ALPHA,[gf]:s.ONE_MINUS_CONSTANT_ALPHA};function ee(D,ae,fe,Te,re,j,Re,We,ft,ct){if(D===Yn){_===!0&&(Se(s.BLEND),_=!1);return}if(_===!1&&(te(s.BLEND),_=!0),D!==ju){if(D!==g||ct!==M){if((p!==ai||x!==ai)&&(s.blendEquation(s.FUNC_ADD),p=ai,x=ai),ct)switch(D){case Ri:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Sh:s.blendFunc(s.ONE,s.ONE);break;case bh:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Th:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Ri:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Sh:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case bh:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Th:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}y=null,v=null,T=null,E=null,w.set(0,0,0),C=0,g=D,M=ct}return}re=re||ae,j=j||fe,Re=Re||Te,(ae!==p||re!==x)&&(s.blendEquationSeparate(nt[ae],nt[re]),p=ae,x=re),(fe!==y||Te!==v||j!==T||Re!==E)&&(s.blendFuncSeparate(L[fe],L[Te],L[j],L[Re]),y=fe,v=Te,T=j,E=Re),(We.equals(w)===!1||ft!==C)&&(s.blendColor(We.r,We.g,We.b,ft),w.copy(We),C=ft),g=D,M=!1}function $(D,ae){D.side===Jt?Se(s.CULL_FACE):te(s.CULL_FACE);let fe=D.side===Vt;ae&&(fe=!fe),Z(fe),D.blending===Ri&&D.transparent===!1?ee(Yn):ee(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),o.setFunc(D.depthFunc),o.setTest(D.depthTest),o.setMask(D.depthWrite),r.setMask(D.colorWrite);let Te=D.stencilWrite;a.setTest(Te),Te&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ie(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?te(s.SAMPLE_ALPHA_TO_COVERAGE):Se(s.SAMPLE_ALPHA_TO_COVERAGE)}function Z(D){S!==D&&(D?s.frontFace(s.CW):s.frontFace(s.CCW),S=D)}function J(D){D!==Ju?(te(s.CULL_FACE),D!==P&&(D===vh?s.cullFace(s.BACK):D===$u?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Se(s.CULL_FACE),P=D}function le(D){D!==U&&(W&&s.lineWidth(D),U=D)}function ie(D,ae,fe){D?(te(s.POLYGON_OFFSET_FILL),(B!==ae||k!==fe)&&(s.polygonOffset(ae,fe),B=ae,k=fe)):Se(s.POLYGON_OFFSET_FILL)}function ue(D){D?te(s.SCISSOR_TEST):Se(s.SCISSOR_TEST)}function Ge(D){D===void 0&&(D=s.TEXTURE0+z-1),he!==D&&(s.activeTexture(D),he=D)}function He(D,ae,fe){fe===void 0&&(he===null?fe=s.TEXTURE0+z-1:fe=he);let Te=me[fe];Te===void 0&&(Te={type:void 0,texture:void 0},me[fe]=Te),(Te.type!==D||Te.texture!==ae)&&(he!==fe&&(s.activeTexture(fe),he=fe),s.bindTexture(D,ae||Y[D]),Te.type=D,Te.texture=ae)}function I(){let D=me[he];D!==void 0&&D.type!==void 0&&(s.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function b(){try{s.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function O(){try{s.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function X(){try{s.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{s.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function q(){try{s.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ce(){try{s.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ce(){try{s.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function we(){try{s.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ae(){try{s.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function se(){try{s.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function xe(D){$e.equals(D)===!1&&(s.scissor(D.x,D.y,D.z,D.w),$e.copy(D))}function Oe(D){rt.equals(D)===!1&&(s.viewport(D.x,D.y,D.z,D.w),rt.copy(D))}function Pe(D,ae){let fe=l.get(ae);fe===void 0&&(fe=new WeakMap,l.set(ae,fe));let Te=fe.get(D);Te===void 0&&(Te=s.getUniformBlockIndex(ae,D.name),fe.set(D,Te))}function ge(D,ae){let Te=l.get(ae).get(D);c.get(ae)!==Te&&(s.uniformBlockBinding(ae,Te,D.__bindingPointIndex),c.set(ae,Te))}function Ye(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},he=null,me={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,y=null,v=null,x=null,T=null,E=null,w=new de(0,0,0),C=0,M=!1,S=null,P=null,U=null,B=null,k=null,$e.set(0,0,s.canvas.width,s.canvas.height),rt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:te,disable:Se,bindFramebuffer:Ie,drawBuffers:ve,useProgram:qe,setBlending:ee,setMaterial:$,setFlipSided:Z,setCullFace:J,setLineWidth:le,setPolygonOffset:ie,setScissorTest:ue,activeTexture:Ge,bindTexture:He,unbindTexture:I,compressedTexImage2D:b,compressedTexImage3D:O,texImage2D:Ae,texImage3D:se,updateUBOMapping:Pe,uniformBlockBinding:ge,texStorage2D:ce,texStorage3D:we,texSubImage2D:X,texSubImage3D:ne,compressedTexSubImage2D:q,compressedTexSubImage3D:Ce,scissor:xe,viewport:Oe,reset:Ye}}function iS(s,e,t,n,i,r,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new K,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,b){return f?new OffscreenCanvas(I,b):fr("canvas")}function _(I,b,O){let X=1,ne=He(I);if((ne.width>O||ne.height>O)&&(X=O/Math.max(ne.width,ne.height)),X<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let q=Math.floor(X*ne.width),Ce=Math.floor(X*ne.height);u===void 0&&(u=m(q,Ce));let ce=b?m(q,Ce):u;return ce.width=q,ce.height=Ce,ce.getContext("2d").drawImage(I,0,0,q,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+q+"x"+Ce+")."),ce}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){s.generateMipmap(I)}function y(I){return I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?s.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function v(I,b,O,X,ne=!1){if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let q=b;if(b===s.RED&&(O===s.FLOAT&&(q=s.R32F),O===s.HALF_FLOAT&&(q=s.R16F),O===s.UNSIGNED_BYTE&&(q=s.R8)),b===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.R8UI),O===s.UNSIGNED_SHORT&&(q=s.R16UI),O===s.UNSIGNED_INT&&(q=s.R32UI),O===s.BYTE&&(q=s.R8I),O===s.SHORT&&(q=s.R16I),O===s.INT&&(q=s.R32I)),b===s.RG&&(O===s.FLOAT&&(q=s.RG32F),O===s.HALF_FLOAT&&(q=s.RG16F),O===s.UNSIGNED_BYTE&&(q=s.RG8)),b===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.RG8UI),O===s.UNSIGNED_SHORT&&(q=s.RG16UI),O===s.UNSIGNED_INT&&(q=s.RG32UI),O===s.BYTE&&(q=s.RG8I),O===s.SHORT&&(q=s.RG16I),O===s.INT&&(q=s.RG32I)),b===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.RGB8UI),O===s.UNSIGNED_SHORT&&(q=s.RGB16UI),O===s.UNSIGNED_INT&&(q=s.RGB32UI),O===s.BYTE&&(q=s.RGB8I),O===s.SHORT&&(q=s.RGB16I),O===s.INT&&(q=s.RGB32I)),b===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(q=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(q=s.RGBA16UI),O===s.UNSIGNED_INT&&(q=s.RGBA32UI),O===s.BYTE&&(q=s.RGBA8I),O===s.SHORT&&(q=s.RGBA16I),O===s.INT&&(q=s.RGBA32I)),b===s.RGB&&(O===s.UNSIGNED_INT_5_9_9_9_REV&&(q=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(q=s.R11F_G11F_B10F)),b===s.RGBA){let Ce=ne?hr:tt.getTransfer(X);O===s.FLOAT&&(q=s.RGBA32F),O===s.HALF_FLOAT&&(q=s.RGBA16F),O===s.UNSIGNED_BYTE&&(q=Ce===lt?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT_4_4_4_4&&(q=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(q=s.RGB5_A1)}return(q===s.R16F||q===s.R32F||q===s.RG16F||q===s.RG32F||q===s.RGBA16F||q===s.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(I,b){let O;return I?b===null||b===$n||b===Ds?O=s.DEPTH24_STENCIL8:b===Yt?O=s.DEPTH32F_STENCIL8:b===Ps&&(O=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===$n||b===Ds?O=s.DEPTH_COMPONENT24:b===Yt?O=s.DEPTH_COMPONENT32F:b===Ps&&(O=s.DEPTH_COMPONENT16),O}function T(I,b){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==wt&&I.minFilter!==vt?Math.log2(Math.max(b.width,b.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?b.mipmaps.length:1}function E(I){let b=I.target;b.removeEventListener("dispose",E),C(b),b.isVideoTexture&&h.delete(b)}function w(I){let b=I.target;b.removeEventListener("dispose",w),S(b)}function C(I){let b=n.get(I);if(b.__webglInit===void 0)return;let O=I.source,X=d.get(O);if(X){let ne=X[b.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&M(I),Object.keys(X).length===0&&d.delete(O)}n.remove(I)}function M(I){let b=n.get(I);s.deleteTexture(b.__webglTexture);let O=I.source,X=d.get(O);delete X[b.__cacheKey],o.memory.textures--}function S(I){let b=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(b.__webglFramebuffer[X]))for(let ne=0;ne<b.__webglFramebuffer[X].length;ne++)s.deleteFramebuffer(b.__webglFramebuffer[X][ne]);else s.deleteFramebuffer(b.__webglFramebuffer[X]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[X])}else{if(Array.isArray(b.__webglFramebuffer))for(let X=0;X<b.__webglFramebuffer.length;X++)s.deleteFramebuffer(b.__webglFramebuffer[X]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let X=0;X<b.__webglColorRenderbuffer.length;X++)b.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[X]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}let O=I.textures;for(let X=0,ne=O.length;X<ne;X++){let q=n.get(O[X]);q.__webglTexture&&(s.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove(O[X])}n.remove(I)}let P=0;function U(){P=0}function B(){let I=P;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),P+=1,I}function k(I){let b=[];return b.push(I.wrapS),b.push(I.wrapT),b.push(I.wrapR||0),b.push(I.magFilter),b.push(I.minFilter),b.push(I.anisotropy),b.push(I.internalFormat),b.push(I.format),b.push(I.type),b.push(I.generateMipmaps),b.push(I.premultiplyAlpha),b.push(I.flipY),b.push(I.unpackAlignment),b.push(I.colorSpace),b.join()}function z(I,b){let O=n.get(I);if(I.isVideoTexture&&ue(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&O.__version!==I.version){let X=I.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Y(O,I,b);return}}else I.isExternalTexture&&(O.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+b)}function W(I,b){let O=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&O.__version!==I.version){Y(O,I,b);return}t.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+b)}function Q(I,b){let O=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&O.__version!==I.version){Y(O,I,b);return}t.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+b)}function G(I,b){let O=n.get(I);if(I.version>0&&O.__version!==I.version){te(O,I,b);return}t.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+b)}let he={[Ii]:s.REPEAT,[qt]:s.CLAMP_TO_EDGE,[Pi]:s.MIRRORED_REPEAT},me={[wt]:s.NEAREST,[zr]:s.NEAREST_MIPMAP_NEAREST,[mi]:s.NEAREST_MIPMAP_LINEAR,[vt]:s.LINEAR,[Yi]:s.LINEAR_MIPMAP_NEAREST,[mn]:s.LINEAR_MIPMAP_LINEAR},Me={[Df]:s.NEVER,[zf]:s.ALWAYS,[Uf]:s.LESS,[Dh]:s.LEQUAL,[Nf]:s.EQUAL,[Bf]:s.GEQUAL,[Ff]:s.GREATER,[Of]:s.NOTEQUAL};function Ve(I,b){if(b.type===Yt&&e.has("OES_texture_float_linear")===!1&&(b.magFilter===vt||b.magFilter===Yi||b.magFilter===mi||b.magFilter===mn||b.minFilter===vt||b.minFilter===Yi||b.minFilter===mi||b.minFilter===mn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(I,s.TEXTURE_WRAP_S,he[b.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,he[b.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,he[b.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,me[b.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,me[b.minFilter]),b.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,Me[b.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===wt||b.minFilter!==mi&&b.minFilter!==mn||b.type===Yt&&e.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");s.texParameterf(I,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function $e(I,b){let O=!1;I.__webglInit===void 0&&(I.__webglInit=!0,b.addEventListener("dispose",E));let X=b.source,ne=d.get(X);ne===void 0&&(ne={},d.set(X,ne));let q=k(b);if(q!==I.__cacheKey){ne[q]===void 0&&(ne[q]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,O=!0),ne[q].usedTimes++;let Ce=ne[I.__cacheKey];Ce!==void 0&&(ne[I.__cacheKey].usedTimes--,Ce.usedTimes===0&&M(b)),I.__cacheKey=q,I.__webglTexture=ne[q].texture}return O}function rt(I,b,O){return Math.floor(Math.floor(I/O)/b)}function je(I,b,O,X){let q=I.updateRanges;if(q.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,b.width,b.height,O,X,b.data);else{q.sort((se,xe)=>se.start-xe.start);let Ce=0;for(let se=1;se<q.length;se++){let xe=q[Ce],Oe=q[se],Pe=xe.start+xe.count,ge=rt(Oe.start,b.width,4),Ye=rt(xe.start,b.width,4);Oe.start<=Pe+1&&ge===Ye&&rt(Oe.start+Oe.count-1,b.width,4)===ge?xe.count=Math.max(xe.count,Oe.start+Oe.count-xe.start):(++Ce,q[Ce]=Oe)}q.length=Ce+1;let ce=s.getParameter(s.UNPACK_ROW_LENGTH),we=s.getParameter(s.UNPACK_SKIP_PIXELS),Ae=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,b.width);for(let se=0,xe=q.length;se<xe;se++){let Oe=q[se],Pe=Math.floor(Oe.start/4),ge=Math.ceil(Oe.count/4),Ye=Pe%b.width,D=Math.floor(Pe/b.width),ae=ge,fe=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Ye),s.pixelStorei(s.UNPACK_SKIP_ROWS,D),t.texSubImage2D(s.TEXTURE_2D,0,Ye,D,ae,fe,O,X,b.data)}I.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,ce),s.pixelStorei(s.UNPACK_SKIP_PIXELS,we),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ae)}}function Y(I,b,O){let X=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(X=s.TEXTURE_3D);let ne=$e(I,b),q=b.source;t.bindTexture(X,I.__webglTexture,s.TEXTURE0+O);let Ce=n.get(q);if(q.version!==Ce.__version||ne===!0){t.activeTexture(s.TEXTURE0+O);let ce=tt.getPrimaries(tt.workingColorSpace),we=b.colorSpace===En?null:tt.getPrimaries(b.colorSpace),Ae=b.colorSpace===En||ce===we?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let se=_(b.image,!1,i.maxTextureSize);se=Ge(b,se);let xe=r.convert(b.format,b.colorSpace),Oe=r.convert(b.type),Pe=v(b.internalFormat,xe,Oe,b.colorSpace,b.isVideoTexture);Ve(X,b);let ge,Ye=b.mipmaps,D=b.isVideoTexture!==!0,ae=Ce.__version===void 0||ne===!0,fe=q.dataReady,Te=T(b,se);if(b.isDepthTexture)Pe=x(b.format===Us,b.type),ae&&(D?t.texStorage2D(s.TEXTURE_2D,1,Pe,se.width,se.height):t.texImage2D(s.TEXTURE_2D,0,Pe,se.width,se.height,0,xe,Oe,null));else if(b.isDataTexture)if(Ye.length>0){D&&ae&&t.texStorage2D(s.TEXTURE_2D,Te,Pe,Ye[0].width,Ye[0].height);for(let re=0,j=Ye.length;re<j;re++)ge=Ye[re],D?fe&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,Oe,ge.data):t.texImage2D(s.TEXTURE_2D,re,Pe,ge.width,ge.height,0,xe,Oe,ge.data);b.generateMipmaps=!1}else D?(ae&&t.texStorage2D(s.TEXTURE_2D,Te,Pe,se.width,se.height),fe&&je(b,se,xe,Oe)):t.texImage2D(s.TEXTURE_2D,0,Pe,se.width,se.height,0,xe,Oe,se.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){D&&ae&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Te,Pe,Ye[0].width,Ye[0].height,se.depth);for(let re=0,j=Ye.length;re<j;re++)if(ge=Ye[re],b.format!==Ut)if(xe!==null)if(D){if(fe)if(b.layerUpdates.size>0){let Re=Nh(ge.width,ge.height,b.format,b.type);for(let We of b.layerUpdates){let ft=ge.data.subarray(We*Re/ge.data.BYTES_PER_ELEMENT,(We+1)*Re/ge.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,We,ge.width,ge.height,1,xe,ft)}b.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,se.depth,xe,ge.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,se.depth,0,ge.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?fe&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,ge.width,ge.height,se.depth,xe,Oe,ge.data):t.texImage3D(s.TEXTURE_2D_ARRAY,re,Pe,ge.width,ge.height,se.depth,0,xe,Oe,ge.data)}else{D&&ae&&t.texStorage2D(s.TEXTURE_2D,Te,Pe,Ye[0].width,Ye[0].height);for(let re=0,j=Ye.length;re<j;re++)ge=Ye[re],b.format!==Ut?xe!==null?D?fe&&t.compressedTexSubImage2D(s.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,ge.data):t.compressedTexImage2D(s.TEXTURE_2D,re,Pe,ge.width,ge.height,0,ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?fe&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ge.width,ge.height,xe,Oe,ge.data):t.texImage2D(s.TEXTURE_2D,re,Pe,ge.width,ge.height,0,xe,Oe,ge.data)}else if(b.isDataArrayTexture)if(D){if(ae&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Te,Pe,se.width,se.height,se.depth),fe)if(b.layerUpdates.size>0){let re=Nh(se.width,se.height,b.format,b.type);for(let j of b.layerUpdates){let Re=se.data.subarray(j*re/se.data.BYTES_PER_ELEMENT,(j+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,j,se.width,se.height,1,xe,Oe,Re)}b.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,xe,Oe,se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,Pe,se.width,se.height,se.depth,0,xe,Oe,se.data);else if(b.isData3DTexture)D?(ae&&t.texStorage3D(s.TEXTURE_3D,Te,Pe,se.width,se.height,se.depth),fe&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,xe,Oe,se.data)):t.texImage3D(s.TEXTURE_3D,0,Pe,se.width,se.height,se.depth,0,xe,Oe,se.data);else if(b.isFramebufferTexture){if(ae)if(D)t.texStorage2D(s.TEXTURE_2D,Te,Pe,se.width,se.height);else{let re=se.width,j=se.height;for(let Re=0;Re<Te;Re++)t.texImage2D(s.TEXTURE_2D,Re,Pe,re,j,0,xe,Oe,null),re>>=1,j>>=1}}else if(Ye.length>0){if(D&&ae){let re=He(Ye[0]);t.texStorage2D(s.TEXTURE_2D,Te,Pe,re.width,re.height)}for(let re=0,j=Ye.length;re<j;re++)ge=Ye[re],D?fe&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,xe,Oe,ge):t.texImage2D(s.TEXTURE_2D,re,Pe,xe,Oe,ge);b.generateMipmaps=!1}else if(D){if(ae){let re=He(se);t.texStorage2D(s.TEXTURE_2D,Te,Pe,re.width,re.height)}fe&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,xe,Oe,se)}else t.texImage2D(s.TEXTURE_2D,0,Pe,xe,Oe,se);g(b)&&p(X),Ce.__version=q.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function te(I,b,O){if(b.image.length!==6)return;let X=$e(I,b),ne=b.source;t.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+O);let q=n.get(ne);if(ne.version!==q.__version||X===!0){t.activeTexture(s.TEXTURE0+O);let Ce=tt.getPrimaries(tt.workingColorSpace),ce=b.colorSpace===En?null:tt.getPrimaries(b.colorSpace),we=b.colorSpace===En||Ce===ce?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let Ae=b.isCompressedTexture||b.image[0].isCompressedTexture,se=b.image[0]&&b.image[0].isDataTexture,xe=[];for(let j=0;j<6;j++)!Ae&&!se?xe[j]=_(b.image[j],!0,i.maxCubemapSize):xe[j]=se?b.image[j].image:b.image[j],xe[j]=Ge(b,xe[j]);let Oe=xe[0],Pe=r.convert(b.format,b.colorSpace),ge=r.convert(b.type),Ye=v(b.internalFormat,Pe,ge,b.colorSpace),D=b.isVideoTexture!==!0,ae=q.__version===void 0||X===!0,fe=ne.dataReady,Te=T(b,Oe);Ve(s.TEXTURE_CUBE_MAP,b);let re;if(Ae){D&&ae&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Te,Ye,Oe.width,Oe.height);for(let j=0;j<6;j++){re=xe[j].mipmaps;for(let Re=0;Re<re.length;Re++){let We=re[Re];b.format!==Ut?Pe!==null?D?fe&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,We.width,We.height,Pe,We.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Ye,We.width,We.height,0,We.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,We.width,We.height,Pe,ge,We.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Ye,We.width,We.height,0,Pe,ge,We.data)}}}else{if(re=b.mipmaps,D&&ae){re.length>0&&Te++;let j=He(xe[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Te,Ye,j.width,j.height)}for(let j=0;j<6;j++)if(se){D?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,xe[j].width,xe[j].height,Pe,ge,xe[j].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ye,xe[j].width,xe[j].height,0,Pe,ge,xe[j].data);for(let Re=0;Re<re.length;Re++){let ft=re[Re].image[j].image;D?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,ft.width,ft.height,Pe,ge,ft.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Ye,ft.width,ft.height,0,Pe,ge,ft.data)}}else{D?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Pe,ge,xe[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Ye,Pe,ge,xe[j]);for(let Re=0;Re<re.length;Re++){let We=re[Re];D?fe&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Pe,ge,We.image[j]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Ye,Pe,ge,We.image[j])}}}g(b)&&p(s.TEXTURE_CUBE_MAP),q.__version=ne.version,b.onUpdate&&b.onUpdate(b)}I.__version=b.version}function Se(I,b,O,X,ne,q){let Ce=r.convert(O.format,O.colorSpace),ce=r.convert(O.type),we=v(O.internalFormat,Ce,ce,O.colorSpace),Ae=n.get(b),se=n.get(O);if(se.__renderTarget=b,!Ae.__hasExternalTextures){let xe=Math.max(1,b.width>>q),Oe=Math.max(1,b.height>>q);ne===s.TEXTURE_3D||ne===s.TEXTURE_2D_ARRAY?t.texImage3D(ne,q,we,xe,Oe,b.depth,0,Ce,ce,null):t.texImage2D(ne,q,we,xe,Oe,0,Ce,ce,null)}t.bindFramebuffer(s.FRAMEBUFFER,I),ie(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,ne,se.__webglTexture,0,le(b)):(ne===s.TEXTURE_2D||ne>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,ne,se.__webglTexture,q),t.bindFramebuffer(s.FRAMEBUFFER,null)}function Ie(I,b,O){if(s.bindRenderbuffer(s.RENDERBUFFER,I),b.depthBuffer){let X=b.depthTexture,ne=X&&X.isDepthTexture?X.type:null,q=x(b.stencilBuffer,ne),Ce=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ce=le(b);ie(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ce,q,b.width,b.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,ce,q,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,q,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ce,s.RENDERBUFFER,I)}else{let X=b.textures;for(let ne=0;ne<X.length;ne++){let q=X[ne],Ce=r.convert(q.format,q.colorSpace),ce=r.convert(q.type),we=v(q.internalFormat,Ce,ce,q.colorSpace),Ae=le(b);O&&ie(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,we,b.width,b.height):ie(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ae,we,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,we,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ve(I,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,I),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let X=n.get(b.depthTexture);X.__renderTarget=b,(!X.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),z(b.depthTexture,0);let ne=X.__webglTexture,q=le(b);if(b.depthTexture.format===hs)ie(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ne,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ne,0);else if(b.depthTexture.format===Us)ie(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ne,0,q):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ne,0);else throw new Error("Unknown depthTexture format")}function qe(I){let b=n.get(I),O=I.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==I.depthTexture){let X=I.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),X){let ne=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,X.removeEventListener("dispose",ne)};X.addEventListener("dispose",ne),b.__depthDisposeCallback=ne}b.__boundDepthTexture=X}if(I.depthTexture&&!b.__autoAllocateDepthBuffer){if(O)throw new Error("target.depthTexture not supported in Cube render targets");let X=I.texture.mipmaps;X&&X.length>0?ve(b.__webglFramebuffer[0],I):ve(b.__webglFramebuffer,I)}else if(O){b.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[X]),b.__webglDepthbuffer[X]===void 0)b.__webglDepthbuffer[X]=s.createRenderbuffer(),Ie(b.__webglDepthbuffer[X],I,!1);else{let ne=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=b.__webglDepthbuffer[X];s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,ne,s.RENDERBUFFER,q)}}else{let X=I.texture.mipmaps;if(X&&X.length>0?t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),Ie(b.__webglDepthbuffer,I,!1);else{let ne=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,q=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,q),s.framebufferRenderbuffer(s.FRAMEBUFFER,ne,s.RENDERBUFFER,q)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function nt(I,b,O){let X=n.get(I);b!==void 0&&Se(X.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&qe(I)}function L(I){let b=I.texture,O=n.get(I),X=n.get(b);I.addEventListener("dispose",w);let ne=I.textures,q=I.isWebGLCubeRenderTarget===!0,Ce=ne.length>1;if(Ce||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=b.version,o.memory.textures++),q){O.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer[ce]=[];for(let we=0;we<b.mipmaps.length;we++)O.__webglFramebuffer[ce][we]=s.createFramebuffer()}else O.__webglFramebuffer[ce]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){O.__webglFramebuffer=[];for(let ce=0;ce<b.mipmaps.length;ce++)O.__webglFramebuffer[ce]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(Ce)for(let ce=0,we=ne.length;ce<we;ce++){let Ae=n.get(ne[ce]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=s.createTexture(),o.memory.textures++)}if(I.samples>0&&ie(I)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ce=0;ce<ne.length;ce++){let we=ne[ce];O.__webglColorRenderbuffer[ce]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[ce]);let Ae=r.convert(we.format,we.colorSpace),se=r.convert(we.type),xe=v(we.internalFormat,Ae,se,we.colorSpace,I.isXRRenderTarget===!0),Oe=le(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Oe,xe,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ce,s.RENDERBUFFER,O.__webglColorRenderbuffer[ce])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),Ie(O.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(q){t.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),Ve(s.TEXTURE_CUBE_MAP,b);for(let ce=0;ce<6;ce++)if(b.mipmaps&&b.mipmaps.length>0)for(let we=0;we<b.mipmaps.length;we++)Se(O.__webglFramebuffer[ce][we],I,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,we);else Se(O.__webglFramebuffer[ce],I,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(b)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let ce=0,we=ne.length;ce<we;ce++){let Ae=ne[ce],se=n.get(Ae),xe=s.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xe=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(xe,se.__webglTexture),Ve(xe,Ae),Se(O.__webglFramebuffer,I,Ae,s.COLOR_ATTACHMENT0+ce,xe,0),g(Ae)&&p(xe)}t.unbindTexture()}else{let ce=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ce=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ce,X.__webglTexture),Ve(ce,b),b.mipmaps&&b.mipmaps.length>0)for(let we=0;we<b.mipmaps.length;we++)Se(O.__webglFramebuffer[we],I,b,s.COLOR_ATTACHMENT0,ce,we);else Se(O.__webglFramebuffer,I,b,s.COLOR_ATTACHMENT0,ce,0);g(b)&&p(ce),t.unbindTexture()}I.depthBuffer&&qe(I)}function ee(I){let b=I.textures;for(let O=0,X=b.length;O<X;O++){let ne=b[O];if(g(ne)){let q=y(I),Ce=n.get(ne).__webglTexture;t.bindTexture(q,Ce),p(q),t.unbindTexture()}}}let $=[],Z=[];function J(I){if(I.samples>0){if(ie(I)===!1){let b=I.textures,O=I.width,X=I.height,ne=s.COLOR_BUFFER_BIT,q=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ce=n.get(I),ce=b.length>1;if(ce)for(let Ae=0;Ae<b.length;Ae++)t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);let we=I.texture.mipmaps;we&&we.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ae=0;Ae<b.length;Ae++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ne|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ne|=s.STENCIL_BUFFER_BIT)),ce){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);let se=n.get(b[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,se,0)}s.blitFramebuffer(0,0,O,X,0,0,O,X,ne,s.NEAREST),c===!0&&($.length=0,Z.length=0,$.push(s.COLOR_ATTACHMENT0+Ae),I.depthBuffer&&I.resolveDepthBuffer===!1&&($.push(q),Z.push(q),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Z)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,$))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),ce)for(let Ae=0;Ae<b.length;Ae++){t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);let se=n.get(b[Ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,se,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){let b=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function le(I){return Math.min(i.maxSamples,I.samples)}function ie(I){let b=n.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ue(I){let b=o.render.frame;h.get(I)!==b&&(h.set(I,b),I.update())}function Ge(I,b){let O=I.colorSpace,X=I.format,ne=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||O!==Di&&O!==En&&(tt.getTransfer(O)===lt?(X!==Ut||ne!==Tn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",O)),b}function He(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=z,this.setTexture2DArray=W,this.setTexture3D=Q,this.setTextureCube=G,this.rebindTextures=nt,this.setupRenderTarget=L,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=qe,this.setupFrameBufferTexture=Se,this.useMultisampledRTT=ie}function xg(s,e){function t(n,i=En){let r,o=tt.getTransfer(i);if(n===Tn)return s.UNSIGNED_BYTE;if(n===Na)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Fa)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ah)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Rh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Eh)return s.BYTE;if(n===wh)return s.SHORT;if(n===Ps)return s.UNSIGNED_SHORT;if(n===Ua)return s.INT;if(n===$n)return s.UNSIGNED_INT;if(n===Yt)return s.FLOAT;if(n===Ls)return s.HALF_FLOAT;if(n===Ch)return s.ALPHA;if(n===Ih)return s.RGB;if(n===Ut)return s.RGBA;if(n===hs)return s.DEPTH_COMPONENT;if(n===Us)return s.DEPTH_STENCIL;if(n===Oa)return s.RED;if(n===kr)return s.RED_INTEGER;if(n===Ph)return s.RG;if(n===Ba)return s.RG_INTEGER;if(n===za)return s.RGBA_INTEGER;if(n===Vr||n===Hr||n===Gr||n===Wr)if(o===lt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Vr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Vr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Hr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ka||n===Va||n===Ha||n===Ga)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ka)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Va)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ha)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ga)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wa||n===Xa||n===qa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Wa||n===Xa)return o===lt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===qa)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ya||n===Za||n===Ja||n===$a||n===Ka||n===ja||n===Qa||n===ec||n===tc||n===nc||n===ic||n===sc||n===rc||n===oc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ya)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Za)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ja)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$a)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ka)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ja)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qa)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ec)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===tc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===nc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ic)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===rc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===oc)return o===lt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ac||n===cc||n===lc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===ac)return o===lt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===cc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===lc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===hc||n===uc||n===fc||n===dc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===hc)return r.COMPRESSED_RED_RGTC1_EXT;if(n===uc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===dc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ds?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}function aS(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Gf(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,y,v,x){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,x)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,y,v):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Vt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Vt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);let y=e.get(p),v=y.envMap,x=y.envMapRotation;v&&(g.envMap.value=v,Os.copy(x),Os.x*=-1,Os.y*=-1,Os.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Os.y*=-1,Os.z*=-1),g.envMapRotation.value.setFromMatrix4(oS.makeRotationFromEuler(Os)),g.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,y,v){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*y,g.scale.value=v*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,y){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Vt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=y.texture,g.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){let y=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(y.matrixWorld),g.nearDistance.value=y.shadow.camera.near,g.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function cS(s,e,t,n){let i={},r={},o=[],a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,v){let x=v.program;n.uniformBlockBinding(y,x)}function l(y,v){let x=i[y.id];x===void 0&&(m(y),x=h(y),i[y.id]=x,y.addEventListener("dispose",g));let T=v.program;n.updateUBOMapping(y,T);let E=e.render.frame;r[y.id]!==E&&(d(y),r[y.id]=E)}function h(y){let v=u();y.__bindingPointIndex=v;let x=s.createBuffer(),T=y.__size,E=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,x),s.bufferData(s.UNIFORM_BUFFER,T,E),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,v,x),x}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let v=i[y.id],x=y.uniforms,T=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,v);for(let E=0,w=x.length;E<w;E++){let C=Array.isArray(x[E])?x[E]:[x[E]];for(let M=0,S=C.length;M<S;M++){let P=C[M];if(f(P,E,M,T)===!0){let U=P.__offset,B=Array.isArray(P.value)?P.value:[P.value],k=0;for(let z=0;z<B.length;z++){let W=B[z],Q=_(W);typeof W=="number"||typeof W=="boolean"?(P.__data[0]=W,s.bufferSubData(s.UNIFORM_BUFFER,U+k,P.__data)):W.isMatrix3?(P.__data[0]=W.elements[0],P.__data[1]=W.elements[1],P.__data[2]=W.elements[2],P.__data[3]=0,P.__data[4]=W.elements[3],P.__data[5]=W.elements[4],P.__data[6]=W.elements[5],P.__data[7]=0,P.__data[8]=W.elements[6],P.__data[9]=W.elements[7],P.__data[10]=W.elements[8],P.__data[11]=0):(W.toArray(P.__data,k),k+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,U,P.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,v,x,T){let E=y.value,w=v+"_"+x;if(T[w]===void 0)return typeof E=="number"||typeof E=="boolean"?T[w]=E:T[w]=E.clone(),!0;{let C=T[w];if(typeof E=="number"||typeof E=="boolean"){if(C!==E)return T[w]=E,!0}else if(C.equals(E)===!1)return C.copy(E),!0}return!1}function m(y){let v=y.uniforms,x=0,T=16;for(let w=0,C=v.length;w<C;w++){let M=Array.isArray(v[w])?v[w]:[v[w]];for(let S=0,P=M.length;S<P;S++){let U=M[S],B=Array.isArray(U.value)?U.value:[U.value];for(let k=0,z=B.length;k<z;k++){let W=B[k],Q=_(W),G=x%T,he=G%Q.boundary,me=G+he;x+=he,me!==0&&T-me<Q.storage&&(x+=T-me),U.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=x,x+=Q.storage}}}let E=x%T;return E>0&&(x+=T-E),y.__size=x,y.__cache={},this}function _(y){let v={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function g(y){let v=y.target;v.removeEventListener("dispose",g);let x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),s.deleteBuffer(i[v.id]),delete i[v.id],delete r[v.id]}function p(){for(let y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}var O0,B0,z0,k0,V0,H0,G0,W0,X0,q0,Y0,Z0,J0,$0,K0,j0,Q0,ex,tx,nx,ix,sx,rx,ox,ax,cx,lx,hx,ux,fx,dx,px,mx,gx,_x,xx,yx,vx,Mx,Sx,bx,Tx,Ex,wx,Ax,Rx,Cx,Ix,Px,Lx,Dx,Ux,Nx,Fx,Ox,Bx,zx,kx,Vx,Hx,Gx,Wx,Xx,qx,Yx,Zx,Jx,$x,Kx,jx,Qx,ey,ty,ny,iy,sy,ry,oy,ay,cy,ly,hy,uy,fy,dy,py,my,gy,_y,xy,yy,vy,My,Sy,by,Ty,Ey,wy,Ay,Ry,Cy,Iy,Py,Ly,Dy,Uy,Ny,Fy,Oy,By,zy,ky,Vy,Hy,Gy,Wy,Xy,qy,Yy,Zy,Jy,$y,Ky,jy,Qy,ev,tv,nv,iv,sv,rv,ov,av,cv,lv,hv,uv,fv,dv,pv,mv,Ze,pe,kn,Fh,Fs,gv,qr,Wm,zs,Kf,Xm,jf,Qf,ed,td,Bs,Xr,qm,bv,gc,pg,$m,mg,gg,_g,Km,jm,Qm,eg,tg,id,sd,rd,nd,Yr,vM,MM,sg,Bh,IM,PM,DM,VM,ad,cd,ZM,jM,QM,tS,sS,rS,ld,hd,Os,oS,ud,Jr=jh(()=>{$f();$f();O0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,B0=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,z0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,k0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,V0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,H0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,G0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,W0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,X0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,q0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Y0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Z0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,J0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,$0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,K0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,j0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Q0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ex=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,ix=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ox=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ax=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,cx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,lx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ux=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,fx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dx="gl_FragColor = linearToOutputTexel( gl_FragColor );",px=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_x=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,xx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,yx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Mx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,bx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ex=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ax=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rx=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Cx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ix=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Px=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dx=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ux=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fx=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ox=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Bx=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Gx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qx=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Zx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Jx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,$x=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Kx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jx=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ey=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ty=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,ny=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,ry=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,oy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ay=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ly=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,uy=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,fy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,py=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,my=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_y=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xy=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,yy=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,vy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,My=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Sy=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,by=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Ty=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ey=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,wy=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ay=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ry=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Iy=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Py=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Dy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ny=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Fy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Oy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,By=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ky=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Gy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Wy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Xy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,qy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zy=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$y=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ky=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Qy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ev=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,tv=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,iv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,sv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ov=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,av=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cv=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lv=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hv=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,uv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,dv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,pv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ze={alphahash_fragment:O0,alphahash_pars_fragment:B0,alphamap_fragment:z0,alphamap_pars_fragment:k0,alphatest_fragment:V0,alphatest_pars_fragment:H0,aomap_fragment:G0,aomap_pars_fragment:W0,batching_pars_vertex:X0,batching_vertex:q0,begin_vertex:Y0,beginnormal_vertex:Z0,bsdfs:J0,iridescence_fragment:$0,bumpmap_pars_fragment:K0,clipping_planes_fragment:j0,clipping_planes_pars_fragment:Q0,clipping_planes_pars_vertex:ex,clipping_planes_vertex:tx,color_fragment:nx,color_pars_fragment:ix,color_pars_vertex:sx,color_vertex:rx,common:ox,cube_uv_reflection_fragment:ax,defaultnormal_vertex:cx,displacementmap_pars_vertex:lx,displacementmap_vertex:hx,emissivemap_fragment:ux,emissivemap_pars_fragment:fx,colorspace_fragment:dx,colorspace_pars_fragment:px,envmap_fragment:mx,envmap_common_pars_fragment:gx,envmap_pars_fragment:_x,envmap_pars_vertex:xx,envmap_physical_pars_fragment:Cx,envmap_vertex:yx,fog_vertex:vx,fog_pars_vertex:Mx,fog_fragment:Sx,fog_pars_fragment:bx,gradientmap_pars_fragment:Tx,lightmap_pars_fragment:Ex,lights_lambert_fragment:wx,lights_lambert_pars_fragment:Ax,lights_pars_begin:Rx,lights_toon_fragment:Ix,lights_toon_pars_fragment:Px,lights_phong_fragment:Lx,lights_phong_pars_fragment:Dx,lights_physical_fragment:Ux,lights_physical_pars_fragment:Nx,lights_fragment_begin:Fx,lights_fragment_maps:Ox,lights_fragment_end:Bx,logdepthbuf_fragment:zx,logdepthbuf_pars_fragment:kx,logdepthbuf_pars_vertex:Vx,logdepthbuf_vertex:Hx,map_fragment:Gx,map_pars_fragment:Wx,map_particle_fragment:Xx,map_particle_pars_fragment:qx,metalnessmap_fragment:Yx,metalnessmap_pars_fragment:Zx,morphinstance_vertex:Jx,morphcolor_vertex:$x,morphnormal_vertex:Kx,morphtarget_pars_vertex:jx,morphtarget_vertex:Qx,normal_fragment_begin:ey,normal_fragment_maps:ty,normal_pars_fragment:ny,normal_pars_vertex:iy,normal_vertex:sy,normalmap_pars_fragment:ry,clearcoat_normal_fragment_begin:oy,clearcoat_normal_fragment_maps:ay,clearcoat_pars_fragment:cy,iridescence_pars_fragment:ly,opaque_fragment:hy,packing:uy,premultiplied_alpha_fragment:fy,project_vertex:dy,dithering_fragment:py,dithering_pars_fragment:my,roughnessmap_fragment:gy,roughnessmap_pars_fragment:_y,shadowmap_pars_fragment:xy,shadowmap_pars_vertex:yy,shadowmap_vertex:vy,shadowmask_pars_fragment:My,skinbase_vertex:Sy,skinning_pars_vertex:by,skinning_vertex:Ty,skinnormal_vertex:Ey,specularmap_fragment:wy,specularmap_pars_fragment:Ay,tonemapping_fragment:Ry,tonemapping_pars_fragment:Cy,transmission_fragment:Iy,transmission_pars_fragment:Py,uv_pars_fragment:Ly,uv_pars_vertex:Dy,uv_vertex:Uy,worldpos_vertex:Ny,background_vert:Fy,background_frag:Oy,backgroundCube_vert:By,backgroundCube_frag:zy,cube_vert:ky,cube_frag:Vy,depth_vert:Hy,depth_frag:Gy,distanceRGBA_vert:Wy,distanceRGBA_frag:Xy,equirect_vert:qy,equirect_frag:Yy,linedashed_vert:Zy,linedashed_frag:Jy,meshbasic_vert:$y,meshbasic_frag:Ky,meshlambert_vert:jy,meshlambert_frag:Qy,meshmatcap_vert:ev,meshmatcap_frag:tv,meshnormal_vert:nv,meshnormal_frag:iv,meshphong_vert:sv,meshphong_frag:rv,meshphysical_vert:ov,meshphysical_frag:av,meshtoon_vert:cv,meshtoon_frag:lv,points_vert:hv,points_frag:uv,shadow_vert:fv,shadow_frag:dv,sprite_vert:pv,sprite_frag:mv},pe={common:{diffuse:{value:new de(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new de(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new de(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new de(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},kn={basic:{uniforms:Ht([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ze.meshbasic_vert,fragmentShader:Ze.meshbasic_frag},lambert:{uniforms:Ht([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new de(0)}}]),vertexShader:Ze.meshlambert_vert,fragmentShader:Ze.meshlambert_frag},phong:{uniforms:Ht([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new de(0)},specular:{value:new de(1118481)},shininess:{value:30}}]),vertexShader:Ze.meshphong_vert,fragmentShader:Ze.meshphong_frag},standard:{uniforms:Ht([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new de(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag},toon:{uniforms:Ht([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new de(0)}}]),vertexShader:Ze.meshtoon_vert,fragmentShader:Ze.meshtoon_frag},matcap:{uniforms:Ht([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ze.meshmatcap_vert,fragmentShader:Ze.meshmatcap_frag},points:{uniforms:Ht([pe.points,pe.fog]),vertexShader:Ze.points_vert,fragmentShader:Ze.points_frag},dashed:{uniforms:Ht([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ze.linedashed_vert,fragmentShader:Ze.linedashed_frag},depth:{uniforms:Ht([pe.common,pe.displacementmap]),vertexShader:Ze.depth_vert,fragmentShader:Ze.depth_frag},normal:{uniforms:Ht([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ze.meshnormal_vert,fragmentShader:Ze.meshnormal_frag},sprite:{uniforms:Ht([pe.sprite,pe.fog]),vertexShader:Ze.sprite_vert,fragmentShader:Ze.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ze.background_vert,fragmentShader:Ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ze.backgroundCube_vert,fragmentShader:Ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ze.cube_vert,fragmentShader:Ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ze.equirect_vert,fragmentShader:Ze.equirect_frag},distanceRGBA:{uniforms:Ht([pe.common,pe.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ze.distanceRGBA_vert,fragmentShader:Ze.distanceRGBA_frag},shadow:{uniforms:Ht([pe.lights,pe.fog,{color:{value:new de(0)},opacity:{value:1}}]),vertexShader:Ze.shadow_vert,fragmentShader:Ze.shadow_frag}};kn.physical={uniforms:Ht([kn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new de(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new de(0)},specularColor:{value:new de(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ze.meshphysical_vert,fragmentShader:Ze.meshphysical_frag};Fh={r:0,b:0,g:0},Fs=new en,gv=new Ue;qr=4,Wm=[.125,.215,.35,.446,.526,.582],zs=20,Kf=new Cs,Xm=new de,jf=null,Qf=0,ed=0,td=!1,Bs=(1+Math.sqrt(5))/2,Xr=1/Bs,qm=[new R(-Bs,Xr,0),new R(Bs,Xr,0),new R(-Xr,0,Bs),new R(Xr,0,Bs),new R(0,Bs,-Xr),new R(0,Bs,Xr),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],bv=new R,gc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){let{size:o=256,position:a=bv}=r;jf=this._renderer.getRenderTarget(),Qf=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),td=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,a),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jm(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(jf,Qf,ed),this._renderer.xr.enabled=td,e.scissorTest=!1,Oh(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jn||e.mapping===pi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jf=this._renderer.getRenderTarget(),Qf=this._renderer.getActiveCubeFace(),ed=this._renderer.getActiveMipmapLevel(),td=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:vt,minFilter:vt,generateMipmaps:!1,type:Ls,format:Ut,colorSpace:Di,depthBuffer:!1},i=Ym(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ym(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tv(r)),this._blurMaterial=Ev(r,e,t)}return i}_compileMaterial(e){let t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,Kf)}_sceneToCubeUV(e,t,n,i,r){let c=new Tt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Xm),u.toneMapping=Zn,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(i),u.clearDepth(),u.setRenderTarget(null));let _=new Un({name:"PMREM.Background",side:Vt,depthWrite:!1,depthTest:!1}),g=new pt(new Sn,_),p=!1,y=e.background;y?y.isColor&&(_.color.copy(y),e.background=null,p=!0):(_.color.copy(Xm),p=!0);for(let v=0;v<6;v++){let x=v%3;x===0?(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[v],r.y,r.z)):x===1?(c.up.set(0,0,l[v]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[v],r.z)):(c.up.set(0,l[v],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[v]));let T=this._cubeSize;Oh(i,x*T,v>2?T:0,T,T),u.setRenderTarget(i),p&&u.render(g,c),u.render(e,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=y}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Jn||e.mapping===pi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jm()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zm());let r=i?this._cubemapMaterial:this._equirectMaterial,o=new pt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;let c=this._cubeSize;Oh(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Kf)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let r=1;r<i;r++){let o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=qm[(i-r-1)%qm.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new pt(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*zs-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):zs;g>zs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${zs}`);let p=[],y=0;for(let w=0;w<zs;++w){let C=w/_,M=Math.exp(-C*C/2);p.push(M),w===0?y+=M:w<g&&(y+=2*M)}for(let w=0;w<p.length;w++)p[w]=p[w]/y;d.envMap.value=e.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:v}=this;d.dTheta.value=m,d.mipInt.value=v-n;let x=this._sizeLods[i],T=3*x*(i>v-qr?i-v+qr:0),E=4*(this._cubeSize-x);Oh(t,T,E,3*x,2*x),c.setRenderTarget(t),c.render(u,Kf)}};pg=new St,$m=new vr(1,1),mg=new ms,gg=new gs,_g=new Ui,Km=[],jm=[],Qm=new Float32Array(16),eg=new Float32Array(9),tg=new Float32Array(4);id=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=jv(t.type)}},sd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=xM(t.type)}},rd=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let r=0,o=i.length;r!==o;++r){let a=i[r];a.setValue(e,t[a.id],n)}}},nd=/(\w+)(\])?(\[|\.)?/g;Yr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);yM(r,o,this)}}setValue(e,t,n,i){let r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){let a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,r=e.length;i!==r;++i){let o=e[i];o.id in t&&n.push(o)}return n}};vM=37297,MM=0;sg=new ze;Bh=new R;IM=/^[ \t]*#include +<([\w\d./]+)>/gm;PM=new Map;DM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;VM=0,ad=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new cd(e),t.set(e,n)),n}},cd=class{constructor(e){this.id=VM++,this.code=e,this.usedTimes=0}};ZM=0;jM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,QM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;tS={[wa]:Aa,[Ra]:Pa,[Ca]:La,[Ci]:Ia,[Aa]:wa,[Pa]:Ra,[La]:Ca,[Ia]:Ci};sS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,rS=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,ld=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Mr(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new tn({vertexShader:sS,fragmentShader:rS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new di(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},hd=class extends fn{constructor(e,t){super();let n=this,i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,m=null,_=typeof XRWebGLBinding<"u",g=new ld,p={},y=t.getContextAttributes(),v=null,x=null,T=[],E=[],w=new K,C=null,M=new Tt;M.viewport=new it;let S=new Tt;S.viewport=new it;let P=[M,S],U=new va,B=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let te=T[Y];return te===void 0&&(te=new ys,T[Y]=te),te.getTargetRaySpace()},this.getControllerGrip=function(Y){let te=T[Y];return te===void 0&&(te=new ys,T[Y]=te),te.getGripSpace()},this.getHand=function(Y){let te=T[Y];return te===void 0&&(te=new ys,T[Y]=te),te.getHandSpace()};function z(Y){let te=E.indexOf(Y.inputSource);if(te===-1)return;let Se=T[te];Se!==void 0&&(Se.update(Y.inputSource,Y.frame,l||o),Se.dispatchEvent({type:Y.type,data:Y.inputSource}))}function W(){i.removeEventListener("select",z),i.removeEventListener("selectstart",z),i.removeEventListener("selectend",z),i.removeEventListener("squeeze",z),i.removeEventListener("squeezestart",z),i.removeEventListener("squeezeend",z),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",Q);for(let Y=0;Y<T.length;Y++){let te=E[Y];te!==null&&(E[Y]=null,T[Y].disconnect(te))}B=null,k=null,g.reset();for(let Y in p)delete p[Y];e.setRenderTarget(v),f=null,d=null,u=null,i=null,x=null,je.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return m},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(v=e.getRenderTarget(),i.addEventListener("select",z),i.addEventListener("selectstart",z),i.addEventListener("selectend",z),i.addEventListener("squeeze",z),i.addEventListener("squeezestart",z),i.addEventListener("squeezeend",z),i.addEventListener("end",W),i.addEventListener("inputsourceschange",Q),y.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(w),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let Se=null,Ie=null,ve=null;y.depth&&(ve=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Se=y.stencil?Us:hs,Ie=y.stencil?Ds:$n);let qe={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(qe),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new dn(d.textureWidth,d.textureHeight,{format:Ut,type:Tn,depthTexture:new vr(d.textureWidth,d.textureHeight,Ie,void 0,void 0,void 0,void 0,void 0,void 0,Se),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let Se={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,t,Se),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),x=new dn(f.framebufferWidth,f.framebufferHeight,{format:Ut,type:Tn,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),je.setContext(i),je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function Q(Y){for(let te=0;te<Y.removed.length;te++){let Se=Y.removed[te],Ie=E.indexOf(Se);Ie>=0&&(E[Ie]=null,T[Ie].disconnect(Se))}for(let te=0;te<Y.added.length;te++){let Se=Y.added[te],Ie=E.indexOf(Se);if(Ie===-1){for(let qe=0;qe<T.length;qe++)if(qe>=E.length){E.push(Se),Ie=qe;break}else if(E[qe]===null){E[qe]=Se,Ie=qe;break}if(Ie===-1)break}let ve=T[Ie];ve&&ve.connect(Se)}}let G=new R,he=new R;function me(Y,te,Se){G.setFromMatrixPosition(te.matrixWorld),he.setFromMatrixPosition(Se.matrixWorld);let Ie=G.distanceTo(he),ve=te.projectionMatrix.elements,qe=Se.projectionMatrix.elements,nt=ve[14]/(ve[10]-1),L=ve[14]/(ve[10]+1),ee=(ve[9]+1)/ve[5],$=(ve[9]-1)/ve[5],Z=(ve[8]-1)/ve[0],J=(qe[8]+1)/qe[0],le=nt*Z,ie=nt*J,ue=Ie/(-Z+J),Ge=ue*-Z;if(te.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ge),Y.translateZ(ue),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),ve[10]===-1)Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{let He=nt+ue,I=L+ue,b=le-Ge,O=ie+(Ie-Ge),X=ee*L/I*He,ne=$*L/I*He;Y.projectionMatrix.makePerspective(b,O,X,ne,He,I),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function Me(Y,te){te===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(te.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let te=Y.near,Se=Y.far;g.texture!==null&&(g.depthNear>0&&(te=g.depthNear),g.depthFar>0&&(Se=g.depthFar)),U.near=S.near=M.near=te,U.far=S.far=M.far=Se,(B!==U.near||k!==U.far)&&(i.updateRenderState({depthNear:U.near,depthFar:U.far}),B=U.near,k=U.far),U.layers.mask=Y.layers.mask|6,M.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;let Ie=Y.parent,ve=U.cameras;Me(U,Ie);for(let qe=0;qe<ve.length;qe++)Me(ve[qe],Ie);ve.length===2?me(U,M,S):U.projectionMatrix.copy(M.projectionMatrix),Ve(Y,U,Ie)};function Ve(Y,te,Se){Se===null?Y.matrix.copy(te.matrixWorld):(Y.matrix.copy(Se.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(te.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(te.projectionMatrix),Y.projectionMatrixInverse.copy(te.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ds*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function(Y){return p[Y]};let $e=null;function rt(Y,te){if(h=te.getViewerPose(l||o),m=te,h!==null){let Se=h.views;f!==null&&(e.setRenderTargetFramebuffer(x,f.framebuffer),e.setRenderTarget(x));let Ie=!1;Se.length!==U.cameras.length&&(U.cameras.length=0,Ie=!0);for(let L=0;L<Se.length;L++){let ee=Se[L],$=null;if(f!==null)$=f.getViewport(ee);else{let J=u.getViewSubImage(d,ee);$=J.viewport,L===0&&(e.setRenderTargetTextures(x,J.colorTexture,J.depthStencilTexture),e.setRenderTarget(x))}let Z=P[L];Z===void 0&&(Z=new Tt,Z.layers.enable(L),Z.viewport=new it,P[L]=Z),Z.matrix.fromArray(ee.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(ee.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set($.x,$.y,$.width,$.height),L===0&&(U.matrix.copy(Z.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ie===!0&&U.cameras.push(Z)}let ve=i.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&_){u=n.getBinding();let L=u.getDepthInformation(Se[0]);L&&L.isValid&&L.texture&&g.init(L,i.renderState)}if(ve&&ve.includes("camera-access")&&_){e.state.unbindTexture(),u=n.getBinding();for(let L=0;L<Se.length;L++){let ee=Se[L].camera;if(ee){let $=p[ee];$||($=new Mr,p[ee]=$);let Z=u.getCameraImage(ee);$.sourceTexture=Z}}}}for(let Se=0;Se<T.length;Se++){let Ie=E[Se],ve=T[Se];Ie!==null&&ve!==void 0&&ve.update(Ie,te,l||o)}$e&&$e(Y,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),m=null}let je=new dg;je.setAnimationLoop(rt),this.setAnimationLoop=function(Y){$e=Y},this.dispose=function(){}}},Os=new en,oS=new Ue;ud=class{constructor(e={}){let{canvas:t=Hf(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;let m=new Uint32Array(4),_=new Int32Array(4),g=null,p=null,y=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Zn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let x=this,T=!1;this._outputColorSpace=Ft;let E=0,w=0,C=null,M=-1,S=null,P=new it,U=new it,B=null,k=new de(0),z=0,W=t.width,Q=t.height,G=1,he=null,me=null,Me=new it(0,0,W,Q),Ve=new it(0,0,W,Q),$e=!1,rt=new hi,je=!1,Y=!1,te=new Ue,Se=new R,Ie=new it,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},qe=!1;function nt(){return C===null?G:1}let L=n;function ee(A,N){return t.getContext(A,N)}try{let A={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",fe,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",re,!1),L===null){let N="webgl2";if(L=ee(N,A),L===null)throw ee(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let $,Z,J,le,ie,ue,Ge,He,I,b,O,X,ne,q,Ce,ce,we,Ae,se,xe,Oe,Pe,ge,Ye;function D(){$=new Av(L),$.init(),Pe=new xg(L,$),Z=new vv(L,$,e,Pe),J=new nS(L,$),Z.reversedDepthBuffer&&d&&J.buffers.depth.setReversed(!0),le=new Iv(L),ie=new GM,ue=new iS(L,$,J,ie,Z,Pe,le),Ge=new Sv(x),He=new wv(x),I=new F0(L),ge=new xv(L,I),b=new Rv(L,I,le,ge),O=new Lv(L,b,I,le),se=new Pv(L,Z,ue),ce=new Mv(ie),X=new HM(x,Ge,He,$,Z,ge,ce),ne=new aS(x,ie),q=new XM,Ce=new KM($),Ae=new _v(x,Ge,He,J,O,f,c),we=new eS(x,O,Z),Ye=new cS(L,le,Z,J),xe=new yv(L,$,le),Oe=new Cv(L,$,le),le.programs=X.programs,x.capabilities=Z,x.extensions=$,x.properties=ie,x.renderLists=q,x.shadowMap=we,x.state=J,x.info=le}D();let ae=new hd(x,L);this.xr=ae,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let A=$.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=$.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(A){A!==void 0&&(G=A,this.setSize(W,Q,!1))},this.getSize=function(A){return A.set(W,Q)},this.setSize=function(A,N,V=!0){if(ae.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=A,Q=N,t.width=Math.floor(A*G),t.height=Math.floor(N*G),V===!0&&(t.style.width=A+"px",t.style.height=N+"px"),this.setViewport(0,0,A,N)},this.getDrawingBufferSize=function(A){return A.set(W*G,Q*G).floor()},this.setDrawingBufferSize=function(A,N,V){W=A,Q=N,G=V,t.width=Math.floor(A*V),t.height=Math.floor(N*V),this.setViewport(0,0,A,N)},this.getCurrentViewport=function(A){return A.copy(P)},this.getViewport=function(A){return A.copy(Me)},this.setViewport=function(A,N,V,H){A.isVector4?Me.set(A.x,A.y,A.z,A.w):Me.set(A,N,V,H),J.viewport(P.copy(Me).multiplyScalar(G).round())},this.getScissor=function(A){return A.copy(Ve)},this.setScissor=function(A,N,V,H){A.isVector4?Ve.set(A.x,A.y,A.z,A.w):Ve.set(A,N,V,H),J.scissor(U.copy(Ve).multiplyScalar(G).round())},this.getScissorTest=function(){return $e},this.setScissorTest=function(A){J.setScissorTest($e=A)},this.setOpaqueSort=function(A){he=A},this.setTransparentSort=function(A){me=A},this.getClearColor=function(A){return A.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(A=!0,N=!0,V=!0){let H=0;if(A){let F=!1;if(C!==null){let oe=C.texture.format;F=oe===za||oe===Ba||oe===kr}if(F){let oe=C.texture.type,_e=oe===Tn||oe===$n||oe===Ps||oe===Ds||oe===Na||oe===Fa,Ee=Ae.getClearColor(),be=Ae.getClearAlpha(),Ne=Ee.r,Be=Ee.g,Le=Ee.b;_e?(m[0]=Ne,m[1]=Be,m[2]=Le,m[3]=be,L.clearBufferuiv(L.COLOR,0,m)):(_[0]=Ne,_[1]=Be,_[2]=Le,_[3]=be,L.clearBufferiv(L.COLOR,0,_))}else H|=L.COLOR_BUFFER_BIT}N&&(H|=L.DEPTH_BUFFER_BIT),V&&(H|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",fe,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",re,!1),Ae.dispose(),q.dispose(),Ce.dispose(),ie.dispose(),Ge.dispose(),He.dispose(),O.dispose(),ge.dispose(),Ye.dispose(),X.dispose(),ae.dispose(),ae.removeEventListener("sessionstart",Vn),ae.removeEventListener("sessionend",Ud),Zi.stop()};function fe(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let A=le.autoReset,N=we.enabled,V=we.autoUpdate,H=we.needsUpdate,F=we.type;D(),le.autoReset=A,we.enabled=N,we.autoUpdate=V,we.needsUpdate=H,we.type=F}function re(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function j(A){let N=A.target;N.removeEventListener("dispose",j),Re(N)}function Re(A){We(A),ie.remove(A)}function We(A){let N=ie.get(A).programs;N!==void 0&&(N.forEach(function(V){X.releaseProgram(V)}),A.isShaderMaterial&&X.releaseShaderCache(A))}this.renderBufferDirect=function(A,N,V,H,F,oe){N===null&&(N=ve);let _e=F.isMesh&&F.matrixWorld.determinant()<0,Ee=Og(A,N,V,H,F);J.setMaterial(H,_e);let be=V.index,Ne=1;if(H.wireframe===!0){if(be=b.getWireframeAttribute(V),be===void 0)return;Ne=2}let Be=V.drawRange,Le=V.attributes.position,Qe=Be.start*Ne,ht=(Be.start+Be.count)*Ne;oe!==null&&(Qe=Math.max(Qe,oe.start*Ne),ht=Math.min(ht,(oe.start+oe.count)*Ne)),be!==null?(Qe=Math.max(Qe,0),ht=Math.min(ht,be.count)):Le!=null&&(Qe=Math.max(Qe,0),ht=Math.min(ht,Le.count));let xt=ht-Qe;if(xt<0||xt===1/0)return;ge.setup(F,H,Ee,V,be);let dt,ut=xe;if(be!==null&&(dt=I.get(be),ut=Oe,ut.setIndex(dt)),F.isMesh)H.wireframe===!0?(J.setLineWidth(H.wireframeLinewidth*nt()),ut.setMode(L.LINES)):ut.setMode(L.TRIANGLES);else if(F.isLine){let De=H.linewidth;De===void 0&&(De=1),J.setLineWidth(De*nt()),F.isLineSegments?ut.setMode(L.LINES):F.isLineLoop?ut.setMode(L.LINE_LOOP):ut.setMode(L.LINE_STRIP)}else F.isPoints?ut.setMode(L.POINTS):F.isSprite&&ut.setMode(L.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)dr("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if($.get("WEBGL_multi_draw"))ut.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{let De=F._multiDrawStarts,mt=F._multiDrawCounts,ot=F._multiDrawCount,rn=be?I.get(be).bytesPerElement:1,ks=ie.get(H).currentProgram.getUniforms();for(let on=0;on<ot;on++)ks.setValue(L,"_gl_DrawID",on),ut.render(De[on]/rn,mt[on])}else if(F.isInstancedMesh)ut.renderInstances(Qe,xt,F.count);else if(V.isInstancedBufferGeometry){let De=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,mt=Math.min(V.instanceCount,De);ut.renderInstances(Qe,xt,mt)}else ut.render(Qe,xt)};function ft(A,N,V){A.transparent===!0&&A.side===Jt&&A.forceSinglePass===!1?(A.side=Vt,A.needsUpdate=!0,bc(A,N,V),A.side=Wn,A.needsUpdate=!0,bc(A,N,V),A.side=Jt):bc(A,N,V)}this.compile=function(A,N,V=null){V===null&&(V=A),p=Ce.get(V),p.init(N),v.push(p),V.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),A!==V&&A.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();let H=new Set;return A.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;let oe=F.material;if(oe)if(Array.isArray(oe))for(let _e=0;_e<oe.length;_e++){let Ee=oe[_e];ft(Ee,V,F),H.add(Ee)}else ft(oe,V,F),H.add(oe)}),p=v.pop(),H},this.compileAsync=function(A,N,V=null){let H=this.compile(A,N,V);return new Promise(F=>{function oe(){if(H.forEach(function(_e){ie.get(_e).currentProgram.isReady()&&H.delete(_e)}),H.size===0){F(A);return}setTimeout(oe,10)}$.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let ct=null;function jn(A){ct&&ct(A)}function Vn(){Zi.stop()}function Ud(){Zi.start()}let Zi=new dg;Zi.setAnimationLoop(jn),typeof self<"u"&&Zi.setContext(self),this.setAnimationLoop=function(A){ct=A,ae.setAnimationLoop(A),A===null?Zi.stop():Zi.start()},ae.addEventListener("sessionstart",Vn),ae.addEventListener("sessionend",Ud),this.render=function(A,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ae.enabled===!0&&ae.isPresenting===!0&&(ae.cameraAutoUpdate===!0&&ae.updateCamera(N),N=ae.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,N,C),p=Ce.get(A,v.length),p.init(N),v.push(p),te.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),rt.setFromProjectionMatrix(te,Qt,N.reversedDepth),Y=this.localClippingEnabled,je=ce.init(this.clippingPlanes,Y),g=q.get(A,y.length),g.init(),y.push(g),ae.enabled===!0&&ae.isPresenting===!0){let oe=x.xr.getDepthSensingMesh();oe!==null&&$h(oe,N,-1/0,x.sortObjects)}$h(A,N,0,x.sortObjects),g.finish(),x.sortObjects===!0&&g.sort(he,me),qe=ae.enabled===!1||ae.isPresenting===!1||ae.hasDepthSensing()===!1,qe&&Ae.addToRenderList(g,A),this.info.render.frame++,je===!0&&ce.beginShadows();let V=p.state.shadowsArray;we.render(V,A,N),je===!0&&ce.endShadows(),this.info.autoReset===!0&&this.info.reset();let H=g.opaque,F=g.transmissive;if(p.setupLights(),N.isArrayCamera){let oe=N.cameras;if(F.length>0)for(let _e=0,Ee=oe.length;_e<Ee;_e++){let be=oe[_e];Fd(H,F,A,be)}qe&&Ae.render(A);for(let _e=0,Ee=oe.length;_e<Ee;_e++){let be=oe[_e];Nd(g,A,be,be.viewport)}}else F.length>0&&Fd(H,F,A,N),qe&&Ae.render(A),Nd(g,A,N);C!==null&&w===0&&(ue.updateMultisampleRenderTarget(C),ue.updateRenderTargetMipmap(C)),A.isScene===!0&&A.onAfterRender(x,A,N),ge.resetDefaultState(),M=-1,S=null,v.pop(),v.length>0?(p=v[v.length-1],je===!0&&ce.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,y.pop(),y.length>0?g=y[y.length-1]:g=null};function $h(A,N,V,H){if(A.visible===!1)return;if(A.layers.test(N.layers)){if(A.isGroup)V=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(N);else if(A.isLight)p.pushLight(A),A.castShadow&&p.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||rt.intersectsSprite(A)){H&&Ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(te);let _e=O.update(A),Ee=A.material;Ee.visible&&g.push(A,_e,Ee,V,Ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||rt.intersectsObject(A))){let _e=O.update(A),Ee=A.material;if(H&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ie.copy(A.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ie.copy(_e.boundingSphere.center)),Ie.applyMatrix4(A.matrixWorld).applyMatrix4(te)),Array.isArray(Ee)){let be=_e.groups;for(let Ne=0,Be=be.length;Ne<Be;Ne++){let Le=be[Ne],Qe=Ee[Le.materialIndex];Qe&&Qe.visible&&g.push(A,_e,Qe,V,Ie.z,Le)}}else Ee.visible&&g.push(A,_e,Ee,V,Ie.z,null)}}let oe=A.children;for(let _e=0,Ee=oe.length;_e<Ee;_e++)$h(oe[_e],N,V,H)}function Nd(A,N,V,H){let F=A.opaque,oe=A.transmissive,_e=A.transparent;p.setupLightsView(V),je===!0&&ce.setGlobalState(x.clippingPlanes,V),H&&J.viewport(P.copy(H)),F.length>0&&Sc(F,N,V),oe.length>0&&Sc(oe,N,V),_e.length>0&&Sc(_e,N,V),J.buffers.depth.setTest(!0),J.buffers.depth.setMask(!0),J.buffers.color.setMask(!0),J.setPolygonOffset(!1)}function Fd(A,N,V,H){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new dn(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?Ls:Tn,minFilter:mn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:tt.workingColorSpace}));let oe=p.state.transmissionRenderTarget[H.id],_e=H.viewport||P;oe.setSize(_e.z*x.transmissionResolutionScale,_e.w*x.transmissionResolutionScale);let Ee=x.getRenderTarget(),be=x.getActiveCubeFace(),Ne=x.getActiveMipmapLevel();x.setRenderTarget(oe),x.getClearColor(k),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear(),qe&&Ae.render(V);let Be=x.toneMapping;x.toneMapping=Zn;let Le=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),je===!0&&ce.setGlobalState(x.clippingPlanes,H),Sc(A,V,H),ue.updateMultisampleRenderTarget(oe),ue.updateRenderTargetMipmap(oe),$.has("WEBGL_multisampled_render_to_texture")===!1){let Qe=!1;for(let ht=0,xt=N.length;ht<xt;ht++){let dt=N[ht],ut=dt.object,De=dt.geometry,mt=dt.material,ot=dt.group;if(mt.side===Jt&&ut.layers.test(H.layers)){let rn=mt.side;mt.side=Vt,mt.needsUpdate=!0,Od(ut,V,H,De,mt,ot),mt.side=rn,mt.needsUpdate=!0,Qe=!0}}Qe===!0&&(ue.updateMultisampleRenderTarget(oe),ue.updateRenderTargetMipmap(oe))}x.setRenderTarget(Ee,be,Ne),x.setClearColor(k,z),Le!==void 0&&(H.viewport=Le),x.toneMapping=Be}function Sc(A,N,V){let H=N.isScene===!0?N.overrideMaterial:null;for(let F=0,oe=A.length;F<oe;F++){let _e=A[F],Ee=_e.object,be=_e.geometry,Ne=_e.group,Be=_e.material;Be.allowOverride===!0&&H!==null&&(Be=H),Ee.layers.test(V.layers)&&Od(Ee,N,V,be,Be,Ne)}}function Od(A,N,V,H,F,oe){A.onBeforeRender(x,N,V,H,F,oe),A.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),F.onBeforeRender(x,N,V,H,A,oe),F.transparent===!0&&F.side===Jt&&F.forceSinglePass===!1?(F.side=Vt,F.needsUpdate=!0,x.renderBufferDirect(V,N,H,F,A,oe),F.side=Wn,F.needsUpdate=!0,x.renderBufferDirect(V,N,H,F,A,oe),F.side=Jt):x.renderBufferDirect(V,N,H,F,A,oe),A.onAfterRender(x,N,V,H,F,oe)}function bc(A,N,V){N.isScene!==!0&&(N=ve);let H=ie.get(A),F=p.state.lights,oe=p.state.shadowsArray,_e=F.state.version,Ee=X.getParameters(A,F.state,oe,N,V),be=X.getProgramCacheKey(Ee),Ne=H.programs;H.environment=A.isMeshStandardMaterial?N.environment:null,H.fog=N.fog,H.envMap=(A.isMeshStandardMaterial?He:Ge).get(A.envMap||H.environment),H.envMapRotation=H.environment!==null&&A.envMap===null?N.environmentRotation:A.envMapRotation,Ne===void 0&&(A.addEventListener("dispose",j),Ne=new Map,H.programs=Ne);let Be=Ne.get(be);if(Be!==void 0){if(H.currentProgram===Be&&H.lightsStateVersion===_e)return zd(A,Ee),Be}else Ee.uniforms=X.getUniforms(A),A.onBeforeCompile(Ee,x),Be=X.acquireProgram(Ee,be),Ne.set(be,Be),H.uniforms=Ee.uniforms;let Le=H.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Le.clippingPlanes=ce.uniform),zd(A,Ee),H.needsLights=zg(A),H.lightsStateVersion=_e,H.needsLights&&(Le.ambientLightColor.value=F.state.ambient,Le.lightProbe.value=F.state.probe,Le.directionalLights.value=F.state.directional,Le.directionalLightShadows.value=F.state.directionalShadow,Le.spotLights.value=F.state.spot,Le.spotLightShadows.value=F.state.spotShadow,Le.rectAreaLights.value=F.state.rectArea,Le.ltc_1.value=F.state.rectAreaLTC1,Le.ltc_2.value=F.state.rectAreaLTC2,Le.pointLights.value=F.state.point,Le.pointLightShadows.value=F.state.pointShadow,Le.hemisphereLights.value=F.state.hemi,Le.directionalShadowMap.value=F.state.directionalShadowMap,Le.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Le.spotShadowMap.value=F.state.spotShadowMap,Le.spotLightMatrix.value=F.state.spotLightMatrix,Le.spotLightMap.value=F.state.spotLightMap,Le.pointShadowMap.value=F.state.pointShadowMap,Le.pointShadowMatrix.value=F.state.pointShadowMatrix),H.currentProgram=Be,H.uniformsList=null,Be}function Bd(A){if(A.uniformsList===null){let N=A.currentProgram.getUniforms();A.uniformsList=Yr.seqWithValue(N.seq,A.uniforms)}return A.uniformsList}function zd(A,N){let V=ie.get(A);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function Og(A,N,V,H,F){N.isScene!==!0&&(N=ve),ue.resetTextureUnits();let oe=N.fog,_e=H.isMeshStandardMaterial?N.environment:null,Ee=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Di,be=(H.isMeshStandardMaterial?He:Ge).get(H.envMap||_e),Ne=H.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Be=!!V.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Le=!!V.morphAttributes.position,Qe=!!V.morphAttributes.normal,ht=!!V.morphAttributes.color,xt=Zn;H.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(xt=x.toneMapping);let dt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,ut=dt!==void 0?dt.length:0,De=ie.get(H),mt=p.state.lights;if(je===!0&&(Y===!0||A!==S)){let Gt=A===S&&H.id===M;ce.setState(H,A,Gt)}let ot=!1;H.version===De.__version?(De.needsLights&&De.lightsStateVersion!==mt.state.version||De.outputColorSpace!==Ee||F.isBatchedMesh&&De.batching===!1||!F.isBatchedMesh&&De.batching===!0||F.isBatchedMesh&&De.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&De.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&De.instancing===!1||!F.isInstancedMesh&&De.instancing===!0||F.isSkinnedMesh&&De.skinning===!1||!F.isSkinnedMesh&&De.skinning===!0||F.isInstancedMesh&&De.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&De.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&De.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&De.instancingMorph===!1&&F.morphTexture!==null||De.envMap!==be||H.fog===!0&&De.fog!==oe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==ce.numPlanes||De.numIntersection!==ce.numIntersection)||De.vertexAlphas!==Ne||De.vertexTangents!==Be||De.morphTargets!==Le||De.morphNormals!==Qe||De.morphColors!==ht||De.toneMapping!==xt||De.morphTargetsCount!==ut)&&(ot=!0):(ot=!0,De.__version=H.version);let rn=De.currentProgram;ot===!0&&(rn=bc(H,N,F));let ks=!1,on=!1,jr=!1,gt=rn.getUniforms(),_n=De.uniforms;if(J.useProgram(rn.program)&&(ks=!0,on=!0,jr=!0),H.id!==M&&(M=H.id,on=!0),ks||S!==A){J.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),gt.setValue(L,"projectionMatrix",A.projectionMatrix),gt.setValue(L,"viewMatrix",A.matrixWorldInverse);let $t=gt.map.cameraPosition;$t!==void 0&&$t.setValue(L,Se.setFromMatrixPosition(A.matrixWorld)),Z.logarithmicDepthBuffer&&gt.setValue(L,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&gt.setValue(L,"isOrthographic",A.isOrthographicCamera===!0),S!==A&&(S=A,on=!0,jr=!0)}if(F.isSkinnedMesh){gt.setOptional(L,F,"bindMatrix"),gt.setOptional(L,F,"bindMatrixInverse");let Gt=F.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),gt.setValue(L,"boneTexture",Gt.boneTexture,ue))}F.isBatchedMesh&&(gt.setOptional(L,F,"batchingTexture"),gt.setValue(L,"batchingTexture",F._matricesTexture,ue),gt.setOptional(L,F,"batchingIdTexture"),gt.setValue(L,"batchingIdTexture",F._indirectTexture,ue),gt.setOptional(L,F,"batchingColorTexture"),F._colorsTexture!==null&&gt.setValue(L,"batchingColorTexture",F._colorsTexture,ue));let xn=V.morphAttributes;if((xn.position!==void 0||xn.normal!==void 0||xn.color!==void 0)&&se.update(F,V,rn),(on||De.receiveShadow!==F.receiveShadow)&&(De.receiveShadow=F.receiveShadow,gt.setValue(L,"receiveShadow",F.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(_n.envMap.value=be,_n.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&N.environment!==null&&(_n.envMapIntensity.value=N.environmentIntensity),on&&(gt.setValue(L,"toneMappingExposure",x.toneMappingExposure),De.needsLights&&Bg(_n,jr),oe&&H.fog===!0&&ne.refreshFogUniforms(_n,oe),ne.refreshMaterialUniforms(_n,H,G,Q,p.state.transmissionRenderTarget[A.id]),Yr.upload(L,Bd(De),_n,ue)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(Yr.upload(L,Bd(De),_n,ue),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&gt.setValue(L,"center",F.center),gt.setValue(L,"modelViewMatrix",F.modelViewMatrix),gt.setValue(L,"normalMatrix",F.normalMatrix),gt.setValue(L,"modelMatrix",F.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){let Gt=H.uniformsGroups;for(let $t=0,Kh=Gt.length;$t<Kh;$t++){let Ji=Gt[$t];Ye.update(Ji,rn),Ye.bind(Ji,rn)}}return rn}function Bg(A,N){A.ambientLightColor.needsUpdate=N,A.lightProbe.needsUpdate=N,A.directionalLights.needsUpdate=N,A.directionalLightShadows.needsUpdate=N,A.pointLights.needsUpdate=N,A.pointLightShadows.needsUpdate=N,A.spotLights.needsUpdate=N,A.spotLightShadows.needsUpdate=N,A.rectAreaLights.needsUpdate=N,A.hemisphereLights.needsUpdate=N}function zg(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return w},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(A,N,V){let H=ie.get(A);H.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ie.get(A.texture).__webglTexture=N,ie.get(A.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:V,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,N){let V=ie.get(A);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};let kg=L.createFramebuffer();this.setRenderTarget=function(A,N=0,V=0){C=A,E=N,w=V;let H=!0,F=null,oe=!1,_e=!1;if(A){let be=ie.get(A);if(be.__useDefaultFramebuffer!==void 0)J.bindFramebuffer(L.FRAMEBUFFER,null),H=!1;else if(be.__webglFramebuffer===void 0)ue.setupRenderTarget(A);else if(be.__hasExternalTextures)ue.rebindTextures(A,ie.get(A.texture).__webglTexture,ie.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Le=A.depthTexture;if(be.__boundDepthTexture!==Le){if(Le!==null&&ie.has(Le)&&(A.width!==Le.image.width||A.height!==Le.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ue.setupDepthRenderbuffer(A)}}let Ne=A.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(_e=!0);let Be=ie.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Be[N])?F=Be[N][V]:F=Be[N],oe=!0):A.samples>0&&ue.useMultisampledRTT(A)===!1?F=ie.get(A).__webglMultisampledFramebuffer:Array.isArray(Be)?F=Be[V]:F=Be,P.copy(A.viewport),U.copy(A.scissor),B=A.scissorTest}else P.copy(Me).multiplyScalar(G).floor(),U.copy(Ve).multiplyScalar(G).floor(),B=$e;if(V!==0&&(F=kg),J.bindFramebuffer(L.FRAMEBUFFER,F)&&H&&J.drawBuffers(A,F),J.viewport(P),J.scissor(U),J.setScissorTest(B),oe){let be=ie.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,be.__webglTexture,V)}else if(_e){let be=N;for(let Ne=0;Ne<A.textures.length;Ne++){let Be=ie.get(A.textures[Ne]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+Ne,Be.__webglTexture,V,be)}}else if(A!==null&&V!==0){let be=ie.get(A.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,V)}M=-1},this.readRenderTargetPixels=function(A,N,V,H,F,oe,_e,Ee=0){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=ie.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){J.bindFramebuffer(L.FRAMEBUFFER,be);try{let Ne=A.textures[Ee],Be=Ne.format,Le=Ne.type;if(!Z.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Z.textureTypeReadable(Le)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=A.width-H&&V>=0&&V<=A.height-F&&(A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Ee),L.readPixels(N,V,H,F,Pe.convert(Be),Pe.convert(Le),oe))}finally{let Ne=C!==null?ie.get(C).__webglFramebuffer:null;J.bindFramebuffer(L.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(A,N,V,H,F,oe,_e,Ee=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=ie.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be)if(N>=0&&N<=A.width-H&&V>=0&&V<=A.height-F){J.bindFramebuffer(L.FRAMEBUFFER,be);let Ne=A.textures[Ee],Be=Ne.format,Le=Ne.type;if(!Z.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Z.textureTypeReadable(Le))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qe=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Qe),L.bufferData(L.PIXEL_PACK_BUFFER,oe.byteLength,L.STREAM_READ),A.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+Ee),L.readPixels(N,V,H,F,Pe.convert(Be),Pe.convert(Le),0);let ht=C!==null?ie.get(C).__webglFramebuffer:null;J.bindFramebuffer(L.FRAMEBUFFER,ht);let xt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Um(L,xt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Qe),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,oe),L.deleteBuffer(Qe),L.deleteSync(xt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,N=null,V=0){let H=Math.pow(2,-V),F=Math.floor(A.image.width*H),oe=Math.floor(A.image.height*H),_e=N!==null?N.x:0,Ee=N!==null?N.y:0;ue.setTexture2D(A,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,_e,Ee,F,oe),J.unbindTexture()};let Vg=L.createFramebuffer(),Hg=L.createFramebuffer();this.copyTextureToTexture=function(A,N,V=null,H=null,F=0,oe=null){oe===null&&(F!==0?(dr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),oe=F,F=0):oe=0);let _e,Ee,be,Ne,Be,Le,Qe,ht,xt,dt=A.isCompressedTexture?A.mipmaps[oe]:A.image;if(V!==null)_e=V.max.x-V.min.x,Ee=V.max.y-V.min.y,be=V.isBox3?V.max.z-V.min.z:1,Ne=V.min.x,Be=V.min.y,Le=V.isBox3?V.min.z:0;else{let xn=Math.pow(2,-F);_e=Math.floor(dt.width*xn),Ee=Math.floor(dt.height*xn),A.isDataArrayTexture?be=dt.depth:A.isData3DTexture?be=Math.floor(dt.depth*xn):be=1,Ne=0,Be=0,Le=0}H!==null?(Qe=H.x,ht=H.y,xt=H.z):(Qe=0,ht=0,xt=0);let ut=Pe.convert(N.format),De=Pe.convert(N.type),mt;N.isData3DTexture?(ue.setTexture3D(N,0),mt=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(ue.setTexture2DArray(N,0),mt=L.TEXTURE_2D_ARRAY):(ue.setTexture2D(N,0),mt=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);let ot=L.getParameter(L.UNPACK_ROW_LENGTH),rn=L.getParameter(L.UNPACK_IMAGE_HEIGHT),ks=L.getParameter(L.UNPACK_SKIP_PIXELS),on=L.getParameter(L.UNPACK_SKIP_ROWS),jr=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,dt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,dt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Ne),L.pixelStorei(L.UNPACK_SKIP_ROWS,Be),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Le);let gt=A.isDataArrayTexture||A.isData3DTexture,_n=N.isDataArrayTexture||N.isData3DTexture;if(A.isDepthTexture){let xn=ie.get(A),Gt=ie.get(N),$t=ie.get(xn.__renderTarget),Kh=ie.get(Gt.__renderTarget);J.bindFramebuffer(L.READ_FRAMEBUFFER,$t.__webglFramebuffer),J.bindFramebuffer(L.DRAW_FRAMEBUFFER,Kh.__webglFramebuffer);for(let Ji=0;Ji<be;Ji++)gt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ie.get(A).__webglTexture,F,Le+Ji),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ie.get(N).__webglTexture,oe,xt+Ji)),L.blitFramebuffer(Ne,Be,_e,Ee,Qe,ht,_e,Ee,L.DEPTH_BUFFER_BIT,L.NEAREST);J.bindFramebuffer(L.READ_FRAMEBUFFER,null),J.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(F!==0||A.isRenderTargetTexture||ie.has(A)){let xn=ie.get(A),Gt=ie.get(N);J.bindFramebuffer(L.READ_FRAMEBUFFER,Vg),J.bindFramebuffer(L.DRAW_FRAMEBUFFER,Hg);for(let $t=0;$t<be;$t++)gt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,xn.__webglTexture,F,Le+$t):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,xn.__webglTexture,F),_n?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Gt.__webglTexture,oe,xt+$t):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Gt.__webglTexture,oe),F!==0?L.blitFramebuffer(Ne,Be,_e,Ee,Qe,ht,_e,Ee,L.COLOR_BUFFER_BIT,L.NEAREST):_n?L.copyTexSubImage3D(mt,oe,Qe,ht,xt+$t,Ne,Be,_e,Ee):L.copyTexSubImage2D(mt,oe,Qe,ht,Ne,Be,_e,Ee);J.bindFramebuffer(L.READ_FRAMEBUFFER,null),J.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else _n?A.isDataTexture||A.isData3DTexture?L.texSubImage3D(mt,oe,Qe,ht,xt,_e,Ee,be,ut,De,dt.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(mt,oe,Qe,ht,xt,_e,Ee,be,ut,dt.data):L.texSubImage3D(mt,oe,Qe,ht,xt,_e,Ee,be,ut,De,dt):A.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,oe,Qe,ht,_e,Ee,ut,De,dt.data):A.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,oe,Qe,ht,dt.width,dt.height,ut,dt.data):L.texSubImage2D(L.TEXTURE_2D,oe,Qe,ht,_e,Ee,ut,De,dt);L.pixelStorei(L.UNPACK_ROW_LENGTH,ot),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,rn),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ks),L.pixelStorei(L.UNPACK_SKIP_ROWS,on),L.pixelStorei(L.UNPACK_SKIP_IMAGES,jr),oe===0&&N.generateMipmaps&&L.generateMipmap(mt),J.unbindTexture()},this.initRenderTarget=function(A){ie.get(A).__webglFramebuffer===void 0&&ue.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ue.setTextureCube(A,0):A.isData3DTexture?ue.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ue.setTexture2DArray(A,0):ue.setTexture2D(A,0),J.unbindTexture()},this.resetState=function(){E=0,w=0,C=null,J.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=tt._getDrawingBufferColorSpace(e),t.unpackColorSpace=tt._getUnpackColorSpace()}}});var Ig={};kd(Ig,{GLTFExporter:()=>Kr});function yc(s,e){return s.length===e.length&&s.every(function(t,n){return t===e[n]})}function _S(s){return new TextEncoder().encode(s).buffer}function xS(s){return yc(s.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function yS(s,e,t){let n={min:new Array(s.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(s.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let i=e;i<e+t;i++)for(let r=0;r<s.itemSize;r++){let o;s.itemSize>4?o=s.array[i*s.itemSize+r]:(r===0?o=s.getX(i):r===1?o=s.getY(i):r===2?o=s.getZ(i):r===3&&(o=s.getW(i)),s.normalized===!0&&(o=zn.normalize(o,s.array))),n.min[r]=Math.min(n.min[r],o),n.max[r]=Math.max(n.max[r],o)}return n}function Cg(s){return Math.ceil(s/4)*4}function _d(s,e=0){let t=Cg(s.byteLength);if(t!==s.byteLength){let n=new Uint8Array(t);if(n.set(new Uint8Array(s)),e!==0)for(let i=s.byteLength;i<t;i++)n[i]=e;return n.buffer}return s}function Rg(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function vS(s,e){if(typeof OffscreenCanvas<"u"&&s instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),s.convertToBlob({type:e,quality:t})}else return new Promise(t=>s.toBlob(t,e))}var Tg,Kr,Ke,gd,gn,Eg,fS,wg,dS,pS,Ag,mS,gS,xd,yd,vd,Md,Sd,bd,Td,Ed,wd,Ad,Rd,Cd,Id,Pd,Ld,Pg=jh(()=>{Jr();Tg={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},Kr=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new yd(e)}),this.register(function(e){return new vd(e)}),this.register(function(e){return new Td(e)}),this.register(function(e){return new Ed(e)}),this.register(function(e){return new wd(e)}),this.register(function(e){return new Ad(e)}),this.register(function(e){return new Md(e)}),this.register(function(e){return new Sd(e)}),this.register(function(e){return new bd(e)}),this.register(function(e){return new Rd(e)}),this.register(function(e){return new Cd(e)}),this.register(function(e){return new Id(e)}),this.register(function(e){return new Pd(e)}),this.register(function(e){return new Ld(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,n,i){let r=new xd,o=[];for(let a=0,c=this.pluginCallbacks.length;a<c;a++)o.push(this.pluginCallbacks[a](r));r.setPlugins(o),r.setTextureUtils(this.textureUtils),r.writeAsync(e,t,i).catch(n)}parseAsync(e,t){let n=this;return new Promise(function(i,r){n.parse(e,i,r,t)})}},Ke={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},gd="KHR_mesh_quantization",gn={};gn[wt]=Ke.NEAREST;gn[zr]=Ke.NEAREST_MIPMAP_NEAREST;gn[mi]=Ke.NEAREST_MIPMAP_LINEAR;gn[vt]=Ke.LINEAR;gn[Yi]=Ke.LINEAR_MIPMAP_NEAREST;gn[mn]=Ke.LINEAR_MIPMAP_LINEAR;gn[qt]=Ke.CLAMP_TO_EDGE;gn[Ii]=Ke.REPEAT;gn[Pi]=Ke.MIRRORED_REPEAT;Eg={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},fS=new de,wg=12,dS=1179937895,pS=2,Ag=8,mS=1313821514,gS=5130562;xd=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r180"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,n={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},n),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let i=this,r=i.buffers,o=i.json;n=i.options;let a=i.extensionsUsed,c=i.extensionsRequired,l=new Blob(r,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(c);if(h.length>0&&(o.extensionsUsed=h),u.length>0&&(o.extensionsRequired=u),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=l.size),n.binary===!0){let d=new FileReader;d.readAsArrayBuffer(l),d.onloadend=function(){let f=_d(d.result),m=new DataView(new ArrayBuffer(Ag));m.setUint32(0,f.byteLength,!0),m.setUint32(4,gS,!0);let _=_d(_S(JSON.stringify(o)),32),g=new DataView(new ArrayBuffer(Ag));g.setUint32(0,_.byteLength,!0),g.setUint32(4,mS,!0);let p=new ArrayBuffer(wg),y=new DataView(p);y.setUint32(0,dS,!0),y.setUint32(4,pS,!0);let v=wg+g.byteLength+_.byteLength+m.byteLength+f.byteLength;y.setUint32(8,v,!0);let x=new Blob([p,g,_,m,f],{type:"application/octet-stream"}),T=new FileReader;T.readAsArrayBuffer(x),T.onloadend=function(){t(T.result)}}}else if(o.buffers&&o.buffers.length>0){let d=new FileReader;d.readAsDataURL(l),d.onloadend=function(){let f=d.result;o.buffers[0].uri=f,t(o)}}else t(o)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let n=this.options,i=this.extensionsUsed;try{let r=JSON.parse(JSON.stringify(e.userData));if(n.includeCustomExtensions&&r.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let o in r.gltfExtensions)t.extensions[o]=r.gltfExtensions[o],i[o]=!0;delete r.gltfExtensions}Object.keys(r).length>0&&(t.extras=r)}catch(r){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+r.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let i=new Map;i.set(!0,this.uid++),i.set(!1,this.uid++),this.uids.set(e,i)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let n=new R;for(let i=0,r=e.count;i<r;i++)if(Math.abs(n.fromBufferAttribute(e,i).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let n=e.clone(),i=new R;for(let r=0,o=n.count;r<o;r++)i.fromBufferAttribute(n,r),i.x===0&&i.y===0&&i.z===0?i.setX(1):i.normalize(),n.setXYZ(r,i.x,i.y,i.z);return t.attributesNormalized.set(e,n),n}applyTextureTransform(e,t){let n=!1,i={};(t.offset.x!==0||t.offset.y!==0)&&(i.offset=t.offset.toArray(),n=!0),t.rotation!==0&&(i.rotation=t.rotation,n=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(i.scale=t.repeat.toArray(),n=!0),n&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=i,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function n(f){return f.colorSpace===Ft?function(_){return _<.04045?_*.0773993808:Math.pow(_*.9478672986+.0521327014,2.4)}:function(_){return _}}e instanceof Fn&&(e=await this.decompressTextureAsync(e)),t instanceof Fn&&(t=await this.decompressTextureAsync(t));let i=e?e.image:null,r=t?t.image:null,o=Math.max(i?i.width:0,r?r.width:0),a=Math.max(i?i.height:0,r?r.height:0),c=Rg();c.width=o,c.height=a;let l=c.getContext("2d",{willReadFrequently:!0});l.fillStyle="#00ffff",l.fillRect(0,0,o,a);let h=l.getImageData(0,0,o,a);if(i){l.drawImage(i,0,0,o,a);let f=n(e),m=l.getImageData(0,0,o,a).data;for(let _=2;_<m.length;_+=4)h.data[_]=f(m[_]/256)*256}if(r){l.drawImage(r,0,0,o,a);let f=n(t),m=l.getImageData(0,0,o,a).data;for(let _=1;_<m.length;_+=4)h.data[_]=f(m[_]/256)*256}l.putImageData(h,0,0);let d=(e||t).clone();return d.source=new ln(c),d.colorSpace=En,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,n=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),n.push(e),0}processBufferView(e,t,n,i,r){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(t){case Ke.BYTE:case Ke.UNSIGNED_BYTE:a=1;break;case Ke.SHORT:case Ke.UNSIGNED_SHORT:a=2;break;default:a=4}let c=e.itemSize*a;r===Ke.ARRAY_BUFFER&&(c=Math.ceil(c/4)*4);let l=Cg(i*c),h=new DataView(new ArrayBuffer(l)),u=0;for(let m=n;m<n+i;m++){for(let _=0;_<e.itemSize;_++){let g;e.itemSize>4?g=e.array[m*e.itemSize+_]:(_===0?g=e.getX(m):_===1?g=e.getY(m):_===2?g=e.getZ(m):_===3&&(g=e.getW(m)),e.normalized===!0&&(g=zn.normalize(g,e.array))),t===Ke.FLOAT?h.setFloat32(u,g,!0):t===Ke.INT?h.setInt32(u,g,!0):t===Ke.UNSIGNED_INT?h.setUint32(u,g,!0):t===Ke.SHORT?h.setInt16(u,g,!0):t===Ke.UNSIGNED_SHORT?h.setUint16(u,g,!0):t===Ke.BYTE?h.setInt8(u,g):t===Ke.UNSIGNED_BYTE&&h.setUint8(u,g),u+=a}u%c!==0&&(u+=c-u%c)}let d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:l};return r!==void 0&&(d.target=r),r===Ke.ARRAY_BUFFER&&(d.byteStride=c),this.byteOffset+=l,o.bufferViews.push(d),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,n=t.json;return n.bufferViews||(n.bufferViews=[]),new Promise(function(i){let r=new FileReader;r.readAsArrayBuffer(e),r.onloadend=function(){let o=_d(r.result),a={buffer:t.processBuffer(o),byteOffset:t.byteOffset,byteLength:o.byteLength};t.byteOffset+=o.byteLength,i(n.bufferViews.push(a)-1)}})}processAccessor(e,t,n,i){let r=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(e.array.constructor===Float32Array)a=Ke.FLOAT;else if(e.array.constructor===Int32Array)a=Ke.INT;else if(e.array.constructor===Uint32Array)a=Ke.UNSIGNED_INT;else if(e.array.constructor===Int16Array)a=Ke.SHORT;else if(e.array.constructor===Uint16Array)a=Ke.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)a=Ke.BYTE;else if(e.array.constructor===Uint8Array)a=Ke.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(n===void 0&&(n=0),(i===void 0||i===1/0)&&(i=e.count),i===0)return null;let c=yS(e,n,i),l;t!==void 0&&(l=e===t.index?Ke.ELEMENT_ARRAY_BUFFER:Ke.ARRAY_BUFFER);let h=this.processBufferView(e,a,n,i,l),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:i,max:c.max,min:c.min,type:o[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),r.accessors||(r.accessors=[]),r.accessors.push(u)-1}processImage(e,t,n,i="image/png"){if(e!==null){let r=this,o=r.cache,a=r.json,c=r.options,l=r.pending;o.images.has(e)||o.images.set(e,{});let h=o.images.get(e),u=i+":flipY/"+n.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);let d={mimeType:i},f=Rg();f.width=Math.min(e.width,c.maxTextureSize),f.height=Math.min(e.height,c.maxTextureSize);let m=f.getContext("2d",{willReadFrequently:!0});if(n===!0&&(m.translate(0,f.height),m.scale(1,-1)),e.data!==void 0){t!==Ut&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>c.maxTextureSize||e.height>c.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let g=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<g.length;p+=4)g[p+0]=e.data[p+0],g[p+1]=e.data[p+1],g[p+2]=e.data[p+2],g[p+3]=e.data[p+3];m.putImageData(new ImageData(g,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)m.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");c.binary===!0?l.push(vS(f,i).then(g=>r.processBufferViewImage(g)).then(g=>{d.bufferView=g})):d.uri=ps.getDataURL(f,i);let _=a.images.push(d)-1;return h[u]=_,_}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let n={magFilter:gn[e.magFilter],minFilter:gn[e.minFilter],wrapS:gn[e.wrapS],wrapT:gn[e.wrapT]};return t.samplers.push(n)-1}async processTextureAsync(e){let n=this.options,i=this.cache,r=this.json;if(i.textures.has(e))return i.textures.get(e);r.textures||(r.textures=[]),e instanceof Fn&&(e=await this.decompressTextureAsync(e,n.maxTextureSize));let o=e.userData.mimeType;o==="image/webp"&&(o="image/png");let a={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,o)};e.name&&(a.name=e.name),await this._invokeAllAsync(async function(l){l.writeTexture&&await l.writeTexture(e,a)});let c=r.textures.push(a)-1;return i.textures.set(e,c),c}async processMaterialAsync(e){let t=this.cache,n=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;n.materials||(n.materials=[]);let i={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let r=e.color.toArray().concat([e.opacity]);if(yc(r,[1,1,1,1])||(i.pbrMetallicRoughness.baseColorFactor=r),e.isMeshStandardMaterial?(i.pbrMetallicRoughness.metallicFactor=e.metalness,i.pbrMetallicRoughness.roughnessFactor=e.roughness):(i.pbrMetallicRoughness.metallicFactor=0,i.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let a=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),c={index:await this.processTextureAsync(a),texCoord:a.channel};this.applyTextureTransform(c,a),i.pbrMetallicRoughness.metallicRoughnessTexture=c}if(e.map){let a={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(a,e.map),i.pbrMetallicRoughness.baseColorTexture=a}if(e.emissive){let a=e.emissive;if(Math.max(a.r,a.g,a.b)>0&&(i.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let l={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(l,e.emissiveMap),i.emissiveTexture=l}}if(e.normalMap){let a={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(a.scale=e.normalScale.x),this.applyTextureTransform(a,e.normalMap),i.normalTexture=a}if(e.aoMap){let a={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(a.strength=e.aoMapIntensity),this.applyTextureTransform(a,e.aoMap),i.occlusionTexture=a}e.transparent?i.alphaMode="BLEND":e.alphaTest>0&&(i.alphaMode="MASK",i.alphaCutoff=e.alphaTest),e.side===Jt&&(i.doubleSided=!0),e.name!==""&&(i.name=e.name),this.serializeUserData(e,i),await this._invokeAllAsync(async function(a){a.writeMaterialAsync&&await a.writeMaterialAsync(e,i)});let o=n.materials.push(i)-1;return t.materials.set(e,o),o}async processMeshAsync(e){let t=this.cache,n=this.json,i=[e.geometry.uuid];if(Array.isArray(e.material))for(let x=0,T=e.material.length;x<T;x++)i.push(e.material[x].uuid);else i.push(e.material.uuid);let r=i.join(":");if(t.meshes.has(r))return t.meshes.get(r);let o=e.geometry,a;e.isLineSegments?a=Ke.LINES:e.isLineLoop?a=Ke.LINE_LOOP:e.isLine?a=Ke.LINE_STRIP:e.isPoints?a=Ke.POINTS:a=e.material.wireframe?Ke.LINES:Ke.TRIANGLES;let c={},l={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let m=null;for(let x in o.attributes){if(x.slice(0,5)==="morph")continue;let T=o.attributes[x];if(x=d[x]||x.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(x)||(x="_"+x),t.attributes.has(this.getUID(T))){l[x]=t.attributes.get(this.getUID(T));continue}m=null;let w=T.array;x==="JOINTS_0"&&!(w instanceof Uint16Array)&&!(w instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),m=new Je(new Uint16Array(w),T.itemSize,T.normalized)):(w instanceof Uint32Array||w instanceof Int32Array)&&!x.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${x}" converted to type FLOAT.`),m=Kr.Utils.toFloat32BufferAttribute(T));let C=this.processAccessor(m||T,o);C!==null&&(x.startsWith("_")||this.detectMeshQuantization(x,T),l[x]=C,t.attributes.set(this.getUID(T),C))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(l).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let x=[],T=[],E={};if(e.morphTargetDictionary!==void 0)for(let w in e.morphTargetDictionary)E[e.morphTargetDictionary[w]]=w;for(let w=0;w<e.morphTargetInfluences.length;++w){let C={},M=!1;for(let S in o.morphAttributes){if(S!=="position"&&S!=="normal"){M||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),M=!0);continue}let P=o.morphAttributes[S][w],U=S.toUpperCase(),B=o.attributes[S];if(t.attributes.has(this.getUID(P,!0))){C[U]=t.attributes.get(this.getUID(P,!0));continue}let k=P.clone();if(!o.morphTargetsRelative)for(let z=0,W=P.count;z<W;z++)for(let Q=0;Q<P.itemSize;Q++)Q===0&&k.setX(z,P.getX(z)-B.getX(z)),Q===1&&k.setY(z,P.getY(z)-B.getY(z)),Q===2&&k.setZ(z,P.getZ(z)-B.getZ(z)),Q===3&&k.setW(z,P.getW(z)-B.getW(z));C[U]=this.processAccessor(k,o),t.attributes.set(this.getUID(B,!0),C[U])}u.push(C),x.push(e.morphTargetInfluences[w]),e.morphTargetDictionary!==void 0&&T.push(E[w])}c.weights=x,T.length>0&&(c.extras={},c.extras.targetNames=T)}let _=Array.isArray(e.material);if(_&&o.groups.length===0)return null;let g=!1;if(_&&o.index===null){let x=[];for(let T=0,E=o.attributes.position.count;T<E;T++)x[T]=T;o.setIndex(x),g=!0}let p=_?e.material:[e.material],y=_?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let x=0,T=y.length;x<T;x++){let E={mode:a,attributes:l};if(this.serializeUserData(o,E),u.length>0&&(E.targets=u),o.index!==null){let C=this.getUID(o.index);(y[x].start!==void 0||y[x].count!==void 0)&&(C+=":"+y[x].start+":"+y[x].count),t.attributes.has(C)?E.indices=t.attributes.get(C):(E.indices=this.processAccessor(o.index,o,y[x].start,y[x].count),t.attributes.set(C,E.indices)),E.indices===null&&delete E.indices}let w=await this.processMaterialAsync(p[y[x].materialIndex]);w!==null&&(E.material=w),h.push(E)}g===!0&&o.setIndex(null),c.primitives=h,n.meshes||(n.meshes=[]),await this._invokeAllAsync(function(x){x.writeMesh&&x.writeMesh(e,c)});let v=n.meshes.push(c)-1;return t.meshes.set(r,v),v}detectMeshQuantization(e,t){if(this.extensionsUsed[gd])return;let n;switch(t.array.constructor){case Int8Array:n="byte";break;case Uint8Array:n="unsigned byte";break;case Int16Array:n="short";break;case Uint16Array:n="unsigned short";break;default:return}t.normalized&&(n+=" normalized");let i=e.split("_",1)[0];Tg[i]&&Tg[i].includes(n)&&(this.extensionsUsed[gd]=!0,this.extensionsRequired[gd]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let n=e.isOrthographicCamera,i={type:n?"orthographic":"perspective"};return n?i.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:i.perspective={aspectRatio:e.aspect,yfov:zn.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(i.name=e.type),t.cameras.push(i)-1}processAnimation(e,t){let n=this.json,i=this.nodeMap;n.animations||(n.animations=[]),e=Kr.Utils.mergeMorphTargetTracks(e.clone(),t);let r=e.tracks,o=[],a=[];for(let l=0;l<r.length;++l){let h=r[l],u=et.parseTrackName(h.name),d=et.findNode(t,u.nodeName),f=Eg[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let m=1,_=h.values.length/h.times.length;f===Eg.morphTargetInfluences&&(_/=d.morphTargetInfluences.length);let g;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(g="CUBICSPLINE",_/=3):h.getInterpolation()===Li?g="STEP":g="LINEAR",a.push({input:this.processAccessor(new Je(h.times,m)),output:this.processAccessor(new Je(h.values,_)),interpolation:g}),o.push({sampler:a.length-1,target:{node:i.get(d),path:f}})}let c={name:e.name||"clip_"+n.animations.length,samplers:a,channels:o};return this.serializeUserData(e,c),n.animations.push(c),n.animations.length-1}processSkin(e){let t=this.json,n=this.nodeMap,i=t.nodes[n.get(e)],r=e.skeleton;if(r===void 0)return null;let o=e.skeleton.bones[0];if(o===void 0)return null;let a=[],c=new Float32Array(r.bones.length*16),l=new Ue;for(let u=0;u<r.bones.length;++u)a.push(n.get(r.bones[u])),l.copy(r.boneInverses[u]),l.multiply(e.bindMatrix).toArray(c,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new Je(c,16)),joints:a,skeleton:n.get(o)}),i.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,n=this.options,i=this.nodeMap;t.nodes||(t.nodes=[]);let r={};if(n.trs){let a=e.quaternion.toArray(),c=e.position.toArray(),l=e.scale.toArray();yc(a,[0,0,0,1])||(r.rotation=a),yc(c,[0,0,0])||(r.translation=c),yc(l,[1,1,1])||(r.scale=l)}else e.matrixAutoUpdate&&e.updateMatrix(),xS(e.matrix)===!1&&(r.matrix=e.matrix.elements);if(e.name!==""&&(r.name=String(e.name)),this.serializeUserData(e,r),e.isMesh||e.isLine||e.isPoints){let a=await this.processMeshAsync(e);a!==null&&(r.mesh=a)}else e.isCamera&&(r.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let o=t.nodes.push(r)-1;if(i.set(e,o),e.children.length>0){let a=[];for(let c=0,l=e.children.length;c<l;c++){let h=e.children[c];if(h.visible||n.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(r.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(e,r)}),o}async processSceneAsync(e){let t=this.json,n=this.options;t.scenes||(t.scenes=[],t.scene=0);let i={};e.name!==""&&(i.name=e.name),t.scenes.push(i);let r=[];for(let o=0,a=e.children.length;o<a;o++){let c=e.children[o];if(c.visible||n.onlyVisible===!1){let l=await this.processNodeAsync(c);l!==null&&r.push(l)}}r.length>0&&(i.nodes=r),this.serializeUserData(e,i)}async processObjectsAsync(e){let t=new Ni;t.name="AuxScene";for(let n=0;n<e.length;n++)t.children.push(e[n]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(i){i.beforeParse&&i.beforeParse(e)});let n=[];for(let i=0;i<e.length;i++)e[i]instanceof Ni?await this.processSceneAsync(e[i]):n.push(e[i]);n.length>0&&await this.processObjectsAsync(n);for(let i=0;i<this.skins.length;++i)this.processSkin(this.skins[i]);for(let i=0;i<t.animations.length;++i)this.processAnimation(t.animations[i],e[0]);await this._invokeAllAsync(function(i){i.afterParse&&i.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,n=this.plugins.length;t<n;t++)await e(this.plugins[t])}},yd=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let n=this.writer,i=n.json,r=n.extensionsUsed,o={};e.name&&(o.name=e.name),o.color=e.color.toArray(),o.intensity=e.intensity,e.isDirectionalLight?o.type="directional":e.isPointLight?(o.type="point",e.distance>0&&(o.range=e.distance)):e.isSpotLight&&(o.type="spot",e.distance>0&&(o.range=e.distance),o.spot={},o.spot.innerConeAngle=(1-e.penumbra)*e.angle,o.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),r[this.name]||(i.extensions=i.extensions||{},i.extensions[this.name]={lights:[]},r[this.name]=!0);let a=i.extensions[this.name].lights;a.push(o),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}},vd=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let i=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},i[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Md=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let n=this.writer,i=n.extensionsUsed,r={};if(r.clearcoatFactor=e.clearcoat,e.clearcoatMap){let o={index:await n.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};n.applyTextureTransform(o,e.clearcoatMap),r.clearcoatTexture=o}if(r.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let o={index:await n.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};n.applyTextureTransform(o,e.clearcoatRoughnessMap),r.clearcoatRoughnessTexture=o}if(e.clearcoatNormalMap){let o={index:await n.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(o.scale=e.clearcoatNormalScale.x),n.applyTextureTransform(o,e.clearcoatNormalMap),r.clearcoatNormalTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Sd=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let i=this.writer.extensionsUsed,r={};r.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},bd=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let n=this.writer,i=n.extensionsUsed,r={};if(r.iridescenceFactor=e.iridescence,e.iridescenceMap){let o={index:await n.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};n.applyTextureTransform(o,e.iridescenceMap),r.iridescenceTexture=o}if(r.iridescenceIor=e.iridescenceIOR,r.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],r.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let o={index:await n.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};n.applyTextureTransform(o,e.iridescenceThicknessMap),r.iridescenceThicknessTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Td=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,r={};if(r.transmissionFactor=e.transmission,e.transmissionMap){let o={index:await n.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};n.applyTextureTransform(o,e.transmissionMap),r.transmissionTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Ed=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let n=this.writer,i=n.extensionsUsed,r={};if(r.thicknessFactor=e.thickness,e.thicknessMap){let o={index:await n.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};n.applyTextureTransform(o,e.thicknessMap),r.thicknessTexture=o}e.attenuationDistance!==1/0&&(r.attenuationDistance=e.attenuationDistance),r.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},wd=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let i=this.writer.extensionsUsed,r={};r.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Ad=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(fS)&&!e.specularIntensityMap&&!e.specularColorMap)return;let n=this.writer,i=n.extensionsUsed,r={};if(e.specularIntensityMap){let o={index:await n.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};n.applyTextureTransform(o,e.specularIntensityMap),r.specularTexture=o}if(e.specularColorMap){let o={index:await n.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};n.applyTextureTransform(o,e.specularColorMap),r.specularColorTexture=o}r.specularFactor=e.specularIntensity,r.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Rd=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let n=this.writer,i=n.extensionsUsed,r={};if(e.sheenRoughnessMap){let o={index:await n.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};n.applyTextureTransform(o,e.sheenRoughnessMap),r.sheenRoughnessTexture=o}if(e.sheenColorMap){let o={index:await n.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};n.applyTextureTransform(o,e.sheenColorMap),r.sheenColorTexture=o}r.sheenRoughnessFactor=e.sheenRoughness,r.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Cd=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let n=this.writer,i=n.extensionsUsed,r={};if(e.anisotropyMap){let o={index:await n.processTextureAsync(e.anisotropyMap)};n.applyTextureTransform(o,e.anisotropyMap),r.anisotropyTexture=o}r.anisotropyStrength=e.anisotropy,r.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Id=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let i=this.writer.extensionsUsed,r={};r.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Pd=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let n=this.writer,i=n.extensionsUsed,r={};if(e.bumpMap){let o={index:await n.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};n.applyTextureTransform(o,e.bumpMap),r.bumpTexture=o}r.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=r,i[this.name]=!0}},Ld=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let n=this.writer,i=e,r=new Float32Array(i.count*3),o=new Float32Array(i.count*4),a=new Float32Array(i.count*3),c=new Ue,l=new R,h=new At,u=new R;for(let f=0;f<i.count;f++)i.getMatrixAt(f,c),c.decompose(l,h,u),l.toArray(r,f*3),h.toArray(o,f*4),u.toArray(a,f*3);let d={TRANSLATION:n.processAccessor(new Je(r,3)),ROTATION:n.processAccessor(new Je(o,4)),SCALE:n.processAccessor(new Je(a,3))};i.instanceColor&&(d._COLOR_0=n.processAccessor(i.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},n.extensionsUsed[this.name]=!0,n.extensionsRequired[this.name]=!0}};Kr.Utils={insertKeyframe:function(s,e){let n=s.getValueSize(),i=new s.TimeBufferType(s.times.length+1),r=new s.ValueBufferType(s.values.length+n),o=s.createInterpolant(new s.ValueBufferType(n)),a;if(s.times.length===0){i[0]=e;for(let c=0;c<n;c++)r[c]=0;a=0}else if(e<s.times[0]){if(Math.abs(s.times[0]-e)<.001)return 0;i[0]=e,i.set(s.times,1),r.set(o.evaluate(e),0),r.set(s.values,n),a=0}else if(e>s.times[s.times.length-1]){if(Math.abs(s.times[s.times.length-1]-e)<.001)return s.times.length-1;i[i.length-1]=e,i.set(s.times,0),r.set(s.values,0),r.set(o.evaluate(e),s.values.length),a=i.length-1}else for(let c=0;c<s.times.length;c++){if(Math.abs(s.times[c]-e)<.001)return c;if(s.times[c]<e&&s.times[c+1]>e){i.set(s.times.slice(0,c+1),0),i[c+1]=e,i.set(s.times.slice(c+1),c+2),r.set(s.values.slice(0,(c+1)*n),0),r.set(o.evaluate(e),(c+1)*n),r.set(s.values.slice((c+1)*n),(c+2)*n),a=c+1;break}}return s.times=i,s.values=r,a},mergeMorphTargetTracks:function(s,e){let t=[],n={},i=s.tracks;for(let r=0;r<i.length;++r){let o=i[r],a=et.parseTrackName(o.name),c=et.findNode(e,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){t.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(us)}let l=c.morphTargetInfluences.length,h=c.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(n[c.uuid]===void 0){u=o.clone();let f=new u.ValueBufferType(l*u.times.length);for(let m=0;m<u.times.length;m++)f[m*l+h]=u.values[m];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=f,n[c.uuid]=u,t.push(u);continue}let d=o.createInterpolant(new o.ValueBufferType(1));u=n[c.uuid];for(let f=0;f<u.times.length;f++)u.values[f*l+h]=d.evaluate(u.times[f]);for(let f=0;f<o.times.length;f++){let m=this.insertKeyframe(u,o.times[f]);u.values[m*l+h]=o.values[f]}}return s.tracks=t,s},toFloat32BufferAttribute:function(s){let e=new Je(new Float32Array(s.count*s.itemSize),s.itemSize,!1);if(!s.normalized&&!s.isInterleavedBufferAttribute)return e.array.set(s.array),e;for(let t=0,n=s.count;t<n;t++)for(let i=0;i<s.itemSize;i++)e.setComponent(t,i,s.getComponent(t,i));return e}}});import{deflateSync as MS}from"node:zlib";import{createHash as SS}from"node:crypto";Jr();Jr();Jr();var _c=new R;function wn(s,e,t,n,i,r){let o=2*Math.PI*i/4,a=Math.max(r-2*i,0),c=Math.PI/4;_c.copy(e),_c[n]=0,_c.normalize();let l=.5*o/(o+a),h=1-_c.angleTo(s)/c;return Math.sign(_c[t])===1?h*l:a/(o+a)+l+l*(1-h)}var Vh=class s extends Sn{constructor(e=1,t=1,n=1,i=2,r=.1){let o=i*2+1;if(r=Math.min(e/2,t/2,n/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:n,segments:i,radius:r},o===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let c=new R,l=new R,h=new R(e,t,n).divideScalar(2).subScalar(r),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,_=new R,g=.5/o;for(let p=0,y=0;p<u.length;p+=3,y+=2)switch(c.fromArray(u,p),l.copy(c),l.x-=Math.sign(l.x)*g,l.y-=Math.sign(l.y)*g,l.z-=Math.sign(l.z)*g,l.normalize(),u[p+0]=h.x*Math.sign(c.x)+l.x*r,u[p+1]=h.y*Math.sign(c.y)+l.y*r,u[p+2]=h.z*Math.sign(c.z)+l.z*r,d[p+0]=l.x,d[p+1]=l.y,d[p+2]=l.z,Math.floor(p/m)){case 0:_.set(1,0,0),f[y+0]=wn(_,l,"z","y",r,n),f[y+1]=1-wn(_,l,"y","z",r,t);break;case 1:_.set(-1,0,0),f[y+0]=1-wn(_,l,"z","y",r,n),f[y+1]=1-wn(_,l,"y","z",r,t);break;case 2:_.set(0,1,0),f[y+0]=1-wn(_,l,"x","z",r,e),f[y+1]=wn(_,l,"z","x",r,n);break;case 3:_.set(0,-1,0),f[y+0]=1-wn(_,l,"x","z",r,e),f[y+1]=1-wn(_,l,"z","x",r,n);break;case 4:_.set(0,0,1),f[y+0]=1-wn(_,l,"x","y",r,e),f[y+1]=1-wn(_,l,"y","x",r,t);break;case 5:_.set(0,0,-1),f[y+0]=wn(_,l,"x","y",r,e),f[y+1]=1-wn(_,l,"y","x",r,t);break}}static fromJSON(e){return new s(e.width,e.height,e.depth,e.segments,e.radius)}};var yg=["box","rounded_box","sphere","cylinder","cone","pyramid","torus","capsule","plane","lathe","tube","sweep","extrude","heightfield"],Lt=(s,e,t)=>{let n=Math.round(Number(s??e));return Number.isFinite(n)?Math.max(t,Math.min(256,n)):e};function vg(s,e){switch(s){case"box":return new Sn(e.width??1,e.height??1,e.depth??1,Lt(e.segmentsX??e.segments,1,1),Lt(e.segmentsY??e.segments,1,1),Lt(e.segmentsZ??e.segments,1,1));case"rounded_box":{let t=e.width??1,n=e.height??1,i=e.depth??1,r=Math.min(t,n,i)/2,o=Math.min(Math.max(5e-4,e.radius??.1),r*.99);return new Vh(t,n,i,Lt(e.segments,4,1),o)}case"sphere":{let t=Lt(e.segments,48,3);return new zi(e.radius??.5,t,Math.max(2,Math.round(t/2)))}case"cylinder":{let t=e.radius??.5;return new Oi(e.radiusTop??t,e.radiusBottom??t,e.height??1,Lt(e.segments,32,3))}case"cone":return new ui(e.radius??.5,e.height??1,Lt(e.segments,32,3));case"pyramid":{let t=new ui(e.radius??.5,e.height??1,4);return t.rotateY(Math.PI/4),t}case"torus":return new As(e.radius??1,e.tube??.25,Lt(e.segments,24,3),Lt(e.segmentsTubular??e.segments,64,3));case"capsule":{let t=e.radius??.5;return new Ms(t,Math.max(.001,(e.height??1.5)-t*2),Lt(e.segments,12,3),Lt(e.segmentsRadial??e.segments,48,3))}case"plane":{let t=new di(e.width??1,e.height??1,Lt(e.segmentsX??e.segments,1,1),Lt(e.segmentsY??e.segments,1,1));return t.rotateX(-Math.PI/2),t}case"lathe":{let t=(e.points??[]).map(([n,i])=>new K(Math.max(0,n),i));if(t.length<2)throw new Error("lathe \u56FE\u5143\u81F3\u5C11\u9700\u8981 2 \u4E2A\u8F6E\u5ED3\u70B9\u3002");return new ws(t,Lt(e.segments,48,3))}case"tube":{let t=(e.points??[]).map(i=>new R(i[0],i[1],i[2]));if(t.length<2)throw new Error("tube \u56FE\u5143\u81F3\u5C11\u9700\u8981 2 \u4E2A\u8DEF\u5F84\u70B9\u3002");let n=new Bi(t,e.closed===1,"catmullrom",.5);return new Rs(n,Lt(e.tubularSegments??e.segments,64,4),e.radius??.02,Lt(e.radialSegments??e.segments,16,3))}case"sweep":{let t=(e.points??[]).map(g=>new R(g[0],g[1],g[2]));if(t.length<2)throw new Error("sweep \u56FE\u5143\u81F3\u5C11\u9700\u8981 2 \u4E2A\u8DEF\u5F84\u70B9\u3002");let n=e.closed===1,i=new Bi(t,n,"catmullrom",.5),r=e.profile??{},o=r.shape??"circle",a=[];if(o==="circle"){let g=r.radius??.05,p=Lt(r.segments,16,3);for(let y=0;y<p;y++){let v=y/p*Math.PI*2;a.push([Math.cos(v)*g,Math.sin(v)*g])}}else if(o==="rect"){let g=(r.width??.1)/2,p=(r.height??.1)/2;a=[[-g,-p],[g,-p],[g,p],[-g,p]]}else if(o==="polygon"){if(a=(r.points??[]).map(g=>[g[0],g[1]]),a.length<3)throw new Error("sweep polygon \u622A\u9762\u81F3\u5C11\u9700\u8981 3 \u4E2A\u70B9\u3002")}else throw new Error("sweep \u622A\u9762\u7C7B\u578B\u672A\u77E5\uFF1A"+o);let c=Lt(e.tubularSegments??e.segments,32,2),l=i.computeFrenetFrames(c,n),h=zn.degToRad(e.twistDeg??0),u=a.length,d=[],f=[],m=n?c:c+1;for(let g=0;g<m;g++){let p=g/c,y=i.getPointAt(Math.min(p,1)),v=l.normals[Math.min(g,c)],x=l.binormals[Math.min(g,c)],T=h*p,E=Math.cos(T),w=Math.sin(T);for(let[C,M]of a){let S=C*E-M*w,P=C*w+M*E;d.push(y.x+v.x*S+x.x*P,y.y+v.y*S+x.y*P,y.z+v.z*S+x.z*P)}}for(let g=0;g<c;g++)for(let p=0;p<u;p++){let y=g*u+p,v=g*u+(p+1)%u,x=(g+1)%m*u+p,T=(g+1)%m*u+(p+1)%u;f.push(y,x,v,v,x,T)}if(!n){let g=d.length/3,p=i.getPointAt(0);d.push(p.x,p.y,p.z);for(let T=0;T<u;T++)f.push(g,T,(T+1)%u);let y=i.getPointAt(1),v=d.length/3;d.push(y.x,y.y,y.z);let x=(m-1)*u;for(let T=0;T<u;T++)f.push(v,x+(T+1)%u,x+T)}let _=new ke;return _.setAttribute("position",new ye(d,3)),_.setIndex(f),_.computeVertexNormals(),_}case"extrude":{let t=(e.points??[]).map(a=>new K(a[0],a[1]));if(t.length<3)throw new Error("extrude \u622A\u9762\u81F3\u5C11\u9700\u8981 3 \u4E2A\u70B9\u3002");let n=new Mn(t),i=e.depth??.1,r=e.bevel===1,o=new Es(n,{depth:i,bevelEnabled:r,bevelThickness:e.bevelSize??.02,bevelSize:e.bevelSize??.02,bevelSegments:Lt(e.bevelSegments,2,1),curveSegments:12});return o.rotateX(Math.PI/2),o.translate(0,i,0),o}case"heightfield":{let t=e.width??1,n=e.depth??1,i=e.heights??[],r=i.length-1,o=(i[0]??[]).length-1;if(r<1||o<1)throw new Error("heightfield \u81F3\u5C11\u9700\u8981 2x2 \u9AD8\u5EA6\u7F51\u683C\u3002");let a=[];for(let u=0;u<=r;u++)for(let d=0;d<=o;d++)a.push((d/o-.5)*t,i[u][d]??0,(u/r-.5)*n);let c=[],l=o+1;for(let u=0;u<r;u++)for(let d=0;d<o;d++){let f=u*l+d;c.push(f,f+1,f+l,f+1,f+l+1,f+l)}let h=new ke;return h.setAttribute("position",new ye(a,3)),h.setIndex(c),h.computeVertexNormals(),h}default:throw new Error("\u672A\u77E5\u7684\u56FE\u5143\u7C7B\u578B\uFF1A"+s)}}function Hh(s){let e=Array.isArray(s.parts)?s.parts:[];if(!e.length)throw new Error("spec \u6A21\u578B\u6CA1\u6709\u56FE\u5143\u3002");let t=new Ln;for(let n=0;n<e.length;n++){let i=e[n],r=new ki({color:new de(i.color??"#9fb2c8"),metalness:i.metalness??.15,roughness:i.roughness??.55,side:Jt}),o=new pt(vg(i.primitive,i.params??{}),r);o.name=String(i.name||i.id||i.primitive),o.userData.specPartId=String(i.id??""),o.userData.specIndex=n,o.position.fromArray(Array.isArray(i.position)?i.position:[0,0,0]);let a=Array.isArray(i.rotationDeg)?i.rotationDeg:[0,0,0];o.rotation.set(zn.degToRad(a[0]),zn.degToRad(a[1]),zn.degToRad(a[2])),o.scale.fromArray(Array.isArray(i.scale)?i.scale:[1,1,1]),o.visible=i.visible!==!1,t.add(o)}return t}var st=(s,e=5)=>Number(Number(s).toFixed(e)),Xh=(s,e,t)=>Math.min(t,Math.max(e,s));function md(s){let e=Hh(s);e.updateMatrixWorld(!0);let t=[],n={minx:1/0,maxx:-1/0,miny:1/0,maxy:-1/0,minz:1/0,maxz:-1/0},i=new R,r=new R,o=new ze,a=0;for(let c of e.children){if(!c.isMesh||!c.geometry?.attributes?.position)continue;let l=c.geometry,h=l.attributes.position,u=l.attributes.normal,d=l.index?l.index.array:null,f=d?d.length:h.count,m=Math.floor(f/3),_=new Float32Array(m*9),g=u?new Float32Array(m*9):null;o.getNormalMatrix(c.matrixWorld);let p={minx:1/0,maxx:-1/0,miny:1/0,maxy:-1/0,minz:1/0,maxz:-1/0},y=0;for(let T=0;T<m*3;T+=3){for(let E=0;E<3;E++){let w=d?d[T+E]:T+E;i.fromBufferAttribute(h,w).applyMatrix4(c.matrixWorld),_[y*9+E*3]=i.x,_[y*9+E*3+1]=i.y,_[y*9+E*3+2]=i.z,g&&(r.fromBufferAttribute(u,w).applyMatrix3(o).normalize(),g[y*9+E*3]=r.x,g[y*9+E*3+1]=r.y,g[y*9+E*3+2]=r.z);for(let C of["x","y","z"]){let M=i[C];M<p["min"+C]&&(p["min"+C]=M),M>p["max"+C]&&(p["max"+C]=M),M<n["min"+C]&&(n["min"+C]=M),M>n["max"+C]&&(n["max"+C]=M)}}y++}let v=s.parts?.[c.userData.specIndex]??{},x=new de(c.material?.color??10465992);t.push({id:String(c.userData.specPartId||v.id||c.name||String(t.length)),name:c.name||v.name||"",primitive:v.primitive??"",tris:_,nrm:g,triCount:y,bb:p,visible:c.visible!==!1,color:[Math.round(x.r*255),Math.round(x.g*255),Math.round(x.b*255)]}),a+=y}return e.traverse(c=>{c.geometry?.dispose?.()}),e.traverse(c=>{c.material?.dispose?.()}),{parts:t,bb:n,triCount:a,empty:!t.length||!a,finite:Number.isFinite(n.minx)}}var _i={top:{f:[0,-1,0],up0:[0,0,-1],uAxis:"x",uSign:1,atAxis:"z",atSign:-1,desc:"\u4FEF\u89C6\uFF1A\u6A2A=x \u7EB5=z"},front:{f:[0,0,1],up0:[0,1,0],uAxis:"x",uSign:1,atAxis:"y",atSign:1,desc:"\u6B63\u89C6\uFF1A\u6A2A=x \u7EB5=y"},side:{f:[-1,0,0],up0:[0,1,0],uAxis:"z",uSign:-1,atAxis:"y",atSign:1,desc:"\u4FA7\u89C6\uFF08\u4ECE -X \u770B\uFF09\uFF1A\u6A2A=z \u7EB5=y"},rear:{f:[0,0,-1],up0:[0,1,0],uAxis:"x",uSign:-1,atAxis:"y",atSign:1,desc:"\u80CC\u89C6\uFF1A\u6A2A=x \u7EB5=y"},left:{f:[1,0,0],up0:[0,1,0],uAxis:"z",uSign:1,atAxis:"y",atSign:1,desc:"\u4FA7\u89C6\uFF08\u4ECE +X \u770B\uFF09\uFF1A\u6A2A=z \u7EB5=y"},iso:{f:[-1,-1,-1],up0:[0,1,0],uAxis:null,atAxis:null,desc:"\u7B49\u8F74\u6D4B"}};function lS(s){let e=_i[s]??_i.iso,t=new R(...e.f).normalize(),n=new R(...e.up0??[0,1,0]),i=new R().crossVectors(t,n);i.lengthSq()<1e-9&&(n.set(0,0,1),i=new R().crossVectors(t,n)),i.normalize();let r=new R().crossVectors(i,t).normalize();return{f:t,right:i,up:r,meta:e}}function Yh(s,e,t=256,n=.06){let{f:i,right:r,up:o,meta:a}=lS(e),c=s.parts.filter(w=>w.visible),l=(w,C,M)=>[w*r.x+C*r.y+M*r.z,w*o.x+C*o.y+M*o.z,w*i.x+C*i.y+M*i.z],h=1/0,u=-1/0,d=1/0,f=-1/0;for(let w of c)for(let C of[w.bb.minx,w.bb.maxx])for(let M of[w.bb.miny,w.bb.maxy])for(let S of[w.bb.minz,w.bb.maxz]){let[P,U]=l(C,M,S);!Number.isFinite(P)||!Number.isFinite(U)||(P<h&&(h=P),P>u&&(u=P),U<d&&(d=U),U>f&&(f=U))}Number.isFinite(h)||(h=-1,u=1,d=-1,f=1);let m=Math.max(u-h,f-d)/2||1,_=(h+u)/2,g=(d+f)/2,p=t/2*(1-n)/m,y=new Float32Array(t*t).fill(1/0),v=new Uint8Array(t*t*3),x=new Uint8Array(t*t),T=new R(-.35,.85,.4).normalize();for(let w of c)for(let C=0;C<w.triCount;C++){let M=C*9,S=l(w.tris[M],w.tris[M+1],w.tris[M+2]),P=l(w.tris[M+3],w.tris[M+4],w.tris[M+5]),U=l(w.tris[M+6],w.tris[M+7],w.tris[M+8]),B=(S[0]-_)*p+t/2,k=t/2-(S[1]-g)*p,z=(P[0]-_)*p+t/2,W=t/2-(P[1]-g)*p,Q=(U[0]-_)*p+t/2,G=t/2-(U[1]-g)*p,he=Math.max(0,Math.floor(Math.min(B,z,Q))),me=Math.min(t-1,Math.ceil(Math.max(B,z,Q))),Me=Math.max(0,Math.floor(Math.min(k,W,G))),Ve=Math.min(t-1,Math.ceil(Math.max(k,W,G)));if(me<he||Ve<Me)continue;let $e=(W-k)*(Q-B)-(z-B)*(G-k);if(Math.abs($e)<1e-9)continue;let rt=1/$e,je=.5;if(w.nrm){let ve=w.nrm[M]+w.nrm[M+3]+w.nrm[M+6],qe=w.nrm[M+1]+w.nrm[M+4]+w.nrm[M+7],nt=w.nrm[M+2]+w.nrm[M+5]+w.nrm[M+8],L=Math.hypot(ve,qe,nt)||1;je=Math.abs((ve*T.x+qe*T.y+nt*T.z)/L)}let Y=.26+.74*Math.pow(je,.75),te=Xh(Math.round(w.color[0]*Y),0,255),Se=Xh(Math.round(w.color[1]*Y),0,255),Ie=Xh(Math.round(w.color[2]*Y),0,255);for(let ve=Me;ve<=Ve;ve++){let qe=ve*t;for(let nt=he;nt<=me;nt++){let L=nt+.5,ee=ve+.5,$=((W-ee)*(Q-L)-(z-L)*(G-ee))*rt;if($<0||$>1)continue;let Z=((ee-k)*(Q-B)-(L-B)*(G-k))*rt;if(Z<0||Z>1)continue;let J=1-$-Z;if(J<0||J>1)continue;let le=$*S[2]+Z*P[2]+J*U[2],ie=qe+nt;le<y[ie]&&(y[ie]=le,x[ie]=1,v[ie*3]=te,v[ie*3+1]=Se,v[ie*3+2]=Ie)}}}return{size:t,depth:y,rgb:v,cover:x,right:r,up:o,f:i,meta:a,scale:p,midU:_,midV:g,toWorld:(w,C)=>[((w-t/2)/p+_)*r.x+((t/2-C)/p+g)*o.x,((w-t/2)/p+_)*r.y+((t/2-C)/p+g)*o.y,((w-t/2)/p+_)*r.z+((t/2-C)/p+g)*o.z]}}function sn(s,e,t=24){let n=_i[e]??_i.iso;if(!n.atAxis||!n.uAxis)return[];let i=Math.max(128,t*8),r=Yh(s,e,i),{cover:o,scale:a,midU:c,midV:l}=r,h=n.atAxis,u=n.uAxis,d=n.atSign,f=n.uSign,m=s.bb["min"+h],g=s.bb["max"+h]-m||1,p=Array.from({length:t},()=>({min:1/0,max:-1/0,hit:!1})),y=1/a;for(let v=0;v<i;v++){let x=d*((i/2-v)*y+l),T=Math.floor((x-m)/g*t);if(T<0||T>=t)continue;let E=1/0,w=-1/0,C=!1,M=v*i;for(let S=0;S<i;S++){if(!o[M+S])continue;let P=f*((S-i/2)*y+c);C=!0,P<E&&(E=P),P>w&&(w=P)}if(C){let S=p[T];S.min=Math.min(S.min,E-.5*y),S.max=Math.max(S.max,w+.5*y),S.hit=!0}}return p.map((v,x)=>({at:st(m+g*(x+.5)/t,5),width:v.hit?st(v.max-v.min,5):0,center:v.hit?st((v.min+v.max)/2,5):null,min:v.hit?st(v.min,5):null,max:v.hit?st(v.max,5):null}))}var qh=s=>({minx:Math.min(s[0],s[3],s[6]),maxx:Math.max(s[0],s[3],s[6]),miny:Math.min(s[1],s[4],s[7]),maxy:Math.max(s[1],s[4],s[7]),minz:Math.min(s[2],s[5],s[8]),maxz:Math.max(s[2],s[5],s[8])}),$r=(s,e)=>s[0]*e[0]+s[1]*e[1]+s[2]*e[2],Gh=(s,e)=>[s[1]*e[2]-s[2]*e[1],s[2]*e[0]-s[0]*e[2],s[0]*e[1]-s[1]*e[0]],Mg=(s,e)=>!(s.maxx<e.minx||e.maxx<s.minx||s.maxy<e.miny||e.maxy<s.miny||s.maxz<e.minz||e.maxz<s.minz);function hS(s,e){let t=qh(s),n=qh(e);if(!Mg(t,n))return!1;let i=[s[3]-s[0],s[4]-s[1],s[5]-s[2]],r=[s[6]-s[0],s[7]-s[1],s[8]-s[2]],o=[e[3]-e[0],e[4]-e[1],e[5]-e[2]],a=[e[6]-e[0],e[7]-e[1],e[8]-e[2]],c=[Gh(i,o),Gh(i,a),Gh(r,o),Gh(r,a),i,r,o,a];for(let l of c){if(Math.abs(l[0])<1e-12&&Math.abs(l[1])<1e-12&&Math.abs(l[2])<1e-12)continue;let h=[$r([s[0],s[1],s[2]],l),$r([s[3],s[4],s[5]],l),$r([s[6],s[7],s[8]],l)],u=[$r([e[0],e[1],e[2]],l),$r([e[3],e[4],e[5]],l),$r([e[6],e[7],e[8]],l)];if(Math.max(...h)<Math.min(...u)||Math.max(...u)<Math.min(...h))return!1}return!0}function xc(s,{exact:e=!1,budget:t=15e4}={}){let n=s.parts.filter(r=>r.visible),i=[];for(let r=0;r<n.length;r++)for(let o=r+1;o<n.length;o++){let a=n[r],c=n[o];if(!Mg(a.bb,c.bb))continue;let l=Math.max(0,Math.min(a.bb.maxx,c.bb.maxx)-Math.max(a.bb.minx,c.bb.minx))*Math.max(0,Math.min(a.bb.maxy,c.bb.maxy)-Math.max(a.bb.miny,c.bb.miny))*Math.max(0,Math.min(a.bb.maxz,c.bb.maxz)-Math.max(a.bb.minz,c.bb.minz)),h={a:a.id,b:c.id,mode:"aabb",overlapMm3:st(l*1e9,1)},u=Math.max(1e-4,Math.max(s.bb.maxx-s.bb.minx,s.bb.maxz-s.bb.minz)/24),d=new Map;for(let g=0;g<a.triCount;g++){let p=g*9,y=qh([a.tris[p],a.tris[p+1],a.tris[p+2],a.tris[p+3],a.tris[p+4],a.tris[p+5],a.tris[p+6],a.tris[p+7],a.tris[p+8]]);for(let v=Math.floor(y.minx/u);v<=Math.floor(y.maxx/u);v++)for(let x=Math.floor(y.miny/u);x<=Math.floor(y.maxy/u);x++)for(let T=Math.floor(y.minz/u);T<=Math.floor(y.maxz/u);T++){let E=v+","+x+","+T,w=d.get(E);w?w.push(g):d.set(E,[g])}}let f=0,m=0,_=!1;if(e){e:for(let g=0;g<c.triCount;g++){let p=g*9,y=qh([c.tris[p],c.tris[p+1],c.tris[p+2],c.tris[p+3],c.tris[p+4],c.tris[p+5],c.tris[p+6],c.tris[p+7],c.tris[p+8]]),v=new Set;for(let x=Math.floor(y.minx/u);x<=Math.floor(y.maxx/u);x++)for(let T=Math.floor(y.miny/u);T<=Math.floor(y.maxy/u);T++)for(let E=Math.floor(y.minz/u);E<=Math.floor(y.maxz/u);E++)for(let w of d.get(x+","+T+","+E)??[]){if(v.has(w))continue;if(v.add(w),++f>t){_=!0;break e}let C=w*9;hS([a.tris[C],a.tris[C+1],a.tris[C+2],a.tris[C+3],a.tris[C+4],a.tris[C+5],a.tris[C+6],a.tris[C+7],a.tris[C+8]],[c.tris[p],c.tris[p+1],c.tris[p+2],c.tris[p+3],c.tris[p+4],c.tris[p+5],c.tris[p+6],c.tris[p+7],c.tris[p+8]])&&m++}}_?h.mode="aabb-capped":h.mode="exact",h.triPairs=m,h.tests=f}i.push(h)}return i}function Sg(s,e,{detail:t=!1,bins:n=16}={}){let i=[s.bb.maxx-s.bb.minx,s.bb.maxy-s.bb.miny,s.bb.maxz-s.bb.minz],r={bbox:{min:[st(s.bb.minx),st(s.bb.miny),st(s.bb.minz)],max:[st(s.bb.maxx),st(s.bb.maxy),st(s.bb.maxz)]},sizeMm:i.map(o=>st(o*1e3,2)),triCount:s.triCount,partCount:s.parts.length,ground:{minY:st(s.bb.miny,6),maxY:st(s.bb.maxy,6)},silhouette:{top:sn(s,"top",n),side:sn(s,"side",n)}};return t&&(r.parts=s.parts.map((o,a)=>({id:o.id,name:o.name,primitive:o.primitive||e.parts?.[a]?.primitive||"",triCount:o.triCount,visible:o.visible,bboxMin:[st(o.bb.minx),st(o.bb.miny),st(o.bb.minz)],bboxMax:[st(o.bb.maxx),st(o.bb.maxy),st(o.bb.maxz)],sizeMm:[st((o.bb.maxx-o.bb.minx)*1e3,2),st((o.bb.maxy-o.bb.miny)*1e3,2),st((o.bb.maxz-o.bb.minz)*1e3,2)],center:[st((o.bb.minx+o.bb.maxx)/2),st((o.bb.miny+o.bb.maxy)/2),st((o.bb.minz+o.bb.maxz)/2)]})),r.overlaps=xc(s,{exact:!1}),r.silhouette.topFine=sn(s,"top",40),r.silhouette.sideFine=sn(s,"side",40)),r}var uS=(s,e)=>{if(!s.length)return 0;if(e<=s[0].at)return s[0].width;let t=s[s.length-1];if(e>=t.at)return t.width;for(let n=1;n<s.length;n++)if(s[n].at>=e){let i=s[n-1],r=s[n],o=(e-i.at)/(r.at-i.at||1);return i.width+(r.width-i.width)*o}return t.width};function Zh(s,e){let t=0;for(let n of e.results??[]){if(n.ok)continue;let i=n.measured;n.gate==="dimension"?["x","y","z"].forEach((o,a)=>{let c=s.dimension?.[o];if(c===void 0)return;let l=typeof c=="object"?c.value:c;t+=Math.abs((i[a]??0)-l*1e3)/1e3}):n.gate.startsWith("silhouette")?t+=Math.abs(i.worstErrMm??0)/1e3+(i.rms??0)/1e3:n.gate==="ground"?t+=Math.abs(Math.min(0,i??0)):t+=.05}return t+.01*(e.results??[]).filter(n=>!n.ok).length}function Jh(s,e,t={},n={}){let i=[],r=(a,c,l,h,u)=>i.push({gate:a,ok:c,measured:l,expected:h,note:u??""}),o=n.bins??24;if(t.dimension){let a=t.dimension,c=[s.bb.maxx-s.bb.minx,s.bb.maxy-s.bb.miny,s.bb.maxz-s.bb.minz],l=[],h={};for(let[u,d]of[["x",0],["y",1],["z",2]]){let f=a[u];if(f===void 0)continue;let m=typeof f=="object"?f:{value:f,tol:a.tol??.002};h[u]={value:m.value,tol:m.tol??.002},Math.abs(c[d]-m.value)>(m.tol??.002)&&l.push(`${u} ${(c[d]*1e3).toFixed(1)}mm \u2260 ${(m.value*1e3).toFixed(1)}\xB1${((m.tol??.002)*1e3).toFixed(1)}mm`)}r("dimension",!l.length,c.map(u=>st(u*1e3,2)),h,l.join("; "))}if(t.ground){let a=t.ground.tol??5e-4,c=s.bb.miny;r("ground",c>=-a,st(c,6),{minY:0,tol:a},c<-a?`\u6700\u4F4E\u70B9 ${(c*1e3).toFixed(2)}mm \u7A7F\u5730`:"")}if(t.silhouette)for(let[a,c]of Object.entries(t.silhouette)){let l=c.view??"top",h=n.samples?.[l]??sn(s,l,o),u=(c.points??[]).map(_=>{let g=st(uS(h,_.at),5);return{at:_.at,want:_.width,got:g,err:st(g-_.width,5)}}),d=c.tol??.003,f=u.reduce((_,g)=>Math.abs(g.err)>Math.abs(_?.err??0)?g:_,null),m=u.length?Math.sqrt(u.reduce((_,g)=>_+g.err*g.err,0)/u.length):0;r(`silhouette:${a}`,u.length>0&&Math.abs(f?.err??1)<=d,{worstAt:f?.at??null,worstErrMm:f?st(f.err*1e3,2):null,rmsMm:st(m*1e3,2)},{view:l,tol:d,points:u.length},f&&Math.abs(f.err)>d?`${l} @${f.at}\uFF1A\u5B9E\u6D4B ${(f.got*1e3).toFixed(1)}mm / \u76EE\u6807 ${(f.want*1e3).toFixed(1)}mm\uFF0C\u5DEE ${(f.err*1e3).toFixed(1)}mm`:"")}if(t.clearance){let a=t.clearance,c=n.overlaps??xc(s,{exact:a.mode==="exact",budget:a.budget??15e4}),l=new Set((a.allow??[]).map(_=>[_.a,_.b].sort().join("|"))),h=c.filter(_=>_.mode==="aabb-capped"),u=a.minPairs??1,d=a.minMm3??25,f=c.filter(_=>l.has([_.a,_.b].sort().join("|"))?!1:_.mode==="exact"?(_.triPairs??0)>=u:(_.overlapMm3??0)>=d),m=c.filter(_=>_.triPairs!==void 0&&a.maxTriPairs!==void 0&&_.triPairs>a.maxTriPairs);r("clearance",!f.length&&!m.length,{conflicts:f.map(_=>`${_.a}\xD7${_.b}(${_.mode==="exact"?_.triPairs+"\u5BF9\u76F8\u4EA4\u9762":_.overlapMm3+"mm\xB3\u5D4C\u5165"})`),heavy:m.map(_=>`${_.a}\xD7${_.b}:${_.triPairs}`),contacts:c.length-f.length},{mode:a.mode??"aabb",allow:l.size,minPairs:u,minMm3:d,maxTriPairs:a.maxTriPairs??null},f.length?`\u672A\u767B\u8BB0\u7684\u5B9E\u4F53\u51B2\u7A81\uFF1A${f.map(_=>`${_.a}\xD7${_.b}`).join(", ")}`:h.length?`${h.length} \u5BF9\u8D85\u51FA\u7CBE\u786E\u68C0\u6D4B\u9884\u7B97\uFF08\u5DF2\u6309 AABB \u5224\u5B9A\uFF0C\u53EF\u63D0\u9AD8 budget\uFF09`:"")}if(t.parts){let a=s.parts.reduce((l,h)=>(l[h.primitive]=(l[h.primitive]??0)+1,l),{}),c=Object.entries(t.parts).filter(([l,h])=>(a[l]??0)!==h).map(([l,h])=>`${l}=${a[l]??0}\u2260${h}`);r("parts",!c.length,a,t.parts,c.join("; "))}if(t.custom)for(let[a,c]of Object.entries(t.custom)){let l=Number(c.measured),h=c.min!==void 0?l>=c.min:c.max!==void 0?l<=c.max:Math.abs(l-(c.value??0))<=(c.tol??0);r(`custom:${a}`,h,l,{value:c.value??null,min:c.min??null,max:c.max??null},c.note??"")}return{ok:i.every(a=>a.ok),results:i}}var Wh=(s,e)=>e.split(".").reduce((t,n)=>t==null?void 0:Array.isArray(t)?t[Number(n)]:t[n],s),dd=(s,e,t)=>{let n=e.split("."),i=s;for(let o=0;o<n.length-1;o++)i=Array.isArray(i)?i[Number(n[o])]:i[n[o]];let r=n[n.length-1];Array.isArray(i)?i[Number(r)]=t:i[r]=t},pd=s=>typeof structuredClone=="function"?structuredClone(s):JSON.parse(JSON.stringify(s));function bg(s,e,{vars:t=[],budget:n=20,bins:i=16,seed:r=1}={}){let o=r>>>0||1,a=()=>(o=o*1664525+1013904223>>>0)/4294967296,c=0,l=f=>{let m=md(f),_=Jh(m,f,e,{bins:i,samples:{top:sn(m,"top",i),side:sn(m,"side",i)},overlaps:[]});return c++,{ok:_.ok,err:Zh(e,_),results:_.results}},h=f=>{let m=Math.min(f.min,f.max),_=Math.max(f.min,f.max);return g=>Xh(g,m,_)},u=pd(s);for(let f of t)dd(u,f.path,h(f)(f.start??Wh(s,f.path)));let d=l(u);for(let f=0;f<n&&!d.ok;f++){let m=pd(s);for(let g of t)dd(m,g.path,h(g)(g.min+a()*(g.max-g.min)));let _=l(m);_.err<d.err&&(d=_,u=m)}for(let f=0;f<3&&!d.ok;f++)for(let m of t){let _=Wh(u,m.path);if(typeof _!="number")continue;let g=(m.max-m.min)*[.15,.05,.015][f];for(let p of[-g,g]){let y=pd(u);dd(y,m.path,h(m)(_+p));let v=l(y);v.err<d.err&&(d=v,u=y)}}return{ok:d.ok,err:st(d.err,5),steps:c,values:t.map(f=>({path:f.path,from:Wh(s,f.path),to:Wh(u,f.path)})),results:d.results,spec:u}}var Lg="0.6.0",vc=(s,e=5)=>Number(Number(s).toFixed(e)),Kn=new Map,Dg=8;function Ug(s){return SS("sha1").update(bS(s)).digest("hex").slice(0,16)}function bS(s){let e=t=>Array.isArray(t)?"["+t.map(e).join(",")+"]":t&&typeof t=="object"?"{"+Object.keys(t).sort().map(n=>JSON.stringify(n)+":"+e(t[n])).join(",")+"}":typeof t=="number"?Number.isFinite(t)?String(Math.round(t*1e6)/1e6):"null":JSON.stringify(t??null);return e(s)}function Dd(s,{refresh:e=!1}={}){let t=Ug(s);if(!e&&Kn.has(t)){let i=Kn.get(t);return Kn.delete(t),Kn.set(t,i),{...i,key:t,cached:!0}}let n=md(s);for(n.key=t,Kn.set(t,n);Kn.size>Dg;)Kn.delete(Kn.keys().next().value);return{...n,key:t,cached:!1}}function WS(){return{size:Kn.size,max:Dg}}function XS(){Kn.clear()}function Mc(s){if(!Mc.table){Mc.table=new Int32Array(256);for(let t=0;t<256;t++){let n=t;for(let i=0;i<8;i++)n=n&1?3988292384^n>>>1:n>>>1;Mc.table[t]=n}}let e=4294967295;for(let t=0;t<s.length;t++)e=Mc.table[(e^s[t])&255]^e>>>8;return(e^4294967295)>>>0}function Ng(s,e,t=null){let n=s*3+1,i=Buffer.alloc(s*n);for(let c=0;c<s;c++){i[c*n]=0;for(let l=0;l<s;l++){let h=c*s+l,u=c*n+1+l*3,d=e[h*3]===0&&e[h*3+1]===0&&e[h*3+2]===0,f=t&&d?t:null;i[u]=f?f[0]:e[h*3],i[u+1]=f?f[1]:e[h*3+1],i[u+2]=f?f[2]:e[h*3+2]}}let r=[],o=(c,l)=>{let h=Buffer.alloc(4);h.writeUInt32BE(l.length);let u=Buffer.concat([Buffer.from(c,"ascii"),l]),d=Buffer.alloc(4);d.writeUInt32BE(Mc(u)),r.push(h,u,d)},a=Buffer.alloc(13);return a.writeUInt32BE(s,0),a.writeUInt32BE(s,4),a[8]=8,a[9]=2,a[10]=0,a[11]=0,a[12]=0,o("IHDR",a),o("IDAT",MS(i,{level:6})),o("IEND",Buffer.alloc(0)),Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),...r])}function TS(s){let{size:e,cover:t,rgb:n}=s,i=Uint8Array.from(n);for(let r=1;r<e-1;r++)for(let o=1;o<e-1;o++){let a=r*e+o;t[a]&&(t[a-1]&&t[a+1]&&t[a-e]&&t[a+e]||(i[a*3]=235,i[a*3+1]=70,i[a*3+2]=70))}return i}function ES(s,{mode:e="summary",views:t=[],size:n=256,bins:i=16,gates:r=null,exactOverlap:o=!1}={}){let a=Dd(s);if(a.empty)throw new Error("spec \u672A\u4EA7\u751F\u4EFB\u4F55\u4E09\u89D2\u5F62\u3002");let c=r??s.gates,l=e==="full",h={kernel:Lg,hash:a.key,cached:a.cached,mode:e,numeric:Sg(a,s,{detail:l,bins:i})};if(c){let u={top:sn(a,"top",32),side:sn(a,"side",32)},d=Jh(a,s,c,{samples:u,overlaps:xc(a,{exact:o})});h.gates=d,h.gateError=vc(Zh(c,d),5)}return t.length&&(h.images=t.map(u=>{if(!_i[u])throw new Error("\u672A\u77E5\u89C6\u56FE "+u+"\uFF0C\u53EF\u7528\uFF1A"+Object.keys(_i).join("/"));let d=Yh(a,u,n),f=Ng(n,d.rgb,[250,250,252]);return{view:u,size:n,desc:_i[u].desc,bytes:f.length,base64:f.toString("base64")}})),e==="outline"&&(h.outline={top:sn(a,"top",40),side:sn(a,"side",40)}),h}function wS(s,e="top",t=320){let n=Dd(s),i=Yh(n,e,t),r=Ng(t,TS(i),[250,250,252]);return{view:e,size:t,bytes:r.length,base64:r.toString("base64")}}function Fg(s,e,{bins:t=24,exact:n=!1,budget:i=15e4}={}){let r=Dd(s),o=e??s.gates??{},a={top:sn(r,"top",t),side:sn(r,"side",t)},c=Jh(r,s,o,{bins:t,samples:a,overlaps:xc(r,{exact:n,budget:i})});return{...c,err:vc(Zh(o,c),5),hash:r.key,sizeMm:[vc((r.bb.maxx-r.bb.minx)*1e3,2),vc((r.bb.maxy-r.bb.miny)*1e3,2),vc((r.bb.maxz-r.bb.minz)*1e3,2)]}}function qS(s,{gates:e,vars:t,budget:n=20,bins:i=16,seed:r=1}={}){let o=e??s.gates;if(!o)throw new Error("optimize \u9700\u8981 gates\uFF08\u6216 spec.gates\uFF09\u4F5C\u4E3A\u76EE\u6807\u51FD\u6570\u3002");if(!t?.length)throw new Error("optimize \u9700\u8981 vars\uFF1A[{path, min, max, start}]\u3002");let a=bg(s,o,{vars:t,budget:n,bins:i,seed:r}),c=Fg(a.spec,o,{bins:i});return{ok:a.ok,err:a.err,steps:a.steps,values:a.values,results:c.results,check:c,hash:Ug(a.spec),spec:a.spec}}function AS(){if(globalThis.FileReader)return;class s{#e(t){this.result=t;let n={target:this};this.onload?.(n),this.onloadend?.(n)}readAsArrayBuffer(t){t.arrayBuffer().then(n=>this.#e(n))}readAsText(t){t.text().then(n=>this.#e(n))}readAsDataURL(t){t.arrayBuffer().then(n=>this.#e("data:application/octet-stream;base64,"+Buffer.from(n).toString("base64")))}}globalThis.FileReader=s}async function RS(s){AS();let e=await Promise.resolve().then(()=>(Jr(),kh)),{GLTFExporter:t}=await Promise.resolve().then(()=>(Pg(),Ig)),n=new e.Group;n.name="model-studio-plate";for(let r of s){let o=Hh(r.spec);o.name=String(r.name??"item");let a=Array.isArray(r.position)?r.position:[0,0,0],c=Array.isArray(r.rotationDeg)?r.rotationDeg:[0,0,0],l=Array.isArray(r.scale)?r.scale:[1,1,1];o.position.fromArray(a),o.rotation.set(e.MathUtils.degToRad(c[0]),e.MathUtils.degToRad(c[1]),e.MathUtils.degToRad(c[2])),o.scale.fromArray(l),o.visible=r.visible!==!1,n.add(o)}let i=await new t().parseAsync(n,{binary:!0,onlyVisible:!1});return n.traverse(r=>{r.geometry?.dispose?.(),r.material?.dispose?.()}),Buffer.from(i)}async function YS(s){return RS([{spec:s,name:s?.name??"model"}])}if(process.argv[1]?.replace(/\\/g,"/").endsWith("src/kernel.mjs")){let[,,s,e]=process.argv,t=e?JSON.parse((await import("node:fs")).readFileSync(e,"utf8")):null;if(s==="inspect")console.log(JSON.stringify(ES(t,{mode:"full",bins:20}),null,2));else if(s==="check")console.log(JSON.stringify(Fg(t,t.gates),null,2));else if(s==="png"){let n=await import("node:fs"),i=wS(t,"top",320);n.writeFileSync(e.replace(/\.json$/,"-top.png"),Buffer.from(i.base64,"base64")),console.log("png",i.bytes,"bytes")}else console.log(JSON.stringify({KERNEL_VERSION:Lg,primitives:yg,views:Object.keys(_i)},null,2))}export{Lg as KERNEL_VERSION,yg as SPEC_PRIMITIVES,_i as VIEWS,Hh as buildSpecModel,WS as cacheStats,Fg as check,Jh as checkGates,XS as clearCache,md as flatten,Zh as gateError,ES as inspect,Dd as modelOf,qS as optimize,wS as outlinePng,xc as overlaps,Ng as pngFromRgb,Yh as renderView,bg as searchParams,sn as sectionWidths,vg as specGeometry,Ug as specHash,Sg as summarize,YS as toGlb,RS as toGlbMulti};
