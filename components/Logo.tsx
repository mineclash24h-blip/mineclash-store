export default function Logo({size=120}:{size?:number}){
  return (
    <img src="/images/logo.png" alt="MineClash" width={size} height={Math.floor(size/3)} />
  )
}
