import { UserButton } from '@clerk/nextjs'
import HeaderButtons from 'app/_components/HeaderButtons'
import { Brain } from 'lucide-react'
import React from 'react'

function Appheader() {
  return (
    <header className="bg-white/80 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-pink-500 rounded-xl flex items-center justify-center">
                <Brain className="text-white w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-500 bg-clip-text text-transparent">
                AI Learning Platform
              </span>
            </div>
            <HeaderButtons />
          </div>
        </div>
      </header>
  )
}

export default Appheader