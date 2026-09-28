export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body?.name || !body?.contact || !body?.message) {
    throw createError({ statusCode: 400, statusMessage: "Заполните все поля" })
  }

  // Фейковая обработка — в реальном проекте здесь была бы отправка в CRM/почту
  return { success: true }
})
