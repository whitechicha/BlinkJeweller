<template>
  <section
    class="relative overflow-hidden bg-[linear-gradient(rgba(36,24,17,0.55),rgba(36,24,17,0.55)),url('/img/header_clean_cropped.png')] bg-cover bg-center text-brand-cream"
  >
    <div class="relative mx-auto flex min-h-[360px] max-w-[1800px] items-center px-4 py-14 sm:min-h-[480px] sm:px-6 sm:py-24 md:min-h-[560px] lg:px-10 2xl:min-h-[640px] 3xl:max-w-[2200px] 3xl:min-h-[720px] 4xl:max-w-[2600px] 4xl:min-h-[860px]">
      <div class="max-w-lg 3xl:max-w-xl 4xl:max-w-2xl">
        <p class="mb-3 text-xs tracking-[0.2em] text-brand-gold sm:mb-4 sm:text-sm sm:tracking-[0.3em] 2xl:text-base 3xl:text-lg">ЮВЕЛИРНЫЕ УКРАШЕНИЯ</p>
        <h1 class="font-display text-5xl leading-none sm:text-6xl md:text-7xl 2xl:text-8xl 3xl:text-9xl">Blink</h1>
        <p class="mt-3 text-lg sm:mt-4 sm:text-2xl 2xl:text-3xl 3xl:text-4xl">Сияй. Блеск. Blink.</p>
        <p class="mt-3 max-w-sm text-sm text-brand-cream/80 sm:mt-4 sm:text-base 2xl:max-w-md 2xl:text-lg 3xl:max-w-lg 3xl:text-xl">
          Украшения, подчёркивающие твою индивидуальность.
        </p>

        <NuxtLink
          to="/catalog"
          class="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-gold px-5 py-2.5 text-xs font-medium text-brand-dark transition hover:bg-brand-gold/90 sm:mt-8 sm:px-6 sm:py-3 sm:text-sm 3xl:px-8 3xl:py-4 3xl:text-base"
        >
          Смотреть каталог
          <Icon name="ph:arrow-right" class="h-4 w-4 3xl:h-5 3xl:w-5" />
        </NuxtLink>

        <div class="mt-6 flex gap-4 text-brand-cream/80 sm:mt-8 3xl:gap-6">
          <a href="#" aria-label="VK" class="transition hover:text-brand-gold"><Icon name="simple-icons:vk" class="h-5 w-5 3xl:h-6 3xl:w-6" /></a>
          <a href="#" aria-label="Telegram" class="transition hover:text-brand-gold"><Icon name="ph:telegram-logo" class="h-5 w-5 3xl:h-6 3xl:w-6" /></a>
          <a href="#" aria-label="Instagram" class="transition hover:text-brand-gold"><Icon name="ph:instagram-logo" class="h-5 w-5 3xl:h-6 3xl:w-6" /></a>
        </div>
      </div>
    </div>
  </section>
</template>
