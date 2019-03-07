import React from "react";
import { Link } from "react-router-dom";

class HouseList extends React.Component {
  state = {
    houses: [],
    loading: true,
    error: null,
    searchCriteria: {
      price_min: "5000",
      price_max: "30000",
      sort: "location_country_asc",
      location_city: null,
      location_country: null,
      page: 1
    }
  };

  componentDidMount() {
    fetch(`http://localhost:4000/api/houses/`)
      .then(res => res.json())
      .then(houses => {
        this.setState({
          houses,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ error: "fetching data failed", loading: false });
      });
  }

  HandleValueChange = e => {
    const { name, value } = e.target;
    this.setState(
      {
        ...this.state,
        searchCriteria: {
          ...this.state.searchCriteria,
          [name]: value
        }
      },
      this.fetchHouses
    );
  };
  render() {
    const {
      houses,
      error,
      loading,
      searchCriteria: { price_min, price_max, sort, city, country, page }
    } = this.state;

    if (error) {
      return <p>{error}</p>;
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        <form>
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
            <label>city: </label>
            <select
              name="location_city"
              value={city}
              onChange={this.HandleValueChange}
            >
              <option value="select city">select city</option>
              <option value="Amsterdam">Amsterdam</option>
              <option value="Nijkerk">Nijkerk</option>
            </select>
          </div>
          <div>
            <label>price min: </label>
            <select
              name="price_min"
              value={price_min}
              onChange={this.HandleValueChange}
            >
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
              <option value="30000">30000</option>
              <option value="20000">20000</option>
              <option value="10000">10000</option>
              <option value="5000">5000</option>
            </select>
          </div>
          <div>
            <label>sort: </label>
            <select name="sort" value={sort} onChange={this.HandleValueChange}>
              <option value="location_country_asc">country ASC</option>
              <option value="location_country_desc">country DESC</option>
              <option value="price_value_asc">price ASC</option>
              <option value="price_value_desc">price DESC</option>
            </select>
          </div>
        </form>
        {houses.map(house => (
          <div key={house.id}>
            house {house.id} :
            <Link to={`/houses/${house.link}`}> {house.price_value}</Link>
          </div>
        ))}
      </div>
    );
  }
}

export default HouseList;
