'use client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signUp } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string(),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
});

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      router.push('/dashboard');
    } catch (error) {
      console.error('Form submission error', error);
      toast.error('Failed to submit the form. Please try again.');
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full p-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-font text-cyan-200">
                Username
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your username"
                  type="text"
                  className="bg-gray-900/80 border-cyan-400 text-cyan-100 space-font focus:ring-cyan-400 focus:border-cyan-400"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs text-cyan-400 space-font">
                This is your public display name.
              </FormDescription>
              <FormMessage className="text-red-400 space-font" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-font text-cyan-200">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  className="bg-gray-900/80 border-cyan-400 text-cyan-100 space-font focus:ring-cyan-400 focus:border-cyan-400"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 space-font" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-font text-cyan-200">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type="password"
                  className="bg-gray-900/80 border-cyan-400 text-cyan-100 space-font focus:ring-cyan-400 focus:border-cyan-400"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 space-font" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="space-font text-cyan-200">
                Confirm Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Re-enter your password"
                  type="password"
                  className="bg-gray-900/80 border-cyan-400 text-cyan-100 space-font focus:ring-cyan-400 focus:border-cyan-400"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-400 space-font" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full space-font bg-cyan-400 text-black text-lg rounded-xl shadow-lg hover:bg-cyan-300 transition-colors duration-150"
        >
          {isSubmitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
      </form>
    </Form>
  );
}
