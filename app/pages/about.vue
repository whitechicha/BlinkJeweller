<script setup lang="ts">
const values = [
  {
    icon: "ph:sparkle",
    title: "Настоящий блеск",
    text: "Мы не используем дешёвые покрытия и штамповку. Каждый камень закреплён вручную, каждое изделие проверяется перед отправкой.",
  },
  {
    icon: "ph:hand-heart",
    title: "Индивидуальный подход",
    text: "Поможем подобрать украшение под конкретный образ, повод или бюджет — просто напишите нам в Telegram.",
  },
  {
    icon: "ph:shield-check",
    title: "Честность",
    text: "Указываем реальный состав металла и камней в каждой карточке товара. Никаких «под золото» и скрытых наценок.",
  },
  {
    icon: "ph:leaf",
    title: "Ответственный подход",
    text: "Работаем с проверенными поставщиками металла и упаковываем заказы в перерабатываемые материалы.",
  },
];

const steps = [
  { number: "01", title: "Выбор", text: "Смотрите каталог онлайн или пишите нам — поможем подобрать украшение." },
  { number: "02", title: "Проверка", text: "Каждое изделие проходит контроль качества перед отправкой." },
  { number: "03", title: "Упаковка", text: "Аккуратно упаковываем в фирменную коробку — украшение готово стать подарком." },
  { number: "04", title: "Доставка", text: "Отправляем по всей России — вы получаете заказ и следите за статусом онлайн." },
];
</script>

<template>
  <div>
    <section class="mx-auto max-w-[1800px] px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-10 3xl:max-w-[2200px] 3xl:py-32 4xl:max-w-[2600px]">
      <p class="text-sm tracking-[0.2em] text-brand-gold sm:text-base">О БРЕНДЕ SAMORODOK</p>
      <h1 class="mt-3 font-display text-4xl sm:text-6xl 2xl:text-7xl 3xl:text-8xl">
        Украшения, которым доверяют
      </h1>
      <p class="mx-auto mt-4 max-w-2xl text-base text-brand-dark/70 sm:text-lg 3xl:text-xl">
        Samorodok — небольшая ювелирная мастерская из Санкт-Петербурга. Мы делаем украшения
        для тех, кто хочет сиять по-настоящему: без переплаты за громкое имя и без компромиссов в качестве.
      </p>
    </section>

    <section class="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10 3xl:max-w-[2200px] 4xl:max-w-[2600px]">
      <div class="grid gap-6 sm:grid-cols-3">
        <div class="rounded-2xl bg-brand-cream p-6 text-center sm:p-8">
          <p class="font-display text-4xl 2xl:text-5xl">5+</p>
          <p class="mt-1 text-base text-brand-dark/60">лет на рынке</p>
        </div>
        <div class="rounded-2xl bg-brand-cream p-6 text-center sm:p-8">
          <p class="font-display text-4xl 2xl:text-5xl">10 000+</p>
          <p class="mt-1 text-base text-brand-dark/60">довольных клиентов</p>
        </div>
        <div class="rounded-2xl bg-brand-cream p-6 text-center sm:p-8">
          <p class="font-display text-4xl 2xl:text-5xl">4.9 / 5</p>
          <p class="mt-1 text-base text-brand-dark/60">средняя оценка отзывов</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 3xl:max-w-[2200px] 4xl:max-w-[2600px]">
      <div class="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div class="overflow-hidden rounded-2xl">
          <img
            src="/img/Womanjeweller.png"
            alt="Украшение Samorodok на модели"
            class="h-64 w-full object-cover sm:h-80 lg:h-full"
          >
        </div>
        <div>
          <h2 class="font-display text-3xl sm:text-4xl 2xl:text-5xl">Наша история</h2>
          <p class="mt-4 text-base text-brand-dark/70 sm:text-lg">
            Samorodok начинался в 2019 году как маленькая мастерская на двоих: ювелир и человек,
            который отвечал за всё остальное. Первые кольца мы делали на заказ для друзей —
            и очень быстро поняли, что людям не хватает украшений без наценки за бренд, но с
            настоящим вниманием к деталям.
          </p>
          <p class="mt-4 text-base text-brand-dark/70 sm:text-lg">
            Сегодня в команде Samorodok — ювелиры, дизайнер и служба поддержки, которая отвечает
            в тот же день. Но подход не изменился: мы по-прежнему проверяем вручную каждое
            изделие перед отправкой и стараемся, чтобы каждый заказ ощущался как подарок.
          </p>
          <p class="mt-4 text-base text-brand-dark/70 sm:text-lg">
            Мы работаем с серебром 925° и золотом 585°, используем фианиты, топазы и
            бриллианты — и всегда честно указываем состав в карточке товара.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-brand-cream/60 py-16 sm:py-24">
      <div class="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-10 3xl:max-w-[2200px] 4xl:max-w-[2600px]">
        <div class="text-center">
          <h2 class="font-display text-3xl sm:text-4xl 2xl:text-5xl">Наши принципы</h2>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="value in values" :key="value.title" class="rounded-2xl bg-brand-bg p-6 text-center">
            <Icon :name="value.icon" class="mx-auto h-10 w-10 text-brand-gold" />
            <h3 class="mt-4 font-display text-xl">{{ value.title }}</h3>
            <p class="mt-2 text-base text-brand-dark/60">{{ value.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1800px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 3xl:max-w-[2200px] 4xl:max-w-[2600px]">
      <div class="text-center">
        <h2 class="font-display text-3xl sm:text-4xl 2xl:text-5xl">Как мы работаем</h2>
      </div>

      <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="step in steps" :key="step.number">
          <p class="font-display text-4xl text-brand-gold/60">{{ step.number }}</p>
          <h3 class="mt-2 font-display text-xl">{{ step.title }}</h3>
          <p class="mt-2 text-base text-brand-dark/60">{{ step.text }}</p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-[1800px] px-4 pb-16 sm:px-6 sm:pb-24 lg:px-10 3xl:max-w-[2200px] 4xl:max-w-[2600px]">
      <div class="flex flex-col items-center gap-6 rounded-2xl bg-brand-dark px-6 py-12 text-center text-brand-cream sm:px-10 sm:py-16">
        <h2 class="font-display text-3xl sm:text-4xl 2xl:text-5xl">Готовы выбрать своё украшение?</h2>
        <p class="max-w-md text-base text-brand-cream/70 sm:text-lg">
          Посмотрите каталог или напишите нам напрямую — поможем подобрать идеальный вариант.
        </p>
        <div class="flex flex-wrap justify-center gap-3">
          <NuxtLink
            to="/catalog"
            class="inline-flex items-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-base font-medium text-brand-dark transition hover:bg-brand-gold/90"
          >
            Смотреть каталог
            <Icon name="ph:arrow-right" class="h-4 w-4" />
          </NuxtLink>
          <NuxtLink
            to="/contacts"
            class="inline-flex items-center gap-2 rounded-full border border-brand-cream/30 px-6 py-3 text-base font-medium transition hover:border-brand-gold hover:text-brand-gold"
          >
            Связаться с нами
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>
