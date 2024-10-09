import { Button } from '../ui/button'
import Logo from '@/assets/logo/logo.svg'
import FAQ from '@/assets/images/faq-question-mark.svg'
import { Outlet, useLocation, useOutlet } from "react-router-dom";
import { useStore } from '@/store';
import ClockIcon from '@/assets/images/clock-secondary.svg'
import { convertMillisecondsToTime } from '@/utils';
import { useStepCheck } from '@/hooks';
import { ROUTES } from '@/utils/constants';

const Navbar = () => {
    const outlet = useOutlet();
    const { userTimeLeft } = useStore()
    const pathname = useLocation().pathname

    useStepCheck();

    return (
        <div className={`flex flex-col justify-center items-center ${outlet ? 'h-screen' : ''}`}>
            <nav className='w-full sm:px-20 px-10 flex justify-between items-center sm:py-10 py-8 my-auto'>
                <div className="flex items-center gap-3">
                    <img src={Logo} alt='logo-interview-bot' />
                    <h2 className='text-2xl font-semibold'>Interview Bot</h2>
                </div>

                {pathname.includes('/invitation') ? <div className="">
                    <Button
                        color={'primary'}
                        className='rounded-full border 
                    border-destructive flex 
                    gap-2 bg-destructive/5 hover:bg-destructive/10 text-destructive'>
                        <img src={FAQ} alt='' />
                        FAQs
                    </Button>
                </div> :
                    <>
                        {pathname === ROUTES.INTERVIEW && <div className='flex items-center gap-2'>
                            <img src={ClockIcon} alt="" />
                            <span className='text-xl font-semibold'>{convertMillisecondsToTime(userTimeLeft)}</span>
                        </div>}
                    </>

                }
            </nav>

            <main className="flex-1 flex flex-col w-full">
                <Outlet />
            </main>
        </div>
    )
}

export default Navbar;
