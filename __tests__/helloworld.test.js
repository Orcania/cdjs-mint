/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { render } from '@testing-library/react';

import Helloworld from '@/components/helloworld';

const setup = () => {
    // const func = jest.fn();

    const utils = render(<Helloworld />);

    const elmt = utils.getByTestId('helloworld');
    return {
        elmt,
        ...utils,
    };
};

describe('Example text', () => {
    it('should render', () => {
        const { elmt } = setup();
        expect(elmt).toBeInTheDocument();
    });
});
