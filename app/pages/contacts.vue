<script setup lang="ts">
import { socialLinks } from '~/utils/socialLinks';
const form = reactive({
  name: "",
  contact: "",
  message: "",
  consent: false,
})

const submitState = ref<"idle" | "loading" | "success" | "error">("idle")

const handleSubmit = async () => {
  if (!form.consent) return

  submitState.value = "loading"
  try {
    await $fetch("/api/contact", { method: "POST", body: form })
    submitState.value = "success"
    form.name = ""
    form.contact = ""
    form.message = ""
    form.consent = false
  } catch {
    submitState.value = "error"
  }
}

const branches = [
  {
    title: "Шоурум на Большой Морской",
    address: "190000, г. Санкт-Петербург, ул. Большая Морская, д. 15, 2 этаж",
    hours: "Пн–Сб 10:00–20:00, вс — выходной",
  },
  {
    title: "Пункт самовывоза в Москве",
    address: "125009, г. Москва, ул. Тверская, д. 22, ТЦ «Central», 3 этаж",
    hours: "Ежедневно 10:00–21:00",
  },
]

const openBranch = ref<number | null>(null)
const toggleBranch = (index: number) => {
  openBranch.value = openBranch.value === index ? null : index
}

const requisites = `ООО «Блинк Джевелри»
ИНН 7800000000
КПП 780001001
ОГРН 1157800000000
Р/с 40702810000000000000
Банк: ПАО «Банк Пример»
БИК 044000000
Юридический адрес: 190000, г. Санкт-Петербург, ул. Большая Морская, д. 15, оф. 305`

const copied = ref(false)
const copyRequisites = async () => {
  await navigator.clipboard.writeText(requisites)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

const handlePrint = () => window.print()
</script>

<template>
  <div class="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 3xl:max-w-[2200px] 3xl:py-32 4xl:max-w-[2600px]">
    <div class="text-center">
      <h1 class="font-display text-4xl sm:text-5xl 2xl:text-6xl 3xl:text-7xl">Контакты</h1>
      <p class="mt-4 text-base text-brand-dark/60 sm:text-lg 3xl:text-xl">Мы на связи и всегда рады помочь с выбором</p>
    </div>

    <!-- Быстрые способы связи -->
    <div class="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
      <a href="tel:+79885475999" class="flex flex-col gap-2 rounded-2xl bg-brand-cream p-5 transition hover:bg-brand-cream/70 sm:p-6">
        <img src="/icons/ph-phone-gold.svg" class="site-icon h-7 w-7 text-brand-gold" alt="" aria-hidden="true">
        <p class="text-sm text-brand-dark/50">Отдел продаж</p>
        <p class="font-display text-lg sm:text-xl">+7 988 547-59-99</p>
      </a>

      <a :href="socialLinks.vk" target="_blank" rel="noopener noreferrer" class="flex flex-col gap-2 rounded-2xl bg-brand-cream p-5 transition hover:bg-brand-cream/70 sm:p-6">
        <img src="/icons/simple-icons-vk-gold.svg" class="site-icon h-7 w-7 text-brand-gold" alt="" aria-hidden="true">
        <p class="text-sm text-brand-dark/50">ВКонтакте</p>
        <p class="break-words font-display text-base sm:text-xl [overflow-wrap:anywhere]">samorodok.jeweler</p>
      </a>

      <div class="flex flex-col gap-2 rounded-2xl bg-brand-cream p-5 sm:p-6">
        <img src="/icons/ph-telegram-logo-gold.svg" class="site-icon h-7 w-7 text-brand-gold" alt="" aria-hidden="true">
        <p class="text-sm text-brand-dark/50">Мессенджеры</p>
        <div class="flex flex-wrap gap-3">
          <a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer" class="font-display text-xl hover:text-brand-gold">Telegram</a>
          <a href="https://wa.me/79885475999" class="font-display text-xl hover:text-brand-gold">WhatsApp</a>
        </div>
        <span class="mt-1 inline-flex w-fit items-center gap-1 rounded-full bg-brand-gold/20 px-2 py-1 text-xs font-medium text-brand-dark/70">
          Отвечаем за 15 минут
        </span>
      </div>

      <div class="flex flex-col gap-2 rounded-2xl bg-brand-cream p-5 sm:p-6">
        <img src="/icons/ph-clock-gold.svg" class="site-icon h-7 w-7 text-brand-gold" alt="" aria-hidden="true">
        <p class="text-sm text-brand-dark/50">Часы работы</p>
        <p class="text-base">Пн–Пт 09:00–18:00 (МСК)</p>
        <p class="text-base text-brand-dark/60">Сб–Вс — выходной, в праздники — по объявлению</p>
      </div>
    </div>

    <!-- Адрес и карта -->
    <div class="mt-16 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
      <div>
        <h2 class="flex items-center gap-2 font-display text-3xl sm:text-4xl">
          <img src="/icons/ph-map-pin-gold.svg" class="site-icon h-7 w-7 text-brand-gold" alt="" aria-hidden="true">
          Как нас найти
        </h2>
        <p class="mt-3 text-base text-brand-dark/70 sm:text-lg">
          190000, г. Санкт-Петербург, ул. Большая Морская, д. 15, 2 этаж, шоурум Samorodok
        </p>
        <div class="mt-6 overflow-hidden rounded-2xl">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=30.313614%2C59.934280&z=16&pt=30.313614,59.934280,pm2rdm"
            class="h-72 w-full sm:h-96"
            loading="lazy"
            title="Карта проезда до шоурума Samorodok"
          />
        </div>
      </div>

      <div class="flex flex-col items-center justify-center rounded-2xl bg-brand-cream p-6 text-center">
        <p class="text-base text-brand-dark/60">Отсканируйте, чтобы открыть маршрут в приложении карт</p>
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=https://yandex.ru/maps/?pt=30.313614,59.934280&z=16&l=map"
          alt="QR-код с маршрутом до шоурума Samorodok"
          class="mt-4 h-40 w-40 rounded-xl bg-white p-2 sm:h-48 sm:w-48"
        >
      </div>
    </div>

    <!-- Форма обратной связи -->
    <div class="mt-16 rounded-2xl bg-brand-cream p-6 sm:p-10">
      <h2 class="font-display text-3xl sm:text-4xl">Написать нам</h2>
      <p class="mt-2 text-base text-brand-dark/60">Ответим в течение рабочего дня</p>

      <form v-if="submitState !== 'success'" class="mt-6 grid gap-4 sm:max-w-lg" @submit.prevent="handleSubmit">
        <label for="contact-name" class="sr-only">Ваше имя</label>
        <input
          id="contact-name"
          v-model="form.name"
          type="text"
          required
          placeholder="Ваше имя"
          class="rounded-lg border border-brand-dark/20 bg-white px-4 py-3 text-base"
        >
        <label for="contact-address" class="sr-only">Телефон или e-mail</label>
        <input
          id="contact-address"
          v-model="form.contact"
          type="text"
          required
          placeholder="Телефон или e-mail"
          class="rounded-lg border border-brand-dark/20 bg-white px-4 py-3 text-base"
        >
        <label for="contact-message" class="sr-only">Сообщение</label>
        <textarea
          id="contact-message"
          v-model="form.message"
          required
          rows="3"
          placeholder="Сообщение"
          class="rounded-lg border border-brand-dark/20 bg-white px-4 py-3 text-base"
        />

        <label class="flex items-start gap-2 text-sm text-brand-dark/60">
          <input v-model="form.consent" type="checkbox" required class="mt-0.5">
          Согласен на обработку персональных данных в соответствии с ФЗ-152
        </label>

        <button
          type="submit"
          :disabled="submitState === 'loading' || !form.consent"
          class="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-base font-medium text-brand-dark transition hover:bg-brand-gold/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {{ submitState === 'loading' ? 'Отправляем…' : 'Отправить' }}
        </button>

        <p v-if="submitState === 'error'" role="alert" class="text-base text-red-600">Не получилось отправить, попробуйте ещё раз.</p>
        <p class="text-xs text-brand-dark/40">Форма защищена от спама (reCAPTCHA v3)</p>
      </form>

      <p v-else class="mt-6 text-lg text-brand-dark/70">
        Спасибо! Мы получили ваше сообщение и ответим в ближайшее время.
      </p>
    </div>

    <!-- Доступность -->
    <div class="mt-16 flex flex-col gap-4 rounded-2xl border border-brand-dark/10 p-6 sm:flex-row sm:items-start sm:gap-6 sm:p-8">
      <div class="flex gap-4 text-brand-gold">
        <img src="/icons/ph-wheelchair-dark.svg" class="site-icon h-7 w-7" alt="" aria-hidden="true">
        <img src="/icons/ph-elevator-dark.svg" class="site-icon h-7 w-7" alt="" aria-hidden="true">
      </div>
      <div>
        <h3 class="font-display text-xl">Доступность шоурума</h3>
        <p class="mt-1 text-base text-brand-dark/60">
          В здании есть пандус и лифт. Для оформления пропуска на въезд сообщите номер автомобиля заранее по телефону.
        </p>
      </div>
    </div>

    <!-- Филиалы -->
    <div class="mt-16">
      <h2 class="font-display text-3xl sm:text-4xl">Филиалы и точки</h2>
      <div class="mt-6 flex flex-col gap-3">
        <div v-for="(branch, index) in branches" :key="branch.title" class="rounded-2xl bg-brand-cream">
          <button
            type="button"
            class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            @click="toggleBranch(index)"
          >
            <span class="font-display text-xl">{{ branch.title }}</span>
            <img
              src="/icons/ph-caret-down-dark.svg"
              class="site-icon h-5 w-5 shrink-0 transition-transform"
              :class="{ 'rotate-180': openBranch === index }" alt="" aria-hidden="true">
          </button>
          <div v-if="openBranch === index" class="px-5 pb-5 text-base text-brand-dark/70 sm:px-6">
            <p>{{ branch.address }}</p>
            <p class="mt-1 text-brand-dark/50">{{ branch.hours }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Реквизиты -->
    <div class="mt-16">
      <h2 class="font-display text-3xl sm:text-4xl">Реквизиты</h2>
      <div class="mt-6 flex flex-col rounded-2xl bg-brand-cream p-5 sm:relative sm:block sm:p-8">
        <button
          type="button"
          class="mb-4 inline-flex items-center gap-1 self-end text-sm text-brand-dark/50 transition hover:text-brand-gold sm:absolute sm:right-4 sm:top-4 sm:mb-0"
          @click="copyRequisites"
        >
          <img :src="copied ? '/icons/ph-check-dark.svg' : '/icons/ph-copy-dark.svg'" class="site-icon h-4 w-4" alt="" aria-hidden="true">
          {{ copied ? 'Скопировано' : 'Копировать' }}
        </button>
        <pre class="whitespace-pre-wrap break-words font-sans text-sm text-brand-dark/80 sm:text-base">{{ requisites }}</pre>
      </div>
    </div>

    <!-- Соцсети и печать -->
    <div class="mt-16 flex flex-col items-center justify-between gap-6 border-t border-brand-dark/10 pt-10 sm:flex-row">
      <div class="flex gap-4 text-brand-dark/70">
        <a :href="socialLinks.vk" target="_blank" rel="noopener noreferrer" aria-label="VK (откроется в новой вкладке)" class="transition hover:text-brand-gold"><img src="/icons/simple-icons-vk-dark.svg" class="site-icon h-7 w-7" alt="" aria-hidden="true"></a>
        <a :href="socialLinks.telegram" target="_blank" rel="noopener noreferrer" aria-label="Telegram (откроется в новой вкладке)" class="transition hover:text-brand-gold"><img src="/icons/ph-telegram-logo-dark.svg" class="site-icon h-7 w-7" alt="" aria-hidden="true"></a>
        <a :href="socialLinks.instagram" target="_blank" rel="noopener noreferrer" aria-label="Instagram (откроется в новой вкладке)" class="transition hover:text-brand-gold"><img src="/icons/ph-instagram-logo-dark.svg" class="site-icon h-7 w-7" alt="" aria-hidden="true"></a>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-brand-dark/20 px-5 py-2.5 text-base transition hover:border-brand-gold hover:text-brand-gold"
        @click="handlePrint"
      >
        <img src="/icons/ph-printer-dark.svg" class="site-icon h-4 w-4" alt="" aria-hidden="true">
        Печать
      </button>
    </div>
  </div>
</template>
