import React from 'react';
import Meta from '../components/Meta';

const Profile = () => {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are your primary skills?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I specialize in full-stack JavaScript development with a focus on React, Node.js, and modern web technologies."
        }
      },
      {
        "@type": "Question",
        "name": "How can I contact you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can reach me via email at [your-email]@example.com or connect with me on LinkedIn."
        }
      }
    ]
  };

  return (
    <div>
      <Meta 
        title="Developer Profile - Jane Doe"
        description="Learn more about Jane Doe, a passionate full-stack developer."
      >
        <meta property="og:title" content="Developer Profile - Jane Doe" />
        <meta property="og:description" content="Discover the skills, projects, and experience of Jane Doe."/>
        <meta property="og:image" content="https://picsum.photos/1200/630?random=5" />
        <meta property="og:url" content="http://localhost:8081/profile" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Meta>
      <h1>Jane Doe</h1>
      <img src="https://picsum.photos/200/200?random=6" alt="Jane Doe, Developer" style={{ borderRadius: '50%' }} />
      <h2>Full-Stack Developer</h2>
      <p>I build beautiful and functional web applications.</p>
      <h3>Skills</h3>
      <ul>
        <li>React</li>
        <li>Node.js</li>
        <li>GraphQL</li>
        <li>TypeScript</li>
      </ul>
    </div>
  );
};

export default Profile;
