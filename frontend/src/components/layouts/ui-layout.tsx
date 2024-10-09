'use client'
import { Navbar } from "@/components/navbar";

const UIWrapper = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className='border-2 border-red-700'>
            <Navbar />


            <div className="w-1/2">
                {children}
            </div>
        </div>
    );
}

export default UIWrapper;