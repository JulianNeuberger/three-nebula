import { Euler, Vector3 } from '../core/three/';
export default class Vector3D extends Vector3 {
  clear() {
    this.x = 0.0;
    this.y = 0.0;
    this.z = 0.0;
    return this;
  }

  scalar(s) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  addValue(a, b, c) {
    this.x += a;
    this.y += b;
    this.z += c;
    return this;
  }

  toString() {
    return 'x:' + this.x + 'y:' + this.y + 'z:' + this.z;
  }

  eulerFromDir(vector3D) {
    const euler = new Euler();
    return euler.setFromVector3(vector3D);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXRoL1ZlY3RvcjNELmpzIl0sIm5hbWVzIjpbIkV1bGVyIiwiVmVjdG9yMyIsIlZlY3RvcjNEIiwiY2xlYXIiLCJ4IiwieSIsInoiLCJzY2FsYXIiLCJzIiwiYWRkVmFsdWUiLCJhIiwiYiIsImMiLCJ0b1N0cmluZyIsImV1bGVyRnJvbURpciIsInZlY3RvcjNEIiwiZXVsZXIiLCJzZXRGcm9tVmVjdG9yMyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsS0FBVCxFQUFnQkMsT0FBaEIsUUFBK0IsZ0JBQS9CO0FBRUEsZUFBZSxNQUFNQyxRQUFOLFNBQXVCRCxPQUF2QixDQUErQjtBQUM1Q0UsRUFBQUEsS0FBSyxHQUFHO0FBQ04sU0FBS0MsQ0FBTCxHQUFTLEdBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVMsR0FBVDtBQUNBLFNBQUtDLENBQUwsR0FBUyxHQUFUO0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU0sQ0FBQ0MsQ0FBRCxFQUFJO0FBQ1IsU0FBS0osQ0FBTCxJQUFVSSxDQUFWO0FBQ0EsU0FBS0gsQ0FBTCxJQUFVRyxDQUFWO0FBQ0EsU0FBS0YsQ0FBTCxJQUFVRSxDQUFWO0FBRUEsV0FBTyxJQUFQO0FBQ0Q7O0FBRURDLEVBQUFBLFFBQVEsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQU9DLENBQVAsRUFBVTtBQUNoQixTQUFLUixDQUFMLElBQVVNLENBQVY7QUFDQSxTQUFLTCxDQUFMLElBQVVNLENBQVY7QUFDQSxTQUFLTCxDQUFMLElBQVVNLENBQVY7QUFFQSxXQUFPLElBQVA7QUFDRDs7QUFFREMsRUFBQUEsUUFBUSxHQUFHO0FBQ1QsV0FBTyxPQUFPLEtBQUtULENBQVosR0FBZ0IsSUFBaEIsR0FBdUIsS0FBS0MsQ0FBNUIsR0FBZ0MsSUFBaEMsR0FBdUMsS0FBS0MsQ0FBbkQ7QUFDRDs7QUFFRFEsRUFBQUEsWUFBWSxDQUFDQyxRQUFELEVBQVc7QUFDckIsVUFBTUMsS0FBSyxHQUFHLElBQUloQixLQUFKLEVBQWQ7QUFFQSxXQUFPZ0IsS0FBSyxDQUFDQyxjQUFOLENBQXFCRixRQUFyQixDQUFQO0FBQ0Q7O0FBakMyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV1bGVyLCBWZWN0b3IzIH0gZnJvbSAnLi4vY29yZS90aHJlZS8nO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yM0QgZXh0ZW5kcyBWZWN0b3IzIHtcclxuICBjbGVhcigpIHtcclxuICAgIHRoaXMueCA9IDAuMDtcclxuICAgIHRoaXMueSA9IDAuMDtcclxuICAgIHRoaXMueiA9IDAuMDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHNjYWxhcihzKSB7XHJcbiAgICB0aGlzLnggKj0gcztcclxuICAgIHRoaXMueSAqPSBzO1xyXG4gICAgdGhpcy56ICo9IHM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRWYWx1ZShhLCBiLCBjKSB7XHJcbiAgICB0aGlzLnggKz0gYTtcclxuICAgIHRoaXMueSArPSBiO1xyXG4gICAgdGhpcy56ICs9IGM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICB0b1N0cmluZygpIHtcclxuICAgIHJldHVybiAneDonICsgdGhpcy54ICsgJ3k6JyArIHRoaXMueSArICd6OicgKyB0aGlzLno7XHJcbiAgfVxyXG5cclxuICBldWxlckZyb21EaXIodmVjdG9yM0QpIHtcclxuICAgIGNvbnN0IGV1bGVyID0gbmV3IEV1bGVyKCk7XHJcblxyXG4gICAgcmV0dXJuIGV1bGVyLnNldEZyb21WZWN0b3IzKHZlY3RvcjNEKTtcclxuICB9XHJcbn1cclxuIl19