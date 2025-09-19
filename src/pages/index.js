export default function Home() {
  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '1rem',
      color: 'white'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨 SwapStudio</h1>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Professional AI Face & Video Swap</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Transform faces in photos and videos with cutting-edge AI technology.</p>
          <p>High-quality results, secure processing, and completely free to use.</p>
        </div>

        {/* Face Swap Section */}
        <div 
          id="face-swap-section"
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '2rem'
          }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>📸 Face Swap</h3>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '2px dashed rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                id="source-upload"
              />
              <label htmlFor="source-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Upload Source Face</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: '0.8' }}>The face you want to use</p>
              </label>
            </div>
            
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '2px dashed rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              <input 
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }} 
                id="target-upload"
              />
              <label htmlFor="target-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Upload Target Image</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: '0.8' }}>The image to modify</p>
              </label>
            </div>
          </div>
          
          <button 
            id="swap-button"
            style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)',
              border: 'none',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => alert('Please upload both images first!')}>
            ⚡ Upload Both Images First
          </button>
        </div>

        {/* Feature Cards */}
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
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>🔒 Secure & Private</h4>
            <p>Your images are processed securely and deleted after 24 hours.</p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>⚡ Fast Processing</h4>
            <p>Advanced AI processing delivers results in seconds, not minutes.</p>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>⭐ HD Quality</h4>
            <p>Industry-leading AI models ensure natural, high-quality results.</p>
          </div>
        </div>

        <footer style={{ marginTop: '3rem', opacity: '0.7', fontSize: '0.9rem' }}>
          <p>© 2025 SwapStudio - Professional AI face and video swapping technology</p>
        </footer>
      </div>
    </div>
  );
}
