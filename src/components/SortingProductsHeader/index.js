import {BsFilterRight} from 'react-icons/bs'
import './index.css'
const SortingProductsHeader=(props)=>{
    const {sortOptions,sortByOptions,updateActiveOptionId} = props

    const onChangeSortby = event => {
        updateActiveOptionId(event.target.value)
      }
    
    return(
        <div className="products-header">
      <h1 className="products-list-heading">All Products</h1>
      <div className="sort-by-container">
        <BsFilterRight className="sort-by-icon" />
        <h1 className="sort-by">Sort by</h1>
        <select
          className="sort-by-select"
          value={sortOptions}
          onChange={onChangeSortby}
        >
          {sortByOptions.map(eachOption => (
            <option
              key={eachOption.optionId}
              value={eachOption.optionId}
              className="select-option"
            >
              {eachOption.displayText}
            </option>
          ))}
        </select>
      </div>
    </div>
    )
}
export default SortingProductsHeader