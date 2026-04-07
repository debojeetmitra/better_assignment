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
          className="w-full bg-slate-900 border border-white border-opacity-10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          value={formData.title}
          onChange={e => setFormData({...formData, title: e.target.value})}
        />
      </div>

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
          placeholder="Min 10 characters detailing the issue..."
          className="w-full bg-slate-900 border border-white border-opacity-10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
        />
        <p className="text-[10px] text-muted mt-1 uppercase tracking-widest">A detailed description prevents invalid state transitions.</p>
      </div>

      {error && (
        <div className="bg-red-500 bg-opacity-10 text-red-500 p-4 rounded-xl text-sm font-medium border border-red-500 border-opacity-20">
          {typeof error === 'string' ? error : JSON.stringify(error)}
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
