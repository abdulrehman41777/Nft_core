import Image from "next/image";

export default function Home() {
  return (
    <div 
    // className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] text-white"
    
    >
      <header class="bg-[#0b1120] text-white py-4">
        <div class="container mx-auto flex justify-between items-center">
        
          <div class="flex items-center space-x-2">
            <img src="path-to-your-logo.png" alt="Logo" class="w-8 h-8"/>
              <span class="text-2xl font-bold">NFT <span class="text-blue-500">core</span></span>
          </div>

      
          <nav class="hidden md:flex space-x-6">
            <a href="#" class="hover:text-blue-500">Discover</a>
            <a href="#" class="hover:text-blue-500">Marketplace <span class="bg-blue-500 text-white px-2 py-1 text-sm rounded">PRO</span></a>
            <a href="#" class="hover:text-blue-500">How it Work</a>
          </nav>

          <div class="flex items-center space-x-4">
            <button class="text-white">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 21l2-2 5-5 2-2M4 10V7a1 1 0 011-1h2M21 12v-1a9 9 0 00-9-9H8a9 9 0 00-9 9v8a9 9 0 0018 0v-1z"></path>
              </svg>
            </button>
            <button class="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition">
              Connect Wallet
            </button>
            <button class="bg-blue-500 p-2 rounded-full">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16M12 4v16"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

    </div>
  );
}
