import styled from 'styled-components';

const Welcome = styled.h1`
  @keyframes blinkCursor {
    from {
      border-right-color: #3f3f3f;
    }
    to {
      border-right-color: transparent;
    }
  }

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 4.8em;
    }
  }

  margin: 0 0 20px 0;
  text-align: center;
  font-family: 'Cutive Mono', monospace;
  border-right: 2px solid #3f3f3f;
  white-space: nowrap;
  overflow: hidden;
  font-size: 27px;
  word-spacing: -8px;
  letter-spacing: -0.5px;
  animation: blinkCursor 0.5s steps(15) infinite normal, typing 2s steps(15) 1s normal both;
`;

export { Welcome };
