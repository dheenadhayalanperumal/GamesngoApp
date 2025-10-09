import { Suspense } from 'react';
import Selectoutlet from '@/components/Selectoutlet';

export default function RestaurantGamePage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>}>
      <Selectoutlet />
    </Suspense>
  );
}

