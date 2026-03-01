export function IconButton({ icon: Icon, label, onClick, variant = 'ghost', className = '' }) {
  const base = 'rounded-full p-2 transition-colors focus:outline-none';
  const variants = {
    ghost: 'hover:bg-gray-100 text-gray-600',
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
  };
  return (
    <button
      onClick={onClick}
      title={label}
      aria-label={label}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <Icon size={18} />
    </button>
  );
}
