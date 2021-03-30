import axios from 'axios';

jest.mock('axios');



// tests
test('true to be true', () => {
    expect(true).toBe(true);
})

test('false to be false', () => {
    expect(false).toBe(false);
})
