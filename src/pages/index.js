export default function Home() {
  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '2rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨 SwapStudio</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Professional AI Face & Video Swap</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Transform faces in photos and videos with cutting-edge AI technology.</p>
          <p>High-quality results, secure processing, and completely free to use.</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🔒 Secure & Private</h3>
            <p>Your images are processed securely and deleted after 24 hours.</p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>⚡ Fast Processing</h3>
            <p>Advanced AI processing delivers results in seconds, not minutes.</p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>⭐ HD Quality</h3>
            <p>Industry-leading AI models ensure natural, high-quality results.</p>
          </div>
        </div>

        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)'
        }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>🚀 Coming Soon: Interactive Face Swap</h3>
          <p>Upload your photos and videos to swap faces instantly!</p>
          <p style={{ fontSize: '0.9rem', marginTop: '1rem', opacity: '0.8' }}>
            Currently under development - check back soon for the full experience.
          </p>
        </div>

        <footer style={{ marginTop: '3rem', opacity: '0.7', fontSize: '0.9rem' }}>
          <p>© 2025 SwapStudio - Professional AI face and video swapping technology</p>
        </footer>
      </div>
    </div>
  );
  }
  
