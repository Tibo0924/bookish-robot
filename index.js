const history = [
  {
   event: 'MOT',
   date: '2018-3-10T00:00:00.000Z',
   data: {
    mileage: 69383,
    passed: true
   }
  },
  {
   event: 'MOT',
   date: '2017-3-10T00:00:00.000Z',
   data: {
    mileage: 58385,
    passed: true
   }
  },
  {
   event: 'MOT',
   date: '2016-4-10T00:00:00.000Z',
   data: {
    mileage: 46275,
    passed: true
   }
  },
  {
   event: 'MOT',
   date: '2016-4-10T00:00:00.000Z',
   data: {
    mileage: 46275,
    passed: false
   }
  },
  {
   event: 'MOT',
   date: '2015-4-10T00:00:00.000Z',
   data: {
    mileage: 37375,
    passed: true
   }
  },
  {
   event: 'MOT',
   date: '2014-4-10T00:00:00.000Z',
   data: {
    mileage: 28646,
    passed: true
   }
  }
 ]
 
 // Calculate the average annual mileage using the events in the timeline.
 const getAverageAnnualMileage = (dataArray) => (
  dataArray
  .filter(d => d.data.passed) // Filter out occasions when the car didn't pass
  .reduce((acc, b, i, array) => (
   i === array.length - 1 // No need to worry about the last element of the array
    ? acc
    : acc + (b.data.mileage - array[i + 1].data.mileage) // this year's mileage - last year's mileage
  ), 0) / (dataArray.filter(d => d.data.passed).length - 1)
 )
 console.log(getAverageAnnualMileage(history))

 // Fix badly formatted date string in history array.

 const makeISO8601date = (dateString) => dateString.split('-').map(s => s.length === 1 ? `0${s}` : s).join('-')
 // Milliseconds in a day.

 const MSinAday = 86400000
 // Calculate how many days have passed between valid 2 dates.
 const calculateDifferenceBetweenTwoDates = (date1, date2) => Math.floor((date1 - date2) / MSinAday)
 // Estimate the vehicle's current mileage by projecting from the most recent event using the average annual mileage.
 const estimateCurrentMileage = (data) => {
  const annualAverageMileage = getAverageAnnualMileage(data)
  const mostRecentDate = new Date(makeISO8601date(data[0].date))
  const daysPassed = calculateDifferenceBetweenTwoDates(Date.now(), mostRecentDate)
  return Math.round(annualAverageMileage * (daysPassed / 365) + data[0].data.mileage)
 }
 console.log(estimateCurrentMileage(history),'current mileage')
