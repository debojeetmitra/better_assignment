import React, { useState, useEffect } from 'react';
import apiClient from './api/client';
import IncidentForm from './components/IncidentForm';
import { AlertCircle, Plus, CheckCircle, Clock, ShieldAlert, Layers } from 'lucide-react';

const App = () => {
  const [incidents, setIncidents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [incRes, projRes] = await Promise.all([
        apiClient.get('/incidents'),
        apiClient.get('/projects')
      ]);
      setIncidents(incRes.data);
      setProjects(projRes.data);
      if (projRes.data.length > 0) setSelectedProject(projRes.data[0]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await apiClient.patch(`/incidents/${id}/status`, { status });
      await fetchData();
    } catch (err) {
      const errorMsg = typeof err === 'object' ? (err.error || JSON.stringify(err)) : err;
      alert(`Action Failed: ${errorMsg}`);
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="glass-card p-6 rounded-2xl flex items-center space-x-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-20 text-white`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-muted text-sm font-medium">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-indigo-950 p-4 md:p-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
              <ShieldAlert className="text-primary" size={36} />
              Nexus Dashboard
            </h1>
            <p className="text-muted mt-2">Team Incident & Feedback Portal</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-primary hover:bg-opacity-90 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            Log Incident
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard icon={AlertCircle} label="Total Incidents" value={incidents.length} color="bg-primary" />
          <StatCard icon={Clock} label="Open" value={incidents.filter(i => i.status === 'OPEN').length} color="bg-accent" />
          <StatCard icon={Layers} label="Projects" value={projects.length} color="bg-indigo-500" />
          <StatCard icon={CheckCircle} label="Resolved" value={incidents.filter(i => i.status === 'RESOLVED').length} color="bg-emerald-500" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-white border-opacity-10 flex justify-between items-center">
              <h2 className="text-xl font-bold">Recent Incidents</h2>
              <div className="flex gap-2">
                {projects.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setSelectedProject(p)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedProject?.id === p.id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-secondary text-muted hover:text-white'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-800 bg-opacity-50 text-muted uppercase text-xs">
                  <tr>
                    <th className="px-8 py-4">Title</th>
                    <th className="px-8 py-4">Severity</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white divide-opacity-5">
                  {incidents
                    .filter(i => i.project_id === selectedProject?.id)
                    .map(incident => (
                    <tr key={incident.id} className="hover:bg-white hover:bg-opacity-[0.02] transition-colors group">
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-lg group-hover:text-primary transition-colors">{incident.title}</p>
                          <p className="text-sm text-muted mt-1">{incident.description.substring(0, 60)}...</p>
                          <div className="flex gap-2 mt-3">
                            {incident.tags?.map(t => (
                              <span key={t.name} className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider" style={{backgroundColor: `${t.color}22`, color: t.color, border: `1px solid ${t.color}44`}}>
                                {t.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          incident.severity === 'CRITICAL' ? 'bg-red-500 bg-opacity-20 text-red-500' :
                          incident.severity === 'HIGH' ? 'bg-orange-500 bg-opacity-20 text-orange-500' :
                          'bg-blue-500 bg-opacity-20 text-blue-500'
                        }`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                         <div className="flex items-center gap-2">
                           <div className={`w-2 h-2 rounded-full ${
                             incident.status === 'RESOLVED' ? 'bg-emerald-500' : 
                             incident.status === 'OPEN' ? 'bg-accent' : 'bg-primary'
                           }`} />
                           <span className="font-medium">{incident.status}</span>
                         </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        {incident.status === 'OPEN' && (
                          <button 
                            onClick={() => handleStatusUpdate(incident.id, 'RESOLVED')}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors"
                          >
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {incidents.filter(i => i.project_id === selectedProject?.id).length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center text-muted">
                        No incidents found for this project.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showForm && (
         <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
            <div className="glass-card w-full max-w-xl p-8 my-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-200">
               <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold flex items-center gap-2">
                    <ShieldAlert className="text-accent" />
                    Log New Incident
                  </h2>
                  <button onClick={() => setShowForm(false)} className="text-muted hover:text-white p-2 text-xl hover:rotate-90 transition-transform">✕</button>
               </div>
               <IncidentForm 
                 projects={projects} 
                 onCancel={() => setShowForm(false)} 
                 onSuccess={() => {
                   setShowForm(false);
                   fetchData();
                 }}
               />
            </div>
         </div>
      )}

      {error && (
        <div className="fixed bottom-8 right-8 bg-accent text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
          <AlertCircle size={24} />
          <p className="font-medium">{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
