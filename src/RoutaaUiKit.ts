import type { App, Plugin } from 'vue'

import './assets/scss/style.scss'

import * as Components from './components'
// import * as Directives from './directives/exports'
// import { createBreadcrumb } from './composables'
// import { BootstrapVueOptions } from './types'

// Inject all components into the global @vue/runtime-core
// This allows intellisense in templates w/out direct importing
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
}

// Main app plugin
const plugin: Plugin = {
  install(app: App) {
    Object.entries(Components).forEach(([name, component]) => {
      app.component(name, component)
    })

    //     Object.entries(Directives).forEach(([name, component]) => {
    //       app.directive(name, component)
    //     })

    //     createBreadcrumb(app)
  }
}

export * from './components'
export * as Components from './components'
// export * from './directives/exports'
// export * as Directives from './directives/exports'
// export * from './composables/exports'
// export * as Composables from './composables/exports'
// export * from './utils/exports'
// export * as Utils from './utils/exports'
// export * from './types/exports'
// export * as Types from './types/exports'

export { plugin as BootstrapVueNext }
export default plugin
