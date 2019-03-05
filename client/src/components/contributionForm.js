import React from "react";
class Contribute extends React.Component {
  state = {
    errors: null,
    report: null
  };
  onSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:4000/api/houses`, {
      method: "POST",
      body: this.HouseInput.value,
      headers: { "content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        data.error
          ? this.setState({ errors: data.error })
          : this.setState({ report: data, errors: null });
      })
      .catch(error => {
        this.setState({ errors: error.message });
      });
  };
  render() {
    const { errors, report } = this.state;
    return (
      <div>
        <form>
          <textarea
            placeholder="insert houses info"
            style={{ width: "400px", height: "300px" }}
            ref={elem => {
              this.HouseInput = elem;
            }}
          />
          <input type="submit" value="submit" onClick={this.onSubmit} />
        </form>
        {errors && <div>Error: {errors}</div>}
        {report && <div>report: {report}</div>}
      </div>
    );
  }
}
export default Contribute;