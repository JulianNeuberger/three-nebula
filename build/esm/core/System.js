import EventDispatcher, { EMITTER_ADDED, EMITTER_REMOVED, SYSTEM_UPDATE, SYSTEM_UPDATE_AFTER } from '../events';
import { DEFAULT_SYSTEM_DELTA } from './constants';
import Emitter from '../emitter/Emitter';
import { INTEGRATION_TYPE_EULER } from '../math/constants';
import { POOL_MAX } from '../constants';
import Pool from './Pool';
import fromJSON from './fromJSON';
import fromJSONAsync from './fromJSONAsync';
import { CORE_TYPE_SYSTEM as type } from './types';
/**
 * The core of the three-system particle engine.
 * A System instance can contain multiple emitters, each with their own initializers
 * and behaviours.
 *
 */

export default class System {
  /**
   * Constructs a System instance.
   *
   * @param {object} THREE - ThreeJs
   * @param {number} [preParticles=POOL_MAX] - The number of particles to start with
   * @param {string} [integrationType=INTEGRATION_TYPE_EULER] - The integration type to use
   * @return void
   */
  constructor(preParticles = POOL_MAX, integrationType = INTEGRATION_TYPE_EULER) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
    /**
     * @desc Determines if the system can update or not. Set to false when destroying
     * to ensure that external calls to update do not throw errors.
     * @type {boolean}
     */

    this.canUpdate = true;
    /**
     * @desc The number of particles to start with.
     * @type {number}
     */

    this.preParticles = preParticles;
    /**
     * @desc The integration algorithm type to use.
     * @param {string}
     */

    this.integrationType = integrationType;
    /**
     * @desc The emitters in the particle system.
     * @type {array<Emitter>}
     */

    this.emitters = [];
    /**
     * @desc The renderers for the system.
     * @type {array<Renderer>}
     */

    this.renderers = [];
    /**
     * @desc A pool used to manage the internal system cache of objects
     * @type {Pool}
     */

    this.pool = new Pool();
    /**
     * @desc Internal event dispatcher
     * @type {EventDispatcher}
     */

    this.eventDispatcher = new EventDispatcher();
  }
  /**
   * Creates a System instance from a JSON object.
   *
   * @param {object} json - The JSON to create the System instance from
   * @param {object} THREE - The Web GL Api to use eg., THREE
   * @return {System}
   *
   * @deprecated use fromJSONAsync instead
   */


  static fromJSON(json, THREE) {
    return fromJSON(json, THREE, System, Emitter);
  }
  /**
   * Loads a System instance from JSON asynchronously. Ensures all textures are
   * fully loaded before resolving with the instantiated System instance.
   *
   * @param {object} json - The JSON to create the System instance from
   * @param {object} THREE - The Web GL Api to use eg., THREE
   * @param {?object} options - Optional config options
   * @return {Promise<System>}
   */


  static fromJSONAsync(json, THREE, options) {
    return fromJSONAsync(json, THREE, System, Emitter, options);
  }
  /**
   * Proxy method for the internal event dispatcher's dispatchEvent method.
   *
   * @param {string} event - The event to dispatch
   * @param {object<System|Emitter|Particle>} [target=this] - The event target
   */


  dispatch(event, target = this) {
    this.eventDispatcher.dispatchEvent(event, target);
  }
  /**
   * Adds a renderer to the System instance and initializes it.
   *
   * @param {Renderer} renderer - The renderer to add
   * @return {System}
   */


  addRenderer(renderer) {
    this.renderers.push(renderer);
    renderer.init(this);
    return this;
  }
  /**
   * Removes a renderer from the System instance.
   *
   * @param {Renderer} renderer
   * @return {System}
   */


  removeRenderer(renderer) {
    this.renderers.splice(this.renderers.indexOf(renderer), 1);
    renderer.remove(this);
    return this;
  }
  /**
   * Adds an emitter to the System instance.
   * Dispatches the EMITTER_ADDED event.
   *
   * @param {Emitter} emitter - The emitter to add
   * @return {System}
   */


  addEmitter(emitter) {
    const index = this.emitters.length;
    emitter.parent = this;
    emitter.index = index;
    this.emitters.push(emitter);
    this.dispatch(EMITTER_ADDED, emitter);
    return this;
  }
  /**
   * Removes an emitter from the System instance.
   * Dispatches the EMITTER_REMOVED event.
   *
   * @param {Emitter} emitter - The emitter to remove
   * @return {System}
   */


  removeEmitter(emitter) {
    if (emitter.parent !== this) {
      return this;
    }

    emitter.parent = null;
    emitter.index = undefined;
    this.emitters.splice(this.emitters.indexOf(emitter), 1);
    this.dispatch(EMITTER_REMOVED, emitter);
    return this;
  }
  /**
   * Wires up life cycle methods and causes a system's emitters to emit particles.
   * Expects emitters to have their totalEmitTimes and life set already.
   * Inifnite systems will resolve immediately.
   *
   * @param {object} hooks - Functions to hook into the life cycle API
   * @param {function} hooks.onStart - Called when the system starts to emit particles
   * @param {function} hooks.onUpdate - Called each time the system updates
   * @param {function} hooks.onEnd - Called when the system's emitters have all died
   * @return {Promise}
   */


  emit({
    onStart,
    onUpdate,
    onEnd
  }) {
    if (onStart) {
      onStart();
    }

    if (onUpdate) {
      this.eventDispatcher.addEventListener(SYSTEM_UPDATE, onUpdate);
    }

    const emitters = this.emitters.map(emitter => {
      const {
        life
      } = emitter;

      if (life === Infinity) {
        if (onEnd) {
          onEnd();
        }

        emitter.experimental_emit();
        return Promise.resolve();
      }

      return new Promise(resolve => {
        emitter.addOnEmitterDeadEventListener(() => {
          if (onEnd) {
            onEnd();
          }

          resolve();
        });
        emitter.experimental_emit();
      });
    });

    try {
      return Promise.all(emitters);
    } catch (e) {
      console.warn(e);
    }
  }
  /**
   * Updates the particle system based on the delta passed.
   *
   * @example
   * animate = () => {
   *   threeRenderer.render(threeScene, threeCamera);
   *   system.update();
   *   requestAnimationFrame(animate);
   * }
   * animate();
   *
   * @param {number} delta - Delta time
   * @return {Promise}
   */


  update(delta = DEFAULT_SYSTEM_DELTA) {
    const d = delta || DEFAULT_SYSTEM_DELTA;

    if (this.canUpdate) {
      if (d > 0) {
        let i = this.emitters.length;

        while (i--) {
          const emitter = this.emitters[i];
          emitter.update(d);
          emitter.particles.length && this.dispatch(SYSTEM_UPDATE);
        }
      }

      this.dispatch(SYSTEM_UPDATE_AFTER);
    }

    return Promise.resolve();
  }
  /**
   * Gets a count of the total number of particles in the system.
   *
   * @return {integer}
   */


  getCount() {
    const length = this.emitters.length;
    let total = 0;
    let i;

    for (i = 0; i < length; i++) {
      total += this.emitters[i].particles.length;
    }

    return total;
  }
  /**
   * Destroys all emitters, renderers and the Nebula pool.
   * Ensures that this.update will not perform any operations while the system
   * is being destroyed.
   *
   * @return void
   */


  destroy() {
    const length = this.emitters.length;
    this.canUpdate = false;

    for (let e = 0; e < length; e++) {
      this.emitters[e] && this.emitters[e].destroy();
      delete this.emitters[e];
    }

    for (let r = 0; r < length; r++) {
      if (this.renderers[r] && this.renderers[r].destroy) {
        this.renderers[r].destroy();
        delete this.renderers[r];
      }
    }

    this.emitters.length = 0;
    this.pool.destroy();
    this.canUpdate = true;
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL1N5c3RlbS5qcyJdLCJuYW1lcyI6WyJFdmVudERpc3BhdGNoZXIiLCJFTUlUVEVSX0FEREVEIiwiRU1JVFRFUl9SRU1PVkVEIiwiU1lTVEVNX1VQREFURSIsIlNZU1RFTV9VUERBVEVfQUZURVIiLCJERUZBVUxUX1NZU1RFTV9ERUxUQSIsIkVtaXR0ZXIiLCJJTlRFR1JBVElPTl9UWVBFX0VVTEVSIiwiUE9PTF9NQVgiLCJQb29sIiwiZnJvbUpTT04iLCJmcm9tSlNPTkFzeW5jIiwiQ09SRV9UWVBFX1NZU1RFTSIsInR5cGUiLCJTeXN0ZW0iLCJjb25zdHJ1Y3RvciIsInByZVBhcnRpY2xlcyIsImludGVncmF0aW9uVHlwZSIsImNhblVwZGF0ZSIsImVtaXR0ZXJzIiwicmVuZGVyZXJzIiwicG9vbCIsImV2ZW50RGlzcGF0Y2hlciIsImpzb24iLCJUSFJFRSIsIm9wdGlvbnMiLCJkaXNwYXRjaCIsImV2ZW50IiwidGFyZ2V0IiwiZGlzcGF0Y2hFdmVudCIsImFkZFJlbmRlcmVyIiwicmVuZGVyZXIiLCJwdXNoIiwiaW5pdCIsInJlbW92ZVJlbmRlcmVyIiwic3BsaWNlIiwiaW5kZXhPZiIsInJlbW92ZSIsImFkZEVtaXR0ZXIiLCJlbWl0dGVyIiwiaW5kZXgiLCJsZW5ndGgiLCJwYXJlbnQiLCJyZW1vdmVFbWl0dGVyIiwidW5kZWZpbmVkIiwiZW1pdCIsIm9uU3RhcnQiLCJvblVwZGF0ZSIsIm9uRW5kIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm1hcCIsImxpZmUiLCJJbmZpbml0eSIsImV4cGVyaW1lbnRhbF9lbWl0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJhZGRPbkVtaXR0ZXJEZWFkRXZlbnRMaXN0ZW5lciIsImFsbCIsImUiLCJjb25zb2xlIiwid2FybiIsInVwZGF0ZSIsImRlbHRhIiwiZCIsImkiLCJwYXJ0aWNsZXMiLCJnZXRDb3VudCIsInRvdGFsIiwiZGVzdHJveSIsInIiXSwibWFwcGluZ3MiOiJBQUFBLE9BQU9B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QUFLakQsUUFBTCxDQUFjdUMsQ0FBZCxDQUFQO0FBQ0Q7O0FBRUQsU0FBSyxJQUFJVyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHNUIsTUFBcEIsRUFBNEI0QixDQUFDLEVBQTdCLEVBQWlDO0FBQy9CLFVBQUksS0FBS2pELFNBQUwsQ0FBZWlELENBQWYsS0FBcUIsS0FBS2pELFNBQUwsQ0FBZWlELENBQWYsRUFBa0JELE9BQTNDLEVBQW9EO0FBQ2xELGFBQUtoRCxTQUFMLENBQWVpRCxDQUFmLEVBQWtCRCxPQUFsQjtBQUNBLGVBQU8sS0FBS2hELFNBQUwsQ0FBZWlELENBQWYsQ0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBS2xELFFBQUwsQ0FBY3NCLE1BQWQsR0FBdUIsQ0FBdkI7QUFDQSxTQUFLcEIsSUFBTCxDQUFVK0MsT0FBVjtBQUNBLFNBQUtsRCxTQUFMLEdBQWlCLElBQWpCO0FBQ0Q7O0FBM1N5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudERpc3BhdGNoZXIsIHtcclxuICBFTUlUVEVSX0FEREVELFxyXG4gIEVNSVRURVJfUkVNT1ZFRCxcclxuICBTWVNURU1fVVBEQVRFLFxyXG4gIFNZU1RFTV9VUERBVEVfQUZURVIsXHJcbn0gZnJvbSAnLi4vZXZlbnRzJztcclxuXHJcbmltcG9ydCB7IERFRkFVTFRfU1lTVEVNX0RFTFRBIH0gZnJvbSAnLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgRW1pdHRlciBmcm9tICcuLi9lbWl0dGVyL0VtaXR0ZXInO1xyXG5pbXBvcnQgeyBJTlRFR1JBVElPTl9UWVBFX0VVTEVSIH0gZnJvbSAnLi4vbWF0aC9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBQT09MX01BWCB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCBQb29sIGZyb20gJy4vUG9vbCc7XHJcbmltcG9ydCBmcm9tSlNPTiBmcm9tICcuL2Zyb21KU09OJztcclxuaW1wb3J0IGZyb21KU09OQXN5bmMgZnJvbSAnLi9mcm9tSlNPTkFzeW5jJztcclxuaW1wb3J0IHsgQ09SRV9UWVBFX1NZU1RFTSBhcyB0eXBlIH0gZnJvbSAnLi90eXBlcyc7XHJcblxyXG4vKipcclxuICogVGhlIGNvcmUgb2YgdGhlIHRocmVlLXN5c3RlbSBwYXJ0aWNsZSBlbmdpbmUuXHJcbiAqIEEgU3lzdGVtIGluc3RhbmNlIGNhbiBjb250YWluIG11bHRpcGxlIGVtaXR0ZXJzLCBlYWNoIHdpdGggdGhlaXIgb3duIGluaXRpYWxpemVyc1xyXG4gKiBhbmQgYmVoYXZpb3Vycy5cclxuICpcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN5c3RlbSB7XHJcbiAgLyoqXHJcbiAgICogQ29uc3RydWN0cyBhIFN5c3RlbSBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRocmVlSnNcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3ByZVBhcnRpY2xlcz1QT09MX01BWF0gLSBUaGUgbnVtYmVyIG9mIHBhcnRpY2xlcyB0byBzdGFydCB3aXRoXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IFtpbnRlZ3JhdGlvblR5cGU9SU5URUdSQVRJT05fVFlQRV9FVUxFUl0gLSBUaGUgaW50ZWdyYXRpb24gdHlwZSB0byB1c2VcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByZVBhcnRpY2xlcyA9IFBPT0xfTUFYLFxyXG4gICAgaW50ZWdyYXRpb25UeXBlID0gSU5URUdSQVRJT05fVFlQRV9FVUxFUlxyXG4gICkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgY2xhc3MgdHlwZS5cclxuICAgICAqIEB0eXBlIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBEZXRlcm1pbmVzIGlmIHRoZSBzeXN0ZW0gY2FuIHVwZGF0ZSBvciBub3QuIFNldCB0byBmYWxzZSB3aGVuIGRlc3Ryb3lpbmdcclxuICAgICAqIHRvIGVuc3VyZSB0aGF0IGV4dGVybmFsIGNhbGxzIHRvIHVwZGF0ZSBkbyBub3QgdGhyb3cgZXJyb3JzLlxyXG4gICAgICogQHR5cGUge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuY2FuVXBkYXRlID0gdHJ1ZTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBudW1iZXIgb2YgcGFydGljbGVzIHRvIHN0YXJ0IHdpdGguXHJcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnByZVBhcnRpY2xlcyA9IHByZVBhcnRpY2xlcztcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIFRoZSBpbnRlZ3JhdGlvbiBhbGdvcml0aG0gdHlwZSB0byB1c2UuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ31cclxuICAgICAqL1xyXG4gICAgdGhpcy5pbnRlZ3JhdGlvblR5cGUgPSBpbnRlZ3JhdGlvblR5cGU7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBUaGUgZW1pdHRlcnMgaW4gdGhlIHBhcnRpY2xlIHN5c3RlbS5cclxuICAgICAqIEB0eXBlIHthcnJheTxFbWl0dGVyPn1cclxuICAgICAqL1xyXG4gICAgdGhpcy5lbWl0dGVycyA9IFtdO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIHJlbmRlcmVycyBmb3IgdGhlIHN5c3RlbS5cclxuICAgICAqIEB0eXBlIHthcnJheTxSZW5kZXJlcj59XHJcbiAgICAgKi9cclxuICAgIHRoaXMucmVuZGVyZXJzID0gW107XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzYyBBIHBvb2wgdXNlZCB0byBtYW5hZ2UgdGhlIGludGVybmFsIHN5c3RlbSBjYWNoZSBvZiBvYmplY3RzXHJcbiAgICAgKiBAdHlwZSB7UG9vbH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5wb29sID0gbmV3IFBvb2woKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXNjIEludGVybmFsIGV2ZW50IGRpc3BhdGNoZXJcclxuICAgICAqIEB0eXBlIHtFdmVudERpc3BhdGNoZXJ9XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyID0gbmV3IEV2ZW50RGlzcGF0Y2hlcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIFN5c3RlbSBpbnN0YW5jZSBmcm9tIGEgSlNPTiBvYmplY3QuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge29iamVjdH0ganNvbiAtIFRoZSBKU09OIHRvIGNyZWF0ZSB0aGUgU3lzdGVtIGluc3RhbmNlIGZyb21cclxuICAgKiBAcGFyYW0ge29iamVjdH0gVEhSRUUgLSBUaGUgV2ViIEdMIEFwaSB0byB1c2UgZWcuLCBUSFJFRVxyXG4gICAqIEByZXR1cm4ge1N5c3RlbX1cclxuICAgKlxyXG4gICAqIEBkZXByZWNhdGVkIHVzZSBmcm9tSlNPTkFzeW5jIGluc3RlYWRcclxuICAgKi9cclxuICBzdGF0aWMgZnJvbUpTT04oanNvbiwgVEhSRUUpIHtcclxuICAgIHJldHVybiBmcm9tSlNPTihqc29uLCBUSFJFRSwgU3lzdGVtLCBFbWl0dGVyKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIExvYWRzIGEgU3lzdGVtIGluc3RhbmNlIGZyb20gSlNPTiBhc3luY2hyb25vdXNseS4gRW5zdXJlcyBhbGwgdGV4dHVyZXMgYXJlXHJcbiAgICogZnVsbHkgbG9hZGVkIGJlZm9yZSByZXNvbHZpbmcgd2l0aCB0aGUgaW5zdGFudGlhdGVkIFN5c3RlbSBpbnN0YW5jZS5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBqc29uIC0gVGhlIEpTT04gdG8gY3JlYXRlIHRoZSBTeXN0ZW0gaW5zdGFuY2UgZnJvbVxyXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBUSFJFRSAtIFRoZSBXZWIgR0wgQXBpIHRvIHVzZSBlZy4sIFRIUkVFXHJcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9uYWwgY29uZmlnIG9wdGlvbnNcclxuICAgKiBAcmV0dXJuIHtQcm9taXNlPFN5c3RlbT59XHJcbiAgICovXHJcbiAgc3RhdGljIGZyb21KU09OQXN5bmMoanNvbiwgVEhSRUUsIG9wdGlvbnMpIHtcclxuICAgIHJldHVybiBmcm9tSlNPTkFzeW5jKGpzb24sIFRIUkVFLCBTeXN0ZW0sIEVtaXR0ZXIsIG9wdGlvbnMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJveHkgbWV0aG9kIGZvciB0aGUgaW50ZXJuYWwgZXZlbnQgZGlzcGF0Y2hlcidzIGRpc3BhdGNoRXZlbnQgbWV0aG9kLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50IC0gVGhlIGV2ZW50IHRvIGRpc3BhdGNoXHJcbiAgICogQHBhcmFtIHtvYmplY3Q8U3lzdGVtfEVtaXR0ZXJ8UGFydGljbGU+fSBbdGFyZ2V0PXRoaXNdIC0gVGhlIGV2ZW50IHRhcmdldFxyXG4gICAqL1xyXG4gIGRpc3BhdGNoKGV2ZW50LCB0YXJnZXQgPSB0aGlzKSB7XHJcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5kaXNwYXRjaEV2ZW50KGV2ZW50LCB0YXJnZXQpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkcyBhIHJlbmRlcmVyIHRvIHRoZSBTeXN0ZW0gaW5zdGFuY2UgYW5kIGluaXRpYWxpemVzIGl0LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyZXIgLSBUaGUgcmVuZGVyZXIgdG8gYWRkXHJcbiAgICogQHJldHVybiB7U3lzdGVtfVxyXG4gICAqL1xyXG4gIGFkZFJlbmRlcmVyKHJlbmRlcmVyKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVycy5wdXNoKHJlbmRlcmVyKTtcclxuICAgIHJlbmRlcmVyLmluaXQodGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIGEgcmVuZGVyZXIgZnJvbSB0aGUgU3lzdGVtIGluc3RhbmNlLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtSZW5kZXJlcn0gcmVuZGVyZXJcclxuICAgKiBAcmV0dXJuIHtTeXN0ZW19XHJcbiAgICovXHJcbiAgcmVtb3ZlUmVuZGVyZXIocmVuZGVyZXIpIHtcclxuICAgIHRoaXMucmVuZGVyZXJzLnNwbGljZSh0aGlzLnJlbmRlcmVycy5pbmRleE9mKHJlbmRlcmVyKSwgMSk7XHJcbiAgICByZW5kZXJlci5yZW1vdmUodGhpcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIGFuIGVtaXR0ZXIgdG8gdGhlIFN5c3RlbSBpbnN0YW5jZS5cclxuICAgKiBEaXNwYXRjaGVzIHRoZSBFTUlUVEVSX0FEREVEIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyIC0gVGhlIGVtaXR0ZXIgdG8gYWRkXHJcbiAgICogQHJldHVybiB7U3lzdGVtfVxyXG4gICAqL1xyXG4gIGFkZEVtaXR0ZXIoZW1pdHRlcikge1xyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcclxuXHJcbiAgICBlbWl0dGVyLnBhcmVudCA9IHRoaXM7XHJcbiAgICBlbWl0dGVyLmluZGV4ID0gaW5kZXg7XHJcblxyXG4gICAgdGhpcy5lbWl0dGVycy5wdXNoKGVtaXR0ZXIpO1xyXG4gICAgdGhpcy5kaXNwYXRjaChFTUlUVEVSX0FEREVELCBlbWl0dGVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgYW4gZW1pdHRlciBmcm9tIHRoZSBTeXN0ZW0gaW5zdGFuY2UuXHJcbiAgICogRGlzcGF0Y2hlcyB0aGUgRU1JVFRFUl9SRU1PVkVEIGV2ZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtFbWl0dGVyfSBlbWl0dGVyIC0gVGhlIGVtaXR0ZXIgdG8gcmVtb3ZlXHJcbiAgICogQHJldHVybiB7U3lzdGVtfVxyXG4gICAqL1xyXG4gIHJlbW92ZUVtaXR0ZXIoZW1pdHRlcikge1xyXG4gICAgaWYgKGVtaXR0ZXIucGFyZW50ICE9PSB0aGlzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIGVtaXR0ZXIucGFyZW50ID0gbnVsbDtcclxuICAgIGVtaXR0ZXIuaW5kZXggPSB1bmRlZmluZWQ7XHJcblxyXG4gICAgdGhpcy5lbWl0dGVycy5zcGxpY2UodGhpcy5lbWl0dGVycy5pbmRleE9mKGVtaXR0ZXIpLCAxKTtcclxuICAgIHRoaXMuZGlzcGF0Y2goRU1JVFRFUl9SRU1PVkVELCBlbWl0dGVyKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdpcmVzIHVwIGxpZmUgY3ljbGUgbWV0aG9kcyBhbmQgY2F1c2VzIGEgc3lzdGVtJ3MgZW1pdHRlcnMgdG8gZW1pdCBwYXJ0aWNsZXMuXHJcbiAgICogRXhwZWN0cyBlbWl0dGVycyB0byBoYXZlIHRoZWlyIHRvdGFsRW1pdFRpbWVzIGFuZCBsaWZlIHNldCBhbHJlYWR5LlxyXG4gICAqIEluaWZuaXRlIHN5c3RlbXMgd2lsbCByZXNvbHZlIGltbWVkaWF0ZWx5LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIHtvYmplY3R9IGhvb2tzIC0gRnVuY3Rpb25zIHRvIGhvb2sgaW50byB0aGUgbGlmZSBjeWNsZSBBUElcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBob29rcy5vblN0YXJ0IC0gQ2FsbGVkIHdoZW4gdGhlIHN5c3RlbSBzdGFydHMgdG8gZW1pdCBwYXJ0aWNsZXNcclxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBob29rcy5vblVwZGF0ZSAtIENhbGxlZCBlYWNoIHRpbWUgdGhlIHN5c3RlbSB1cGRhdGVzXHJcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gaG9va3Mub25FbmQgLSBDYWxsZWQgd2hlbiB0aGUgc3lzdGVtJ3MgZW1pdHRlcnMgaGF2ZSBhbGwgZGllZFxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICovXHJcbiAgZW1pdCh7IG9uU3RhcnQsIG9uVXBkYXRlLCBvbkVuZCB9KSB7XHJcbiAgICBpZiAob25TdGFydCkge1xyXG4gICAgICBvblN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9uVXBkYXRlKSB7XHJcbiAgICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoU1lTVEVNX1VQREFURSwgb25VcGRhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGVtaXR0ZXJzID0gdGhpcy5lbWl0dGVycy5tYXAoZW1pdHRlciA9PiB7XHJcbiAgICAgIGNvbnN0IHsgbGlmZSB9ID0gZW1pdHRlcjtcclxuXHJcbiAgICAgIGlmIChsaWZlID09PSBJbmZpbml0eSkge1xyXG4gICAgICAgIGlmIChvbkVuZCkge1xyXG4gICAgICAgICAgb25FbmQoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVtaXR0ZXIuZXhwZXJpbWVudGFsX2VtaXQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XHJcbiAgICAgICAgZW1pdHRlci5hZGRPbkVtaXR0ZXJEZWFkRXZlbnRMaXN0ZW5lcigoKSA9PiB7XHJcbiAgICAgICAgICBpZiAob25FbmQpIHtcclxuICAgICAgICAgICAgb25FbmQoKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVtaXR0ZXIuZXhwZXJpbWVudGFsX2VtaXQoKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoZW1pdHRlcnMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBVcGRhdGVzIHRoZSBwYXJ0aWNsZSBzeXN0ZW0gYmFzZWQgb24gdGhlIGRlbHRhIHBhc3NlZC5cclxuICAgKlxyXG4gICAqIEBleGFtcGxlXHJcbiAgICogYW5pbWF0ZSA9ICgpID0+IHtcclxuICAgKiAgIHRocmVlUmVuZGVyZXIucmVuZGVyKHRocmVlU2NlbmUsIHRocmVlQ2FtZXJhKTtcclxuICAgKiAgIHN5c3RlbS51cGRhdGUoKTtcclxuICAgKiAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcclxuICAgKiB9XHJcbiAgICogYW5pbWF0ZSgpO1xyXG4gICAqXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGRlbHRhIC0gRGVsdGEgdGltZVxyXG4gICAqIEByZXR1cm4ge1Byb21pc2V9XHJcbiAgICovXHJcbiAgdXBkYXRlKGRlbHRhID0gREVGQVVMVF9TWVNURU1fREVMVEEpIHtcclxuICAgIGNvbnN0IGQgPSBkZWx0YSB8fCBERUZBVUxUX1NZU1RFTV9ERUxUQTtcclxuXHJcbiAgICBpZiAodGhpcy5jYW5VcGRhdGUpIHtcclxuICAgICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgICAgbGV0IGkgPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcclxuXHJcbiAgICAgICAgd2hpbGUgKGktLSkge1xyXG4gICAgICAgICAgY29uc3QgZW1pdHRlciA9IHRoaXMuZW1pdHRlcnNbaV07XHJcblxyXG4gICAgICAgICAgZW1pdHRlci51cGRhdGUoZCk7XHJcbiAgICAgICAgICBlbWl0dGVyLnBhcnRpY2xlcy5sZW5ndGggJiYgdGhpcy5kaXNwYXRjaChTWVNURU1fVVBEQVRFKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZGlzcGF0Y2goU1lTVEVNX1VQREFURV9BRlRFUik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0cyBhIGNvdW50IG9mIHRoZSB0b3RhbCBudW1iZXIgb2YgcGFydGljbGVzIGluIHRoZSBzeXN0ZW0uXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHtpbnRlZ2VyfVxyXG4gICAqL1xyXG4gIGdldENvdW50KCkge1xyXG4gICAgY29uc3QgbGVuZ3RoID0gdGhpcy5lbWl0dGVycy5sZW5ndGg7XHJcblxyXG4gICAgbGV0IHRvdGFsID0gMDtcclxuXHJcbiAgICBsZXQgaTtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgdG90YWwgKz0gdGhpcy5lbWl0dGVyc1tpXS5wYXJ0aWNsZXMubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0b3RhbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERlc3Ryb3lzIGFsbCBlbWl0dGVycywgcmVuZGVyZXJzIGFuZCB0aGUgTmVidWxhIHBvb2wuXHJcbiAgICogRW5zdXJlcyB0aGF0IHRoaXMudXBkYXRlIHdpbGwgbm90IHBlcmZvcm0gYW55IG9wZXJhdGlvbnMgd2hpbGUgdGhlIHN5c3RlbVxyXG4gICAqIGlzIGJlaW5nIGRlc3Ryb3llZC5cclxuICAgKlxyXG4gICAqIEByZXR1cm4gdm9pZFxyXG4gICAqL1xyXG4gIGRlc3Ryb3koKSB7XHJcbiAgICBjb25zdCBsZW5ndGggPSB0aGlzLmVtaXR0ZXJzLmxlbmd0aDtcclxuXHJcbiAgICB0aGlzLmNhblVwZGF0ZSA9IGZhbHNlO1xyXG5cclxuICAgIGZvciAobGV0IGUgPSAwOyBlIDwgbGVuZ3RoOyBlKyspIHtcclxuICAgICAgdGhpcy5lbWl0dGVyc1tlXSAmJiB0aGlzLmVtaXR0ZXJzW2VdLmRlc3Ryb3koKTtcclxuICAgICAgZGVsZXRlIHRoaXMuZW1pdHRlcnNbZV07XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBsZW5ndGg7IHIrKykge1xyXG4gICAgICBpZiAodGhpcy5yZW5kZXJlcnNbcl0gJiYgdGhpcy5yZW5kZXJlcnNbcl0uZGVzdHJveSkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXJzW3JdLmRlc3Ryb3koKTtcclxuICAgICAgICBkZWxldGUgdGhpcy5yZW5kZXJlcnNbcl07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmVtaXR0ZXJzLmxlbmd0aCA9IDA7XHJcbiAgICB0aGlzLnBvb2wuZGVzdHJveSgpO1xyXG4gICAgdGhpcy5jYW5VcGRhdGUgPSB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=