<script setup lang="ts">
const props = withDefaults(defineProps<{ idPrefix?: string; text?: string }>(), { idPrefix: 'header-contact', text: '' });
const dialogId = computed(() => `${props.idPrefix}-options`);
const dialog = ref<HTMLDialogElement | null>(null);
const whatsappLink = ref<HTMLAnchorElement | null>(null);
let previousOverflow: string | undefined;
const restoreScroll = () => {
  if (previousOverflow === undefined) return;
  document.body.style.overflow = previousOverflow;
  previousOverflow = undefined;
};
const open = () => {
  if (!dialog.value || dialog.value.open) return;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  dialog.value.showModal();
  whatsappLink.value?.focus();
};
const close = () => {
  dialog.value?.close();
  restoreScroll();
};
onBeforeUnmount(restoreScroll);
</script>

<template>
  <button type="button" class="contact-trigger" :class="{ 'contact-trigger-text': text }" aria-label="Связаться с нами: написать или позвонить" aria-haspopup="dialog" :aria-controls="dialogId" @click="open">
    <span v-if="text">{{ text }}</span>
    <img v-else src="/icons/ph-phone-cream.svg" class="h-5 w-5" alt="" aria-hidden="true">
  </button>
  <Teleport to="body">
  <dialog :id="dialogId" ref="dialog" class="contact-dialog" :aria-labelledby="`${dialogId}-title`" :aria-describedby="`${dialogId}-description`" @close="restoreScroll" @click="event => { if (event.target === dialog) close(); }">
    <div class="contact-panel" @click.stop>
      <button type="button" class="contact-close" aria-label="Закрыть окно" @click="close">
        <img src="/icons/ph-x-dark.svg" class="h-5 w-5" alt="" aria-hidden="true">
      </button>
      <p class="contact-eyebrow">SAMORODOK НА СВЯЗИ</p>
      <h2 :id="`${dialogId}-title`" class="font-display text-3xl">Как вам удобнее?</h2>
      <p :id="`${dialogId}-description`" class="contact-description">Поможем выбрать украшение и ответим на вопросы. Выберите удобный способ связи.</p>
      <a ref="whatsappLink" href="https://wa.me/79885475999" target="_blank" rel="noopener noreferrer" class="contact-choice contact-whatsapp" @click="close">
        <span>Написать в WhatsApp</span>
        <span class="contact-choice-detail">Откроется в новой вкладке</span>
      </a>
      <a href="tel:+79885475999" class="contact-choice contact-call" @click="close">
        <span>Позвонить</span>
        <span class="contact-choice-detail">+7 988 547-59-99</span>
      </a>
    </div>
  </dialog>
  </Teleport>
</template>

<style scoped>
.contact-trigger { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; transition: background .2s; }
.contact-trigger:hover { background: rgba(247, 241, 232, .1); }
.contact-trigger-text { display: inline-flex; width: auto; height: auto; min-height: 28px; border-radius: 4px; text-align: right; }
.contact-trigger-text:hover { background: none; color: #c69a6d; }
.contact-dialog { width: min(460px, calc(100vw - 32px)); max-height: calc(100dvh - 32px); margin: auto; padding: 0; border: 1px solid #d6c5b4; border-radius: 28px; background: #f7f1e8; color: #241811; text-align: left; font-size: 16px; line-height: 1.5; box-shadow: 0 24px 80px rgba(0, 0, 0, .25); }
.contact-dialog::backdrop { background: rgba(24, 16, 11, .6); backdrop-filter: blur(5px); }
.contact-dialog[open] { animation: contact-appear .24s ease-out; }
.contact-panel { position: relative; padding: 48px 28px 28px; }
.contact-close { position: absolute; top: 8px; right: 8px; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; }
.contact-close:hover { background: #e9ddce; }
.contact-eyebrow { margin-bottom: 12px; font-size: 10px; letter-spacing: .18em; color: #796452; }
.contact-description { margin: 16px 0 24px; font-size: 14px; line-height: 1.65; color: #796452; }
.contact-choice { display: grid; gap: 5px; padding: 16px 20px; border-radius: 16px; text-align: center; font-size: 15px; transition: background .2s; }
.contact-choice-detail { font-size: 12px; opacity: .75; }
.contact-whatsapp { background: #c69a6d; }
.contact-whatsapp:hover { background: #d5ad83; }
.contact-call { margin-top: 12px; border: 1px solid #b7a899; }
.contact-call:hover { background: #e9ddce; }
@keyframes contact-appear { from { opacity: 0; transform: translateY(10px) scale(.98); } to { opacity: 1; transform: none; } }
@media (prefers-reduced-motion: reduce) { .contact-dialog[open] { animation: none; } }
</style>
