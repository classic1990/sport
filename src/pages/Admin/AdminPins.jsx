import { useState, useEffect } from 'react';
import { getPins, createPin, updatePin, deletePin } from '../../services/firestore';
import PinForm from '../../components/Admin/PinForm';

export default function AdminPins() {
  const [pins, setPins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPin, setEditingPin] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadPins = async () => {
    setLoading(true);
    try {
      const result = await getPins(null, 50);
      setPins(result.pins);
    } catch (error) {
      console.error('Error loading pins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPins();
  }, []);

  const handleCreate = async (pinData) => {
    try {
      await createPin(pinData);
      setShowForm(false);
      loadPins();
    } catch (error) {
      alert('Error creating pin: ' + error.message);
    }
  };

  const handleUpdate = async (pinData) => {
    try {
      await updatePin(editingPin.id, pinData);
      setEditingPin(null);
      setShowForm(false);
      loadPins();
    } catch (error) {
      alert('Error updating pin: ' + error.message);
    }
  };

  const handleDelete = async (pinId) => {
    if (!confirm('ยืนยันการลบ?')) return;
    try {
      await deletePin(pinId);
      loadPins();
    } catch (error) {
      alert('Error deleting pin: ' + error.message);
    }
  };

  const handleEdit = (pin) => {
    setEditingPin(pin);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">จัดการ Pins</h2>
        <button
          onClick={() => { setShowForm(true); setEditingPin(null); }}
          className="btn-gold"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          เพิ่ม Pin ใหม่
        </button>
      </div>

      {showForm && (
        <div className="mb-6 luxury-card p-6">
          <PinForm
            initialData={editingPin}
            onSubmit={editingPin ? handleUpdate : handleCreate}
            onCancel={() => { setShowForm(false); setEditingPin(null); }}
          />
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pins.map((pin) => (
            <div key={pin.id} className="luxury-card p-4">
              <img
                src={pin.imageUrl}
                alt={pin.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
                onError={(e) => e.target.style.display = 'none'}
              />
              <h3 className="font-semibold text-white mb-1 line-clamp-1">{pin.title}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-3">{pin.description}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(pin)}
                  className="flex-1 px-3 py-1.5 bg-gold/20 text-gold rounded-lg text-sm hover:bg-gold/30 transition-colors"
                >
                  <i className="fa-solid fa-edit mr-1"></i> แก้ไข
                </button>
                <button
                  onClick={() => handleDelete(pin.id)}
                  className="flex-1 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm hover:bg-red-500/30 transition-colors"
                >
                  <i className="fa-solid fa-trash mr-1"></i> ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
