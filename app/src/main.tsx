import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Flex, Container, TabNav, Theme} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { Menu } from "lucide-react";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Container>
    <Theme accentColor="teal" grayColor="sand" radius="large" scaling="95%">
      <nav className="navbar">
        <div className="logo">
          <img  src={"/src/assets/journi.svg"} alt="Journi" />
        </div>

        <Flex className="nav-links" direction="column" gap="2">
          <TabNav.Root justify={'center'} size="2">
            <TabNav.Link className="text-gray-800 cursor-pointer" href="<App>">Home</TabNav.Link>
            <TabNav.Link href="<App>" active>Trips</TabNav.Link>
            <TabNav.Link href="<App>">Destinations</TabNav.Link>
          </TabNav.Root>
        </Flex>

        <div className="account">
          <Menu size={28} className="text-gray-800 cursor-pointer" />
        </div>
      </nav>

      <App />
    </Theme>
    </Container>
  </StrictMode>,
)
