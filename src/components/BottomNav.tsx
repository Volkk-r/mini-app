import { useNavigate, useLocation } from 'react-router-dom';
import '../events/AllEvents.css';
import home from '../img/addhome_28.svg';
import myEvents from '../img/channel_28.svg';
import account from '../img/person_24.svg';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={() => navigate('/allEvents')} aria-current={location.pathname === '/allEvents'}>
        <span role="img" aria-label="events"><img src={home} alt="home" /></span>
        <div>Все ивенты</div>
      </div>
      <div className="nav-item" onClick={() => navigate('/my')} aria-current={location.pathname === '/my'}>
        <span role="img" aria-label="my-events"><img src={myEvents} alt="myEvents" /></span>
        <div>Мои ивенты</div>
      </div>
      <div className="nav-item" onClick={() => navigate('/account')} aria-current={location.pathname === '/account'}>
        <span role="img" aria-label="account"><img src={account} alt="account" /></span>
        <div>Аккаунт</div>
      </div>
    </div>
  );
}

export default BottomNav;


