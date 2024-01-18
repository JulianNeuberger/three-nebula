import Behaviour from './Behaviour';
import { Vector3D } from '../math';
import { BEHAVIOUR_TYPE_COLLISION as type } from './types';
/**
 * Behaviour that causes particles to move away from other particles they collide with.
 */

export default class Collision extends Behaviour {
  /**
   * Constructs a Collision behaviour instance.
   *
   * @param {Emitter} emitter - The emitter containing the particles to detect collisions against
   * @param {boolean} useMass - Determiens whether to use mass or not
   * @param {function} onCollide - Function to call when particles collide
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @param {boolean} [isEnabled=true] - Determines if the behaviour will be applied or not
   * @return void
   */
  constructor(emitter, useMass, onCollide, life, easing, isEnabled = true) {
    super(life, easing, type, isEnabled);
    this.reset(emitter, useMass, onCollide);
  }
  /**
   * Resets the behaviour properties.
   *
   * @param {Emitter} emitter - The emitter containing the particles to detect collisions against
   * @param {boolean} useMass - Determiens whether to use mass or not
   * @param {function} onCollide - Function to call when particles collide
   * @param {number} life - The life of the particle
   * @param {function} easing - The behaviour's decaying trend
   * @return void
   */


  reset(emitter, useMass, onCollide, life, easing) {
    this.emitter = emitter;
    this.useMass = useMass;
    this.onCollide = onCollide;
    this.particles = [];
    this.delta = new Vector3D();
    life && super.reset(life, easing);
  }
  /**
   * Detects collisions with other particles and calls the
   * onCollide function on colliding particles.
   *
   * @param {Particle} particle - the particle to apply the behaviour to
   * @param {number} time - particle engine time
   * @param {integer} index - the particle index
   * @return void
   */


  mutate(particle, time, index) {
    const particles = this.emitter ? this.emitter.particles.slice(index) : this.particles.slice(index);
    let otherParticle, lengthSq, overlap, distance, averageMass1, averageMass2;
    let i = particles.length;

    while (i--) {
      otherParticle = particles[i];

      if (otherParticle == particle) {
        continue;
      }

      this.delta.copy(otherParticle.position).sub(particle.position);
      lengthSq = this.delta.lengthSq();
      distance = particle.radius + otherParticle.radius;

      if (lengthSq <= distance * distance) {
        overlap = distance - Math.sqrt(lengthSq);
        overlap += 0.5;
        averageMass1 = this._getAverageMass(particle, otherParticle);
        averageMass2 = this._getAverageMass(otherParticle, particle);
        particle.position.add(this.delta.clone().normalize().scalar(overlap * -averageMass1));
        otherParticle.position.add(this.delta.normalize().scalar(overlap * averageMass2));
        this.onCollide && this.onCollide(particle, otherParticle);
      }
    }
  }
  /**
   * Gets the average mass of both particles.
   *
   * @param {Particle} particleA - The first particle
   * @param {Particle} particleB - The second particle
   * @return {number}
   */


  _getAverageMass(particleA, particleB) {
    return this.useMass ? particleB.mass / (particleA.mass + particleB.mass) : 0.5;
  } // TODO


  fromJSON(json) {} // eslint-disable-line


}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9iZWhhdmlvdXIvQ29sbGlzaW9uLmpzIl0sIm5hbWVzIjpbIkJlaGF2aW91ciIsIlZlY3RvcjNEIiwiQkVIQVZJT1VSX1RZUEVfQ09MTElTSU9OIiwidHlwZSIsIkNvbGxpc2lvbiIsImNvbnN0cnVjdG9yIiwiZW1pdHRlciIsInVzZU1hc3MiLCJvbkNvbGxpZGUiLCJsaWZlIiwiZWFzaW5nIiwiaXNFbmFibGVkIiwicmVzZXQiLCJwYXJ0aWNsZXMiLCJkZWx0YSIsIm11dGF0ZSIsInBhcnRpY2xlIiwidGltZSIsImluZGV4Iiwic2xpY2UiLCJvdGhlclBhcnRpY2xlIiwibGVuZ3RoU3EiLCJvdmVybGFwIiwiZGlzdGFuY2UiLCJhdmVyYWdlTWFzczEiLCJhdmVyYWdlTWFzczIiLCJpIiwibGVuZ3RoIiwiY29weSIsInBvc2l0aW9uIiwic3ViIiwicmFkaXVzIiwiTWF0aCIsInNxcnQiLCJfZ2V0QXZlcmFnZU1hc3MiLCJhZGQiLCJjbG9uZSIsIm5vcm1hbGl6ZSIsInNjYWxhciIsInBhcnRpY2xlQSIsInBhcnRpY2xlQiIsIm1hc3MiLCJmcm9tSlNPTiIsImpzb24iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9BLFNBQVAsTUFBc0IsYUFBdEI7QUFDQSxTQUFTQyxRQUFULFFBQXlCLFNBQXpCO0FBQ0EsU0FBU0Msd0JBQXdCLElBQUlDLElBQXJDLFFBQWlELFNBQWpEO0FBRUE7QUFDQTtBQUNBOztBQUNBLGVBQWUsTUFBTUMsU0FBTixTQUF3QkosU0FBeEIsQ0FBa0M7QUFDL0M7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFSyxFQUFBQSxXQUFXLENBQUNDLE9BQUQsRUFBVUMsT0FBVixFQUFtQkMsU0FBbkIsRUFBOEJDLElBQTlCLEVBQW9DQyxNQUFwQyxFQUE0Q0MsU0FBUyxHQUFHLElBQXhELEVBQThEO0FBQ3ZFLFVBQU1GLElBQU4sRUFBWUMsTUFBWixFQUFvQlAsSUFBcEIsRUFB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U0FBUyxDQUFDQyxJQUFWLElBQWtCRixTQUFTLENBQUNFLElBQVYsR0FBaUJELFNBQVMsQ0FBQ0MsSUFBN0MsQ0FERyxHQUVILEdBRko7QUFHRCxHQXRHOEMsQ0F3Ry9DOzs7QUFDQUMsRUFBQUEsUUFBUSxDQUFDQyxJQUFELEVBQU8sQ0FBRSxDQXpHOEIsQ0F5RzdCOzs7QUF6RzZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJlaGF2aW91ciBmcm9tICcuL0JlaGF2aW91cic7XHJcbmltcG9ydCB7IFZlY3RvcjNEIH0gZnJvbSAnLi4vbWF0aCc7XHJcbmltcG9ydCB7IEJFSEFWSU9VUl9UWVBFX0NPTExJU0lPTiBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogQmVoYXZpb3VyIHRoYXQgY2F1c2VzIHBhcnRpY2xlcyB0byBtb3ZlIGF3YXkgZnJvbSBvdGhlciBwYXJ0aWNsZXMgdGhleSBjb2xsaWRlIHdpdGguXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaXNpb24gZXh0ZW5kcyBCZWhhdmlvdXIge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYSBDb2xsaXNpb24gYmVoYXZpb3VyIGluc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyIC0gVGhlIGVtaXR0ZXIgY29udGFpbmluZyB0aGUgcGFydGljbGVzIHRvIGRldGVjdCBjb2xsaXNpb25zIGFnYWluc3RcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZU1hc3MgLSBEZXRlcm1pZW5zIHdoZXRoZXIgdG8gdXNlIG1hc3Mgb3Igbm90XHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb25Db2xsaWRlIC0gRnVuY3Rpb24gdG8gY2FsbCB3aGVuIHBhcnRpY2xlcyBjb2xsaWRlXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxpZmUgLSBUaGUgbGlmZSBvZiB0aGUgcGFydGljbGVcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBlYXNpbmcgLSBUaGUgYmVoYXZpb3VyJ3MgZGVjYXlpbmcgdHJlbmRcclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0VuYWJsZWQ9dHJ1ZV0gLSBEZXRlcm1pbmVzIGlmIHRoZSBiZWhhdmlvdXIgd2lsbCBiZSBhcHBsaWVkIG9yIG5vdFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGVtaXR0ZXIsIHVzZU1hc3MsIG9uQ29sbGlkZSwgbGlmZSwgZWFzaW5nLCBpc0VuYWJsZWQgPSB0cnVlKSB7XHJcbiAgICBzdXBlcihsaWZlLCBlYXNpbmcsIHR5cGUsIGlzRW5hYmxlZCk7XHJcblxyXG4gICAgdGhpcy5yZXNldChlbWl0dGVyLCB1c2VNYXNzLCBvbkNvbGxpZGUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVzZXRzIHRoZSBiZWhhdmlvdXIgcHJvcGVydGllcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlciAtIFRoZSBlbWl0dGVyIGNvbnRhaW5pbmcgdGhlIHBhcnRpY2xlcyB0byBkZXRlY3QgY29sbGlzaW9ucyBhZ2FpbnN0XHJcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VNYXNzIC0gRGV0ZXJtaWVucyB3aGV0aGVyIHRvIHVzZSBtYXNzIG9yIG5vdFxyXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uQ29sbGlkZSAtIEZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBwYXJ0aWNsZXMgY29sbGlkZVxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsaWZlIC0gVGhlIGxpZmUgb2YgdGhlIHBhcnRpY2xlXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gZWFzaW5nIC0gVGhlIGJlaGF2aW91cidzIGRlY2F5aW5nIHRyZW5kXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgcmVzZXQoZW1pdHRlciwgdXNlTWFzcywgb25Db2xsaWRlLCBsaWZlLCBlYXNpbmcpIHtcclxuICAgIHRoaXMuZW1pdHRlciA9IGVtaXR0ZXI7XHJcbiAgICB0aGlzLnVzZU1hc3MgPSB1c2VNYXNzO1xyXG4gICAgdGhpcy5vbkNvbGxpZGUgPSBvbkNvbGxpZGU7XHJcbiAgICB0aGlzLnBhcnRpY2xlcyA9IFtdO1xyXG4gICAgdGhpcy5kZWx0YSA9IG5ldyBWZWN0b3IzRCgpO1xyXG5cclxuICAgIGxpZmUgJiYgc3VwZXIucmVzZXQobGlmZSwgZWFzaW5nKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERldGVjdHMgY29sbGlzaW9ucyB3aXRoIG90aGVyIHBhcnRpY2xlcyBhbmQgY2FsbHMgdGhlXHJcbiAgICogb25Db2xsaWRlIGZ1bmN0aW9uIG9uIGNvbGxpZGluZyBwYXJ0aWNsZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIHRoZSBwYXJ0aWNsZSB0byBhcHBseSB0aGUgYmVoYXZpb3VyIHRvXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBwYXJ0aWNsZSBlbmdpbmUgdGltZVxyXG4gICAqIEBwYXJhbSB7aW50ZWdlcn0gaW5kZXggLSB0aGUgcGFydGljbGUgaW5kZXhcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBtdXRhdGUocGFydGljbGUsIHRpbWUsIGluZGV4KSB7XHJcbiAgICBjb25zdCBwYXJ0aWNsZXMgPSB0aGlzLmVtaXR0ZXJcclxuICAgICAgPyB0aGlzLmVtaXR0ZXIucGFydGljbGVzLnNsaWNlKGluZGV4KVxyXG4gICAgICA6IHRoaXMucGFydGljbGVzLnNsaWNlKGluZGV4KTtcclxuXHJcbiAgICBsZXQgb3RoZXJQYXJ0aWNsZSwgbGVuZ3RoU3EsIG92ZXJsYXAsIGRpc3RhbmNlLCBhdmVyYWdlTWFzczEsIGF2ZXJhZ2VNYXNzMjtcclxuXHJcbiAgICBsZXQgaSA9IHBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICBvdGhlclBhcnRpY2xlID0gcGFydGljbGVzW2ldO1xyXG5cclxuICAgICAgaWYgKG90aGVyUGFydGljbGUgPT0gcGFydGljbGUpIHtcclxuICAgICAgICBjb250aW51ZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5kZWx0YS5jb3B5KG90aGVyUGFydGljbGUucG9zaXRpb24pLnN1YihwYXJ0aWNsZS5wb3NpdGlvbik7XHJcblxyXG4gICAgICBsZW5ndGhTcSA9IHRoaXMuZGVsdGEubGVuZ3RoU3EoKTtcclxuICAgICAgZGlzdGFuY2UgPSBwYXJ0aWNsZS5yYWRpdXMgKyBvdGhlclBhcnRpY2xlLnJhZGl1cztcclxuXHJcbiAgICAgIGlmIChsZW5ndGhTcSA8PSBkaXN0YW5jZSAqIGRpc3RhbmNlKSB7XHJcbiAgICAgICAgb3ZlcmxhcCA9IGRpc3RhbmNlIC0gTWF0aC5zcXJ0KGxlbmd0aFNxKTtcclxuICAgICAgICBvdmVybGFwICs9IDAuNTtcclxuXHJcbiAgICAgICAgYXZlcmFnZU1hc3MxID0gdGhpcy5fZ2V0QXZlcmFnZU1hc3MocGFydGljbGUsIG90aGVyUGFydGljbGUpO1xyXG4gICAgICAgIGF2ZXJhZ2VNYXNzMiA9IHRoaXMuX2dldEF2ZXJhZ2VNYXNzKG90aGVyUGFydGljbGUsIHBhcnRpY2xlKTtcclxuXHJcbiAgICAgICAgcGFydGljbGUucG9zaXRpb24uYWRkKFxyXG4gICAgICAgICAgdGhpcy5kZWx0YVxyXG4gICAgICAgICAgICAuY2xvbmUoKVxyXG4gICAgICAgICAgICAubm9ybWFsaXplKClcclxuICAgICAgICAgICAgLnNjYWxhcihvdmVybGFwICogLWF2ZXJhZ2VNYXNzMSlcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICBvdGhlclBhcnRpY2xlLnBvc2l0aW9uLmFkZChcclxuICAgICAgICAgIHRoaXMuZGVsdGEubm9ybWFsaXplKCkuc2NhbGFyKG92ZXJsYXAgKiBhdmVyYWdlTWFzczIpXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgdGhpcy5vbkNvbGxpZGUgJiYgdGhpcy5vbkNvbGxpZGUocGFydGljbGUsIG90aGVyUGFydGljbGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHRoZSBhdmVyYWdlIG1hc3Mgb2YgYm90aCBwYXJ0aWNsZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZUEgLSBUaGUgZmlyc3QgcGFydGljbGVcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZUIgLSBUaGUgc2Vjb25kIHBhcnRpY2xlXHJcbiAgICogQHJldHVybiB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIF9nZXRBdmVyYWdlTWFzcyhwYXJ0aWNsZUEsIHBhcnRpY2xlQikge1xyXG4gICAgcmV0dXJuIHRoaXMudXNlTWFzc1xyXG4gICAgICA/IHBhcnRpY2xlQi5tYXNzIC8gKHBhcnRpY2xlQS5tYXNzICsgcGFydGljbGVCLm1hc3MpXHJcbiAgICAgIDogMC41O1xyXG4gIH1cclxuXHJcbiAgLy8gVE9ET1xyXG4gIGZyb21KU09OKGpzb24pIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxufVxyXG4iXX0=