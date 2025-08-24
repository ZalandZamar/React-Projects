export const ReadBill = ({ allBillsArr, setStep }) => {
  return (
    <div className="bill-container">
      < p className="total-bill" > Total Bill:&nbsp;&nbsp;
        <span>${allBillsArr.wholeBill}</span>
      </p >

      {
        allBillsArr.people.map((item, i) => {
          return (
            <p key={i} className="prepare-bill">
              {item.name}: <span>${item.paid}</span>
            </p>
          )
        })
      }

      <button className="close-bill" onClick={() => {
        setStep('saveBill');
      }}>Close</button>
    </div>
  )
}