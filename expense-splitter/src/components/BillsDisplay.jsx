export const BillsDisplay = ({ allBillsArr, billDescription, deleteBill, readUpdate, updateBill }) => {

  return (
    <div className="bills-container">
      {
        allBillsArr.length > 0 &&
        allBillsArr.map((item, i) => {
          return (
            <div key={i} className="bills-display-container">
              <p className="decription-paragraph">{item.description}</p>
              <div className="bill-buttons-container">
                <button onClick={() => readUpdate(i)}>
                  <img src="../../public/view.png" alt="view image" 
                    className="view-image" />
                </button>

                <button onClick={() => updateBill(i)}>
                  <img src="../../public/edit.png" alt="edit image" 
                   className="edit-image" />
                </button>

                <button onClick={() => deleteBill(i)}>
                  <img src="../../public/delete.png" alt="delete image" 
                    className="delete-image" />
                </button>
              </div>
            </div>
          )
        })
      }

      <div className="add-button-container">
        <button className="add-button" onClick={billDescription}>
          Add
        </button>
      </div>
    </div>
  )
}