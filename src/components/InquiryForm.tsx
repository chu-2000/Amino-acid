import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button.tsx';
import { Input } from './ui/input.tsx';
import { Label } from './ui/label.tsx';

interface InquiryFormData {
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
}

export default function InquiryForm({ productName, onSuccess }: { productName: string, onSuccess?: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    if (onSuccess) {
      setTimeout(onSuccess, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in">
        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-white">Inquiry Received</h3>
        <p className="text-slate-400 mt-2">
          Technical documentation and quote for <span className="text-blue-400 font-semibold">{productName}</span> will be sent to your email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-xs uppercase tracking-wider text-slate-500">Contact Name</Label>
          <Input id="name" required placeholder="John Doe" className="bg-slate-900 border-slate-800" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs uppercase tracking-wider text-slate-500">Business Email</Label>
          <Input id="email" type="email" required placeholder="john@company.com" className="bg-slate-900 border-slate-800" />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="company" className="text-xs uppercase tracking-wider text-slate-500">Company Name</Label>
        <Input id="company" required placeholder="Biopharm Solutions Inc." className="bg-slate-900 border-slate-800" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className="text-xs uppercase tracking-wider text-slate-500">Requirements / Quantity</Label>
        <textarea 
          id="message" 
          required 
          className="w-full min-h-[100px] bg-slate-900 border border-slate-800 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          placeholder={`Please specify requested quantity for ${productName} (e.g., 500kg, 1T) and any specific mesh size requirements.`}
        />
      </div>

      <Button disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 py-6">
        {isSubmitting ? 'Processing...' : (
          <>
            Send Inquiry <Send className="w-4 h-4 ml-2" />
          </>
        )}
      </Button>
      
      <p className="text-[10px] text-center text-slate-500 mt-4 italic">
        By submitting, you agree to our privacy policy regarding data storage and technical advisory.
      </p>
    </form>
  );
}
