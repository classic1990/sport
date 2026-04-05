// RSS Feed API for Pinterest Business integration
// Endpoint: /api/rss.xml

import { getPinsForRSS } from '../services/firestore';

export async function generateRSS() {
  const pins = await getPinsForRSS(50);
  
  const siteUrl = 'https://sportcut-eight.vercel.app';
  const rssDate = new Date().toUTCString();
  
  let items = pins.map(pin => {
    const pubDate = pin.createdAt?.toDate ? pin.createdAt.toDate().toUTCString() : new Date().toUTCString();
    
    return `
    <item>
      <title><![CDATA[${pin.title || 'SPORTCUT Image'}]]></title>
      <link>${pin.sourceUrl || siteUrl}</link>
      <guid>${siteUrl}/pin/${pin.id}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${pin.description || ''}]]></description>
      <enclosure url="${pin.imageUrl}" type="image/jpeg" />
      <media:content url="${pin.imageUrl}" type="image/jpeg" medium="image">
        <media:title><![CDATA[${pin.title || ''}]]></media:title>
        <media:description><![CDATA[${pin.description || ''}]]></media:description>
      </media:content>
      ${pin.tags?.map(tag => `<category>${tag}</category>`).join('') || ''}
    </item>
    `;
  }).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:media="http://search.yahoo.com/mrss/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>SPORTCUT - คลังรูปภาพกีฬา</title>
    <link>${siteUrl}</link>
    <description>แหล่งรวมรูปภาพกีฬาคุณภาพสูงสำหรับการออกแบบ</description>
    <language>th</language>
    <lastBuildDate>${rssDate}</lastBuildDate>
    <image>
      <url>${siteUrl}/logo.png</url>
      <title>SPORTCUT</title>
      <link>${siteUrl}</link>
    </image>
    ${items}
  </channel>
</rss>`;
}
