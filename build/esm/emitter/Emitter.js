import { DEFAULT_BIND_EMITTER, DEFAULT_BIND_EMITTER_EVENT, DEFAULT_DAMPING, DEFAULT_EMITTER_INDEX, DEFAULT_EMITTER_RATE } from './constants';
import EventDispatcher, { EMITTER_DEAD, PARTICLE_CREATED, PARTICLE_DEAD, PARTICLE_UPDATE, SYSTEM_UPDATE } from '../events';
import { INTEGRATION_TYPE_EULER, integrate } from '../math';
import { Util, uid } from '../utils';
import { InitializerUtil } from '../initializer';
import Particle from '../core/Particle';
import isNumber from 'lodash/isNumber';
import { EMITTER_TYPE_EMITTER as type } from './types';
/**
 * Emitters are the System engine's particle factories. They cause particles to
 * be rendered by emitting them, and store all particle initializers and behaviours.
 *
 */

export default class Emitter extends Particle {
  /**
   * Constructs an Emitter instance.
   *
   * @param {object} properties - The properties to instantiate the emitter with
   * @return void
   */
  constructor(properties) {
    super(properties);
    /**
     * @desc The class type.
     * @type {string}
     */

    this.type = type;
    /**
     * @desc The particles emitted by this emitter.
     * @type {array}
     */

    this.particles = [];
    /**
     * @desc The initializers for particles emitted by this emitter.
     * @type {array}
     */

    this.initializers = [];
    /**
     * @desc The behaviours for particles emitted by this emitter.
     * @type {array}
     */

    this.behaviours = [];
    /**
     * @desc The behaviours for the emitter.
     * @type {array}
     */

    this.emitterBehaviours = [];
    /**
     * @desc The current emit iteration.
     * @type {integer}
     */

    this.currentEmitTime = 0;
    /**
     * @desc The total number of times the emitter should emit particles.
     * @type {integer}
     */

    this.totalEmitTimes = -1;
    /**
     * @desc The friction coefficient for all particle to emit by.
     * @type {number}
     */

    this.damping = DEFAULT_DAMPING;
    /**
     * @desc Ensures that particles emitted by this emitter are positioned
     * according to the emitter's properties.
     * @type {boolean}
     */

    this.bindEmitter = DEFAULT_BIND_EMITTER;
    /**
     * @desc Determines if the emitter will dispatch internal events. Defaults
     * to false
     * @type {boolean}
     */

    this.bindEmitterEvent = DEFAULT_BIND_EMITTER_EVENT;
    /**
     * @desc The number of particles to emit per second (a [particle]/b [s])
     * @type {Rate}
     */

    this.rate = DEFAULT_EMITTER_RATE;
    /**
     * @desc Determines if the emitter is emitting particles or not.
     * @type {boolean}
     */

    this.isEmitting = false;
    /**
     * @desc The emitter's id.
     * @type {string}
     */

    this.id = `emitter-${uid()}`;
    this.cID = 0;
    this.name = 'Emitter';
    /**
     * @desc The index of the emitter as it is added to the system.
     * @type {number|undefined}
     */

    this.index = DEFAULT_EMITTER_INDEX;
    /**
     * @desc The emitter's internal event dispatcher.
     * @type {EventDispatcher}
     */

    this.eventDispatcher = new EventDispatcher();
  }
  /**
   * Proxy method for the internal event dispatcher's dispatchEvent method.
   *
   * @param {string} event - The event to dispatch
   * @param {object<Particle>} [target=this] - The event target
   */


  dispatch(event, target = this) {
    this.eventDispatcher.dispatchEvent(event, target);
  }
  /**
   * Sets the emitter rate.
   *
   * @param {Rate} rate - a rate initializer object
   * @return {Emitter}
   */


  setRate(rate) {
    this.rate = rate;
    return this;
  }
  /**
   * Sets the position of the emitter.
   *
   * @param {object} newPosition - an object the new x, y and z props
   * @return {Emitter}
   */


  setPosition(newPosition = {}) {
    const {
      position
    } = this;
    const {
      x = position.x,
      y = position.y,
      z = position.z
    } = newPosition;
    this.position.set(x, y, z);
    return this;
  }
  /**
   * Sets the rotation of the emitter.
   *
   * @param {object} newRotation - an object the new x, y and z props
   * @return {Emitter}
   */


  setRotation(newRotation = {}) {
    const {
      rotation
    } = this;
    const {
      x = rotation.x,
      y = rotation.y,
      z = rotation.z
    } = newRotation;
    this.rotation.set(x, y, z);
    return this;
  }
  /**
   * Sets the total number of times the emitter should emit particles as well as
   * the emitter's life. Also intializes the emitter rate.
   * This enables the emitter to emit particles.
   *
   * @param {number} [totalEmitTimes=Infinity] - the total number of times to emit particles
   * @param {number} [life=Infinity] - the life of this emitter in milliseconds
   * @return {Emitter}
   */


  emit(totalEmitTimes = Infinity, life = Infinity) {
    this.currentEmitTime = 0;
    this.totalEmitTimes = isNumber(totalEmitTimes) ? totalEmitTimes : Infinity;

    if (totalEmitTimes === 1) {
      this.life = totalEmitTimes;
    } else {
      this.life = isNumber(life) ? life : Infinity;
    }

    this.rate.init();
    this.isEmitting = true;
    return this;
  }
  /**
   * Experimental emit method that is designed to be called from the System.emit method.
   *
   * @return {Emitter}
   */


  experimental_emit() {
    const {
      isEmitting,
      totalEmitTimes,
      life
    } = this;

    if (!isEmitting) {
      this.currentEmitTime = 0;

      if (!totalEmitTimes) {
        this.setTotalEmitTimes(Infinity);
      }

      if (!life) {
        this.setLife(Infinity);
      }

      this.rate.init();
      this.isEmitting = true;
    }

    return this;
  }
  /**
   * Sets the total emit times for the emitter.
   *
   * @param {number} [totalEmitTimes=Infinity] - the total number of times to emit particles
   * @return {Emitter}
   */


  setTotalEmitTimes(totalEmitTimes = Infinity) {
    this.totalEmitTimes = isNumber(totalEmitTimes) ? totalEmitTimes : Infinity;
    return this;
  }
  /**
   * Sets the life of the emitter.
   *
   * @param {number} [life=Infinity] - the life of this emitter in milliseconds
   * @return {Emitter}
   */


  setLife(life = Infinity) {
    if (this.totalEmitTimes === 1) {
      this.life = this.totalEmitTimes;
    } else {
      this.life = isNumber(life) ? life : Infinity;
    }

    return this;
  }
  /**
   * Stops the emitter from emitting particles.
   *
   * @return void
   */


  stopEmit() {
    this.totalEmitTimes = -1;
    this.currentEmitTime = 0;
    this.isEmitting = false;
  }
  /**
   * Kills all of the emitter's particles.
   *
   * @return void
   */


  removeAllParticles() {
    let i = this.particles.length;

    while (i--) {
      this.particles[i].dead = true;
    }
  }
  /**
   * Adds a particle initializer to the emitter.
   * Each initializer is run on each particle when they are created.
   *
   * @param {Initializer} initializer - The initializer to add
   * @return {Emitter}
   */


  addInitializer(initializer) {
    this.initializers.push(initializer);
    return this;
  }
  /**
   * Adds multiple particle initializers to the emitter.
   *
   * @param {array<Initializer>} initializers - an array of particle initializers
   * @return {Emitter}
   */


  addInitializers(initializers) {
    let i = initializers.length;

    while (i--) {
      this.addInitializer(initializers[i]);
    }

    return this;
  }
  /**
   * Sets the emitter's particle initializers.
   *
   * @param {array<Initializer>} initializers - an array of particle initializers
   * @return {Emitter}
   */


  setInitializers(initializers) {
    this.initializers = initializers;
    return this;
  }
  /**
   * Removes an initializer from the emitter's initializers array.
   *
   * @param {Initializer} initializer - The initializer to remove
   * @return {Emitter}
   */


  removeInitializer(initializer) {
    const index = this.initializers.indexOf(initializer);

    if (index > -1) {
      this.initializers.splice(index, 1);
    }

    return this;
  }
  /**
   * Removes all initializers.
   *
   * @return {Emitter}
   */


  removeAllInitializers() {
    Util.destroyArray(this.initializers);
    return this;
  }
  /**
   * Adds a behaviour to the emitter. All emitter behaviours are added to each particle when
   * they are emitted.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the emitter
   * @return {Emitter}
   */


  addBehaviour(behaviour) {
    this.behaviours.push(behaviour);
    return this;
  }
  /**
   * Adds multiple behaviours to the emitter.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  addBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addBehaviour(behaviours[i]);
    }

    return this;
  }
  /**
   * Sets the emitter's behaviours.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  setBehaviours(behaviours) {
    this.behaviours = behaviours;
    return this;
  }
  /**
   * Removes the behaviour from the emitter's behaviours array.
   *
   * @param {Behaviour} behaviour - The behaviour to remove
   * @return {Emitter}
   */


  removeBehaviour(behaviour) {
    const index = this.behaviours.indexOf(behaviour);

    if (index > -1) {
      this.behaviours.splice(index, 1);
    }

    return this;
  }
  /**
   * Removes all behaviours from the emitter.
   *
   * @return {Emitter}
   */


  removeAllBehaviours() {
    Util.destroyArray(this.behaviours);
    return this;
  }
  /**
   * Adds an emitter behaviour to the emitter.
   *
   * @param {Behaviour} behaviour - The behaviour to add to the emitter
   * @return {Emitter}
   */


  addEmitterBehaviour(behaviour) {
    this.emitterBehaviours.push(behaviour);
    behaviour.initialize(this);
    return this;
  }
  /**
   * Adds multiple behaviours to the emitter.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  addEmitterBehaviours(behaviours) {
    let i = behaviours.length;

    while (i--) {
      this.addEmitterBehaviour(behaviours[i]);
    }

    return this;
  }
  /**
   * Sets the emitter's behaviours.
   *
   * @param {array<Behaviour>} behaviours - an array of emitter behaviours
   * @return {Emitter}
   */


  setEmitterBehaviours(behaviours) {
    const length = behaviours.length;
    this.emitterBehaviours = behaviours;

    for (let i = 0; i < length; i++) {
      this.emitterBehaviours[i].initialize(this);
    }

    return this;
  }
  /**
   * Removes the behaviour from the emitter's behaviours array.
   *
   * @param {Behaviour} behaviour - The behaviour to remove
   * @return {Emitter}
   */


  removeEmitterBehaviour(behaviour) {
    const index = this.emitterBehaviours.indexOf(behaviour);

    if (index > -1) {
      this.emitterBehaviours.splice(index, 1);
    }

    return this;
  }
  /**
   * Removes all behaviours from the emitter.
   *
   * @return {Emitter}
   */


  removeAllEmitterBehaviours() {
    Util.destroyArray(this.emitterBehaviours);
    return this;
  }
  /**
   * Adds the event listener for the EMITTER_DEAD event.
   *
   * @param {onEmitterDead} - The function to call when the EMITTER_DEAD is dispatched.
   * @return {Emitter}
   */


  addOnEmitterDeadEventListener(onEmitterDead) {
    this.eventDispatcher.addEventListener(`${this.id}_${EMITTER_DEAD}`, () => onEmitterDead());
    return this;
  }
  /**
   * Creates a particle by retreiving one from the pool and setting it up with
   * the supplied initializer and behaviour.
   *
   * @return {Emitter}
   */


  createParticle() {
    const particle = this.parent.pool.get(Particle);
    const index = this.particles.length;
    this.setupParticle(particle, index);
    this.parent && this.parent.dispatch(PARTICLE_CREATED, particle);
    this.bindEmitterEvent && this.dispatch(PARTICLE_CREATED, particle);
    return particle;
  }
  /**
   * Sets up a particle by running all initializers on it and setting its behaviours.
   * Also adds the particle to this.particles.
   *
   * @param {Particle} particle - The particle to setup
   * @return void
   */


  setupParticle(particle, index) {
    const {
      initializers,
      behaviours
    } = this;
    InitializerUtil.initialize(this, particle, initializers);
    particle.addBehaviours(behaviours);
    particle.parent = this;
    particle.index = index;
    this.particles.push(particle);
  }
  /**
   * Updates the emitter according to the time passed by calling the generate
   * and integrate methods. The generate method creates particles, the integrate
   * method updates existing particles.
   *
   * If the emitter age is greater than time, the emitter is killed.
   *
   * This method also indexes/deindexes particles.
   *
   * @param {number} time - System engine time
   * @return void
   */


  update(time) {
    if (!this.isEmitting && this.particles.length === 0) {
      return;
    }

    this.age += time;

    if (this.dead || this.age >= this.life) {
      this.destroy();
    }

    if (this.isEmitting) {
      this.generate(time);
    }

    this.integrate(time);
    let i = this.particles.length;

    while (i--) {
      const particle = this.particles[i];

      if (particle.dead) {
        this.parent && this.parent.dispatch(PARTICLE_DEAD, particle);
        this.bindEmitterEvent && this.dispatch(PARTICLE_DEAD, particle);
        this.parent.pool.expire(particle.reset());
        this.particles.splice(i, 1);

        if (this.particles.length === 0) {
          this.parent && this.parent.dispatch(SYSTEM_UPDATE);
        }
      }
    }

    this.updateEmitterBehaviours(time);
  }
  /**
   * Updates the emitter's emitter behaviours.
   *
   * @param {number} time - System engine time
   * @return void
   */


  updateEmitterBehaviours(time) {
    if (this.sleep) {
      return;
    }

    const length = this.emitterBehaviours.length;

    for (let i = 0; i < length; i++) {
      this.emitterBehaviours[i].applyBehaviour(this, time, i);
    }
  }
  /**
   * Runs the integration algorithm on the emitter and all particles.
   * Updates the particles with the timstamp passed.
   *
   * @param {number} time - System engine time
   * @return void
   */


  integrate(time) {
    const integrationType = this.parent ? this.parent.integrationType : INTEGRATION_TYPE_EULER;
    const damping = 1 - this.damping;
    integrate(this, time, damping, integrationType);
    let index = this.particles.length;

    while (index--) {
      const particle = this.particles[index];
      particle.update(time, index);
      integrate(particle, time, damping, integrationType);
      this.parent && this.parent.dispatch(PARTICLE_UPDATE, particle);
      this.bindEmitterEvent && this.dispatch(PARTICLE_UPDATE, particle);
    }
  }
  /**
   * Generates new particles.
   *
   * @param {number} time - System engine time
   * @return void
   */


  generate(time) {
    if (this.totalEmitTimes === 1) {
      let i = this.rate.getValue(99999);

      if (i > 0) {
        this.cID = i;
      }

      while (i--) {
        this.createParticle();
      }

      this.totalEmitTimes = 0;
      return;
    }

    this.currentEmitTime += time;

    if (this.currentEmitTime < this.totalEmitTimes) {
      let i = this.rate.getValue(time);

      if (i > 0) {
        this.cID = i;
      }

      while (i--) {
        this.createParticle();
      }
    }
  }
  /**
   * Kills the emitter.
   *
   * @return void
   */


  destroy() {
    this.dead = true;
    this.energy = 0;
    this.totalEmitTimes = -1;

    if (this.particles.length == 0) {
      this.isEmitting = false;
      this.removeAllInitializers();
      this.removeAllBehaviours();
      this.dispatch(`${this.id}_${EMITTER_DEAD}`);
      this.parent && this.parent.removeEmitter(this);
    }
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbWl0dGVyL0VtaXR0ZXIuanMiXSwibmFtZXMiOlsiREVGQVVMVF9CSU5EX0VNSVRURVIiLCJERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVCIsIkRFRkFVTFRfREFNUElORyIsIkRFRkFVTFRfRU1JVFRFUl9JTkRFWCIsIkRFRkFVTFRfRU1JVFRFUl9SQVRFIiwiRXZlbnREaXNwYXRjaGVyIiwiRU1JVFRFUl9ERUFEIiwiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX0RFQUQiLCJQQVJUSUNMRV9VUERBVEUiLCJTWVNURU1fVVBEQVRFIiwiSU5URUdSQVRJT05fVFlQRV9FVUxFUiIsImludGVncmF0ZSIsIlV0aWwiLCJ1aWQiLCJJbml0aWFsaXplclV0aWwiLCJQYXJ0aWNsZSIsImlzTnVtYmVyIiwiRU1JVFRFUl9UWVBFX0VNSVRURVIiLCJ0eXBlIiwiRW1pdHRlciIsImNvbnN0cnVjdG9yIiwicHJvcGVydGllcyIsInBhcnRpY2xlcyIsImluaXRpYWxpemVycyIsImJlaGF2aW91cnMiLCJlbWl0dGVyQmVoYXZpb3VycyIsImN1cnJlbnRFbWl0VGltZSIsInRvdGFsRW1pdFRpbWVzIiwiZGFtcGluZyIsImJpbmRFbWl0dGVyIiwiYmluZEVtaXR0ZXJFdmVudCIsInJhdGUiLCJpc0VtaXR0aW5nIiwiaWQiLCJjSUQiLCJuYW1lIiwiaW5kZXgiLCJldmVudERpc3BhdGNoZXIiLCJkaXNwYXRjaCIsImV2ZW50IiwidGFyZ2V0IiwiZGlzcGF0Y2hFdmVudCIsInNldFJhdGUiLCJzZXRQb3NpdGlvbiIsIm5ld1Bvc2l0aW9uIiwicG9zaXRpb24iLCJ4IiwieSIsInoiLCJzZXQiLCJzZXRSb3RhdGlvbiIsIm5ld1JvdGF0aW9uIiwicm90YXRpb24iLCJlbWl0IiwiSW5maW5pdHkiLCJsaWZlIiwiaW5pdCIsImV4cGVyaW1lbnRhbF9lbWl0Iiwic2V0VG90YWxFbWl0VGltZXMiLCJzZXRMaWZlIiwic3RvcEVtaXQiLCJyZW1vdmVBbGxQYXJ0aWNsZXMiLCJpIiwibGVuZ3RoIiwiZGVhZCIsImFkZEluaXRpYWxpemVyIiwiaW5pdGlhbGl6ZXIiLCJwdXNoIiwiYWRkSW5pdGlhbGl6ZXJzIiwic2V0SW5pdGlhbGl6ZXJzIiwicmVtb3ZlSW5pdGlhbGl6ZXIiLCJpbmRleE9mIiwic3BsaWNlIiwicmVtb3ZlQWxsSW5pdGlhbGl6ZXJzIiwiZGVzdHJveUFycmF5IiwiYWRkQmVoYXZpb3VyIiwiYmVoYXZpb3VyIiwiYWRkQmVoYXZpb3VycyIsInNldEJlaGF2aW91cnMiLCJyZW1vdmVCZWhhdmlvdXIiLCJyZW1vdmVBbGxCZWhhdmlvdXJzIiwiYWRkRW1pdHRlckJlaGF2aW91ciIsImluaXRpYWxpemUiLCJhZGRFbWl0dGVyQmVoYXZpb3VycyIsInNldEVtaXR0ZXJCZWhhdmlvdXJzIiwicmVtb3ZlRW1pdHRlckJlaGF2aW91ciIsInJlbW92ZUFsbEVtaXR0ZXJCZWhhdmlvdXJzIiwiYWRkT25FbWl0dGVyRGVhZEV2ZW50TGlzdGVuZXIiLCJvbkVtaXR0ZXJEZWFkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNyZWF0ZVBhcnRpY2xlIiwicGFydGljbGUiLCJwYXJlbnQiLCJwb29sIiwiZ2V0Iiwic2V0dXBQYXJ0aWNsZSIsInVwZGF0ZSIsInRpbWUiLCJhZ2UiLCJkZXN0cm95IiwiZ2VuZXJhdGUiLCJleHBpcmUiLCJyZXNldCIsInVwZGF0ZUVtaXR0ZXJCZWhhdmlvdXJzIiwic2xlZXAiLCJhcHBseUJlaGF2aW91ciIsImludGVncmF0aW9uVHlwZSIsImdldFZhbHVlIiwiZW5lcmd5IiwicmVtb3ZlRW1pdHRlciJdLCJtYXBwaW5ncyI6IkFBQUEsU0FDRUEsb0JBREYsRUFFRUMsMEJBRkYsRUFHRUMsZUFIRixFQUlFQyxxQkFKRixFQUtFQyxvQkFMRixRQU1PLGFBTlA7QUFPQSxPQUFPQyxlQUFQLElBQ0VDLFlBREYsRUFFRUMsZ0JBRkYsRUFHRUMsYUFIRixFQUlFQyxlQUpGLEVBS0VDLGFBTEYsUUFNTyxXQU5QO0FBT0EsU0FBU0Msc0JBQVQs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Q0FBVTRFLFFBQVYsQ0FBbUJWLElBQW5CLENBQVI7O0FBRUEsVUFBSW5DLENBQUMsR0FBRyxDQUFSLEVBQVc7QUFDVCxhQUFLNUIsR0FBTCxHQUFXNEIsQ0FBWDtBQUNEOztBQUVELGFBQU9BLENBQUMsRUFBUixFQUFZO0FBQ1YsYUFBSzRCLGNBQUw7QUFDRDtBQUNGO0FBQ0Y7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7QUFDRVMsRUFBQUEsT0FBTyxHQUFHO0FBQ1IsU0FBS25DLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSzRDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS2pGLGNBQUwsR0FBc0IsQ0FBQyxDQUF2Qjs7QUFFQSxRQUFJLEtBQUtMLFNBQUwsQ0FBZXlDLE1BQWYsSUFBeUIsQ0FBN0IsRUFBZ0M7QUFDOUIsV0FBSy9CLFVBQUwsR0FBa0IsS0FBbEI7QUFDQSxXQUFLeUMscUJBQUw7QUFDQSxXQUFLTyxtQkFBTDtBQUNBLFdBQUsxQyxRQUFMLENBQWUsR0FBRSxLQUFLTCxFQUFHLElBQUc1QixZQUFhLEVBQXpDO0FBRUEsV0FBS3VGLE1BQUwsSUFBZSxLQUFLQSxNQUFMLENBQVlpQixhQUFaLENBQTBCLElBQTFCLENBQWY7QUFDRDtBQUNGOztBQWpxQjJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBERUZBVUxUX0JJTkRfRU1JVFRFUixcclxuICBERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVCxcclxuICBERUZBVUxUX0RBTVBJTkcsXHJcbiAgREVGQVVMVF9FTUlUVEVSX0lOREVYLFxyXG4gIERFRkFVTFRfRU1JVFRFUl9SQVRFLFxyXG59IGZyb20gJy4vY29uc3RhbnRzJztcclxuaW1wb3J0IEV2ZW50RGlzcGF0Y2hlciwge1xyXG4gIEVNSVRURVJfREVBRCxcclxuICBQQVJUSUNMRV9DUkVBVEVELFxyXG4gIFBBUlRJQ0xFX0RFQUQsXHJcbiAgUEFSVElDTEVfVVBEQVRFLFxyXG4gIFNZU1RFTV9VUERBVEUsXHJcbn0gZnJvbSAnLi4vZXZlbnRzJztcclxuaW1wb3J0IHsgSU5URUdSQVRJT05fVFlQRV9FVUxFUiwgaW50ZWdyYXRlIH0gZnJvbSAnLi4vbWF0aCc7XHJcbmltcG9ydCB7IFV0aWwsIHVpZCB9IGZyb20gJy4uL3V0aWxzJztcclxuXHJcbmltcG9ydCB7IEluaXRpYWxpemVyVXRpbCB9IGZyb20gJy4uL2luaXRpYWxpemVyJztcclxuaW1wb3J0IFBhcnRpY2xlIGZyb20gJy4uL2NvcmUvUGFydGljbGUnO1xyXG5pbXBvcnQgaXNOdW1iZXIgZnJvbSAnbG9kYXNoL2lzTnVtYmVyJztcclxuaW1wb3J0IHsgRU1JVFRFUl9UWVBFX0VNSVRURVIgYXMgdHlwZSB9IGZyb20gJy4vdHlwZXMnO1xyXG5cclxuLyoqXHJcbiAqIEVtaXR0ZXJzIGFyZSB0aGUgU3lzdGVtIGVuZ2luZSdzIHBhcnRpY2xlIGZhY3Rvcmllcy4gVGhleSBjYXVzZSBwYXJ0aWNsZXMgdG9cclxuICogYmUgcmVuZGVyZWQgYnkgZW1pdHRpbmcgdGhlbSwgYW5kIHN0b3JlIGFsbCBwYXJ0aWNsZSBpbml0aWFsaXplcnMgYW5kIGJlaGF2aW91cnMuXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbWl0dGVyIGV4dGVuZHMgUGFydGljbGUge1xyXG4gIC8qKlxyXG4gICAqIENvbnN0cnVjdHMgYW4gRW1pdHRlciBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wZXJ0aWVzIC0gVGhlIHByb3BlcnRpZXMgdG8gaW5zdGFudGlhdGUgdGhlIGVtaXR0ZXIgd2l0aFxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHByb3BlcnRpZXMpIHtcclxuICAgIHN1cGVyKHByb3BlcnRpZXMpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHBhcnRpY2xlcyBlbWl0dGVkIGJ5IHRoaXMgZW1pdHRlci5cclxuICAgICAqIEB0eXBlIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wYXJ0aWNsZXMgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBpbml0aWFsaXplcnMgZm9yIHBhcnRpY2xlcyBlbWl0dGVkIGJ5IHRoaXMgZW1pdHRlci5cclxuICAgICAqIEB0eXBlIHthcnJheX1cclxuICAgICAqL1xyXG4gICAgdGhpcy5pbml0aWFsaXplcnMgPSBbXTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBiZWhhdmlvdXJzIGZvciBwYXJ0aWNsZXMgZW1pdHRlZCBieSB0aGlzIGVtaXR0ZXIuXHJcbiAgICAgKiBAdHlwZSB7YXJyYXl9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuYmVoYXZpb3VycyA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGJlaGF2aW91cnMgZm9yIHRoZSBlbWl0dGVyLlxyXG4gICAgICogQHR5cGUge2FycmF5fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY3VycmVudCBlbWl0IGl0ZXJhdGlvbi5cclxuICAgICAqIEB0eXBlIHtpbnRlZ2VyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmN1cnJlbnRFbWl0VGltZSA9IDA7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRoZSBlbWl0dGVyIHNob3VsZCBlbWl0IHBhcnRpY2xlcy5cclxuICAgICAqIEB0eXBlIHtpbnRlZ2VyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnRvdGFsRW1pdFRpbWVzID0gLTE7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgZnJpY3Rpb24gY29lZmZpY2llbnQgZm9yIGFsbCBwYXJ0aWNsZSB0byBlbWl0IGJ5LlxyXG4gICAgICogQHR5cGUge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5kYW1waW5nID0gREVGQVVMVF9EQU1QSU5HO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRW5zdXJlcyB0aGF0IHBhcnRpY2xlcyBlbWl0dGVkIGJ5IHRoaXMgZW1pdHRlciBhcmUgcG9zaXRpb25lZFxyXG4gICAgICogYWNjb3JkaW5nIHRvIHRoZSBlbWl0dGVyJ3MgcHJvcGVydGllcy5cclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJpbmRFbWl0dGVyID0gREVGQVVMVF9CSU5EX0VNSVRURVI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIHRoZSBlbWl0dGVyIHdpbGwgZGlzcGF0Y2ggaW50ZXJuYWwgZXZlbnRzLiBEZWZhdWx0c1xyXG4gICAgICogdG8gZmFsc2VcclxuICAgICAqIEB0eXBlIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICB0aGlzLmJpbmRFbWl0dGVyRXZlbnQgPSBERUZBVUxUX0JJTkRfRU1JVFRFUl9FVkVOVDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIGVtaXQgcGVyIHNlY29uZCAoYSBbcGFydGljbGVdL2IgW3NdKVxyXG4gICAgICogQHR5cGUge1JhdGV9XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmF0ZSA9IERFRkFVTFRfRU1JVFRFUl9SQVRFO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgRGV0ZXJtaW5lcyBpZiB0aGUgZW1pdHRlciBpcyBlbWl0dGluZyBwYXJ0aWNsZXMgb3Igbm90LlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaXNFbWl0dGluZyA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGVtaXR0ZXIncyBpZC5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuaWQgPSBgZW1pdHRlci0ke3VpZCgpfWA7XHJcbiAgICB0aGlzLmNJRCA9IDA7XHJcbiAgICB0aGlzLm5hbWUgPSAnRW1pdHRlcic7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgaW5kZXggb2YgdGhlIGVtaXR0ZXIgYXMgaXQgaXMgYWRkZWQgdG8gdGhlIHN5c3RlbS5cclxuICAgICAqIEB0eXBlIHtudW1iZXJ8dW5kZWZpbmVkfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmluZGV4ID0gREVGQVVMVF9FTUlUVEVSX0lOREVYO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGVtaXR0ZXIncyBpbnRlcm5hbCBldmVudCBkaXNwYXRjaGVyLlxyXG4gICAgICogQHR5cGUge0V2ZW50RGlzcGF0Y2hlcn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5ldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBQcm94eSBtZXRob2QgZm9yIHRoZSBpbnRlcm5hbCBldmVudCBkaXNwYXRjaGVyJ3MgZGlzcGF0Y2hFdmVudCBtZXRob2QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnQgLSBUaGUgZXZlbnQgdG8gZGlzcGF0Y2hcclxuICAgKiBAcGFyYW0ge29iamVjdDxQYXJ0aWNsZT59IFt0YXJnZXQ9dGhpc10gLSBUaGUgZXZlbnQgdGFyZ2V0XHJcbiAgICovXHJcbiAgZGlzcGF0Y2goZXZlbnQsIHRhcmdldCA9IHRoaXMpIHtcclxuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmRpc3BhdGNoRXZlbnQoZXZlbnQsIHRhcmdldCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBlbWl0dGVyIHJhdGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge1JhdGV9IHJhdGUgLSBhIHJhdGUgaW5pdGlhbGl6ZXIgb2JqZWN0XHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICBzZXRSYXRlKHJhdGUpIHtcclxuICAgIHRoaXMucmF0ZSA9IHJhdGU7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgZW1pdHRlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXdQb3NpdGlvbiAtIGFuIG9iamVjdCB0aGUgbmV3IHgsIHkgYW5kIHogcHJvcHNcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIHNldFBvc2l0aW9uKG5ld1Bvc2l0aW9uID0ge30pIHtcclxuICAgIGNvbnN0IHsgcG9zaXRpb24gfSA9IHRoaXM7XHJcbiAgICBjb25zdCB7IHggPSBwb3NpdGlvbi54LCB5ID0gcG9zaXRpb24ueSwgeiA9IHBvc2l0aW9uLnogfSA9IG5ld1Bvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMucG9zaXRpb24uc2V0KHgsIHksIHopO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgcm90YXRpb24gb2YgdGhlIGVtaXR0ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV3Um90YXRpb24gLSBhbiBvYmplY3QgdGhlIG5ldyB4LCB5IGFuZCB6IHByb3BzXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICBzZXRSb3RhdGlvbihuZXdSb3RhdGlvbiA9IHt9KSB7XHJcbiAgICBjb25zdCB7IHJvdGF0aW9uIH0gPSB0aGlzO1xyXG4gICAgY29uc3QgeyB4ID0gcm90YXRpb24ueCwgeSA9IHJvdGF0aW9uLnksIHogPSByb3RhdGlvbi56IH0gPSBuZXdSb3RhdGlvbjtcclxuXHJcbiAgICB0aGlzLnJvdGF0aW9uLnNldCh4LCB5LCB6KTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIHRvdGFsIG51bWJlciBvZiB0aW1lcyB0aGUgZW1pdHRlciBzaG91bGQgZW1pdCBwYXJ0aWNsZXMgYXMgd2VsbCBhc1xyXG4gICAqIHRoZSBlbWl0dGVyJ3MgbGlmZS4gQWxzbyBpbnRpYWxpemVzIHRoZSBlbWl0dGVyIHJhdGUuXHJcbiAgICogVGhpcyBlbmFibGVzIHRoZSBlbWl0dGVyIHRvIGVtaXQgcGFydGljbGVzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt0b3RhbEVtaXRUaW1lcz1JbmZpbml0eV0gLSB0aGUgdG90YWwgbnVtYmVyIG9mIHRpbWVzIHRvIGVtaXQgcGFydGljbGVzXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaWZlPUluZmluaXR5XSAtIHRoZSBsaWZlIG9mIHRoaXMgZW1pdHRlciBpbiBtaWxsaXNlY29uZHNcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIGVtaXQodG90YWxFbWl0VGltZXMgPSBJbmZpbml0eSwgbGlmZSA9IEluZmluaXR5KSB7XHJcbiAgICB0aGlzLmN1cnJlbnRFbWl0VGltZSA9IDA7XHJcbiAgICB0aGlzLnRvdGFsRW1pdFRpbWVzID0gaXNOdW1iZXIodG90YWxFbWl0VGltZXMpID8gdG90YWxFbWl0VGltZXMgOiBJbmZpbml0eTtcclxuXHJcbiAgICBpZiAodG90YWxFbWl0VGltZXMgPT09IDEpIHtcclxuICAgICAgdGhpcy5saWZlID0gdG90YWxFbWl0VGltZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxpZmUgPSBpc051bWJlcihsaWZlKSA/IGxpZmUgOiBJbmZpbml0eTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnJhdGUuaW5pdCgpO1xyXG4gICAgdGhpcy5pc0VtaXR0aW5nID0gdHJ1ZTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEV4cGVyaW1lbnRhbCBlbWl0IG1ldGhvZCB0aGF0IGlzIGRlc2lnbmVkIHRvIGJlIGNhbGxlZCBmcm9tIHRoZSBTeXN0ZW0uZW1pdCBtZXRob2QuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIGV4cGVyaW1lbnRhbF9lbWl0KCkge1xyXG4gICAgY29uc3QgeyBpc0VtaXR0aW5nLCB0b3RhbEVtaXRUaW1lcywgbGlmZSB9ID0gdGhpcztcclxuXHJcbiAgICBpZiAoIWlzRW1pdHRpbmcpIHtcclxuICAgICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgPSAwO1xyXG5cclxuICAgICAgaWYgKCF0b3RhbEVtaXRUaW1lcykge1xyXG4gICAgICAgIHRoaXMuc2V0VG90YWxFbWl0VGltZXMoSW5maW5pdHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIWxpZmUpIHtcclxuICAgICAgICB0aGlzLnNldExpZmUoSW5maW5pdHkpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnJhdGUuaW5pdCgpO1xyXG4gICAgICB0aGlzLmlzRW1pdHRpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgdG90YWwgZW1pdCB0aW1lcyBmb3IgdGhlIGVtaXR0ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3RvdGFsRW1pdFRpbWVzPUluZmluaXR5XSAtIHRoZSB0b3RhbCBudW1iZXIgb2YgdGltZXMgdG8gZW1pdCBwYXJ0aWNsZXNcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIHNldFRvdGFsRW1pdFRpbWVzKHRvdGFsRW1pdFRpbWVzID0gSW5maW5pdHkpIHtcclxuICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSBpc051bWJlcih0b3RhbEVtaXRUaW1lcykgPyB0b3RhbEVtaXRUaW1lcyA6IEluZmluaXR5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgbGlmZSBvZiB0aGUgZW1pdHRlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbGlmZT1JbmZpbml0eV0gLSB0aGUgbGlmZSBvZiB0aGlzIGVtaXR0ZXIgaW4gbWlsbGlzZWNvbmRzXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICBzZXRMaWZlKGxpZmUgPSBJbmZpbml0eSkge1xyXG4gICAgaWYgKHRoaXMudG90YWxFbWl0VGltZXMgPT09IDEpIHtcclxuICAgICAgdGhpcy5saWZlID0gdGhpcy50b3RhbEVtaXRUaW1lcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubGlmZSA9IGlzTnVtYmVyKGxpZmUpID8gbGlmZSA6IEluZmluaXR5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RvcHMgdGhlIGVtaXR0ZXIgZnJvbSBlbWl0dGluZyBwYXJ0aWNsZXMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBzdG9wRW1pdCgpIHtcclxuICAgIHRoaXMudG90YWxFbWl0VGltZXMgPSAtMTtcclxuICAgIHRoaXMuY3VycmVudEVtaXRUaW1lID0gMDtcclxuICAgIHRoaXMuaXNFbWl0dGluZyA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogS2lsbHMgYWxsIG9mIHRoZSBlbWl0dGVyJ3MgcGFydGljbGVzLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgcmVtb3ZlQWxsUGFydGljbGVzKCkge1xyXG4gICAgbGV0IGkgPSB0aGlzLnBhcnRpY2xlcy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICB0aGlzLnBhcnRpY2xlc1tpXS5kZWFkID0gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBwYXJ0aWNsZSBpbml0aWFsaXplciB0byB0aGUgZW1pdHRlci5cclxuICAgKiBFYWNoIGluaXRpYWxpemVyIGlzIHJ1biBvbiBlYWNoIHBhcnRpY2xlIHdoZW4gdGhleSBhcmUgY3JlYXRlZC5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7SW5pdGlhbGl6ZXJ9IGluaXRpYWxpemVyIC0gVGhlIGluaXRpYWxpemVyIHRvIGFkZFxyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICovXHJcbiAgYWRkSW5pdGlhbGl6ZXIoaW5pdGlhbGl6ZXIpIHtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnB1c2goaW5pdGlhbGl6ZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBtdWx0aXBsZSBwYXJ0aWNsZSBpbml0aWFsaXplcnMgdG8gdGhlIGVtaXR0ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2FycmF5PEluaXRpYWxpemVyPn0gaW5pdGlhbGl6ZXJzIC0gYW4gYXJyYXkgb2YgcGFydGljbGUgaW5pdGlhbGl6ZXJzXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICBhZGRJbml0aWFsaXplcnMoaW5pdGlhbGl6ZXJzKSB7XHJcbiAgICBsZXQgaSA9IGluaXRpYWxpemVycy5sZW5ndGg7XHJcblxyXG4gICAgd2hpbGUgKGktLSkge1xyXG4gICAgICB0aGlzLmFkZEluaXRpYWxpemVyKGluaXRpYWxpemVyc1tpXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBlbWl0dGVyJ3MgcGFydGljbGUgaW5pdGlhbGl6ZXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHthcnJheTxJbml0aWFsaXplcj59IGluaXRpYWxpemVycyAtIGFuIGFycmF5IG9mIHBhcnRpY2xlIGluaXRpYWxpemVyc1xyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICovXHJcbiAgc2V0SW5pdGlhbGl6ZXJzKGluaXRpYWxpemVycykge1xyXG4gICAgdGhpcy5pbml0aWFsaXplcnMgPSBpbml0aWFsaXplcnM7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFuIGluaXRpYWxpemVyIGZyb20gdGhlIGVtaXR0ZXIncyBpbml0aWFsaXplcnMgYXJyYXkuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0luaXRpYWxpemVyfSBpbml0aWFsaXplciAtIFRoZSBpbml0aWFsaXplciB0byByZW1vdmVcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIHJlbW92ZUluaXRpYWxpemVyKGluaXRpYWxpemVyKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuaW5pdGlhbGl6ZXJzLmluZGV4T2YoaW5pdGlhbGl6ZXIpO1xyXG5cclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZXJzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGFsbCBpbml0aWFsaXplcnMuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIHJlbW92ZUFsbEluaXRpYWxpemVycygpIHtcclxuICAgIFV0aWwuZGVzdHJveUFycmF5KHRoaXMuaW5pdGlhbGl6ZXJzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYSBiZWhhdmlvdXIgdG8gdGhlIGVtaXR0ZXIuIEFsbCBlbWl0dGVyIGJlaGF2aW91cnMgYXJlIGFkZGVkIHRvIGVhY2ggcGFydGljbGUgd2hlblxyXG4gICAqIHRoZXkgYXJlIGVtaXR0ZWQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byBhZGQgdG8gdGhlIGVtaXR0ZXJcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIGFkZEJlaGF2aW91cihiZWhhdmlvdXIpIHtcclxuICAgIHRoaXMuYmVoYXZpb3Vycy5wdXNoKGJlaGF2aW91cik7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIG11bHRpcGxlIGJlaGF2aW91cnMgdG8gdGhlIGVtaXR0ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2FycmF5PEJlaGF2aW91cj59IGJlaGF2aW91cnMgLSBhbiBhcnJheSBvZiBlbWl0dGVyIGJlaGF2aW91cnNcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIGFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xyXG4gICAgbGV0IGkgPSBiZWhhdmlvdXJzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgIHRoaXMuYWRkQmVoYXZpb3VyKGJlaGF2aW91cnNbaV0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyB0aGUgZW1pdHRlcidzIGJlaGF2aW91cnMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge2FycmF5PEJlaGF2aW91cj59IGJlaGF2aW91cnMgLSBhbiBhcnJheSBvZiBlbWl0dGVyIGJlaGF2aW91cnNcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIHNldEJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xyXG4gICAgdGhpcy5iZWhhdmlvdXJzID0gYmVoYXZpb3VycztcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIGJlaGF2aW91ciBmcm9tIHRoZSBlbWl0dGVyJ3MgYmVoYXZpb3VycyBhcnJheS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgLSBUaGUgYmVoYXZpb3VyIHRvIHJlbW92ZVxyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICovXHJcbiAgcmVtb3ZlQmVoYXZpb3VyKGJlaGF2aW91cikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmJlaGF2aW91cnMuaW5kZXhPZihiZWhhdmlvdXIpO1xyXG5cclxuICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgIHRoaXMuYmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBlbWl0dGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICByZW1vdmVBbGxCZWhhdmlvdXJzKCkge1xyXG4gICAgVXRpbC5kZXN0cm95QXJyYXkodGhpcy5iZWhhdmlvdXJzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgYW4gZW1pdHRlciBiZWhhdmlvdXIgdG8gdGhlIGVtaXR0ZXIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge0JlaGF2aW91cn0gYmVoYXZpb3VyIC0gVGhlIGJlaGF2aW91ciB0byBhZGQgdG8gdGhlIGVtaXR0ZXJcclxuICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAqL1xyXG4gIGFkZEVtaXR0ZXJCZWhhdmlvdXIoYmVoYXZpb3VyKSB7XHJcbiAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzLnB1c2goYmVoYXZpb3VyKTtcclxuXHJcbiAgICBiZWhhdmlvdXIuaW5pdGlhbGl6ZSh0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZHMgbXVsdGlwbGUgYmVoYXZpb3VycyB0byB0aGUgZW1pdHRlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7YXJyYXk8QmVoYXZpb3VyPn0gYmVoYXZpb3VycyAtIGFuIGFycmF5IG9mIGVtaXR0ZXIgYmVoYXZpb3Vyc1xyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICovXHJcbiAgYWRkRW1pdHRlckJlaGF2aW91cnMoYmVoYXZpb3Vycykge1xyXG4gICAgbGV0IGkgPSBiZWhhdmlvdXJzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgIHRoaXMuYWRkRW1pdHRlckJlaGF2aW91cihiZWhhdmlvdXJzW2ldKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdGhlIGVtaXR0ZXIncyBiZWhhdmlvdXJzLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHthcnJheTxCZWhhdmlvdXI+fSBiZWhhdmlvdXJzIC0gYW4gYXJyYXkgb2YgZW1pdHRlciBiZWhhdmlvdXJzXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICBzZXRFbWl0dGVyQmVoYXZpb3VycyhiZWhhdmlvdXJzKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSBiZWhhdmlvdXJzLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmVtaXR0ZXJCZWhhdmlvdXJzID0gYmVoYXZpb3VycztcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuZW1pdHRlckJlaGF2aW91cnNbaV0uaW5pdGlhbGl6ZSh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIGJlaGF2aW91ciBmcm9tIHRoZSBlbWl0dGVyJ3MgYmVoYXZpb3VycyBhcnJheS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7QmVoYXZpb3VyfSBiZWhhdmlvdXIgLSBUaGUgYmVoYXZpb3VyIHRvIHJlbW92ZVxyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICovXHJcbiAgcmVtb3ZlRW1pdHRlckJlaGF2aW91cihiZWhhdmlvdXIpIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5lbWl0dGVyQmVoYXZpb3Vycy5pbmRleE9mKGJlaGF2aW91cik7XHJcblxyXG4gICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgdGhpcy5lbWl0dGVyQmVoYXZpb3Vycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlcyBhbGwgYmVoYXZpb3VycyBmcm9tIHRoZSBlbWl0dGVyLlxyXG4gICAqXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICByZW1vdmVBbGxFbWl0dGVyQmVoYXZpb3VycygpIHtcclxuICAgIFV0aWwuZGVzdHJveUFycmF5KHRoaXMuZW1pdHRlckJlaGF2aW91cnMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyB0aGUgZXZlbnQgbGlzdGVuZXIgZm9yIHRoZSBFTUlUVEVSX0RFQUQgZXZlbnQuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29uRW1pdHRlckRlYWR9IC0gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiB0aGUgRU1JVFRFUl9ERUFEIGlzIGRpc3BhdGNoZWQuXHJcbiAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgKi9cclxuICBhZGRPbkVtaXR0ZXJEZWFkRXZlbnRMaXN0ZW5lcihvbkVtaXR0ZXJEZWFkKSB7XHJcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudExpc3RlbmVyKGAke3RoaXMuaWR9XyR7RU1JVFRFUl9ERUFEfWAsICgpID0+XHJcbiAgICAgIG9uRW1pdHRlckRlYWQoKVxyXG4gICAgKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBwYXJ0aWNsZSBieSByZXRyZWl2aW5nIG9uZSBmcm9tIHRoZSBwb29sIGFuZCBzZXR0aW5nIGl0IHVwIHdpdGhcclxuICAgKiB0aGUgc3VwcGxpZWQgaW5pdGlhbGl6ZXIgYW5kIGJlaGF2aW91ci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICovXHJcbiAgY3JlYXRlUGFydGljbGUoKSB7XHJcbiAgICBjb25zdCBwYXJ0aWNsZSA9IHRoaXMucGFyZW50LnBvb2wuZ2V0KFBhcnRpY2xlKTtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIHRoaXMuc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5kZXgpO1xyXG4gICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzcGF0Y2goUEFSVElDTEVfQ1JFQVRFRCwgcGFydGljbGUpO1xyXG4gICAgdGhpcy5iaW5kRW1pdHRlckV2ZW50ICYmIHRoaXMuZGlzcGF0Y2goUEFSVElDTEVfQ1JFQVRFRCwgcGFydGljbGUpO1xyXG5cclxuICAgIHJldHVybiBwYXJ0aWNsZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgdXAgYSBwYXJ0aWNsZSBieSBydW5uaW5nIGFsbCBpbml0aWFsaXplcnMgb24gaXQgYW5kIHNldHRpbmcgaXRzIGJlaGF2aW91cnMuXHJcbiAgICogQWxzbyBhZGRzIHRoZSBwYXJ0aWNsZSB0byB0aGlzLnBhcnRpY2xlcy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7UGFydGljbGV9IHBhcnRpY2xlIC0gVGhlIHBhcnRpY2xlIHRvIHNldHVwXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgc2V0dXBQYXJ0aWNsZShwYXJ0aWNsZSwgaW5kZXgpIHtcclxuICAgIGNvbnN0IHsgaW5pdGlhbGl6ZXJzLCBiZWhhdmlvdXJzIH0gPSB0aGlzO1xyXG5cclxuICAgIEluaXRpYWxpemVyVXRpbC5pbml0aWFsaXplKHRoaXMsIHBhcnRpY2xlLCBpbml0aWFsaXplcnMpO1xyXG5cclxuICAgIHBhcnRpY2xlLmFkZEJlaGF2aW91cnMoYmVoYXZpb3Vycyk7XHJcbiAgICBwYXJ0aWNsZS5wYXJlbnQgPSB0aGlzO1xyXG4gICAgcGFydGljbGUuaW5kZXggPSBpbmRleDtcclxuXHJcbiAgICB0aGlzLnBhcnRpY2xlcy5wdXNoKHBhcnRpY2xlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFVwZGF0ZXMgdGhlIGVtaXR0ZXIgYWNjb3JkaW5nIHRvIHRoZSB0aW1lIHBhc3NlZCBieSBjYWxsaW5nIHRoZSBnZW5lcmF0ZVxyXG4gICAqIGFuZCBpbnRlZ3JhdGUgbWV0aG9kcy4gVGhlIGdlbmVyYXRlIG1ldGhvZCBjcmVhdGVzIHBhcnRpY2xlcywgdGhlIGludGVncmF0ZVxyXG4gICAqIG1ldGhvZCB1cGRhdGVzIGV4aXN0aW5nIHBhcnRpY2xlcy5cclxuICAgKlxyXG4gICAqIElmIHRoZSBlbWl0dGVyIGFnZSBpcyBncmVhdGVyIHRoYW4gdGltZSwgdGhlIGVtaXR0ZXIgaXMga2lsbGVkLlxyXG4gICAqXHJcbiAgICogVGhpcyBtZXRob2QgYWxzbyBpbmRleGVzL2RlaW5kZXhlcyBwYXJ0aWNsZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFN5c3RlbSBlbmdpbmUgdGltZVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIHVwZGF0ZSh0aW1lKSB7XHJcbiAgICBpZiAoIXRoaXMuaXNFbWl0dGluZyAmJiB0aGlzLnBhcnRpY2xlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWdlICs9IHRpbWU7XHJcblxyXG4gICAgaWYgKHRoaXMuZGVhZCB8fCB0aGlzLmFnZSA+PSB0aGlzLmxpZmUpIHtcclxuICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaXNFbWl0dGluZylcclxuICAgIHtcclxuICAgICAgdGhpcy5nZW5lcmF0ZSh0aW1lKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmludGVncmF0ZSh0aW1lKTtcclxuXHJcbiAgICBsZXQgaSA9IHRoaXMucGFydGljbGVzLmxlbmd0aDtcclxuXHJcbiAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaV07XHJcblxyXG4gICAgICBpZiAocGFydGljbGUuZGVhZCkge1xyXG4gICAgICAgIHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LmRpc3BhdGNoKFBBUlRJQ0xFX0RFQUQsIHBhcnRpY2xlKTtcclxuICAgICAgICB0aGlzLmJpbmRFbWl0dGVyRXZlbnQgJiYgdGhpcy5kaXNwYXRjaChQQVJUSUNMRV9ERUFELCBwYXJ0aWNsZSk7XHJcbiAgICAgICAgdGhpcy5wYXJlbnQucG9vbC5leHBpcmUocGFydGljbGUucmVzZXQoKSk7XHJcbiAgICAgICAgdGhpcy5wYXJ0aWNsZXMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgIGlmKHRoaXMucGFydGljbGVzLmxlbmd0aCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5kaXNwYXRjaChTWVNURU1fVVBEQVRFKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnVwZGF0ZUVtaXR0ZXJCZWhhdmlvdXJzKHRpbWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVXBkYXRlcyB0aGUgZW1pdHRlcidzIGVtaXR0ZXIgYmVoYXZpb3Vycy5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lIC0gU3lzdGVtIGVuZ2luZSB0aW1lXHJcbiAgICogQHJldHVybiB2b2lkXHJcbiAgICovXHJcbiAgdXBkYXRlRW1pdHRlckJlaGF2aW91cnModGltZSkge1xyXG4gICAgaWYgKHRoaXMuc2xlZXApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlbmd0aCA9IHRoaXMuZW1pdHRlckJlaGF2aW91cnMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5lbWl0dGVyQmVoYXZpb3Vyc1tpXS5hcHBseUJlaGF2aW91cih0aGlzLCB0aW1lLCBpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJ1bnMgdGhlIGludGVncmF0aW9uIGFsZ29yaXRobSBvbiB0aGUgZW1pdHRlciBhbmQgYWxsIHBhcnRpY2xlcy5cclxuICAgKiBVcGRhdGVzIHRoZSBwYXJ0aWNsZXMgd2l0aCB0aGUgdGltc3RhbXAgcGFzc2VkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWUgLSBTeXN0ZW0gZW5naW5lIHRpbWVcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBpbnRlZ3JhdGUodGltZSkge1xyXG4gICAgY29uc3QgaW50ZWdyYXRpb25UeXBlID0gdGhpcy5wYXJlbnRcclxuICAgICAgPyB0aGlzLnBhcmVudC5pbnRlZ3JhdGlvblR5cGVcclxuICAgICAgOiBJTlRFR1JBVElPTl9UWVBFX0VVTEVSO1xyXG4gICAgY29uc3QgZGFtcGluZyA9IDEgLSB0aGlzLmRhbXBpbmc7XHJcblxyXG4gICAgaW50ZWdyYXRlKHRoaXMsIHRpbWUsIGRhbXBpbmcsIGludGVncmF0aW9uVHlwZSk7XHJcblxyXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJ0aWNsZXMubGVuZ3RoO1xyXG5cclxuICAgIHdoaWxlIChpbmRleC0tKSB7XHJcbiAgICAgIGNvbnN0IHBhcnRpY2xlID0gdGhpcy5wYXJ0aWNsZXNbaW5kZXhdO1xyXG5cclxuICAgICAgcGFydGljbGUudXBkYXRlKHRpbWUsIGluZGV4KTtcclxuICAgICAgaW50ZWdyYXRlKHBhcnRpY2xlLCB0aW1lLCBkYW1waW5nLCBpbnRlZ3JhdGlvblR5cGUpO1xyXG5cclxuICAgICAgdGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuZGlzcGF0Y2goUEFSVElDTEVfVVBEQVRFLCBwYXJ0aWNsZSk7XHJcbiAgICAgIHRoaXMuYmluZEVtaXR0ZXJFdmVudCAmJiB0aGlzLmRpc3BhdGNoKFBBUlRJQ0xFX1VQREFURSwgcGFydGljbGUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2VuZXJhdGVzIG5ldyBwYXJ0aWNsZXMuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge251bWJlcn0gdGltZSAtIFN5c3RlbSBlbmdpbmUgdGltZVxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGdlbmVyYXRlKHRpbWUpIHtcclxuICAgIGlmICh0aGlzLnRvdGFsRW1pdFRpbWVzID09PSAxKSB7XHJcbiAgICAgIGxldCBpID0gdGhpcy5yYXRlLmdldFZhbHVlKDk5OTk5KTtcclxuXHJcbiAgICAgIGlmIChpID4gMCkge1xyXG4gICAgICAgIHRoaXMuY0lEID0gaTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRlUGFydGljbGUoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy50b3RhbEVtaXRUaW1lcyA9IDA7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jdXJyZW50RW1pdFRpbWUgKz0gdGltZTtcclxuXHJcbiAgICBpZiAodGhpcy5jdXJyZW50RW1pdFRpbWUgPCB0aGlzLnRvdGFsRW1pdFRpbWVzKSB7XHJcbiAgICAgIGxldCBpID0gdGhpcy5yYXRlLmdldFZhbHVlKHRpbWUpO1xyXG5cclxuICAgICAgaWYgKGkgPiAwKSB7XHJcbiAgICAgICAgdGhpcy5jSUQgPSBpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3aGlsZSAoaS0tKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVQYXJ0aWNsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBLaWxscyB0aGUgZW1pdHRlci5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLmRlYWQgPSB0cnVlO1xyXG4gICAgdGhpcy5lbmVyZ3kgPSAwO1xyXG4gICAgdGhpcy50b3RhbEVtaXRUaW1lcyA9IC0xO1xyXG5cclxuICAgIGlmICh0aGlzLnBhcnRpY2xlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICB0aGlzLmlzRW1pdHRpbmcgPSBmYWxzZTtcclxuICAgICAgdGhpcy5yZW1vdmVBbGxJbml0aWFsaXplcnMoKTtcclxuICAgICAgdGhpcy5yZW1vdmVBbGxCZWhhdmlvdXJzKCk7XHJcbiAgICAgIHRoaXMuZGlzcGF0Y2goYCR7dGhpcy5pZH1fJHtFTUlUVEVSX0RFQUR9YCk7XHJcblxyXG4gICAgICB0aGlzLnBhcmVudCAmJiB0aGlzLnBhcmVudC5yZW1vdmVFbWl0dGVyKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=