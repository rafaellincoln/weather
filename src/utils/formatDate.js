const WEEK_DAY = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sabado']

const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
}
export const formatDate = (dt, abrev) => {
  const date = new Date(dt * 1000)

  if (!isValidDate(date)) {
    return null
  }

  const hours = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  const weekDay = WEEK_DAY[date.getDay()]
  
  if (abrev) {
    return `${weekDay.substring(0, 3)}.`
  }

  return `${weekDay}, ${hours}`
}