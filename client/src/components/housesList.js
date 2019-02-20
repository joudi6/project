import React from "react";
import houses from "../houses-data.json";
import House from "./houseDetails";
class HouseList extends React.Component {
  state = {
    houses
  };
  render() {
    console.log(this.state);
    const { houses } = this.state;
    const housesList =
      houses &&
      houses.map(house => {
        return (
          <House
            key={house.id}
            owner={house.owner}
            rooms={house.rooms}
            price={house.price}
          />
        );
      });
    return <div>{housesList}</div>;
    // <div>{this.state.houses[1].price}</div>;
  }
}
export default HouseList;
