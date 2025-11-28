import FormDialog from '../FormDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function FormDialogExample() {
  return (
    <FormDialog
      trigger={
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Slot
        </Button>
      }
      title="Create New Slot"
      description="Fill in the details to create a new slot for a buyer."
      fields={[
        { name: 'buyerName', label: 'Buyer Name', type: 'text', placeholder: 'Enter buyer name', required: true },
        { name: 'email', label: 'Email', type: 'email', placeholder: 'buyer@example.com', required: true },
        { name: 'territory', label: 'Territory', type: 'select', options: [
          { value: 'mumbai', label: 'Mumbai' },
          { value: 'delhi', label: 'Delhi' },
          { value: 'bangalore', label: 'Bangalore' },
        ], required: true },
        { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes...' },
      ]}
      onSubmit={(data) => console.log('Form submitted:', data)}
      submitLabel="Create Slot"
    />
  );
}
