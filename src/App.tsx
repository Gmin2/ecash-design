import { DialRoot } from "dialkit"
import "dialkit/styles.css"
import { HomePage } from "./HomePage"
import { useLenis } from "./hooks/useLenis"

function App() {
  useLenis()
  return (
    <>
      <HomePage />
      <DialRoot position="top-right" />
    </>
  )
}

export default App
