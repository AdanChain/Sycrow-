import { getTokenPrice } from './getTokenPrice';
import axios from 'axios';

describe('getTokenPrice', () => {
  it('should return token price when API call is successful', async () => {
    const tokenAddress = '0x35Cac80b70eB858e54E7c71252946C7faC1bD9a6';
    const expectedPrice = 100;

    const price = await getTokenPrice(tokenAddress);

    expect(price).toBe(expectedPrice);
  });
})
    

