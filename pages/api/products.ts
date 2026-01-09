import { ranks, coins } from '../../lib/products'

export default function handler(req:any, res:any){
  res.status(200).json({ ranks, coins })
}
