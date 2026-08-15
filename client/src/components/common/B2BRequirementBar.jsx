import { Link } from 'react-router-dom';

function B2BRequirementBar() {
  return <div className="hidden border-b border-blue-100 bg-blue-50 px-4 py-2.5 sm:block"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left"><p className="text-xs font-bold text-blue-900">Need chrome, rainbow, or custom decorative coating for molded components?</p><Link to="/contact" className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-extrabold text-white hover:bg-orange-600">Post Your Requirement</Link></div></div>;
}

export default B2BRequirementBar;
