import React from 'react';
import Meta from '../components/Meta';

const Settings = () => {
  const blogPosts = [
    { id: 1, title: 'Getting Started with React', excerpt: 'A beginner-friendly guide to the most popular JavaScript library.', imageUrl: 'https://picsum.photos/400/300?random=7' },
    { id: 2, title: 'Mastering Asynchronous JavaScript', excerpt: 'Learn how to handle async operations with ease.', imageUrl: 'https://picsum.photos/400/300?random=8' },
    { id: 3, title: 'The Power of Server-Side Rendering', excerpt: 'Improve your web app’s performance and SEO.', imageUrl: 'https://picsum.photos/400/300?random=9' },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What topics do you write about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "I write about web development, with a focus on JavaScript, React, and Node.js."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request a blog topic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Feel free to reach out with your suggestions."
        }
      }
    ]
  };

  return (
    <div>
      <Meta 
        title="My Tech Blog"
        description="Exploring the world of web development, one post at a time."
      >
        <meta property="og:title" content="My Tech Blog" />
        <meta property="og:description" content="A collection of articles and tutorials on modern web development."/>
        <meta property="og:image" content="https://picsum.photos/1200/630?random=10" />
        <meta property="og:url" content="http://localhost:8081/settings" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Meta>
      <h1>Blog</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {blogPosts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
