import { Quaternion } from './Quaternion.js';
import { Vector3 } from './Vector3.js';
import { Matrix4 } from './Matrix4.js';
import { _Math } from './Math.js';
/**
 * @author mrdoob / http://mrdoob.com/
 * @author WestLangley / http://github.com/WestLangley
 * @author bhouston / http://clara.io
 */

function Euler(x, y, z, order) {
  this._x = x || 0;
  this._y = y || 0;
  this._z = z || 0;
  this._order = order || Euler.DefaultOrder;
}

Euler.RotationOrders = ['XYZ', 'YZX', 'ZXY', 'XZY', 'YXZ', 'ZYX'];
Euler.DefaultOrder = 'XYZ';
Object.defineProperties(Euler.prototype, {
  x: {
    get: function () {
      return this._x;
    },
    set: function (value) {
      this._x = value;

      this._onChangeCallback();
    }
  },
  y: {
    get: function () {
      return this._y;
    },
    set: function (value) {
      this._y = value;

      this._onChangeCallback();
    }
  },
  z: {
    get: function () {
      return this._z;
    },
    set: function (value) {
      this._z = value;

      this._onChangeCallback();
    }
  },
  order: {
    get: function () {
      return this._order;
    },
    set: function (value) {
      this._order = value;

      this._onChangeCallback();
    }
  }
});
Object.assign(Euler.prototype, {
  isEuler: true,
  set: function (x, y, z, order) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._order = order || this._order;

    this._onChangeCallback();

    return this;
  },
  clone: function () {
    return new this.constructor(this._x, this._y, this._z, this._order);
  },
  copy: function (euler) {
    this._x = euler._x;
    this._y = euler._y;
    this._z = euler._z;
    this._order = euler._order;

    this._onChangeCallback();

    return this;
  },
  setFromRotationMatrix: function (m, order, update) {
    var clamp = _Math.clamp; // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)

    var te = m.elements;
    var m11 = te[0],
        m12 = te[4],
        m13 = te[8];
    var m21 = te[1],
        m22 = te[5],
        m23 = te[9];
    var m31 = te[2],
        m32 = te[6],
        m33 = te[10];
    order = order || this._order;

    if (order === 'XYZ') {
      this._y = Math.asin(clamp(m13, -1, 1));

      if (Math.abs(m13) < 0.99999) {
        this._x = Math.atan2(-m23, m33);
        this._z = Math.atan2(-m12, m11);
      } else {
        this._x = Math.atan2(m32, m22);
        this._z = 0;
      }
    } else if (order === 'YXZ') {
      this._x = Math.asin(-clamp(m23, -1, 1));

      if (Math.abs(m23) < 0.99999) {
        this._y = Math.atan2(m13, m33);
        this._z = Math.atan2(m21, m22);
      } else {
        this._y = Math.atan2(-m31, m11);
        this._z = 0;
      }
    } else if (order === 'ZXY') {
      this._x = Math.asin(clamp(m32, -1, 1));

      if (Math.abs(m32) < 0.99999) {
        this._y = Math.atan2(-m31, m33);
        this._z = Math.atan2(-m12, m22);
      } else {
        this._y = 0;
        this._z = Math.atan2(m21, m11);
      }
    } else if (order === 'ZYX') {
      this._y = Math.asin(-clamp(m31, -1, 1));

      if (Math.abs(m31) < 0.99999) {
        this._x = Math.atan2(m32, m33);
        this._z = Math.atan2(m21, m11);
      } else {
        this._x = 0;
        this._z = Math.atan2(-m12, m22);
      }
    } else if (order === 'YZX') {
      this._z = Math.asin(clamp(m21, -1, 1));

      if (Math.abs(m21) < 0.99999) {
        this._x = Math.atan2(-m23, m22);
        this._y = Math.atan2(-m31, m11);
      } else {
        this._x = 0;
        this._y = Math.atan2(m13, m33);
      }
    } else if (order === 'XZY') {
      this._z = Math.asin(-clamp(m12, -1, 1));

      if (Math.abs(m12) < 0.99999) {
        this._x = Math.atan2(m32, m22);
        this._y = Math.atan2(m13, m11);
      } else {
        this._x = Math.atan2(-m23, m33);
        this._y = 0;
      }
    } else {
      console.warn('THREE.Euler: .setFromRotationMatrix() given unsupported order: ' + order);
    }

    this._order = order;
    if (update !== false) this._onChangeCallback();
    return this;
  },
  setFromQuaternion: function () {
    var matrix = new Matrix4();
    return function setFromQuaternion(q, order, update) {
      matrix.makeRotationFromQuaternion(q);
      return this.setFromRotationMatrix(matrix, order, update);
    };
  }(),
  setFromVector3: function (v, order) {
    return this.set(v.x, v.y, v.z, order || this._order);
  },
  reorder: function () {
    // WARNING: this discards revolution information -bhouston
    var q = new Quaternion();
    return function reorder(newOrder) {
      q.setFromEuler(this);
      return this.setFromQuaternion(q, newOrder);
    };
  }(),
  equals: function (euler) {
    return euler._x === this._x && euler._y === this._y && euler._z === this._z && euler._order === this._order;
  },
  fromArray: function (array) {
    this._x = array[0];
    this._y = array[1];
    this._z = array[2];
    if (array[3] !== undefined) this._order = array[3];

    this._onChangeCallback();

    return this;
  },
  toArray: function (array, offset) {
    if (array === undefined) array = [];
    if (offset === undefined) offset = 0;
    array[offset] = this._x;
    array[offset + 1] = this._y;
    array[offset + 2] = this._z;
    array[offset + 3] = this._order;
    return array;
  },
  toVector3: function (optionalResult) {
    if (optionalResult) {
      return optionalResult.set(this._x, this._y, this._z);
    } else {
      return new Vector3(this._x, this._y, this._z);
    }
  },
  _onChange: function (callback) {
    this._onChangeCallback = callback;
    return this;
  },
  _onChangeCallback: function () {}
});
export { Euler };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3RocmVlL0V1bGVyLmpzIl0sIm5hbWVzIjpbIlF1YXRlcm5pb24iLCJWZWN0b3IzIiwiTWF0cml4NCIsIl9NYXRoIiwiRXVsZXIiLCJ4IiwieSIsInoiLCJvcmRlciIsIl94IiwiX3kiLCJfeiIsIl9vcmRlciIsIkRlZmF1bHRPcmRlciIsIlJvdGF0aW9uT3JkZXJzIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydGllcyIsInByb3RvdHlwZSIsImdldCIsInNldCIsInZhbHVlIiwiX29uQ2hhbmdlQ2FsbGJhY2siLCJhc3NpZ24iLCJpc0V1bGVyIiwiY2xvbmUiLCJjb25zdHJ1Y3RvciIsImNvcHkiLCJldWxlciIsInNldEZyb21Sb3RhdGlvbk1hdHJpeCIsIm0iLCJ1cGRhdGUiLCJjbGFtcCIsInRlIiwiZWxlbWVudHMiLCJtMTEiLCJtMTIiLCJtMTMiLCJtMjEiLCJtMjIiLCJtMjMiLCJtMzEiLCJtMzIiLCJtMzMiLCJNYXRoIiwiYXNpbiIsImFicyIsImF0YW4yIiwiY29uc29sZSIsIndhcm4iLCJzZXRGcm9tUXVhdGVybmlvbiIsIm1hdHJpeCIsInEiLCJtYWtlUm90YXRpb25Gcm9tUXVhdGVybmlvbiIsInNldEZyb21WZWN0b3IzIiwidiIsInJlb3JkZXIiLCJuZXdPcmRlciIsInNldEZyb21FdWxlciIsImVxdWFscyIsImZyb21BcnJheSIsImFycmF5IiwidW5kZWZpbmVkIiwidG9BcnJheSIsIm9mZnNldCIsInRvVmVjdG9yMyIsIm9wdGlvbmFsUmVzdWx0IiwiX29uQ2hhbmdlIiwiY2FsbGJhY2siXSwibWFwcGluZ3MiOiJBQUFBLFNBQVNBLFVBQVQsUUFBMkIsaUJBQTNCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixjQUF4QjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsY0FBeEI7QUFDQSxTQUFTQyxLQUFULFFBQXNCLFdBQXRCO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTQyxLQUFULENBQWdCQyxD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LEtBQUtWLEVBQXpCLEVBQTZCLEtBQUtDLEVBQWxDLEVBQXNDLEtBQUtDLEVBQTNDLENBQVA7QUFFQSxLQUpELE1BSU87QUFFTixhQUFPLElBQUlWLE9BQUosQ0FBYSxLQUFLUSxFQUFsQixFQUFzQixLQUFLQyxFQUEzQixFQUErQixLQUFLQyxFQUFwQyxDQUFQO0FBRUE7QUFFRCxHQWhQOEI7QUFrUC9CdUQsRUFBQUEsU0FBUyxFQUFFLFVBQVdDLFFBQVgsRUFBc0I7QUFFaEMsU0FBSzlDLGlCQUFMLEdBQXlCOEMsUUFBekI7QUFFQSxXQUFPLElBQVA7QUFFQSxHQXhQOEI7QUEwUC9COUMsRUFBQUEsaUJBQWlCLEVBQUUsWUFBWSxDQUFFO0FBMVBGLENBQWhDO0FBK1BBLFNBQVNqQixLQUFUIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVhdGVybmlvbiB9IGZyb20gJy4vUXVhdGVybmlvbi5qcyc7XHJcbmltcG9ydCB7IFZlY3RvcjMgfSBmcm9tICcuL1ZlY3RvcjMuanMnO1xyXG5pbXBvcnQgeyBNYXRyaXg0IH0gZnJvbSAnLi9NYXRyaXg0LmpzJztcclxuaW1wb3J0IHsgX01hdGggfSBmcm9tICcuL01hdGguanMnO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgbXJkb29iIC8gaHR0cDovL21yZG9vYi5jb20vXHJcbiAqIEBhdXRob3IgV2VzdExhbmdsZXkgLyBodHRwOi8vZ2l0aHViLmNvbS9XZXN0TGFuZ2xleVxyXG4gKiBAYXV0aG9yIGJob3VzdG9uIC8gaHR0cDovL2NsYXJhLmlvXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gRXVsZXIoIHgsIHksIHosIG9yZGVyICkge1xyXG5cclxuXHR0aGlzLl94ID0geCB8fCAwO1xyXG5cdHRoaXMuX3kgPSB5IHx8IDA7XHJcblx0dGhpcy5feiA9IHogfHwgMDtcclxuXHR0aGlzLl9vcmRlciA9IG9yZGVyIHx8IEV1bGVyLkRlZmF1bHRPcmRlcjtcclxuXHJcbn1cclxuXHJcbkV1bGVyLlJvdGF0aW9uT3JkZXJzID0gWyAnWFlaJywgJ1laWCcsICdaWFknLCAnWFpZJywgJ1lYWicsICdaWVgnIF07XHJcblxyXG5FdWxlci5EZWZhdWx0T3JkZXIgPSAnWFlaJztcclxuXHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBFdWxlci5wcm90b3R5cGUsIHtcclxuXHJcblx0eDoge1xyXG5cclxuXHRcdGdldDogZnVuY3Rpb24gKCkge1xyXG5cclxuXHRcdFx0cmV0dXJuIHRoaXMuX3g7XHJcblxyXG5cdFx0fSxcclxuXHJcblx0XHRzZXQ6IGZ1bmN0aW9uICggdmFsdWUgKSB7XHJcblxyXG5cdFx0XHR0aGlzLl94ID0gdmFsdWU7XHJcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0sXHJcblxyXG5cdHk6IHtcclxuXHJcblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLl95O1xyXG5cclxuXHRcdH0sXHJcblxyXG5cdFx0c2V0OiBmdW5jdGlvbiAoIHZhbHVlICkge1xyXG5cclxuXHRcdFx0dGhpcy5feSA9IHZhbHVlO1xyXG5cdFx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHR6OiB7XHJcblxyXG5cdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5fejtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRoaXMuX3ogPSB2YWx1ZTtcclxuXHRcdFx0dGhpcy5fb25DaGFuZ2VDYWxsYmFjaygpO1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSxcclxuXHJcblx0b3JkZXI6IHtcclxuXHJcblx0XHRnZXQ6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLl9vcmRlcjtcclxuXHJcblx0XHR9LFxyXG5cclxuXHRcdHNldDogZnVuY3Rpb24gKCB2YWx1ZSApIHtcclxuXHJcblx0XHRcdHRoaXMuX29yZGVyID0gdmFsdWU7XHJcblx0XHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcclxuXHJcblx0XHR9XHJcblxyXG5cdH1cclxuXHJcbn0gKTtcclxuXHJcbk9iamVjdC5hc3NpZ24oIEV1bGVyLnByb3RvdHlwZSwge1xyXG5cclxuXHRpc0V1bGVyOiB0cnVlLFxyXG5cclxuXHRzZXQ6IGZ1bmN0aW9uICggeCwgeSwgeiwgb3JkZXIgKSB7XHJcblxyXG5cdFx0dGhpcy5feCA9IHg7XHJcblx0XHR0aGlzLl95ID0geTtcclxuXHRcdHRoaXMuX3ogPSB6O1xyXG5cdFx0dGhpcy5fb3JkZXIgPSBvcmRlciB8fCB0aGlzLl9vcmRlcjtcclxuXHJcblx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdGNsb25lOiBmdW5jdGlvbiAoKSB7XHJcblxyXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96LCB0aGlzLl9vcmRlciApO1xyXG5cclxuXHR9LFxyXG5cclxuXHRjb3B5OiBmdW5jdGlvbiAoIGV1bGVyICkge1xyXG5cclxuXHRcdHRoaXMuX3ggPSBldWxlci5feDtcclxuXHRcdHRoaXMuX3kgPSBldWxlci5feTtcclxuXHRcdHRoaXMuX3ogPSBldWxlci5fejtcclxuXHRcdHRoaXMuX29yZGVyID0gZXVsZXIuX29yZGVyO1xyXG5cclxuXHRcdHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c2V0RnJvbVJvdGF0aW9uTWF0cml4OiBmdW5jdGlvbiAoIG0sIG9yZGVyLCB1cGRhdGUgKSB7XHJcblxyXG5cdFx0dmFyIGNsYW1wID0gX01hdGguY2xhbXA7XHJcblxyXG5cdFx0Ly8gYXNzdW1lcyB0aGUgdXBwZXIgM3gzIG9mIG0gaXMgYSBwdXJlIHJvdGF0aW9uIG1hdHJpeCAoaS5lLCB1bnNjYWxlZClcclxuXHJcblx0XHR2YXIgdGUgPSBtLmVsZW1lbnRzO1xyXG5cdFx0dmFyIG0xMSA9IHRlWyAwIF0sIG0xMiA9IHRlWyA0IF0sIG0xMyA9IHRlWyA4IF07XHJcblx0XHR2YXIgbTIxID0gdGVbIDEgXSwgbTIyID0gdGVbIDUgXSwgbTIzID0gdGVbIDkgXTtcclxuXHRcdHZhciBtMzEgPSB0ZVsgMiBdLCBtMzIgPSB0ZVsgNiBdLCBtMzMgPSB0ZVsgMTAgXTtcclxuXHJcblx0XHRvcmRlciA9IG9yZGVyIHx8IHRoaXMuX29yZGVyO1xyXG5cclxuXHRcdGlmICggb3JkZXIgPT09ICdYWVonICkge1xyXG5cclxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggY2xhbXAoIG0xMywgLSAxLCAxICkgKTtcclxuXHJcblx0XHRcdGlmICggTWF0aC5hYnMoIG0xMyApIDwgMC45OTk5OSApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMzMgKTtcclxuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0xMSApO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIG0zMiwgbTIyICk7XHJcblx0XHRcdFx0dGhpcy5feiA9IDA7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdZWFonICkge1xyXG5cclxuXHRcdFx0dGhpcy5feCA9IE1hdGguYXNpbiggLSBjbGFtcCggbTIzLCAtIDEsIDEgKSApO1xyXG5cclxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTIzICkgPCAwLjk5OTk5ICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMzMgKTtcclxuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMjIgKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3kgPSBNYXRoLmF0YW4yKCAtIG0zMSwgbTExICk7XHJcblx0XHRcdFx0dGhpcy5feiA9IDA7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdaWFknICkge1xyXG5cclxuXHRcdFx0dGhpcy5feCA9IE1hdGguYXNpbiggY2xhbXAoIG0zMiwgLSAxLCAxICkgKTtcclxuXHJcblx0XHRcdGlmICggTWF0aC5hYnMoIG0zMiApIDwgMC45OTk5OSApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIC0gbTMxLCBtMzMgKTtcclxuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggLSBtMTIsIG0yMiApO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGhpcy5feSA9IDA7XHJcblx0XHRcdFx0dGhpcy5feiA9IE1hdGguYXRhbjIoIG0yMSwgbTExICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdaWVgnICkge1xyXG5cclxuXHRcdFx0dGhpcy5feSA9IE1hdGguYXNpbiggLSBjbGFtcCggbTMxLCAtIDEsIDEgKSApO1xyXG5cclxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTMxICkgPCAwLjk5OTk5ICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMzMgKTtcclxuXHRcdFx0XHR0aGlzLl96ID0gTWF0aC5hdGFuMiggbTIxLCBtMTEgKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3ggPSAwO1xyXG5cdFx0XHRcdHRoaXMuX3ogPSBNYXRoLmF0YW4yKCAtIG0xMiwgbTIyICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdZWlgnICkge1xyXG5cclxuXHRcdFx0dGhpcy5feiA9IE1hdGguYXNpbiggY2xhbXAoIG0yMSwgLSAxLCAxICkgKTtcclxuXHJcblx0XHRcdGlmICggTWF0aC5hYnMoIG0yMSApIDwgMC45OTk5OSApIHtcclxuXHJcblx0XHRcdFx0dGhpcy5feCA9IE1hdGguYXRhbjIoIC0gbTIzLCBtMjIgKTtcclxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggLSBtMzEsIG0xMSApO1xyXG5cclxuXHRcdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdFx0dGhpcy5feCA9IDA7XHJcblx0XHRcdFx0dGhpcy5feSA9IE1hdGguYXRhbjIoIG0xMywgbTMzICk7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIGlmICggb3JkZXIgPT09ICdYWlknICkge1xyXG5cclxuXHRcdFx0dGhpcy5feiA9IE1hdGguYXNpbiggLSBjbGFtcCggbTEyLCAtIDEsIDEgKSApO1xyXG5cclxuXHRcdFx0aWYgKCBNYXRoLmFicyggbTEyICkgPCAwLjk5OTk5ICkge1xyXG5cclxuXHRcdFx0XHR0aGlzLl94ID0gTWF0aC5hdGFuMiggbTMyLCBtMjIgKTtcclxuXHRcdFx0XHR0aGlzLl95ID0gTWF0aC5hdGFuMiggbTEzLCBtMTEgKTtcclxuXHJcblx0XHRcdH0gZWxzZSB7XHJcblxyXG5cdFx0XHRcdHRoaXMuX3ggPSBNYXRoLmF0YW4yKCAtIG0yMywgbTMzICk7XHJcblx0XHRcdFx0dGhpcy5feSA9IDA7XHJcblxyXG5cdFx0XHR9XHJcblxyXG5cdFx0fSBlbHNlIHtcclxuXHJcblx0XHRcdGNvbnNvbGUud2FybiggJ1RIUkVFLkV1bGVyOiAuc2V0RnJvbVJvdGF0aW9uTWF0cml4KCkgZ2l2ZW4gdW5zdXBwb3J0ZWQgb3JkZXI6ICcgKyBvcmRlciApO1xyXG5cclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLl9vcmRlciA9IG9yZGVyO1xyXG5cclxuXHRcdGlmICggdXBkYXRlICE9PSBmYWxzZSApIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2soKTtcclxuXHJcblx0XHRyZXR1cm4gdGhpcztcclxuXHJcblx0fSxcclxuXHJcblx0c2V0RnJvbVF1YXRlcm5pb246IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHR2YXIgbWF0cml4ID0gbmV3IE1hdHJpeDQoKTtcclxuXHJcblx0XHRyZXR1cm4gZnVuY3Rpb24gc2V0RnJvbVF1YXRlcm5pb24oIHEsIG9yZGVyLCB1cGRhdGUgKSB7XHJcblxyXG5cdFx0XHRtYXRyaXgubWFrZVJvdGF0aW9uRnJvbVF1YXRlcm5pb24oIHEgKTtcclxuXHJcblx0XHRcdHJldHVybiB0aGlzLnNldEZyb21Sb3RhdGlvbk1hdHJpeCggbWF0cml4LCBvcmRlciwgdXBkYXRlICk7XHJcblxyXG5cdFx0fTtcclxuXHJcblx0fSgpLFxyXG5cclxuXHRzZXRGcm9tVmVjdG9yMzogZnVuY3Rpb24gKCB2LCBvcmRlciApIHtcclxuXHJcblx0XHRyZXR1cm4gdGhpcy5zZXQoIHYueCwgdi55LCB2LnosIG9yZGVyIHx8IHRoaXMuX29yZGVyICk7XHJcblxyXG5cdH0sXHJcblxyXG5cdHJlb3JkZXI6IGZ1bmN0aW9uICgpIHtcclxuXHJcblx0XHQvLyBXQVJOSU5HOiB0aGlzIGRpc2NhcmRzIHJldm9sdXRpb24gaW5mb3JtYXRpb24gLWJob3VzdG9uXHJcblxyXG5cdFx0dmFyIHEgPSBuZXcgUXVhdGVybmlvbigpO1xyXG5cclxuXHRcdHJldHVybiBmdW5jdGlvbiByZW9yZGVyKCBuZXdPcmRlciApIHtcclxuXHJcblx0XHRcdHEuc2V0RnJvbUV1bGVyKCB0aGlzICk7XHJcblxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zZXRGcm9tUXVhdGVybmlvbiggcSwgbmV3T3JkZXIgKTtcclxuXHJcblx0XHR9O1xyXG5cclxuXHR9KCksXHJcblxyXG5cdGVxdWFsczogZnVuY3Rpb24gKCBldWxlciApIHtcclxuXHJcblx0XHRyZXR1cm4gKCBldWxlci5feCA9PT0gdGhpcy5feCApICYmICggZXVsZXIuX3kgPT09IHRoaXMuX3kgKSAmJiAoIGV1bGVyLl96ID09PSB0aGlzLl96ICkgJiYgKCBldWxlci5fb3JkZXIgPT09IHRoaXMuX29yZGVyICk7XHJcblxyXG5cdH0sXHJcblxyXG5cdGZyb21BcnJheTogZnVuY3Rpb24gKCBhcnJheSApIHtcclxuXHJcblx0XHR0aGlzLl94ID0gYXJyYXlbIDAgXTtcclxuXHRcdHRoaXMuX3kgPSBhcnJheVsgMSBdO1xyXG5cdFx0dGhpcy5feiA9IGFycmF5WyAyIF07XHJcblx0XHRpZiAoIGFycmF5WyAzIF0gIT09IHVuZGVmaW5lZCApIHRoaXMuX29yZGVyID0gYXJyYXlbIDMgXTtcclxuXHJcblx0XHR0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKCk7XHJcblxyXG5cdFx0cmV0dXJuIHRoaXM7XHJcblxyXG5cdH0sXHJcblxyXG5cdHRvQXJyYXk6IGZ1bmN0aW9uICggYXJyYXksIG9mZnNldCApIHtcclxuXHJcblx0XHRpZiAoIGFycmF5ID09PSB1bmRlZmluZWQgKSBhcnJheSA9IFtdO1xyXG5cdFx0aWYgKCBvZmZzZXQgPT09IHVuZGVmaW5lZCApIG9mZnNldCA9IDA7XHJcblxyXG5cdFx0YXJyYXlbIG9mZnNldCBdID0gdGhpcy5feDtcclxuXHRcdGFycmF5WyBvZmZzZXQgKyAxIF0gPSB0aGlzLl95O1xyXG5cdFx0YXJyYXlbIG9mZnNldCArIDIgXSA9IHRoaXMuX3o7XHJcblx0XHRhcnJheVsgb2Zmc2V0ICsgMyBdID0gdGhpcy5fb3JkZXI7XHJcblxyXG5cdFx0cmV0dXJuIGFycmF5O1xyXG5cclxuXHR9LFxyXG5cclxuXHR0b1ZlY3RvcjM6IGZ1bmN0aW9uICggb3B0aW9uYWxSZXN1bHQgKSB7XHJcblxyXG5cdFx0aWYgKCBvcHRpb25hbFJlc3VsdCApIHtcclxuXHJcblx0XHRcdHJldHVybiBvcHRpb25hbFJlc3VsdC5zZXQoIHRoaXMuX3gsIHRoaXMuX3ksIHRoaXMuX3ogKTtcclxuXHJcblx0XHR9IGVsc2Uge1xyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBWZWN0b3IzKCB0aGlzLl94LCB0aGlzLl95LCB0aGlzLl96ICk7XHJcblxyXG5cdFx0fVxyXG5cclxuXHR9LFxyXG5cclxuXHRfb25DaGFuZ2U6IGZ1bmN0aW9uICggY2FsbGJhY2sgKSB7XHJcblxyXG5cdFx0dGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGNhbGxiYWNrO1xyXG5cclxuXHRcdHJldHVybiB0aGlzO1xyXG5cclxuXHR9LFxyXG5cclxuXHRfb25DaGFuZ2VDYWxsYmFjazogZnVuY3Rpb24gKCkge31cclxuXHJcbn0gKTtcclxuXHJcblxyXG5leHBvcnQgeyBFdWxlciB9OyJdfQ==