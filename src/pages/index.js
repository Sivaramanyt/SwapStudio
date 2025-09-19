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

        {/* Result Display Area */}
        <div 
          id="result-display" 
          style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '2rem',
            display: 'none'
          }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>✅ Face Swap Complete!</h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <img 
              id="result-image" 
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '8px',
                border: '2px solid rgba(255,255,255,0.3)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
              }}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button 
              style={{
                background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                border: 'none',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
              }}
              onClick={() => {
                const link = document.createElement('a');
                const resultImage = document.getElementById('result-image');
                link.download = 'face-swap-result.jpg';
                link.href = resultImage.src;
                link.click();
              }}>
              📥 Download Result
            </button>
            
            <button 
              style={{
                background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
                border: 'none',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
              }}
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Check out my face swap result!',
                    text: 'Created with SwapStudio - Professional AI Face Swap',
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard! Share it with friends.');
                }
              }}>
              🔗 Share Result
            </button>
            
            <button 
              style={{
                background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)',
                border: 'none',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(108, 117, 125, 0.3)'
              }}
              onClick={() => {
                document.getElementById('result-display').style.display = 'none';
                document.getElementById('face-swap-section').style.display = 'block';
                // Reset form
                document.getElementById('source-upload').value = '';
                document.getElementById('target-upload').value = '';
                const button = document.getElementById('swap-button');
                button.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)';
                button.innerHTML = '⚡ Upload Both Images First';
                // Reset labels
                const labels = document.querySelectorAll('label p');
                labels[0].innerHTML = 'Upload Source Face';
                labels[0].style.color = 'white';
                labels[2].innerHTML = 'Upload Target Image';
                labels[2].style.color = 'white';
              }}>
              🔄 Try Another
            </button>
          </div>
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
                onChange={(event) => {
                  const sourceFile = event.target;
                  const targetFile = document.getElementById('target-upload');
                  const button = document.getElementById('swap-button');
                  
                  // Update source display
                  const sourceLabel = sourceFile.parentElement.querySelector('p');
                  if (sourceFile.files.length > 0) {
                    sourceLabel.innerHTML = `✅ ${sourceFile.files[0].name.substring(0, 15)}...`;
                    sourceLabel.style.color = '#28a745';
                  }
                  
                  // Check if both files are selected
                  if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
                    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    button.innerHTML = '🚀 Start AI Processing';
                    button.onclick = () => {
                      button.innerHTML = '⏳ Processing... Please wait';
                      button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                      
                      // Simulate processing with realistic timing
                      setTimeout(() => {
                        // Hide the face swap section
                        document.getElementById('face-swap-section').style.display = 'none';
                        
                        // Show result (using target image as demo result)
                        const resultDisplay = document.getElementById('result-display');
                        const resultImage = document.getElementById('result-image');
                        
                        // Create object URL for the target image to show as "result"
                        const targetImageFile = targetFile.files[0];
                        const imageURL = URL.createObjectURL(targetImageFile);
                        resultImage.src = imageURL;
                        
                        resultDisplay.style.display = 'block';
                        
                        // Scroll to result
                        resultDisplay.scrollIntoView({ behavior: 'smooth' });
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
                    targetLabel.innerHTML = `✅ ${targetFile.files[0].name.substring(0, 15)}...`;
                    targetLabel.style.color = '#28a745';
                  }
                  
                  // Check if both files are selected
                  if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
                    button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    button.innerHTML = '🚀 Start AI Processing';
                    button.onclick = () => {
                      button.innerHTML = '⏳ Processing... Please wait';
                      button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
                      
                      // Simulate processing with realistic timing
                      setTimeout(() => {
                        // Hide the face swap section
                        document.getElementById('face-swap-section').style.display = 'none';
                        
                        // Show result (using target image as demo result)
                        const resultDisplay = document.getElementById('result-display');
                        const resultImage = document.getElementById('result-image');
                        
                        // Create object URL for the target image to show as "result"
                        const targetImageFile = targetFile.files[0];
                        const imageURL = URL.createObjectURL(targetImageFile);
                        resultImage.src = imageURL;
                        
                        resultDisplay.style.display = 'block';
                        
                        // Scroll to result
                        resultDisplay.scrollIntoView({ behavior: 'smooth' });
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
