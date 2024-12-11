import React, { useState } from 'react';
import { useAuth } from './Context/Authcontext';
import Sidebar from './Sidebar';
import Messagecontainer from './Messagecontainer';

function Home() {
  const { authUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handelUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };

  const handelShowSidebar = () => {
    setIsSidebarVisible(true);
    setSelectedUser(null);
  };

  return (
    <div
      className="flex justify-between mx-auto md:w-1/2 min-h-screen    "
    >
      {/* Sidebar Section */}
      <div className={`   md:flex ${isSidebarVisible ? '' : 'hidden'}`}>
        <Sidebar onSelectUser={handelUserSelect} />
      </div>

      
      {/* Message Container */}
      <div
        className={`flex-auto  ${
          selectedUser ? 'block' : 'hidden md:flex'
        }`}
      >
        <Messagecontainer onBackUser={handelShowSidebar} />
      </div>
    </div>
  );
}

export default Home;
