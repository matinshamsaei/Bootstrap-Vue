<script setup lang="ts">
import { computed, ref } from 'vue'
import RButton from '@/components/RButton/index.vue'
import type { HTMLAttributes, HtmlHTMLAttributes, StyleValue } from 'vue'

type ModalProps = {
  modelValue?: boolean

  // modal
  autoFocusButton?: string
  lazy?: boolean
  static?: boolean
  busy?: boolean
  noCloseOnEsc?: boolean
  modalClass?: HTMLAttributes['class']
  noFade?: boolean

  // dialog
  centered?: boolean
  dialogClass?: HTMLAttributes['class']
  ariaLabel?: string
  size?: string
  scrollable?: boolean

  // content
  contentClass?: HTMLAttributes['class']

  // body
  bodyBgVariant?: string
  bodyClass?: HTMLAttributes['class']
  bodyTextVariant?: string

  // header
  headerClass?: HTMLAttributes['class']
  headerTag?: string
  hideHeader?: boolean
  headerCloseVariant?: string
  headerTextVariant?: string
  headerCloseLabel?: string
  headerCloseContent?: string
  headerBorderVariant?: string
  hideHeaderClose?: boolean
  headerBgVariant?: string

  // title
  title?: string
  titleClass?: HTMLAttributes['class']
  titleHtml?: HtmlHTMLAttributes
  titleTag?: string

  // footer
  footerBgVariant?: string
  footerBorderVariant?: string
  footerClass?: HTMLAttributes['class']
  footerTag?: string
  footerTextVariant?: string
  hideFooter?: boolean

  // backdrop
  hideBackdrop?: boolean
  backdropOpacity?: string
  noCloseOnBackdrop?: boolean

  // button
  buttonSize?: 'sm' | 'md' | 'lg'
  // cancel
  cancelDisabled?: boolean
  cancelTitle?: string
  cancelTitleHtml?: HtmlHTMLAttributes
  cancelVariant?: string
  // ok
  okDisabled?: boolean
  okOnly?: boolean
  okTitle?: string
  okTitleHtml?: HtmlHTMLAttributes
  okVariant?: string
}

const modalProps = withDefaults(defineProps<ModalProps>(), {
  busy: false,
  cancelDisabled: false,
  cancelTitle: 'Cancel',
  cancelVariant: 'secondary',
  centered: false,
  footerTag: 'footer',
  headerCloseContent: '&times;',
  headerCloseLabel: 'Close',
  headerTag: 'header',
  hideBackdrop: false,
  hideFooter: false,
  hideHeader: false,
  hideHeaderClose: false,
  lazy: false,
  noCloseOnBackdrop: false,
  noCloseOnEsc: false,
  noFade: false,
  okDisabled: false,
  okOnly: false,
  okTitle: 'Ok',
  okVariant: 'primary',
  scrollable: false,
  size: 'md',
  static: false,
  titleTag: 'h5',
  backdropOpacity: '0.5'
})

// values
const lazyLoadCompleted = ref<boolean>(false)
const isActive = ref<boolean>(false)

// ref
const modal = ref<HTMLElement | null>(null)

// emit
interface ModalEmits {
  (e: 'update:modelValue', value: any): void
  (e: 'show', value: Element | null): void
  (e: 'ok', value: Element | null): void
  (e: 'shown', value: Element | null): void
  (e: 'hide', value: Element | null): void
  (e: 'hidden', value: Element | null): void
  (e: 'cancel', value: Element | null): void
  (e: 'close', value: Element | null): void
  (e: 'change', value: any): void
}
const emit = defineEmits<ModalEmits>()

const isVisible = computed({
  get() {
    return modalProps.modelValue
  },
  set(val) {
    emit('update:modelValue', val)
    emit('change', val)
  }
})

// classes
const modalClasses = computed(() => {
  return [
    'modal',
    'd-block',
    modalProps.modalClass,
    {
      show: isActive.value
    }
  ]
})

const modalDialogClasses = computed(() => [
  'modal-dialog',
  modalProps.dialogClass,
  {
    [`modal-${modalProps.size}`]: modalProps.size,
    'modal-dialog-centered': modalProps.centered,
    'modal-dialog-scrollable': modalProps.scrollable
  }
])

const modalContentClasses = ['modal-content', modalProps.contentClass]

const modalHeaderClasses = [
  'modal-header',
  modalProps.headerClass,
  {
    [`text-${modalProps.headerTextVariant}`]: modalProps.headerTextVariant,
    [`bg-${modalProps.headerBgVariant}`]: modalProps.headerBgVariant,
    [`border-${modalProps.headerBorderVariant}`]: modalProps.headerBorderVariant
  }
]

const modalTitleClasses = ['modal-title', modalProps.titleClass]

const modalBodyClasses = [
  'modal-body',
  modalProps.bodyClass,
  {
    [`bg-${modalProps.bodyBgVariant}`]: modalProps.bodyBgVariant,
    [`text-${modalProps.bodyTextVariant}`]: modalProps.bodyTextVariant
  }
]

const modalFooterClasses = [
  'modal-footer',
  modalProps.footerClass,
  {
    [`bg-${modalProps.footerBgVariant}`]: modalProps.footerBgVariant,
    [`border-${modalProps.footerBorderVariant}`]: modalProps.footerBorderVariant,
    [`text-${modalProps.footerTextVariant}`]: modalProps.footerTextVariant
  }
]

// style
const wrapperStyle: StyleValue | undefined = {
  position: 'absolute',
  zIndex: 1040
}

const backdropStyle = {
  opacity: modalProps.backdropOpacity
}

// attrs
const modalAttrs = computed(() => ({
  role: 'dialog',
  'tab-index': '-1',
  'aria-hidden': 'true'
}))

const modalDialogAttrs = computed(() => ({
  'aria-hidden': isVisible.value ? null : 'true',
  'aria-modal': isVisible.value ? 'true' : null,
  'aria-label': modalProps.ariaLabel,
  style: { 'z-index': '1060' }
}))

const lazyShowing = computed(() => {
  return !modalProps.lazy || (modalProps.lazy && lazyLoadCompleted.value)
})

function idGenrator(prefix: string) {
  const id: number = Math.round(Date.now() / 1000)

  return prefix + id
}

function changeBody(val: any): void {
  if (val) document.body.classList.add('modal-open')
  else document.body.classList.remove('modal-open')
}

function show(): void {
  isVisible.value = true
  emit('show', modal.value)
}

function hide(trigger: string = ''): void {
  isVisible.value = false
  if (trigger === 'ok') emit(trigger, modal.value)
  if (trigger === 'cancel') emit(trigger, modal.value)
  if (trigger === 'close') emit(trigger, modal.value)

  emit('hide', modal.value)

  if ((trigger === 'backdrop' && modalProps.noCloseOnBackdrop) || (trigger === 'esc' && modalProps.noCloseOnEsc)) {
    isVisible.value = true
    return
  }

  isVisible.value = false
}

function onBeforeEnter(): void {
  show()
}

function onAfterEnter(): void {
  isActive.value = true
  changeBody(isActive.value)
  emit('shown', modal.value)
  if (modalProps.lazy) lazyLoadCompleted.value = true
}

function onLeave() {
  isActive.value = false
  changeBody(isActive.value)
}

function onAfterLeave() {
  isVisible.value = false
  emit('hidden', modal.value)
  if (modalProps.lazy === true) lazyLoadCompleted.value = false
}
</script>

<template>
  <teleport to="body" :disabled="modalProps.static">
    <transition
      name="fade"
      mode="out-in"
      @before-enter="onBeforeEnter"
      @after-enter="onAfterEnter"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div id="modal" v-show="isVisible" :style="wrapperStyle" @keyup.esc="hide('esc')">
        <div :id="idGenrator('r_modal_')" ref="modal" aria-modal="true" :class="modalClasses" v-bind="modalAttrs">
          <div :id="idGenrator('r_modal_dialog_')" v-bind="modalDialogAttrs" :class="modalDialogClasses">
            <div v-if="lazyShowing" :id="idGenrator('r_modal_content_')" :class="modalContentClasses">
              <component v-if="!modalProps.hideHeader" :is="modalProps.headerTag" :class="modalHeaderClasses">
                <slot v-if="$slots['modal-header']" name="modal-header" />

                <template v-else>
                  <component v-if="modalProps.title" :is="modalProps.titleTag" :class="modalTitleClasses">
                    <slot v-if="$slots['modal-title']" name="modal-title" />

                    <div v-else-if="!!modalProps.titleHtml" v-html="modalProps.titleHtml" />

                    <template v-else>
                      {{ modalProps.title }}
                    </template>
                  </component>

                  <template v-if="!modalProps.hideHeaderClose">
                    <slot v-if="$slots['modal-header-close']" name="modal-header-close" />

                    <button
                      v-else
                      ref="close-button"
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      :aria-label="modalProps.headerCloseLabel"
                      @click="hide('close')"
                    />
                  </template>
                </template>
              </component>

              <div :class="modalBodyClasses">
                <slot />
              </div>

              <component v-if="!modalProps.hideFooter" :is="modalProps.footerTag" :class="modalFooterClasses">
                <slot v-if="$slots['modal-footer']" name="modal-footer" />

                <template v-else>
                  <RButton
                    ref="cancel"
                    :size="modalProps.buttonSize"
                    :disabled="modalProps.cancelDisabled"
                    :variant="modalProps.cancelVariant"
                    @click="hide('cancel')"
                  >
                    <slot v-if="$slots['modal-cancel']" name="modal-cancel" />

                    <div v-else-if="!!modalProps.cancelTitleHtml" v-html="modalProps.cancelTitleHtml" />

                    <template v-else>
                      {{ modalProps.cancelTitle }}
                    </template>
                  </RButton>

                  <RButton
                    ref="ok"
                    :size="modalProps.buttonSize"
                    :disabled="modalProps.okDisabled"
                    :variant="modalProps.okVariant"
                    @click="hide('ok')"
                  >
                    <slot v-if="$slots['modal-ok']" name="modal-ok" />

                    <div v-else-if="!!modalProps.okTitleHtml" v-html="modalProps.okTitleHtml" />

                    <template v-else>
                      {{ modalProps.okTitle }}
                    </template>
                  </RButton>
                </template>
              </component>
            </div>
          </div>

          <slot name="backdrop">
            <div
              v-show="!modalProps.hideBackdrop"
              ref="backdrop"
              class="modal-backdrop show"
              :style="backdropStyle"
              @click.passive="hide('backdrop')"
            ></div>
          </slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>
