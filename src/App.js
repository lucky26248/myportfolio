import React, { useEffect } from 'react';
import Header from './Components/Header';
import About from './Components/About';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
import Contact from './Components/Contacts';
import Tools from './Components/Tools';
import Certifications from './Components/Certifications';
import LeetCodeDashboard from './Components/LeetCodeDashboard';
import Footer from './Components/Footer';
import Experience from './Components/Experience';
import { profileImage } from './config/config';
import Dashboard from './Components/Album/Dashboard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChatBox from './Components/ChatBox';
import { PAGE_TITLE } from './config/config';

function App() {

  // Set the favicon dynamically
  const link = document.createElement('link');
  link.rel = 'icon';
  link.href = profileImage; // Use the profile image as favicon
  document.head.appendChild(link);
  document.title = PAGE_TITLE; // Set the page title dynamically

  useEffect(() => {
    fetch('https://ass-server-4qwz.onrender.com/api/track-visit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-black to-gray-800 text-white min-h-screen">
      <Header />
      <div className="fixed bottom-0 right-0 z-50">
        <ChatBox />
      </div>
      <main className="pt-14 ">
        <section className=" m-0 p-4"> {/* Added About Section */}
          <About />
        </section>
        <section className="m-0 p-4"> {/* Added Experience Section */}
          <Experience />
        </section>
        <section className=" m-0 p-4"> {/* Added Contact Section */}
          <Contact />
        </section>
        <section className=" m-0 p-4"> {/* Added Certifications Section */}
          <Certifications />
        </section>
        <section className=" m-0 p-4"> {/* Added Skills Sectionn */}
          <Skills />
        </section>
        <section className=" m-0 p-4"> {/* Added Tools Section */}
          <Tools />
        </section>
        <section className=" m-0 p-4"> {/* Added LeetCodeDashboard Section */}
          <LeetCodeDashboard />
        </section>
        <section className=" m-0 p-4"> {/* Added Projects Section */}
          <Projects />
        </section>
        <section className=" m-0 p-4"> {/* Added Footer Section */}
          <Dashboard />
        </section>
        <section className=" m-0 p-4"> {/* Added Footer Section */}
          <Footer />
        </section>
      </main>
    </div>
  );
}

export default App;