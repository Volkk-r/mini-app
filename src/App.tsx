import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login';
import AllEvents from './events/allEvents';
import MyEvents from './components/MyEvents';
import EventDetail from './components/EventDetail';
import AppLayout from './components/AppLayout';
import Account from './components/Account';
import { MyEventsProvider } from './context/MyEventsContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <MyEventsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route element={<AppLayout />}> 
              <Route path="/allEvents" element={<AllEvents />} />
              <Route path="/my" element={<MyEvents />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/account" element={<Account />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </MyEventsProvider>
    </UserProvider>
  );
}

export default App;
