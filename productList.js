const mockJson = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football", id: '1' },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball", id: '2' },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball", id: '3' },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch", id: '4' },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5", id: '5' },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7", id: '6' }
  ];
  
  
  function splitDataSetToCats(dataSet) {
  
    if (dataSet.length < 1) return false;
  
    let result = {};
    let copy = dataSet.slice();
  
    while (copy.length) {
      let category = copy[0].category;
      result[category] = dataSet.filter(entry => entry.category === category);
      copy = copy.filter(entry => entry.category !== category);
    }
    return result;
  }
  
  function filterDataSetBy(dataSet, filterObj) {
    return dataSet.filter(entry => {
      for (let filter of Object.keys(filterObj)) {
        let match = entry[filter] === filterObj[filter];
        if (!match) return false;
      }
      return true;
    });
  }
  
  function searchDataSet(dataSet, filterText) {
    return dataSet.filter(entry => entry.name.toLowerCase().includes(filterText.toLowerCase().trim()));
  }
  
  
  class FilterableProductTable extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        filterText: '',
        inStockOnly: false,
        searchResult: false,
        inputTimeout : false,
        isLoading : false
      }
  
      this.getSearchResults = this.getSearchResults.bind(this);
      this.handleInput = this.handleInput.bind(this);
  
    }
  
    getSearchResults(filter) {
      console.log('fetching...');
      let dataSet = this.props.dataSet;
      // filterExample = { name : 'basketball', stocked : true };
      let inStockOnly = this.state.inStockOnly;
      console.log(inStockOnly);
      let filtered = inStockOnly ? filterDataSetBy(dataSet, { stocked: filter.inStockOnly }) : dataSet;
      let searchResult = searchDataSet(filtered, this.state.filterText);
      this.setState({ searchResult: splitDataSetToCats(searchResult) });
    }
  
  
  
    handleInput(e) {
      let target = e.target;
      let value = target.type === 'checkbox' ? target.checked : target.value;
      let name = target.name;
      let newFilter = { [name]: value };
  
      // * wait 1.5 seconds so we dont fetch searches the user doesn't actually want to make while typing.
      this.setState(newFilter, () => {
        //a callback is required so we only search when the filters are done updating
  
        //if there already is a timeout running, clear it.
        let existingTimeout = this.state.inputTimeout;
        if (existingTimeout) {
          clearTimeout(existingTimeout);
        }
  
        //The user is still typing within the wait period. update the search/timeout id.
        let timeout = setTimeout(() => {
          this.getSearchResults(newFilter);
          //search ran and there are no timeouts present. clear id.
          this.setState({ inputTimeout : false, isLoading : false});
        }, 1500);
        this.setState({ inputTimeout : timeout, isLoading : true });
      })
    }
  
    render() {
      const filterText = this.state.filterText;
      const inStockOnly = this.state.inStockOnly;
      const isLoading = this.state.isLoading;
      return (
        <div className='filterable-product-table'>
          <SearchBar
            inputHandler={this.handleInput}
            filterText={filterText}
            inStockOnly={inStockOnly}
          />
          <ProductTable isLoading={isLoading} filterText={filterText} searchResult={this.state.searchResult} />
        </div>
      )
    }
  }
  
  class SearchBar extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div className='search-bar'>
          <label>
            <input onChange={this.props.inputHandler} type="text" name='filterText' placeholder='Search...' value={this.props.filterText} />
          </label>
          <label className='d-block'>
            <input onChange={this.props.inputHandler} checked={this.props.inStockOnly} type="checkbox" name='inStockOnly' />
            <span className='ps-2'>Show in-stock only</span>
          </label>
        </div>
      )
    }
  }
  
  
  class ProductTable extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      let searchResult = this.props.searchResult;
      let filterText = this.props.filterText;
      let isLoading = this.props.isLoading;
      return (
        <div className='product-table'>
          <div>
            <h3 className='d-inline-block'>Name</h3>
            <h3 className='d-inline-block'>Price</h3>
          </div>
          {
            searchResult ? 
            Object.keys(searchResult).map(category => {
              return (
                <ProductCategoryRow key={category} categoryName={category} products={searchResult[category]} />
              )
            })
            : isLoading ? <LoadingSpinner />
            : filterText === '' ? 'Enter the name of the product to search for.'
            : 'No results.'
          }
        </div>
      )
    }
  }
  
  class ProductCategoryRow extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      let categoryName = this.props.categoryName;
      let products = this.props.products;
      return (
        <div className='product-category-row'>
          <h3>{categoryName}</h3>
          {
            products.map(product => {
              return (
                <ProductRow
                  key={product.id}
                  name={product.name}
                  price={product.price}
                />
              )
            })
          }
        </div>
      )
    }
  }
  
  
  class ProductRow extends React.Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      let name = this.props.name;
      let price = this.props.price;
      return (
        <div className='product-category-row'>
          <span className='product-row-name'>{name}</span>
          <span className='product-row-price'>{price}</span>
        </div>
      )
    }
  }
  
  function LoadingSpinner() {
    return (
      <div class="lds-dual-ring"></div>
    )
  }