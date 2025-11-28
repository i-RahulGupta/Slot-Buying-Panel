import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface FormDialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
}

export default function FormDialog({
  trigger,
  title,
  description,
  fields,
  onSubmit,
  submitLabel = 'Submit',
}: FormDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    setOpen(false);
    setFormData({});
  };

  const updateField = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          <div className="space-y-4 py-4">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    required={field.required}
                    data-testid={`input-${field.name}`}
                  />
                ) : field.type === 'select' ? (
                  <Select
                    value={formData[field.name] || ''}
                    onValueChange={(value) => updateField(field.name, value)}
                  >
                    <SelectTrigger data-testid={`select-${field.name}`}>
                      <SelectValue placeholder={field.placeholder || 'Select...'} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options?.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formData[field.name] || ''}
                    onChange={(e) => updateField(field.name, e.target.value)}
                    required={field.required}
                    data-testid={`input-${field.name}`}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} data-testid="form-submit">
              {isSubmitting ? 'Submitting...' : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
