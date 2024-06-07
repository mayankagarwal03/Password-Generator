import { useState,useCallback ,useEffect, useRef} from 'react'

function App() {
  const [length, setLength] = useState(6)
  const [nums,setNums]=useState(false)
  const [chare,setChar]=useState(false)
  const [password,setPassword]=useState("")

  const passref=useRef(null)

  const passGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(nums) str+="0123456789"
    if(chare) str+="!@#$%^&*-=+_[]{}~`"
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  }, [nums,length,chare,setPassword])

  useEffect(()=>{
    passGenerator()
    console.log(password)
  },[nums,length,chare,passGenerator])

  const copypasstoclipboard=useCallback(()=>{
    passref.current?.select()
    passref.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    <>
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg p-7 my-10 bg-gray-800 text-white">
      <h1 className='text-3xl text-white text-center py-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text" value={password} className="outline-none w-full py-1 px-3 text-black" placeholder='password' readOnly ref={passref}></input>
        <button onClick ={copypasstoclipboard} className='outline-none bg-blue-700 text-white px-3 py-0/5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className="flex items-center gap-x-1">
          <input type='range' min={1} max={100} value={length} className="cursor-pointer" onChange={(e)=>{setLength(e.target.value)}}></input>
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={nums} id="numberInput" onChange={(e)=>{setNums((prev)=>!prev)}}></input>
          <label>Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" defaultChecked={chare} id="characterInput" onChange={(e)=>{setChar((prev)=>!prev)}}></input>
          <label>Symbols</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
