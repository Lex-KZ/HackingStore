import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/Header';
import Product from './components/Product';
import ProductList from './components/ProductList';
import SignInForm from './components/SignInForm';
import { getProducts } from './api/products.js'
import { signIn, getToken } from './api/auth';
import './App.css';


class App extends React.Component {
  state = { 
    products: null,
    token: getToken()
  }

  // constructor(props) {
  //   super(props);
  //   this.state = { products: null, token: null }
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  
  componentDidMount() {
    getProducts()
    .then(products => {
      console.dir(products);
      return Promise.resolve(products);
      // return products; // same same
    })
    .then(products =>{
      this.setState({ products: products });
    });
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.setState({ token: '666' })
  // }

  
// lexical 'this' 
  handleSubmit = event => {
    event.preventDefault();
    // console.dir(event.target)
    signIn().then(token => this.setState({ token }))
  }
  
  
  render() {
    const signedIn = !!this.state.token;

    return (
      <div className="App">
      <Router>
        <Header/>
        
        <main>
        <Switch>
          <Route path='/signin' render={() => (
            signedIn ? (
              <Redirect to='/' />
            ) : (
              <SignInForm handleSubmit={this.handleSubmit}/>
            )
          )} />
          {
            this.state.products && (
              <Route exact path='/products/:id' render={({ match: { prams: { id } }}) => {
              const product = this.state.products.find(p => p.id == id)
              console.dir({ product })
              return(<Product product={product} />);
              }} />
            )
          }

          {
            this.state.products ? (
              <Route path='/products'>
              {
                this.state.products ? 
                (
                  <ProductList products={this.state.products} />
                ) : (
                  <div>Loading&hellip;</div>
                )
              }
            </Route>
            ) : (
              <Redirect to='/signin' />
            )
          }
         
          </Switch>
        </main>
        </Router>
      </div>
    );
  }
}

export default App;
