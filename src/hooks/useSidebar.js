import { useState } from 'react';

export function useSidebar(defaultOpen = true) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const toggle = () => setIsOpen((o) => !o);
  return { isOpen, toggle };
}
