
import { differenceInBusinessDays, sub } from 'date-fns'
import './App.css';

function App() {


  const smallClockTicks = 10  //keep divisible by 5 for 5 business days in a week - keeps it in alignment with next clock
  const middleClockTicks = 12 // represents how many weeks - ideally keep divisible by 4 to make easy matches with large clock
  const largeClockTicks = 12 // represents how many months

  const generateClockTicks = (clockTicks, clockType) => {
    let ticks = [];
    let rotateDeg = 0;
    let baseTickRotation = 360/clockTicks

    for(let i = 1; i <= clockTicks; i ++) {
      ticks.push(
        <div 
          className={`tick number-${i} ${clockType}//`}  
          style={{
            transform: `rotate(${rotateDeg}deg)`
          }}
        >
          {i}
        </div>

        )
      rotateDeg = rotateDeg + baseTickRotation
    }
    return ticks

  }


    const now = new Date()

    const fourDaysAgo = sub(now, {days: 4})

    const oneWeekAgo = sub(now, { days: 7 })
    const twoWeeksAgo = sub(now, { days: 14 })
    const threeWeeksAgo = sub(now, {days: 21})
    const fourWeeksAgo = sub(now, {days: 28})
    const sixWeeksAgo = sub(now, {days: 42})

    const thirtyDaysAgo = sub(now, { days: 30 })
    const oneMonthAgo = sub (now, {months: 1})
    const threeMonthsAgo = sub (now, {months: 3})
    const sixMonthsAgo = sub (now, {months: 6})


    const aYearAgo = sub(now, {years: 1})


//
    const businessDays = differenceInBusinessDays(now, oneMonthAgo)


    const smallClockRotation = () => {
      const baseTickRotation = 360/smallClockTicks  // how many degrees based on how many ticks
      const rotation = businessDays * baseTickRotation // base rotation off of how many business days pass
      return {transform: `rotate(-${rotation}deg)`}
    }

    const middleClockRotation = () => {
      const baseTickRotation = 360/middleClockTicks  // how many degrees based on how many ticks
      const weeks = businessDays / 5 // calculate how many weeks that passed
      // debugger
      const rotation = weeks * baseTickRotation // calculate rotation based on how many weeks passed
      return {transform: `rotate(-${rotation}deg)`}
    }


    const largeClockRotation = () => {
      const baseTickRotation = 360 / largeClockTicks // how many degrees
      const months = businessDays / 20 // may need edge case handling for months with more than 20 business days

      const rotation = months * baseTickRotation // increase rotation by one baseTickRotation for every 20 business days
      return { transform: `rotate(-${rotation}deg)` }

    }

  return (
    <div className="App">
      <div className="large-clock" style={largeClockRotation()}>
      {generateClockTicks(largeClockTicks, "large-clock")}
      </div>
      <div className="middle-clock" style={middleClockRotation()}>
        {generateClockTicks(middleClockTicks, "middle-clock")}
      </div>
      <div className="small-clock" style={smallClockRotation()}>
        {generateClockTicks(smallClockTicks, "small-clock")}
      </div>
    </div>
  );
}

export default App;
