import type { App, Plugin } from 'vue'

import './assets/scss/style.scss'

import * as Components from './components'
import * as Directives from './directives/Exports'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RAlert: typeof Components.RAlert
    RBadge: typeof Components.RBadge
    RButton: typeof Components.RButton
    RCard: typeof Components.RCard
    RCardBody: typeof Components.RCardBody
    RCardFooter: typeof Components.RCardFooter
    RCardGroup: typeof Components.RCardGroup
    RCardHeader: typeof Components.RCardHeader
    RCardImg: typeof Components.RCardImg
    RCardSubtitle: typeof Components.RCardSubtitle
    RCardText: typeof Components.RCardText
    RCardTitle: typeof Components.RCardTitle
    RCollapse: typeof Components.RCollapse
    RDropdown: typeof Components.RDropdown
    RDropdownDivider: typeof Components.RDropdownDivider
    RDropdownHeader: typeof Components.RDropdownHeader
    RDropdownItem: typeof Components.RDropdownItem
    RDropdownText: typeof Components.RDropdownText
    RFormInput: typeof Components.RFormInput
    RFormSelect: typeof Components.RFormSelect
    RFormSelectOption: typeof Components.RFormSelectOption
    RFormTextarea: typeof Components.RFormTextarea
    RImg: typeof Components.RImg
    RInputGroup: typeof Components.RInputGroup
    RInputGroupAppend: typeof Components.RInputGroupAppend
    RInputGroupPrepend: typeof Components.RInputGroupPrepend
    RInputGroupText: typeof Components.RInputGroupText
    RLink: typeof Components.RLink
    RListGroup: typeof Components.RListGroup
    RListGroupItem: typeof Components.RListGroupItem
    RModal: typeof Components.RModal
    RPagination: typeof Components.RPagination
    // RSidebar: typeof Components.RSidebar
    RTab: typeof Components.RTab
    // RTable: typeof Components.RTable
    RTabs: typeof Components.RTabs
  }

  export interface GlobalDirectives {
    vRTooltip: typeof Directives.vRTooltip
    vRFocus: typeof Directives.vRFocus
    vRFocus: typeof Directives.vRFocus
    vRPopover: typeof Directives.vRPopover
    vRVisible: typeof Directives.vRVisible
    vRToggle: typeof Directives.vRToggle
  }
}

// Main app plugin
const plugin: Plugin = {
  install(app: App) {
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component)
    })

    Object.entries(Directives).forEach(([name, directive]) => {
      app.directive(name, directive)
    })
  }
}

export * from './components'
export * as Components from './components'
export * from './directives/Exports'
export * as Directives from './directives/Exports'

export { plugin as BootstrapVueNext }
export default plugin
