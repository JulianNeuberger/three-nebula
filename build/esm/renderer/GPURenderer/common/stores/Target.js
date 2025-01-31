/**
 * Simple class that stores the particle's "target" or "next" state.
 *
 */
export class Target {
  constructor(THREE) {
    this.position = new THREE.Vector3();
    this.rotation = new THREE.Vector3();
    this.size = 0;
    this.color = new THREE.Color();
    this.alpha = 0;
    this.texture = null;
    this.index = 0;
  }

  reset() {
    this.position.set(0, 0, 0);
    this.rotation.set(0, 0, 0);
    this.size = 0;
    this.color.setRGB(0, 0, 0);
    this.alpha = 0;
    this.texture = null;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9yZW5kZXJlci9HUFVSZW5kZXJlci9jb21tb24vc3RvcmVzL1RhcmdldC5qcyJdLCJuYW1lcyI6WyJUYXJnZXQiLCJjb25zdHJ1Y3RvciIsIlRIUkVFIiwicG9zaXRpb24iLCJWZWN0b3IzIiwicm90YXRpb24iLCJzaXplIiwiY29sb3IiLCJDb2xvciIsImFscGhhIiwidGV4dHVyZSIsImluZGV4IiwicmVzZXQiLCJzZXQiLCJzZXRSR0IiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxNQUFNQSxNQUFOLENBQWE7QUFDbEJDLEVBQUFBLFdBQVcsQ0FBQ0MsS0FBRCxFQUFRO0FBQ2pCLFNBQUtDLFFBQUwsR0FBZ0IsSUFBSUQsS0FBSyxDQUFDRSxPQUFWLEVBQWhCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQixJQUFJSCxLQUFLLENBQUNFLE9BQVYsRUFBaEI7QUFDQSxTQUFLRSxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxJQUFJTCxLQUFLLENBQUNNLEtBQVYsRUFBYjtBQUNBLFNBQUtDLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDQSxTQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNEOztBQUVEQyxFQUFBQSxLQUFLLEdBQUc7QUFDTixTQUFLVCxRQUFMLENBQWNVLEdBQWQsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDQSxTQUFLUixRQUFMLENBQWNRLEdBQWQsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsRUFBd0IsQ0FBeEI7QUFDQSxTQUFLUCxJQUFMLEdBQVksQ0FBWjtBQUNBLFNBQUtDLEtBQUwsQ0FBV08sTUFBWCxDQUFrQixDQUFsQixFQUFxQixDQUFyQixFQUF3QixDQUF4QjtBQUNBLFNBQUtMLEtBQUwsR0FBYSxDQUFiO0FBQ0EsU0FBS0MsT0FBTCxHQUFlLElBQWY7QUFDRDs7QUFsQmlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIFNpbXBsZSBjbGFzcyB0aGF0IHN0b3JlcyB0aGUgcGFydGljbGUncyBcInRhcmdldFwiIG9yIFwibmV4dFwiIHN0YXRlLlxyXG4gKlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRhcmdldCB7XHJcbiAgY29uc3RydWN0b3IoVEhSRUUpIHtcclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVEhSRUUuVmVjdG9yMygpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IG5ldyBUSFJFRS5WZWN0b3IzKCk7XHJcbiAgICB0aGlzLnNpemUgPSAwO1xyXG4gICAgdGhpcy5jb2xvciA9IG5ldyBUSFJFRS5Db2xvcigpO1xyXG4gICAgdGhpcy5hbHBoYSA9IDA7XHJcbiAgICB0aGlzLnRleHR1cmUgPSBudWxsO1xyXG4gICAgdGhpcy5pbmRleCA9IDA7XHJcbiAgfVxyXG5cclxuICByZXNldCgpIHtcclxuICAgIHRoaXMucG9zaXRpb24uc2V0KDAsIDAsIDApO1xyXG4gICAgdGhpcy5yb3RhdGlvbi5zZXQoMCwgMCwgMCk7XHJcbiAgICB0aGlzLnNpemUgPSAwO1xyXG4gICAgdGhpcy5jb2xvci5zZXRSR0IoMCwgMCwgMCk7XHJcbiAgICB0aGlzLmFscGhhID0gMDtcclxuICAgIHRoaXMudGV4dHVyZSA9IG51bGw7XHJcbiAgfVxyXG59XHJcbiJdfQ==