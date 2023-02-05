<script setup lang="ts">
import { computed, ref, useSlots, watch, onMounted, provide } from 'vue'
import type { HTMLAttributes } from 'vue'

type TabsProps = {
  modelValue?: number
  activeNavItemClass?: HTMLAttributes['class']
  activeTabClass?: HTMLAttributes['class']
  align?: string
  card?: boolean
  contentClass?: HTMLAttributes['class']
  end?: boolean
  fill?: boolean
  id?: string
  justified?: boolean
  lazy?: boolean
  navClass?: HTMLAttributes['class']
  navWrapperClass?: HTMLAttributes['class']
  noFade?: boolean
  noKeyNav?: boolean
  noNavStyle?: boolean
  pills?: boolean
  small?: boolean
  tag?: string
  vertical?: boolean
}

const tabsProps = withDefaults(defineProps<TabsProps>(), {
  modelValue: -1,
  card: false,
  end: false,
  fill: false,
  justified: false,
  lazy: false,
  noFade: false,
  noKeyNav: false,
  noNavStyle: false,
  pills: false,
  small: false,
  tag: 'div',
  vertical: false
})

const tabsElement = ref<Element | null>(null)

const slots = useSlots()

const tabsClasses = [
  'tabs',
  {
    card: tabsProps.card,
    'd-flex align-items-start': tabsProps.vertical
  }
]

const contentClasses = ['tab-content', tabsProps.contentClass]

const emptyTabClasses = ['tab-pane active', { 'card-body': tabsProps.card }]

const wrapperClasses = [
  tabsProps.navWrapperClass,
  {
    'card-header': tabsProps.card,
    'ms-auto': tabsProps.vertical && tabsProps.end
  }
]

const navTabsClasses = {
  'nav-pills': tabsProps.pills,
  'flex-column me-3': tabsProps.vertical,
  [`${tabsProps.align}`]: tabsProps.align !== undefined,
  'nav-fill': tabsProps.fill,
  'card-header-tabs': tabsProps.card,
  'nav-justified': tabsProps.justified,
  'nav-tabs': !tabsProps.noNavStyle && !tabsProps.pills,
  small: tabsProps.small
}

const navClasses = ['nav', 'nav-tabs', tabsProps.navClass, navTabsClasses]

interface TabsEmits {
  (e: 'update:modelValue', val: number): void
  (e: 'activate-tab', v1: number, v2: number, v3: Element | null): void
  (e: 'click'): void
  (e: 'tabs', val: object[]): void
}

const _tabIndex = ref<number>(tabsProps.modelValue)
const _currentTabButton = ref<string>('')

const emit = defineEmits<TabsEmits>()

const tabIndex = computed({
  get() {
    return _tabIndex.value
  },
  set(value: number) {
    _tabIndex.value = value

    if (tabs.value.length && value >= 0 && value < tabs.value.length)
      _currentTabButton.value = tabs.value[value].buttonId && tabs.value[value].buttonId
    else _currentTabButton.value = ''

    emit('update:modelValue', value)
  }
})

const tabs = computed({
  get() {
    let tabItems: any[] = []

    if (slots.default) {
      tabItems = getTabs(slots).map((tab: any, index) => setTabs(tab, index))
    }

    return tabItems
  },
  set(val) {
    emit('tabs', val)
  }
})

const showEmpty = computed(() => !(tabs?.value && tabs.value.length > 0))

function setTabs(tab: any, index: number) {
  if (!tab.props) tab.props = []

  const buttonId = tab.props['button-id'] || getId('tab')
  const contentId = tab.props.id || getId()
  const active = tabIndex.value > -1 ? index === tabIndex.value : tab.props.active === ''
  const titleItemClass = tab.props['title-item-class']
  const titleLinkAttributes = tab.props['title-link-attributes']

  return {
    buttonId,
    contentId,
    active,
    disabled: tab.props.disabled === '' || tab.props.disabled === true,
    navItemClasses: [
      {
        active,
        disabled: tab.props.disabled === '' || tab.props.disabled === true
      },
      active && tabsProps.activeNavItemClass ? tabsProps.activeNavItemClass : null,
      tab.props['title-link-class']
    ],
    tabClasses: [
      {
        fade: !tabsProps.noFade
      },
      active && tabsProps.activeTabClass ? tabsProps.activeTabClass : null
    ],
    target: `${contentId}`,
    title: tab.props.title,
    titleItemClass,
    titleLinkAttributes,
    onClick: tab.props.onClick,
    tab,
    tabComponent: () => getTabs(slots)[index]
  }
}

function getTabs(slots: any): any[] {
  if (!slots || !slots.default) return []

  return slots
    .default()
    .reduce((arr: number[], slot: any) => {
      if (typeof slot.type === 'symbol') {
        arr = arr.concat(slot.children)
      } else {
        arr.push(slot)
      }
      return arr
    }, [])
    .filter((child: any) => child.type?.__name === 'RTab')
}

function handleClick(event: MouseEvent, index: number) {
  activateTab(index)

  if (
    index >= 0 &&
    !tabs.value[index].disabled &&
    tabs.value[index]?.onClick &&
    typeof tabs.value[index]?.onClick === 'function'
  ) {
    tabs.value[index].onClick(event)
  }
}

function activateTab(index: number): boolean {
  let result = false
  if (index !== undefined) {
    if (
      (index > -1 && index < tabs.value.length && !tabs.value[index].disabled && tabIndex.value < 0) ||
      (tabs.value[index] && tabs.value[index].buttonId !== _currentTabButton.value)
    ) {
      emit('activate-tab', index, tabIndex.value, tabsElement.value)

      if (!tabsElement.value) {
        tabIndex.value = index
        result = true
      }
    }
  }

  return result
}

function getId(suffix = ''): string {
  return `__routaa__${Math.random().toString().slice(2, 8)}___r_${suffix}__`
}

activateTab(_tabIndex.value)

function watchModelValue(newValue: number, oldValue: number) {
  if (newValue === oldValue) return
  newValue = Math.max(newValue, -1)
  oldValue = Math.max(oldValue, -1)
  // set tab index -1 if not have tab
  if (tabs.value.length <= 0) {
    tabIndex.value = -1
    return
  }

  setActiveTabs(newValue, oldValue)
}

function setActiveTabs(newValue: number, oldValue: number) {
  const goForward = newValue > oldValue

  let index = newValue
  const maxIdx = tabs.value.length - 1
  while (index >= 0 && index <= maxIdx && tabs.value[index].disabled) {
    index += goForward ? 1 : -1
  }

  if (index < 0) {
    activateTab(0)
    return
  }

  if (index >= tabs.value.length) {
    activateTab(tabs.value.length - 1)
    return
  }

  activateTab(index)
}

function watchTabs() {
  let activeTabIndex = setActiveTabIndex()

  tabs.value.forEach((tab: any, index: number) => (tab.active = index === activeTabIndex))

  activateTab(activeTabIndex)
}

function setActiveTabIndex() {
  let activeTabIndex = tabs.value.map((tab: any) => tab.active && !tab.disabled).lastIndexOf(true)

  // set active tab index from tab components if tab is active and is not disabled
  if (activeTabIndex < 0) {
    if (tabIndex.value >= tabs.value.length)
      activeTabIndex = tabs.value.map((tab: any) => !tab.disabled).lastIndexOf(true)
    else if (tabs.value[tabIndex.value] && !tabs.value[tabIndex.value].disabled) activeTabIndex = tabIndex.value
  }

  return activeTabIndex
}

watch(
  () => tabsProps.modelValue,
  (newValue, oldValue) => watchModelValue(newValue, oldValue)
)

watch(tabs, () => watchTabs())

onMounted(() => {
  if (tabIndex.value < 0 && tabs.value.length > 0 && !tabs.value.some((tab: any) => tab.active)) {
    const firstTab = tabs.value.map((t) => !t.disabled).indexOf(true)
    activateTab(firstTab >= 0 ? firstTab : -1)
  }
})

provide('tab', {
  lazy: tabsProps.lazy,
  card: tabsProps.card
})
</script>

<template>
  <component ref="tabs" :is="tabsProps.tag" :id="tabsProps.id" :class="tabsClasses">
    <div v-if="tabsProps.end" :class="contentClasses">
      <component
        v-for="({ tabComponent, contentId, tabClasses, active }, index) in tabs"
        :key="index"
        :id="contentId"
        :class="tabClasses"
        :is="tabComponent()"
        :active="active"
      />

      <div v-if="showEmpty" key="bv-empty-tab" :class="emptyTabClasses">
        <slot name="empty" />
      </div>
    </div>

    <div :class="wrapperClasses">
      <ul :class="navClasses" role="tab-list">
        <li
          v-for="({ tab, buttonId, contentId, navItemClasses, active, target }, index) in tabs"
          :key="index"
          class="nav-item"
          :class="tab.props['title-item-class']"
        >
          <button
            v-if="buttonId"
            :id="buttonId"
            role="tab"
            class="nav-link"
            data-bs-toggle="tab"
            :data-bs-target="target"
            :class="navItemClasses"
            :aria-controls="contentId"
            :aria-selected="active"
            v-bind="tab.props['title-link-attributes']"
            @click.stop.prevent="(e) => handleClick(e, index)"
          >
            <component v-if="tab.children && tab.children.title" :is="tab.children.title" />

            <template v-else>
              {{ tab.props.title }}
            </template>
          </button>
        </li>

        <slot name="tabs-end" />
      </ul>
    </div>

    <div v-if="!tabsProps.end" :class="contentClasses">
      <component
        v-for="({ tabComponent, contentId, tabClasses, active }, index) in tabs"
        :key="index"
        :is="tabComponent()"
        :id="contentId"
        :class="tabClasses"
        :active="active"
      />

      <div v-if="showEmpty" key="bv-empty-tab" :class="emptyTabClasses">
        <slot name="empty" />
      </div>
    </div>
  </component>
</template>
