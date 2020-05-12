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
            className="rounded"
            name="zipcode"
            id="zipcode"
            type="text"
            value={selectedOptionsRecord.zipcode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            className="rounded"
            name="radius"
            id="price"
            type="text"
            value={selectedOptionsRecord.price}
            onChange={handleInputChange}
          />
        </label>
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
