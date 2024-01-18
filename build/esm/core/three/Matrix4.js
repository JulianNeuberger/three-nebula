import { Vector3 } from './Vector3.js';
/**
 * @author mrdoob / http://mrdoob.com/
 * @author supereggbert / http://www.paulbrunt.co.uk/
 * @author philogb / http://blog.thejit.org/
 * @author jordi_ros / http://plattsoft.com
 * @author D1plo1d / http://github.com/D1plo1d
 * @author alteredq / http://alteredqualia.com/
 * @author mikael emtinger / http://gomo.se/
 * @author timknip / http://www.floorplanner.com/
 * @author bhouston / http://clara.io
 * @author WestLangley / http://github.com/WestLangley
 */

function Matrix4() {
  this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];

  if (arguments.length > 0) {
    console.error('THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.');
  }
}

Object.assign(Matrix4.prototype, {
  isMatrix4: true,
  set: function (n11, n12, n13, n14, n21, n22, n23, n24, n31, n32, n33, n34, n41, n42, n43, n44) {
    var te = this.elements;
    te[0] = n11;
    te[4] = n12;
    te[8] = n13;
    te[12] = n14;
    te[1] = n21;
    te[5] = n22;
    te[9] = n23;
    te[13] = n24;
    te[2] = n31;
    te[6] = n32;
    te[10] = n33;
    te[14] = n34;
    te[3] = n41;
    te[7] = n42;
    te[11] = n43;
    te[15] = n44;
    return this;
  },
  identity: function () {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  clone: function () {
    return new Matrix4().fromArray(this.elements);
  },
  copy: function (m) {
    var te = this.elements;
    var me = m.elements;
    te[0] = me[0];
    te[1] = me[1];
    te[2] = me[2];
    te[3] = me[3];
    te[4] = me[4];
    te[5] = me[5];
    te[6] = me[6];
    te[7] = me[7];
    te[8] = me[8];
    te[9] = me[9];
    te[10] = me[10];
    te[11] = me[11];
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    te[15] = me[15];
    return this;
  },
  copyPosition: function (m) {
    var te = this.elements,
        me = m.elements;
    te[12] = me[12];
    te[13] = me[13];
    te[14] = me[14];
    return this;
  },
  extractBasis: function (xAxis, yAxis, zAxis) {
    xAxis.setFromMatrixColumn(this, 0);
    yAxis.setFromMatrixColumn(this, 1);
    zAxis.setFromMatrixColumn(this, 2);
    return this;
  },
  makeBasis: function (xAxis, yAxis, zAxis) {
    this.set(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, 0, 0, 0, 1);
    return this;
  },
  extractRotation: function () {
    var v1 = new Vector3();
    return function extractRotation(m) {
      // this method does not support reflection matrices
      var te = this.elements;
      var me = m.elements;
      var scaleX = 1 / v1.setFromMatrixColumn(m, 0).length();
      var scaleY = 1 / v1.setFromMatrixColumn(m, 1).length();
      var scaleZ = 1 / v1.setFromMatrixColumn(m, 2).length();
      te[0] = me[0] * scaleX;
      te[1] = me[1] * scaleX;
      te[2] = me[2] * scaleX;
      te[3] = 0;
      te[4] = me[4] * scaleY;
      te[5] = me[5] * scaleY;
      te[6] = me[6] * scaleY;
      te[7] = 0;
      te[8] = me[8] * scaleZ;
      te[9] = me[9] * scaleZ;
      te[10] = me[10] * scaleZ;
      te[11] = 0;
      te[12] = 0;
      te[13] = 0;
      te[14] = 0;
      te[15] = 1;
      return this;
    };
  }(),
  makeRotationFromEuler: function (euler) {
    if (!(euler && euler.isEuler)) {
      console.error('THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.');
    }

    var te = this.elements;
    var x = euler.x,
        y = euler.y,
        z = euler.z;
    var a = Math.cos(x),
        b = Math.sin(x);
    var c = Math.cos(y),
        d = Math.sin(y);
    var e = Math.cos(z),
        f = Math.sin(z);

    if (euler.order === 'XYZ') {
      var ae = a * e,
          af = a * f,
          be = b * e,
          bf = b * f;
      te[0] = c * e;
      te[4] = -c * f;
      te[8] = d;
      te[1] = af + be * d;
      te[5] = ae - bf * d;
      te[9] = -b * c;
      te[2] = bf - ae * d;
      te[6] = be + af * d;
      te[10] = a * c;
    } else if (euler.order === 'YXZ') {
      var ce = c * e,
          cf = c * f,
          de = d * e,
          df = d * f;
      te[0] = ce + df * b;
      te[4] = de * b - cf;
      te[8] = a * d;
      te[1] = a * f;
      te[5] = a * e;
      te[9] = -b;
      te[2] = cf * b - de;
      te[6] = df + ce * b;
      te[10] = a * c;
    } else if (euler.order === 'ZXY') {
      var ce = c * e,
          cf = c * f,
          de = d * e,
          df = d * f;
      te[0] = ce - df * b;
      te[4] = -a * f;
      te[8] = de + cf * b;
      te[1] = cf + de * b;
      te[5] = a * e;
      te[9] = df - ce * b;
      te[2] = -a * d;
      te[6] = b;
      te[10] = a * c;
    } else if (euler.order === 'ZYX') {
      var ae = a * e,
          af = a * f,
          be = b * e,
          bf = b * f;
      te[0] = c * e;
      te[4] = be * d - af;
      te[8] = ae * d + bf;
      te[1] = c * f;
      te[5] = bf * d + ae;
      te[9] = af * d - be;
      te[2] = -d;
      te[6] = b * c;
      te[10] = a * c;
    } else if (euler.order === 'YZX') {
      var ac = a * c,
          ad = a * d,
          bc = b * c,
          bd = b * d;
      te[0] = c * e;
      te[4] = bd - ac * f;
      te[8] = bc * f + ad;
      te[1] = f;
      te[5] = a * e;
      te[9] = -b * e;
      te[2] = -d * e;
      te[6] = ad * f + bc;
      te[10] = ac - bd * f;
    } else if (euler.order === 'XZY') {
      var ac = a * c,
          ad = a * d,
          bc = b * c,
          bd = b * d;
      te[0] = c * e;
      te[4] = -f;
      te[8] = d * e;
      te[1] = ac * f + bd;
      te[5] = a * e;
      te[9] = ad * f - bc;
      te[2] = bc * f - ad;
      te[6] = b * e;
      te[10] = bd * f + ac;
    } // bottom row


    te[3] = 0;
    te[7] = 0;
    te[11] = 0; // last column

    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  },
  makeRotationFromQuaternion: function () {
    var zero = new Vector3(0, 0, 0);
    var one = new Vector3(1, 1, 1);
    return function makeRotationFromQuaternion(q) {
      return this.compose(zero, q, one);
    };
  }(),
  lookAt: function () {
    var x = new Vector3();
    var y = new Vector3();
    var z = new Vector3();
    return function lookAt(eye, target, up) {
      var te = this.elements;
      z.subVectors(eye, target);

      if (z.lengthSq() === 0) {
        // eye and target are in the same position
        z.z = 1;
      }

      z.normalize();
      x.crossVectors(up, z);

      if (x.lengthSq() === 0) {
        // up and z are parallel
        if (Math.abs(up.z) === 1) {
          z.x += 0.0001;
        } else {
          z.z += 0.0001;
        }

        z.normalize();
        x.crossVectors(up, z);
      }

      x.normalize();
      y.crossVectors(z, x);
      te[0] = x.x;
      te[4] = y.x;
      te[8] = z.x;
      te[1] = x.y;
      te[5] = y.y;
      te[9] = z.y;
      te[2] = x.z;
      te[6] = y.z;
      te[10] = z.z;
      return this;
    };
  }(),
  multiply: function (m, n) {
    if (n !== undefined) {
      console.warn('THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.');
      return this.multiplyMatrices(m, n);
    }

    return this.multiplyMatrices(this, m);
  },
  premultiply: function (m) {
    return this.multiplyMatrices(m, this);
  },
  multiplyMatrices: function (a, b) {
    var ae = a.elements;
    var be = b.elements;
    var te = this.elements;
    var a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12];
    var a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13];
    var a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14];
    var a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15];
    var b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12];
    var b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13];
    var b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14];
    var b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];
    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
    return this;
  },
  multiplyScalar: function (s) {
    var te = this.elements;
    te[0] *= s;
    te[4] *= s;
    te[8] *= s;
    te[12] *= s;
    te[1] *= s;
    te[5] *= s;
    te[9] *= s;
    te[13] *= s;
    te[2] *= s;
    te[6] *= s;
    te[10] *= s;
    te[14] *= s;
    te[3] *= s;
    te[7] *= s;
    te[11] *= s;
    te[15] *= s;
    return this;
  },
  applyToBufferAttribute: function () {
    var v1 = new Vector3();
    return function applyToBufferAttribute(attribute) {
      for (var i = 0, l = attribute.count; i < l; i++) {
        v1.x = attribute.getX(i);
        v1.y = attribute.getY(i);
        v1.z = attribute.getZ(i);
        v1.applyMatrix4(this);
        attribute.setXYZ(i, v1.x, v1.y, v1.z);
      }

      return attribute;
    };
  }(),
  determinant: function () {
    var te = this.elements;
    var n11 = te[0],
        n12 = te[4],
        n13 = te[8],
        n14 = te[12];
    var n21 = te[1],
        n22 = te[5],
        n23 = te[9],
        n24 = te[13];
    var n31 = te[2],
        n32 = te[6],
        n33 = te[10],
        n34 = te[14];
    var n41 = te[3],
        n42 = te[7],
        n43 = te[11],
        n44 = te[15]; //TODO: make this more efficient
    //( based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm )

    return n41 * (+n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34) + n42 * (+n11 * n23 * n34 - n11 * n24 * n33 + n14 * n21 * n33 - n13 * n21 * n34 + n13 * n24 * n31 - n14 * n23 * n31) + n43 * (+n11 * n24 * n32 - n11 * n22 * n34 - n14 * n21 * n32 + n12 * n21 * n34 + n14 * n22 * n31 - n12 * n24 * n31) + n44 * (-n13 * n22 * n31 - n11 * n23 * n32 + n11 * n22 * n33 + n13 * n21 * n32 - n12 * n21 * n33 + n12 * n23 * n31);
  },
  transpose: function () {
    var te = this.elements;
    var tmp;
    tmp = te[1];
    te[1] = te[4];
    te[4] = tmp;
    tmp = te[2];
    te[2] = te[8];
    te[8] = tmp;
    tmp = te[6];
    te[6] = te[9];
    te[9] = tmp;
    tmp = te[3];
    te[3] = te[12];
    te[12] = tmp;
    tmp = te[7];
    te[7] = te[13];
    te[13] = tmp;
    tmp = te[11];
    te[11] = te[14];
    te[14] = tmp;
    return this;
  },
  setPosition: function (x, y, z) {
    var te = this.elements;

    if (x.isVector3) {
      te[12] = x.x;
      te[13] = x.y;
      te[14] = x.z;
    } else {
      te[12] = x;
      te[13] = y;
      te[14] = z;
    }

    return this;
  },
  getInverse: function (m, throwOnDegenerate) {
    // based on http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.htm
    var te = this.elements,
        me = m.elements,
        n11 = me[0],
        n21 = me[1],
        n31 = me[2],
        n41 = me[3],
        n12 = me[4],
        n22 = me[5],
        n32 = me[6],
        n42 = me[7],
        n13 = me[8],
        n23 = me[9],
        n33 = me[10],
        n43 = me[11],
        n14 = me[12],
        n24 = me[13],
        n34 = me[14],
        n44 = me[15],
        t11 = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44,
        t12 = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44,
        t13 = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44,
        t14 = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    var det = n11 * t11 + n21 * t12 + n31 * t13 + n41 * t14;

    if (det === 0) {
      var msg = "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";

      if (throwOnDegenerate === true) {
        throw new Error(msg);
      } else {
        console.warn(msg);
      }

      return this.identity();
    }

    var detInv = 1 / det;
    te[0] = t11 * detInv;
    te[1] = (n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44) * detInv;
    te[2] = (n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44) * detInv;
    te[3] = (n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43) * detInv;
    te[4] = t12 * detInv;
    te[5] = (n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44) * detInv;
    te[6] = (n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44) * detInv;
    te[7] = (n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43) * detInv;
    te[8] = t13 * detInv;
    te[9] = (n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44) * detInv;
    te[10] = (n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44) * detInv;
    te[11] = (n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43) * detInv;
    te[12] = t14 * detInv;
    te[13] = (n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34) * detInv;
    te[14] = (n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34) * detInv;
    te[15] = (n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33) * detInv;
    return this;
  },
  scale: function (v) {
    var te = this.elements;
    var x = v.x,
        y = v.y,
        z = v.z;
    te[0] *= x;
    te[4] *= y;
    te[8] *= z;
    te[1] *= x;
    te[5] *= y;
    te[9] *= z;
    te[2] *= x;
    te[6] *= y;
    te[10] *= z;
    te[3] *= x;
    te[7] *= y;
    te[11] *= z;
    return this;
  },
  getMaxScaleOnAxis: function () {
    var te = this.elements;
    var scaleXSq = te[0] * te[0] + te[1] * te[1] + te[2] * te[2];
    var scaleYSq = te[4] * te[4] + te[5] * te[5] + te[6] * te[6];
    var scaleZSq = te[8] * te[8] + te[9] * te[9] + te[10] * te[10];
    return Math.sqrt(Math.max(scaleXSq, scaleYSq, scaleZSq));
  },
  makeTranslation: function (x, y, z) {
    this.set(1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1);
    return this;
  },
  makeRotationX: function (theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationY: function (theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationZ: function (theta) {
    var c = Math.cos(theta),
        s = Math.sin(theta);
    this.set(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  },
  makeRotationAxis: function (axis, angle) {
    // Based on http://www.gamedev.net/reference/articles/article1199.asp
    var c = Math.cos(angle);
    var s = Math.sin(angle);
    var t = 1 - c;
    var x = axis.x,
        y = axis.y,
        z = axis.z;
    var tx = t * x,
        ty = t * y;
    this.set(tx * x + c, tx * y - s * z, tx * z + s * y, 0, tx * y + s * z, ty * y + c, ty * z - s * x, 0, tx * z - s * y, ty * z + s * x, t * z * z + c, 0, 0, 0, 0, 1);
    return this;
  },
  makeScale: function (x, y, z) {
    this.set(x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1);
    return this;
  },
  makeShear: function (x, y, z) {
    this.set(1, y, z, 0, x, 1, z, 0, x, y, 1, 0, 0, 0, 0, 1);
    return this;
  },
  compose: function (position, quaternion, scale) {
    var te = this.elements;
    var x = quaternion._x,
        y = quaternion._y,
        z = quaternion._z,
        w = quaternion._w;
    var x2 = x + x,
        y2 = y + y,
        z2 = z + z;
    var xx = x * x2,
        xy = x * y2,
        xz = x * z2;
    var yy = y * y2,
        yz = y * z2,
        zz = z * z2;
    var wx = w * x2,
        wy = w * y2,
        wz = w * z2;
    var sx = scale.x,
        sy = scale.y,
        sz = scale.z;
    te[0] = (1 - (yy + zz)) * sx;
    te[1] = (xy + wz) * sx;
    te[2] = (xz - wy) * sx;
    te[3] = 0;
    te[4] = (xy - wz) * sy;
    te[5] = (1 - (xx + zz)) * sy;
    te[6] = (yz + wx) * sy;
    te[7] = 0;
    te[8] = (xz + wy) * sz;
    te[9] = (yz - wx) * sz;
    te[10] = (1 - (xx + yy)) * sz;
    te[11] = 0;
    te[12] = position.x;
    te[13] = position.y;
    te[14] = position.z;
    te[15] = 1;
    return this;
  },
  decompose: function () {
    var vector = new Vector3();
    var matrix = new Matrix4();
    return function decompose(position, quaternion, scale) {
      var te = this.elements;
      var sx = vector.set(te[0], te[1], te[2]).length();
      var sy = vector.set(te[4], te[5], te[6]).length();
      var sz = vector.set(te[8], te[9], te[10]).length(); // if determine is negative, we need to invert one scale

      var det = this.determinant();
      if (det < 0) sx = -sx;
      position.x = te[12];
      position.y = te[13];
      position.z = te[14]; // scale the rotation part

      matrix.copy(this);
      var invSX = 1 / sx;
      var invSY = 1 / sy;
      var invSZ = 1 / sz;
      matrix.elements[0] *= invSX;
      matrix.elements[1] *= invSX;
      matrix.elements[2] *= invSX;
      matrix.elements[4] *= invSY;
      matrix.elements[5] *= invSY;
      matrix.elements[6] *= invSY;
      matrix.elements[8] *= invSZ;
      matrix.elements[9] *= invSZ;
      matrix.elements[10] *= invSZ;
      quaternion.setFromRotationMatrix(matrix);
      scale.x = sx;
      scale.y = sy;
      scale.z = sz;
      return this;
    };
  }(),
  makePerspective: function (left, right, top, bottom, near, far) {
    if (far === undefined) {
      console.warn('THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.');
    }

    var te = this.elements;
    var x = 2 * near / (right - left);
    var y = 2 * near / (top - bottom);
    var a = (right + left) / (right - left);
    var b = (top + bottom) / (top - bottom);
    var c = -(far + near) / (far - near);
    var d = -2 * far * near / (far - near);
    te[0] = x;
    te[4] = 0;
    te[8] = a;
    te[12] = 0;
    te[1] = 0;
    te[5] = y;
    te[9] = b;
    te[13] = 0;
    te[2] = 0;
    te[6] = 0;
    te[10] = c;
    te[14] = d;
    te[3] = 0;
    te[7] = 0;
    te[11] = -1;
    te[15] = 0;
    return this;
  },
  makeOrthographic: function (left, right, top, bottom, near, far) {
    var te = this.elements;
    var w = 1.0 / (right - left);
    var h = 1.0 / (top - bottom);
    var p = 1.0 / (far - near);
    var x = (right + left) * w;
    var y = (top + bottom) * h;
    var z = (far + near) * p;
    te[0] = 2 * w;
    te[4] = 0;
    te[8] = 0;
    te[12] = -x;
    te[1] = 0;
    te[5] = 2 * h;
    te[9] = 0;
    te[13] = -y;
    te[2] = 0;
    te[6] = 0;
    te[10] = -2 * p;
    te[14] = -z;
    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[15] = 1;
    return this;
  },
  equals: function (matrix) {
    var te = this.elements;
    var me = matrix.elements;

    for (var i = 0; i < 16; i++) {
      if (te[i] !== me[i]) return false;
    }

    return true;
  },
  fromArray: function (array, offset) {
    if (offset === undefined) offset = 0;

    for (var i = 0; i < 16; i++) {
      this.elements[i] = array[i + offset];
    }

    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    var te = this.elements;
    array[offset] = te[0];
    array[offset + 1] = te[1];
    array[offset + 2] = te[2];
    array[offset + 3] = te[3];
    array[offset + 4] = te[4];
    array[offset + 5] = te[5];
    array[offset + 6] = te[6];
    array[offset + 7] = te[7];
    array[offset + 8] = te[8];
    array[offset + 9] = te[9];
    array[offset + 10] = te[10];
    array[offset + 11] = te[11];
    array[offset + 12] = te[12];
    array[offset + 13] = te[13];
    array[offset + 14] = te[14];
    array[offset + 15] = te[15];
    return array;
  }
});
export { Matrix4 };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3RocmVlL01hdHJpeDQuanMiXSwibmFtZXMiOlsiVmVjdG9yMyIsIk1hdHJpeDQiLCJlbGVtZW50cyIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNvbnNvbGUiLCJlcnJvciIsIk9iamVjdCIsImFzc2lnbiIsInByb3RvdHlwZSIsImlzTWF0cml4NCIsInNldCIsIm4xMSIsIm4xMiIsIm4xMyIsIm4xNCIsIm4yMSIsIm4yMiIsIm4yMyIsIm4yNCIsIm4zMSIsIm4zMiIsIm4zMyIsIm4zNCIsIm40MSIsIm40MiIsIm40MyIsIm40NCIsInRlIiwiaWRlbnRpdHkiLCJjbG9uZSIsImZyb21BcnJheSIsImNvcHkiLCJtIiwibWUiLCJjb3B5UG9zaXRpb24iLCJleHRyYWN0QmFzaXMiLCJ4QXhpcyIsInlBeGlzIiwiekF4aXMiLCJzZXRGcm9tTWF0cml4Q29sdW1uIiwibWFrZUJhc2lzIiwieCIsInkiLCJ6IiwiZXh0cmFjdFJvdGF0aW9uIiwidjEiLCJzY2FsZVgiLCJzY2FsZVkiLCJzY2FsZVoiLCJtYWtlUm90YXRpb25Gcm9tRXVsZXIiLCJldWxlciIsImlzRXVsZXIiLCJhIiwiTWF0aCIsImNvcyIsImIiLCJzaW4iLCJjIiwiZCIsImUiLCJmIiwib3JkZXIiLCJhZSIsImFmIiwiYmUiLCJiZiIsImNlIiwiY2YiLCJkZSIsImRmIiwiYWMiLCJhZCIsImJjIiwiYmQiLCJtYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiIsInplcm8iLCJvbmUiLCJxIiwiY29tcG9zZSIsImxvb2tBdCIsImV5ZSIsInRhcmdldCIsInVwIiwic3ViVmVjdG9ycyIsImxlbmd0aFNxIiwibm9ybWFsaXplIiwiY3Jvc3NWZWN0b3JzIiwiYWJzIiwibXVsdGlwbHkiLCJuIiwidW5kZWZpbmVkIiwid2FybiIsIm11bHRpcGx5TWF0cmljZXMiLCJwcmVtdWx0aXBseSIsImExMSIsImExMiIsImExMyIsImExNCIsImEyMSIsImEyMiIsImEyMyIsImEyNCIsImEzMSIsImEzMiIsImEzMyIsImEzNCIsImE0MSIsImE0MiIsImE0MyIsImE0NCIsImIxMSIsImIxMiIsImIxMyIsImIxNCIsImIyMSIsImIyMiIsImIyMyIsImIyNCIsImIzMSIsImIzMiIsImIzMyIsImIzNCIsImI0MSIsImI0MiIsImI0MyIsImI0NCIsIm11bHRpcGx5U2NhbGFyIiwicyIsImFwcGx5VG9CdWZmZXJBdHRyaWJ1dGUiLCJhdHRyaWJ1dGUiLCJpIiwibCIsImNvdW50IiwiZ2V0WCIsImdldFkiLCJnZXRaIiwiYXBwbHlNYXRyaXg0Iiwic2V0WFlaIiwiZGV0ZXJtaW5hbnQiLCJ0cmFuc3Bvc2UiLCJ0bXAiLCJzZXRQb3NpdGlvbiIsImlzVmVjdG9yMyIsImdldEludmVyc2UiLCJ0aHJvd09uRGVnZW5lcmF0ZSIsInQxMSIsInQxMiIsInQxMyIsInQxNCIsImRldCIsIm1zZyIsIkVycm9yIiwiZGV0SW52Iiwic2NhbGUiLCJ2IiwiZ2V0TWF4U2NhbGVPbkF4aXMiLCJzY2FsZVhTcSIsInNjYWxlWVNxIiwic2NhbGVaU3EiLCJzcXJ0IiwibWF4IiwibWFrZVRyYW5zbGF0aW9uIiwibWFrZVJvdGF0aW9uWCIsInRoZXRhIiwibWFrZVJvdGF0aW9uWSIsIm1ha2VSb3RhdGlvbloiLCJtYWtlUm90YXRpb25BeGlzIiwiYXhpcyIsImFuZ2xlIiwidCIsInR4IiwidHkiLCJtYWtlU2NhbGUiLCJtYWtlU2hlYXIiLCJwb3NpdGlvbiIsInF1YXRlcm5pb24iLCJfeCIsIl95IiwiX3oiLCJ3IiwiX3ciLCJ4MiIsInkyIiwiejIiLCJ4eCIsInh5IiwieHoiLCJ5eSIsInl6IiwienoiLCJ3eCIsInd5Iiwid3oiLCJzeCIsInN5Iiwic3oiLCJkZWNvbXBvc2UiLCJ2ZWN0b3IiLCJtYXRyaXgiLCJpbnZTWCIsImludlNZIiwiaW52U1oiLCJzZXRGcm9tUm90YXRpb25NYXRyaXgiLCJtYWtlUGVyc3BlY3RpdmUiLCJsZWZ0IiwicmlnaHQiLCJ0b3AiLCJib3R0b20iLCJuZWFyIiwiZmFyIiwibWFrZU9y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QUFFLEVBQUYsQ0FBekI7QUFFQSxXQUFPMkwsS0FBUDtBQUVBO0FBNTRCZ0MsQ0FBbEM7QUFpNUJBLFNBQVN0TixPQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVmVjdG9yMyB9IGZyb20gJy4vVmVjdG9yMy5qcyc7XHJcblxyXG4vKipcclxuICogQGF1dGhvciBtcmRvb2IgLyBodHRwOi8vbXJkb29iLmNvbS9cclxuICogQGF1dGhvciBzdXBlcmVnZ2JlcnQgLyBodHRwOi8vd3d3LnBhdWxicnVudC5jby51ay9cclxuICogQGF1dGhvciBwaGlsb2diIC8gaHR0cDovL2Jsb2cudGhlaml0Lm9yZy9cclxuICogQGF1dGhvciBqb3JkaV9yb3MgLyBodHRwOi8vcGxhdHRzb2Z0LmNvbVxyXG4gKiBAYXV0aG9yIEQxcGxvMWQgLyBodHRwOi8vZ2l0aHViLmNvbS9EMXBsbzFkXHJcbiAqIEBhdXRob3IgYWx0ZXJlZHEgLyBodHRwOi8vYWx0ZXJlZHF1YWxpYS5jb20vXHJcbiAqIEBhdXRob3IgbWlrYWVsIGVtdGluZ2VyIC8gaHR0cDovL2dvbW8uc2UvXHJcbiAqIEBhdXRob3IgdGlta25pcCAvIGh0dHA6Ly93d3cuZmxvb3JwbGFubmVyLmNvbS9cclxuICogQGF1dGhvciBiaG91c3RvbiAvIGh0dHA6Ly9jbGFyYS5pb1xyXG4gKiBAYXV0aG9yIFdlc3RMYW5nbGV5IC8gaHR0cDovL2dpdGh1Yi5jb20vV2VzdExhbmdsZXlcclxuICovXHJcblxyXG5mdW5jdGlvbiBNYXRyaXg0KCkge1xyXG5cclxuXHR0aGlzLmVsZW1lbnRzID0gW1xyXG5cclxuXHRcdDEsIDAsIDAsIDAsXHJcblx0XHQwLCAxLCAwLCAwLFxyXG5cdFx0MCwgMCwgMSwgMCxcclxuXHRcdDAsIDAsIDAsIDFcclxuXHJcblx0XTtcclxuXHJcblx0aWYgKCBhcmd1bWVudHMubGVuZ3RoID4gMCApIHtcclxuXHJcblx0XHRjb25zb2xlLmVycm9yKCAnVEhSRUUuTWF0cml4NDogdGhlIGNvbnN0cnVjdG9yIG5vIGxvbmdlciByZWFkcyBhcmd1bWVudHMuIHVzZSAuc2V0KCkgaW5zdGVhZC4nICk7XHJcblxyXG5cdH1cclxuXHJcbn1cclxuXHJcbk9iamVjdC5hc3NpZ24oIE1hdHJpeDQucHJvdG90eXBlLCB7XHJcblxyXG5cdGlzTWF0cml4NDogdHJ1ZSxcclxuXHJcblx0c2V0OiBmdW5jdGlvbiAoIG4xMSwgbjEyLCBuMTMsIG4xNCwgbjIxLCBuMjIsIG4yMywgbjI0LCBuMzEsIG4zMiwgbjMzLCBuMzQsIG40MSwgbjQyLCBuNDMsIG40NCApIHtcclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdHRlWyAwIF0gPSBuMTE7IHRlWyA0IF0gPSBuMTI7IHRlWyA4IF0gPSBuMTM7IHRlWyAxMiBdID0gbjE0O1xyXG5cdFx0dGVbIDEgXSA9IG4yMTsgdGVbIDUgXSA9IG4yMjsgdGVbIDkgXSA9IG4yMzsgdGVbIDEzIF0gPSBuMjQ7XHJcblx0XHR0ZVsgMiBdID0gbjMxOyB0ZVsgNiBdID0gbjMyOyB0ZVsgMTAgXSA9IG4zMzsgdGVbIDE0IF0gPSBuMzQ7XHJcblx0XHR0ZVsgMyBdID0gbjQxOyB0ZVsgNyBdID0gbjQyOyB0ZVsgMTEgXSA9IG40MzsgdGVbIDE1IF0gPSBuNDQ7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGlkZW50aXR5OiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dGhpcy5zZXQoXHJcblxyXG5cdFx0XHQxLCAwLCAwLCAwLFxyXG5cdFx0XHQwLCAxLCAwLCAwLFxyXG5cdFx0XHQwLCAwLCAxLCAwLFxyXG5cdFx0XHQwLCAwLCAwLCAxXHJcblxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0Y2xvbmU6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRyZXR1cm4gbmV3IE1hdHJpeDQoKS5mcm9tQXJyYXkoIHRoaXMuZWxlbWVudHMgKTtcclxuXHJcblx0fSxcclxuXHJcblx0Y29weTogZnVuY3Rpb24gKCBtICkge1xyXG5cclxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XHJcblx0XHR2YXIgbWUgPSBtLmVsZW1lbnRzO1xyXG5cclxuXHRcdHRlWyAwIF0gPSBtZVsgMCBdOyB0ZVsgMSBdID0gbWVbIDEgXTsgdGVbIDIgXSA9IG1lWyAyIF07IHRlWyAzIF0gPSBtZVsgMyBdO1xyXG5cdFx0dGVbIDQgXSA9IG1lWyA0IF07IHRlWyA1IF0gPSBtZVsgNSBdOyB0ZVsgNiBdID0gbWVbIDYgXTsgdGVbIDcgXSA9IG1lWyA3IF07XHJcblx0XHR0ZVsgOCBdID0gbWVbIDggXTsgdGVbIDkgXSA9IG1lWyA5IF07IHRlWyAxMCBdID0gbWVbIDEwIF07IHRlWyAxMSBdID0gbWVbIDExIF07XHJcblx0XHR0ZVsgMTIgXSA9IG1lWyAxMiBdOyB0ZVsgMTMgXSA9IG1lWyAxMyBdOyB0ZVsgMTQgXSA9IG1lWyAxNCBdOyB0ZVsgMTUgXSA9IG1lWyAxNSBdO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRjb3B5UG9zaXRpb246IGZ1bmN0aW9uICggbSApIHtcclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzLCBtZSA9IG0uZWxlbWVudHM7XHJcblxyXG5cdFx0dGVbIDEyIF0gPSBtZVsgMTIgXTtcclxuXHRcdHRlWyAxMyBdID0gbWVbIDEzIF07XHJcblx0XHR0ZVsgMTQgXSA9IG1lWyAxNCBdO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRleHRyYWN0QmFzaXM6IGZ1bmN0aW9uICggeEF4aXMsIHlBeGlzLCB6QXhpcyApIHtcclxuXHJcblx0XHR4QXhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKCB0aGlzLCAwICk7XHJcblx0XHR5QXhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKCB0aGlzLCAxICk7XHJcblx0XHR6QXhpcy5zZXRGcm9tTWF0cml4Q29sdW1uKCB0aGlzLCAyICk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG1ha2VCYXNpczogZnVuY3Rpb24gKCB4QXhpcywgeUF4aXMsIHpBeGlzICkge1xyXG5cclxuXHRcdHRoaXMuc2V0KFxyXG5cdFx0XHR4QXhpcy54LCB5QXhpcy54LCB6QXhpcy54LCAwLFxyXG5cdFx0XHR4QXhpcy55LCB5QXhpcy55LCB6QXhpcy55LCAwLFxyXG5cdFx0XHR4QXhpcy56LCB5QXhpcy56LCB6QXhpcy56LCAwLFxyXG5cdFx0XHQwLCAwLCAwLCAxXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRleHRyYWN0Um90YXRpb246IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgdjEgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiBleHRyYWN0Um90YXRpb24oIG0gKSB7XHJcblxyXG5cdFx0XHQvLyB0aGlzIG1ldGhvZCBkb2VzIG5vdCBzdXBwb3J0IHJlZmxlY3Rpb24gbWF0cmljZXNcclxuXHJcblx0XHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XHJcblx0XHRcdHZhciBtZSA9IG0uZWxlbWVudHM7XHJcblxyXG5cdFx0XHR2YXIgc2NhbGVYID0gMSAvIHYxLnNldEZyb21NYXRyaXhDb2x1bW4oIG0sIDAgKS5sZW5ndGgoKTtcclxuXHRcdFx0dmFyIHNjYWxlWSA9IDEgLyB2MS5zZXRGcm9tTWF0cml4Q29sdW1uKCBtLCAxICkubGVuZ3RoKCk7XHJcblx0XHRcdHZhciBzY2FsZVogPSAxIC8gdjEuc2V0RnJvbU1hdHJpeENvbHVtbiggbSwgMiApLmxlbmd0aCgpO1xyXG5cclxuXHRcdFx0dGVbIDAgXSA9IG1lWyAwIF0gKiBzY2FsZVg7XHJcblx0XHRcdHRlWyAxIF0gPSBtZVsgMSBdICogc2NhbGVYO1xyXG5cdFx0XHR0ZVsgMiBdID0gbWVbIDIgXSAqIHNjYWxlWDtcclxuXHRcdFx0dGVbIDMgXSA9IDA7XHJcblxyXG5cdFx0XHR0ZVsgNCBdID0gbWVbIDQgXSAqIHNjYWxlWTtcclxuXHRcdFx0dGVbIDUgXSA9IG1lWyA1IF0gKiBzY2FsZVk7XHJcblx0XHRcdHRlWyA2IF0gPSBtZVsgNiBdICogc2NhbGVZO1xyXG5cdFx0XHR0ZVsgNyBdID0gMDtcclxuXHJcblx0XHRcdHRlWyA4IF0gPSBtZVsgOCBdICogc2NhbGVaO1xyXG5cdFx0XHR0ZVsgOSBdID0gbWVbIDkgXSAqIHNjYWxlWjtcclxuXHRcdFx0dGVbIDEwIF0gPSBtZVsgMTAgXSAqIHNjYWxlWjtcclxuXHRcdFx0dGVbIDExIF0gPSAwO1xyXG5cclxuXHRcdFx0dGVbIDEyIF0gPSAwO1xyXG5cdFx0XHR0ZVsgMTMgXSA9IDA7XHJcblx0XHRcdHRlWyAxNCBdID0gMDtcclxuXHRcdFx0dGVbIDE1IF0gPSAxO1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0fSgpLFxyXG5cclxuXHRtYWtlUm90YXRpb25Gcm9tRXVsZXI6IGZ1bmN0aW9uICggZXVsZXIgKSB7XHJcblxyXG5cdFx0aWYgKCAhICggZXVsZXIgJiYgZXVsZXIuaXNFdWxlciApICkge1xyXG5cclxuXHRcdFx0Y29uc29sZS5lcnJvciggJ1RIUkVFLk1hdHJpeDQ6IC5tYWtlUm90YXRpb25Gcm9tRXVsZXIoKSBub3cgZXhwZWN0cyBhIEV1bGVyIHJvdGF0aW9uIHJhdGhlciB0aGFuIGEgVmVjdG9yMyBhbmQgb3JkZXIuJyApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdHZhciB4ID0gZXVsZXIueCwgeSA9IGV1bGVyLnksIHogPSBldWxlci56O1xyXG5cdFx0dmFyIGEgPSBNYXRoLmNvcyggeCApLCBiID0gTWF0aC5zaW4oIHggKTtcclxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHkgKSwgZCA9IE1hdGguc2luKCB5ICk7XHJcblx0XHR2YXIgZSA9IE1hdGguY29zKCB6ICksIGYgPSBNYXRoLnNpbiggeiApO1xyXG5cclxuXHRcdGlmICggZXVsZXIub3JkZXIgPT09ICdYWVonICkge1xyXG5cclxuXHRcdFx0dmFyIGFlID0gYSAqIGUsIGFmID0gYSAqIGYsIGJlID0gYiAqIGUsIGJmID0gYiAqIGY7XHJcblxyXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XHJcblx0XHRcdHRlWyA0IF0gPSAtIGMgKiBmO1xyXG5cdFx0XHR0ZVsgOCBdID0gZDtcclxuXHJcblx0XHRcdHRlWyAxIF0gPSBhZiArIGJlICogZDtcclxuXHRcdFx0dGVbIDUgXSA9IGFlIC0gYmYgKiBkO1xyXG5cdFx0XHR0ZVsgOSBdID0gLSBiICogYztcclxuXHJcblx0XHRcdHRlWyAyIF0gPSBiZiAtIGFlICogZDtcclxuXHRcdFx0dGVbIDYgXSA9IGJlICsgYWYgKiBkO1xyXG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWVhaJyApIHtcclxuXHJcblx0XHRcdHZhciBjZSA9IGMgKiBlLCBjZiA9IGMgKiBmLCBkZSA9IGQgKiBlLCBkZiA9IGQgKiBmO1xyXG5cclxuXHRcdFx0dGVbIDAgXSA9IGNlICsgZGYgKiBiO1xyXG5cdFx0XHR0ZVsgNCBdID0gZGUgKiBiIC0gY2Y7XHJcblx0XHRcdHRlWyA4IF0gPSBhICogZDtcclxuXHJcblx0XHRcdHRlWyAxIF0gPSBhICogZjtcclxuXHRcdFx0dGVbIDUgXSA9IGEgKiBlO1xyXG5cdFx0XHR0ZVsgOSBdID0gLSBiO1xyXG5cclxuXHRcdFx0dGVbIDIgXSA9IGNmICogYiAtIGRlO1xyXG5cdFx0XHR0ZVsgNiBdID0gZGYgKyBjZSAqIGI7XHJcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdaWFknICkge1xyXG5cclxuXHRcdFx0dmFyIGNlID0gYyAqIGUsIGNmID0gYyAqIGYsIGRlID0gZCAqIGUsIGRmID0gZCAqIGY7XHJcblxyXG5cdFx0XHR0ZVsgMCBdID0gY2UgLSBkZiAqIGI7XHJcblx0XHRcdHRlWyA0IF0gPSAtIGEgKiBmO1xyXG5cdFx0XHR0ZVsgOCBdID0gZGUgKyBjZiAqIGI7XHJcblxyXG5cdFx0XHR0ZVsgMSBdID0gY2YgKyBkZSAqIGI7XHJcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcclxuXHRcdFx0dGVbIDkgXSA9IGRmIC0gY2UgKiBiO1xyXG5cclxuXHRcdFx0dGVbIDIgXSA9IC0gYSAqIGQ7XHJcblx0XHRcdHRlWyA2IF0gPSBiO1xyXG5cdFx0XHR0ZVsgMTAgXSA9IGEgKiBjO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWllYJyApIHtcclxuXHJcblx0XHRcdHZhciBhZSA9IGEgKiBlLCBhZiA9IGEgKiBmLCBiZSA9IGIgKiBlLCBiZiA9IGIgKiBmO1xyXG5cclxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xyXG5cdFx0XHR0ZVsgNCBdID0gYmUgKiBkIC0gYWY7XHJcblx0XHRcdHRlWyA4IF0gPSBhZSAqIGQgKyBiZjtcclxuXHJcblx0XHRcdHRlWyAxIF0gPSBjICogZjtcclxuXHRcdFx0dGVbIDUgXSA9IGJmICogZCArIGFlO1xyXG5cdFx0XHR0ZVsgOSBdID0gYWYgKiBkIC0gYmU7XHJcblxyXG5cdFx0XHR0ZVsgMiBdID0gLSBkO1xyXG5cdFx0XHR0ZVsgNiBdID0gYiAqIGM7XHJcblx0XHRcdHRlWyAxMCBdID0gYSAqIGM7XHJcblxyXG5cdFx0fSBlbHNlIGlmICggZXVsZXIub3JkZXIgPT09ICdZWlgnICkge1xyXG5cclxuXHRcdFx0dmFyIGFjID0gYSAqIGMsIGFkID0gYSAqIGQsIGJjID0gYiAqIGMsIGJkID0gYiAqIGQ7XHJcblxyXG5cdFx0XHR0ZVsgMCBdID0gYyAqIGU7XHJcblx0XHRcdHRlWyA0IF0gPSBiZCAtIGFjICogZjtcclxuXHRcdFx0dGVbIDggXSA9IGJjICogZiArIGFkO1xyXG5cclxuXHRcdFx0dGVbIDEgXSA9IGY7XHJcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcclxuXHRcdFx0dGVbIDkgXSA9IC0gYiAqIGU7XHJcblxyXG5cdFx0XHR0ZVsgMiBdID0gLSBkICogZTtcclxuXHRcdFx0dGVbIDYgXSA9IGFkICogZiArIGJjO1xyXG5cdFx0XHR0ZVsgMTAgXSA9IGFjIC0gYmQgKiBmO1xyXG5cclxuXHRcdH0gZWxzZSBpZiAoIGV1bGVyLm9yZGVyID09PSAnWFpZJyApIHtcclxuXHJcblx0XHRcdHZhciBhYyA9IGEgKiBjLCBhZCA9IGEgKiBkLCBiYyA9IGIgKiBjLCBiZCA9IGIgKiBkO1xyXG5cclxuXHRcdFx0dGVbIDAgXSA9IGMgKiBlO1xyXG5cdFx0XHR0ZVsgNCBdID0gLSBmO1xyXG5cdFx0XHR0ZVsgOCBdID0gZCAqIGU7XHJcblxyXG5cdFx0XHR0ZVsgMSBdID0gYWMgKiBmICsgYmQ7XHJcblx0XHRcdHRlWyA1IF0gPSBhICogZTtcclxuXHRcdFx0dGVbIDkgXSA9IGFkICogZiAtIGJjO1xyXG5cclxuXHRcdFx0dGVbIDIgXSA9IGJjICogZiAtIGFkO1xyXG5cdFx0XHR0ZVsgNiBdID0gYiAqIGU7XHJcblx0XHRcdHRlWyAxMCBdID0gYmQgKiBmICsgYWM7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIGJvdHRvbSByb3dcclxuXHRcdHRlWyAzIF0gPSAwO1xyXG5cdFx0dGVbIDcgXSA9IDA7XHJcblx0XHR0ZVsgMTEgXSA9IDA7XHJcblxyXG5cdFx0Ly8gbGFzdCBjb2x1bW5cclxuXHRcdHRlWyAxMiBdID0gMDtcclxuXHRcdHRlWyAxMyBdID0gMDtcclxuXHRcdHRlWyAxNCBdID0gMDtcclxuXHRcdHRlWyAxNSBdID0gMTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0bWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgemVybyA9IG5ldyBWZWN0b3IzKCAwLCAwLCAwICk7XHJcblx0XHR2YXIgb25lID0gbmV3IFZlY3RvcjMoIDEsIDEsIDEgKTtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gbWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5jb21wb3NlKCB6ZXJvLCBxLCBvbmUgKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHR9KCksXHJcblxyXG5cdGxvb2tBdDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciB4ID0gbmV3IFZlY3RvcjMoKTtcclxuXHRcdHZhciB5ID0gbmV3IFZlY3RvcjMoKTtcclxuXHRcdHZhciB6ID0gbmV3IFZlY3RvcjMoKTtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gbG9va0F0KCBleWUsIHRhcmdldCwgdXAgKSB7XHJcblxyXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdFx0ei5zdWJWZWN0b3JzKCBleWUsIHRhcmdldCApO1xyXG5cclxuXHRcdFx0aWYgKCB6Lmxlbmd0aFNxKCkgPT09IDAgKSB7XHJcblxyXG5cdFx0XHRcdC8vIGV5ZSBhbmQgdGFyZ2V0IGFyZSBpbiB0aGUgc2FtZSBwb3NpdGlvblxyXG5cclxuXHRcdFx0XHR6LnogPSAxO1xyXG5cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0ei5ub3JtYWxpemUoKTtcclxuXHRcdFx0eC5jcm9zc1ZlY3RvcnMoIHVwLCB6ICk7XHJcblxyXG5cdFx0XHRpZiAoIHgubGVuZ3RoU3EoKSA9PT0gMCApIHtcclxuXHJcblx0XHRcdFx0Ly8gdXAgYW5kIHogYXJlIHBhcmFsbGVsXHJcblxyXG5cdFx0XHRcdGlmICggTWF0aC5hYnMoIHVwLnogKSA9PT0gMSApIHtcclxuXHJcblx0XHRcdFx0XHR6LnggKz0gMC4wMDAxO1xyXG5cclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0XHRcdHoueiArPSAwLjAwMDE7XHJcblxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0ei5ub3JtYWxpemUoKTtcclxuXHRcdFx0XHR4LmNyb3NzVmVjdG9ycyggdXAsIHogKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHgubm9ybWFsaXplKCk7XHJcblx0XHRcdHkuY3Jvc3NWZWN0b3JzKCB6LCB4ICk7XHJcblxyXG5cdFx0XHR0ZVsgMCBdID0geC54OyB0ZVsgNCBdID0geS54OyB0ZVsgOCBdID0gei54O1xyXG5cdFx0XHR0ZVsgMSBdID0geC55OyB0ZVsgNSBdID0geS55OyB0ZVsgOSBdID0gei55O1xyXG5cdFx0XHR0ZVsgMiBdID0geC56OyB0ZVsgNiBdID0geS56OyB0ZVsgMTAgXSA9IHouejtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdH0oKSxcclxuXHJcblx0bXVsdGlwbHk6IGZ1bmN0aW9uICggbSwgbiApIHtcclxuXHJcblx0XHRpZiAoIG4gIT09IHVuZGVmaW5lZCApIHtcclxuXHJcblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLk1hdHJpeDQ6IC5tdWx0aXBseSgpIG5vdyBvbmx5IGFjY2VwdHMgb25lIGFyZ3VtZW50LiBVc2UgLm11bHRpcGx5TWF0cmljZXMoIGEsIGIgKSBpbnN0ZWFkLicgKTtcclxuXHRcdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyggbSwgbiApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseU1hdHJpY2VzKCB0aGlzLCBtICk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHByZW11bHRpcGx5OiBmdW5jdGlvbiAoIG0gKSB7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHlNYXRyaWNlcyggbSwgdGhpcyApO1xyXG5cclxuXHR9LFxyXG5cclxuXHRtdWx0aXBseU1hdHJpY2VzOiBmdW5jdGlvbiAoIGEsIGIgKSB7XHJcblxyXG5cdFx0dmFyIGFlID0gYS5lbGVtZW50cztcclxuXHRcdHZhciBiZSA9IGIuZWxlbWVudHM7XHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdHZhciBhMTEgPSBhZVsgMCBdLCBhMTIgPSBhZVsgNCBdLCBhMTMgPSBhZVsgOCBdLCBhMTQgPSBhZVsgMTIgXTtcclxuXHRcdHZhciBhMjEgPSBhZVsgMSBdLCBhMjIgPSBhZVsgNSBdLCBhMjMgPSBhZVsgOSBdLCBhMjQgPSBhZVsgMTMgXTtcclxuXHRcdHZhciBhMzEgPSBhZVsgMiBdLCBhMzIgPSBhZVsgNiBdLCBhMzMgPSBhZVsgMTAgXSwgYTM0ID0gYWVbIDE0IF07XHJcblx0XHR2YXIgYTQxID0gYWVbIDMgXSwgYTQyID0gYWVbIDcgXSwgYTQzID0gYWVbIDExIF0sIGE0NCA9IGFlWyAxNSBdO1xyXG5cclxuXHRcdHZhciBiMTEgPSBiZVsgMCBdLCBiMTIgPSBiZVsgNCBdLCBiMTMgPSBiZVsgOCBdLCBiMTQgPSBiZVsgMTIgXTtcclxuXHRcdHZhciBiMjEgPSBiZVsgMSBdLCBiMjIgPSBiZVsgNSBdLCBiMjMgPSBiZVsgOSBdLCBiMjQgPSBiZVsgMTMgXTtcclxuXHRcdHZhciBiMzEgPSBiZVsgMiBdLCBiMzIgPSBiZVsgNiBdLCBiMzMgPSBiZVsgMTAgXSwgYjM0ID0gYmVbIDE0IF07XHJcblx0XHR2YXIgYjQxID0gYmVbIDMgXSwgYjQyID0gYmVbIDcgXSwgYjQzID0gYmVbIDExIF0sIGI0NCA9IGJlWyAxNSBdO1xyXG5cclxuXHRcdHRlWyAwIF0gPSBhMTEgKiBiMTEgKyBhMTIgKiBiMjEgKyBhMTMgKiBiMzEgKyBhMTQgKiBiNDE7XHJcblx0XHR0ZVsgNCBdID0gYTExICogYjEyICsgYTEyICogYjIyICsgYTEzICogYjMyICsgYTE0ICogYjQyO1xyXG5cdFx0dGVbIDggXSA9IGExMSAqIGIxMyArIGExMiAqIGIyMyArIGExMyAqIGIzMyArIGExNCAqIGI0MztcclxuXHRcdHRlWyAxMiBdID0gYTExICogYjE0ICsgYTEyICogYjI0ICsgYTEzICogYjM0ICsgYTE0ICogYjQ0O1xyXG5cclxuXHRcdHRlWyAxIF0gPSBhMjEgKiBiMTEgKyBhMjIgKiBiMjEgKyBhMjMgKiBiMzEgKyBhMjQgKiBiNDE7XHJcblx0XHR0ZVsgNSBdID0gYTIxICogYjEyICsgYTIyICogYjIyICsgYTIzICogYjMyICsgYTI0ICogYjQyO1xyXG5cdFx0dGVbIDkgXSA9IGEyMSAqIGIxMyArIGEyMiAqIGIyMyArIGEyMyAqIGIzMyArIGEyNCAqIGI0MztcclxuXHRcdHRlWyAxMyBdID0gYTIxICogYjE0ICsgYTIyICogYjI0ICsgYTIzICogYjM0ICsgYTI0ICogYjQ0O1xyXG5cclxuXHRcdHRlWyAyIF0gPSBhMzEgKiBiMTEgKyBhMzIgKiBiMjEgKyBhMzMgKiBiMzEgKyBhMzQgKiBiNDE7XHJcblx0XHR0ZVsgNiBdID0gYTMxICogYjEyICsgYTMyICogYjIyICsgYTMzICogYjMyICsgYTM0ICogYjQyO1xyXG5cdFx0dGVbIDEwIF0gPSBhMzEgKiBiMTMgKyBhMzIgKiBiMjMgKyBhMzMgKiBiMzMgKyBhMzQgKiBiNDM7XHJcblx0XHR0ZVsgMTQgXSA9IGEzMSAqIGIxNCArIGEzMiAqIGIyNCArIGEzMyAqIGIzNCArIGEzNCAqIGI0NDtcclxuXHJcblx0XHR0ZVsgMyBdID0gYTQxICogYjExICsgYTQyICogYjIxICsgYTQzICogYjMxICsgYTQ0ICogYjQxO1xyXG5cdFx0dGVbIDcgXSA9IGE0MSAqIGIxMiArIGE0MiAqIGIyMiArIGE0MyAqIGIzMiArIGE0NCAqIGI0MjtcclxuXHRcdHRlWyAxMSBdID0gYTQxICogYjEzICsgYTQyICogYjIzICsgYTQzICogYjMzICsgYTQ0ICogYjQzO1xyXG5cdFx0dGVbIDE1IF0gPSBhNDEgKiBiMTQgKyBhNDIgKiBiMjQgKyBhNDMgKiBiMzQgKyBhNDQgKiBiNDQ7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG11bHRpcGx5U2NhbGFyOiBmdW5jdGlvbiAoIHMgKSB7XHJcblxyXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcclxuXHJcblx0XHR0ZVsgMCBdICo9IHM7IHRlWyA0IF0gKj0gczsgdGVbIDggXSAqPSBzOyB0ZVsgMTIgXSAqPSBzO1xyXG5cdFx0dGVbIDEgXSAqPSBzOyB0ZVsgNSBdICo9IHM7IHRlWyA5IF0gKj0gczsgdGVbIDEzIF0gKj0gcztcclxuXHRcdHRlWyAyIF0gKj0gczsgdGVbIDYgXSAqPSBzOyB0ZVsgMTAgXSAqPSBzOyB0ZVsgMTQgXSAqPSBzO1xyXG5cdFx0dGVbIDMgXSAqPSBzOyB0ZVsgNyBdICo9IHM7IHRlWyAxMSBdICo9IHM7IHRlWyAxNSBdICo9IHM7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGFwcGx5VG9CdWZmZXJBdHRyaWJ1dGU6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgdjEgPSBuZXcgVmVjdG9yMygpO1xyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiBhcHBseVRvQnVmZmVyQXR0cmlidXRlKCBhdHRyaWJ1dGUgKSB7XHJcblxyXG5cdFx0XHRmb3IgKCB2YXIgaSA9IDAsIGwgPSBhdHRyaWJ1dGUuY291bnQ7IGkgPCBsOyBpICsrICkge1xyXG5cclxuXHRcdFx0XHR2MS54ID0gYXR0cmlidXRlLmdldFgoIGkgKTtcclxuXHRcdFx0XHR2MS55ID0gYXR0cmlidXRlLmdldFkoIGkgKTtcclxuXHRcdFx0XHR2MS56ID0gYXR0cmlidXRlLmdldFooIGkgKTtcclxuXHJcblx0XHRcdFx0djEuYXBwbHlNYXRyaXg0KCB0aGlzICk7XHJcblxyXG5cdFx0XHRcdGF0dHJpYnV0ZS5zZXRYWVooIGksIHYxLngsIHYxLnksIHYxLnogKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBhdHRyaWJ1dGU7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0fSgpLFxyXG5cclxuXHRkZXRlcm1pbmFudDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XHJcblxyXG5cdFx0dmFyIG4xMSA9IHRlWyAwIF0sIG4xMiA9IHRlWyA0IF0sIG4xMyA9IHRlWyA4IF0sIG4xNCA9IHRlWyAxMiBdO1xyXG5cdFx0dmFyIG4yMSA9IHRlWyAxIF0sIG4yMiA9IHRlWyA1IF0sIG4yMyA9IHRlWyA5IF0sIG4yNCA9IHRlWyAxMyBdO1xyXG5cdFx0dmFyIG4zMSA9IHRlWyAyIF0sIG4zMiA9IHRlWyA2IF0sIG4zMyA9IHRlWyAxMCBdLCBuMzQgPSB0ZVsgMTQgXTtcclxuXHRcdHZhciBuNDEgPSB0ZVsgMyBdLCBuNDIgPSB0ZVsgNyBdLCBuNDMgPSB0ZVsgMTEgXSwgbjQ0ID0gdGVbIDE1IF07XHJcblxyXG5cdFx0Ly9UT0RPOiBtYWtlIHRoaXMgbW9yZSBlZmZpY2llbnRcclxuXHRcdC8vKCBiYXNlZCBvbiBodHRwOi8vd3d3LmV1Y2xpZGVhbnNwYWNlLmNvbS9tYXRocy9hbGdlYnJhL21hdHJpeC9mdW5jdGlvbnMvaW52ZXJzZS9mb3VyRC9pbmRleC5odG0gKVxyXG5cclxuXHRcdHJldHVybiAoXHJcblx0XHRcdG40MSAqIChcclxuXHRcdFx0XHQrIG4xNCAqIG4yMyAqIG4zMlxyXG5cdFx0XHRcdCAtIG4xMyAqIG4yNCAqIG4zMlxyXG5cdFx0XHRcdCAtIG4xNCAqIG4yMiAqIG4zM1xyXG5cdFx0XHRcdCArIG4xMiAqIG4yNCAqIG4zM1xyXG5cdFx0XHRcdCArIG4xMyAqIG4yMiAqIG4zNFxyXG5cdFx0XHRcdCAtIG4xMiAqIG4yMyAqIG4zNFxyXG5cdFx0XHQpICtcclxuXHRcdFx0bjQyICogKFxyXG5cdFx0XHRcdCsgbjExICogbjIzICogbjM0XHJcblx0XHRcdFx0IC0gbjExICogbjI0ICogbjMzXHJcblx0XHRcdFx0ICsgbjE0ICogbjIxICogbjMzXHJcblx0XHRcdFx0IC0gbjEzICogbjIxICogbjM0XHJcblx0XHRcdFx0ICsgbjEzICogbjI0ICogbjMxXHJcblx0XHRcdFx0IC0gbjE0ICogbjIzICogbjMxXHJcblx0XHRcdCkgK1xyXG5cdFx0XHRuNDMgKiAoXHJcblx0XHRcdFx0KyBuMTEgKiBuMjQgKiBuMzJcclxuXHRcdFx0XHQgLSBuMTEgKiBuMjIgKiBuMzRcclxuXHRcdFx0XHQgLSBuMTQgKiBuMjEgKiBuMzJcclxuXHRcdFx0XHQgKyBuMTIgKiBuMjEgKiBuMzRcclxuXHRcdFx0XHQgKyBuMTQgKiBuMjIgKiBuMzFcclxuXHRcdFx0XHQgLSBuMTIgKiBuMjQgKiBuMzFcclxuXHRcdFx0KSArXHJcblx0XHRcdG40NCAqIChcclxuXHRcdFx0XHQtIG4xMyAqIG4yMiAqIG4zMVxyXG5cdFx0XHRcdCAtIG4xMSAqIG4yMyAqIG4zMlxyXG5cdFx0XHRcdCArIG4xMSAqIG4yMiAqIG4zM1xyXG5cdFx0XHRcdCArIG4xMyAqIG4yMSAqIG4zMlxyXG5cdFx0XHRcdCAtIG4xMiAqIG4yMSAqIG4zM1xyXG5cdFx0XHRcdCArIG4xMiAqIG4yMyAqIG4zMVxyXG5cdFx0XHQpXHJcblxyXG5cdFx0KTtcclxuXHJcblx0fSxcclxuXHJcblx0dHJhbnNwb3NlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcclxuXHRcdHZhciB0bXA7XHJcblxyXG5cdFx0dG1wID0gdGVbIDEgXTsgdGVbIDEgXSA9IHRlWyA0IF07IHRlWyA0IF0gPSB0bXA7XHJcblx0XHR0bXAgPSB0ZVsgMiBdOyB0ZVsgMiBdID0gdGVbIDggXTsgdGVbIDggXSA9IHRtcDtcclxuXHRcdHRtcCA9IHRlWyA2IF07IHRlWyA2IF0gPSB0ZVsgOSBdOyB0ZVsgOSBdID0gdG1wO1xyXG5cclxuXHRcdHRtcCA9IHRlWyAzIF07IHRlWyAzIF0gPSB0ZVsgMTIgXTsgdGVbIDEyIF0gPSB0bXA7XHJcblx0XHR0bXAgPSB0ZVsgNyBdOyB0ZVsgNyBdID0gdGVbIDEzIF07IHRlWyAxMyBdID0gdG1wO1xyXG5cdFx0dG1wID0gdGVbIDExIF07IHRlWyAxMSBdID0gdGVbIDE0IF07IHRlWyAxNCBdID0gdG1wO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRzZXRQb3NpdGlvbjogZnVuY3Rpb24gKCB4LCB5LCB6ICkge1xyXG5cclxuXHRcdHZhciB0ZSA9IHRoaXMuZWxlbWVudHM7XHJcblxyXG5cdFx0aWYgKCB4LmlzVmVjdG9yMyApIHtcclxuXHJcblx0XHRcdHRlWyAxMiBdID0geC54O1xyXG5cdFx0XHR0ZVsgMTMgXSA9IHgueTtcclxuXHRcdFx0dGVbIDE0IF0gPSB4Lno7XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdHRlWyAxMiBdID0geDtcclxuXHRcdFx0dGVbIDEzIF0gPSB5O1xyXG5cdFx0XHR0ZVsgMTQgXSA9IHo7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRnZXRJbnZlcnNlOiBmdW5jdGlvbiAoIG0sIHRocm93T25EZWdlbmVyYXRlICkge1xyXG5cclxuXHRcdC8vIGJhc2VkIG9uIGh0dHA6Ly93d3cuZXVjbGlkZWFuc3BhY2UuY29tL21hdGhzL2FsZ2VicmEvbWF0cml4L2Z1bmN0aW9ucy9pbnZlcnNlL2ZvdXJEL2luZGV4Lmh0bVxyXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cyxcclxuXHRcdFx0bWUgPSBtLmVsZW1lbnRzLFxyXG5cclxuXHRcdFx0bjExID0gbWVbIDAgXSwgbjIxID0gbWVbIDEgXSwgbjMxID0gbWVbIDIgXSwgbjQxID0gbWVbIDMgXSxcclxuXHRcdFx0bjEyID0gbWVbIDQgXSwgbjIyID0gbWVbIDUgXSwgbjMyID0gbWVbIDYgXSwgbjQyID0gbWVbIDcgXSxcclxuXHRcdFx0bjEzID0gbWVbIDggXSwgbjIzID0gbWVbIDkgXSwgbjMzID0gbWVbIDEwIF0sIG40MyA9IG1lWyAxMSBdLFxyXG5cdFx0XHRuMTQgPSBtZVsgMTIgXSwgbjI0ID0gbWVbIDEzIF0sIG4zNCA9IG1lWyAxNCBdLCBuNDQgPSBtZVsgMTUgXSxcclxuXHJcblx0XHRcdHQxMSA9IG4yMyAqIG4zNCAqIG40MiAtIG4yNCAqIG4zMyAqIG40MiArIG4yNCAqIG4zMiAqIG40MyAtIG4yMiAqIG4zNCAqIG40MyAtIG4yMyAqIG4zMiAqIG40NCArIG4yMiAqIG4zMyAqIG40NCxcclxuXHRcdFx0dDEyID0gbjE0ICogbjMzICogbjQyIC0gbjEzICogbjM0ICogbjQyIC0gbjE0ICogbjMyICogbjQzICsgbjEyICogbjM0ICogbjQzICsgbjEzICogbjMyICogbjQ0IC0gbjEyICogbjMzICogbjQ0LFxyXG5cdFx0XHR0MTMgPSBuMTMgKiBuMjQgKiBuNDIgLSBuMTQgKiBuMjMgKiBuNDIgKyBuMTQgKiBuMjIgKiBuNDMgLSBuMTIgKiBuMjQgKiBuNDMgLSBuMTMgKiBuMjIgKiBuNDQgKyBuMTIgKiBuMjMgKiBuNDQsXHJcblx0XHRcdHQxNCA9IG4xNCAqIG4yMyAqIG4zMiAtIG4xMyAqIG4yNCAqIG4zMiAtIG4xNCAqIG4yMiAqIG4zMyArIG4xMiAqIG4yNCAqIG4zMyArIG4xMyAqIG4yMiAqIG4zNCAtIG4xMiAqIG4yMyAqIG4zNDtcclxuXHJcblx0XHR2YXIgZGV0ID0gbjExICogdDExICsgbjIxICogdDEyICsgbjMxICogdDEzICsgbjQxICogdDE0O1xyXG5cclxuXHRcdGlmICggZGV0ID09PSAwICkge1xyXG5cclxuXHRcdFx0dmFyIG1zZyA9IFwiVEhSRUUuTWF0cml4NDogLmdldEludmVyc2UoKSBjYW4ndCBpbnZlcnQgbWF0cml4LCBkZXRlcm1pbmFudCBpcyAwXCI7XHJcblxyXG5cdFx0XHRpZiAoIHRocm93T25EZWdlbmVyYXRlID09PSB0cnVlICkge1xyXG5cclxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIG1zZyApO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0Y29uc29sZS53YXJuKCBtc2cgKTtcclxuXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiB0aGlzLmlkZW50aXR5KCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHRcdHZhciBkZXRJbnYgPSAxIC8gZGV0O1xyXG5cclxuXHRcdHRlWyAwIF0gPSB0MTEgKiBkZXRJbnY7XHJcblx0XHR0ZVsgMSBdID0gKCBuMjQgKiBuMzMgKiBuNDEgLSBuMjMgKiBuMzQgKiBuNDEgLSBuMjQgKiBuMzEgKiBuNDMgKyBuMjEgKiBuMzQgKiBuNDMgKyBuMjMgKiBuMzEgKiBuNDQgLSBuMjEgKiBuMzMgKiBuNDQgKSAqIGRldEludjtcclxuXHRcdHRlWyAyIF0gPSAoIG4yMiAqIG4zNCAqIG40MSAtIG4yNCAqIG4zMiAqIG40MSArIG4yNCAqIG4zMSAqIG40MiAtIG4yMSAqIG4zNCAqIG40MiAtIG4yMiAqIG4zMSAqIG40NCArIG4yMSAqIG4zMiAqIG40NCApICogZGV0SW52O1xyXG5cdFx0dGVbIDMgXSA9ICggbjIzICogbjMyICogbjQxIC0gbjIyICogbjMzICogbjQxIC0gbjIzICogbjMxICogbjQyICsgbjIxICogbjMzICogbjQyICsgbjIyICogbjMxICogbjQzIC0gbjIxICogbjMyICogbjQzICkgKiBkZXRJbnY7XHJcblxyXG5cdFx0dGVbIDQgXSA9IHQxMiAqIGRldEludjtcclxuXHRcdHRlWyA1IF0gPSAoIG4xMyAqIG4zNCAqIG40MSAtIG4xNCAqIG4zMyAqIG40MSArIG4xNCAqIG4zMSAqIG40MyAtIG4xMSAqIG4zNCAqIG40MyAtIG4xMyAqIG4zMSAqIG40NCArIG4xMSAqIG4zMyAqIG40NCApICogZGV0SW52O1xyXG5cdFx0dGVbIDYgXSA9ICggbjE0ICogbjMyICogbjQxIC0gbjEyICogbjM0ICogbjQxIC0gbjE0ICogbjMxICogbjQyICsgbjExICogbjM0ICogbjQyICsgbjEyICogbjMxICogbjQ0IC0gbjExICogbjMyICogbjQ0ICkgKiBkZXRJbnY7XHJcblx0XHR0ZVsgNyBdID0gKCBuMTIgKiBuMzMgKiBuNDEgLSBuMTMgKiBuMzIgKiBuNDEgKyBuMTMgKiBuMzEgKiBuNDIgLSBuMTEgKiBuMzMgKiBuNDIgLSBuMTIgKiBuMzEgKiBuNDMgKyBuMTEgKiBuMzIgKiBuNDMgKSAqIGRldEludjtcclxuXHJcblx0XHR0ZVsgOCBdID0gdDEzICogZGV0SW52O1xyXG5cdFx0dGVbIDkgXSA9ICggbjE0ICogbjIzICogbjQxIC0gbjEzICogbjI0ICogbjQxIC0gbjE0ICogbjIxICogbjQzICsgbjExICogbjI0ICogbjQzICsgbjEzICogbjIxICogbjQ0IC0gbjExICogbjIzICogbjQ0ICkgKiBkZXRJbnY7XHJcblx0XHR0ZVsgMTAgXSA9ICggbjEyICogbjI0ICogbjQxIC0gbjE0ICogbjIyICogbjQxICsgbjE0ICogbjIxICogbjQyIC0gbjExICogbjI0ICogbjQyIC0gbjEyICogbjIxICogbjQ0ICsgbjExICogbjIyICogbjQ0ICkgKiBkZXRJbnY7XHJcblx0XHR0ZVsgMTEgXSA9ICggbjEzICogbjIyICogbjQxIC0gbjEyICogbjIzICogbjQxIC0gbjEzICogbjIxICogbjQyICsgbjExICogbjIzICogbjQyICsgbjEyICogbjIxICogbjQzIC0gbjExICogbjIyICogbjQzICkgKiBkZXRJbnY7XHJcblxyXG5cdFx0dGVbIDEyIF0gPSB0MTQgKiBkZXRJbnY7XHJcblx0XHR0ZVsgMTMgXSA9ICggbjEzICogbjI0ICogbjMxIC0gbjE0ICogbjIzICogbjMxICsgbjE0ICogbjIxICogbjMzIC0gbjExICogbjI0ICogbjMzIC0gbjEzICogbjIxICogbjM0ICsgbjExICogbjIzICogbjM0ICkgKiBkZXRJbnY7XHJcblx0XHR0ZVsgMTQgXSA9ICggbjE0ICogbjIyICogbjMxIC0gbjEyICogbjI0ICogbjMxIC0gbjE0ICogbjIxICogbjMyICsgbjExICogbjI0ICogbjMyICsgbjEyICogbjIxICogbjM0IC0gbjExICogbjIyICogbjM0ICkgKiBkZXRJbnY7XHJcblx0XHR0ZVsgMTUgXSA9ICggbjEyICogbjIzICogbjMxIC0gbjEzICogbjIyICogbjMxICsgbjEzICogbjIxICogbjMyIC0gbjExICogbjIzICogbjMyIC0gbjEyICogbjIxICogbjMzICsgbjExICogbjIyICogbjMzICkgKiBkZXRJbnY7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHNjYWxlOiBmdW5jdGlvbiAoIHYgKSB7XHJcblxyXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcclxuXHRcdHZhciB4ID0gdi54LCB5ID0gdi55LCB6ID0gdi56O1xyXG5cclxuXHRcdHRlWyAwIF0gKj0geDsgdGVbIDQgXSAqPSB5OyB0ZVsgOCBdICo9IHo7XHJcblx0XHR0ZVsgMSBdICo9IHg7IHRlWyA1IF0gKj0geTsgdGVbIDkgXSAqPSB6O1xyXG5cdFx0dGVbIDIgXSAqPSB4OyB0ZVsgNiBdICo9IHk7IHRlWyAxMCBdICo9IHo7XHJcblx0XHR0ZVsgMyBdICo9IHg7IHRlWyA3IF0gKj0geTsgdGVbIDExIF0gKj0gejtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0Z2V0TWF4U2NhbGVPbkF4aXM6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdHZhciBzY2FsZVhTcSA9IHRlWyAwIF0gKiB0ZVsgMCBdICsgdGVbIDEgXSAqIHRlWyAxIF0gKyB0ZVsgMiBdICogdGVbIDIgXTtcclxuXHRcdHZhciBzY2FsZVlTcSA9IHRlWyA0IF0gKiB0ZVsgNCBdICsgdGVbIDUgXSAqIHRlWyA1IF0gKyB0ZVsgNiBdICogdGVbIDYgXTtcclxuXHRcdHZhciBzY2FsZVpTcSA9IHRlWyA4IF0gKiB0ZVsgOCBdICsgdGVbIDkgXSAqIHRlWyA5IF0gKyB0ZVsgMTAgXSAqIHRlWyAxMCBdO1xyXG5cclxuXHRcdHJldHVybiBNYXRoLnNxcnQoIE1hdGgubWF4KCBzY2FsZVhTcSwgc2NhbGVZU3EsIHNjYWxlWlNxICkgKTtcclxuXHJcblx0fSxcclxuXHJcblx0bWFrZVRyYW5zbGF0aW9uOiBmdW5jdGlvbiAoIHgsIHksIHogKSB7XHJcblxyXG5cdFx0dGhpcy5zZXQoXHJcblxyXG5cdFx0XHQxLCAwLCAwLCB4LFxyXG5cdFx0XHQwLCAxLCAwLCB5LFxyXG5cdFx0XHQwLCAwLCAxLCB6LFxyXG5cdFx0XHQwLCAwLCAwLCAxXHJcblxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0bWFrZVJvdGF0aW9uWDogZnVuY3Rpb24gKCB0aGV0YSApIHtcclxuXHJcblx0XHR2YXIgYyA9IE1hdGguY29zKCB0aGV0YSApLCBzID0gTWF0aC5zaW4oIHRoZXRhICk7XHJcblxyXG5cdFx0dGhpcy5zZXQoXHJcblxyXG5cdFx0XHQxLCAwLCAwLCAwLFxyXG5cdFx0XHQwLCBjLCAtIHMsIDAsXHJcblx0XHRcdDAsIHMsIGMsIDAsXHJcblx0XHRcdDAsIDAsIDAsIDFcclxuXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRtYWtlUm90YXRpb25ZOiBmdW5jdGlvbiAoIHRoZXRhICkge1xyXG5cclxuXHRcdHZhciBjID0gTWF0aC5jb3MoIHRoZXRhICksIHMgPSBNYXRoLnNpbiggdGhldGEgKTtcclxuXHJcblx0XHR0aGlzLnNldChcclxuXHJcblx0XHRcdCBjLCAwLCBzLCAwLFxyXG5cdFx0XHQgMCwgMSwgMCwgMCxcclxuXHRcdFx0LSBzLCAwLCBjLCAwLFxyXG5cdFx0XHQgMCwgMCwgMCwgMVxyXG5cclxuXHRcdCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdG1ha2VSb3RhdGlvblo6IGZ1bmN0aW9uICggdGhldGEgKSB7XHJcblxyXG5cdFx0dmFyIGMgPSBNYXRoLmNvcyggdGhldGEgKSwgcyA9IE1hdGguc2luKCB0aGV0YSApO1xyXG5cclxuXHRcdHRoaXMuc2V0KFxyXG5cclxuXHRcdFx0YywgLSBzLCAwLCAwLFxyXG5cdFx0XHRzLCBjLCAwLCAwLFxyXG5cdFx0XHQwLCAwLCAxLCAwLFxyXG5cdFx0XHQwLCAwLCAwLCAxXHJcblxyXG5cdFx0KTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0bWFrZVJvdGF0aW9uQXhpczogZnVuY3Rpb24gKCBheGlzLCBhbmdsZSApIHtcclxuXHJcblx0XHQvLyBCYXNlZCBvbiBodHRwOi8vd3d3LmdhbWVkZXYubmV0L3JlZmVyZW5jZS9hcnRpY2xlcy9hcnRpY2xlMTE5OS5hc3BcclxuXHJcblx0XHR2YXIgYyA9IE1hdGguY29zKCBhbmdsZSApO1xyXG5cdFx0dmFyIHMgPSBNYXRoLnNpbiggYW5nbGUgKTtcclxuXHRcdHZhciB0ID0gMSAtIGM7XHJcblx0XHR2YXIgeCA9IGF4aXMueCwgeSA9IGF4aXMueSwgeiA9IGF4aXMuejtcclxuXHRcdHZhciB0eCA9IHQgKiB4LCB0eSA9IHQgKiB5O1xyXG5cclxuXHRcdHRoaXMuc2V0KFxyXG5cclxuXHRcdFx0dHggKiB4ICsgYywgdHggKiB5IC0gcyAqIHosIHR4ICogeiArIHMgKiB5LCAwLFxyXG5cdFx0XHR0eCAqIHkgKyBzICogeiwgdHkgKiB5ICsgYywgdHkgKiB6IC0gcyAqIHgsIDAsXHJcblx0XHRcdHR4ICogeiAtIHMgKiB5LCB0eSAqIHogKyBzICogeCwgdCAqIHogKiB6ICsgYywgMCxcclxuXHRcdFx0MCwgMCwgMCwgMVxyXG5cclxuXHRcdCk7XHJcblxyXG5cdFx0IHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRtYWtlU2NhbGU6IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcclxuXHJcblx0XHR0aGlzLnNldChcclxuXHJcblx0XHRcdHgsIDAsIDAsIDAsXHJcblx0XHRcdDAsIHksIDAsIDAsXHJcblx0XHRcdDAsIDAsIHosIDAsXHJcblx0XHRcdDAsIDAsIDAsIDFcclxuXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRtYWtlU2hlYXI6IGZ1bmN0aW9uICggeCwgeSwgeiApIHtcclxuXHJcblx0XHR0aGlzLnNldChcclxuXHJcblx0XHRcdDEsIHksIHosIDAsXHJcblx0XHRcdHgsIDEsIHosIDAsXHJcblx0XHRcdHgsIHksIDEsIDAsXHJcblx0XHRcdDAsIDAsIDAsIDFcclxuXHJcblx0XHQpO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRjb21wb3NlOiBmdW5jdGlvbiAoIHBvc2l0aW9uLCBxdWF0ZXJuaW9uLCBzY2FsZSApIHtcclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdHZhciB4ID0gcXVhdGVybmlvbi5feCwgeSA9IHF1YXRlcm5pb24uX3ksIHogPSBxdWF0ZXJuaW9uLl96LCB3ID0gcXVhdGVybmlvbi5fdztcclxuXHRcdHZhciB4MiA9IHggKyB4LFx0eTIgPSB5ICsgeSwgejIgPSB6ICsgejtcclxuXHRcdHZhciB4eCA9IHggKiB4MiwgeHkgPSB4ICogeTIsIHh6ID0geCAqIHoyO1xyXG5cdFx0dmFyIHl5ID0geSAqIHkyLCB5eiA9IHkgKiB6MiwgenogPSB6ICogejI7XHJcblx0XHR2YXIgd3ggPSB3ICogeDIsIHd5ID0gdyAqIHkyLCB3eiA9IHcgKiB6MjtcclxuXHJcblx0XHR2YXIgc3ggPSBzY2FsZS54LCBzeSA9IHNjYWxlLnksIHN6ID0gc2NhbGUuejtcclxuXHJcblx0XHR0ZVsgMCBdID0gKCAxIC0gKCB5eSArIHp6ICkgKSAqIHN4O1xyXG5cdFx0dGVbIDEgXSA9ICggeHkgKyB3eiApICogc3g7XHJcblx0XHR0ZVsgMiBdID0gKCB4eiAtIHd5ICkgKiBzeDtcclxuXHRcdHRlWyAzIF0gPSAwO1xyXG5cclxuXHRcdHRlWyA0IF0gPSAoIHh5IC0gd3ogKSAqIHN5O1xyXG5cdFx0dGVbIDUgXSA9ICggMSAtICggeHggKyB6eiApICkgKiBzeTtcclxuXHRcdHRlWyA2IF0gPSAoIHl6ICsgd3ggKSAqIHN5O1xyXG5cdFx0dGVbIDcgXSA9IDA7XHJcblxyXG5cdFx0dGVbIDggXSA9ICggeHogKyB3eSApICogc3o7XHJcblx0XHR0ZVsgOSBdID0gKCB5eiAtIHd4ICkgKiBzejtcclxuXHRcdHRlWyAxMCBdID0gKCAxIC0gKCB4eCArIHl5ICkgKSAqIHN6O1xyXG5cdFx0dGVbIDExIF0gPSAwO1xyXG5cclxuXHRcdHRlWyAxMiBdID0gcG9zaXRpb24ueDtcclxuXHRcdHRlWyAxMyBdID0gcG9zaXRpb24ueTtcclxuXHRcdHRlWyAxNCBdID0gcG9zaXRpb24uejtcclxuXHRcdHRlWyAxNSBdID0gMTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0ZGVjb21wb3NlOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0dmFyIHZlY3RvciA9IG5ldyBWZWN0b3IzKCk7XHJcblx0XHR2YXIgbWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gZGVjb21wb3NlKCBwb3NpdGlvbiwgcXVhdGVybmlvbiwgc2NhbGUgKSB7XHJcblxyXG5cdFx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cclxuXHRcdFx0dmFyIHN4ID0gdmVjdG9yLnNldCggdGVbIDAgXSwgdGVbIDEgXSwgdGVbIDIgXSApLmxlbmd0aCgpO1xyXG5cdFx0XHR2YXIgc3kgPSB2ZWN0b3Iuc2V0KCB0ZVsgNCBdLCB0ZVsgNSBdLCB0ZVsgNiBdICkubGVuZ3RoKCk7XHJcblx0XHRcdHZhciBzeiA9IHZlY3Rvci5zZXQoIHRlWyA4IF0sIHRlWyA5IF0sIHRlWyAxMCBdICkubGVuZ3RoKCk7XHJcblxyXG5cdFx0XHQvLyBpZiBkZXRlcm1pbmUgaXMgbmVnYXRpdmUsIHdlIG5lZWQgdG8gaW52ZXJ0IG9uZSBzY2FsZVxyXG5cdFx0XHR2YXIgZGV0ID0gdGhpcy5kZXRlcm1pbmFudCgpO1xyXG5cdFx0XHRpZiAoIGRldCA8IDAgKSBzeCA9IC0gc3g7XHJcblxyXG5cdFx0XHRwb3NpdGlvbi54ID0gdGVbIDEyIF07XHJcblx0XHRcdHBvc2l0aW9uLnkgPSB0ZVsgMTMgXTtcclxuXHRcdFx0cG9zaXRpb24ueiA9IHRlWyAxNCBdO1xyXG5cclxuXHRcdFx0Ly8gc2NhbGUgdGhlIHJvdGF0aW9uIHBhcnRcclxuXHRcdFx0bWF0cml4LmNvcHkoIHRoaXMgKTtcclxuXHJcblx0XHRcdHZhciBpbnZTWCA9IDEgLyBzeDtcclxuXHRcdFx0dmFyIGludlNZID0gMSAvIHN5O1xyXG5cdFx0XHR2YXIgaW52U1ogPSAxIC8gc3o7XHJcblxyXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDAgXSAqPSBpbnZTWDtcclxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxIF0gKj0gaW52U1g7XHJcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgMiBdICo9IGludlNYO1xyXG5cclxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyA0IF0gKj0gaW52U1k7XHJcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgNSBdICo9IGludlNZO1xyXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDYgXSAqPSBpbnZTWTtcclxuXHJcblx0XHRcdG1hdHJpeC5lbGVtZW50c1sgOCBdICo9IGludlNaO1xyXG5cdFx0XHRtYXRyaXguZWxlbWVudHNbIDkgXSAqPSBpbnZTWjtcclxuXHRcdFx0bWF0cml4LmVsZW1lbnRzWyAxMCBdICo9IGludlNaO1xyXG5cclxuXHRcdFx0cXVhdGVybmlvbi5zZXRGcm9tUm90YXRpb25NYXRyaXgoIG1hdHJpeCApO1xyXG5cclxuXHRcdFx0c2NhbGUueCA9IHN4O1xyXG5cdFx0XHRzY2FsZS55ID0gc3k7XHJcblx0XHRcdHNjYWxlLnogPSBzejtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHRcdH07XHJcblxyXG5cdH0oKSxcclxuXHJcblx0bWFrZVBlcnNwZWN0aXZlOiBmdW5jdGlvbiAoIGxlZnQsIHJpZ2h0LCB0b3AsIGJvdHRvbSwgbmVhciwgZmFyICkge1xyXG5cclxuXHRcdGlmICggZmFyID09PSB1bmRlZmluZWQgKSB7XHJcblxyXG5cdFx0XHRjb25zb2xlLndhcm4oICdUSFJFRS5NYXRyaXg0OiAubWFrZVBlcnNwZWN0aXZlKCkgaGFzIGJlZW4gcmVkZWZpbmVkIGFuZCBoYXMgYSBuZXcgc2lnbmF0dXJlLiBQbGVhc2UgY2hlY2sgdGhlIGRvY3MuJyApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cdFx0dmFyIHggPSAyICogbmVhciAvICggcmlnaHQgLSBsZWZ0ICk7XHJcblx0XHR2YXIgeSA9IDIgKiBuZWFyIC8gKCB0b3AgLSBib3R0b20gKTtcclxuXHJcblx0XHR2YXIgYSA9ICggcmlnaHQgKyBsZWZ0ICkgLyAoIHJpZ2h0IC0gbGVmdCApO1xyXG5cdFx0dmFyIGIgPSAoIHRvcCArIGJvdHRvbSApIC8gKCB0b3AgLSBib3R0b20gKTtcclxuXHRcdHZhciBjID0gLSAoIGZhciArIG5lYXIgKSAvICggZmFyIC0gbmVhciApO1xyXG5cdFx0dmFyIGQgPSAtIDIgKiBmYXIgKiBuZWFyIC8gKCBmYXIgLSBuZWFyICk7XHJcblxyXG5cdFx0dGVbIDAgXSA9IHg7XHR0ZVsgNCBdID0gMDtcdHRlWyA4IF0gPSBhO1x0dGVbIDEyIF0gPSAwO1xyXG5cdFx0dGVbIDEgXSA9IDA7XHR0ZVsgNSBdID0geTtcdHRlWyA5IF0gPSBiO1x0dGVbIDEzIF0gPSAwO1xyXG5cdFx0dGVbIDIgXSA9IDA7XHR0ZVsgNiBdID0gMDtcdHRlWyAxMCBdID0gYztcdHRlWyAxNCBdID0gZDtcclxuXHRcdHRlWyAzIF0gPSAwO1x0dGVbIDcgXSA9IDA7XHR0ZVsgMTEgXSA9IC0gMTtcdHRlWyAxNSBdID0gMDtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0bWFrZU9ydGhvZ3JhcGhpYzogZnVuY3Rpb24gKCBsZWZ0LCByaWdodCwgdG9wLCBib3R0b20sIG5lYXIsIGZhciApIHtcclxuXHJcblx0XHR2YXIgdGUgPSB0aGlzLmVsZW1lbnRzO1xyXG5cdFx0dmFyIHcgPSAxLjAgLyAoIHJpZ2h0IC0gbGVmdCApO1xyXG5cdFx0dmFyIGggPSAxLjAgLyAoIHRvcCAtIGJvdHRvbSApO1xyXG5cdFx0dmFyIHAgPSAxLjAgLyAoIGZhciAtIG5lYXIgKTtcclxuXHJcblx0XHR2YXIgeCA9ICggcmlnaHQgKyBsZWZ0ICkgKiB3O1xyXG5cdFx0dmFyIHkgPSAoIHRvcCArIGJvdHRvbSApICogaDtcclxuXHRcdHZhciB6ID0gKCBmYXIgKyBuZWFyICkgKiBwO1xyXG5cclxuXHRcdHRlWyAwIF0gPSAyICogdztcdHRlWyA0IF0gPSAwO1x0dGVbIDggXSA9IDA7XHR0ZVsgMTIgXSA9IC0geDtcclxuXHRcdHRlWyAxIF0gPSAwO1x0dGVbIDUgXSA9IDIgKiBoO1x0dGVbIDkgXSA9IDA7XHR0ZVsgMTMgXSA9IC0geTtcclxuXHRcdHRlWyAyIF0gPSAwO1x0dGVbIDYgXSA9IDA7XHR0ZVsgMTAgXSA9IC0gMiAqIHA7XHR0ZVsgMTQgXSA9IC0gejtcclxuXHRcdHRlWyAzIF0gPSAwO1x0dGVbIDcgXSA9IDA7XHR0ZVsgMTEgXSA9IDA7XHR0ZVsgMTUgXSA9IDE7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGVxdWFsczogZnVuY3Rpb24gKCBtYXRyaXggKSB7XHJcblxyXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcclxuXHRcdHZhciBtZSA9IG1hdHJpeC5lbGVtZW50cztcclxuXHJcblx0XHRmb3IgKCB2YXIgaSA9IDA7IGkgPCAxNjsgaSArKyApIHtcclxuXHJcblx0XHRcdGlmICggdGVbIGkgXSAhPT0gbWVbIGkgXSApIHJldHVybiBmYWxzZTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRydWU7XHJcblxyXG5cdH0sXHJcblxyXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSwgb2Zmc2V0ICkge1xyXG5cclxuXHRcdGlmICggb2Zmc2V0ID09PSB1bmRlZmluZWQgKSBvZmZzZXQgPSAwO1xyXG5cclxuXHRcdGZvciAoIHZhciBpID0gMDsgaSA8IDE2OyBpICsrICkge1xyXG5cclxuXHRcdFx0dGhpcy5lbGVtZW50c1sgaSBdID0gYXJyYXlbIGkgKyBvZmZzZXQgXTtcclxuXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcclxuXHJcblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xyXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XHJcblxyXG5cdFx0dmFyIHRlID0gdGhpcy5lbGVtZW50cztcclxuXHJcblx0XHRhcnJheVsgb2Zmc2V0IF0gPSB0ZVsgMCBdO1xyXG5cdFx0YXJyYXlbIG9mZnNldCArIDEgXSA9IHRlWyAxIF07XHJcblx0XHRhcnJheVsgb2Zmc2V0ICsgMiBdID0gdGVbIDIgXTtcclxuXHRcdGFycmF5WyBvZmZzZXQgKyAzIF0gPSB0ZVsgMyBdO1xyXG5cclxuXHRcdGFycmF5WyBvZmZzZXQgKyA0IF0gPSB0ZVsgNCBdO1xyXG5cdFx0YXJyYXlbIG9mZnNldCArIDUgXSA9IHRlWyA1IF07XHJcblx0XHRhcnJheVsgb2Zmc2V0ICsgNiBdID0gdGVbIDYgXTtcclxuXHRcdGFycmF5WyBvZmZzZXQgKyA3IF0gPSB0ZVsgNyBdO1xyXG5cclxuXHRcdGFycmF5WyBvZmZzZXQgKyA4IF0gPSB0ZVsgOCBdO1xyXG5cdFx0YXJyYXlbIG9mZnNldCArIDkgXSA9IHRlWyA5IF07XHJcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTAgXSA9IHRlWyAxMCBdO1xyXG5cdFx0YXJyYXlbIG9mZnNldCArIDExIF0gPSB0ZVsgMTEgXTtcclxuXHJcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTIgXSA9IHRlWyAxMiBdO1xyXG5cdFx0YXJyYXlbIG9mZnNldCArIDEzIF0gPSB0ZVsgMTMgXTtcclxuXHRcdGFycmF5WyBvZmZzZXQgKyAxNCBdID0gdGVbIDE0IF07XHJcblx0XHRhcnJheVsgb2Zmc2V0ICsgMTUgXSA9IHRlWyAxNSBdO1xyXG5cclxuXHRcdHJldHVybiBhcnJheTtcclxuXHJcblx0fVxyXG5cclxufSApO1xyXG5cclxuXHJcbmV4cG9ydCB7IE1hdHJpeDQgfTsiXX0=