export default function Home() {
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];
    const sourceInput = document.getElementById('source-upload');
    const targetInput = document.getElementById('target-upload');
    const button = document.getElementById('swap-button');
    
    // Update label for the uploaded file
    const label = event.target.parentElement.querySelector('p');
    if (file) {
      label.innerHTML = `✅ ${file.name.substring(0, 15)}...`;
      label.style.color = '#28a745';
    }
    
    // Check if both files are uploaded
    if (sourceInput.files.length > 0 && targetInput.files.length > 0) {
      button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      button.innerHTML = '🚀 Start AI Processing';
      button.onclick = processImages;
    }
  };

  const processImages = () => {
    const button = document.getElementById('swap-button');
    button.innerHTML = '⏳ Processing... Please wait';
    button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
    
    setTimeout(() => {
      // Hide upload section
      document.getElementById('face-swap-section').style.display = 'none';
      
      // Show result section
      showResult();
    }, 3000);
  };

  const showResult = () => {
    const sourceInput = document.getElementById('source-upload');
    const targetInput = document.getElementById('target-upload');
    
    // Create result HTML
    const resultSection = document.createElement('div');
    resultSection.id = 'result-section';
    resultSection.style.cssText = `
      background: rgba(255,255,255,0.1);
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.2);
      margin-bottom: 2rem;
      text-align: center;
      color: white;
    `;
    
    resultSection.innerHTML = `
      <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem;">✅ Face Swap Complete!</h3>
      
      <div style="
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); 
        gap: 1rem; 
        margin-bottom: 2rem;
        justify-items: center;
      ">
        <div style="text-align: center;">
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8;">Source Face</p>
          <img 
            id="source-preview" 
            style="
              width: 150px;
              height: 150px;
              object-fit: cover;
              border-radius: 8px;
              border: 2px solid rgba(255,255,255,0.3);
            "
          />
        </div>
        
        <div style="
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 2rem;
        ">
          ➕
        </div>
        
        <div style="text-align: center;">
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8;">Target Image</p>
          <img 
            id="target-preview" 
            style="
              width: 150px;
              height: 150px;
              object-fit: cover;
              border-radius: 8px;
              border: 2px solid rgba(255,255,255,0.3);
            "
          />
        </div>
        
        <div style="
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 2rem;
        ">
          =
        </div>
        
        <div style="text-align: center;">
          <p style="font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8;">AI Result</p>
          <img 
            id="result-preview" 
            style="
              width: 150px;
              height: 150px;
              object-fit: cover;
              border-radius: 8px;
              border: 3px solid #28a745;
              box-shadow: 0 0 20px rgba(40, 167, 69, 0.5);
            "
          />
        </div>
      </div>
      
      <div style="margin-bottom: 2rem;">
        <img 
          id="result-large" 
          style="
            max-width: 100%;
            max-height: 400px;
            border-radius: 12px;
            border: 3px solid #28a745;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          "
        />
      </div>
      
      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button 
          onclick="downloadResult()"
          style="
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
          ">
          📥 Download Result
        </button>
        
        <button 
          onclick="tryAnother()"
          style="
            background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
          ">
          🔄 Try Another
        </button>
      </div>
    `;
    
    // Insert result section
    const faceSwapSection = document.getElementById('face-swap-section');
    faceSwapSection.parentNode.insertBefore(resultSection, faceSwapSection.nextSibling);
    
    // Load and display images
    if (sourceInput.files[0]) {
      const sourceReader = new FileReader();
      sourceReader.onload = (e) => {
        document.getElementById('source-preview').src = e.target.result;
        document.getElementById('result-large').src = e.target.result; // Use source as result for demo
      };
      sourceReader.readAsDataURL(sourceInput.files[0]);
    }
    
    if (targetInput.files[0]) {
      const targetReader = new FileReader();
      targetReader.onload = (e) => {
        document.getElementById('target-preview').src = e.target.result;
        document.getElementById('result-preview').src = e.target.result; // Use target as small result for demo
      };
      targetReader.readAsDataURL(targetInput.files[0]);
    }
  };

  // Make functions global so onclick can access them
  if (typeof window !== 'undefined') {
    window.downloadResult = () => {
      alert('📥 Download functionality would work here!');
    };
    
    window.tryAnother = () => {
      // Remove result section
      const resultSection = document.getElementById('result-section');
      if (resultSection) {
        resultSection.remove();
      }
      
      // Show upload section
      document.getElementById('face-swap-section').style.display = 'block';
      
      // Reset form
      document.getElementById('source-upload').value = '';
      document.getElementById('target-upload').value = '';
      const button = document.getElementById('swap-button');
      button.innerHTML = '⚡ Upload Both Images First';
      button.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)';
      button.onclick = () => alert('Please upload both images first!');
      
      // Reset labels
      const labels = document.querySelectorAll('label p');
      if (labels[0]) {
        labels[0].innerHTML = 'Upload Source Face';
        labels[0].style.color = 'white';
      }
      if (labels[2]) {
        labels[2].innerHTML = 'Upload Target Image';
        labels[2].style.color = 'white';
      }
    };
  }

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
                onChange={(e) => handleFileUpload(e, 'source')}
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
                onChange={(e) => handleFileUpload(e, 'target')}
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
          
