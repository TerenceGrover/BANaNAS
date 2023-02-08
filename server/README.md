<h1>BANANAS Backend</h1>

<p>Welcome to the backend repository for the BANANAS application, developed by the dynamic duo of Alessio and Seth! 🍌</p>

<p>This backend is built using the latest and greatest technology stack, including Node.js, Express, PostgreSQL, Python, Beautiful Soup, Selenium, and C++. 💻</p>

<h2>Data Sources</h2>
<p>The BANANAS backend pulls data from three powerhouses: the World Bank API, Open Weather API, and Wikipedia. 💥</p>

<h2>API Endpoint</h2>
<p>Get ready for a wild ride, because the backend exposes a single API endpoint, reachable at <code>https://api.data-banana.com/api</code>. 🚀 To query for data, simply pass the category as the first parameter in the URL, and the bananas will start flying! For example:</p>
<pre>
<code>https://api.data-banana.com/api/Health</code>
</pre>
<p>will return all the juicy metrics available for the Health category.</p>

<h2>Metric Descriptions</h2>
<p>Curious about what a specific metric means? No problem! Just call the endpoint with the metric name, and the backend will give you a rundown. For example:</p>
<pre>
<code>https://api.data-banana.com/api/Health/BirthRate</code>
</pre>
<p>will give you all the details on the BirthRate metric.</p>

<h2>Data Retrieval</h2>
<p>Ready for the real deal? To retrieve actual data, you'll need to provide a country, start year, and end year. Just like this:</p>
<pre>
<code>https://api.data-banana.com/api/Health/BirthRate/Italy/2010/2017</code>
</pre>
<p>and the backend will send you a JSON with the birthrate data for Italy in the years 2010-2017. Sweet!</p>

<h2>Scraping Wikipedia</h2>
<p>Getting the data from Wikipedia wasn't easy, but the fearless Seth was up for the challenge. 💪 He used Python and Beautiful Soup to scrape the site and get all the information needed for the BANANAS backend. Talk about dedication!</p>

<h2>Contributors</h2>
<ul>
  <li>Alessio: The mastermind behind the backend, who always knows the right way to peel a banana.</li>
  <li>Seth: The coding wizard who makes sure everything runs smoothly, and who put in all the hard work to get the Wikipedia data.</li>
</ul>

<p>So grab a banana, and let's start exploring the world of BANANAS! 🍌🌍</p>
