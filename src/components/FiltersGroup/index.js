import {BsSearch} from 'react-icons/bs'
import './index.css'
const FiltersGroup = props =>{
    


    const renderCategoriesList = () => {
        const {categoryOptions} = props
    
        return categoryOptions.map(category => {
          const {changeCategory, activeCategoryId} = props

          const onClickCategoryItem = () => {
            changeCategory(category.categoryId)
        }

          const isActive = category.categoryId === activeCategoryId
          const categoryClassName = isActive
            ? `category-name active-category-name`
            : `category-name`
    
          return (
            <li
              className="category-item"
              key={category.categoryId}
              onClick={onClickCategoryItem}
            >
              <p className={categoryClassName}>{category.name}</p>
            </li>
          )
        })
      }

      const renderSearchInput = () => {
        const {searchInput} = props
    
        return (
          <div className="search-input-container">
            <input
              value={searchInput}
              type="search"
              className="search-input"
              placeholder="Search"
              onChange={onChangeSearchInput}
             
            />
            <BsSearch className="search-icon" />
          </div>
        )
      }


    const renderProductCategories = () =>{
        return (
            <>
            <h1 className="category-heading">Category</h1>
            <ul className="categories-list">{renderCategoriesList()}</ul>
          </>
        )
        
    }

   
      const onChangeSearchInput = event => {
        const {changeSearchInput} = props
        changeSearchInput(event.target.value)
      }


    const {clearFilters} = props

    return (
        <div className="filters-group-container">
         {renderSearchInput()}
        {renderProductCategories()}
        
        <button
          type="button"
          className="clear-filters-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>
    )
}
export default FiltersGroup