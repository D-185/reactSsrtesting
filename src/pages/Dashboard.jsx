import React from 'react';
import Meta from '../components/Meta';

const Dashboard = () => {
  const products = [
    { id: 1, name: 'Wireless Headphones', description: 'High-quality sound and noise cancellation.', imageUrl: 'https://picsum.photos/400/300?random=1' },
    { id: 2, name: 'Smartwatch', description: 'Stay connected and track your fitness.', imageUrl: 'https://picsum.photos/400/300?random=2' },
    { id: 3, name: 'Portable Speaker', description: 'Listen to your favorite music on the go.', imageUrl: 'https://picsum.photos/400/300?random=3' },
    { id: 4, name: 'VR Headset', description: 'Immerse yourself in virtual worlds.', imageUrl: 'https://picsum.photos/400/300?random=4' },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the return policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer a 30-day return policy on all our products."
        }
      },
      {
        "@type": "Question",
        "name": "How do I track my order?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You will receive a tracking number via email once your order has shipped."
        }
      }
    ]
  };

  return (
    <div>
      <Meta 
        title="Product Dashboard - My Awesome Store"
        description="Check out our latest and greatest products."
      >
        <meta property="og:title" content="Product Dashboard - My Awesome Store" />
        <meta property="og:description" content="Discover a wide range of high-quality products."/>
        <meta property="og:image" content="https://picsum.photos/1200/630?random=0" />
        <meta property="og:url" content="http://localhost:8081/" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Meta>
      <h1>Our Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', width: 'calc(50% - 20px)' }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
