"use client"

import { getCryptos } from "@/app/serverActions/cmcActions";
import { Crypto, Currency } from "@/app/types";
import { ChangeEvent, useEffect, useState, lazy, Suspense } from "react";
import { useFormState } from "react-dom";
import Select from "../Select";

const Toast = lazy(() => import('../Toast'));

interface CalcInterface {
  cryptoData: [Crypto];
  fiatData: [Currency];
  pairs?: string[] | string;
}

const Calculator = ({ cryptoData, fiatData, pairs }: CalcInterface) => {
  const defaultCrypto = pairs && pairs[0] || 'BTC'
  const defaultFiat = pairs && pairs[1] || 'USD'

  const [updatedCryptos, updateCryptos] = useFormState(getCryptos, cryptoData)

  const [fiatState, setFiat] = useState(defaultFiat)
  const [cryptoState, setCrypto] = useState(defaultCrypto)
  const [cryptoStateNumber, setCryptoNumber] = useState(1)

  const currentCrypto = updatedCryptos?.find((item: Crypto) =>
    item.symbol === cryptoState
  )
  const fiatSummary = (currentCrypto?.quote[fiatState]?.price || 0) * cryptoStateNumber

  const [fiatStateNumber, setFiatNumber] = useState(fiatSummary)
  const [showCopyToast, setCopyToast] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCryptoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const current = updatedCryptos?.find((item: Crypto) =>
      item.symbol === e.target.value
    )
    setCrypto(e.target.value)
    setFiatNumber((current?.quote[fiatState]?.price || 0) * cryptoStateNumber)
  }

  const handleFiatChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFiat(e.target.value)
    updateCryptos(e.target.value)
  }

  const handleCryptoNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return
    const num = Number(e.target.value || '0')
    setCryptoNumber(num)
    setFiatNumber((currentCrypto?.quote[fiatState]?.price || 0) * num)
  }

  const handleFiatNumber = (e: ChangeEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.target.value))) return
    const num = Number(e.target.value || '0')
    setFiatNumber(num)
    setCryptoNumber(num / (currentCrypto?.quote[fiatState]?.price || 0))
  }

  const handleCopyClick = () => {
    if (!navigator?.clipboard) return
    navigator.clipboard.writeText(`${window.location.origin}/calc/${cryptoState}-${fiatState}`)
    setCopyToast(true)
    setTimeout(() => setCopyToast(false), 6000)
  }

  useEffect(() => { // fix Toast ref
    setIsBrowser(typeof document !== "undefined")
  }, [])

  useEffect(() => {
    setFiatNumber(parseFloat(fiatSummary.toFixed(8))) // round number
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedCryptos])

  useEffect(() => {
    const currentCryptoFiat = Object.keys(currentCrypto?.quote || {})[0]
    if (fiatState !== currentCryptoFiat && currentCryptoFiat) {
      // if loading && no errors
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [currentCrypto, fiatState])

  return (
    <div className="container px-4 py-5 my-5">

      <div className={`card ${isLoading ? 'opacity-50 pe-none' : ''}`}>
        <fieldset className="card-body">
          <legend>Cryptocurrency calculator</legend>
          <label className="label mb-4 mx-2">Pick currencies, change values</label>

          <div className="d-flex">
            <Select
              handleChange={handleCryptoChange}
              items={updatedCryptos}
              value={cryptoState}
              label="Pick crypto"
            />
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
            <Select
              handleChange={handleFiatChange}
              items={fiatData}
              value={fiatState}
              label="Pick fiat currency"
            />
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

        <button className="btn w-25" type="button" onClick={handleCopyClick}>
          Share
        </button>
      </div>

      {(!cryptoData || !fiatData || !updatedCryptos) && isBrowser && (
        <Suspense>
          <Toast
            type="ERROR"
            message="Unable to get data from API"
          />
        </Suspense>
      )}

      {showCopyToast && (
        <Suspense>
          <Toast
            type="INFO"
            message="Link copied to clipboard!"
          />
        </Suspense>
      )}

    </div>
    )
}

export default Calculator
