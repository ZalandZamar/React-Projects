export const prepareBill = (totalBillAmount, person, personBill, numPeople, sum, setStep) => {
    if (sum > totalBillAmount) {
      alert('the amounts are greater than total bill')
      return;
    }

    if (person.length < Number(numPeople)) {
      alert('please write down the names of people');
      return;
    }

    if (personBill.length < Number(numPeople)) {
      alert('please write down the amount paid by people.');
      return;
    }

    setStep('prepareBill');
  }