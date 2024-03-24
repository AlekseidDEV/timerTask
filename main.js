


const time = document.querySelector('.time')
const greeting = document.querySelector('.greeting')
const timeNext = document.querySelector('.timeNext')
const dayNow = document.querySelector('.dayNow')

let interval

const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const suffixes = ['день', 'дня', 'дней'];

const getTime = () => {
    const newYear = '01 january 2025'
    const date = new Date()
    const day = date.getDay()
    const hours = date.getHours()
    const localTime = date.toLocaleTimeString('en')

    let dateStop = new Date(newYear).getTime()
    let remainTime = Math.floor((dateStop - date.getTime()) / 1000)
    let days = Math.floor(remainTime / 60 / 60 / 24)

    return {day, hours, localTime, days, remainTime}
}

const declinationDay = (days) => {
    const value = Math.abs(days) % 100
    const lastValue = days % 10

    if((value > 10) && (value < 20)) return suffixes[2]
    if((lastValue > 1) && (lastValue < 5)) return suffixes[1]
    if(lastValue === 1) return suffixes[0]
    
    return suffixes[2]
}

const updateClock = () => {
    const {day, hours, localTime, days, remainTime} = getTime()

    let letter = declinationDay(days)

    if(remainTime < 0){
        clearInterval(interval)
    }

    time.textContent = `Текущее время: ${localTime}`
    dayNow.textContent = `Сегодня: ${daysOfWeek[day]}`

    if(hours >= 6 && hours < 10){
        greeting.textContent = 'Доброе утро'
    } else if(hours >= 10 && hours < 18){
        greeting.textContent = 'Добрый день'
    } else if(hours >= 18 && hours < 22){
        greeting.textContent = 'Добрый вечер'
    } else {
        greeting.textContent = 'Доброй ночи'
    }

    timeNext.textContent = `До нового года осталось ${days} ${letter}`
}

interval = setInterval(updateClock, 1000)