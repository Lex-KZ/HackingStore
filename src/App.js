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
    getProducts(this.state.token)
    // .then(products => {
    //   console.dir(products);
    //   return Promise.resolve(products);
    //   // return products; // same same
    // })
      .then(products =>{
        this.setState({ products: products });
      });
  }

  componentDidUpdate(prevProp, prevState) {
    const { token } = this.state;
    if (prevState.token !== this.state.token) {
      getProducts(token)
        .then(products => {
          this.setState({ products: products });
        });
    }
  }

  // handleSubmit(event) {
  //   event.preventDefault();
  //   this.setState({ token: '666' })
  // }

  
// lexical 'this' 
  handleSignin = ({ email, password }) => {
    // event.preventDefault();
    // console.dir(event.target)
    signIn(email, password).then(token => this.setState({ token }))
  }
  
  
  render() {
    const signedIn = !!this.state.token;

    function requireAuth(render) {
      return function(props) {
        if (signedIn) {
          return render(props)
        } else {
          return <Redirect to='/signin' />
        }
      }
    }

    return (
      <div className="App">
      <Router>
        <Header/>
        <main>
          <Switch>
            <Route path='/signin' render={() => (
              signedIn ? (
                <Redirect to='/products' />
              ) : (
                <SignInForm onSignIn={this.handleSignin}/>
              )
            )} />

            {
              this.state.products && (
                <Route path='/products/:id' render={({ match: { params: { id } }}) => {
                  const product = this.state.products.find(p => p.id == id)
                  console.dir({ product })
                  return(<Product product={product} />);
                }} />
              )
            }

            {
              <Route path='/products' render={requireAuth(() => (
                <ProductList products={this.state.products} />
              ))} />
            }
          
          </Switch>
        </main>
        </Router>
      </div>
    );
  }
}

export default App;
