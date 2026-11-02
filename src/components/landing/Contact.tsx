import React, { useState } from 'react';
import { ContactData } from '../../schemas/sections';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { MOCK_FORM_SUBMISSIONS_STORE } from '../../mock/data';

interface ContactProps {
  data: ContactData;
  onSubmissionSuccess?: (data: any) => void;
}

export const Contact: React.FC<ContactProps> = ({ data, onSubmissionSuccess }) => {
  // Estado del formulario
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: data.availableServices[0] || 'Consulta General',
    message: '',
    privacyAccepted: false,
    honeypot: '', // Campo trampa antispam (Sección 9.1)
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Detección de Bot vía Honeypot (Sección 9.1)
    if (formData.honeypot && formData.honeypot.trim() !== '') {
      console.warn('[FJL Security] Intento de bot detectado vía honeypot.');
      setStatus('success'); // Falso éxito al bot
      return;
    }

    // 2. Validación de consentimiento de privacidad (Sección 9.2 - Ley 29733)
    if (!formData.privacyAccepted) {
      setErrorMessage('Debe aceptar la política de tratamiento de datos personales para continuar.');
      setStatus('error');
      return;
    }

    // 3. Validación de campos obligatorios
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Por favor complete todos los campos obligatorios (*).');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    // Simulamos la llamada al Route Handler de Next.js / API de Backend
    setTimeout(() => {
      const newSubmission = {
        id: `sub_${Date.now()}`,
        siteId: 'site_dental_01',
        formData: {
          ...formData,
          submittedAt: new Date().toISOString(),
        },
        createdAt: new Date().toISOString(),
      };

      // Guardamos en el almacén mock (Sección 9.1: Guardar antes de notificar)
      MOCK_FORM_SUBMISSIONS_STORE.unshift(newSubmission);
      if (onSubmissionSuccess) onSubmissionSuccess(newSubmission);

      setStatus('success');
    }, 900);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      service: data.availableServices[0] || 'Consulta General',
      message: '',
      privacyAccepted: false,
      honeypot: '',
    });
    setStatus('idle');
    setErrorMessage('');
  };

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          {data.eyebrow && (
            <span 
              className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue-50"
              style={{ color: 'var(--theme-primary)' }}
            >
              {data.eyebrow}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Columna Izquierda: Información de Contacto y Canales */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Canales de Atención Directa
              </h3>

              <div className="space-y-5 text-sm text-slate-600">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-blue-600 shadow-2xs">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Dirección</span>
                    <span>{data.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-blue-600 shadow-2xs">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Teléfono / Citas</span>
                    <span>{data.phone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-blue-600 shadow-2xs">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Correo Electrónico</span>
                    <span>{data.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-blue-600 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">Horario de Consultorios</span>
                    <span>{data.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Distintivo de Privacidad */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3 text-xs text-slate-500">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tratamiento de datos cifrado y conforme a Ley N.º 29733 (Perú).</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50">
              
              {status === 'success' ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in-95">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 font-heading">
                    ¡Solicitud de Cita Recibida!
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Hemos registrado sus datos en nuestra plataforma. Nuestra coordinadora médica le escribirá al WhatsApp o correo indicado en menos de 2 horas.
                  </p>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Alerta de Error si aplica */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Honeypot Invisible antispam (Sección 9.1) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="hp_field">No llenar este campo:</label>
                    <input
                      type="text"
                      id="hp_field"
                      name="honeypot"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Nombre Completo */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nombres y Apellidos *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Ana Morales"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Correo Electrónico *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="ana.morales@correo.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Celular / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+51 987 654 321"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                      />
                    </div>

                    {/* Servicio de Interés */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Tratamiento de Interés
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all bg-white"
                      >
                        {data.availableServices.map((srv, i) => (
                          <option key={i} value={srv}>
                            {srv}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Comentario o Síntomas *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describa brevemente qué desea consultar o qué día prefiere su cita..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition-all"
                    />
                  </div>

                  {/* Checkbox Legal y Consentimiento (Sección 9.2 y 9.3) */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.privacyAccepted}
                        onChange={(e) => setFormData({ ...formData, privacyAccepted: e.target.checked })}
                        className="mt-1 w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                      />
                      <span className="text-xs text-slate-600 leading-normal">
                        He leído y acepto la{' '}
                        <a href="#privacidad" className="text-blue-600 font-semibold underline">
                          Política de Privacidad
                        </a>{' '}
                        y autorizo el tratamiento de mis datos de contacto conforme a la Ley N.º 29733.
                      </span>
                    </label>
                  </div>

                  {/* Botón de Envío */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all hover:opacity-95 active:scale-98 disabled:opacity-50"
                      style={{
                        backgroundColor: 'var(--theme-primary)',
                        color: 'var(--theme-primary-fg)',
                      }}
                    >
                      {status === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Guardando solicitud en base de datos...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirmar Solicitud de Cita</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

