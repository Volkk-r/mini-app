import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import '../index.css';

function AppLayout() {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  );
}

export default AppLayout;


