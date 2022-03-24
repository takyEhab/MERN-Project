
function App() {
  var stringToColour = function (str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
  }

  return (
    <div style={{ display: 'flex', backgroundColor: 'grey', justifyContent: 'end' }}>
      <h1 style={{ marginRight: 20, backgroundColor: '#fff', padding: 10, fontSize: 20 }}>Login</h1>
      <h1 style={{ marginRight: 20, backgroundColor: '#fff', padding: 10, fontSize: 20 }}>Register</h1>
      <h1 style={{ backgroundColor: stringToColour("Taky"), padding: 10, fontSize: 20, marginRight: 10, borderRadius: 25 }} >
        T
      </h1>
      {/* <h1>
        {stringToColour("greenish")}
      </h1> */}
    </div>
  );
}

export default App;
