import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  h3 {
    display: inline-block;
    margin-right: 10px;
    color: black;
  }
  p {
    display: inline-block;
  }
`;

export const ListItem = ({ name, username }) => (
  <li>
    <Wrapper>
      <h3>{name}</h3>
      <p>@{username}</p>
    </Wrapper>
  </li>
);

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};
