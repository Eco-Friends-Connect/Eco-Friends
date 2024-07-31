import React from 'react';
import { render } from '@testing-library/react';
import {test} from 'vitest';
import BadgeForm from '../badge-form/badge-form'; 


test('renders creator component', () => {
    render(<BadgeForm />);
    
});