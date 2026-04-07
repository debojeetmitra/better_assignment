import React, { useState } from 'react';
import apiClient from '../api/client';
import { ShieldAlert, Send } from 'lucide-react';

const IncidentForm = ({ projects, onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    project_id: projects[0]?.id || '',
    severity: 'MEDIUM',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => ({ name: t.trim() })).filter(t => t.name !== '')
    };

    try {
      await apiClient.post('/incidents', payload);
      onSuccess();
    } catch (err) {
       setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted mb-2">Title</label>
        <input 
          required
          placeholder="Short, descriptive title"
          className={`w-full bg-slate-900 border ${formData.title.length > 0 && formData.title.length < 5 ? 'border-accent' : 'border-white border-opacity-10'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
        <p className={`text-[10px] mt-1 uppercase tracking-widest ${formData.title.length > 0 && formData.title.length < 5 ? 'text-accent' : 'text-muted'}`}>
          {formData.title.length} / 5 chars minimum
        </p>
      </div>

      {/* ... Project Selector (Unchanged) ... */}

      <div>
        <label className="block text-sm font-medium text-muted mb-2">Project</label>
        <select 
          className="w-full bg-slate-900 border border-white border-opacity-10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
          value={formData.project_id}
          onChange={e => setFormData({...formData, project_id: parseInt(e.target.value)})}
        >
          {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-muted mb-2">Severity</label>
          <select 
            className="w-full bg-slate-900 border border-white border-opacity-10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
            value={formData.severity}
            onChange={e => setFormData({...formData, severity: e.target.value})}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted mb-2">Tags (comma separated)</label>
          <input 
            placeholder="api, ui, delay"
            className="w-full bg-slate-900 border border-white border-opacity-10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            value={formData.tags}
            onChange={e => setFormData({...formData, tags: e.target.value})}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-muted mb-2">Description</label>
        <textarea 
          required
          rows={4}
          placeholder="Min 20 characters detailing the issue..."
          className={`w-full bg-slate-900 border ${formData.description.length > 0 && formData.description.length < 20 ? 'border-accent' : 'border-white border-opacity-10'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary`}
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
        <div className="flex justify-between items-center mt-1">
          <p className={`text-[10px] uppercase tracking-widest ${formData.description.length > 0 && formData.description.length < 20 ? 'text-accent' : 'text-muted'}`}>
            {formData.description.length} / 20 chars minimum
          </p>
          <p className="text-[10px] text-muted uppercase tracking-widest text-right">Detailed description prevents invalid state transitions.</p>
        </div>
      </div>

      {error && (
        <div className="bg-accent bg-opacity-10 border border-accent border-opacity-20 p-4 rounded-xl">
          <p className="text-accent font-bold text-sm mb-2 flex items-center gap-2">
            <ShieldAlert size={16} />
            Validation Error
          </p>
          <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
            {typeof error === 'string' ? (
              <li>{error}</li>
            ) : (
              Object.entries(error).map(([field, messages]) => (
                <li key={field} className="capitalize">
                  <span className="font-semibold">{field}:</span> {Array.isArray(messages) ? messages.join(', ') : messages}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button 
          type="button"
          onClick={onCancel}
          className="flex-1 bg-secondary hover:bg-opacity-80 py-4 rounded-xl font-bold transition-all"
        >
          Cancel
        </button>
        <button 
          type="submit"
          disabled={loading}
          className="flex-1 bg-primary hover:bg-opacity-90 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? 'Logging...' : <><Send size={20} /> Log Incident</>}
        </button>
      </div>
    </form>
  );
};

export default IncidentForm;
