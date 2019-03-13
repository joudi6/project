import React from "react";

class HouseDetails extends React.Component {
  state = {
    house: {},
    loading: true,
    error: null
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    fetch(`http://localhost:4000/api/houses/${id}`)
      .then(res => res.json())
      .then(house => {
        this.setState({
          house: house[0],
          loading: false
        });
      })
      .catch(() => {
        this.setState({ error: "fetching data failed", loading: false });
      });
  }
  render() {
    const { error, house, loading } = this.state;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error}</p>;

    if (house) {
      return (
        <div>
          <p> house N.{house.id}</p>
          <p> price:{house.price_value}</p>
          <p> country: {house.location_country}</p>
          <p> date:{house.market_date}</p>
          <p> size-area:{house.size_living_area}</p>
        </div>
      );
    }
  }
}

export default HouseDetails;
