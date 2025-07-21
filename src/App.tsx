import { useEffect, useRef, useState } from "react"

function App() {
  const [messages, setMessages] = useState(["hi there","hello"])
  const inputRef= useRef()
  const wsRef= useRef()
  useEffect(()=>{
    const ws= new WebSocket("ws://localhost:8080");
    ws.onmessage = (event)=>{
      setMessages(messages => [...messages, event.data])
    }
    wsRef.current= ws

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload:{
          roomId: "red"
        }
      }))
    }
  },[])

  return <div className="h-dvh w-dvw bg-slate-950 flex justify-center items-center">
    <div className=" h-[95vh] rounded-2xl w-full max-w-4xl mx-auto bg-slate-800 flex flex-1 flex-col p-4 overflow-auto">
      <div className="p-2 text-white bg-transparent backdrop-blur-2xl rounded-t-2xl ">
        <h1 className="text-4xl">GlobeChat</h1>
      </div>
      <div className="flex flex-col items-end flex-1 gap-4 text-white">
        {messages.map( (m) =>
          <p  className="bg-slate-500 px-4 py-3 rounded-xl text-base md:text-lg">{m}</p>
        )}
        
      </div>
      <div className="flex">
        <input ref={inputRef} className="bg-slate-100 w-full rounded-l-2xl p-4 text-base md:text-lg" type="text" />
        <button onClick={()=>{
          const message = inputRef.current?.value
          wsRef.current.send(JSON.stringify({
            type: "chat",
            payload: {
              message: message
            }
          }))
          // console.log(inputRef.current?.value)
          console.log(messages)
          // console.log(wsRef.current)
        }} className="bg-green-400 px-4 py-2 rounded-r-2xl cursor-pointer hover:opacity-80">Send</button>
      </div>
    </div>
  </div>
}

export default App
