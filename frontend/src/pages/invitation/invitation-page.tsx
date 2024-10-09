import Star from '@/assets/images/star.svg';
import { InviteCard } from '@/components/cards';

const welcomeHeading = 'Welcome';
const paragraphText = 'Thank you for joining our interview invitation.';

const InvitationPage = () => {

  return (
    <div className="flex flex-col items-center h-[88vh] p-4 relative">
      <div className="flex flex-col gap-16 mx-auto mt-10">

        {/* WELCOME TEXT AND PARA */}
        <div className="text-center flex flex-col min-w-96 gap-2">
          <h1 className="text-4xl font-semibold ml-2">
            {welcomeHeading}
            <span className="wave">👋</span>
          </h1>
          <p className="text-gray-600 mt-2">{paragraphText}</p>
        </div>

        {/* INVITATION CARD */}
        <InviteCard />
      </div>

      {/* STAR ICON AT BELOW */}
      <img src={Star} alt="star" className="absolute left-0 bottom-0" />
    </div>
  );
};

export default InvitationPage;
