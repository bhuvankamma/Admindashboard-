import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, FaPlus, FaBriefcase, FaBuilding, FaBars, FaTimes, 
  FaUserTie, FaChartBar, FaCog, FaLink, FaSignOutAlt, FaTrash, FaEdit
} from 'react-icons/fa';
import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  XAxis, YAxis, Tooltip, Legend, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';

// Enterprise-grade single-file dashboard with inline CSS and functional menu sections
const App = () => {
  const [view, setView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Core data
  const [companyProfile, setCompanyProfile] = useState({
    name: 'YUVA SAATHI Employer',
    logoUrl: 'https://i.ibb.co/GdsH6F1/logo.png',
    description: 'Corporate platform connecting youth talent with leading enterprises.',
    website: 'https://yuvasaathi.in',
    email: 'contact@yuvasaathi.com',
    location: 'Bengaluru, India'
  });

  const [jobPostings, setJobPostings] = useState([
    // sample seed data
    {
      id: 'job-1',
      title: 'Senior Software Engineer',
      company: companyProfile.name,
      location: 'Bengaluru, India',
      type: 'Full-time',
      salaryMin: 12,
      salaryMax: 20,
      skills: ['React', 'Node.js', 'AWS'],
      description: 'Lead development of scalable web applications.',
      postedDate: '2025-08-01',
      contact: 'careers@yuvasaathi.com'
    }
  ]);

  const [recruiters, setRecruiters] = useState([
    { id: 'r-1', name: 'Asha Patel', email: 'asha@company.com', role: 'Hiring Manager' }
  ]);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    twoFactorAuth: false,
    dashboardDensity: 'comfortable'
  });

  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    // keep job company in sync if profile name changes
    setJobPostings(prev => prev.map(j => ({ ...j, company: companyProfile.name })));
  }, [companyProfile.name]);

  const layout = {
    fontFamily: 'Inter, system-ui, -apple-system, Roboto, "Segoe UI", Arial',
    display: 'flex',
    minHeight: '100vh',
    background: 'radial-gradient(1200px 600px at 10% 10%, rgba(37,99,235,0.06), transparent), linear-gradient(180deg, #f7fafc 0%, #eef2ff 100%)'
  };

  const topBar = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem 1.5rem',
    borderBottom: '1px solid rgba(15,23,42,0.06)',
    background: 'linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4))',
    backdropFilter: 'blur(6px)'
  };

  const handleLogout = () => {
    // proper logout should clear tokens — here we simulate
    alert('You have been logged out.');
    console.log('logout');
  };

  return (
    <div style={layout}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? 280 : 72,
        transition: 'width 240ms ease',
        background: 'linear-gradient(180deg,#0f172a 0%, #111827 100%)',
        color: '#e6eef8',
        padding: '1rem',
        boxShadow: '4px 0 24px rgba(2,6,23,0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <img src={companyProfile.logoUrl} alt="logo" style={{ height: 40, borderRadius: 6 }} />
          {sidebarOpen && <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>{companyProfile.name}</div>
            <div style={{ fontSize: 12, color: '#9aa7bf' }}>{companyProfile.location}</div>
          </div>}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SideItem label="Dashboard" icon={<FaTachometerAlt />} active={view==='dashboard'} onClick={() => setView('dashboard')} open={sidebarOpen} />
          <SideItem label="Post New Job" icon={<FaPlus />} active={view==='postJob'} onClick={() => { setEditingJob(null); setView('postJob'); }} open={sidebarOpen} />
          <SideItem label="Manage Jobs" icon={<FaBriefcase />} active={view==='viewJobs'} onClick={() => setView('viewJobs')} open={sidebarOpen} />
          <SideItem label="My Profile" icon={<FaBuilding />} active={view==='profile'} onClick={() => setView('profile')} open={sidebarOpen} />
          <SideItem label="Recruiters" icon={<FaUserTie />} active={view==='recruiters'} onClick={() => setView('recruiters')} open={sidebarOpen} />
          <SideItem label="Analytics" icon={<FaChartBar />} active={view==='analytics'} onClick={() => setView('analytics')} open={sidebarOpen} />
          <SideItem label="Settings" icon={<FaCog />} active={view==='settings'} onClick={() => setView('settings')} open={sidebarOpen} />
        </nav>

        <div style={{ marginTop: 18, borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: 12 }}>
          <button onClick={() => setSidebarOpen(s => !s)} style={buttonStyle(sidebarOpen ? 'ghost' : 'primary', true)}> {sidebarOpen ? <FaTimes/> : <FaBars/> } {sidebarOpen && ' Collapse'}</button>
          <div style={{ height: 8 }} />
          <button onClick={handleLogout} style={buttonStyle('danger', true)}><FaSignOutAlt /> {sidebarOpen && ' Logout'}</button>
        </div>
      </aside>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header style={topBar}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>{getTitle(view, editingJob)}</h2>
            <div style={{ fontSize: 13, color: '#6b7280' }}>Employer Portal</div>
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 13, color: '#334155' }}>{new Date().toLocaleString()}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src={companyProfile.logoUrl} alt="avatar" style={{ height: 36, width: 36, borderRadius: 8 }} />
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 700 }}>{companyProfile.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{companyProfile.email}</div>
              </div>
            </div>
          </div>
        </header>

        <main style={{ padding: 20, overflow: 'auto' }}>
          {view === 'dashboard' && (
            <DashboardSection jobPostings={jobPostings} recruiters={recruiters} />
          )}

          {view === 'postJob' && (
            <JobPostForm 
              companyProfile={companyProfile}
              editingJob={editingJob}
              onSave={(job) => {
                if (editingJob) {
                  setJobPostings(prev => prev.map(j => j.id === job.id ? job : j));
                } else {
                  setJobPostings(prev => [{ ...job, id: makeId() }, ...prev]);
                }
                setEditingJob(null);
                setView('viewJobs');
              }}
            />
          )}

          {view === 'viewJobs' && (
            <ManageJobs
              jobs={jobPostings}
              onEdit={(job) => { setEditingJob(job); setView('postJob'); }}
              onDelete={(id) => setJobPostings(prev => prev.filter(j => j.id !== id))}
            />
          )}

          {view === 'profile' && (
            <CompanyProfileForm profile={companyProfile} onSave={(p) => setCompanyProfile(p)} />
          )}

          {view === 'recruiters' && (
            <RecruitersSection recruiters={recruiters} onAdd={(r) => setRecruiters(prev => [ { ...r, id: makeId() }, ...prev])} onRemove={(id) => setRecruiters(prev => prev.filter(x => x.id !== id))} />
          )}

          {view === 'analytics' && (
            <AnalyticsSection jobs={jobPostings} recruiters={recruiters} />
          )}

          {view === 'settings' && (
            <SettingsSection settings={settings} onChange={(s)=>setSettings(s)} />
          )}
        </main>

        <footer style={{ padding: 16, borderTop: '1px solid rgba(15,23,42,0.04)', textAlign: 'center', color: '#64748b' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, alignItems: 'center' }}>
            <a href={companyProfile.website} style={{ color: '#2563eb', textDecoration: 'none' }}><FaLink /> <span style={{ marginLeft: 6 }}>{companyProfile.website}</span></a>
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>© {new Date().getFullYear()} {companyProfile.name} — All rights reserved.</div>
        </footer>
      </div>
    </div>
  );
};

// ---------- Utility Helpers ----------
const makeId = () => 'id-' + Math.random().toString(36).slice(2, 9);
const getTitle = (view, editing) => {
  if (view === 'postJob') return editing ? 'Edit Job Posting' : 'Post a New Job';
  if (view === 'viewJobs') return 'Manage Job Postings';
  if (view === 'profile') return 'Company Profile';
  if (view === 'recruiters') return 'Recruiters';
  if (view === 'analytics') return 'Analytics';
  if (view === 'settings') return 'Settings';
  return 'Dashboard Overview';
};

const buttonStyle = (type = 'primary', full=false) => {
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: full ? '10px 14px' : '8px 10px',
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 13
  };
  if (type === 'primary') return { ...base, background: '#2563eb', color: '#fff' };
  if (type === 'ghost') return { ...base, background: 'transparent', color: '#e6eef8', border: '1px solid rgba(255,255,255,0.04)' };
  if (type === 'danger') return { ...base, background: '#ef4444', color: '#fff' };
  if (type === 'success') return { ...base, background: '#16a34a', color: '#fff' };
  return base;
};

// ---------- Sidebar Item ----------
const SideItem = ({ label, icon, active, onClick, open }) => (
  <button onClick={onClick} style={{
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    width: '100%',
    padding: '10px 12px',
    borderRadius: 8,
    background: active ? 'linear-gradient(90deg,#0ea5e9, #2563eb)' : 'transparent',
    color: active ? '#fff' : '#c7d2e7',
    border: 'none',
    cursor: 'pointer',
    textAlign: 'left'
  }}>
    <div style={{ width: 20 }}>{icon}</div>
    {open && <div style={{ fontWeight: 700 }}>{label}</div>}
  </button>
);

// ---------- Dashboard Section (rich content) ----------
const DashboardSection = ({ jobPostings, recruiters }) => {
  // Lightweight KPIs
  const kpis = [
    { id: 'k1', title: 'Active Jobs', value: jobPostings.length },
    { id: 'k2', title: 'Recruiters', value: recruiters.length },
    { id: 'k3', title: 'Applications', value: Math.floor(Math.random() * 1200) + 100 },
    { id: 'k4', title: 'Profile Views', value: Math.floor(Math.random() * 8000) + 300 }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', gap: 16 }}>
      <div style={{ gridColumn: 'span 8' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {kpis.map(k => (
            <div key={k.id} style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }}>
              <div style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>{k.title}</div>
              <div style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>{k.value}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 12, background: '#fff', borderRadius: 12, padding: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }}>
          <h3 style={{ marginTop: 0 }}>Recent Job Postings</h3>
          {jobPostings.length === 0 ? <div style={{ color: '#64748b' }}>No active jobs. Create one from "Post New Job".</div> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {jobPostings.map(j => (
                <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderRadius: 8, border: '1px solid #eef2ff' }}>
                  <div>
                    <div style={{ fontWeight: 800 }}>{j.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>{j.company} • {j.location} • {j.type}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span style={{ padding: '6px 10px', borderRadius: 8, background: '#eef2ff', fontWeight: 700 }}>{j.salaryMin} - {j.salaryMax} L</span>
                    <button style={buttonStyle('ghost')} onClick={() => alert('View candidates - integrate ATS for full flow')}>View</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }}>
          <h4 style={{ marginTop: 0 }}>Quick Actions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <button style={buttonStyle('primary', true)} onClick={() => alert('Quick Post: opens minimal job form')}>Quick Post Job</button>
            <button style={buttonStyle('success', true)} onClick={() => alert('Exporting data...')}>Export Data</button>
            <button style={buttonStyle('ghost', true)} onClick={() => alert('Open audit logs')}>Audit Logs</button>
          </div>
        </div>

        <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }}>
          <h4 style={{ marginTop: 0 }}>Top Recruiters</h4>
          {recruiters.map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px dashed #eef2ff' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{r.name}</div>
                <div style={{ fontSize: 12, color: '#64748b' }}>{r.role}</div>
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>{r.email}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- Job Post Form (fully functional) ----------
const JobPostForm = ({ companyProfile, editingJob, onSave }) => {
  const initial = editingJob ? { ...editingJob } : {
    title: '', company: companyProfile.name, location: '', type: 'Full-time', salaryMin: '', salaryMax: '', skills: '', description: '', contact: ''
  };

  const [form, setForm] = useState(initial);
  useEffect(()=> setForm(initial), [editingJob, initial]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // basic validation
    if (!form.title || !form.location || !form.contact) return alert('Please fill Title, Location and Contact');
    const job = {
      ...form,
      company: companyProfile.name,
      postedDate: new Date().toISOString().split('T')[0],
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
      id: form.id || makeId()
    };
    onSave(job);
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)', maxWidth: 900 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Job Title</label>
          <input name="title" value={form.title} onChange={handleChange} style={inputStyle} placeholder="Senior Frontend Engineer" />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input name="location" value={form.location} onChange={handleChange} style={inputStyle} placeholder="Bengaluru / Remote" />
        </div>
        <div>
          <label style={labelStyle}>Type</label>
          <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Contact Email</label>
          <input name="contact" value={form.contact} onChange={handleChange} style={inputStyle} placeholder="careers@company.com" />
        </div>
        <div>
          <label style={labelStyle}>Salary Min (LPA)</label>
          <input name="salaryMin" value={form.salaryMin} onChange={handleChange} style={inputStyle} type="number" />
        </div>
        <div>
          <label style={labelStyle}>Salary Max (LPA)</label>
          <input name="salaryMax" value={form.salaryMax} onChange={handleChange} style={inputStyle} type="number" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Skills (comma separated)</label>
          <input name="skills" value={form.skills} onChange={handleChange} style={inputStyle} placeholder="React,Node.js,AWS" />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} style={{ ...inputStyle, minHeight: 120 }} />
        </div>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button type="submit" style={buttonStyle('primary', true)}>{editingJob ? 'Update Job' : 'Post Job'}</button>
        <button type="button" onClick={()=> { setForm(initial); }} style={buttonStyle('ghost')}>Reset</button>
      </div>
    </form>
  );
};

// ---------- Manage Jobs (table with edit/delete) ----------
const ManageJobs = ({ jobs, onEdit, onDelete }) => {
  const handleDelete = (id) => {
    // using window.confirm is restricted by some linters, so we'll use a safer approach
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      onDelete(id);
    }
  };

  return (
    <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0 }}>Job Postings</h3>
        <div style={{ color: '#64748b' }}>{jobs.length} records</div>
      </div>
      {jobs.length === 0 ? <div style={{ color: '#64748b' }}>No job postings yet.</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid #eef2ff' }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Location</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Salary (LPA)</th>
                <th style={thStyle}>Posted</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(j => (
                <tr key={j.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>{j.title}</td>
                  <td style={tdStyle}>{j.location}</td>
                  <td style={tdStyle}>{j.type}</td>
                  <td style={tdStyle}>{j.salaryMin} - {j.salaryMax}</td>
                  <td style={tdStyle}>{j.postedDate}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={()=>onEdit(j)} style={buttonStyle('ghost')}><FaEdit /> Edit</button>
                      <button onClick={()=>handleDelete(j.id)} style={buttonStyle('danger')}><FaTrash /> Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ---------- Company Profile ----------
const CompanyProfileForm = ({ profile, onSave }) => {
  const [form, setForm] = useState(profile);
  useEffect(()=> setForm(profile), [profile]);
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <div style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)', maxWidth: 920 }}>
      <h3>Company Profile</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Company Name</label>
          <input name="name" value={form.name} onChange={change} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Location</label>
          <input name="location" value={form.location} onChange={change} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Website</label>
          <input name="website" value={form.website} onChange={change} style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Contact Email</label>
          <input name="email" value={form.email} onChange={change} style={inputStyle} />
        </div>
        <div style={{ gridColumn: '1 / -1' }}>
          <label style={labelStyle}>Description</label>
          <textarea name="description" value={form.description} onChange={change} style={{ ...inputStyle, minHeight: 100 }} />
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={()=> onSave(form)} style={buttonStyle('primary', true)}>Save Profile</button>
      </div>
    </div>
  );
};

// ---------- Recruiters Section ----------
const RecruitersSection = ({ recruiters, onAdd, onRemove }) => {
  const [form, setForm] = useState({ name: '', email: '', role: '' });
  const add = () => {
    if (!form.name || !form.email) return alert('Name & Email required');
    onAdd(form); setForm({ name: '', email: '', role: '' });
  };
  return (
    <div style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)' }}>
      <h3>Recruiters</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} style={inputStyle} />
        <input placeholder="Email" value={form.email} onChange={e=>setForm(f=>({...f, email:e.target.value}))} style={inputStyle} />
        <input placeholder="Role" value={form.role} onChange={e=>setForm(f=>({...f, role:e.target.value}))} style={inputStyle} />
        <button onClick={add} style={buttonStyle('primary')}>Invite</button>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {recruiters.map(r => (
          <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: 10, borderRadius: 8, border: '1px solid #eef2ff' }}>
            <div>
              <div style={{ fontWeight: 800 }}>{r.name}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{r.role} • {r.email}</div>
            </div>
            <div>
              <button onClick={()=>onRemove(r.id)} style={buttonStyle('danger')}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------- Analytics Section (recharts) ----------
const AnalyticsSection = ({ jobs, recruiters }) => {
  // sample aggregation
  const jobsByMonth = Array.from({ length: 6 }).map((_, i) => ({ month: new Date(Date.now() - i*30*24*3600*1000).toLocaleString('default', { month: 'short' }), postings: Math.floor(Math.random()*10)+2 })).reverse();
  const skillsAgg = {}; jobs.forEach(j => (j.skills || []).forEach(s => skillsAgg[s] = (skillsAgg[s]||0)+1));
  const pieData = Object.entries(skillsAgg).map(([k,v]) => ({ name: k, value: v }));
  const COLORS = ['#2563eb','#16a34a','#f59e0b','#ef4444','#7c3aed','#0ea5e9'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
      <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)' }}>
        <h3>Job Postings (last months)</h3>
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <LineChart data={jobsByMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="postings" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ marginTop: 12 }}>
          <h4>Recruiter Activity</h4>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <BarChart data={jobsByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="postings" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', padding: 12, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)' }}>
        <h4>Skills Distribution</h4>
        {pieData.length === 0 ? <div style={{ color: '#64748b' }}>No skills data yet.</div> : (
          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`c-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

// ---------- Settings ----------
const SettingsSection = ({ settings, onChange }) => {
  const toggle = (k) => onChange({ ...settings, [k]: !settings[k] });
  return (
    <div style={{ background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 8px 24px rgba(2,6,23,0.06)' }}>
      <h3>Account Settings</h3>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800 }}>Email Notifications</div>
            <div style={{ color: '#64748b' }}>Receive email updates about applications and system alerts.</div>
          </div>
          <label style={switchLabel(settings.emailNotifications)} onClick={()=>toggle('emailNotifications')}>
            <input type="checkbox" checked={settings.emailNotifications} readOnly style={{ display: 'none' }} />
            <span style={{ width: 36, height: 20, borderRadius: 20, background: settings.emailNotifications ? '#2563eb' : '#e2e8f0', display: 'inline-block', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 2, left: settings.emailNotifications ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 180ms' }} />
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: 800 }}>Two-factor Authentication</div>
            <div style={{ color: '#64748b' }}>Protect your account with an additional verification step.</div>
          </div>
          <label style={switchLabel(settings.twoFactorAuth)} onClick={()=>toggle('twoFactorAuth')}>
            <input type="checkbox" checked={settings.twoFactorAuth} readOnly style={{ display: 'none' }} />
            <span style={{ width: 36, height: 20, borderRadius: 20, background: settings.twoFactorAuth ? '#2563eb' : '#e2e8f0', display: 'inline-block', position: 'relative' }}>
              <span style={{ position: 'absolute', top: 2, left: settings.twoFactorAuth ? 18 : 2, width: 16, height: 16, borderRadius: '50%', background: '#fff', transition: 'left 180ms' }} />
            </span>
          </label>
        </div>

        <div>
          <div style={{ fontWeight: 800 }}>Dashboard Density</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            {['comfortable','compact'].map(opt => (
              <button key={opt} onClick={()=> onChange({ ...settings, dashboardDensity: opt })} style={{ padding: '8px 10px', borderRadius: 8, border: settings.dashboardDensity===opt ? '2px solid #2563eb' : '1px solid #eef2ff', background: '#fff', cursor: 'pointer' }}>{opt}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 8 }}>
          <button onClick={()=> alert('Settings saved')} style={buttonStyle('primary', true)}>Save Settings</button>
        </div>
      </div>
    </div>
  );
};

// ---------- Shared styles ----------
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #e6eef8', outline: 'none', fontSize: 14 };
const labelStyle = { display: 'block', marginBottom: 6, fontWeight: 700, fontSize: 13 };
const thStyle = { padding: '10px 8px', fontSize: 13, color: '#334155' };
const tdStyle = { padding: '12px 8px', fontSize: 14, color: '#0f172a' };
const switchLabel = (on) => ({ cursor: 'pointer' });

export default App;