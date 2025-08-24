export const UpdateBill = ({ bill, updateNameInput, updatePriceInput, setUpdateNameInput, setUpdatePriceInput, confirmUpdateBill }) => {
  return (
    <div className="bill-container">
      <p className="total-bill">
        Total Bill:<span>{bill.wholeBill}</span>
      </p>

      {
        bill.people.map((item, i) => {
          return (
            <p key={i}>
              <input type="text" placeholder="name"
                value={updateNameInput[i]}
                onChange={(e) => {
                  const newArr = [...updateNameInput];
                  newArr[i] = e.target.value;
                  setUpdateNameInput(newArr);
                }} />
              <input type="number" placeholder="amount paid"
                value={updatePriceInput[i]} onChange={(e) => {
                  const newArr = [...updatePriceInput];
                  newArr[i] = e.target.value;
                  setUpdatePriceInput(newArr);
                }} />
            </p>
          )
        })
      }

      <button onClick={confirmUpdateBill}>Update Bill</button>
    </div>
  );
}