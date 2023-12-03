import styled from 'styled-components';

export const ReadBookWrapper = styled.div`
  overflow: scroll;
  height: 100%;
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
