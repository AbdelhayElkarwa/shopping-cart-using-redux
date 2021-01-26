import Header from "./component/Header";
import Products from "./component/Products";

function App() {
  return (
    <div className="App">
      <Header />
      <Products />
      <div style={{
        height: '50px', backgroundColor: 'rgb(20, 30, 40)', color: 'white',
        justifyContent: 'center', alignItems: 'center', display: 'flex', marginTop: '20px'
      }}>
        All Right Reserved</div>
    </div>
  );
}

export default App;
