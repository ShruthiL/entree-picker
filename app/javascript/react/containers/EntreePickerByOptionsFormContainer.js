import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'

const EntreePickerByOptionsFormContainer = (props) => {
  const [ selectedOptionsRecord, setSelectedOptionsRecord] = useState({
    zipcode: '',
    price: ''
  })
  const [ shouldRedirect, setShouldRedirect ] = useState(false)

  const handleInputChange = event => {
    setSelectedOptionsRecord({...selectedOptionsRecord, [event.currentTarget.id]: event.currentTarget.value})
  }

  const handleClearFields = () => {
    setSelectedOptionsRecord({
      zipcode: '',
      price: ''
    })
  }

  const handleClearForm = event => {
    event.preventDefault()
    handleClearFields()
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect
      to={{
        pathname: "/picked_entree",
        state: { selectedOptions: selectedOptionsRecord }
      }}
    />
  }

  return (
    <div className="callout">
      <form onSubmit={handleFormSubmit}>
        <label>
          Zipcode:
          <input
            name="zipcode"
            id="zipcode"
            type="text"
            value={selectedOptionsRecord.zipcode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
        </label>
          <select
            id="price"
            name="price"
            value={selectedOptionsRecord.price}
            onChange={handleInputChange}>
            <option value=""></option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
            <option value="4">$$$$</option>
            <option value="5">$$$$$</option>
          </select>

        <div className="button-group button-margin-top">
          <button className="button" onClick={handleClearForm}>
            Clear
          </button>
          <button className="button" type="submit" value="Submit">Submit</button>
        </div>
      </form>
    </div>

  );
};

export default EntreePickerByOptionsFormContainer;
