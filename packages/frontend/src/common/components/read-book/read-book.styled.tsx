import styled from 'styled-components';

export const ReadBookWrapper = styled.div`
  height: 100%;
  width: 100%;
  .epub-container {
    /* min-width: 320px; */
    /* margin: 0 auto; */
    /* position: relative; */
    overflow: auto;
  }

  .epub-container .epub-view > iframe {
    background: white;
    box-shadow: 0 0 4px #ccc;
    /*margin: 10px;
        padding: 20px;*/
  }
`;

export const StepButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 90px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.9) 52.6%);
  & > button {
    background: transparent;
    border: none;
    width: 50%;
    height: 100%;
    cursor: pointer;
    :disabled {
      cursor: not-allowed;
    }
  }
`;
