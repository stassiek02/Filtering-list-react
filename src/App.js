import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { ListItem } from "./components/ListItem";
import { Input } from "./components/Input";
import { UsersApi } from "./services/API";

const InnerWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
`;

const StyledList = styled.ol`
  width: 100%;
  color: #777;
  margin-top:40px;
  margin-left: 130px;
`;

class App extends Component {
  _isMounted = false;
  state = {
    personsData: [],
    filterValue: "",
  };

  componentDidMount() {
    this._isMounted = true;
    
    axios
      .get(UsersApi)
      .then(res => {
        if (this._isMounted) {
          const personsData = res.data;
          this.setState({ personsData });
        }
      })
      .catch(error => console.log(error));
  }
  componentDidUpdate() {
    this._isMounted = false;
  }

  handleChange = event => {
    this.setState({ filterValue: event.target.value }, () =>
      this.filterPersons(this.state.filterValue)
    );
  };

  filterPersons = filterValue => {
    
    let filteredPersons = this.state.personsData;
    filteredPersons = filteredPersons.filter(person => {
      let personName = person.name.toLowerCase();
      return personName.indexOf(filterValue.toLowerCase()) !== -1;
    });
    this.setState({
      filteredPersons
    });
  };

  renderPersonsList = personsArray => {
    return personsArray.map(person => (
      <ListItem
        name={person.name}
        username={person.username}
        key={person.name}
      />
    ));
  };
  render() {
    const { filterValue, personsData, filteredPersons } = this.state;
    return (
      <>
        <InnerWrapper>
          <h1>User List</h1>
          <Input
            placeholder="Search by user name..."
            value={filterValue}
            onChange={this.handleChange}
          />
          <StyledList>
            {filteredPersons
              ? this.renderPersonsList(filteredPersons)
              : this.renderPersonsList(personsData)}
          </StyledList>
        </InnerWrapper>
      </>
    );
  }
}

export default App;
