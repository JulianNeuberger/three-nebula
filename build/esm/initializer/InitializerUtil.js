import { Euler } from '../core/three/';
const particleEuler = new Euler();
export default {
  particleEuler: null,

  /**
   * Loops through the initializers array and calls each initializer's initialize method
   * on the supplied particle. This sets the particle's initial properties.
   *
   * @see {@link '../emitter/Emitter'} setupParticle
   * @param {Emitter} emitter - The emitter that has called this method
   * @param {Particle} particle - The particle that has just been created
   * @param {array<Initializer>} initializers - All of the emitter's initializers
   * @return void
   */
  initialize: function (emitter, particle, initializers) {
    let i = initializers.length;

    while (i--) {
      initializers[i].init(emitter, particle);
    }

    emitter.bindEmitter && this.bindEmitter(emitter, particle);
  },

  /**
   * Ensures that the emitter's position, velocity and accleration are added
   * to each created particle.
   *
   * @param {Emitter} emitter - The emitter that is emitting the particles
   * @param {Particle} particle - The newly created particle
   * @return void
   */
  bindEmitter: function (emitter, particle) {
    const {
      rotation: {
        x,
        y,
        z
      }
    } = emitter;
    particle.position.add(emitter.position);
    particle.velocity.add(emitter.velocity);
    particle.acceleration.add(emitter.acceleration);
    particle.velocity.applyEuler(particleEuler.set(x, y, z));
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbml0aWFsaXplci9Jbml0aWFsaXplclV0aWwuanMiXSwibmFtZXMiOlsiRXVsZXIiLCJwYXJ0aWNsZUV1bGVyIiwiaW5pdGlhbGl6ZSIsImVtaXR0ZXIiLCJwYXJ0aWNsZSIsImluaXRpYWxpemVycyIsImkiLCJsZW5ndGgiLCJpbml0IiwiYmluZEVtaXR0ZXIiLCJyb3RhdGlvbiIsIngiLCJ5IiwieiIsInBvc2l0aW9uIiwiYWRkIiwidmVsb2NpdHkiLCJhY2NlbGVyYXRpb24iLCJhcHBseUV1bGVyIiwic2V0Il0sIm1hcHBpbmdzIjoiQUFBQSxTQUFTQSxLQUFULFFBQXNCLGdCQUF0QjtBQUVBLE1BQU1DLGFBQWEsR0FBRyxJQUFJRCxLQUFKLEVBQXRCO0FBRUEsZUFBZTtBQUNiQyxFQUFBQSxhQUFhLEVBQUUsSUFERjs7QUFFYjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFQyxFQUFBQSxVQUFVLEVBQUUsVUFBU0MsT0FBVCxFQUFrQkMsUUFBbEIsRUFBNEJDLFlBQTVCLEVBQTBDO0FBQ3BELFFBQUlDLENBQUMsR0FBR0QsWUFBWSxDQUFDRSxNQUFyQjs7QUFFQSxXQUFPRCxDQUFDLEVBQVIsRUFBWTtBQUNWRCxNQUFBQSxZQUFZLENBQUNDLENBQUQsQ0FBWixDQUFnQkUsSUFBaEIsQ0FBcUJMLE9BQXJCLEVBQThCQyxRQUE5QjtBQUNEOztBQUVERCxJQUFBQSxPQUFPLENBQUNNLFdBQVIsSUFBdUIsS0FBS0EsV0FBTCxDQUFpQk4sT0FBakIsRUFBMEJDLFFBQTFCLENBQXZCO0FBQ0QsR0FwQlk7O0FBc0JiO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRUssRUFBQUEsV0FBVyxFQUFFLFVBQVNOLE9BQVQsRUFBa0JDLFFBQWxCLEVBQTRCO0FBQ3ZDLFVBQU07QUFDSk0sTUFBQUEsUUFBUSxFQUFFO0FBQUVDLFFBQUFBLENBQUY7QUFBS0MsUUFBQUEsQ0FBTDtBQUFRQyxRQUFBQTtBQUFSO0FBRE4sUUFFRlYsT0FGSjtBQUlBQyxJQUFBQSxRQUFRLENBQUNVLFFBQVQsQ0FBa0JDLEdBQWxCLENBQXNCWixPQUFPLENBQUNXLFFBQTlCO0FBQ0FWLElBQUFBLFFBQVEsQ0FBQ1ksUUFBVCxDQUFrQkQsR0FBbEIsQ0FBc0JaLE9BQU8sQ0FBQ2EsUUFBOUI7QUFDQVosSUFBQUEsUUFBUSxDQUFDYSxZQUFULENBQXNCRixHQUF0QixDQUEwQlosT0FBTyxDQUFDYyxZQUFsQztBQUNBYixJQUFBQSxRQUFRLENBQUNZLFFBQVQsQ0FBa0JFLFVBQWxCLENBQTZCakIsYUFBYSxDQUFDa0IsR0FBZCxDQUFrQlIsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCQyxDQUF4QixDQUE3QjtBQUNEO0FBdkNZLENBQWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdWxlciB9IGZyb20gJy4uL2NvcmUvdGhyZWUvJztcclxuXHJcbmNvbnN0IHBhcnRpY2xlRXVsZXIgPSBuZXcgRXVsZXIoKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXJ0aWNsZUV1bGVyOiBudWxsLFxyXG4gIC8qKlxyXG4gICAqIExvb3BzIHRocm91Z2ggdGhlIGluaXRpYWxpemVycyBhcnJheSBhbmQgY2FsbHMgZWFjaCBpbml0aWFsaXplcidzIGluaXRpYWxpemUgbWV0aG9kXHJcbiAgICogb24gdGhlIHN1cHBsaWVkIHBhcnRpY2xlLiBUaGlzIHNldHMgdGhlIHBhcnRpY2xlJ3MgaW5pdGlhbCBwcm9wZXJ0aWVzLlxyXG4gICAqXHJcbiAgICogQHNlZSB7QGxpbmsgJy4uL2VtaXR0ZXIvRW1pdHRlcid9IHNldHVwUGFydGljbGVcclxuICAgKiBAcGFyYW0ge0VtaXR0ZXJ9IGVtaXR0ZXIgLSBUaGUgZW1pdHRlciB0aGF0IGhhcyBjYWxsZWQgdGhpcyBtZXRob2RcclxuICAgKiBAcGFyYW0ge1BhcnRpY2xlfSBwYXJ0aWNsZSAtIFRoZSBwYXJ0aWNsZSB0aGF0IGhhcyBqdXN0IGJlZW4gY3JlYXRlZFxyXG4gICAqIEBwYXJhbSB7YXJyYXk8SW5pdGlhbGl6ZXI+fSBpbml0aWFsaXplcnMgLSBBbGwgb2YgdGhlIGVtaXR0ZXIncyBpbml0aWFsaXplcnNcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbml0aWFsaXplOiBmdW5jdGlvbihlbWl0dGVyLCBwYXJ0aWNsZSwgaW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBsZXQgaSA9IGluaXRpYWxpemVycy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICBpbml0aWFsaXplcnNbaV0uaW5pdChlbWl0dGVyLCBwYXJ0aWNsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgZW1pdHRlci5iaW5kRW1pdHRlciAmJiB0aGlzLmJpbmRFbWl0dGVyKGVtaXR0ZXIsIHBhcnRpY2xlKTtcclxuICB9LFxyXG5cclxuICAvKipcclxuICAgKiBFbnN1cmVzIHRoYXQgdGhlIGVtaXR0ZXIncyBwb3NpdGlvbiwgdmVsb2NpdHkgYW5kIGFjY2xlcmF0aW9uIGFyZSBhZGRlZFxyXG4gICAqIHRvIGVhY2ggY3JlYXRlZCBwYXJ0aWNsZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7RW1pdHRlcn0gZW1pdHRlciAtIFRoZSBlbWl0dGVyIHRoYXQgaXMgZW1pdHRpbmcgdGhlIHBhcnRpY2xlc1xyXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIG5ld2x5IGNyZWF0ZWQgcGFydGljbGVcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBiaW5kRW1pdHRlcjogZnVuY3Rpb24oZW1pdHRlciwgcGFydGljbGUpIHtcclxuICAgIGNvbnN0IHtcclxuICAgICAgcm90YXRpb246IHsgeCwgeSwgeiB9LFxyXG4gICAgfSA9IGVtaXR0ZXI7XHJcblxyXG4gICAgcGFydGljbGUucG9zaXRpb24uYWRkKGVtaXR0ZXIucG9zaXRpb24pO1xyXG4gICAgcGFydGljbGUudmVsb2NpdHkuYWRkKGVtaXR0ZXIudmVsb2NpdHkpO1xyXG4gICAgcGFydGljbGUuYWNjZWxlcmF0aW9uLmFkZChlbWl0dGVyLmFjY2VsZXJhdGlvbik7XHJcbiAgICBwYXJ0aWNsZS52ZWxvY2l0eS5hcHBseUV1bGVyKHBhcnRpY2xlRXVsZXIuc2V0KHgsIHksIHopKTtcclxuICB9LFxyXG59O1xyXG4iXX0=