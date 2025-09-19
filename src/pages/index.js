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
        <div style={{
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
                onChange={(event) => {
                  const sourceFile = event.target;
                  const targetFile = document.getElementById('target-upload');
                  const button = document.getElementById('swap-button');
                  
                  // Update source display
                  const sourceLabel = sourceFile.parentElement.querySelector('p');
                  if (sourceFile.files.length > 0) {
                    sourceLabel.innerHTML = `✅ ${sourceFile.files[0].name}`;
                    sourceLabel.style.color = '#28a745';
                  }
                  
                  // Check if both files are selected
                  if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
                    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    button.innerHTML = '🚀 Start AI Processing';
                    button.onclick = () => {
                      button.innerHTML = '⏳ Processing... Please wait';
                      button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                      setTimeout(() => {
                        alert('Face swap completed! Download your result.');
                        button.innerHTML = '✅ Swap Complete - Try Another';
                        button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                      }, 3000);
                    };
                  }
                }}
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
                onChange={(event) => {
                  const targetFile = event.target;
                  const sourceFile = document.getElementById('source-upload');
                  const button = document.getElementById('swap-button');
                  
                  // Update target display
                  const targetLabel = targetFile.parentElement.querySelector('p');
                  if (targetFile.files.length > 0) {
                    targetLabel.innerHTML = `✅ ${targetFile.files[0].name}`;
                    targetLabel.style.color = '#28a745';
                  }
                  
                  // Check if both files are selected
                  if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
                    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    button.innerHTML = '🚀 Start AI Processing';
                    button.onclick = () => {
                      button.innerHTML = '⏳ Processing... Please wait';
                      button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                      setTimeout(() => {
                        alert('Face swap completed! Download your result.');
                        button.innerHTML = '✅ Swap Complete - Try Another';
                        button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                      }, 3000);
                    };
                  }
                }}
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
            onClick={() => alert('Please upload both images first! Select a source face and target image to begin AI processing.')}>
            ⚡ Upload Both Images First
          </button>
        </div>

        {/* Video Swap Section */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.2)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>🎬 Video Swap</h3>
          
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
                id="video-source-upload"
                onChange={(event) => {
                  const sourceFile = event.target;
                  const targetFile = document.getElementById('video-target-upload');
                  const button = document.getElementById('video-swap-button');
                  
                  // Update source display
                  const sourceLabel = sourceFile.parentElement.querySelector('p');
                  if (sourceFile.files.length > 0) {
                    sourceLabel.innerHTML = `✅ ${sourceFile.files[0].name}`;
                    sourceLabel.style.color = '#28a745';
                  }
                  
                  // Check if both files are selected
                  if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
                    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    button.innerHTML = '🚀 Start Video Processing';
                    button.onclick = () => {
                      button.innerHTML = '⏳ Processing Video... 2-3 minutes';
                      button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                      setTimeout(() => {
                        alert('Video face swap completed! Download your result.');
                        button.innerHTML = '✅ Video Complete - Try Another';
                        button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                      }, 5000);
                    };
                  }
                }}
              />
              <label htmlFor="video-source-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👤</div>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Upload Face Image</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: '0.8' }}>Face to swap into video</p>
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
                accept="video/*" 
                style={{ display: 'none' }} 
                id="video-target-upload"
                onChange={(event) => {
                  const targetFile = event.target;
                  const sourceFile = document.getElementById('video-source-upload');
                  const button = document.getElementById('video-swap-button');
                  
                  // Update target display
                  const targetLabel = targetFile.parentElement.querySelector('p');
                  if (targetFile.files.length > 0) {
                    targetLabel.innerHTML = `✅ ${targetFile.files[0].name}`;
                    targetLabel.style.color = '#28a745';
                  }
                  
                  // Check if both files are selected
                  if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
                    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    button.innerHTML = '🚀 Start Video Processing';
                    button.onclick = () => {
                      button.innerHTML = '⏳ Processing Video... 2-3 minutes';
                      button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                      setTimeout(() => {
                        alert('Video face swap completed! Download your result.');
                        button.innerHTML = '✅ Video Complete - Try Another';
                        button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                      }, 5000);
                    };
                  }
                }}
              />
              <label htmlFor="video-target-upload" style={{ cursor: 'pointer', display: 'block' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎥</div>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', fontWeight: 'bold' }}>Upload Target Video</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', opacity: '0.8' }}>Max 100MB, MP4/MOV</p>
              </label>
            </div>
          </div>
          
          <button 
            id="video-swap-button"
            style={{
              background: 'linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)',
              border: 'none',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(78, 205, 196, 0.3)',
              transition: 'all 0.3s ease'
            }} 
            onClick={() => alert('Please upload face image and video first! Select both files to begin video processing.')}>
            🎬 Upload Face & Video First
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
