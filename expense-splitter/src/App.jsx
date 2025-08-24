import { useState, useEffect } from "react";
import { BillsDisplay } from "./components/BillsDisplay";
import { prepareBill } from "./components/PrepareBill";
import { ReadBill } from "./components/ReadBill";
import { UpdateBill } from "./components/UpdateBill";

function App() {
  const [step, setStep] = useState('');
  const [numPeople, setNumPeople] = useState(null);
  const [person, setPerson] = useState([]);
  const [personBill, setPersonBill] = useState([]);
  const [totalBillAmount, setTotalBillAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [allBillsArr, setAllBillsArr] = useState(JSON.parse(localStorage.getItem('bills')) || []);
  const [clickedBillIndex, setClickedBillIndex] = useState(null);
  const [updateNameInput, setUpdateNameInput] = useState([]);
  const [updatePriceInput, setUpdatePriceInput] = useState([]);
  let sum = 0;

  useEffect(() => {
    localStorage.setItem('bills', JSON.stringify(allBillsArr));
  }, [allBillsArr]);

  if (personBill.length > 0) {
    personBill.map(amountsPaid => {
      sum += Number(amountsPaid);
    });
  }

  const billDescription = () => {
    setStep('billDescription');
  }

  const peopleCount = () => {
    if (Number(totalBillAmount) <= 0) {
      alert('please add Total Bill');
      return;
    }

    setStep('peopleForm');
  }

  const totalBill = () => {
    setStep('totalBill');
  }

  const namesForm = () => {
    if (Number(numPeople) <= 0) {
      alert('add atleast one person');
      return;
    }

    setStep('namesForm');
  }

  const saveBill = () => {
    setAllBillsArr(prev => [
      ...prev,
      {
        description,
        wholeBill: totalBillAmount,
        people: person.map((name, i) => ({
          name,
          paid: personBill[i]
        }))
      }
    ]);

    setStep('saveBill');
  }

  const deleteBill = (i) => {
    const newItems = [...allBillsArr];

    newItems.splice(i, 1);
    setAllBillsArr(newItems);

    localStorage.setItem('bills', JSON.stringify(allBillsArr));
  }

  const prepareBillFun = (steps) => {
    if (step !== steps) return null;

    return (
      <div className="bill-container">

        < p className="total-bill" >Total Bill:&nbsp;&nbsp;
          <span>${totalBillAmount}</span>
        </p >
        {
          new Array(Number(numPeople)).fill(0).map((item, i) => {

            return (
              <p key={i} className="prepare-bill">
                {person[i]}: <span>${personBill[i]}</span>
              </p>
            );
          })
        }

        <button className="next-button" onClick={saveBill}>Save Bill</button>
      </div>
    )
  }

  const updateBill = (i) => {
    setClickedBillIndex(i);
    const selectedBill = allBillsArr[i];

    setUpdateNameInput(selectedBill.people.map(item => item.name));
    setUpdatePriceInput(selectedBill.people.map(item => item.paid));
    setClickedBillIndex(i);

    setStep('updateBill');
  }

  const confirmUpdateBill = () => {
    let sum = 0;
    const newArr = [...allBillsArr];
    newArr[clickedBillIndex].people.map((item, index) => {
      item.name = updateNameInput[index];
      item.paid = updatePriceInput[index];
      sum += Number(item.paid)
    });

    newArr[clickedBillIndex].wholeBill = sum;
    
    setAllBillsArr(newArr);
    setStep('BillUpdated');
  }

  const readUpdate = (i) => {
    setClickedBillIndex(i);
    setStep('readBill');
  }

  return (
    <>
      {
        step === '' &&
        <BillsDisplay
          allBillsArr={allBillsArr}
          step={step}
          steps="saveBill"
          billDescription={billDescription}
          deleteBill={deleteBill}
          readUpdate={readUpdate}
          updateBill={updateBill}
        />
      }

      {
        step === 'billDescription' &&
        <div className="bill-description-container">
          <textarea name="description" className="bill-description"
            placeholder="Add Bill Description" onChange={(event) => {
              setDescription(event.target.value);
            }}>
          </textarea>
          <button className="next-button" onClick={totalBill}>Next</button>
        </div>
      }

      {
        step === 'totalBill' &&
        <div className="total-bill-container">
          <input className="total-bill-input" type="number" placeholder="total bill" onChange={(event) => {
            setTotalBillAmount(event.target.value);
          }} />
          <button className="total-bill-next-button" onClick={peopleCount}>Next</button>
        </div>
      }

      {
        step === 'peopleForm' &&
        <div className="people-count-container">
          <input type="number" placeholder="how many people" className="people-count-input" onChange={(event) => {
            setNumPeople(event.target.value)
          }} />
          <button className="next-button" type="Submit"
            onClick={namesForm}>Next</button>
        </div>
      }

      {
        step === 'namesForm' &&
        <div className="namesForm-container">
          {
            new Array(Number(numPeople)).fill(0).map((item, i) => {
              return (
                <div key={i}>
                  <input type="text" placeholder="Name"
                    className="input-name" onChange={(event) => {
                      setPerson(prev => {
                        const updated = [...prev];
                        updated[i] = event.target.value;
                        return updated;
                      });
                    }} />
                  <input type="number" placeholder="Amount Paid"
                    className="amount-input" onChange={(event) => {
                      setPersonBill(prev => {
                        const updated = [...prev];
                        updated[i] = event.target.value;
                        return updated;
                      });

                    }} />
                </div>
              )
            })
          }

          <button className="prepare-bill-button"
            onClick={() => prepareBill(totalBillAmount, person, personBill, numPeople, sum, setStep)}>Prepare Bill
          </button>
        </div>
      }

      {
        prepareBillFun('prepareBill')
      }

      {
        step === 'saveBill' &&
        <BillsDisplay
          allBillsArr={allBillsArr}
          step={step}
          steps="saveBill"
          billDescription={billDescription}
          deleteBill={deleteBill}
          readUpdate={readUpdate}
        />
      }

      {
        step === 'readBill' &&
        <ReadBill allBillsArr={allBillsArr[clickedBillIndex]} setStep={setStep} />
      }

      {
        step === 'updateBill' &&
        <UpdateBill
          bill={allBillsArr[clickedBillIndex]}
          allBillsArr={allBillsArr}
          updateNameInput={updateNameInput}
          updatePriceInput={updatePriceInput}
          setUpdateNameInput={setUpdateNameInput}
          setUpdatePriceInput={setUpdatePriceInput}
          confirmUpdateBill={confirmUpdateBill}
        />
      }

      {
        step === 'BillUpdated' &&
        <BillsDisplay
          allBillsArr={allBillsArr}
          step={step}
          steps="saveBill"
          billDescription={billDescription}
          deleteBill={deleteBill}
          readUpdate={readUpdate}
          updateBill={updateBill}
        />
      }
    </>
  );
}

export default App