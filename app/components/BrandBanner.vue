<template>
  <section class="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 sm:py-16 lg:px-10 3xl:max-w-[2200px] 3xl:py-20 4xl:max-w-[2600px] 4xl:py-24">
    <div
      class="overflow-hidden rounded-2xl bg-[linear-gradient(90deg,rgba(36,24,17,0.75),rgba(36,24,17,0.35)),url('/img/Womanjeweller.png')] bg-cover bg-center text-brand-cream"
    >
      <div class="flex min-h-[260px] flex-col justify-center gap-3 p-6 sm:min-h-[320px] sm:gap-4 sm:p-10 lg:p-14 2xl:min-h-[420px] 3xl:min-h-[500px] 3xl:p-16 4xl:min-h-[600px] 4xl:p-20">
        <div class="flex items-center gap-2 sm:gap-3">
          <Icon name="ph:diamond-duotone" class="h-5 w-5 text-brand-gold sm:h-6 sm:w-6 3xl:h-8 3xl:w-8" />
          <p class="text-[10px] tracking-[0.2em] text-brand-gold sm:text-xs sm:tracking-[0.3em] 3xl:text-sm">О БРЕНДЕ</p>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl 2xl:text-4xl 3xl:text-5xl">Украшения с характером</h2>
        <p class="max-w-sm text-sm text-brand-cream/80 sm:text-base 2xl:max-w-md 2xl:text-lg 3xl:max-w-lg 3xl:text-xl">
          Blink — это больше, чем просто украшения. Это способ выразить себя,
          подчеркнуть свою уникальность и сиять каждый день.
        </p>
        <NuxtLink
          to="/about"
          class="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-xs font-medium text-brand-dark transition hover:bg-brand-gold/90 sm:px-6 sm:py-3 sm:text-sm 3xl:px-8 3xl:py-4 3xl:text-base"
        >
          Узнать больше
          <Icon name="ph:arrow-right" class="h-4 w-4 3xl:h-5 3xl:w-5" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
