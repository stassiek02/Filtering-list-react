import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";
import { ListItem } from "./components/ListItem";

const Wrapper = styled.div``;

const InnerWrapper = styled.div`
  text-align:center;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

const StyledList = styled.ol`
  width: 100%;
  color: #777;
`;
const ApiEndPoint = "https://jsonplaceholder.typicode.com/users";
axios
  .get(ApiEndPoint)
  .then(res => console.log(res.data))
  .catch(err => console.log(err));

class App extends Component {
  state = {
    persons: [],
    inputValue: ""
  };
  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then(res => {
      const persons = res.data;
      this.setState({ persons });
    });
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
      <ListItem name={person.name} username={person.username} />
    ));
  };

  render() {
    const { inputValue, persons, filteredPersons } = this.state;
    return (
      <Wrapper>
        <InnerWrapper>
          <h1>User List</h1>
          <input
            placeholder="Search by user name"
            value={inputValue}
            onChange={this.handleChange}
          />
          <StyledList>
            {filteredPersons
              ? this.renderPersonsList(filteredPersons)
              : this.renderPersonsList(persons)}
          </StyledList>
        </InnerWrapper>
      </Wrapper>
    );
  }
}

export default App;
