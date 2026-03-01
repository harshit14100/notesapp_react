// import { useState } from "react";
// import Aside from "./components/Aside";
// import Middle from "./components/Mid";

// import Rightsection from './components/Rightsectionbase'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
// import Aside from "./components/Aside";
// import RightSide from "./components/Right"; 

function App() {
    const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>,  
    },
  {
    path:"folder/:folderId",
    element:<Home/>
  },
  {
    path:"notes/:folderId/:noteId",
    element:<Home/>
  },
  {
    path:"type/:type",
    element:<Home />
  },
  {
    path:"type/:type/:noteId",
    element:<Home />
  }
    
  ]);

  
  
  return (<>
    <RouterProvider router={router} /> 
      {/* <Right /> */}
      </>
  );
}

export default App;



