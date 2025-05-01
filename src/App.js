import React, { useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import './App.css';
import Navbar from './components/Navbar';
import ModbusAscii from './components/ModbusAscii';
import ModbusRtu from './components/ModbusRtu';
import ModbusTcp from './components/ModbusTcp';

function App() {
  const [activeTab, setActiveTab] = useState('ascii');
  const [direction, setDirection] = useState('right');
  const nodeRef = useRef(null);

  const changeTab = (tab) => {
    const tabs = ['ascii', 'rtu', 'tcp'];
    const currentIndex = tabs.indexOf(activeTab);
    const newIndex = tabs.indexOf(tab);
    
    setDirection(newIndex > currentIndex ? 'right' : 'left');
    setActiveTab(tab);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'ascii':
        return <ModbusAscii />;
      case 'rtu':
        return <ModbusRtu />;
      case 'tcp':
        return <ModbusTcp />;
      default:
        return <ModbusAscii />;
    }
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} changeTab={changeTab} />
      
      <div className="content">
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={activeTab}
            nodeRef={nodeRef}
            timeout={300}
            classNames={`slide-${direction}`}
            unmountOnExit
          >
            <div ref={nodeRef} className="transition-wrapper">
              {renderTab()}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  );
}

export default App;