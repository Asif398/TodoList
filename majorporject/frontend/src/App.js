import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import PrivateComponent from './components/PrivateComponent';
import Signin from './components/Signin';
import CreateTodo from './components/CreateTodo';
import ViewTodo from './components/ViewTodo';
import UpdateProfile from './components/UpdateProfile';
import AdminDashboard from './components/AdminDashboard';
    

function App() {
  return (                                                    
    <div className="App">
      <BrowserRouter>
     <Nav />
    
     <Routes>
      <Route element={<PrivateComponent />}>
      <Route path='/' element={<ViewTodo />}/>
      <Route path='/add' element={<CreateTodo />}/>
      <Route path='/update' element={<AdminDashboard />}/>

      <Route path='/logout' element={<h1>logout</h1>}/>
      <Route path='/profile' element={<UpdateProfile />}/>
      </Route>
      <Route path =  '/signup' element={<Signup/>} />
      <Route path =  '/signin' element={<Signin/>} />


     </Routes>
     <Footer />

      </BrowserRouter>
    </div>
  );
}

export default App;
