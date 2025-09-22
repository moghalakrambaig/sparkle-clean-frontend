import PageWrapper from '../App.tsx';

interface Cleaner {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    contact: string;
}

export const House_Cleaner: Cleaner = {
    name: "Geidy Cabrera", role: "Founder & Head Cleaner", bio: "With over 15 years of experience, Geidy founded SparkleClean with a passion for creating pristine and healthy living spaces.", imageUrl: "https://i.ibb.co/Vt9rQy7/cleaner.png", contact: "+14752080329",
};

const AboutPage = () => (
    <PageWrapper>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About SparkleClean</h1>
        <div className="text-center max-w-3xl mx-auto text-gray-600 text-lg mb-16">
            <p>Founded on the principle that a clean home is a happy home, SparkleClean has been dedicated to providing top-tier cleaning services. Our mission is to create pristine environments that allow our clients to focus on what matters most.</p>
        </div>
        <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
            <img src={House_Cleaner.imageUrl} alt={House_Cleaner.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-sky-100" />
            <h3 className="text-xl font-semibold text-gray-800">{House_Cleaner.name}</h3>
            <p className="text-sky-600 font-medium mb-2">{House_Cleaner.role}</p>
            <p className="text-gray-600 text-sm">{House_Cleaner.bio}</p>
            <p className="mt-3 text-gray-700">📞 {House_Cleaner.contact}</p>
        </div>
    </PageWrapper>
);

export default AboutPage;