class Vector {
	//float x;
	//float y;
	constructor(a, b, angleInit) {
		if(arguments.length==3){
			if(angleInit){
				this.x=Math.cos(a)*b;
				this.y=Math.sin(a)*b;
			}else{
				this.x=a;
				this.y=b;
			}
		}else if(arguments.length==2){
			this.x=a;
			this.y=b;
		}else if(arguments.length==1){
			this.x=a.x;
			this.y=a.y;
		}else{
			this.x=0;
			this.y=0;
		}
	}
	addVec(vec) {
		this.x+=vec.x;
		this.y+=vec.y;
	}
	subVec(vec) {
		this.x-=vec.x;
		this.y-=vec.y;
	}
	sclVec(scale) {
		this.x*=scale;
		this.y*=scale;
	}
	nrmVec(mag) {
		if(arguments.length==1){
			let ang=this.getAng();
			this.x=Math.cos(ang)*mag;
			this.y=Math.sin(ang)*mag;
		}else{
			let ang=this.getAng();
			this.x=Math.cos(ang);
			this.y=Math.sin(ang);
		}
	}
	limVec(lim) {
		let mag=this.getMag();
		if (mag>lim) {
			this.sclVec(lim/mag);
		}
	}
	getAng(vec) {
		if(arguments.length==1){
			return Math.atan2(vec.y-this.y, vec.x-this.x);
		}else{
			return Math.atan2(this.y, this.x);
		}
	}
	getMag(vec) {
		if(arguments.length==1){
			return Math.sqrt(Math.pow(vec.x-this.x,2)+Math.pow(vec.y-this.y,2));
		}else{
			return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));
		}
	}
	rotVec(rot,pin) {
		if(arguments.length==2){
			this.subVec(pin);
			let mag=this.getMag();
			let ang=this.getAng();
			ang+=rot;
			this.x=Math.cos(ang)*mag;
			this.y=Math.sin(ang)*mag;
			this.addVec(pin);

		}else{
			let mag=this.getMag();
			let ang=this.getAng();
			ang+=rot;
			this.x=Math.cos(ang)*mag;
			this.y=Math.sin(ang)*mag;
		}
	}
	minVec(min){
		this.x=Math.min(this.x,min.x);
		this.y=Math.min(this.y,min.y);
	}
	maxVec(max){
		this.x=Math.max(this.x,max.x);
		this.y=Math.max(this.y,max.y);
	}
	flrVec(){
		this.x=Math.floor(this.x);
		this.y=Math.floor(this.y);
	}
	ceilVec(){
		this.x=Math.ceil(this.x);
		this.y=Math.ceil(this.y);
	}
	absVec(){
		this.x=Math.abs(this.x);
		this.y=Math.abs(this.y);
	}
	inRange(vec,dist){
		let diffX=Math.abs(vec.x-this.x);
		if(diffX>dist){
			return false;
		}
		let diffY=Math.abs(vec.y-this.y);
		if(diffY>dist){
			return false;
		}
		return Math.sqrt(Math.pow(diffX,2)+Math.pow(diffY,2))<=dist;
	}
	setVec(vec){
		this.x=vec.x;
		this.y=vec.y;
	}
}


function overlayColor(base,over){
	let overRGB=hexToRgb(over);
	let overHSV=RGBtoHSV(overRGB.r,overRGB.g,overRGB.b);
	overHSV.v=Math.min(overHSV.v,0.9);
	overRGB=HSVtoRGB(overHSV.h,overHSV.s,overHSV.v);
	
	let baseRGB=hexToRgb(base);
	overRGB.r/=256;
	overRGB.g/=256;
	overRGB.b/=256;
	baseRGB.r/=256;
	baseRGB.g/=256;
	baseRGB.b/=256;
	overRGB.r=overlayPart(baseRGB.r,overRGB.r);
	overRGB.g=overlayPart(baseRGB.g,overRGB.g);
	overRGB.b=overlayPart(baseRGB.b,overRGB.b);
	overRGB.r=Math.floor(overRGB.r*256);
	overRGB.g=Math.floor(overRGB.g*256);
	overRGB.b=Math.floor(overRGB.b*256);
	
	return rgbToHex(overRGB.r,overRGB.g,overRGB.b);
}
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}
function overlayPart(bV,oV){
	if(bV>0.5){
		return (1-(1-2*(bV-0.5)) * (1-oV));
	}else{
		return ((2*bV) * oV);
	}
}
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}
function rgbToHex(r, g, b) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function isHex(h) {
	if(typeof h != "string"){
		return false;
	}
	if(h.substring(0, 1)!="#"||h.length!=7){
		return false;
	}
	let h2=h.substring(1);
	let a = parseInt(h2,16);
	let aStr=a.toString(16);
	while(aStr.length<6){
		aStr="0"+aStr;
	}
	return (aStr===h2.toLowerCase())
}

function clone(target){
	return JSON.parse(JSON.stringify(target));
}

function nrmAng(ang){
  let newAng=ang;
  while(newAng<0){
    newAng+=2*Math.PI;
  }
  while(newAng>2*Math.PI){
    newAng-=2*Math.PI;
  }
  return newAng;
}
function nrm2Ang(ang){
  let newAng=ang;
  while(newAng<-Math.PI){
    newAng+=2*Math.PI;
  }
  while(newAng>Math.PI){
    newAng-=2*Math.PI;
  }
  return newAng;
}

/**
 * Helper function to determine whether there is an intersection between the two polygons described
 * by the lists of vertices. Uses the Separating Axis Theorem
 *
 * @param a an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @param b an array of connected points [{x:, y:}, {x:, y:},...] that form a closed polygon
 * @return true if there is any intersection between the 2 polygons, false otherwise
 */
function doPolygonsIntersect (a, b) {
    var polygons = [a, b];
    var minA, maxA, projected, i, i1, j, minB, maxB;

    for (i = 0; i < polygons.length; i++) {

        // for each polygon, look at each edge of the polygon, and determine if it separates
        // the two shapes
        var polygon = polygons[i];
        for (i1 = 0; i1 < polygon.length; i1++) {

            // grab 2 vertices to create an edge
            var i2 = (i1 + 1) % polygon.length;
            var p1 = polygon[i1];
            var p2 = polygon[i2];

            // find the line perpendicular to this edge
            var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

            minA = maxA = undefined;
            // for each vertex in the first shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            for (j = 0; j < a.length; j++) {
                projected = normal.x * a[j].x + normal.y * a[j].y;
                if (minA === undefined || projected < minA) {
                    minA = projected;
                }
                if (maxA === undefined || projected > maxA) {
                    maxA = projected;
                }
            }

            // for each vertex in the second shape, project it onto the line perpendicular to the edge
            // and keep track of the min and max of these values
            minB = maxB = undefined;
            for (j = 0; j < b.length; j++) {
                projected = normal.x * b[j].x + normal.y * b[j].y;
                if (minB === undefined || projected < minB) {
                    minB = projected;
                }
                if (maxB === undefined || projected > maxB) {
                    maxB = projected;
                }
            }

            // if there is no overlap between the projects, the edge we are looking at separates the two
            // polygons, and we know there is no overlap
            if (maxA < minB || maxB < minA) {
                return false;
            }
        }
    }
    return true;
};