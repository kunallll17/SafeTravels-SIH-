import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TouristApp } from './components/tourist/TouristApp';

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F8FAFC" translucent={false} />
      <TouristApp />
    </>
  );
}
