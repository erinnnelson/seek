import React from 'react';
import './App.css';
import { verifyToken, createUser, loginUser, removeToken } from './services/api-helper';
import UserForm from './components/UserForm';
import TopicQuestions from './components/TopicQuestions';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { Route } from 'react-router-dom';
import QuestionMain from './components/QuestionMain';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
    }
  }
  async componentDidMount() {
    const user = await verifyToken();
    if (user) {
      this.setState({
        user: user
      })
    }
  }



  handleLoginFormSubmit = async (formData) => {
    const res = await loginUser(formData);
    this.setState({
      user: res,
    });
  };



  handleRegisterFormSubmit = async (formData) => {
    const res = await createUser(formData);
    this.setState({
      user: res.user,
      registerFormData: {
        username: '',
        email: '',
        password: ''
      },
    });
  };

  handleLogOut = (e) => {
    removeToken();
    this.setState({
      user: null,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavBar
            handleLoginFormSubmit={this.handleLoginFormSubmit}
            handleRegisterFormSubmit={this.handleRegisterFormSubmit}
            user={this.state.user}
            handleLogOut={this.handleLogOut} />
        </header>
        <main>

          <div className="main-section">
            <div className="cover">
              <img className="hero-img" src="/img/hero-img.jpg" alt="hero-img"></img>
            </div>
          </div>
          <Route exact path='/' component={Main} />
          <Route
            exact path='/questions/:topic/'
            component={(tackle) => <TopicQuestions
              user={this.state.user}
              topic={tackle.match.params.topic} />} />
          <Route
            exact path='/questions/:topic/:id'
            component={(tackle) => <QuestionMain
              user={this.state.user}
              topic={tackle.match.params.topic}
              id={tackle.match.params.id} />} />

          <footer>
            <p>this is the footer</p>
          </footer>
        </main>
      </div>
    );
  }
}

export default App;
