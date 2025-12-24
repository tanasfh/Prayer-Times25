import React from 'react';
import { City, Theme } from '../types';
import QiblaFinder from '../components/QiblaFinder';

interface QiblaPageProps {
  city: City;
  theme: Theme;
}

const QiblaPage: React.FC<QiblaPageProps> = ({ city, theme }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center pb-20">
      <QiblaFinder city={city} theme={theme} />
    </div>
  );
};

export default QiblaPage;