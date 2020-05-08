import React, { useState, useEffect } from "react";

const EntreePickerByOptionsFormContainer = (props) => {
  const [ selectedOptionsRecord, setSelectedOptionsRecord] = useState({
    zipcode: '',
    radius: '',
    rating: '',
    cuisine: '',
    price: '',
    category: ''
  })

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
          Rating:
          <input
            className="rounded"
            name="rating"
            id="rating"
            type="text"
            value={selectedOptionsRecord.rating}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Cuisine:
          <input
            className="rounded"
            name="cuisine"
            id="cuisine"
            type="text"
            value={selectedOptionsRecord.cuisine}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Price:
          <input
            className="rounded"
            name="price"
            id="price"
            type="text"
            value={selectedOptionsRecord.price}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <select id="category" value={selectedOptionsRecord.category} onChange={handleInputChange}>
            <option value=""></option>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
            <option value="vegan">Vegan</option>
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
