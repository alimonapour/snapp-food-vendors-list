import { Routes, Route } from "react-router-dom"
import { Home } from "./components/home/Home"
import { VendorsList } from "./features/vendors-list/VendorsList"

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendors-list" element={<VendorsList />} />
      </Routes>
    </div>
  )
}

export default App
