"use client"

import { getCryptos } from "@/app/serverActions/cmcActions";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";

type Currency = {
  id: number;
  name: string;
  symbol: string;
}

type Crypto = Currency & {
  quote: {
    USD: {
      price: number;
    }
  }
}

type Status = {
  error_code: number | null;
  error_message: string | null;
}

interface CalcInterface {
  // cryptoData: [Crypto];
  fiatData: [Currency];
  // cryptoStatus: Status;
  fiatStatus: Status;
}

const Calculator = ({ fiatData, fiatStatus }: CalcInterface) => {
  const [fiatState, setFiat] = useState('USD')
  const [fiatStateNumber, setFiatNumber] = useState(1)
  const [cryptoState, setCrypto] = useState('BTC')
  const [cryptoStateNumber, setCryptoNumber] = useState(1)

  const [updatedCryptos, updateCryptos] = useFormState(getCryptos, null)

  useEffect(() => {
    updateCryptos(fiatState)
  }, [fiatState, updateCryptos])

  const handleCryptoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCrypto(e.target.value)
  }

  const handleFiatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiat(e.target.value)
  }

  const currentCrypto = updatedCryptos?.find((item: Crypto) =>
    item.symbol === cryptoState
  )

  const cryptoSummary = (currentCrypto?.quote[fiatState]?.price || 1) * cryptoStateNumber
  const fiatSummary = fiatStateNumber / (currentCrypto?.quote[fiatState]?.price || 1)

  const handleCryptoNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setCryptoNumber(Number(e.target.value || '0'))
    // setFiatNumber((currentCrypto?.quote[fiatState]?.price || 1) * cryptoStateNumber)
  }

  const handleFiatNumber = (e: ChangeEvent<HTMLInputElement>) => {
    setFiatNumber(Number(e.target.value || '0'))
    // setCryptoNumber(fiatStateNumber / currentCrypto?.quote[fiatState]?.price || 1)
  }

  return (
    <div className="container px-4 py-5 my-5">

      <div className="card">
        <fieldset className="card-body">
          <legend>Cryptocurrency calculator</legend>
          <label className="label mb-4 mx-2">Pick currencies, change values</label>

          <div className="d-flex">
            <div className="mb-3 w-25">
              <label htmlFor="disabledSelect" className="form-label">Pick crypto</label>
              <select
                id="select"
                className="form-select"
                aria-label="Default select example"
                onChange={handleCryptoChange}
                defaultValue={cryptoState}
              >

                {updatedCryptos?.map(({ id, name, symbol }: Crypto) => (
                  <option key={`select-1-${id}`} value={symbol}>{`[${symbol}]: ${name}`}</option>
                ))}

                <option value="BTC">[BTC]: Bitcoin</option>
              </select>
            </div>
            <div className="d-flex align-items-end mx-5 mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="cryptoAmount"
                defaultValue={fiatStateNumber}
                onChange={handleCryptoNumber}
              />
            </div>
          </div>

          <div className="d-flex">
            <div className="mb-3 w-25">
              <label htmlFor="disabledSelect" className="form-label">Pick fiat</label>
              <select
                id="select"
                className="form-select"
                aria-label="Default select example"
                onChange={handleFiatChange}
                defaultValue={fiatStateNumber}
              >

                {fiatData.map(({ id, name, symbol }: Currency) => (
                  <option key={`select-2-${id}`} value={symbol}>{`[${symbol}]: ${name}`}</option>
                ))}

                <option value="0">Open this select menu</option>
              </select>
            </div>
            <div className="d-flex align-items-end mx-5 mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="fiatAmount"
                defaultValue={cryptoSummary}
                onChange={handleFiatNumber}
              />
            </div>
          </div>

        </fieldset>
      </div>

      {/* {loading && <span>Loading...</span>}*/}
      {!!fiatStatus.error_code && (<span className="text-danger">{fiatStatus.error_message}</span>)}
    </div>
    )
}

export default Calculator
