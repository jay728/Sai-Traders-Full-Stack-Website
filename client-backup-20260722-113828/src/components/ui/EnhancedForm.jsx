import { useState } from "react";

// Input Field - Clean professional design
export function InputField({ label, type = "text", placeholder, value, onChange, required = false, className = "", ...props }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-extrabold text-slate-900">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-blue-600 focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        {...props}
      />
    </div>
  );
}

// Textarea Field - Clean professional design
export function TextareaField({ label, placeholder, value, onChange, required = false, rows = 4, className = "", ...props }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-extrabold text-slate-900">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 placeholder:text-slate-400 transition-all duration-300 focus:border-blue-600 focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 resize-none"
        {...props}
      />
    </div>
  );
}

// Select Field - Clean professional design
export function SelectField({ label, options, value, onChange, required = false, placeholder = "Select an option", className = "", ...props }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-extrabold text-slate-900">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 focus:border-blue-600 focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Checkbox Field - Clean professional design
export function CheckboxField({ label, checked, onChange, required = false, className = "", ...props }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-5 w-5 rounded-lg border-2 border-slate-300 bg-white text-blue-600 transition-all duration-300 focus:border-blue-600 focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        {...props}
      />
      {label && (
        <label className="text-sm font-semibold text-slate-900 cursor-pointer">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
    </div>
  );
}

// Radio Field - Clean professional design
export function RadioField({ label, name, value, checked, onChange, required = false, className = "", ...props }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        className="h-5 w-5 rounded-full border-2 border-slate-300 bg-white text-blue-600 transition-all duration-300 focus:border-blue-600 focus:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        {...props}
      />
      {label && (
        <label className="text-sm font-semibold text-slate-900 cursor-pointer">
          {label} {required && <span className="text-blue-600">*</span>}
        </label>
      )}
    </div>
  );
}

// Form Group - Better form field grouping
export function FormGroup({ children, className = "" }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
}

// Form Grid - Better form field grid positioning
export function FormGrid({ children, columns = 2, className = "" }) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-6 ${gridCols[columns] || gridCols[2]} ${className}`}>
      {children}
    </div>
  );
}

// Form Actions - Better form button positioning
export function FormActions({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-4 items-center justify-end pt-4 ${className}`}>
      {children}
    </div>
  );
}

// Form Container - Clean professional design
export function FormContainer({ title, description, children, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm ${className}`}>
      <div className="relative z-10">
        {title && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight mb-3">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-slate-600 mb-6">
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
