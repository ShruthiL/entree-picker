import React from 'react'
import _ from "lodash"

const ErrorList = ({errors}) => {
  const errantFields = Object.keys(errors)
  if (errantFields.length > 0) {
    let index = 0
    const errorArray = errantFields.map((field) => {
      index++
      return (
        <li key={index}>{_.capitalize(field)} {errors[field]}</li>
      )
    })

    return (
      <div className="errorText">
        <ul>
          {errorArray}
        </ul>
      </div>
    )
  } else {
    return ""
  }

}

export default ErrorList
