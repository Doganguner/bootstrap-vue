import Vue, { mergeData } from '../../vue'
import { NAME_NAVBAR_BRAND } from '../../constants/components'
import { makePropsConfigurable } from '../../utils/config'
import { omit } from '../../utils/object'
import { pluckProps } from '../../utils/props'
import { BLink, props as BLinkProps } from '../link/link'

// --- Props ---

const linkProps = omit(BLinkProps, ['event', 'routerTag'])
linkProps.href.default = undefined
linkProps.to.default = undefined

export const props = makePropsConfigurable(
  {
    tag: {
      type: String,
      default: 'div'
    },
    ...linkProps
  },
  NAME_NAVBAR_BRAND
)

// --- Main component ---
// @vue/component
export const BNavbarBrand = /*#__PURE__*/ Vue.extend({
  name: NAME_NAVBAR_BRAND,
  functional: true,
  props,
  render(h, { props, data, children }) {
    const isLink = props.to || props.href
    const tag = isLink ? BLink : props.tag

    return h(
      tag,
      mergeData(data, {
        staticClass: 'navbar-brand',
        props: isLink ? pluckProps(linkProps, props) : {}
      }),
      children
    )
  }
})
