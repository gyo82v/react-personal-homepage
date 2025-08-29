import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom"

import Home from "./pages/Home"
import Skills from "./pages/Skills"
import Resume from "./pages/Resume"
import Projects from "./pages/Projects"
import Layout from "./components/layout/Layout"


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="projects" element={<Projects />} />
      <Route path="skills" element={<Skills />} />
      <Route path="resume" element={<Resume />}/>
    </Route>
  ))


  return (
    <div className="flex flex-col min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
