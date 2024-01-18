import { PARTICLE_CREATED, PARTICLE_DEAD, PARTICLE_UPDATE, SYSTEM_UPDATE } from '../events/constants';
import { RENDERER_TYPE_BASE } from './types';
import { __DEV__ } from '../constants';
export default class BaseRenderer {
  constructor(type = RENDERER_TYPE_BASE) {
    /**
     * @desc The class type.
     * @type {string}
     */
    this.type = type;
  }

  init(system) {
    var self = this;
    this.system = system;
    this.system.eventDispatcher.addEventListener(SYSTEM_UPDATE, function (system) {
      self.onSystemUpdate.call(self, system);
    });
    this.system.eventDispatcher.addEventListener(PARTICLE_CREATED, function (particle) {
      self.onParticleCreated.call(self, particle);
    });
    this.system.eventDispatcher.addEventListener(PARTICLE_UPDATE, function (particle) {
      self.onParticleUpdate.call(self, particle);
    });
    this.system.eventDispatcher.addEventListener(PARTICLE_DEAD, function (particle) {
      self.onParticleDead.call(self, particle);
    });
    this.logRendererType();
  }

  remove() {
    this.system = null;
  }
  /**
   * @abstract
   */


  onParticleCreated(particle) {} // eslint-disable-line

  /**
   * @abstract
   */


  onParticleUpdate(particle) {} // eslint-disable-line

  /**
   * @abstract
   */


  onParticleDead(particle) {} // eslint-disable-line

  /**
   * @abstract
   */


  onSystemUpdate(system) {} // eslint-disable-line

  /**
   * Logs the renderer type being used when in development mode.
   *
   * @return void
   */


  logRendererType() {
    if (!__DEV__) {
      return;
    }

    console.log(`${this.type}`);
  }

}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZW5kZXJlci9CYXNlUmVuZGVyZXIuanMiXSwibmFtZXMiOlsiUEFSVElDTEVfQ1JFQVRFRCIsIlBBUlRJQ0xFX0RFQUQiLCJQQVJUSUNMRV9VUERBVEUiLCJTWVNURU1fVVBEQVRFIiwiUkVOREVSRVJfVFlQRV9CQVNFIiwiX19ERVZfXyIsIkJhc2VSZW5kZXJlciIsImNvbnN0cnVjdG9yIiwidHlwZSIsImluaXQiLCJzeXN0ZW0iLCJzZWxmIiwiZXZlbnREaXNwYXRjaGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uU3lzdGVtVXBkYXRlIiwiY2FsbCIsInBhcnRpY2xlIiwib25QYXJ0aWNsZUNyZWF0ZWQiLCJvblBhcnRpY2xlVXBkYXRlIiwib25QYXJ0aWNsZURlYWQiLCJsb2dSZW5kZXJlclR5cGUiLCJyZW1vdmUiLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUNFQSxnQkFERixFQUVFQyxhQUZGLEVBR0VDLGVBSEYsRUFJRUMsYUFKRixRQUtPLHFCQUxQO0FBT0EsU0FBU0Msa0JBQVQsUUFBbUMsU0FBbkM7QUFDQSxTQUFTQyxPQUFULFFBQXdCLGNBQXhCO0FBRUEsZUFBZSxNQUFNQyxZQUFOLENBQW1CO0FBQ2hDQyxFQUFBQSxXQUFXLENBQUNDLElBQUksR0FBR0osa0JBQVIsRUFBNEI7QUFDckM7QUFDSjtBQUNBO0FBQ0E7QUFDSSxTQUFLSSxJQUFMLEdBQVlBLElBQVo7QUFDRDs7QUFFREMsRUFBQUEsSUFBSSxDQUFDQyxNQUFELEVBQVM7QUFDWCxRQUFJQyxJQUFJLEdBQUcsSUFBWDtBQUVBLFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUVBLFNBQUtBLE1BQUwsQ0FBWUUsZUFBWixDQUE0QkMsZ0JBQTVCLENBQTZDVixhQUE3QyxFQUE0RCxVQUMxRE8sTUFEMEQsRUFFMUQ7QUFDQUMsTUFBQUEsSUFBSSxDQUFDRyxjQUFMLENBQW9CQyxJQUFwQixDQUF5QkosSUFBekIsRUFBK0JELE1BQS9CO0FBQ0QsS0FKRDtBQU1BLFNBQUtBLE1BQUwsQ0FBWUUsZUFBWixDQUE0QkMsZ0JBQTVCLENBQTZDYixnQkFBN0MsRUFBK0QsVUFDN0RnQixRQUQ2RCxFQUU3RDtBQUNBTCxNQUFBQSxJQUFJLENBQUNNLGlCQUFMLENBQXVCRixJQUF2QixDQUE0QkosSUFBNUIsRUFBa0NLLFFBQWxDO0FBQ0QsS0FKRDtBQU1BLFNBQUtOLE1BQUwsQ0FBWUUsZUFBWixDQUE0QkMsZ0JBQTVCLENBQTZDWCxlQUE3QyxFQUE4RCxVQUM1RGMsUUFENEQsRUFFNUQ7QUFDQUwsTUFBQUEsSUFBSSxDQUFDTyxnQkFBTCxDQUFzQkgsSUFBdEIsQ0FBMkJKLElBQTNCLEVBQWlDSyxRQUFqQztBQUNELEtBSkQ7QUFNQSxTQUFLTixNQUFMLENBQVlFLGVBQVosQ0FBNEJDLGdCQUE1QixDQUE2Q1osYUFBN0MsRUFBNEQsVUFDMURlLFFBRDBELEVBRTFEO0FBQ0FMLE1BQUFBLElBQUksQ0FBQ1EsY0FBTCxDQUFvQkosSUFBcEIsQ0FBeUJKLElBQXpCLEVBQStCSyxRQUEvQjtBQUNELEtBSkQ7QUFNQSxTQUFLSSxlQUFMO0FBQ0Q7O0FBRURDLEVBQUFBLE1BQU0sR0FBRztBQUNQLFNBQUtYLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7OztBQUNFTyxFQUFBQSxpQkFBaUIsQ0FBQ0QsUUFBRCxFQUFXLENBQUUsQ0FoREUsQ0FnREQ7O0FBRS9CO0FBQ0Y7QUFDQTs7O0FBQ0VFLEVBQUFBLGdCQUFnQixDQUFDRixRQUFELEVBQVcsQ0FBRSxDQXJERyxDQXFERjs7QUFFOUI7QUFDRjtBQUNBOzs7QUFDRUcsRUFBQUEsY0FBYyxDQUFDSCxRQUFELEVBQVcsQ0FBRSxDQTFESyxDQTBESjs7QUFFNUI7QUFDRjtBQUNBOzs7QUFDRUYsRUFBQUEsY0FBYyxDQUFDSixNQUFELEVBQVMsQ0FBRSxDQS9ETyxDQStETjs7QUFFMUI7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0VVLEVBQUFBLGVBQWUsR0FBRztBQUNoQixRQUFJLENBQUNmLE9BQUwsRUFBYztBQUNaO0FBQ0Q7O0FBRURpQixJQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBYSxHQUFFLEtBQUtmLElBQUssRUFBekI7QUFDRDs7QUE1RStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBQQVJUSUNMRV9DUkVBVEVELFxyXG4gIFBBUlRJQ0xFX0RFQUQsXHJcbiAgUEFSVElDTEVfVVBEQVRFLFxyXG4gIFNZU1RFTV9VUERBVEUsXHJcbn0gZnJvbSAnLi4vZXZlbnRzL2NvbnN0YW50cyc7XHJcblxyXG5pbXBvcnQgeyBSRU5ERVJFUl9UWVBFX0JBU0UgfSBmcm9tICcuL3R5cGVzJztcclxuaW1wb3J0IHsgX19ERVZfXyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYXNlUmVuZGVyZXIge1xyXG4gIGNvbnN0cnVjdG9yKHR5cGUgPSBSRU5ERVJFUl9UWVBFX0JBU0UpIHtcclxuICAgIC8qKlxyXG4gICAgICogQGRlc2MgVGhlIGNsYXNzIHR5cGUuXHJcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxyXG4gICAgICovXHJcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xyXG4gIH1cclxuXHJcbiAgaW5pdChzeXN0ZW0pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICB0aGlzLnN5c3RlbSA9IHN5c3RlbTtcclxuXHJcbiAgICB0aGlzLnN5c3RlbS5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihTWVNURU1fVVBEQVRFLCBmdW5jdGlvbihcclxuICAgICAgc3lzdGVtXHJcbiAgICApIHtcclxuICAgICAgc2VsZi5vblN5c3RlbVVwZGF0ZS5jYWxsKHNlbGYsIHN5c3RlbSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN5c3RlbS5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihQQVJUSUNMRV9DUkVBVEVELCBmdW5jdGlvbihcclxuICAgICAgcGFydGljbGVcclxuICAgICkge1xyXG4gICAgICBzZWxmLm9uUGFydGljbGVDcmVhdGVkLmNhbGwoc2VsZiwgcGFydGljbGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zeXN0ZW0uZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoUEFSVElDTEVfVVBEQVRFLCBmdW5jdGlvbihcclxuICAgICAgcGFydGljbGVcclxuICAgICkge1xyXG4gICAgICBzZWxmLm9uUGFydGljbGVVcGRhdGUuY2FsbChzZWxmLCBwYXJ0aWNsZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnN5c3RlbS5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcihQQVJUSUNMRV9ERUFELCBmdW5jdGlvbihcclxuICAgICAgcGFydGljbGVcclxuICAgICkge1xyXG4gICAgICBzZWxmLm9uUGFydGljbGVEZWFkLmNhbGwoc2VsZiwgcGFydGljbGUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5sb2dSZW5kZXJlclR5cGUoKTtcclxuICB9XHJcblxyXG4gIHJlbW92ZSgpIHtcclxuICAgIHRoaXMuc3lzdGVtID0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIG9uUGFydGljbGVDcmVhdGVkKHBhcnRpY2xlKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gIC8qKlxyXG4gICAqIEBhYnN0cmFjdFxyXG4gICAqL1xyXG4gIG9uUGFydGljbGVVcGRhdGUocGFydGljbGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcbiAgLyoqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICovXHJcbiAgb25QYXJ0aWNsZURlYWQocGFydGljbGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuXHJcbiAgLyoqXHJcbiAgICogQGFic3RyYWN0XHJcbiAgICovXHJcbiAgb25TeXN0ZW1VcGRhdGUoc3lzdGVtKSB7fSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcblxyXG4gIC8qKlxyXG4gICAqIExvZ3MgdGhlIHJlbmRlcmVyIHR5cGUgYmVpbmcgdXNlZCB3aGVuIGluIGRldmVsb3BtZW50IG1vZGUuXHJcbiAgICpcclxuICAgKiBAcmV0dXJuIHZvaWRcclxuICAgKi9cclxuICBsb2dSZW5kZXJlclR5cGUoKSB7XHJcbiAgICBpZiAoIV9fREVWX18pIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnNvbGUubG9nKGAke3RoaXMudHlwZX1gKTtcclxuICB9XHJcbn1cclxuIl19