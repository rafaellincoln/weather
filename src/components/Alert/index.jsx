const AlertList = ({ alerts = [] }) => {
  return alerts.map((item) => {
    return (
      <div key={item.event + item.start} className="border-top">
        <p className="size-24 cinnabar">{item.event}</p>
        <p className="size-16 color-text">{item.sender_name}</p>
        <p className="size-16 color-text mt-12">{item.description}</p>
      </div>
    )
  })
}

export default function Alert ({ alerts }) {
  return (
    <div className="mt-12 mh-20">
      <AlertList
        alerts={alerts}
      />
    </div>
  )
}
