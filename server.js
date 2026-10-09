import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

// Mock live NSE whale flows - updates every 5 sec on frontend
function getMockFlows(){
  const tickers = ["RELIANCE","TCS","INFY","HDFCBANK","ICICIBANK","NIFTY","BANKNIFTY"];
  return Array.from({length:10}).map((_,i)=>({
    id:i,
    ticker: tickers[Math.floor(Math.random()*tickers.length)],
    side: Math.random()>0.5?"BUY":"SELL",
    time: new Date().toLocaleTimeString(),
    premium: `₹${(Math.random()*2).toFixed(2)}Cr`,
    lots: Math.floor(Math.random()*20)+1,
    contract: `${Math.floor(Math.random()*20000)}CE`,
    unusual: Math.random()>0.7?"YES":"NO",
    flags: Math.random()>0.5?"Sweep":"Block"
  }));
}

app.get('/api/flows', (req,res)=>{
  res.json(getMockFlows());
});

app.get('/', (req,res)=> res.send('API LIVE - /api/flows'));

app.listen(process.env.PORT || 10000, ()=> console.log('LIVE'));
