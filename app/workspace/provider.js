import React from "react";
import Appheader from "./_components/Appheader";
import AppSidebar from "./_components/AppSidebar";

function WorkspaceProvider({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        <Appheader />
        <main className="p-4 flex-1 overflow-auto">
          <div className="p-10">
          {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default WorkspaceProvider;