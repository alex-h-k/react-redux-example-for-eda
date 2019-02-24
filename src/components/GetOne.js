import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "./loading";
import { getOneAction } from "../actions/getOne";

class GetOne extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: null
    };
  }

  getOne = () => {
    this.props.getOne(this.state.num);
  };

  handleChange = e => {
    this.setState({
      num: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h2>Get a cat</h2>
        <p style={{ color: "red" }}>{this.props.state.err}</p>
        {this.props.state.loading && <Loading />}
        {!this.props.state.loading && (
          <ul>
            {this.props.state.catData &&
              this.props.state.catData.map(cat => {
                return cat.id == this.state.num ? (
                  <li key={cat.id}>{cat.name}</li>
                ) : null;
              })}
          </ul>
        )}
        <input
          onChange={this.handleChange}
          placeholder="enter id here"
          type="number"
        />
        <button onClick={this.getOne}>I want this cat</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.cats
  };
}

const mapDispatchToProps = dispatch => {
  return {
    getOne: id => dispatch(getOneAction(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetOne);
