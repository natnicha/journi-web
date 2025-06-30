import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Flex, Container, TabNav, Theme} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
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
            <TabNav.Link href="#">Home</TabNav.Link>
            <TabNav.Link href="#" active>Trips</TabNav.Link>
            <TabNav.Link href="#">Destinations</TabNav.Link>
          </TabNav.Root>
        </Flex>

        <div className="account">
          📃
        </div>
      </nav>

      <App />
    </Theme>
    </Container>
  </StrictMode>,
)
