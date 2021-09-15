//Tutorial ref: https://www.youtube.com/channel/UCjX0FtIZBBVD3YoCcxnDC4g

class LifeClock{
    constructor(element){
        this.element = element; // ensures the object we create from the class has a reference to the values in the container.
    }

    //Returns User Age In Years
    getYears(ms){
        return Math.floor(ms / (1000 * 60 * 60 * 24) / 365)
    }// hi

    //Returns User Age In Weeks
    getWeeks(ms){
        return Math.floor((ms / (1000 * 60 * 60 * 24) )/ 7) // (ms / (1000 * 60 * 60 * 24) ) == Total Days Lived
    } // this is a test and another aef

    getTimeParts(){
        const now = new Date();
        const myBday = new Date(1994,2,2);
        const myAgeInMs = now.getTime() - myBday.getTime(); //In miliseconds
        const myAgeInYears = this.getYears(myAgeInMs)
        const myAgeInWeeks = this.getWeeks(myAgeInMs)
        const currentWeekThisYear = (myAgeInWeeks % (myAgeInYears * 52)) + 1

        return {
            years: myAgeInYears,
            weeks: myAgeInWeeks,
            currentWeekThisYear: currentWeekThisYear
        }
    }

    update(){
        const parts = this.getTimeParts();
        const timeFormatted = `Year ${parts.years}, Week ${ parts.currentWeekThisYear }`;
        this.element.querySelector(".clock-time").textContent = timeFormatted;
    }

    start(){
        this.update();
        setInterval(() =>{
            this.update();
        }, 500)
    }
}

class CountDown{
    constructor(element){
        this.element = element;
    }

    timeLeft(start, end) {
        var diff = end - start; 
        var hours   = Math.floor(diff / 3.6e6);
        var minutes = Math.floor((diff % 3.6e6) / 6e4);
        var seconds = Math.floor((diff % 6e4) / 1000);

        return{
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    getTimeParts(){
        const now = new Date();
        const nextSunday = new Date();
        nextSunday.setDate(nextSunday.getDate() + (((7 - nextSunday.getDay()) % 7) || 7));
        nextSunday.setHours(0); nextSunday.setMinutes(0); nextSunday.setSeconds(0);
        //const s = `${this.timeLeft(now, nextSunday).hours} hours, ${this.timeLeft(now, nextSunday).minutes} minutes, ${this.timeLeft(now, nextSunday).seconds} seconds`
        return{
            hours: this.timeLeft(now, nextSunday).hours,
            minutes: this.timeLeft(now, nextSunday).minutes,
            seconds: this.timeLeft(now, nextSunday).seconds
        }
    }

    update(){
        const parts = this.getTimeParts();
        const timeFormatted = `${parts.hours} HOURS, ${parts.minutes} MINUTES, ${parts.seconds} SECONDS, REMAIN THIS WEEK`;
        
        this.element.querySelector(".countdown-timer").textContent = timeFormatted;
    }

    start(){
        this.update();
        setInterval(() =>{
            this.update();
        }, 500)
    }  

}

class Timer{
    constructor(element){
        this.element = element;
    }

    timeLeft(start, end) {
        var diff = end - start; 
        var hours   = Math.floor(diff / 3.6e6);
        var minutes = Math.floor((diff % 3.6e6) / 6e4);
        var seconds = Math.floor((diff % 6e4) / 1000);

        return{
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }

    getTimeParts(start){
        const end = new Date();
        end.setMinutes(end.getMinutes() + 20);

        //const s = `${this.timeLeft(now, nextSunday).hours} hours, ${this.timeLeft(now, nextSunday).minutes} minutes, ${this.timeLeft(now, nextSunday).seconds} seconds`
        return{
            minutes: this.timeLeft(start, end).minutes,
            seconds: this.timeLeft(start, end).seconds
        }
    }

    update(start){
        const parts = this.getTimeParts(start);
        this.element.querySelector(".timer-pomodoro").textContent = `${parts.minutes}:${parts.seconds}`;
    }

    start(start){
        this.update(start);
        setInterval(() =>{
            this.update(start);
        }, 1000)
    }

}

//Clock Object
const clockElement = document.querySelector(".clock");
const clockObject = new LifeClock(clockElement);
clockObject.start()

//Countdown Object
const countdownElement = document.querySelector(".countdown");
const countdownObject = new CountDown(countdownElement);
countdownObject.start()

//Timer Object
// const timer = document.querySelector(".timer");
// const timerObject = new Timer(timer);
// const now = new Date();
// timerObject.start(now);

