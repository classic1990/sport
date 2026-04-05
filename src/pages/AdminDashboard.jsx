import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';
import ImageDownloadButton from '../components/ImageDownloadButton';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState(['']);
  const [teamId, setTeamId] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [tags, setTags] = useState('');
  const [imageType, setImageType] = useState('cutout');
  const [sourceUrl, setSourceUrl] = useState('');
  const [previewUrls, setPreviewUrls] = useState([]);
  const [imageDimensions, setImageDimensions] = useState({});
  const [recentImages, setRecentImages] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved admin session in localStorage
    const savedSession = localStorage.getItem('adminSession');
    const sessionExpiry = localStorage.getItem('adminSessionExpiry');

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        // Check if we have a valid saved session
        if (savedSession && sessionExpiry && new Date().getTime() < parseInt(sessionExpiry)) {
          // Session is still valid, don't redirect
          console.log('Using saved admin session');
          return;
        }
        navigate('/admin/login');
      } else {
        setUser(user);
        // Save session for 7 days
        localStorage.setItem('adminSession', 'true');
        localStorage.setItem('adminSessionExpiry', (new Date().getTime() + (7 * 24 * 60 * 60 * 1000)).toString());
      }
    });
    fetchRecentImages();
    return unsubscribe;
  }, [navigate]);

  const fetchRecentImages = async () => {
    try {
      const q = query(collection(db, 'images'), orderBy('createdAt', 'desc'), limit(6));
      const snapshot = await getDocs(q);
      const images = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentImages(images);
    } catch (error) {
      console.error('Error fetching recent images:', error);
    }
  };

  const handleLogout = async () => {
    // Clear admin session from localStorage
    localStorage.removeItem('adminSession');
    localStorage.removeItem('adminSessionExpiry');

    await signOut(auth);
    navigate('/admin/login');
  };

  const addUrlField = () => {
    setImageUrls([...imageUrls, '']);
  };

  const removeUrlField = (index) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);

    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setPreviewUrls(newPreviews);

    const newDimensions = { ...imageDimensions };
    delete newDimensions[index];
    setImageDimensions(newDimensions);
  };

  const handleUrlChange = (index, value) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);

    // Update preview
    const newPreviews = [...previewUrls];
    if (value && isValidImageUrl(value)) {
      newPreviews[index] = value;
      // Detect image dimensions
      detectImageDimensions(value, index);
    } else {
      newPreviews[index] = null;
    }
    setPreviewUrls(newPreviews);
  };

  const detectImageDimensions = (url, index) => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions(prev => ({
        ...prev,
        [index]: { width: img.width, height: img.height, aspectRatio: img.width / img.height }
      }));
    };
    img.src = url;
  };

  const isValidImageUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(urlObj.pathname) ||
        url.includes('pinimg.com') ||
        url.includes('unsplash.com') ||
        url.includes('pexels.com') ||
        url.includes('pixabay.com');
    } catch {
      return false;
    }
  };

  const extractImageUrl = (url) => {
    // Extract direct image URL from various platforms
    const patterns = {
      pinterest: /pinimg\.com\/.*\/(.*\.(jpg|jpeg|png|gif|webp))/i,
      unsplash: /unsplash\.com\/photos\/([a-zA-Z0-9_-]+)/i,
      pexels: /pexels\.com\/photo\/.*\/([a-zA-Z0-9_-]+)/i,
      pixabay: /pixabay\.com\/.*\/([a-zA-Z0-9_-]+)/i,
      direct: /\.(jpg|jpeg|png|gif|webp|svg)$/i
    };

    // If it's already a direct image URL, return as is
    if (patterns.direct.test(url)) {
      return url;
    }

    // Pinterest: Convert to direct image URL
    if (url.includes('pinterest.com/pin/')) {
      const pinId = url.match(/pin\/(\d+)/)?.[1];
      if (pinId) {
        return `https://i.pinimg.com/originals.jpg`; // Fallback - would need API for actual image
      }
    }

    return url;
  };

  const getAspectRatioClass = (index) => {
    const dims = imageDimensions[index];
    if (!dims) return 'aspect-square';

    const ratio = dims.aspectRatio;
    if (ratio > 1.5) return 'aspect-video';
    if (ratio < 0.8) return 'aspect-[3/4]';
    if (ratio > 1.2 && ratio <= 1.5) return 'aspect-[4/3]';
    return 'aspect-square';
  };

  const getAspectRatioLabel = (index) => {
    const dims = imageDimensions[index];
    if (!dims) return '';

    const ratio = dims.aspectRatio;
    if (ratio > 1.5) return 'แนวนอน';
    if (ratio < 0.8) return 'แนวตั้ง';
    if (ratio > 1.2 && ratio <= 1.5) return '4:3';
    return 'สี่เหลี่ยม';
  };

  const saveToFirestore = async (imageUrl, index) => {
    const processedUrl = extractImageUrl(imageUrl);
    const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    const dims = imageDimensions[index] || { width: 1200, height: 1800, aspectRatio: 0.67 };

    await addDoc(collection(db, 'images'), {
      teamId,
      playerName,
      urls: {
        thumbnail: processedUrl,
        preview: processedUrl,
        full: processedUrl
      },
      type: imageType,
      tags: tagArray,
      dimensions: dims,
      aspectRatio: dims.aspectRatio > 1.5 ? 'landscape' : dims.aspectRatio < 0.8 ? 'portrait' : 'square',
      source: 'url',
      originalUrl: imageUrl,
      sourceReference: sourceUrl || '',
      createdAt: new Date(),
      downloadCount: 0
    });
  };

  const handleUpload = async () => {
    const validUrls = imageUrls.filter(url => url.trim() && isValidImageUrl(url));

    if (!validUrls.length || !teamId || !playerName) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วนและใส่ URL รูปภาพที่ถูกต้อง');
      return;
    }

    setLoading(true);

    try {
      for (let i = 0; i < validUrls.length; i++) {
        const originalIndex = imageUrls.indexOf(validUrls[i]);
        await saveToFirestore(validUrls[i], originalIndex);
      }

      // Reset form
      setImageUrls(['']);
      setPreviewUrls([]);
      setImageDimensions({});
      setPlayerName('');
      setTags('');
      setSourceUrl('');

      // Refresh recent images
      await fetchRecentImages();

      alert(`บันทึกสำเร็จ! ${validUrls.length} รูป`);

    } catch (error) {
      console.error('Save error:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  const openPreview = (image) => {
    setPreviewImage(image);
    setShowPreviewModal(true);
  };

  const closePreview = () => {
    setShowPreviewModal(false);
    setPreviewImage(null);
  };

  const getAspectRatioClassForSaved = (image) => {
    if (!image.dimensions) return 'aspect-square';
    const ratio = image.dimensions.width / image.dimensions.height;
    if (ratio > 1.5) return 'aspect-video';
    if (ratio < 0.8) return 'aspect-[3/4]';
    if (ratio > 1.2 && ratio <= 1.5) return 'aspect-[4/3]';
    return 'aspect-square';
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-white flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        กำลังโหลด...
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-futbol text-white"></i>
              </div>
              <h1 className="text-xl font-bold text-white">SportCut Admin</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-sign-out-alt"></i>
              ออกจากระบบ
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-2">เพิ่มรูปนักเตะจาก URL</h2>
          <p className="text-gray-400 mb-6">รองรับ Pinterest, Unsplash, Pexels, Pixabay และอื่นๆ</p>

          {/* URL Inputs */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL รูปภาพ
            </label>
            {imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://i.pinimg.com/736x/example.jpg"
                />
                {imageUrls.length > 1 && (
                  <button
                    onClick={() => removeUrlField(index)}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addUrlField}
              className="mt-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              เพิ่ม URL อื่น
            </button>
          </div>

          {/* Preview */}
          {previewUrls.some(url => url) && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-300 mb-2">ตัวอย่างรูปภาพ</h3>
              <div className="grid grid-cols-4 gap-4">
                {previewUrls.map((url, index) => (
                  url && (
                    <div key={index} className="relative group">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-600"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Team Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ทีม
            </label>
            <select
              value={teamId}
              onChange={(e) => setTeamId(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">เลือกทีม</option>
              <option value="manchester-united">แมนเชสเตอร์ ยูไนเต็ด</option>
              <option value="liverpool">ลิเวอร์พูล</option>
              <option value="arsenal">อาร์เซนอล</option>
              <option value="chelsea">เชลซี</option>
              <option value="manchester-city">แมนเชสเตอร์ ซิตี้</option>
              <option value="real-madrid">เรอัล มาดริด</option>
              <option value="barcelona">บาร์เซโลน่า</option>
              <option value="bayern-munich">บาเยิร์น มิวนิค</option>
              <option value="juventus">ยูเวนตุส</option>
              <option value="psg">ปารีส แซงต์-แชร์กแมง</option>
              <option value="tottenham">ท็อตแน่ม ฮ็อทสเปอร์</option>
              <option value="leicester">เลสเตอร์ ซิตี้</option>
              <option value="west-ham">เวสต์แฮม ยูไนเต็ด</option>
              <option value="everton">เอฟเวอร์ตัน</option>
              <option value="villa">แอสตัน วิลล่า</option>
              <option value="newcastle">นิวคาสเซิล ยูไนเต็ด</option>
              <option value="wolves">วูล์ฟแฮมป์ตัน</option>
              <option value="crystal-palace">คริสตัล พาเลซ</option>
              <option value="southampton">เซาแธมป์ตัน</option>
              <option value="brighton">ไบรต์ตัน แอนด์ โฮฟ อัลเบียน</option>
            </select>
          </div>

          {/* Player Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ชื่อนักเตะ
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="เช่น บรูโน่ แฟร์นันด์ส"
              required
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tags (คั่นด้วยคอมม่า)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="เช่น กองกลาง, กัปตัน, ดีใจ, ฉลองประตู"
            />
          </div>

          {/* Image Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              ประเภทรูปภาพ
            </label>
            <select
              value={imageType}
              onChange={(e) => setImageType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="cutout">รูปไดคัท (Cut-outs)</option>
              <option value="action">แอ็คชั่นช็อต</option>
              <option value="logo">โลโก้ & กราฟิก</option>
              <option value="celebration">ฉลองประตู</option>
              <option value="emotion">สีหน้า/อารมณ์</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                กำลังบันทึก...
              </>
            ) : (
              <>
                <i className="fa-solid fa-save"></i>
                บันทึกลงฐานข้อมูล
              </>
            )}
          </button>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-300 mb-2">🔗 แหล่งรูปภาพฟรีที่แนะนำ:</h4>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>• <strong>Pinterest:</strong> คลิกรูป → คัดลอกรูปภาพ → วาง URL</li>
              <li>• <strong>Unsplash:</strong> คลิกรูป → คัดลอกลิงก์รูปภาพ</li>
              <li>• <strong>Pexels:</strong> คลิกรูป → คัดลอกลิงก์</li>
              <li>• <strong>Pixabay:</strong> คลิกรูป → คัดลอก URL รูปภาพ</li>
            </ul>
          </div>
        </div>

        {/* Recent Uploads Section */}
        {recentImages.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">รูปที่เพิ่งอัพโหลด</h3>
                <p className="text-gray-400 text-sm mt-1">{recentImages.length} รูปล่าสุด</p>
              </div>
              <button
                onClick={fetchRecentImages}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fa-solid fa-rotate"></i>
                รีเฟรช
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {recentImages.map((image) => (
                <div
                  key={image.id}
                  className="group cursor-pointer"
                  onClick={() => openPreview(image)}
                >
                  <div className={`relative ${getAspectRatioClassForSaved(image)} overflow-hidden rounded-xl border border-gray-600 group-hover:border-red-500 transition-all`}>
                    <img
                      src={image.urls?.thumbnail || image.urls?.preview}
                      alt={image.playerName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-xs font-medium truncate">{image.playerName}</p>
                        <p className="text-red-400 text-xs">{image.teamId}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Preview Modal */}
      {showPreviewModal && previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={closePreview}
        >
          <div
            className="relative max-w-5xl max-h-[90vh] w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePreview}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors z-10"
            >
              <i className="fa-solid fa-xmark text-3xl"></i>
            </button>

            {/* Image Container */}
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">
              <img
                src={previewImage.urls?.full || previewImage.urls?.preview}
                alt={previewImage.playerName || 'Preview'}
                className="w-full max-h-[70vh] object-contain"
              />

              {/* Info Bar */}
              <div className="p-6 bg-gray-800 border-t border-gray-700">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <p className="text-white font-bold text-lg">{previewImage.playerName || 'ไม่มีชื่อ'}</p>
                    <p className="text-gray-400">{previewImage.teamId}</p>
                    {previewImage.dimensions && (
                      <p className="text-sm text-gray-500 mt-1">
                        {previewImage.dimensions.width} x {previewImage.dimensions.height}px •
                        {previewImage.dimensions.width / previewImage.dimensions.height > 1 ? ' แนวนอน' : ' แนวตั้ง'}
                      </p>
                    )}
                  </div>

                  {/* Download Button */}
                  <ImageDownloadButton
                    imageUrl={previewImage.urls?.full || previewImage.urls?.preview}
                    fileName={previewImage.playerName}
                  />
                </div>

                {previewImage.sourceReference && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-500">
                      <i className="fa-solid fa-link mr-2"></i>
                      แหล่งที่มา: <a href={previewImage.sourceReference} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{previewImage.sourceReference}</a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
