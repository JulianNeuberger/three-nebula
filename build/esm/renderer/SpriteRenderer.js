import MeshRenderer from './MeshRenderer';
import { RENDERER_TYPE_SPRITE as type } from './types';
/**
 * @requires THREE - { Mesh, BoxGeometry, MeshLambertMaterial, Sprite, SpriteMaterial }
 */

export default class SpriteRenderer extends MeshRenderer {
  constructor(container, THREE) {
    super(container, THREE);
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    this._body = new THREE.Sprite(new THREE.SpriteMaterial({
      color: 0xffffff
    }));
  }

  rotate(particle) {
    particle.target.material.rotation = particle.rotation.z;
  }

  scale(particle) {
    particle.target.scale.set(particle.scale * particle.radius, particle.scale * particle.radius, 1);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXJlci9TcHJpdGVSZW5kZXJlci5qcyJdLCJuYW1lcyI6WyJNZXNoUmVuZGVyZXIiLCJSRU5ERVJFUl9UWVBFX1NQUklURSIsInR5cGUiLCJTcHJpdGVSZW5kZXJlciIsImNvbnN0cnVjdG9yIiwiY29udGFpbmVyIiwiVEhSRUUiLCJfYm9keSIsIlNwcml0ZSIsIlNwcml0ZU1hdGVyaWFsIiwiY29sb3IiLCJyb3RhdGUiLCJwYXJ0aWNsZSIsInRhcmdldCIsIm1hdGVyaWFsIiwicm90YXRpb24iLCJ6Iiwic2NhbGUiLCJzZXQiLCJyYWRpdXMiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFlBQVAsTUFBeUIsZ0JBQXpCO0FBQ0EsU0FBU0Msb0JBQW9CLElBQUlDLElBQWpDLFFBQTZDLFNBQTdDO0FBRUE7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsY0FBTixTQUE2QkgsWUFBN0IsQ0FBMEM7QUFDdkRJLEVBQUFBLFdBQVcsQ0FBQ0MsU0FBRCxFQUFZQyxLQUFaLEVBQW1CO0FBQzVCLFVBQU1ELFNBQU4sRUFBaUJDLEtBQWpCO0FBRUE7QUFDSjtBQUNBO0FBQ0E7O0FBQ0ksU0FBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsU0FBS0ssS0FBTCxHQUFhLElBQUlELEtBQUssQ0FBQ0UsTUFBVixDQUNYLElBQUlGLEtBQUssQ0FBQ0csY0FBVixDQUF5QjtBQUFFQyxNQUFBQSxLQUFLLEVBQUU7QUFBVCxLQUF6QixDQURXLENBQWI7QUFHRDs7QUFFREMsRUFBQUEsTUFBTSxDQUFDQyxRQUFELEVBQVc7QUFDZkEsSUFBQUEsUUFBUSxDQUFDQyxNQUFULENBQWdCQyxRQUFoQixDQUF5QkMsUUFBekIsR0FBb0NILFFBQVEsQ0FBQ0csUUFBVCxDQUFrQkMsQ0FBdEQ7QUFDRDs7QUFFREMsRUFBQUEsS0FBSyxDQUFDTCxRQUFELEVBQVc7QUFDZEEsSUFBQUEsUUFBUSxDQUFDQyxNQUFULENBQWdCSSxLQUFoQixDQUFzQkMsR0FBdEIsQ0FDRU4sUUFBUSxDQUFDSyxLQUFULEdBQWlCTCxRQUFRLENBQUNPLE1BRDVCLEVBRUVQLFFBQVEsQ0FBQ0ssS0FBVCxHQUFpQkwsUUFBUSxDQUFDTyxNQUY1QixFQUdFLENBSEY7QUFLRDs7QUF4QnNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE1lc2hSZW5kZXJlciBmcm9tICcuL01lc2hSZW5kZXJlcic7XHJcbmltcG9ydCB7IFJFTkRFUkVSX1RZUEVfU1BSSVRFIGFzIHR5cGUgfSBmcm9tICcuL3R5cGVzJztcclxuXHJcbi8qKlxyXG4gKiBAcmVxdWlyZXMgVEhSRUUgLSB7IE1lc2gsIEJveEdlb21ldHJ5LCBNZXNoTGFtYmVydE1hdGVyaWFsLCBTcHJpdGUsIFNwcml0ZU1hdGVyaWFsIH1cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZVJlbmRlcmVyIGV4dGVuZHMgTWVzaFJlbmRlcmVyIHtcclxuICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIFRIUkVFKSB7XHJcbiAgICBzdXBlcihjb250YWluZXIsIFRIUkVFKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBjbGFzcyB0eXBlLlxyXG4gICAgICogQHR5cGUge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy50eXBlID0gdHlwZTtcclxuICAgIHRoaXMuX2JvZHkgPSBuZXcgVEhSRUUuU3ByaXRlKFxyXG4gICAgICBuZXcgVEhSRUUuU3ByaXRlTWF0ZXJpYWwoeyBjb2xvcjogMHhmZmZmZmYgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICByb3RhdGUocGFydGljbGUpIHtcclxuICAgIHBhcnRpY2xlLnRhcmdldC5tYXRlcmlhbC5yb3RhdGlvbiA9IHBhcnRpY2xlLnJvdGF0aW9uLno7XHJcbiAgfVxyXG5cclxuICBzY2FsZShwYXJ0aWNsZSkge1xyXG4gICAgcGFydGljbGUudGFyZ2V0LnNjYWxlLnNldChcclxuICAgICAgcGFydGljbGUuc2NhbGUgKiBwYXJ0aWNsZS5yYWRpdXMsXHJcbiAgICAgIHBhcnRpY2xlLnNjYWxlICogcGFydGljbGUucmFkaXVzLFxyXG4gICAgICAxXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=