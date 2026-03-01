import { CostByBillToPie } from './CostByBillToPie';
import { SupplierTable } from './SupplierTable';

export function MiddleSection() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      <CostByBillToPie />
      <SupplierTable />
    </div>
  );
}
