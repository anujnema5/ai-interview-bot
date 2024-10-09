import { InfoCard } from "@/components/cards"
import { SplitViewLayout } from "@/components/layouts"
import { VideoScreen } from "@/components/video-screen"
import DeviceCheck from "./device-check"
import { useStore } from "@/store"

const headingText = "Before you begin"
const description = "You're now in the official interview. Answer each question to the best of your ability. Once you start recording, you'll have a set time to answer. Good luck!"

const defaultData = {
  headingText,
  content: description,
}

const SetupCheckPage = () => {
  const { mediaStream, user } = useStore()

  return (
    <>
      <SplitViewLayout firstLayout={<VideoScreen stream={mediaStream} />}>
        <InfoCard {...defaultData} testDuration={user?.interviewDuration} />
        <DeviceCheck />
      </SplitViewLayout>
    </>
  )
}

export default SetupCheckPage