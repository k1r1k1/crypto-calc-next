"use client"

import { getCryptos } from "@/app/serverActions/cmcActions";
import { Crypto, Currency } from "@/app/types";
import { ChangeEvent, useEffect, useState, lazy, Suspense } from "react";
import { useFormState } from "react-dom";

const ErrorToast = lazy(() => import('./ErrorToast'));

interface CalcInterface {
  cryptoData: [Crypto];
  fiatData: [Currency];
}

const Calculator = ({ cryptoData, fiatData }: CalcInterface) => {
  const [fiatState, setFiat] = useState('USD')
  const [fiatStateNumber, setFiatNumber] = useState(0)
  const [cryptoState, setCrypto] = useState('BTC')
  const [cryptoStateNumber, setCryptoNumber] = useState(1)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => { // fix ErrorToast
    setIsBrowser(typeof document !== "undefined")
  }, [])

  const [updatedCryptos, updateCryptos] = useFormState(getCryptos, cryptoData)

  const handleCryptoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCrypto(e.target.value)
  }

  const handleFiatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiat(e.target.value)
    updateCryptos(e.target.value)
  }

  const currentCrypto = updatedCryptos?.find((item: Crypto) =>
    item.symbol === cryptoState
  )

  const fiatSummary = (currentCrypto?.quote[fiatState]?.price || 0) * cryptoStateNumber
  // const cryptoSummary = fiatStateNumber / (currentCrypto?.quote[fiatState]?.price || 0)

  useEffect(() => {
    setFiatNumber(fiatSummary)
  }, [fiatSummary])

  const handleCryptoNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value || '0')
    setCryptoNumber(num)
    setFiatNumber((currentCrypto?.quote[fiatState]?.price || 0) * num)
  }

  const handleFiatNumber = (e: ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value || '0')
    setFiatNumber(num)
    setCryptoNumber(num / (currentCrypto?.quote[fiatState]?.price || 0))
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
              </select>
            </div>
            <div className="d-flex align-items-end mx-5 mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="cryptoAmount"
                value={cryptoStateNumber}
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
                defaultValue={fiatState}
              >
                {fiatData?.map(({ id, name, symbol }: Currency) => (
                  <option key={`select-2-${id}`} value={symbol}>{`[${symbol}]: ${name}`}</option>
                ))}
              </select>
            </div>
            <div className="d-flex align-items-end mx-5 mb-3">
              <input
                type="text"
                className="form-control"
                aria-describedby="fiatAmount"
                value={fiatStateNumber}
                onChange={handleFiatNumber}
              />
            </div>
          </div>

        </fieldset>
      </div>

      {(!cryptoData || !fiatData) && isBrowser && (
        <Suspense>
          <ErrorToast />
        </Suspense>
      )}

    </div>
    )
}

export default Calculator
