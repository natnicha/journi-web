import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Flex, Container, Tabs, Theme} from "@radix-ui/themes";
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
          <Tabs.Root defaultValue="tab2" >
            <Tabs.List style={{ display: 'flex', gap: 12 }} justify={"center"}>
              <Tabs.Trigger style={{ fontSize: '18px', padding: '8px 16px', cursor: 'pointer' }} value="tab1" >
                Home
              </Tabs.Trigger>
              <Tabs.Trigger style={{ fontSize: '18px', padding: '8px 16px', cursor: 'pointer' }} value="tab2" >
                Trips
              </Tabs.Trigger>
              <Tabs.Trigger style={{ fontSize: '18px', padding: '8px 16px', cursor: 'pointer' }} value="tab3" >
                Destinations
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="tab1"></Tabs.Content>
            <Tabs.Content value="tab2"></Tabs.Content>
            <Tabs.Content value="tab3"></Tabs.Content>
          </Tabs.Root>
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
