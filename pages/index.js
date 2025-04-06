
import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Home = () => {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const checkLinks = async () => {
    setLoading(true);
    setResults([]);
    try {
      const response = await fetch(`/api/check-links?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      setResults(data.brokenLinks);
    } catch (error) {
      console.error('Error checking links:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Broken Links Checker</h1>
      <Input
        type="url"
        placeholder="Enter your website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={checkLinks} disabled={loading}>
        {loading ? 'Checking...' : 'Check Broken Links'}
      </Button>
      <div>
        {results.length > 0 ? (
          results.map((link, index) => (
            <Card key={index}>
              <CardContent>
                <p>Broken Link: <a href={link} target="_blank" rel="noopener noreferrer">{link}</a></p>
              </CardContent>
            </Card>
          ))
        ) : (
          !loading && <p>No broken links found or result pending.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
