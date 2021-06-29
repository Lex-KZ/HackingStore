import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Product from './Product'
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
        <header className="App-header">
          <h1>
            <span>Hacking</span>
            <span>Ehh...</span>
          </h1>
        </header>
        <main>
        <Switch>
          <Route path='/signin' render={() => (
            signedIn ? (
              <Redirect to='/' />
            ) : (
              <form onSubmit={this.handleSubmit}>
              <fieldset>
                <label>Email</label>
                <input name="email" type="text"></input>
              </fieldset>
              <fieldset>
                <label>Password</label>
                <input name="password" type="password"></input>
              </fieldset>
                <input type="submit" value="Sign In"/>
            </form>
            )
          )} />
          {
            this.state.products && (
              <Route exact path='/products/:id' render={(props) => {
              const id = props.match.params.id;
              const product = this.state.products.find(p => (p.id == id))
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
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.products.map(product =>(
                        <tr key={product.id}>
                          <th><Link to={`/products/${product.id}`}>{product.name}</Link></th>
                          <th>{product.price}</th>
                        </tr>
                      ))
                    }
                    </tbody>
                  </table>
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
