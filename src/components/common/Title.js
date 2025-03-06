import React, { useEffect } from 'react';

const Title = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div id="Title">
      <div id="write-box">
        <p id="write-box-header">portfolio-theoguenezan</p>
        <p id="write-box-domain">@</p>
        <p id="write-box-date">{currentDate}</p>
        <p id="write-box-tild">~</p>
        <p id="write-box-content"></p>
      </div>
    </div>
  );
};

export default Title;
