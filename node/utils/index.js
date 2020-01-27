// A quick utility function to generate the column names for the data, as the CSV files do not contain a header

function CSVHeaders() {
  let headers = [ "label" ]
  for (let i = 0; i < 28; i++) {
    for (let j = 0; j < 28; j++) {
      headers.push( `p${i}-${j}` )
    }
  }

  return headers
}

module.exports = {
  CSVHeaders
}
