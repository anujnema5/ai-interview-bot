import React from "react"
import { Navbar } from "../navbar"
import { useStepCheck } from "@/hooks"

type TSplitViewLayout = {
    firstLayout: JSX.Element | null
    children: React.ReactNode,
}

const SplitViewLayout: React.FC<TSplitViewLayout> = ({ firstLayout, children }) => {
    useStepCheck()
    return (
        <div className="flex lg:flex-row flex-col min-h-screen w-full">
            {/* Left section takes 62% width */}
            <div className="lg:w-[62%] w-full border-r-[1px] border-primaryGray bg-primary-foreground flex flex-col">
                <div className="border-b-[1px] border-primaryGray w-full">
                    <Navbar />
                </div>

                <div className="m-auto">
                    {firstLayout}
                </div>
            </div>

            {/* Right section takes the remaining space */}
            <div className="flex-1 bg-white px-7 py-8 flex flex-col divide-y divide-primaryGray space-y-10">
                {children}
            </div>
        </div>


    )
}

export default SplitViewLayout