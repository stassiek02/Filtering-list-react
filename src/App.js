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
  margin-left: 130px;
`;

class App extends Component {
  _isMounted = false;
  state = {
    persons: [],
    inputValue: ""
  };

  componentDidMount() {
    this._isMounted = true;

    axios
      .get(UsersApi)
      .then(res => {
        if(this._isMounted){
          const persons = res.data;
          this.setState({ persons });
        }
        
      })
      .catch(error => console.log(error));
  }
  componentWillUpdate(){
    this._isMounted=false;
  }

  handleChange = event => {
    this.setState({ inputValue: event.target.value }, () =>
      this.filterPersons(this.state.inputValue)
    );
  };

  filterPersons = inputValue => {
    let filteredPersons = this.state.persons;
    filteredPersons = filteredPersons.filter(person => {
      let personName = person.name.toLowerCase();
      return personName.indexOf(inputValue.toLowerCase()) !== -1;
    });
    this.setState({
      filteredPersons
    });
  };

  renderPersonsList = personsArray => {
    return personsArray.map(person => (
      <ListItem name={person.name} username={person.username} key={person.name}/>
    ));
  };
// props types dodac i testy 
  render() {
    const { inputValue, persons, filteredPersons } = this.state;
    return (
      <>
        <InnerWrapper>
          <h1>User List</h1>
          <Input
            placeholder="Search by user name..."
            value={inputValue}
            onChange={this.handleChange}
          />
          <StyledList>
            {filteredPersons
              ? this.renderPersonsList(filteredPersons)
              : this.renderPersonsList(persons)}
          </StyledList>
        </InnerWrapper>
      </>
    );
  }
}

export default App;
