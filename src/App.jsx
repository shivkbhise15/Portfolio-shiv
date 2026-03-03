import React, { useState, useEffect } from 'react';
import './App.css';

// ── NAVBAR ──────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">shiv<span>.dev</span></div>
      <ul className="nav-links">
        {['About', 'Skills', 'Projects', 'Contact'].map(link => (
          <li key={link}><a href={`#${link.toLowerCase()}`}>{link}</a></li>
        ))}
      </ul>
    </nav>
  );
};

// ── HERO ─────────────────────────────────────────────────
const Hero = () => {
  const roles = ['MERN Stack Developer', 'Aspiring AI Engineer', 'Data Science Enthusiast', 'DSA Learner'];
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    let timeout;
    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 100);
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length - 1)), 50);
    } else {
      setIsDeleting(false);
      setCurrentRole(prev => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentRole]);

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="hero-greeting">Hi there, I'm</p>
        <h1 className="hero-name">Shiva Kumar Bhise</h1>
        <div className="hero-role">
          <span className="role-text">{displayed}</span>
          <span className="cursor">|</span>
        </div>
        <p className="hero-description">
          3rd Year Engineering Student @ SVIT · Building on the web & navigating towards AI/ML
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="#contact" className="btn btn-secondary">Get In Touch</a>
        </div>
        <div className="hero-socials">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="code-block">
          <pre>{`const shiv = {
  college: "SVIT, B.Tech CSE",
  year: "3rd Year",
  stack: ["React", "Node", "MongoDB"],
  learning: ["ML", "DSA", "Python"],
  goal: "AI Engineer 🚀"
};`}</pre>
        </div>
      </div>
    </section>
  );
};

// ── ABOUT ────────────────────────────────────────────────
const About = () => (
  <section className="about section" id="about">
    <div className="section-container">
      <h2 className="section-title">About <span>Me</span></h2>
      <div className="about-text">
        <p>
          I'm a 3rd-year Engineering student at <strong>SVIT</strong>, passionate about building
          full-stack applications and transitioning into the world of AI & Machine Learning.
        </p>
        <p>
          I've built a strong foundation in the <strong>MERN stack</strong> and am simultaneously
          grinding through <strong>DSA</strong> and exploring <strong>ML concepts</strong>.
          I believe in learning by doing — every project is proof of progress.
        </p>
        <p>
          Long-term goal: become an <strong>AI Engineer / Data Scientist</strong> who can build 
          intelligent systems end-to-end.
        </p>
        <div className="about-details">
          {[
            ['🎓', 'SVIT, B.Tech CSE'],
            ['📍', 'Secunderabad, Telangana'],
            ['🎯', 'AI / ML Engineer'],
            ['📚', '3rd Year'],
          ].map(([icon, text]) => (
            <div className="detail" key={text}><span>{icon}</span>{text}</div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// ── SKILLS ───────────────────────────────────────────────
const Skills = () => {
  const groups = [
    { category: 'Web Development', icon: '🌐', skills: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'HTML/CSS'] },
    { category: 'AI / ML', icon: '🤖', skills: ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib', 'Learning...'] },
    { category: 'CS Fundamentals', icon: '💡', skills: ['Data Structures', 'Algorithms', 'Computer Networks', 'DBMS', 'OS Concepts'] },
    { category: 'Tools', icon: '🛠️', skills: ['Git & GitHub', 'VS Code', 'Postman', 'MongoDB Atlas', 'Vercel'] },
  ];

  return (
    <section className="skills section" id="skills">
      <div className="section-container">
        <h2 className="section-title">My <span>Skills</span></h2>
        <div className="skills-grid">
          {groups.map(g => (
            <div className="skill-card" key={g.category}>
              <div className="skill-card-header">
                <span>{g.icon}</span><h3>{g.category}</h3>
              </div>
              <div className="skill-tags">
                {g.skills.map(s => <span className="skill-tag" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── PROJECTS ─────────────────────────────────────────────
const Projects = () => {
  const projects = [
    {
      title: 'Portfolio Website',
      desc: 'A responsive personal portfolio built with React.js showcasing my skills and journey.',
      tags: ['React', 'CSS', 'Vite'],
      github: 'https://github.com/shivkbhise15', live: '#', featured: true,
    },
    {
      title: 'MERN Full-Stack App',
      desc: 'Full-stack app with JWT auth, REST API, and MongoDB — built end-to-end.',
      tags: ['MongoDB', 'Express', 'React', 'Node.js'],
      github: 'https://github.com/shivkbhise15', live: '#', featured: false,
    },
    {
      title: 'ML Classifier (WIP)',
      desc: 'A machine learning project for data classification — currently in progress.',
      tags: ['Python', 'Scikit-learn', 'Pandas'],
      github: 'https://github.com/shivkbhise15', live: null, featured: false,
    },
  ];

  return (
    <section className="projects section" id="projects">
      <div className="section-container">
        <h2 className="section-title">My <span>Projects</span></h2>
        <div className="projects-grid">
          {projects.map(p => (
            <div className={`project-card ${p.featured ? 'featured' : ''}`} key={p.title}>
              {p.featured && <span className="featured-badge">⭐ Featured</span>}
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-tags">
                {p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}
              </div>
              <div className="project-links">
                <a href={p.github} target="_blank" rel="noreferrer">GitHub →</a>
                {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live →</a>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── CONTACT ──────────────────────────────────────────────
const Contact = () => (
  <section className="contact section" id="contact">
    <div className="section-container">
      <h2 className="section-title">Get In <span>Touch</span></h2>
      <div className="contact-content">
        <p>
          Open to internships, project collaborations, or just a good tech chat.
          My inbox is always open!
        </p>
        <div className="contact-links">
          <a href="shivkbhise@gmail.com" className="btn btn-primary">Say Hello 👋</a>
          <a href="https://www.linkedin.com/in/shiv-k-bhise-49a486359/" className="btn btn-secondary" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="https://github.com/shivkbhise15" className="btn btn-secondary" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </div>
  </section>
);

// ── FOOTER ───────────────────────────────────────────────
const Footer = () => (
  <footer className="footer">
    <p>Designed & Built by <span>Shiva K Bhise  & Claude too😉 </span> · {new Date().getFullYear()}</p>
  </footer>
);

// ── APP ──────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
