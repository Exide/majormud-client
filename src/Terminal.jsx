import React from 'react';

const Terminal = () => {

  let buffer = '';
  let output = '';

  let style = {
    fontFamily: "Consolas, monospace",
    fontSize: "1.25em",
    width: "48.5em",  // hack for 80 columns
    height: "35em",   // hack for 30 rows
    padding: "5px",
    border: "0",
    backgroundColor: "black",
    color: "white"
  };

  let handleKey = (event) => {
    event.preventDefault();
    output += convert
  };

  return (
    <div>
        <textarea style={style} onKeyUp={handleKey}>
          {buffer}
        </textarea>
      <div>
        {output}
      </div>
    </div>
  );

};

export default Terminal;
