import React from "react";
class HouseDetails extends React.Component {
  render() {
    const { owner, rooms, price, id } = this.props;
    return (
      <div>
        {id}
        <p>{owner}</p>
        <p>{rooms}</p>
        <p>{price}</p>
      </div>
    );
  }
}
export default HouseDetails;
