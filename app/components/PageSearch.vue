<script setup lang="ts">
const dialog = ref<HTMLDialogElement | null>(null);
const input = ref<HTMLInputElement | null>(null);
const query = ref('');
const entries = shallowRef<{ title: string; text: string; element: HTMLElement }[]>([]);
const normalize = (value: string) => value.toLocaleLowerCase('ru-RU').replaceAll('ё', 'е');
const results = computed(() => {
  const term = normalize(query.value.trim());
  if (!term) return [];
  return entries.value.filter(entry => normalize(entry.text).includes(term)).map(entry => {
    const index = normalize(entry.text).indexOf(term);
    const start = Math.max(0, index - 35);
    return { ...entry, excerpt: `${start ? '…' : ''}${entry.text.slice(start, index + term.length + 65)}…` };
  });
});
const open = async () => {
  const main = document.querySelector('main');
  if (!main) return;
  const sections = main.querySelectorAll<HTMLElement>('.home-page > section');
  entries.value = Array.from(sections.length ? sections : [main]).map(element => ({
    title: element.querySelector('h1, h2')?.textContent?.trim() || 'Содержимое страницы',
    text: element.innerText.replace(/\s+/g, ' ').trim(),
    element,
  }));
  query.value = '';
  dialog.value?.showModal();
  await nextTick();
  input.value?.focus();
};
const goToResult = (element: HTMLElement) => {
  dialog.value?.close();
  element.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
};
defineExpose({ open });
</script>

<template>
  <dialog ref="dialog" class="page-search" aria-labelledby="search-title" @click="event => { if (event.target === dialog) dialog?.close(); }">
    <div class="p-6 sm:p-8">
      <div class="mb-6 flex items-center justify-between gap-4">
        <h2 id="search-title" class="font-display text-2xl">Поиск по странице</h2>
        <button type="button" aria-label="Закрыть поиск" class="header-icon" @click="dialog?.close()"><img src="/icons/ph-x-dark.svg" class="site-icon h-6 w-6" alt="" aria-hidden="true"></button>
      </div>
      <label for="page-search-input" class="mb-2 block text-sm text-brand-dark/70">Название украшения или слово из описания</label>
      <input id="page-search-input" ref="input" v-model="query" type="search" placeholder="Например, серебро" class="w-full rounded-xl border border-brand-dark/20 bg-white px-4 py-3" autocomplete="off">
      <p role="status" class="my-4 text-sm text-brand-dark/60">{{ query.trim() ? `Найдено разделов: ${results.length}` : 'Введите запрос, чтобы найти нужный раздел.' }}</p>
      <ul class="grid gap-2">
        <li v-for="result in results" :key="result.title">
          <button type="button" class="search-result w-full rounded-xl border border-brand-dark/10 p-4 text-left" @click="goToResult(result.element)">
            <span class="block font-display text-xl">{{ result.title }}</span>
            <span class="mt-2 block text-sm text-brand-dark/70">{{ result.excerpt }}</span>
          </button>
        </li>
      </ul>
    </div>
  </dialog>
</template>
