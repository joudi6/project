import React from "react";
import { Link } from "react-router-dom";

class HouseList extends React.Component {
  state = {
    houses: [],
    loading: true,
    error: null
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

  render() {
    const { houses, error, loading } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
    if (loading) {
      return <p>Loading...</p>;
    }
    return (
      <div>
        {houses.map(house => (
          <div key={house.id}>
            <Link to={`/houses/${house.id}`}>
              <p> {house.owner}</p>
              <p> {house.rooms}</p>
              <p> {house.price}</p>
              <p>_________________</p>
              <br />
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default HouseList;
