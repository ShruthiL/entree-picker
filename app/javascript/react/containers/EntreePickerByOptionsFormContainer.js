import React, { useState, useEffect } from "react";
import { Redirect } from 'react-router-dom'

const EntreePickerByOptionsFormContainer = (props) => {
  const [ selectedOptionsRecord, setSelectedOptionsRecord] = useState({
    zipcode: '',
    radius: '',
    rating: '',
    cuisine: '',
    price: '',
    category: ''
  })
  const [ shouldRedirect, setShouldRedirect ] = useState(false)

  const handleInputChange = event => {
    setSelectedOptionsRecord({...selectedOptionsRecord, [event.currentTarget.id]: event.currentTarget.value})
  }

  const handleClearFields = () => {
    setselectedOptionsRecord({
      zipcode: null,
      radius: null,
      rating: null,
      cuisine: '',
      price: null,
      category: ''
    })
  }

  const handleClearForm = event => {
    event.preventDefault()
    handleClearFields()
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    console.log(selectedOptionsRecord)
    setShouldRedirect(true)
  }

  if (shouldRedirect) {
    return <Redirect
      to={{
        pathname: "/popular_entree",
        state: { selectedOptions: selectedOptionsRecord }
      }}
    />
  }

  return (
    <div>
      <form className="callout" onSubmit={handleFormSubmit}>
        <label>
          Zipcode:
          <input
            className="rounded margin-auto"
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
            className="rounded margin-auto"
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
          <input className="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>

  );
};

export default EntreePickerByOptionsFormContainer;
