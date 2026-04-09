import React, { useState } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

import SearchPage from './pages/SearchPage';
import DatabasePage from './pages/DatabasePage';
import GroupedPage from './pages/GroupedPage';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  body { margin: 0; background: #07070d; }
`;

const Wrap = styled.div`
  min-height: 100vh;
  background: #07070d;
  color: white;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  background: rgba(7,7,13,0.9);
  padding: 10px 20px;
`;

const HeaderInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-weight: bold;
  color: white;

  span {
    color: #6c63ff;
  }

  .dot {
    width: 8px;
    height: 8px;
    background: #34d399;
    border-radius: 50%;
    display: inline-block;
    margin-right: 6px;
    animation: ${pulse} 2s infinite;
  }
`;

const Nav = styled.div`
  display: flex;
  gap: 10px;
`;

const NavBtn = styled.button`
  background: ${p => (p.$active ? '#6c63ff' : 'transparent')};
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
  animation: ${slideIn} 0.3s ease;
`;

const TABS = [
  { id: 'search', label: 'Search' },
  { id: 'database', label: 'Database' },
  { id: 'grouped', label: 'Grouped' },
];

export default function App() {
  const [tab, setTab] = useState('search');

  return (
    <>
      <GlobalStyle />

      <Wrap>
        <Header>
          <HeaderInner>
            <Logo>
              <span className="dot" />
              Zero<span>stock</span>
            </Logo>

            <Nav>
              {TABS.map(t => (
                <NavBtn
                  key={t.id}
                  $active={tab === t.id}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </NavBtn>
              ))}
            </Nav>
          </HeaderInner>
        </Header>

        <Content>
          {tab === 'search' && <SearchPage />}
          {tab === 'database' && <DatabasePage />}
          {tab === 'grouped' && <GroupedPage />}
        </Content>
      </Wrap>
    </>
  );
}