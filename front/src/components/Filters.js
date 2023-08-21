import React, {useState, useEffect} from 'react'

import { ReactComponent as Filter } from '../assets/filter.svg'

const Filters = ({productsGetFunction}) => {

    let [categories, setCategories] = useState([])

    useEffect(() => {
        getCategories();
    });

    let getCategories = async () => {
        let response = await fetch('http://127.0.0.1:8000/categories');
        let data = await response.json();
        setCategories(data);
    }

  return (
    <div className='mb-1'>
        <div className='d-flex flex-row justify-content-center align-items-center mb-3'>
            <Filter />
            <h2 className='mx-1 mt-1'>Filters</h2>
        </div>
        <form onSubmit={productsGetFunction}>
            <div>
                <h4>Categories:</h4>
                <select name="categories" id="categories" className='form-control mb-3'>
                    <option value=''>Choose Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.category_name}>{category.category_name}</option>
                    ))}
                </select>
            </div>

            <div>
                <h4>Price:</h4>
                <div>
                    <div>
                        <label htmlFor="from_price">From:</label>
                        <input type="number" name="from_price" id='from_price' className="form-control" defaultValue={0} />
                    </div>
                    <div>
                        <label htmlFor="to_price">To:</label>
                        <input type="number" name="to_price" id='to_price' className="form-control" defaultValue={0} />
                    </div>
                </div>
            </div>

            <button className='w-100 btn btn-primary mt-3'>Filter</button>
        </form>
    </div>
  )
}

export default Filters