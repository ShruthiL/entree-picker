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
            className="rounded"
            name="zipcode"
            id="zipcode"
            type="text"
            value={selectedOptionsRecord.zipcode}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Radius:
          <input
            className="rounded"
            name="radius"
            id="radius"
            type="text"
            value={selectedOptionsRecord.radius}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Cuisine:
          <select id="cuisine" value={selectedOptionsRecord.cuisine} onChange={handleInputChange}>
            <option value=""></option>
            <option value="american">American</option>
            <option value="chinese">Chinese</option>
            <option value="cuban">Cuban</option>
            <option value="greek">Greek</option>
            <option value="indian">Indian</option>
            <option value="italian">Italian</option>
            <option value="mediterranean">Mediterranean</option>
            <option value="mexican">Mexican</option>
            <option value="thai">Thai</option>
          </select>
        </label>
    
        <div className="button-group">
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
