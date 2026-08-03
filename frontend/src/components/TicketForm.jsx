import React, { useState, useEffect } from 'react';

const CATEGORY_OPTIONS = ['Hardware', 'Software', 'Network', 'Account Access', 'Other'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];
const STATUS_OPTIONS = ['Open', 'In Progress', 'Resolved', 'Closed'];

const EMPTY_TICKET = {
  title: '',
  description: '',
  category: 'Software',
  priority: 'Medium',
  status: 'Open',
  requester_name: '',
  requester_email: '',
  assigned_to: '',
};

const TicketForm = ({ initialData, isEditing, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(EMPTY_TICKET);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({ ...EMPTY_TICKET, ...initialData });
    } else {
      setFormData(EMPTY_TICKET);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.title.trim()) nextErrors.title = 'Title is required';
    if (!formData.requester_name.trim()) nextErrors.requester_name = 'Requester name is required';
    if (!formData.requester_email.trim()) {
      nextErrors.requester_email = 'Requester email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.requester_email)) {
      nextErrors.requester_email = 'Enter a valid email address';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="e.g. Cannot connect to VPN"
        />
        {errors.title && <span className="form-field__error">{errors.title}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail..."
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {isEditing && (
          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              {STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="requester_name">Requester Name</label>
          <input
            id="requester_name"
            name="requester_name"
            type="text"
            value={formData.requester_name}
            onChange={handleChange}
            placeholder="Jane Doe"
          />
          {errors.requester_name && (
            <span className="form-field__error">{errors.requester_name}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="requester_email">Requester Email</label>
          <input
            id="requester_email"
            name="requester_email"
            type="email"
            value={formData.requester_email}
            onChange={handleChange}
            placeholder="jane.doe@company.com"
          />
          {errors.requester_email && (
            <span className="form-field__error">{errors.requester_email}</span>
          )}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="assigned_to">Assigned To (optional)</label>
        <input
          id="assigned_to"
          name="assigned_to"
          type="text"
          value={formData.assigned_to}
          onChange={handleChange}
          placeholder="Support agent name"
        />
      </div>

      <div className="modal__actions">
        <button type="button" className="btn btn--ghost" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Save Changes' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
