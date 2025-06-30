import { useState } from 'react'
import './App.css'
import { Flex, Text, Button} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Button>Let's go</Button>
    </Flex>
  )
}

export default App
