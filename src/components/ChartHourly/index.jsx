import { useMemo, useState } from 'react'
import { Chart } from 'react-google-charts'

export default function ChartHourly ({ hourly }) {
  const [ticks, setTicks] = useState([])
  const data = useMemo(() => {
    const newTicks = []
    const items = hourly.slice(0, 6).map((item) => {
      newTicks.push(new Date(item.dt * 1000))
      return [new Date(item.dt * 1000), ~~item.temp, ~~item.temp ]
    })

    setTicks(newTicks)

    const columns = [
      { type: 'date', label: 'Hora' },
      { type: 'number', label: 'Temperatura' },
      { type: 'number', role: 'annotation' },
    ]

    return [columns, ...items]
  }, [hourly])
 
  return (
    <div className='w-100'>
      <Chart
        chartType="AreaChart"
        data={data}
        options={{
          height: 180,
          pointSize: 3,
          legend: { position: 'none' },
          curveType: 'function',
          hAxis: {
            format: 'HH:mm',
            gridlines: {
              color: 'transparent'
            },
            ticks,
          },
          vAxis: {
            textPosition: 'none',
            gridlines: {
              color: 'transparent',
              count: 4,
            }
          },
          tooltip: {
            trigger: 'none',
          },
          chartArea: { left: 30, top: 20, right: 30, bottom: 30 },
        }}
      />
    </div>
  )
}
