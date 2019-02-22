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
          house,
          loading: false
        });
      })
      .catch(() => {
        this.setState({ error: "fetching data failed", loading: false });
      });
  }
  render() {
    const { owner, rooms, price } = this.state.house;
    const { error, house, loading } = this.state;
    if (loading) return <p>Loading...</p>;
    if (error) return <p>ERROR: {error}</p>;
    if (house) {
      return (
        <div>
          <p>owner: {owner}</p>
          <p>rooms: {rooms}</p>
          <p>price: {price}</p>
          <br />
        </div>
      );
    }
  }
}

export default HouseDetails;
