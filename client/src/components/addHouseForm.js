import React from "react";

class AddForm extends React.Component {
  state = {
    error: null,
    report: null
  };
  submitHouse = e => {
    e.preventDefault();
    fetch(`http://localhost:4000/api/houses/`, {
      method: "POST",
      body: this.HouseInput.value,
      headers: { "content-type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        data.error
          ? this.setState({ error: data })
          : this.setState({ report: data, error: null });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };
  render() {
    const { report, error } = this.state;
    return (
      <div>
        <form onSubmit={this.submitHouse}>
          <textarea
            placeholder="enter new house data"
            ref={elem => {
              this.HouseInput = elem;
            }}
          />
          <input type="submit" value="insert" />
          <br />
          {error && <p> {error} </p>}
          {report && (
            <div>
              report:
              <div>valid houses: {report.valid}</div>
              <div>
                invalid houses:
                {report.invalid.length}:
                {report.invalid.map(house => (
                  <div>
                    raw:
                    <pre>{JSON.stringify(house.raw, null, 2)}</pre>
                    errors
                    <pre>{JSON.stringify(house.errors, null, 2)}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}
export default AddForm;
