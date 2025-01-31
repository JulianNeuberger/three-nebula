import Zone from './Zone';
import { ZONE_TYPE_MESH as type } from './types';
/**
 * Uses a three THREE.Geometry to determine the zone parameters.
 *
 */

export default class MeshZone extends Zone {
  /**
   * @constructs {MeshZone}
   *
   * @param {THREE.Geometry|Mesh} bounds - the geometry or mesh that will determine the zone bounds
   * @param {number} scale - the zone scale
   * @param {THREE.Geometry} ThreeGeometry - the three geometry class
   * @return void
   */
  constructor(bounds, scale = 1, ThreeGeometry) {
    super(type);
    this.geometry = null;
    this.scale = scale;
    this.supportsCrossing = false;

    if (bounds.type && bounds.type === 'Geometry') {
      this.geometry = bounds;
    }

    if (bounds.geometry) {
      this.geometry = bounds.geometry;
    }

    if (!this.geometry) {
      throw new Error('MeshZone unable to set geometry from the supplied bounds');
    }

    if (this.geometry.isBufferGeometry) {
      this.geometry = new ThreeGeometry().fromBufferGeometry(this.geometry);
    }
  }
  /**
   * Returns true to indicate this is a MeshZone.
   *
   * @return {boolean}
   */


  isMeshZone() {
    return true;
  }

  getPosition() {
    const vertices = this.geometry.vertices;
    const rVector = vertices[vertices.length * Math.random() >> 0];
    this.vector.x = rVector.x * this.scale;
    this.vector.y = rVector.y * this.scale;
    this.vector.z = rVector.z * this.scale;
    return this.vector;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL01lc2hab25lLmpzIl0sIm5hbWVzIjpbIlpvbmUiLCJaT05FX1RZUEVfTUVTSCIsInR5cGUiLCJNZXNoWm9uZSIsImNvbnN0cnVjdG9yIiwiYm91bmRzIiwic2NhbGUiLCJUaHJlZUdlb21ldHJ5IiwiZ2VvbWV0cnkiLCJzdXBwb3J0c0Nyb3NzaW5nIiwiRXJyb3IiLCJpc0J1ZmZlckdlb21ldHJ5IiwiZnJvbUJ1ZmZlckdlb21ldHJ5IiwiaXNNZXNoWm9uZSIsImdldFBvc2l0aW9uIiwidmVydGljZXMiLCJyVmVjdG9yIiwibGVuZ3RoIiwiTWF0aCIsInJhbmRvbSIsInZlY3RvciIsIngiLCJ5IiwieiJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBT0EsSUFBUCxNQUFpQixRQUFqQjtBQUNBLFNBQVNDLGNBQWMsSUFBSUMsSUFBM0IsUUFBdUMsU0FBdkM7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxlQUFlLE1BQU1DLFFBQU4sU0FBdUJILElBQXZCLENBQTRCO0FBQ3pDO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUksRUFBQUEsV0FBVyxDQUFDQyxNQUFELEVBQVNDLEtBQUssR0FBRyxDQUFqQixFQUFvQkMsYUFBcEIsRUFBbUM7QUFDNUMsVUFBTUwsSUFBTjtBQUVBLFNBQUtNLFFBQUwsR0FBZ0IsSUFBaEI7QUFDQSxTQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLRyxnQkFBTCxHQUF3QixLQUF4Qjs7QUFFQSxRQUFJSixNQUFNLENBQUNILElBQVAsSUFBZUcsTUFBTSxDQUFDSCxJQUFQLEtBQWdCLFVBQW5DLEVBQStDO0FBQzdDLFdBQUtNLFFBQUwsR0FBZ0JILE1BQWhCO0FBQ0Q7O0FBRUQsUUFBSUEsTUFBTSxDQUFDRyxRQUFYLEVBQXFCO0FBQ25CLFdBQUtBLFFBQUwsR0FBZ0JILE1BQU0sQ0FBQ0csUUFBdkI7QUFDRDs7QUFFRCxRQUFJLENBQUMsS0FBS0EsUUFBVixFQUFvQjtBQUNsQixZQUFNLElBQUlFLEtBQUosQ0FDSiwwREFESSxDQUFOO0FBR0Q7O0FBRUQsUUFBSSxLQUFLRixRQUFMLENBQWNHLGdCQUFsQixFQUFvQztBQUNsQyxXQUFLSCxRQUFMLEdBQWdCLElBQUlELGFBQUosR0FBb0JLLGtCQUFwQixDQUF1QyxLQUFLSixRQUE1QyxDQUFoQjtBQUNEO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRUssRUFBQUEsVUFBVSxHQUFHO0FBQ1gsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLFdBQVcsR0FBRztBQUNaLFVBQU1DLFFBQVEsR0FBRyxLQUFLUCxRQUFMLENBQWNPLFFBQS9CO0FBQ0EsVUFBTUMsT0FBTyxHQUFHRCxRQUFRLENBQUVBLFFBQVEsQ0FBQ0UsTUFBVCxHQUFrQkMsSUFBSSxDQUFDQyxNQUFMLEVBQW5CLElBQXFDLENBQXRDLENBQXhCO0FBRUEsU0FBS0MsTUFBTCxDQUFZQyxDQUFaLEdBQWdCTCxPQUFPLENBQUNLLENBQVIsR0FBWSxLQUFLZixLQUFqQztBQUNBLFNBQUtjLE1BQUwsQ0FBWUUsQ0FBWixHQUFnQk4sT0FBTyxDQUFDTSxDQUFSLEdBQVksS0FBS2hCLEtBQWpDO0FBQ0EsU0FBS2MsTUFBTCxDQUFZRyxDQUFaLEdBQWdCUCxPQUFPLENBQUNPLENBQVIsR0FBWSxLQUFLakIsS0FBakM7QUFFQSxXQUFPLEtBQUtjLE1BQVo7QUFDRDs7QUFyRHdDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFpvbmUgZnJvbSAnLi9ab25lJztcclxuaW1wb3J0IHsgWk9ORV9UWVBFX01FU0ggYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIFVzZXMgYSB0aHJlZSBUSFJFRS5HZW9tZXRyeSB0byBkZXRlcm1pbmUgdGhlIHpvbmUgcGFyYW1ldGVycy5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1lc2hab25lIGV4dGVuZHMgWm9uZSB7XHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdHMge01lc2hab25lfVxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtUSFJFRS5HZW9tZXRyeXxNZXNofSBib3VuZHMgLSB0aGUgZ2VvbWV0cnkgb3IgbWVzaCB0aGF0IHdpbGwgZGV0ZXJtaW5lIHRoZSB6b25lIGJvdW5kc1xyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBzY2FsZSAtIHRoZSB6b25lIHNjYWxlXHJcbiAgICogQHBhcmFtIHtUSFJFRS5HZW9tZXRyeX0gVGhyZWVHZW9tZXRyeSAtIHRoZSB0aHJlZSBnZW9tZXRyeSBjbGFzc1xyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGJvdW5kcywgc2NhbGUgPSAxLCBUaHJlZUdlb21ldHJ5KSB7XHJcbiAgICBzdXBlcih0eXBlKTtcclxuXHJcbiAgICB0aGlzLmdlb21ldHJ5ID0gbnVsbDtcclxuICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcclxuICAgIHRoaXMuc3VwcG9ydHNDcm9zc2luZyA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChib3VuZHMudHlwZSAmJiBib3VuZHMudHlwZSA9PT0gJ0dlb21ldHJ5Jykge1xyXG4gICAgICB0aGlzLmdlb21ldHJ5ID0gYm91bmRzO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChib3VuZHMuZ2VvbWV0cnkpIHtcclxuICAgICAgdGhpcy5nZW9tZXRyeSA9IGJvdW5kcy5nZW9tZXRyeTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuZ2VvbWV0cnkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICdNZXNoWm9uZSB1bmFibGUgdG8gc2V0IGdlb21ldHJ5IGZyb20gdGhlIHN1cHBsaWVkIGJvdW5kcydcclxuICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5nZW9tZXRyeS5pc0J1ZmZlckdlb21ldHJ5KSB7XHJcbiAgICAgIHRoaXMuZ2VvbWV0cnkgPSBuZXcgVGhyZWVHZW9tZXRyeSgpLmZyb21CdWZmZXJHZW9tZXRyeSh0aGlzLmdlb21ldHJ5KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSB0byBpbmRpY2F0ZSB0aGlzIGlzIGEgTWVzaFpvbmUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtib29sZWFufVxyXG4gICAqL1xyXG4gIGlzTWVzaFpvbmUoKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGdldFBvc2l0aW9uKCkge1xyXG4gICAgY29uc3QgdmVydGljZXMgPSB0aGlzLmdlb21ldHJ5LnZlcnRpY2VzO1xyXG4gICAgY29uc3QgclZlY3RvciA9IHZlcnRpY2VzWyh2ZXJ0aWNlcy5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKSA+PiAwXTtcclxuXHJcbiAgICB0aGlzLnZlY3Rvci54ID0gclZlY3Rvci54ICogdGhpcy5zY2FsZTtcclxuICAgIHRoaXMudmVjdG9yLnkgPSByVmVjdG9yLnkgKiB0aGlzLnNjYWxlO1xyXG4gICAgdGhpcy52ZWN0b3IueiA9IHJWZWN0b3IueiAqIHRoaXMuc2NhbGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMudmVjdG9yO1xyXG4gIH1cclxufVxyXG4iXX0=