import axios from 'axios';


async function getTokenPrice(tokenAddress: string) {
  try {
    const url = `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`;
    const response = await axios.get(url);

    const pairs = response.data.pairs;

    if (!pairs || pairs.length === 0) {
      console.log('No price data found for this token.');
      return;
    }

    // Optionally: filter for the most liquid pair
    const mostLiquid = pairs.sort((a, b) => b.liquidity.usd - a.liquidity.usd)[0];

    return mostLiquid.priceUsd;
  } catch (error) {
    console.error('Error fetching price:', error.message);
  }
}

export { getTokenPrice };
