import THREEUtil from '../utils/THREEUtil';
import Vector3D from '../math/Vector3D';
import Zone from './Zone';
import { ZONE_TYPE_SCREEN as type } from './types';
export default class ScreenZone extends Zone {
  /**
   * ScreenZone is a 3d line zone
   * @param {Number|Vector3D} x1 - the line's start point of x value or a Vector3D Object
   * @param {Number|Vector3D} y1 - the line's start point of y value or a Vector3D Object
   * @param {Number} z1 - the line's start point of z value
   * @param {Number} x2 - the line's end point of x value
   * @param {Number} y2 - the line's end point of y value
   * @param {Number} z2 - the line's end point of z value
   * @example
   * var lineZone = new ScreenZone(0,0,0,100,100,0);
   * or
   * var lineZone = new ScreenZone(new Vector3D(0,0,0),new Vector3D(100,100,0));
   * @extends {Zone}
   * @constructor
   */
  constructor(camera, renderer, dis, dir) {
    super(type);
    this.camera = camera;
    this.renderer = renderer;
    this.dis = dis || 20;
    dir = dir || '1234';

    for (var i = 1; i < 5; i++) this['d' + i] = dir.indexOf(i + '') >= 0;
  }
  /**
   * Returns true to indicate this is a ScreenZone.
   *
   * @return {boolean}
   */


  isScreenZone() {
    return true;
  }

  _dead(particle) {
    var pos = THREEUtil.toScreenPos(particle.position, this.camera, this.renderer.domElement);
    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis && this.d1) {
      particle.dead = true;
    } else if (pos.y - particle.radius > canvas.height + this.dis && this.d3) {
      particle.dead = true;
    }

    if (pos.x + particle.radius < -this.dis && this.d4) {
      particle.dead = true;
    } else if (pos.x - particle.radius > canvas.width + this.dis && this.d2) {
      particle.dead = true;
    }
  }

  _bound(particle) {
    var pos = THREEUtil.toScreenPos(particle.position, this.camera, this.renderer.domElement);
    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis) {
      particle.velocity.y *= -1;
    } else if (pos.y - particle.radius > canvas.height + this.dis) {
      particle.velocity.y *= -1;
    }

    if (pos.x + particle.radius < -this.dis) {
      particle.velocity.y *= -1;
    } else if (pos.x - particle.radius > canvas.width + this.dis) {
      particle.velocity.y *= -1;
    }
  }

}

ScreenZone.prototype.getPosition = function () {
  var vec2 = new Vector3D(),
      canvas;
  return function () {
    canvas = this.renderer.domElement;
    vec2.x = Math.random() * canvas.width;
    vec2.y = Math.random() * canvas.height;
    this.vector.copy(THREEUtil.toSpacePos(vec2, this.camera, canvas));
    return this.vector;
  };
}();

ScreenZone.prototype._cross = function () {
  var vec2 = new Vector3D();
  return function (particle) {
    var pos = THREEUtil.toScreenPos(particle.position, this.camera, this.renderer.domElement);
    var canvas = this.renderer.domElement;

    if (pos.y + particle.radius < -this.dis) {
      vec2.x = pos.x;
      vec2.y = canvas.height + this.dis + particle.radius;
      particle.position.y = THREEUtil.toSpacePos(vec2, this.camera, canvas).y;
    } else if (pos.y - particle.radius > canvas.height + this.dis) {
      vec2.x = pos.x;
      vec2.y = -this.dis - particle.radius;
      particle.position.y = THREEUtil.toSpacePos(vec2, this.camera, canvas).y;
    }

    if (pos.x + particle.radius < -this.dis) {
      vec2.y = pos.y;
      vec2.x = canvas.width + this.dis + particle.radius;
      particle.position.x = THREEUtil.toSpacePos(vec2, this.camera, canvas).x;
    } else if (pos.x - particle.radius > canvas.width + this.dis) {
      vec2.y = pos.y;
      vec2.x = -this.dis - particle.radius;
      particle.position.x = THREEUtil.toSpacePos(vec2, this.camera, canvas).x;
    }
  };
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL1NjcmVlblpvbmUuanMiXSwibmFtZXMiOlsiVEhSRUVVdGlsIiwiVmVjdG9yM0QiLCJab25lIiwiWk9ORV9UWVBFX1NDUkVFTiIsInR5cGUiLCJTY3JlZW5ab25lIiwiY29uc3RydWN0b3IiLCJjYW1lcmEiLCJyZW5kZXJlciIsImRpcyIsImRpciIsImkiLCJpbmRleE9mIiwiaXNTY3JlZW5ab25lIiwiX2RlYWQiLCJwYXJ0aWNsZSIsInBvcyIsInRvU2NyZWVuUG9zIiwicG9zaXRpb24iLCJkb21FbGVtZW50IiwiY2FudmFzIiwieSIsInJhZGl1cyIsImQxIiwiZGVhZCIsImhlaWdodCIsImQzIiwieCIsImQ0Iiwid2lkdGgiLCJkMiIsIl9ib3VuZCIsInZlbG9jaXR5IiwicHJvdG90eXBlIiwiZ2V0UG9zaXRpb24iLCJ2ZWMyIiwiTWF0aCIsInJhbmRvbSIsInZlY3RvciIsImNvcHkiLCJ0b1NwYWNlUG9zIiwiX2Nyb3NzIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPQSxTQUFQLE1BQXNCLG9CQUF0QjtBQUNBLE9BQU9DLFFBQVAsTUFBcUIsa0JBQXJCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixRQUFqQjtBQUNBLFNBQVNDLGdCQUFnQixJQUFJQyxJQUE3QixRQUF5QyxTQUF6QztBQUVBLGVBQWUsTUFBTUMsVUFBTixTQUF5QkgsSUFBekIsQ0FBOEI7QUFDM0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0VJLEVBQUFBLFdBQVcsQ0FBQ0MsTUFBRCxFQUFTQyxRQUFULEVBQW1CQyxHQUFuQixFQUF3QkMsR0FBeEIsRUFBNkI7QUFDdEMsVUFBTU4sSUFBTjtBQUVBLFNBQUtHLE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFHLElBQUksRUFBbEI7QUFDQUMsSUFB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QVQsQ0FBa0JTLENBQWxCLEdBQXNCM0IsU0FBUyxDQUFDd0MsVUFBVixDQUFxQkwsSUFBckIsRUFBMkIsS0FBSzVCLE1BQWhDLEVBQXdDYSxNQUF4QyxFQUFnRE8sQ0FBdEU7QUFDRCxLQUpELE1BSU8sSUFBSVgsR0FBRyxDQUFDVyxDQUFKLEdBQVFaLFFBQVEsQ0FBQ08sTUFBakIsR0FBMEJGLE1BQU0sQ0FBQ1MsS0FBUCxHQUFlLEtBQUtwQixHQUFsRCxFQUF1RDtBQUM1RDBCLE1BQUFBLElBQUksQ0FBQ2QsQ0FBTCxHQUFTTCxHQUFHLENBQUNLLENBQWI7QUFDQWMsTUFBQUEsSUFBSSxDQUFDUixDQUFMLEdBQVMsQ0FBQyxLQUFLbEIsR0FBTixHQUFZTSxRQUFRLENBQUNPLE1BQTlCO0FBQ0FQLE1BQUFBLFFBQVEsQ0FBQ0csUUFBVCxDQUFrQlMsQ0FBbEIsR0FBc0IzQixTQUFTLENBQUN3QyxVQUFWLENBQXFCTCxJQUFyQixFQUEyQixLQUFLNUIsTUFBaEMsRUFBd0NhLE1BQXhDLEVBQWdETyxDQUF0RTtBQUNEO0FBQ0YsR0EzQkQ7QUE0QkQsQ0EvQjZCLEVBQTlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRIUkVFVXRpbCBmcm9tICcuLi91dGlscy9USFJFRVV0aWwnO1xyXG5pbXBvcnQgVmVjdG9yM0QgZnJvbSAnLi4vbWF0aC9WZWN0b3IzRCc7XHJcbmltcG9ydCBab25lIGZyb20gJy4vWm9uZSc7XHJcbmltcG9ydCB7IFpPTkVfVFlQRV9TQ1JFRU4gYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuWm9uZSBleHRlbmRzIFpvbmUge1xyXG4gIC8qKlxyXG4gICAqIFNjcmVlblpvbmUgaXMgYSAzZCBsaW5lIHpvbmVcclxuICAgKiBAcGFyYW0ge051bWJlcnxWZWN0b3IzRH0geDEgLSB0aGUgbGluZSdzIHN0YXJ0IHBvaW50IG9mIHggdmFsdWUgb3IgYSBWZWN0b3IzRCBPYmplY3RcclxuICAgKiBAcGFyYW0ge051bWJlcnxWZWN0b3IzRH0geTEgLSB0aGUgbGluZSdzIHN0YXJ0IHBvaW50IG9mIHkgdmFsdWUgb3IgYSBWZWN0b3IzRCBPYmplY3RcclxuICAgKiBAcGFyYW0ge051bWJlcn0gejEgLSB0aGUgbGluZSdzIHN0YXJ0IHBvaW50IG9mIHogdmFsdWVcclxuICAgKiBAcGFyYW0ge051bWJlcn0geDIgLSB0aGUgbGluZSdzIGVuZCBwb2ludCBvZiB4IHZhbHVlXHJcbiAgICogQHBhcmFtIHtOdW1iZXJ9IHkyIC0gdGhlIGxpbmUncyBlbmQgcG9pbnQgb2YgeSB2YWx1ZVxyXG4gICAqIEBwYXJhbSB7TnVtYmVyfSB6MiAtIHRoZSBsaW5lJ3MgZW5kIHBvaW50IG9mIHogdmFsdWVcclxuICAgKiBAZXhhbXBsZVxyXG4gICAqIHZhciBsaW5lWm9uZSA9IG5ldyBTY3JlZW5ab25lKDAsMCwwLDEwMCwxMDAsMCk7XHJcbiAgICogb3JcclxuICAgKiB2YXIgbGluZVpvbmUgPSBuZXcgU2NyZWVuWm9uZShuZXcgVmVjdG9yM0QoMCwwLDApLG5ldyBWZWN0b3IzRCgxMDAsMTAwLDApKTtcclxuICAgKiBAZXh0ZW5kcyB7Wm9uZX1cclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihjYW1lcmEsIHJlbmRlcmVyLCBkaXMsIGRpcikge1xyXG4gICAgc3VwZXIodHlwZSk7XHJcblxyXG4gICAgdGhpcy5jYW1lcmEgPSBjYW1lcmE7XHJcbiAgICB0aGlzLnJlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLmRpcyA9IGRpcyB8fCAyMDtcclxuICAgIGRpciA9IGRpciB8fCAnMTIzNCc7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCA1OyBpKyspIHRoaXNbJ2QnICsgaV0gPSBkaXIuaW5kZXhPZihpICsgJycpID49IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRydWUgdG8gaW5kaWNhdGUgdGhpcyBpcyBhIFNjcmVlblpvbmUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzU2NyZWVuWm9uZSgpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgX2RlYWQocGFydGljbGUpIHtcclxuICAgIHZhciBwb3MgPSBUSFJFRVV0aWwudG9TY3JlZW5Qb3MoXHJcbiAgICAgIHBhcnRpY2xlLnBvc2l0aW9uLFxyXG4gICAgICB0aGlzLmNhbWVyYSxcclxuICAgICAgdGhpcy5yZW5kZXJlci5kb21FbGVtZW50XHJcbiAgICApO1xyXG4gICAgdmFyIGNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcclxuXHJcbiAgICBpZiAocG9zLnkgKyBwYXJ0aWNsZS5yYWRpdXMgPCAtdGhpcy5kaXMgJiYgdGhpcy5kMSkge1xyXG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocG9zLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiBjYW52YXMuaGVpZ2h0ICsgdGhpcy5kaXMgJiYgdGhpcy5kMykge1xyXG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocG9zLnggKyBwYXJ0aWNsZS5yYWRpdXMgPCAtdGhpcy5kaXMgJiYgdGhpcy5kNCkge1xyXG4gICAgICBwYXJ0aWNsZS5kZWFkID0gdHJ1ZTtcclxuICAgIH0gZWxzZSBpZiAocG9zLnggLSBwYXJ0aWNsZS5yYWRpdXMgPiBjYW52YXMud2lkdGggKyB0aGlzLmRpcyAmJiB0aGlzLmQyKSB7XHJcbiAgICAgIHBhcnRpY2xlLmRlYWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2JvdW5kKHBhcnRpY2xlKSB7XHJcbiAgICB2YXIgcG9zID0gVEhSRUVVdGlsLnRvU2NyZWVuUG9zKFxyXG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbixcclxuICAgICAgdGhpcy5jYW1lcmEsXHJcbiAgICAgIHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudFxyXG4gICAgKTtcclxuICAgIHZhciBjYW52YXMgPSB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnQ7XHJcblxyXG4gICAgaWYgKHBvcy55ICsgcGFydGljbGUucmFkaXVzIDwgLXRoaXMuZGlzKSB7XHJcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgKj0gLTE7XHJcbiAgICB9IGVsc2UgaWYgKHBvcy55IC0gcGFydGljbGUucmFkaXVzID4gY2FudmFzLmhlaWdodCArIHRoaXMuZGlzKSB7XHJcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgKj0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvcy54ICsgcGFydGljbGUucmFkaXVzIDwgLXRoaXMuZGlzKSB7XHJcbiAgICAgIHBhcnRpY2xlLnZlbG9jaXR5LnkgKj0gLTE7XHJcbiAgICB9IGVsc2UgaWYgKHBvcy54IC0gcGFydGljbGUucmFkaXVzID4gY2FudmFzLndpZHRoICsgdGhpcy5kaXMpIHtcclxuICAgICAgcGFydGljbGUudmVsb2NpdHkueSAqPSAtMTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblNjcmVlblpvbmUucHJvdG90eXBlLmdldFBvc2l0aW9uID0gKGZ1bmN0aW9uKCkge1xyXG4gIHZhciB2ZWMyID0gbmV3IFZlY3RvcjNEKCksXHJcbiAgICBjYW52YXM7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgIGNhbnZhcyA9IHRoaXMucmVuZGVyZXIuZG9tRWxlbWVudDtcclxuICAgIHZlYzIueCA9IE1hdGgucmFuZG9tKCkgKiBjYW52YXMud2lkdGg7XHJcbiAgICB2ZWMyLnkgPSBNYXRoLnJhbmRvbSgpICogY2FudmFzLmhlaWdodDtcclxuICAgIHRoaXMudmVjdG9yLmNvcHkoVEhSRUVVdGlsLnRvU3BhY2VQb3ModmVjMiwgdGhpcy5jYW1lcmEsIGNhbnZhcykpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnZlY3RvcjtcclxuICB9O1xyXG59KSgpO1xyXG5cclxuU2NyZWVuWm9uZS5wcm90b3R5cGUuX2Nyb3NzID0gKGZ1bmN0aW9uKCkge1xyXG4gIHZhciB2ZWMyID0gbmV3IFZlY3RvcjNEKCk7XHJcblxyXG4gIHJldHVybiBmdW5jdGlvbihwYXJ0aWNsZSkge1xyXG4gICAgdmFyIHBvcyA9IFRIUkVFVXRpbC50b1NjcmVlblBvcyhcclxuICAgICAgcGFydGljbGUucG9zaXRpb24sXHJcbiAgICAgIHRoaXMuY2FtZXJhLFxyXG4gICAgICB0aGlzLnJlbmRlcmVyLmRvbUVsZW1lbnRcclxuICAgICk7XHJcbiAgICB2YXIgY2FudmFzID0gdGhpcy5yZW5kZXJlci5kb21FbGVtZW50O1xyXG5cclxuICAgIGlmIChwb3MueSArIHBhcnRpY2xlLnJhZGl1cyA8IC10aGlzLmRpcykge1xyXG4gICAgICB2ZWMyLnggPSBwb3MueDtcclxuICAgICAgdmVjMi55ID0gY2FudmFzLmhlaWdodCArIHRoaXMuZGlzICsgcGFydGljbGUucmFkaXVzO1xyXG4gICAgICBwYXJ0aWNsZS5wb3NpdGlvbi55ID0gVEhSRUVVdGlsLnRvU3BhY2VQb3ModmVjMiwgdGhpcy5jYW1lcmEsIGNhbnZhcykueTtcclxuICAgIH0gZWxzZSBpZiAocG9zLnkgLSBwYXJ0aWNsZS5yYWRpdXMgPiBjYW52YXMuaGVpZ2h0ICsgdGhpcy5kaXMpIHtcclxuICAgICAgdmVjMi54ID0gcG9zLng7XHJcbiAgICAgIHZlYzIueSA9IC10aGlzLmRpcyAtIHBhcnRpY2xlLnJhZGl1cztcclxuICAgICAgcGFydGljbGUucG9zaXRpb24ueSA9IFRIUkVFVXRpbC50b1NwYWNlUG9zKHZlYzIsIHRoaXMuY2FtZXJhLCBjYW52YXMpLnk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHBvcy54ICsgcGFydGljbGUucmFkaXVzIDwgLXRoaXMuZGlzKSB7XHJcbiAgICAgIHZlYzIueSA9IHBvcy55O1xyXG4gICAgICB2ZWMyLnggPSBjYW52YXMud2lkdGggKyB0aGlzLmRpcyArIHBhcnRpY2xlLnJhZGl1cztcclxuICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IFRIUkVFVXRpbC50b1NwYWNlUG9zKHZlYzIsIHRoaXMuY2FtZXJhLCBjYW52YXMpLng7XHJcbiAgICB9IGVsc2UgaWYgKHBvcy54IC0gcGFydGljbGUucmFkaXVzID4gY2FudmFzLndpZHRoICsgdGhpcy5kaXMpIHtcclxuICAgICAgdmVjMi55ID0gcG9zLnk7XHJcbiAgICAgIHZlYzIueCA9IC10aGlzLmRpcyAtIHBhcnRpY2xlLnJhZGl1cztcclxuICAgICAgcGFydGljbGUucG9zaXRpb24ueCA9IFRIUkVFVXRpbC50b1NwYWNlUG9zKHZlYzIsIHRoaXMuY2FtZXJhLCBjYW52YXMpLng7XHJcbiAgICB9XHJcbiAgfTtcclxufSkoKTtcclxuIl19