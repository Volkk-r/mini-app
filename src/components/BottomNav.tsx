import { useNavigate, useLocation } from 'react-router-dom';
import '../events/AllEvents.css';
import { IconChannel, IconAddHome, IconPerson } from '../icon/icons';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={() => navigate('/allEvents')} aria-current={location.pathname === '/allEvents'}>
        <span role="img" aria-label="events"><IconAddHome/></span>
        <div>Все ивенты</div>
      </div>
      <div className="nav-item" onClick={() => navigate('/my')} aria-current={location.pathname === '/my'}>
        <span role="img" aria-label="my-events"><IconChannel/></span>
        <div>Мои ивенты</div>
      </div>
      <div className="nav-item" onClick={() => navigate('/account')} aria-current={location.pathname === '/account'}>
        <span role="img" aria-label="account"><IconPerson /></span>
        <div>Аккаунт</div>
      </div>
    </div>
  );
}

export default BottomNav;


