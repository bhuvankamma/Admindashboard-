import React, { useState, useEffect } from "react";
import { Home, Briefcase, GraduationCap, ClipboardCheck, Info, LogIn, UserPlus, Sun, Moon, Megaphone, ArrowLeft, ArrowRight, Lightbulb, CheckCircle, Users, BarChart2, TrendingUp, Compass, Globe, FileText, Smartphone, BriefcaseBusiness, Library, ClipboardSignature, Banknote, Map, Phone, Mail, Link, Facebook, Twitter, Linkedin, Youtube, Locate } from 'lucide-react';
import { PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid, Legend } from "recharts";

/* ----------------------------------------------------------------------------
 * This is the main application component for the YuvaSaathi portal.
 * It has been rebuilt with a new, more visually appealing design.
 * The styling has been enhanced with a refined color palette, improved spacing,
 * and new interactive animations for a modern and polished feel.
 * ----------------------------------------------------------------------------*/
const colors = {
    // A fresh, modern color palette
    primary: '#4ade80', // A vibrant green for accents and CTAs (Green 500)
    secondary: '#1f2937', // A dark, professional gray for backgrounds (Gray 800)
    textLight: '#f3f4f6', // A soft white for light text on dark backgrounds (Gray 100)
    textDark: '#111827', // A deep black for dark text on light backgrounds (Gray 900)
    backgroundDark: '#111827', // Dark background for dark mode (Gray 900)
    backgroundLight: '#f9fafb', // Light background for light mode (Gray 50)
    cardDark: '#1f2937', // Dark card background (Gray 800)
    cardLight: '#ffffff', // Light card background (White)
    accent: '#3b82f6', // A bright blue for secondary accents and links (Blue 500)
    success: '#10b981', // A dedicated success color (Emerald 500)
    warning: '#f59e0b', // A dedicated warning color (Amber 500)
    danger: '#ef4444', // A dedicated danger color (Red 500)
};

const navItems = [
    { name: 'Home', icon: Home, page: 'home' },
    { name: 'Jobs', icon: Briefcase, page: 'jobs' },
    { name: 'Skills', icon: GraduationCap, page: 'skills' },
    { name: 'Assessments', icon: ClipboardCheck, page: 'assessments' },
    { name: 'About', icon: Info, page: 'about' },
];

const initialJobs = [
    {
        id: 1, title: "Software Developer", company: "Tech Innovations Inc.", location: "Bangalore",
        description: "Develop and maintain software applications using modern technologies. Experience with React and Node.js is a plus.",
        qualifications: "Bachelor's degree in Computer Science, 2+ years experience.", salary: "₹5-8 LPA"
    },
    {
        id: 2, title: "Data Analyst", company: "Data Insights Co.", location: "Hyderabad",
        description: "Analyze large datasets to provide actionable business insights. Proficiency in SQL and Python is required.",
        qualifications: "Bachelor's degree in Statistics or a related field, 1+ year experience.", salary: "₹4-6 LPA"
    },
    {
        id: 3, title: "Marketing Manager", company: "Creative Minds Ltd.", location: "Delhi",
        description: "Lead marketing campaigns and manage a team of marketing specialists. Strong communication and leadership skills are essential.",
        qualifications: "MBA in Marketing, 5+ years experience.", salary: "₹8-12 LPA"
    },
    {
        id: 4, title: "UI/UX Designer", company: "Innovate Labs", location: "Pune",
        description: "Design and prototype user interfaces for web and mobile applications. Experience with Figma and Adobe XD.",
        qualifications: "Bachelor's degree in Design, 3+ years experience.", salary: "₹6-9 LPA"
    },
    {
        id: 5, title: "Civil Engineer", company: "Construct Builders", location: "Chennai",
        description: "Oversee construction projects from planning to completion. Must have strong knowledge of construction principles.",
        qualifications: "Bachelor's degree in Civil Engineering, 4+ years experience.", salary: "₹7-10 LPA"
    },
    {
        id: 6, title: "Cloud Solutions Architect", company: "CloudSphere Technologies", location: "Mumbai",
        description: "Design and implement scalable cloud-based solutions on AWS, Azure, or GCP. Certification is a plus.",
        qualifications: "Bachelor's degree in IT/CS, 7+ years experience in cloud architecture.", salary: "₹15-25 LPA"
    },
    {
        id: 7, title: "Content Writer", company: "Digital Storytellers", location: "Work From Home",
        description: "Create engaging and high-quality content for blogs, websites, and social media. Excellent command of English.",
        qualifications: "Bachelor's degree in Journalism or English, 2+ years experience.", salary: "₹3-5 LPA"
    },
    {
        id: 8, title: "Robotics Engineer", company: "Automation & Co.", location: "Bangalore",
        description: "Develop and program robotic systems for industrial applications. Knowledge of ROS and C++ is essential.",
        qualifications: "Master's degree in Robotics or related field, 3+ years experience.", salary: "₹10-18 LPA"
    },
    {
        id: 9, title: "Financial Analyst", company: "Wealth Management Partners", location: "Hyderabad",
        description: "Perform financial modeling, forecasting, and analysis. CFA certification is preferred.",
        qualifications: "MBA in Finance or related field, 5+ years experience.", salary: "₹9-14 LPA"
    },
    {
        id: 10, title: "Hospitality Manager", company: "Grandeur Hotels", location: "Goa",
        description: "Manage daily operations of a hotel, including staff supervision and guest services. Strong customer service skills required.",
        qualifications: "Bachelor's degree in Hospitality Management, 6+ years experience.", salary: "₹6-11 LPA"
    }
];

const initialAssessments = [
    {
        id: 1, title: "Aptitude Test", description: "Assess your logical reasoning and problem-solving skills.",
        duration: "60 mins", questions: 50, status: "Ready"
    },
    {
        id: 2, title: "Verbal Ability", description: "Evaluate your command over the English language.",
        duration: "45 mins", questions: 40, status: "Ready"
    },
    {
        id: 3, title: "Technical Skills Assessment", description: "Test your coding skills in a language of your choice.",
        duration: "90 mins", questions: 30, status: "Ready"
    },
    {
        id: 4, title: "Data Science Fundamentals", description: "Test your knowledge of statistics, machine learning, and Python.",
        duration: "75 mins", questions: 50, status: "Ready"
    },
    {
        id: 5, title: "Project Management PMP", description: "Assess your understanding of project management principles.",
        duration: "120 mins", questions: 80, status: "Ready"
    },
    {
        id: 6, title: "Digital Marketing Skills", description: "Evaluate your expertise in SEO, SEM, and social media marketing.",
        duration: "60 mins", questions: 45, status: "Ready"
    },
    {
        id: 7, title: "Cybersecurity Basics", description: "Assess your knowledge of network security and cyber threats.",
        duration: "90 mins", questions: 60, status: "Ready"
    }
];

const testimonials = [
    {
        text: "YuvaSaathi helped me find the perfect job. The platform is incredibly user-friendly and the resources are top-notch.",
        author: "Priya Sharma", role: "Software Developer"
    },
    {
        text: "The skills development modules are excellent. I learned so much and it directly helped me in my career.",
        author: "Rahul Kumar", role: "Data Analyst"
    },
    {
        text: "The assessments gave me a clear picture of my strengths and weaknesses. It was a great way to prepare for interviews.",
        author: "Anjali Singh", role: "Marketing Professional"
    },
];

const skillsData = [
    { name: 'IT & Software', students: 5000 },
    { name: 'Healthcare', students: 3000 },
    { name: 'Manufacturing', students: 2000 },
    { name: 'Retail', students: 1500 },
    { name: 'Finance', students: 1000 },
];

const carouselImages = [
    { src: 'https://cdn.pixabay.com/photo/2017/10/31/09/55/dream-job-2904780_1280.jpg', description: 'Empowering youth with practical skills for a brighter future.' },
    { src: 'https://plus.unsplash.com/premium_photo-1682141597582-41bcb432820e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2tpbGwlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D', description: 'Providing a clear path to meaningful employment and career growth.' },
    { src: 'https://cdn.pixabay.com/photo/2016/12/05/09/36/application-1883453_1280.jpg', description: 'Fostering innovation and entrepreneurship to build a self-reliant India.' },
    { src: 'https://cdn.pixabay.com/photo/2016/10/24/09/41/businesswoman-1765651_1280.png', description: 'Training the next generation of leaders and innovators.' },
    { src: 'https://cdn.pixabay.com/photo/2017/10/17/10/02/application-2860023_1280.jpg', description: 'Connecting talent with opportunities across all industries.' },
];

const skillStats = {
    state: [
        { name: 'Enrolled', value: 400000, color: colors.primary },
        { name: 'Completed', value: 300000, color: colors.accent },
        { name: 'Pending', value: 200000, color: colors.warning },
    ],
    district: [
        { name: 'Patna', value: 100000, color: '#ff6384' },
        { name: 'Gaya', value: 75000, color: '#36a2eb' },
        { name: 'Muzaffarpur', value: 60000, color: '#ffce56' },
        { name: 'Bhagalpur', value: 50000, color: '#4bc0c0' },
        { name: 'Others', value: 115000, color: '#9966ff' },
    ],
    mandal: [
        { name: 'Patna Sadar', value: 25000, color: '#ff6384' },
        { name: 'Bihta', value: 18000, color: '#36a2eb' },
        { name: 'Phulwari Sharif', value: 15000, color: '#ffce56' },
        { name: 'Masaurhi', value: 12000, color: '#4bc0c0' },
        { name: 'Others', value: 30000, color: '#9966ff' },
    ]
};

const skillPrograms = [
    {
        id: 'tech-revolution',
        title: "Tech Revolution Program",
        description: "A comprehensive training program in modern technologies like AI, Blockchain, and IoT to prepare you for the jobs of tomorrow.",
        imgSrc: "https://media.istockphoto.com/id/2170446464/photo/skill-individual-development-concept-up-new-ability-skill-for-business-technology-evolution.webp?a=1&b=1&s=612x612&w=0&k=20&c=COApFhbxoTGVM2_eDwMQnNpWThXBlflRH0hD6X64Uio=",
        fullContent: "**Program Overview:**\n\nThe Tech Revolution Program is designed to equip young minds with cutting-edge skills in emerging technologies. This initiative focuses on practical, hands-on training to ensure participants are job-ready for the future.\n\n**Key Modules:**\n\n- **Artificial Intelligence & Machine Learning:** Learn to build intelligent systems and analyze complex data.\n- **Blockchain Technology:** Understand the principles of decentralized systems and their applications in finance and logistics.\n- **Internet of Things (IoT):** Gain expertise in connecting devices and managing data streams.\n\nThis program is a collaboration between the Government of Bihar and leading tech companies to ensure the curriculum is aligned with industry demands."
    },
    {
        id: 'green-economy',
        title: "Green Economy Initiative",
        description: "Training in renewable energy, sustainable agriculture, and eco-friendly practices to build a workforce for a greener future.",
        imgSrc: "data:image/png;base64,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",
        fullContent: "**Program Overview:**\n\nThe Green Economy Initiative is a pioneering program focused on building a skilled workforce for the sustainable sector. With the increasing global focus on climate change, this program prepares youth for high-demand jobs in renewable energy and sustainable development.\n\n**Key Modules:**\n\n- **Solar Energy Installation & Maintenance:** Hands-on training for installing and servicing solar panels.\n- **Organic Farming & Sustainable Agriculture:** Learn modern techniques for environmentally friendly food production.\n- **Waste Management & Recycling:** Understand the principles of circular economy and effective waste management.\n\nBy participating, you'll not only secure a stable career but also contribute to a healthier planet."
    },
    {
        id: 'rural-artisan',
        title: "Rural Artisan Development",
        description: "Preserving traditional crafts while modernizing business practices. This program supports rural artisans with new skills and market access.",
        imgSrc: "https://cdn.pixabay.com/photo/2013/04/23/12/39/business-106694_1280.jpg",
        fullContent: "**Program Overview:**\n\nThe Rural Artisan Development Program is dedicated to empowering traditional artisans and craftspeople. It combines traditional skill sets with modern business and marketing knowledge to help them thrive in the digital age.\n\n**Key Modules:**\n\n- **Craft Modernization:** Learn new techniques and tools to enhance traditional crafts.\n- **Digital Marketing & E-commerce:** Set up online stores and use social media to reach a global audience.\n- **Financial Management:** Get training in basic accounting, pricing, and business planning.\n\nThis program aims to make rural artisans self-sufficient and promote the rich cultural heritage of Bihar."
    }
];


const languages = ['English', 'Hindi', 'Bengali', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Gujarati', 'Punjabi', 'Odia', 'Assamese'];

const HomePage = ({ setCurrentPage, setContentProps, isDarkMode }) => {
    const mainBg = isDarkMode ? colors.backgroundDark : colors.backgroundLight;
    const cardBg = isDarkMode ? colors.cardDark : colors.cardLight;
    const textColor = isDarkMode ? colors.textLight : colors.textDark;
    const subTextColor = isDarkMode ? '#9ca3af' : '#6b7280'; // Gray 400 / Gray 500
    const iconColor = isDarkMode ? colors.accent : colors.primary;

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
    };

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            goToNextImage();
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);


    const missionContent = {
        'bihar-profile': {
            title: "State Profile",
            fullContent: "Bihar is located in the eastern part of the country. It is an entirely land-locked state, although the outlet to the sea... " +
                "The people of Bihar are very talented and skilled, but due to a lack of resources and opportunities, they are not able to utilize their skills fully. The state government is committed to providing a conducive environment for skill development and employment creation. The government has launched various missions and schemes to uplift the youth of Bihar by providing them with the necessary training and support. The state has a rich history and cultural heritage, which also offers opportunities in the tourism sector. The government is focused on making Bihar a hub for various industries, including agriculture, IT, and manufacturing."
        },
        'governance-profile': {
            title: "Governance Profile",
            fullContent: "It is almost fifteen years ago when the people of Bihar handed over the reins of power to Nitish Government with full hope and confidence... " +
                "The government's focus on good governance and development has transformed the state. Key initiatives include improving infrastructure, promoting education, and creating employment opportunities. The government has also launched special programs for the empowerment of women and marginalized communities. The administration is committed to transparency and accountability to ensure that the benefits of government schemes reach the most deserving people. The state has seen significant growth in various sectors, and the government is continuously working to attract more investment and create a better future for its citizens."
        }
    };

    const handleReadMoreClick = (item) => {
        setContentProps({
            pageTitle: item.title,
            content: item.fullContent,
        });
        setCurrentPage('content');
    };

    return (
        <div style={{ backgroundColor: mainBg, color: textColor, minHeight: '100vh', transition: 'background-color 0.5s' }}>
            <style>
                {`
                    @keyframes slidein {
                        from { transform: translateX(100%); }
                        to { transform: translateX(-100%); }
                    }
                    .marquee-container {
                        width: 100%;
                        overflow: hidden;
                        background-color: ${isDarkMode ? colors.secondary : colors.cardLight};
                        border-bottom: 2px solid ${colors.primary};
                    }
                    .marquee-text {
                        color: ${colors.warning};
                        font-weight: bold;
                        white-space: nowrap;
                        animation: slidein 15s linear infinite;
                        padding: 0.5rem 0;
                    }
                    @keyframes fadeInDown {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .hero-content {
                        animation: fadeInDown 1.2s ease-out;
                    }
                    .carousel-image {
                        transition: opacity 1s ease-in-out, transform 0.5s ease-in-out;
                        width: 100%;
                        height: auto;
                    }
                    .feature-card {
                        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s;
                        border-radius: 1rem;
                    }
                    .feature-card:hover {
                        transform: translateY(-8px);
                        box-shadow: 0 12px 20px rgba(0,0,0,0.25);
                    }
                    .animated-button {
                        transition: all 0.3s ease-in-out;
                        position: relative;
                        overflow: hidden;
                    }
                    .animated-button::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 5px;
                        height: 5px;
                        background: rgba(255,255,255,0.3);
                        border-radius: 50%;
                        opacity: 0;
                        transform: scale(0);
                    }
                    .animated-button:active::after {
                        animation: ripple 0.6s linear;
                    }
                    @keyframes ripple {
                        to {
                            transform: scale(20);
                            opacity: 1;
                        }
                    }
                    @keyframes neonGlow {
                        0% { text-shadow: 0 0 5px ${isDarkMode ? colors.accent : colors.primary}, 0 0 10px ${isDarkMode ? colors.accent : colors.primary}; }
                        50% { text-shadow: 0 0 15px ${isDarkMode ? colors.accent : colors.primary}, 0 0 25px ${isDarkMode ? colors.accent : colors.primary}; }
                        100% { text-shadow: 0 0 5px ${isDarkMode ? colors.accent : colors.primary}, 0 0 10px ${isDarkMode ? colors.accent : colors.primary}; }
                    }
                    .animated-title {
                        animation: neonGlow 2s ease-in-out infinite alternate;
                    }
                `}
            </style>

            <div className="marquee-container">
                <div className="marquee-text">
                    *** Announcement: Our new Skill Development programs are officially open for enrollment! Enhance your expertise and take the next step in your career. Enroll today to secure your spot.! ***
                </div>
            </div>

            {/* Hero Section with Parallax Effect */}
            <header style={{
                padding: '4rem 1rem',
                textAlign: 'center',
                background: isDarkMode ?
                    `linear-gradient(rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.8)), url('https://cdn.pixabay.com/photo/2019/06/18/07/09/school-4281626_1280.jpg')` :
                    `linear-gradient(rgba(249, 250, 251, 0.8), rgba(249, 250, 251, 0.8)), url('https://plus.unsplash.com/premium_photo-1682141597582-41bcb432820e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c2tpbGwlMjBkZXZlbG9wbWVudHxlbnwwfHwwfHx8MA%3D%3D')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                marginBottom: '3rem',
                borderRadius: '0 0 2rem 2rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
            }}>
                <div className="hero-content">
                    <h3 className="animated-title" style={{ fontSize: '3rem', fontWeight: 'bold', color: isDarkMode ? colors.accent : colors.primary, marginBottom: '0.75rem' }}>Your Journey Starts Here</h3>
                    <p style={{ fontSize: '1.0rem', color: isDarkMode ? colors.textLight : colors.textDark, marginBottom: '2rem' }}>Empowering the youth of Bihar with skills and opportunities.</p>
                    <button onClick={() => setCurrentPage('register')} className="animated-button" style={{ padding: '1rem 2rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', transition: 'background-color 0.3s', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                        Join Now
                    </button>
                </div>
            </header>

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>

                {/* Image Carousel */}
                <section style={{ marginBottom: '4rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        Key Initiatives
                        <span style={{ display: 'block', width: '60%', height: '4px', backgroundColor: colors.primary, margin: '0.5rem auto 0' }}></span>
                    </h2>
                    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}>
                        {carouselImages.map((image, index) => (
                            <div key={index} style={{
                                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                                opacity: currentImageIndex === index ? 1 : 0, transition: 'opacity 1s ease-in-out'
                            }}>
                                <img
                                    src={image.src}
                                    alt={image.description}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))', color: 'white', padding: '2rem 1rem', textAlign: 'center' }}>
                                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{image.description}</p>
                                </div>
                            </div>
                        ))}
                        {/* Carousel Navigation Buttons */}
                        <button onClick={goToPreviousImage} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s' }}>
                            <ArrowLeft size={24} />
                        </button>
                        <button onClick={goToNextImage} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', padding: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.3s' }}>
                            <ArrowRight size={24} />
                        </button>
                    </div>
                </section>

                <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <Briefcase style={{ color: iconColor, marginBottom: '1rem' }} size={48} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>Find Jobs</h3>
                        <p style={{ color: subTextColor }}>Browse thousands of job openings tailored for you.</p>
                        <button onClick={() => setCurrentPage('jobs')} className="animated-button" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Explore Jobs</button>
                    </div>
                    <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <GraduationCap style={{ color: iconColor, marginBottom: '1rem' }} size={48} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>Develop Skills</h3>
                        <p style={{ color: subTextColor }}>Access online courses and training programs.</p>
                        <button onClick={() => setCurrentPage('skills')} className="animated-button" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Start Learning</button>
                    </div>
                    <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <ClipboardCheck style={{ color: iconColor, marginBottom: '1rem' }} size={48} />
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>Take Assessments</h3>
                        <p style={{ color: subTextColor }}>Evaluate your readiness for the workforce.</p>
                        <button onClick={() => setCurrentPage('assessments')} className="animated-button" style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Take a Test</button>
                    </div>
                </section>

                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        Skill Development Statistics
                        <span style={{ display: 'block', width: '60%', height: '4px', backgroundColor: colors.primary, margin: '0.5rem auto 0' }}></span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div style={{ backgroundColor: cardBg, padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '1rem' }}>State-Wise</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <RechartsPieChart>
                                    <Pie data={skillStats.state} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {skillStats.state.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ backgroundColor: cardBg, padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '1rem' }}>District-Wise</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <RechartsPieChart>
                                    <Pie data={skillStats.district} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {skillStats.district.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ backgroundColor: cardBg, padding: '1.5rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '1rem' }}>Mandal-Wise (Patna)</h3>
                            <ResponsiveContainer width="100%" height={250}>
                                <RechartsPieChart>
                                    <Pie data={skillStats.mandal} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                        {skillStats.mandal.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </RechartsPieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        Government Missions & Vision
                        <span style={{ display: 'block', width: '60%', height: '4px', backgroundColor: colors.primary, margin: '0.5rem auto 0' }}></span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                        <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>State Profile</h3>
                            <p style={{ color: subTextColor }}>Bihar is located in the eastern part of the country. It is an entirely land-locked state, although the outlet to the sea... </p>
                            <button onClick={() => handleReadMoreClick(missionContent['bihar-profile'])} className="animated-button" style={{ marginTop: '1rem', color: colors.primary, fontWeight: 'bold', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Read more</button>
                        </div>
                        <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'semibold', marginBottom: '0.5rem' }}>Governance Profile</h3>
                            <p style={{ color: subTextColor }}>It is almost fifteen years ago when the people of Bihar handed over the reins of power to Nitish Government with full hope and confidence...</p>
                            <button onClick={() => handleReadMoreClick(missionContent['governance-profile'])} className="animated-button" style={{ marginTop: '1rem', color: colors.primary, fontWeight: 'bold', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Read more</button>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '2rem' }}>
                        {/* Content from Screenshot 382 */}
                        <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 768px)': { flexDirection: 'row' }, alignItems: 'center', backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <div style={{ flex: 1, marginRight: '1.5rem', marginBottom: '1rem' }}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuSDsjUAb8HC_IU5CdefrBm0guPiCc0MaEgA&s" alt="Scheme" style={{ width: '100%', borderRadius: '0.5rem' }} />
                            </div>
                            <div style={{ flex: 2 }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Skill Development and Entrepreneurship</h3>
                                <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>The government is actively promoting skill development to boost youth employment and entrepreneurship. This initiative aims to provide industry-relevant skills and create a self-reliant workforce.</p>
                                <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', color: subTextColor }}>
                                    <li>Training programs in various sectors like IT, healthcare, and manufacturing.</li>
                                    <li>Financial assistance for new business startups.</li>
                                    <li>Collaboration with private sector for job placement.</li>
                                    <li>Special focus on rural youth and women empowerment.</li>
                                </ul>
                            </div>
                        </div>

                        {/* Content from Screenshot 383 */}
                        <div className="feature-card" style={{ display: 'flex', flexDirection: 'column', '@media (min-width: 768px)': { flexDirection: 'row' }, alignItems: 'center', backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <div style={{ flex: 2, marginRight: '1.5rem', marginBottom: '1rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>YuvaSaathi: A Path to Success</h3>
                                <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>YuvaSaathi is a comprehensive platform designed to connect job seekers with employers and provide them with the tools they need to succeed in their careers. It's a one-stop solution for all your career needs.</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', color: subTextColor, fontSize: '0.875rem' }}>
                                        <BriefcaseBusiness style={{ marginRight: '0.5rem', color: iconColor }} size={16} /> Job Portal
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: subTextColor, fontSize: '0.875rem' }}>
                                        <Library style={{ marginRight: '0.5rem', color: iconColor }} size={16} /> Training & Courses
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: subTextColor, fontSize: '0.875rem' }}>
                                        <ClipboardSignature style={{ marginRight: '0.5rem', color: iconColor }} size={16} /> Assessments
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', color: subTextColor, fontSize: '0.875rem' }}>
                                        <Banknote style={{ marginRight: '0.5rem', color: iconColor }} size={16} /> Financial Assistance
                                    </div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <img src="data:image/jpeg;base64,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" alt="YuvaSaathi" style={{ width: '100%', borderRadius: '0.5rem' }} />
                            </div>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        What Our Users Say
                        <span style={{ display: 'block', width: '60%', height: '4px', backgroundColor: colors.primary, margin: '0.5rem auto 0' }}></span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        {testimonials.map((t, index) => (
                            <div key={index} className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderLeft: `5px solid ${colors.primary}`, display: 'flex', flexDirection: 'column' }}>
                                <p style={{ fontStyle: 'italic', color: subTextColor, marginBottom: '1rem', flex: 1 }}>"{t.text}"</p>
                                <div style={{ paddingTop: '1rem', borderTop: `1px dashed ${subTextColor}` }}>
                                    <p style={{ fontWeight: 'bold' }}>- {t.author}</p>
                                    <p style={{ fontSize: '0.875rem', color: subTextColor }}>{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* New Section: Financial Assistance & Support */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        Financial Assistance & Support
                        <span style={{ display: 'block', width: '60%', height: '4px', backgroundColor: colors.primary, margin: '0.5rem auto 0' }}></span>
                    </h2>
                    <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <p style={{ color: subTextColor, marginBottom: '1rem' }}>
                            The government offers various schemes and financial assistance programs to support youth in their career and entrepreneurial journeys. These initiatives aim to reduce financial barriers and promote self-reliance.
                        </p>
                        <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', color: subTextColor }}>
                            <li style={{ marginBottom: '0.5rem' }}>**Skill Development Loans:** Low-interest loans for skill training and certification courses.</li>
                            <li style={{ marginBottom: '0.5rem' }}>**Startup Grants:** Seed funding and grants for young entrepreneurs to start their own businesses.</li>
                            <li style={{ marginBottom: '0.5rem' }}>**Stipend Programs:** Monthly stipends for students enrolled in long-term skill development courses.</li>
                            <li>**Mentorship:** Access to a network of industry experts for guidance and mentorship.</li>
                        </ul>
                    </div>
                </section>

                {/* New Section: Skills for the Future */}
                <section style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem', position: 'relative', display: 'inline-block' }}>
                        Skills for the Future
                        <span style={{ display: 'block', width: '60%', height: '4px', backgroundColor: colors.primary, margin: '0.5rem auto 0' }}></span>
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {skillPrograms.map((program) => (
                            <div key={program.id} className="feature-card" style={{ backgroundColor: cardBg, borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                                <img src={program.imgSrc} alt={program.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{program.title}</h3>
                                    <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>{program.description}</p>
                                    <button onClick={() => handleReadMoreClick(program)} className="animated-button" style={{ padding: '0.75rem 1.5rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

const SectionPage = ({ page, setCurrentPage, setContentProps, isDarkMode }) => {
    const mainBg = isDarkMode ? colors.backgroundDark : colors.backgroundLight;
    const cardBg = isDarkMode ? colors.cardDark : colors.cardLight;
    const textColor = isDarkMode ? colors.textLight : colors.textDark;
    const subTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const accentColor = isDarkMode ? colors.accent : colors.primary;

    const [searchTerm, setSearchTerm] = useState('');
    const [jobs, setJobs] = useState(initialJobs);
    const [assessments, setAssessments] = useState(initialAssessments);

    useEffect(() => {
        if (page === 'jobs') {
            const filteredJobs = initialJobs.filter(job =>
                job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.company.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setJobs(filteredJobs);
        } else if (page === 'assessments') {
            const filteredAssessments = initialAssessments.filter(assessment =>
                assessment.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setAssessments(filteredAssessments);
        }
    }, [searchTerm, page]);

    const handleApplyClick = (job) => {
        setCurrentPage('register');
    };

    const handleReadMoreClick = (item) => {
        setContentProps({
            pageTitle: item.title,
            content: `**Company:** ${item.company}\n\n**Location:** ${item.location}\n\n**Salary:** ${item.salary}\n\n**Description:** ${item.description}\n\n**Qualifications:** ${item.qualifications}`
        });
        setCurrentPage('content');
    };

    const handleTakeTestClick = (item) => {
        setContentProps({
            pageTitle: item.title,
            content: `**Description:** ${item.description}\n\n**Duration:** ${item.duration}\n\n**Number of Questions:** ${item.questions}\n\n` +
                `This is a mock test page. In a real application, you would be redirected to the assessment platform.`
        });
        setCurrentPage('content');
    };

    const renderSkillsContent = () => (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor, marginBottom: '1.5rem', borderBottom: `2px solid ${accentColor}`, paddingBottom: '0.5rem' }}>Skill Development</h1>
            <p style={{ color: subTextColor, fontSize: '1rem', marginBottom: '2rem' }}>
                Upskill yourself with our curated list of courses and training programs.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Technical Skills</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Web Development (MERN Stack)</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Data Science with Python</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Cloud Computing (AWS/Azure)</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Cybersecurity Fundamentals</li>
                    </ul>
                </div>
                <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Soft Skills</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Communication & Presentation</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Leadership & Teamwork</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Problem Solving</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Time Management</li>
                    </ul>
                </div>
                <div className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Professional Courses</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Digital Marketing Certification</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Project Management (PMP)</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Financial Modeling & Valuation</li>
                        <li style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', color: textColor }}><CheckCircle style={{ color: colors.success, marginRight: '0.5rem' }} size={20} /> Supply Chain Management</li>
                    </ul>
                </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>Most Popular Skills</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={skillsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" stroke={textColor} />
                        <YAxis stroke={textColor} />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="students" stroke={colors.primary} fill={colors.primary} fillOpacity={0.6} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );

    const renderJobsContent = () => (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor, marginBottom: '1.5rem', borderBottom: `2px solid ${accentColor}`, paddingBottom: '0.5rem' }}>Job Listings</h1>
            <p style={{ color: subTextColor, fontSize: '1rem', marginBottom: '2rem' }}>
                Find your dream job from thousands of openings.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Search for jobs by title or company..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', backgroundColor: isDarkMode ? colors.cardDark : colors.cardLight, color: textColor }}
                />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {jobs.length > 0 ? (
                    jobs.map((job) => (
                        <div key={job.id} className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{job.title}</h3>
                            <p style={{ color: subTextColor, marginBottom: '0.25rem' }}>**{job.company}** - {job.location}</p>
                            <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>**Salary:** {job.salary}</p>
                            <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>{job.description}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                <button onClick={() => handleReadMoreClick(job)} className="animated-button" style={{ padding: '0.75rem 1rem', backgroundColor: isDarkMode ? '#374151' : '#e5e7eb', color: textColor, borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Read More</button>
                                <button onClick={() => handleApplyClick(job)} className="animated-button" style={{ padding: '0.75rem 1rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Apply Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: subTextColor, textAlign: 'center', gridColumn: '1 / -1' }}>No jobs found matching your search.</p>
                )}
            </div>
        </div>
    );

    const renderAssessmentsContent = () => (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor, marginBottom: '1.5rem', borderBottom: `2px solid ${accentColor}`, paddingBottom: '0.5rem' }}>Assessments</h1>
            <p style={{ color: subTextColor, fontSize: '1rem', marginBottom: '2rem' }}>
                Test your knowledge and skills with our comprehensive assessments.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
                <input
                    type="text"
                    placeholder="Search for assessments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #ccc', backgroundColor: isDarkMode ? colors.cardDark : colors.cardLight, color: textColor }}
                />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
                {assessments.length > 0 ? (
                    assessments.map((item) => (
                        <div key={item.id} className="feature-card" style={{ backgroundColor: cardBg, padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
                            <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>{item.description}</p>
                            <p style={{ color: subTextColor, marginBottom: '0.25rem' }}>**Duration:** {item.duration}</p>
                            <p style={{ color: subTextColor, marginBottom: '0.75rem' }}>**Questions:** {item.questions}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
                                <button onClick={() => handleTakeTestClick(item)} className="animated-button" style={{ padding: '0.75rem 1rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>Take Test</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p style={{ color: subTextColor, textAlign: 'center', gridColumn: '1 / -1' }}>No assessments found matching your search.</p>
                )}
            </div>
        </div>
    );

    const renderPageContent = () => {
        switch (page) {
            case 'jobs':
                return renderJobsContent();
            case 'skills':
                return renderSkillsContent();
            case 'assessments':
                return renderAssessmentsContent();
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: mainBg, minHeight: '100vh', transition: 'background-color 0.5s' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
                <button onClick={() => setCurrentPage('home')} style={{ display: 'flex', alignItems: 'center', color: accentColor, marginBottom: '1.5rem', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer', transition: 'color 0.3s' }}>
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back to Home
                </button>
                {renderPageContent()}
            </div>
        </div>
    );
};

const AboutPage = ({ isDarkMode }) => {
    const mainBg = isDarkMode ? colors.backgroundDark : colors.backgroundLight;
    const textColor = isDarkMode ? colors.textLight : colors.textDark;
    const subTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const accentColor = isDarkMode ? colors.accent : colors.primary;

    return (
        <div style={{ backgroundColor: mainBg, color: textColor, minHeight: '100vh', padding: '2rem' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: accentColor, marginBottom: '1.5rem' }}>About YuvaSaathi</h1>
                <p style={{ fontSize: '1rem', lineHeight: '1.5rem', marginBottom: '2rem', color: subTextColor, textAlign: 'center' }}>
                    YuvaSaathi is an initiative by the Government of Bihar aimed at empowering the youth by providing them with a comprehensive platform for skill development, job seeking, and career guidance. Our mission is to bridge the gap between talented individuals and potential employers, fostering economic growth and self-reliance in the state.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', '@media (min-width: 768px)': { gridTemplateColumns: '1fr 1fr' }, gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: accentColor, marginBottom: '0.75rem' }}>Our Vision</h2>
                        <p style={{ color: subTextColor }}>To create a prosperous Bihar where every youth has access to quality education, relevant skills, and meaningful employment opportunities, contributing to the state's overall development.</p>
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: accentColor, marginBottom: '0.75rem' }}>Our Mission</h2>
                        <ul style={{ listStyleType: 'disc', marginLeft: '1.5rem', color: subTextColor }}>
                            <li>To provide a centralized job portal for all government and private sector job openings.</li>
                            <li>To offer skill development programs tailored to industry needs.</li>
                            <li>To conduct standardized assessments for fair and transparent evaluations.</li>
                            <li>To empower youth with career counseling and mentorship.</li>
                        </ul>
                    </div>
                </div>
                <div style={{ borderTop: `1px solid ${subTextColor}`, paddingTop: '2rem', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: accentColor, marginBottom: '1rem' }}>Contact Us</h2>
                    <p style={{ color: subTextColor, marginBottom: '0.5rem' }}>
                        For any queries or support, please reach out to us at:
                    </p>
                    <p style={{ fontWeight: 'bold', color: textColor }}>contact@yuvasaathi.bih.nic.in</p>
                    <p style={{ fontWeight: 'bold', color: textColor }}>+91 12345 67890</p>
                </div>
            </div>
        </div>
    );
};

const ContentPage = ({ contentProps, setCurrentPage, isDarkMode }) => {
    const mainBg = isDarkMode ? colors.backgroundDark : colors.backgroundLight;
    const cardBg = isDarkMode ? colors.cardDark : colors.cardLight;
    const textColor = isDarkMode ? colors.textLight : colors.textDark;
    const subTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const accentColor = isDarkMode ? colors.accent : colors.primary;

    if (!contentProps) {
        return <div style={{ backgroundColor: mainBg, minHeight: '100vh', padding: '1rem', color: textColor }}>No content to display.</div>;
    }

    const formatContent = (content) => {
        return content.split('\n').map((line, index) => {
            if (line.startsWith('**')) {
                return <p key={index} style={{ fontWeight: 'bold', marginTop: '1rem', color: textColor, fontSize: '1.125rem' }}>{line.replace(/\*\*/g, '')}</p>;
            }
            return <p key={index} style={{ marginBottom: '0.75rem', color: subTextColor }}>{line}</p>;
        });
    };

    return (
        <div style={{ backgroundColor: mainBg, minHeight: '100vh', transition: 'background-color 0.5s' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
                <button onClick={() => setCurrentPage('home')} style={{ display: 'flex', alignItems: 'center', color: accentColor, marginBottom: '1.5rem', fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}>
                    <ArrowLeft size={20} style={{ marginRight: '0.5rem' }} /> Back
                </button>
                <div style={{ backgroundColor: cardBg, padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: accentColor, marginBottom: '1.5rem' }}>{contentProps.pageTitle}</h1>
                    <div style={{ lineHeight: '1.75' }}>
                        {formatContent(contentProps.content)}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FormBackgroundCarousel = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            zIndex: -1,
        }}>
            {carouselImages.map((image, index) => (
                <img
                    key={index}
                    src={image.src}
                    alt="Background"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: currentImageIndex === index ? 1 : 0,
                        transition: 'opacity 1.5s ease-in-out',
                    }}
                />
            ))}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dark overlay for better readability
                zIndex: 0,
            }}></div>
        </div>
    );
};

const LoginPage = ({ setCurrentPage, isDarkMode }) => {
    const cardBg = isDarkMode ? colors.cardDark : colors.cardLight;
    const textColor = isDarkMode ? colors.textLight : colors.textDark;
    const subTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const accentColor = isDarkMode ? colors.accent : colors.primary;

    const [form, setForm] = useState({ identifier: '', otp: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleGenerateOtp = () => {
        // Mock OTP generation logic
        alert(`OTP generated for ${form.identifier}.`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle login (e.g., API call)
        console.log('Login attempt with:', form);
        alert('Login functionality is not implemented yet. Redirecting to home.');
        setCurrentPage('home');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
        }}>
            <FormBackgroundCarousel />
            <div style={{
                backgroundColor: cardBg,
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '350px',
                zIndex: 1, // Ensure the form is on top of the carousel
            }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', color: accentColor, marginBottom: '1.5rem' }}>Login to YuvaSaathi</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Email / Mobile Number</label>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                                type="text"
                                name="identifier"
                                value={form.identifier}
                                onChange={handleChange}
                                required
                                style={{ flex: 1, padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }}
                                placeholder="Enter email or mobile number"
                            />
                            <button type="button" onClick={handleGenerateOtp} className="animated-button" style={{ padding: '0.75rem 1rem', backgroundColor: colors.warning, color: colors.textDark, borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                                Generate OTP
                            </button>
                        </div>
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>OTP</label>
                        <input
                            type="text"
                            name="otp"
                            value={form.otp}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }}
                            placeholder="Enter OTP"
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Language</label>
                        <select style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }}>
                            {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                        </select>
                    </div>
                    <button type="submit" className="animated-button" style={{ padding: '0.75rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.5rem', border: 'none', cursor: 'pointer' }}>
                        Login with OTP
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ color: subTextColor, fontSize: '0.875rem' }}>Don't have an account? <button onClick={() => setCurrentPage('register')} style={{ color: accentColor, fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}>Register here</button></p>
                </div>
            </div>
        </div>
    );
};

const RegisterPage = ({ setCurrentPage, isDarkMode }) => {
    const cardBg = isDarkMode ? colors.cardDark : colors.cardLight;
    const textColor = isDarkMode ? colors.textLight : colors.textDark;
    const subTextColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const accentColor = isDarkMode ? colors.accent : colors.primary;

    const [form, setForm] = useState({
        fullName: '', middleName: '', surname: '', email: '', mobile: '',
        aadharNumber: '', panNumber: '', password: '', confirmPassword: '',
        educationalQualification: '', currentLocation: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Logic to handle registration (e.g., API call)
        console.log('Registration attempt with:', form);
        alert('Registration successful! Redirecting to login.');
        setCurrentPage('login');
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            position: 'relative',
        }}>
            <FormBackgroundCarousel />
            <div style={{
                backgroundColor: cardBg,
                padding: '2rem',
                borderRadius: '1rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                width: '100%',
                maxWidth: '450px',
                zIndex: 1,
            }}>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', textAlign: 'center', color: accentColor, marginBottom: '1.5rem' }}>Register for YuvaSaathi</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Full Name</label>
                        <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Middle Name (Optional)</label>
                        <input type="text" name="middleName" value={form.middleName} onChange={handleChange} style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Surname</label>
                        <input type="text" name="surname" value={form.surname} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Mobile Number</label>
                        <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Aadhar Number</label>
                        <input type="text" name="aadharNumber" value={form.aadharNumber} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>PAN Number</label>
                        <input type="text" name="panNumber" value={form.panNumber} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Password</label>
                        <input type="password" name="password" value={form.password} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Confirm Password</label>
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Educational Qualification</label>
                        <input type="text" name="educationalQualification" value={form.educationalQualification} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: subTextColor, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Current Location</label>
                        <input type="text" name="currentLocation" value={form.currentLocation} onChange={handleChange} required style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: `1px solid ${subTextColor}`, backgroundColor: isDarkMode ? colors.backgroundDark : colors.cardLight, color: textColor }} />
                    </div>
                    <button type="submit" className="animated-button" style={{ padding: '0.75rem', backgroundColor: colors.primary, color: '#fff', borderRadius: '0.5rem', fontWeight: 'bold', fontSize: '1rem', marginTop: '0.5rem', border: 'none', cursor: 'pointer' }}>
                        Register
                    </button>
                </form>
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                    <p style={{ color: subTextColor, fontSize: '0.875rem' }}>Already have an account? <button onClick={() => setCurrentPage('login')} style={{ color: accentColor, fontWeight: 'bold', border: 'none', background: 'none', cursor: 'pointer' }}>Login here</button></p>
                </div>
            </div>
        </div>
    );
};

const Footer = ({ isDarkMode }) => {
    const footerBg = isDarkMode ? '#0c101b' : colors.secondary;
    const textColor = '#e2e8f0';
    const linkColor = isDarkMode ? colors.accent : colors.warning;
    const hoverColor = isDarkMode ? 'white' : colors.primary;

    return (
        <footer style={{ backgroundColor: footerBg, color: textColor, padding: '2rem 1rem', marginTop: 'auto' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>

                    {/* Branding and Social */}
                    <div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>YuvaSaathi</h3>
                        <p style={{ lineHeight: '1.5', marginBottom: '1rem', fontSize: '0.875rem' }}>
                            A Government of Bihar initiative for youth empowerment. Our mission is to provide a comprehensive platform for skill development, employment, and career guidance.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <a href="#" style={{ color: textColor }}><Facebook size={20} /></a>
                            <a href="#" style={{ color: textColor }}><Twitter size={20} /></a>
                            <a href="#" style={{ color: textColor }}><Youtube size={20} /></a>
                            <a href="#" style={{ color: textColor }}><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>Quick Links</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Home</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>About Us</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Contact</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Jobs</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Skills</a></li>
                        </ul>
                    </div>

                    {/* Government Portals */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>Government Portals</h4>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Digital India</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Skill India</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>National Career Service</a></li>
                            <li style={{ marginBottom: '0.5rem' }}><a href="#" style={{ color: textColor, textDecoration: 'none', fontSize: '0.875rem' }}>Ministry of Labour & Employment</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>Contact Info</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.875rem' }}>
                            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <Locate size={16} style={{ marginRight: '0.5rem', color: linkColor, marginTop: '0.2rem' }} />
                                <span>Patna, Bihar, India</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <Mail size={16} style={{ marginRight: '0.5rem', color: linkColor, marginTop: '0.2rem' }} />
                                <span>contact@yuvasaathi.bih.nic.in</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                <Phone size={16} style={{ marginRight: '0.5rem', color: linkColor, marginTop: '0.2rem' }} />
                                <span>+91 12345 67890</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div style={{ borderTop: `1px solid ${textColor}`, paddingTop: '1.5rem', marginTop: '1.5rem', textAlign: 'center', fontSize: '0.75rem' }}>
                    <p>&copy; 2025 YuvaSaathi, Government of Bihar. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};


const App = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [contentProps, setContentProps] = useState(null);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <HomePage setCurrentPage={setCurrentPage} setContentProps={setContentProps} isDarkMode={isDarkMode} />;
            case 'jobs':
            case 'skills':
            case 'assessments':
                return <SectionPage page={currentPage} setCurrentPage={setCurrentPage} setContentProps={setContentProps} isDarkMode={isDarkMode} />;
            case 'about':
                return <AboutPage isDarkMode={isDarkMode} />;
            case 'content':
                return <ContentPage contentProps={contentProps} setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />;
            case 'login':
                return <LoginPage setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />;
            case 'register':
                return <RegisterPage setCurrentPage={setCurrentPage} isDarkMode={isDarkMode} />;
            default:
                return <HomePage setCurrentPage={setCurrentPage} setContentProps={setContentProps} isDarkMode={isDarkMode} />;
        }
    };

    const navBg = isDarkMode ? colors.secondary : colors.cardLight;
    const navText = isDarkMode ? colors.textLight : colors.textDark;
    const navHoverBg = isDarkMode ? '#374151' : '#f3f4f6';
    const navActiveBg = isDarkMode ? colors.primary : colors.primary;

    return (
        <div style={{ fontFamily: 'sans-serif' }}>
            <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', backgroundColor: navBg, color: navText, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap' }}>
                <button
                    onClick={() => setCurrentPage('home')}
                    style={{
                        fontSize: '1.75rem',
                        fontWeight: 'bold',
                        color: isDarkMode ? colors.accent : colors.primary,
                        transition: 'transform 0.3s, color 0.3s',
                        cursor: 'pointer',
                        border: 'none',
                        background: 'none',
                        letterSpacing: '-1px'
                    }}
                >
                    YuvaSaathi
                </button>
                <ul style={{ display: 'flex', gap: '0.75rem', listStyle: 'none', padding: 0, margin: '0.5rem 0', '@media (max-width: 768px)': { display: 'none' } }}>
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <button onClick={() => setCurrentPage(item.page)} style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderRadius: '0.5rem', color: navText, backgroundColor: currentPage === item.page ? navActiveBg : 'transparent', transition: 'background-color 0.3s, color 0.3s', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                                <item.icon size={16} style={{ marginRight: '0.5rem' }} />
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={() => setCurrentPage('login')} className="animated-button" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: colors.primary, color: '#fff', fontWeight: 'bold', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                        <LogIn size={16} style={{ marginRight: '0.25rem' }} /> Login
                    </button>
                    <button onClick={() => setCurrentPage('register')} className="animated-button" style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: colors.accent, color: colors.textDark, fontWeight: 'bold', fontSize: '0.9rem', border: 'none', cursor: 'pointer' }}>
                        <UserPlus size={16} style={{ marginRight: '0.25rem' }} /> Register
                    </button>
                    <button onClick={toggleDarkMode} style={{ padding: '0.75rem', borderRadius: '50%', backgroundColor: navHoverBg, color: navText, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </nav>
            <main>
                {renderPage()}
            </main>
            <Footer isDarkMode={isDarkMode} />
        </div>
    );
};

export default App;
