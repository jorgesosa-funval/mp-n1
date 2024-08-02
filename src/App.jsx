import React, { useEffect, useState } from 'react'

const emptyValues = {
  tip: 0,
  bill: 0,
  people: 1
}
const emptyTotals = {
  totalTip: 0,
  totalAmount: 0
}


export default function App() {
  const [values, setValues] = useState(emptyValues);
  const [totals, setTotals] = useState(emptyTotals);

  function handleInput(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function reset() {
    setTotals(emptyTotals)
    setValues(emptyValues)
  }

  useEffect(() => {
    const { bill, tip, people } = values;

    if (bill > 0 && tip > 0 && people > 0) {

      const totalTip = (parseFloat(bill) * (parseFloat(tip) / 100)) / parseInt(people);
      const totalAmount = (parseFloat(bill) / parseInt(people)) + totalTip

      setTotals({ totalTip, totalAmount });

    }

  }, [values])

  return (
    <>
      <header><img src="./images/logo.svg" alt="" /></header>
      <div class="general-wrapper">
        <div class="data-wrapper">
          <h1>Bill</h1><label for="input-bill">
            <input class="input-bill" name='bill' id="input-bill" type="number" value={values.bill} min="0" onChange={handleInput} />
          </label>
          <h2>Select Tip %</h2>

          <ul>
            {TipValues.map(tipvalue =>

              <li id="percentage-5" key={tipvalue}>
                <button
                  type="button"
                  onClick={handleInput}
                  name='tip'
                  class={`percentage-button ${values.tip === tipvalue && 'active'}`}
                  value={tipvalue}>
                  {tipvalue}%
                </button>
              </li>
            )}

            <li>
              <input type="number" placeholder="Custom" onChange={handleInput} name='tip' id="custom-percentage-button" class="percentage-button" />
            </li>
          </ul>
          <h2>Number of People</h2><label for="input-people">
            <input id="input-people" class="input-people" type="number" value={values.people} min="1" name='people' onChange={handleInput} />
          </label>
        </div>
        <div class="result-wrapper">
          <div class="result-txt">
            <div class="text-amount">
              <div>
                <h2>Tip Amount</h2>
                <p>/ person</p>
              </div>
              <h3>$<span id="tip-amount">{totals.totalTip}</span></h3>
            </div>
            <div class="total-amount">
              <div>
                <h2>Total</h2>
                <p>/ person</p>
              </div>
              <h3>$<span id="total">{totals.totalAmount}</span></h3>
            </div>
          </div><button type="button" id="reset-button" class="reset-button" onClick={reset} >RESET</button>
        </div>
      </div>

    </>
  )
}
const TipValues = [
  '5',
  '10',
  '15',
  '25',
  '50'
]