import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from './BottomNav';     
import Header from './Header';          
import '../index.css';

export default function AppLayout() {
  const location = useLocation();
  const path = location.pathname;
  const state = location.state as { isEditing?: boolean } | null;

  const getTitle = () => {
    if (path === '/account' && state?.isEditing) {
      return 'Редактирование';
    }

    switch (path) {
      case '/allEvents':
        return 'События';

      case '/my':
        return 'Мои события';          

      case '/account':
        return 'Аккаунт';

      default:
        if (path.startsWith('/events/')) {
          return 'Детали события';
        }

        return 'Приложение';
    }
  };

  return (
    <div className="app-layout-wrapper">  
      <Header title={getTitle()} />
      <main style={{ paddingTop: '56px', paddingBottom: '60px' }}> 
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}