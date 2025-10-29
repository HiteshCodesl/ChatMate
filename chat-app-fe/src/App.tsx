import { Send } from "lucide-react"
import {Button} from "./components/ui/button"
import {Input} from "./components/ui/input"
import { useEffect, useRef, useState } from "react"

function App() {

  const wsRef = useRef<null | WebSocket>(null);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [messages, setMessages] = useState<string[]>([]);


  useEffect(() => {

    
    const ws = new WebSocket("ws://localhost:8080"); //creates a new websocket instance

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]);
    }

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          room: "red"
        }
      }))
      return () => {
        ws.close()
      }
    }

  }, []);

  const sendMessage = () => {
    
      wsRef.current?.send(JSON.stringify({
      type: "chat",
      payload:{
        message: inputRef.current?.value
    }
    }))
   if(inputRef.current){
    inputRef.current.value = "";
   }
}

return (
  <div className="h-screen w-screen overflow-hidden">
    <div className="h-[90vh] bg-white m-2">
      {messages.map((msg, index) => (
        <p key={index} className="text-md">{msg}</p>
      ))}
    </div>

    <div className="flex gap-3 mt-5 mx-5">
      <Input
        ref={inputRef}
        placeholder="Enter a Message"
        className="text-black text-md border border-black"
      />
      <Button onClick={sendMessage} className="bg-blue-600">Send <Send /></Button>
    </div>

  </div>
)
}

export default App
