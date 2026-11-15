
import AuthLayout from "@/components/AuthLayout";
import SignupForm from "@/components/SignupForm";

export const instant = false;

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
