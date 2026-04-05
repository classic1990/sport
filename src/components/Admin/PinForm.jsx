import { useState, useEffect } from 'react';

export default function PinForm({ initialData, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    imageUrl: '',
    sourceUrl: '',
    title: '',
    description: '',
    tags: [],
    teamId: ''
  });
  const [tagInput, setTagInput] = useState('');
  const [scraping, setScraping] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        imageUrl: initialData.imageUrl || '',
        sourceUrl: initialData.sourceUrl || '',
        title: initialData.title || '',
        description: initialData.description || '',
        tags: initialData.tags || [],
        teamId: initialData.teamId || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  // Auto-scrape metadata from URL
  const handleScrape = async () => {
    if (!formData.sourceUrl) return;
    
    setScraping(true);
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(formData.sourceUrl)}`);
      const data = await response.json();
      
      if (data.contents) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        
        // Extract metadata
        const title = doc.querySelector('meta[property="og:title"]')?.content ||
                     doc.querySelector('title')?.textContent ||
                     doc.querySelector('meta[name="title"]')?.content || '';
        
        const description = doc.querySelector('meta[property="og:description"]')?.content ||
                           doc.querySelector('meta[name="description"]')?.content || '';
        
        const image = doc.querySelector('meta[property="og:image"]')?.content ||
                     doc.querySelector('meta[property="twitter:image"]')?.content || '';
        
        setFormData(prev => ({
          ...prev,
          title: title.slice(0, 100) || prev.title,
          description: description.slice(0, 250) || prev.description,
          imageUrl: image || prev.imageUrl
        }));
      }
    } catch (error) {
      console.error('Scraping error:', error);
      alert('ไม่สามารถดึงข้อมูลจาก URL ได้');
    } finally {
      setScraping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-300 text-sm mb-1">Source URL (เว็บต้นทาง)</label>
        <div className="flex gap-2">
          <input
            type="url"
            name="sourceUrl"
            value={formData.sourceUrl}
            onChange={handleChange}
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-gold/30 text-white focus:border-gold focus:outline-none"
            placeholder="https://example.com/page"
            required
          />
          <button
            type="button"
            onClick={handleScrape}
            disabled={scraping || !formData.sourceUrl}
            className="px-4 py-2 bg-burgundy/50 text-white rounded-lg hover:bg-burgundy/70 transition-colors disabled:opacity-50"
          >
            {scraping ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <><i className="fa-solid fa-magic mr-1"></i> ดึงข้อมูล</>
            )}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Image URL (ลิงก์รูปภาพ)</label>
        <input
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gold/30 text-white focus:border-gold focus:outline-none"
          placeholder="https://example.com/image.jpg"
          required
        />
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Title (หัวข้อ)</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={100}
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gold/30 text-white focus:border-gold focus:outline-none"
          placeholder="หัวข้อรูปภาพ"
          required
        />
        <span className="text-xs text-gray-500">{formData.title.length}/100</span>
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Description (คำอธิบาย)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={250}
          rows={3}
          className="w-full px-4 py-2 rounded-lg bg-black/40 border border-gold/30 text-white focus:border-gold focus:outline-none resize-none"
          placeholder="คำอธิบายรูปภาพสำหรับ SEO"
        />
        <span className="text-xs text-gray-500">{formData.description.length}/250</span>
      </div>

      <div>
        <label className="block text-gray-300 text-sm mb-1">Tags (หมวดหมู่)</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-gold/30 text-white focus:border-gold focus:outline-none"
            placeholder="พิมพ์แล้วกด Enter"
          />
          <button
            type="button"
            onClick={handleAddTag}
            className="px-4 py-2 bg-gold/20 text-gold rounded-lg hover:bg-gold/30 transition-colors"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, idx) => (
            <span key={idx} className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm flex items-center gap-2">
              {tag}
              <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:text-white">
                <i className="fa-solid fa-times"></i>
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button type="submit" className="btn-gold flex-1">
          {initialData ? 'บันทึกการแก้ไข' : 'สร้าง Pin'}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-3 border border-gold/50 text-gold rounded-full hover:bg-gold/10 transition-colors">
          ยกเลิก
        </button>
      </div>
    </form>
  );
}
