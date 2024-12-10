document.getElementById('scanButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value.trim();
  
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }
  
    fetch(url)
      .then(response => {
        const resultList = document.getElementById('resultList');
        resultList.innerHTML = '';
  
        // Check for HTTPS
        if (url.startsWith('https://')) {
          appendResult('Using HTTPS: ✅');
        } else {
          appendResult('Using HTTPS: ❌ (Consider switching to HTTPS)');
        }
  
        // Check HTTP headers
        const securityHeaders = ['Content-Security-Policy', 'X-Frame-Options'];
        securityHeaders.forEach(header => {
          if (response.headers.get(header)) {
            appendResult(`${header}: ✅`);
          } else {
            appendResult(`${header}: ❌ (Header missing)`);
          }
        });
      })
      .catch(() => {
        alert('Failed to fetch website details. Ensure the URL is correct.');
      });
  });
  
  function appendResult(message) {
    const li = document.createElement('li');
    li.textContent = message;
    document.getElementById('resultList').appendChild(li);
  }
  