import React from 'react';
import styled from 'styled-components';

const Wrapper=styled.li`
    display:flex;
    align-items:center;

    h3{
        display:inline-block;
        margin-right:10px;
        color:black;
    }
    p{
        display:inline-block;
        color:#777;
    }
`

export const ListItem =({name,username})=>(
    <li>
        <Wrapper>
        <h3>{name}</h3><p>@{username}</p>
        </Wrapper>
    </li>
);