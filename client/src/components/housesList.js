import React from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");

class HouseList extends React.Component {
  state = {
    houses: [],
    loading: true,
    error: null,
    total: 0,
    perPage: 0,
    activePage: 0,
    searchCriteria: {
      price_min: "0",
      price_max: "30000",
      sort: "location_country_asc",
      location_country: "Netherlands",
      page: 1
    }
  };

  componentDidMount() {
    const { searchCriteria } = this.state;
    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const value = searchCriteria[field];
        if (value !== null && value !== " ") {
          query.push(`${field}=${encodeURI(value)}`);
        }
        return query;
      }, [])
      .join("&");
    this.props.history.replace(
      this.props.location.pathname + "?" + queryString
    );
    return fetch(`http://localhost:4000/api/houses?${queryString}`)
      .then(res => res.json())
      .then(({ houses, perPage, total }) => {
        this.setState({
          houses,
          total,
          perPage,
          error: null,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ error: "fetching data failed", loading: false });
      });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { searchCriteria } = this.state;
    const queryString = Object.keys(searchCriteria)
      .reduce((query, field) => {
        const value = searchCriteria[field];
        if (value !== null && value !== " ") {
          query.push(`${field}=${encodeURI(value)}`);
        }
        return query;
      }, [])
      .join("&");
    this.props.history.replace(
      this.props.location.pathname + "?" + queryString
    );

    return fetch(`http://localhost:4000/api/houses?${queryString}`)
      .then(res => res.json())
      .then(({ houses, perPage, total }) => {
        this.setState({
          houses,
          total,
          perPage,
          error: null,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          error: "fetching data failed",
          loading: false
        });
      });
  };

  HandleValueChange = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      searchCriteria: {
        ...this.state.searchCriteria,
        [name]: value
      }
    });
  };
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  render() {
    const {
      houses,
      error,
      total,
      perPage,
      loading,
      searchCriteria: { price_min, price_max, sort, country, page }
    } = this.state;
    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>country: </label>
              <select
                name="location_country"
                value={country}
                onChange={this.HandleValueChange}
              >
                <option value="select country">select country</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
            <div>
              <label>price min: </label>
              <select
                name="price_min"
                value={price_min}
                onChange={this.HandleValueChange}
              >
                <option value="0">0</option>
                <option value="5000">5000</option>
                <option value="10000">10000</option>
                <option value="20000">20000</option>
                <option value="30000">30000</option>
              </select>
            </div>
            <div>
              <label>price max: </label>
              <select
                name="price_max"
                value={price_max}
                onChange={this.HandleValueChange}
              >
                <option value="40000">40000</option>
                <option value="50000">50000</option>
                <option value="60000">60000</option>
                <option value="70000">70000</option>
              </select>
            </div>
            <div>
              <label>sort: </label>
              <select
                name="sort"
                value={sort}
                onChange={this.HandleValueChange}
              >
                <option value="location_country_asc">country ASC</option>
                <option value="location_country_desc">country DESC</option>
                <option value="price_value_asc">price ASC</option>
                <option value="price_value_desc">price DESC</option>
              </select>
            </div>
            <input type="submit" name="submit_filtering" value="search" />
          </form>
        </div>
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
        {houses.length === 0 ? (
          <div>no houses yet</div>
        ) : (
          houses.map(house => (
            <div key={house.id}>
              <Link to={`/houses/${house.id}`}>
                <p> house N.{house.id}</p>
                <p> price:{house.price_value}</p>
                <p> country: {house.location_country}</p>
                <p> date:{house.market_date}</p>
                <p> size-area:{house.size_living_area}</p>
              </Link>
              <br />
            </div>
          ))
        )}
        <div>
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={perPage}
            totalItemsCount={total}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default HouseList;
