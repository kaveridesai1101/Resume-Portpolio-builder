import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { User, Mail, Phone, MapPin, Link as LinkIcon, Code, Globe } from 'lucide-react';
import useResumeStore from '../../store/resumeStore';

export default function PersonalInfo() {
  const { formData, updateFormData, nextStep } = useResumeStore();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      linkedin: formData.linkedin,
      github: formData.github,
      portfolio: formData.portfolio,
    },
  });

  useEffect(() => {
    reset({
      fullName: formData.fullName, email: formData.email, phone: formData.phone,
      location: formData.location, linkedin: formData.linkedin,
      github: formData.github, portfolio: formData.portfolio,
    });
  }, []);

  const onSubmit = (data) => {
    updateFormData(data);
    nextStep();
  };

  const Field = ({ label, icon: Icon, id, registerName, rules = {}, placeholder = '', type = 'text' }) => (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
          <Icon size={16} />
        </div>
        <input
          id={id}
          type={type}
          className={`input ${errors[registerName] ? 'error' : ''}`}
          style={{ paddingLeft: 38 }}
          placeholder={placeholder}
          {...register(registerName, rules)}
        />
      </div>
      {errors[registerName] && (
        <p style={{ color: '#ef4444', fontSize: 12, marginTop: 4 }}>{errors[registerName].message}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>
          Personal Information
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
          Let's start with the basics — this information will appear at the top of your resume.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Full Name *" icon={User} id="fullName" registerName="fullName"
            placeholder="e.g. Jane Doe"
            rules={{ required: 'Full name is required', minLength: { value: 2, message: 'Name too short' } }} />
        </div>
        <Field label="Email Address *" icon={Mail} id="email" registerName="email" type="email"
          placeholder="jane@example.com"
          rules={{ required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } }} />
        <Field label="Phone Number" icon={Phone} id="phone" registerName="phone"
          placeholder="+1 (555) 000-0000" />
        <Field label="Location" icon={MapPin} id="location" registerName="location"
          placeholder="City, State / Remote" />
        <Field label="LinkedIn URL" icon={LinkIcon} id="linkedin" registerName="linkedin"
          placeholder="linkedin.com/in/janedoe" />
        <Field label="GitHub URL" icon={Code} id="github" registerName="github"
          placeholder="github.com/janedoe" />
        <div style={{ gridColumn: '1 / -1' }}>
          <Field label="Portfolio URL" icon={Globe} id="portfolio" registerName="portfolio"
            placeholder="janedoe.dev" />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
        <button type="submit" className="btn btn-primary btn-lg">
          Continue to Education →
        </button>
      </div>
    </form>
  );
}
