import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminTrackingMapPage from './AdminTrackingMapPage';

const SESSION_KEY = 'bs_admin_tracking_authed';
const SESSION_PW_KEY = 'bs_admin_tracking_pw';

const AdminTrackingGate: React.FC = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const didRun = useRef(false);

  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;

    const run = async () => {
      try {
        const already = typeof window !== 'undefined' ? window.sessionStorage.getItem(SESSION_KEY) : null;
        if (already === '1') {
          setReady(true);
          return;
        }

        const password = window.prompt('Admin password required');
        if (!password) {
          navigate('/', { replace: true });
          return;
        }

        const r = await fetch('/api/admin/tracking-map', {
          method: 'GET',
          headers: { 'x-admin-password': password },
        });

        if (!r.ok) {
          window.alert('Unauthorized');
          navigate('/', { replace: true });
          return;
        }

        window.sessionStorage.setItem(SESSION_KEY, '1');
        window.sessionStorage.setItem(SESSION_PW_KEY, password);
        setReady(true);
      } catch {
        navigate('/', { replace: true });
      }
    };

    run();
  }, [navigate]);

  if (!ready) return null;
  return <AdminTrackingMapPage />;
};

export default AdminTrackingGate;


