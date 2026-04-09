import styled, { keyframes } from 'styled-components';

export const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

export const PageTitle = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #f0f0ff;
    line-height: 1.1;
    margin-bottom: 0.4rem;
  }
  p {
    color: #6060a0;
    font-size: 0.9rem;
  }
`;

export const Card = styled.div`
  background: #0e0e1a;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 16px;
  padding: 1.5rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: rgba(255,255,255,0.12);
  }
`;

export const Input = styled.input`
  width: 100%;
  background: #141424;
  border: 1px solid rgba(255,255,255,0.1);
  color: #f0f0ff;
  padding: 10px 14px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition: all 0.2s;

  &::placeholder { color: #404060; }
  &:focus {
    border-color: rgba(108,99,255,0.5);
    background: #181830;
    box-shadow: 0 0 0 3px rgba(108,99,255,0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  background: #141424;
  border: 1px solid rgba(255,255,255,0.1);
  color: #f0f0ff;
  padding: 10px 14px;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: all 0.2s;

  option { background: #141424; color: #f0f0ff; }

  &:focus {
    border-color: rgba(108,99,255,0.5);
    background: #181830;
    box-shadow: 0 0 0 3px rgba(108,99,255,0.1);
  }
`;

export const Button = styled.button`
  background: ${p => p.variant === 'ghost'
    ? 'transparent'
    : p.variant === 'danger'
    ? 'rgba(248,113,113,0.15)'
    : 'linear-gradient(135deg, #6c63ff, #a78bfa)'};
  color: ${p => p.variant === 'ghost' ? '#6060a0' : p.variant === 'danger' ? '#f87171' : '#fff'};
  border: 1px solid ${p => p.variant === 'ghost'
    ? 'rgba(255,255,255,0.08)'
    : p.variant === 'danger'
    ? 'rgba(248,113,113,0.3)'
    : 'transparent'};
  padding: ${p => p.size === 'sm' ? '6px 14px' : '10px 22px'};
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: ${p => p.size === 'sm' ? '0.8rem' : '0.9rem'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: ${p => p.variant === 'ghost' ? 'none' : '0 4px 20px rgba(108,99,255,0.35)'};
    opacity: 0.92;
  }
  &:active:not(:disabled) { transform: translateY(0); }
  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #6060a0;
  margin-bottom: 6px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Spinner = styled.div`
  width: ${p => p.size || '20px'};
  height: ${p => p.size || '20px'};
  border: 2px solid rgba(108,99,255,0.2);
  border-top-color: #6c63ff;
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
  flex-shrink: 0;
`;

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background: ${p => {
    const map = {
      Electronics: 'rgba(56,189,248,0.12)',
      Apparel: 'rgba(167,139,250,0.12)',
      Hardware: 'rgba(251,191,36,0.12)',
      Furniture: 'rgba(52,211,153,0.12)',
      Sports: 'rgba(248,113,113,0.12)',
      Safety: 'rgba(251,191,36,0.12)',
    };
    return map[p.cat] || 'rgba(255,255,255,0.07)';
  }};
  color: ${p => {
    const map = {
      Electronics: '#38bdf8',
      Apparel: '#a78bfa',
      Hardware: '#fbbf24',
      Furniture: '#34d399',
      Sports: '#f87171',
      Safety: '#fbbf24',
    };
    return map[p.cat] || '#a0a0c0';
  }};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 2px 8px;
  border-radius: 5px;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #404060;

  .icon { font-size: 3rem; margin-bottom: 1rem; opacity: 0.5; }
  h3 { font-family: 'Syne', sans-serif; font-size: 1.1rem; color: #6060a0; margin-bottom: 0.5rem; }
  p { font-size: 0.85rem; }
`;

export const Alert = styled.div`
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${p => p.type === 'error'
    ? 'rgba(248,113,113,0.1)'
    : p.type === 'success'
    ? 'rgba(52,211,153,0.1)'
    : 'rgba(108,99,255,0.1)'};
  border: 1px solid ${p => p.type === 'error'
    ? 'rgba(248,113,113,0.25)'
    : p.type === 'success'
    ? 'rgba(52,211,153,0.25)'
    : 'rgba(108,99,255,0.25)'};
  color: ${p => p.type === 'error' ? '#f87171' : p.type === 'success' ? '#34d399' : '#a78bfa'};
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${p => p.gap || '1rem'};

  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const Grid3 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${p => p.gap || '1rem'};

  @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`;

export const StatCard = styled.div`
  background: #0e0e1a;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 12px;
  padding: 1.2rem 1.4rem;

  .label {
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #404060;
    margin-bottom: 6px;
  }
  .value {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #f0f0ff;
    letter-spacing: -0.02em;
  }
  .sub {
    font-size: 0.75rem;
    color: #6060a0;
    margin-top: 2px;
  }
`;
