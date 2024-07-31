import React from 'react';
import { render  } from '@testing-library/react';
import {test } from 'vitest';
import Creator from './creator';

test('renders creator component', () => {
    render(<Creator />);
    
});
