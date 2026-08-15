import { Link } from "react-router-dom";

// Primary Button - Clean professional design
export function PrimaryButton({ to, children, className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2";
  const combinedStyles = `${baseStyles} ${className}`;
  
  if (to) {
    return <Link to={to} className={combinedStyles} {...props}>{children}</Link>;
  }
  return <button className={combinedStyles} {...props}>{children}</button>;
}

// Secondary Button - Clean professional design
export function SecondaryButton({ to, children, className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl bg-white border-2 border-slate-200 px-6 py-3.5 text-sm font-extrabold text-slate-700 shadow-sm transition-all duration-300 hover:border-blue-600 hover:text-blue-600 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const combinedStyles = `${baseStyles} ${className}`;
  
  if (to) {
    return <Link to={to} className={combinedStyles} {...props}>{children}</Link>;
  }
  return <button className={combinedStyles} {...props}>{children}</button>;
}

// Outline Button - Clean professional design
export function OutlineButton({ to, children, className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-6 py-3.5 text-sm font-extrabold text-blue-600 transition-all duration-300 hover:bg-blue-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2";
  const combinedStyles = `${baseStyles} ${className}`;
  
  if (to) {
    return <Link to={to} className={combinedStyles} {...props}>{children}</Link>;
  }
  return <button className={combinedStyles} {...props}>{children}</button>;
}

// Compact Button - Clean professional design
export function CompactButton({ to, children, className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-extrabold text-white shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2";
  const combinedStyles = `${baseStyles} ${className}`;
  
  if (to) {
    return <Link to={to} className={combinedStyles} {...props}>{children}</Link>;
  }
  return <button className={combinedStyles} {...props}>{children}</button>;
}

// Icon Button - Clean professional design
export function IconButton({ to, icon, children, className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-extrabold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2";
  const combinedStyles = `${baseStyles} ${className}`;
  
  const content = (
    <>
      <span className="text-lg">{icon}</span>
      <span>{children}</span>
    </>
  );
  
  if (to) {
    return <Link to={to} className={combinedStyles} {...props}>{content}</Link>;
  }
  return <button className={combinedStyles} {...props}>{content}</button>;
}

// Button Group - Better button positioning together
export function ButtonGroup({ children, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-3 sm:gap-4 items-center justify-center sm:justify-start ${className}`}>
      {children}
    </div>
  );
}
