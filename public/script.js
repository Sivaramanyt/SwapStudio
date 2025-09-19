// PART 2A - Event Listeners (First JavaScript Part)
// Add this in a <script> tag or separate JS file

document.addEventListener('DOMContentLoaded', function() {
  // Source file upload handler
  document.getElementById('source-upload').addEventListener('change', function(event) {
    const sourceFile = event.target;
    const targetFile = document.getElementById('target-upload');
    const button = document.getElementById('swap-button');
    
    // Update source display with green checkmark
    const sourceLabel = sourceFile.parentElement.querySelector('p');
    if (sourceFile.files.length > 0) {
      sourceLabel.innerHTML = `✅ ${sourceFile.files[0].name.substring(0, 15)}...`;
      sourceLabel.style.color = '#28a745';
    }
    
    // Check if both files are ready
    if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
      button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      button.innerHTML = '🚀 Start AI Processing';
      button.onclick = processImages;
    }
  });

  // Target file upload handler  
  document.getElementById('target-upload').addEventListener('change', function(event) {
    const targetFile = event.target;
    const sourceFile = document.getElementById('source-upload');
    const button = document.getElementById('swap-button');
    
    // Update target display with green checkmark
    const targetLabel = targetFile.parentElement.querySelector('p');
    if (targetFile.files.length > 0) {
      targetLabel.innerHTML = `✅ ${targetFile.files[0].name.substring(0, 15)}...`;
      targetLabel.style.color = '#28a745';
    }
    
    // Check if both files are ready
    if (sourceFile.files.length > 0 && targetFile.files.length > 0) {
      button.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
      button.innerHTML = '🚀 Start AI Processing';
      button.onclick = processImages;
    }
  });
});
    // PART 2B - Processing Function (Second JavaScript Part)
// Add this right after Part 2A

function processImages() {
  const button = document.getElementById('swap-button');
  button.innerHTML = '⏳ Processing... Please wait';
  button.style.background = 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)';
  
  // Simulate realistic face swap processing
  setTimeout(() => {
    // Hide the face swap section
    document.getElementById('face-swap-section').style.display = 'none';
    
    // Create result display section
    createResultDisplay();
    
    // Get uploaded files
    const sourceFile = document.getElementById('source-upload').files[0];
    const targetFileInput = document.getElementById('target-upload').files[0];
    
    const sourceImg = new Image();
    const targetImg = new Image();
    
    let imagesLoaded = 0;
    const checkImagesLoaded = () => {
      imagesLoaded++;
      if (imagesLoaded === 2) {
        // Create realistic blended result using Canvas
        const canvas = document.getElementById('result-canvas');
        const ctx = canvas.getContext('2d');
        
        // Step 1: Draw target image as base
        ctx.drawImage(targetImg, 0, 0, 120, 120);
        
        // Step 2: Create face blend area (center portion)
        ctx.globalCompositeOperation = 'overlay';
        ctx.globalAlpha = 0.6;
        // Face area blend
        ctx.drawImage(sourceImg, 25, 20, 70, 80);
        
        // Step 3: Add facial features blend
        ctx.globalCompositeOperation = 'soft-light';
        ctx.globalAlpha = 0.4;
        // Eyes and nose area
        ctx.drawImage(sourceImg, 30, 25, 60, 40);
        
        // Step 4: Final color adjustment
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.2;
        ctx.drawImage(targetImg, 0, 0, 120, 120);
        
        // Reset blend mode
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1.0;
        
        // Set preview images
        document.getElementById('source-preview').src = sourceImg.src;
        document.getElementById('target-preview').src = targetImg.src;
        document.getElementById('result-image-large').src = canvas.toDataURL();
        
        // Show result
        document.getElementById('result-display').style.display = 'block';
        document.getElementById('result-display').scrollIntoView({ behavior: 'smooth' });
      }
    };
    
    sourceImg.onload = checkImagesLoaded;
    targetImg.onload = checkImagesLoaded;
    
    sourceImg.src = URL.createObjectURL(sourceFile);
    targetImg.src = URL.createObjectURL(targetFileInput);
  }, 3000);
}
// PART 2C - Result Display & Button Functions (Third JavaScript Part)
// Add this right after Part 2B

function createResultDisplay() {
  const resultHTML = `
    <div 
      id="result-display" 
      style="
        background: rgba(255,255,255,0.1);
        padding: 2rem;
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.2);
        margin-bottom: 2rem;
        display: none;
      ">
      <h3 style="font-size: 1.5rem; margin-bottom: 1.5rem; color: white;">✅ Face Swap Complete!</h3>
      
      <div style="
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); 
        gap: 0.5rem; 
        margin-bottom: 1.5rem;
      ">
        <div style="text-align: center;">
          <p style="font-size: 0.8rem; margin-bottom: 0.5rem; opacity: 0.8; color: white;">Source Face</p>
          <img 
            id="source-preview" 
            style="
              width: 100%;
              max-width: 120px;
              height: 120px;
              object-fit: cover;
              border-radius: 8px;
              border: 1px solid rgba(255,255,255,0.3);
            "
          />
        </div>
        
        <div style="
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        ">
          ➕
        </div>
        
        <div style="text-align: center;">
          <p style="font-size: 0.8rem; margin-bottom: 0.5rem; opacity: 0.8; color: white;">Target Image</p>
          <img 
            id="target-preview" 
            style="
              width: 100%;
              max-width: 120px;
              height: 120px;
              object-fit: cover;
              border-radius: 8px;
              border: 1px solid rgba(255,255,255,0.3);
            "
          />
        </div>
        
        <div style="
          display: flex; 
          align-items: center; 
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        ">
          =
        </div>
        
        <div style="text-align: center;">
          <p style="font-size: 0.8rem; margin-bottom: 0.5rem; opacity: 0.8; color: white;">AI Result</p>
          <canvas 
            id="result-canvas" 
            width="120" 
            height="120"
            style="
              width: 100%;
              max-width: 120px;
              height: 120px;
              border-radius: 8px;
              border: 2px solid #28a745;
              box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
            "
          ></canvas>
        </div>
      </div>
      
      <div style="margin-bottom: 1.5rem;">
        <img 
          id="result-image-large" 
          style="
            max-width: 100%;
            max-height: 400px;
            border-radius: 8px;
            border: 2px solid rgba(255,255,255,0.3);
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
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
          onclick="shareResult()"
          style="
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
            border: none;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: bold;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
          ">
          🔗 Share Result
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
    </div>
  `;
  
  // Insert result display after face swap section
  const faceSwapSection = document.getElementById('face-swap-section');
  faceSwapSection.insertAdjacentHTML('afterend', resultHTML);
}

// Button functions
function downloadResult() {
  const link = document.createElement('a');
  const canvas = document.getElementById('result-canvas');
  link.download = 'face-swap-result.jpg';
  link.href = canvas.toDataURL('image/jpeg', 0.9);
  link.click();
}

function shareResult() {
  if (navigator.share) {
    const canvas = document.getElementById('result-canvas');
    canvas.toBlob((blob) => {
      const file = new File([blob], 'face-swap-result.jpg', { type: 'image/jpeg' });
      navigator.share({
        title: 'Check out my face swap result!',
        text: 'Created with SwapStudio - Professional AI Face Swap',
        files: [file]
      });
    });
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard! Share it with friends.');
  }
}

function tryAnother() {
  document.getElementById('result-display').style.display = 'none';
  document.getElementById('face-swap-section').style.display = 'block';
  // Reset form
  document.getElementById('source-upload').value = '';
  document.getElementById('target-upload').value = '';
  const button = document.getElementById('swap-button');
  button.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)';
  button.innerHTML = '⚡ Upload Both Images First';
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
    }
    
