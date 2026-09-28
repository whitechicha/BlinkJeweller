<template>
  <section class="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 sm:py-16 lg:px-10 3xl:max-w-[2200px] 3xl:py-20 4xl:max-w-[2600px] 4xl:py-24">
    <div class="grid gap-8 rounded-2xl bg-brand-cream p-6 sm:gap-10 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-14 3xl:gap-14 3xl:p-16">
      <div>
        <p class="text-xs tracking-[0.2em] text-brand-gold sm:text-sm">О НАС</p>
        <h2 class="mt-3 font-display text-2xl sm:text-3xl 2xl:text-4xl 3xl:text-5xl">
          Ювелирный бренд, который создаёт украшения с душой
        </h2>
        <p class="mt-4 max-w-xl text-sm text-brand-dark/70 sm:text-base 3xl:text-lg">
          Blink — небольшая мастерская, где каждое украшение проходит через руки мастера,
          а не конвейер. Мы верим, что блеск должен быть настоящим — и в металле, и в отношении к клиенту.
        </p>
        <NuxtLink
          to="/about"
          class="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand-dark/20 px-5 py-2.5 text-xs font-medium transition hover:border-brand-gold hover:text-brand-gold sm:px-6 sm:py-3 sm:text-sm 3xl:text-base"
        >
          Узнать больше о нас
          <Icon name="ph:arrow-right" class="h-4 w-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-3 gap-4 sm:gap-6 lg:grid-cols-1 lg:border-l lg:border-brand-dark/10 lg:pl-10">
        <div>
          <p class="font-display text-2xl sm:text-3xl 2xl:text-4xl">5+</p>
          <p class="mt-1 text-xs text-brand-dark/60 sm:text-sm">лет на рынке</p>
        </div>
        <div>
          <p class="font-display text-2xl sm:text-3xl 2xl:text-4xl">10 000+</p>
          <p class="mt-1 text-xs text-brand-dark/60 sm:text-sm">довольных клиентов</p>
        </div>
        <div>
          <p class="font-display text-2xl sm:text-3xl 2xl:text-4xl">100%</p>
          <p class="mt-1 text-xs text-brand-dark/60 sm:text-sm">ручная работа</p>
        </div>
      </div>
    </div>
  </section>
</template>
