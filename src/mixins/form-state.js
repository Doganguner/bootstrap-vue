/* Form control contextual state class computation
 *
 * Returned class is either 'is-valid' or 'is-invalid' based on the 'state' prop
 * state can be one of five values:
 *  - true for is-valid
 *  - false for is-invalid
 *  - null for no contextual state
 */
import { isBoolean } from '../utils/inspect'
import { makePropsConfigurable } from '../utils/config'

// --- Props ---

export const props = makePropsConfigurable(
  {
    state: {
      // Tri-state prop: true, false, null (or undefined)
      type: Boolean,
      default: null
    }
  },
  'formState'
)

// --- Mixin ---
// @vue/component
export default {
  props,
  computed: {
    computedState() {
      // If not a boolean, ensure that value is null
      return isBoolean(this.state) ? this.state : null
    },
    stateClass() {
      const state = this.computedState
      return state === true ? 'is-valid' : state === false ? 'is-invalid' : null
    },
    computedAriaInvalid() {
      const { ariaInvalid } = this
      if (ariaInvalid === true || ariaInvalid === 'true' || ariaInvalid === '') {
        return 'true'
      }
      return this.computedState === false ? 'true' : ariaInvalid
    }
  }
}
